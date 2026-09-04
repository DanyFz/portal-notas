"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Student } from "@/lib/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [customGroups, setCustomGroups] = useState<string[]>([]);
  const [quizPasswords, setQuizPasswords] = useState<Record<string, string>>({});
  const [initialData, setInitialData] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("ALL");
  const [activeTab, setActiveTab] = useState<"grades" | "attendance" | "students" | "stats">("grades");
  const [searchTerm, setSearchTerm] = useState("");
  const [saveMessage, setSaveMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Sorting
  const [sortBy, setSortBy] = useState<"name-asc" | "name-desc" | "avg-desc" | "avg-asc" | "absent-desc" | "group">("name-asc");

  // Selection for bulk actions (students)
  const [selectedUsernames, setSelectedUsernames] = useState<string[]>([]);

  // Modals state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddColModal, setShowAddColModal] = useState(false);
  const [showDeleteColModal, setShowDeleteColModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showBulkGradeModal, setShowBulkGradeModal] = useState(false);
  const [showMoveGroupModal, setShowMoveGroupModal] = useState(false);
  const [showQuizPassModal, setShowQuizPassModal] = useState(false);

  // Dedicated Student Group Change Modal State
  const [studentToChangeGroup, setStudentToChangeGroup] = useState<Student | null>(null);
  const [customNewGroupName, setCustomNewGroupName] = useState("");

  // Modal form inputs
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    username: "",
    email: "",
    program: "",
    group: "",
  });
  const [newColName, setNewColName] = useState("");
  const [newColPassword, setNewColPassword] = useState("");
  const [selectedQuizForPass, setSelectedQuizForPass] = useState("");
  const [editQuizPassInput, setEditQuizPassInput] = useState("");
  const [colToDelete, setColToDelete] = useState("");
  const [newGroupNameInput, setNewGroupNameInput] = useState("");
  
  // Multi-group deletion state
  const [groupsToDelete, setGroupsToDelete] = useState<string[]>([]);
  const [groupDeleteAction, setGroupDeleteAction] = useState<"reassign" | "delete-students">("reassign");
  const [groupReassignTarget, setGroupReassignTarget] = useState("");

  const [targetMoveGroup, setTargetMoveGroup] = useState("");
  const [bulkGradeCol, setBulkGradeCol] = useState("");
  const [bulkGradeValue, setBulkGradeValue] = useState("");

  // Check auth and load students
  useEffect(() => {
    async function init() {
      try {
        const token = sessionStorage.getItem("admin_token");
        const verifyRes = await fetch("/api/admin/verify", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!verifyRes.ok) {
          router.push("/notas?admin=login");
          return;
        }

        // Fetch students and quiz metadata
        const res = await fetch("/api/students", {
          cache: "no-store",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          const list: Student[] = data.students || [];
          const qPass: Record<string, string> = data.quizPasswords || {};
          const cGrp: string[] = data.customGroups || [];
          setStudents(list);
          setQuizPasswords(qPass);
          setCustomGroups(cGrp);
          setInitialData(JSON.stringify({ students: list, quizPasswords: qPass, customGroups: cGrp }));

          if (list.length > 0 && selectedGroup === "ALL") {
            const firstGroup = list[0]?.group || "ALL";
            setSelectedGroup(firstGroup);
          }
        }
      } catch (err) {
        console.error("Error loading admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [router]);

  // Detected groups (including created empty groups)
  const groups = useMemo(() => {
    const set = new Set<string>(customGroups);
    students.forEach((s) => {
      if (s.group && s.group.trim()) set.add(s.group.trim());
    });
    return Array.from(set).sort();
  }, [students, customGroups]);

  // Detected evaluation columns
  const evaluationColumns = useMemo(() => {
    const colSet = new Set<string>();
    students.forEach((s) => {
      if (s.grades) {
        Object.keys(s.grades).forEach((col) => colSet.add(col));
      }
    });
    return Array.from(colSet).sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ""), 10);
      const numB = parseInt(b.replace(/\D/g, ""), 10);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.localeCompare(b);
    });
  }, [students]);

  // Detected attendance columns
  const attendanceColumns = useMemo(() => {
    const colSet = new Set<string>();
    students.forEach((s) => {
      if (s.attendance) {
        Object.keys(s.attendance).forEach((col) => colSet.add(col));
      }
    });
    if (colSet.size === 0) {
      return evaluationColumns;
    }
    return Array.from(colSet).sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ""), 10);
      const numB = parseInt(b.replace(/\D/g, ""), 10);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.localeCompare(b);
    });
  }, [students, evaluationColumns]);

  // Calculate student average
  function getStudentAverage(grades: Record<string, number | null> | undefined): number | null {
    if (!grades) return null;
    const valid = Object.values(grades).filter((g): g is number => g !== null && typeof g === "number");
    if (valid.length === 0) return null;
    const sum = valid.reduce((acc, g) => acc + g, 0);
    return Math.round((sum / valid.length) * 100) / 100;
  }

  // Calculate attendance stats for a student
  function getStudentAttendanceStats(attendance: Record<string, string> | undefined) {
    let present = 0;
    let absent = 0;
    let excuse = 0;
    attendanceColumns.forEach((col) => {
      const st = attendance?.[col] || "ausente";
      if (st === "presente") present++;
      else if (st === "ausente") absent++;
      else if (st === "excusa") excuse++;
    });
    const total = attendanceColumns.length;
    const pct = total > 0 ? Math.round((present / total) * 100) : 100;
    return { present, absent, excuse, total, pct };
  }

  // Filtered and sorted students
  const filteredStudents = useMemo(() => {
    let result = students.filter((s) => {
      const matchesGroup = selectedGroup === "ALL" || s.group === selectedGroup;
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        s.fullName.toLowerCase().includes(q) ||
        s.username.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.program && s.program.toLowerCase().includes(q)) ||
        (s.group && s.group.toLowerCase().includes(q));

      return matchesGroup && matchesSearch;
    });

    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "name-asc") return a.fullName.localeCompare(b.fullName);
      if (sortBy === "name-desc") return b.fullName.localeCompare(a.fullName);
      if (sortBy === "group") return (a.group || "").localeCompare(b.group || "");
      if (sortBy === "avg-desc" || sortBy === "avg-asc") {
        const avgA = getStudentAverage(a.grades) ?? -1;
        const avgB = getStudentAverage(b.grades) ?? -1;
        return sortBy === "avg-desc" ? avgB - avgA : avgA - avgB;
      }
      if (sortBy === "absent-desc") {
        const absA = getStudentAttendanceStats(a.attendance).absent;
        const absB = getStudentAttendanceStats(b.attendance).absent;
        return absB - absA;
      }
      return 0;
    });

    return result;
  }, [students, selectedGroup, searchTerm, sortBy, attendanceColumns]);

  // Unsaved changes check
  const hasUnsavedChanges = useMemo(() => {
    if (initialData === "") return false;
    return (
      JSON.stringify({ students, quizPasswords, customGroups }) !== initialData
    );
  }, [students, quizPasswords, customGroups, initialData]);

  // Overall & Group stats calculation
  const groupStats = useMemo(() => {
    const inGroup = students.filter((s) => selectedGroup === "ALL" || s.group === selectedGroup);
    if (inGroup.length === 0) {
      return { total: 0, avg: "0.00", passing: 0, failing: 0, passingPct: 0, avgAttendance: 0 };
    }

    let sumAvg = 0;
    let countedGrades = 0;
    let passing = 0;
    let failing = 0;
    let sumAttendancePct = 0;

    inGroup.forEach((s) => {
      const avg = getStudentAverage(s.grades);
      const { pct } = getStudentAttendanceStats(s.attendance);
      sumAttendancePct += pct;

      if (avg !== null) {
        sumAvg += avg;
        countedGrades++;
        if (avg >= 3.0) passing++;
        else failing++;
      }
    });

    return {
      total: inGroup.length,
      avg: countedGrades > 0 ? (sumAvg / countedGrades).toFixed(2) : "0.00",
      passing,
      failing,
      passingPct: countedGrades > 0 ? Math.round((passing / countedGrades) * 100) : 0,
      avgAttendance: Math.round(sumAttendancePct / inGroup.length),
    };
  }, [students, selectedGroup, attendanceColumns]);

  // Edit grade cell
  function handleGradeChange(studentUsername: string, col: string, value: string) {
    const trimmed = value.trim().replace(",", ".");
    let parsed: number | null = null;
    if (trimmed !== "" && trimmed.toLowerCase() !== "excusa" && trimmed.toLowerCase() !== "e") {
      const num = parseFloat(trimmed);
      if (!isNaN(num)) {
        parsed = Math.min(5, Math.max(0, Math.round(num * 10) / 10));
      }
    }

    setStudents((prev) =>
      prev.map((s) => {
        if (s.username.toLowerCase() === studentUsername.toLowerCase()) {
          const updatedGrades = { ...(s.grades || {}), [col]: parsed };
          const updatedAttendance = { ...(s.attendance || {}) };
          const currentAtt = s.attendance?.[col];

          if (parsed === 0) {
            // Only mark as ausente if the student has NOT already registered attendance
            if (currentAtt !== "presente") {
              updatedAttendance[col] = "ausente";
            }
          } else if (parsed !== null && parsed > 0) {
            if (currentAtt !== "excusa") {
              updatedAttendance[col] = "presente";
            }
          } else if (trimmed.toLowerCase() === "excusa" || trimmed.toLowerCase() === "e") {
            updatedAttendance[col] = "excusa";
          }
          return {
            ...s,
            grades: updatedGrades,
            attendance: updatedAttendance,
          };
        }
        return s;
      })
    );
  }

  // Toggle attendance status
  function handleAttendanceToggle(studentUsername: string, col: string) {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.username.toLowerCase() === studentUsername.toLowerCase()) {
          const current = s.attendance?.[col] || "pendiente";
          let next = "presente";
          if (current === "pendiente") next = "presente";
          else if (current === "presente") next = "ausente";
          else if (current === "ausente") next = "excusa";
          else if (current === "excusa") next = "pendiente";

          const updatedAttendance = { ...(s.attendance || {}), [col]: next };
          return { ...s, attendance: updatedAttendance };
        }
        return s;
      })
    );
  }

  // Change student field
  function handleStudentFieldChange(
    studentUsername: string,
    field: "fullName" | "username" | "email" | "program" | "group",
    value: string
  ) {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.username.toLowerCase() === studentUsername.toLowerCase()) {
          return { ...s, [field]: value };
        }
        return s;
      })
    );
  }

  // Dedicated function to assign a student to a group
  function handleAssignStudentToGroup(username: string, targetGroup: string) {
    const cleanGroup = targetGroup.trim();
    if (!cleanGroup) return;

    if (!groups.includes(cleanGroup)) {
      setCustomGroups((prev) => [...prev, cleanGroup]);
    }

    setStudents((prev) =>
      prev.map((s) => {
        if (s.username.toLowerCase() === username.toLowerCase()) {
          return { ...s, group: cleanGroup };
        }
        return s;
      })
    );

    setStudentToChangeGroup(null);
    setCustomNewGroupName("");
  }

  // Delete student single
  function handleDeleteStudent(studentUsername: string) {
    if (!confirm(`¿Eliminar al estudiante ${studentUsername}? Esta acción no se puede deshacer.`)) {
      return;
    }
    setStudents((prev) => prev.filter((s) => s.username.toLowerCase() !== studentUsername.toLowerCase()));
    setSelectedUsernames((prev) => prev.filter((u) => u.toLowerCase() !== studentUsername.toLowerCase()));
  }

  // Bulk Delete Students
  function handleBulkDeleteStudents() {
    if (selectedUsernames.length === 0) return;

    if (
      !confirm(
        `¿Estás seguro de eliminar a los ${selectedUsernames.length} estudiantes seleccionados? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    const set = new Set(selectedUsernames.map((u) => u.toLowerCase()));
    setStudents((prev) => prev.filter((s) => !set.has(s.username.toLowerCase())));
    setSelectedUsernames([]);
  }

  // Add evaluation column
  function handleAddColumn() {
    if (!newColName.trim()) return;
    const col = newColName.trim();
    if (evaluationColumns.includes(col)) {
      alert("Ya existe una evaluación con ese nombre.");
      return;
    }

    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        grades: { ...(s.grades || {}), [col]: null },
        attendance: { ...(s.attendance || {}), [col]: "pendiente" },
      }))
    );

    if (newColPassword.trim()) {
      setQuizPasswords((prev) => ({ ...prev, [col]: newColPassword.trim() }));
    }

    setNewColName("");
    setNewColPassword("");
    setShowAddColModal(false);
  }

  // Delete evaluation column
  function handleDeleteColumn() {
    if (!colToDelete) return;
    if (!confirm(`¿Estás seguro de eliminar la columna "${colToDelete}" de todos los estudiantes?`)) {
      return;
    }

    setStudents((prev) =>
      prev.map((s) => {
        const updatedGrades = { ...(s.grades || {}) };
        delete updatedGrades[colToDelete];
        const updatedAttendance = { ...(s.attendance || {}) };
        delete updatedAttendance[colToDelete];
        return { ...s, grades: updatedGrades, attendance: updatedAttendance };
      })
    );

    setQuizPasswords((prev) => {
      const next = { ...prev };
      delete next[colToDelete];
      return next;
    });

    setColToDelete("");
    setShowDeleteColModal(false);
  }

  // Save/Update quiz password
  function handleSaveQuizPassword() {
    if (!selectedQuizForPass) return;
    const cleanPass = editQuizPassInput.trim();
    setQuizPasswords((prev) => {
      const next = { ...prev };
      if (cleanPass) {
        next[selectedQuizForPass] = cleanPass;
      } else {
        delete next[selectedQuizForPass];
      }
      return next;
    });
    setEditQuizPassInput(cleanPass);
  }

  // Clear password to leave quiz registration open to anyone
  function handleLeaveQuizOpen(quizName: string) {
    setQuizPasswords((prev) => {
      const next = { ...prev };
      delete next[quizName];
      return next;
    });
    if (selectedQuizForPass === quizName) {
      setEditQuizPassInput("");
    }
  }

  // Mark all students present for a column
  function handleMarkAllPresent(col: string) {
    setStudents((prev) =>
      prev.map((s) => {
        if (selectedGroup !== "ALL" && s.group !== selectedGroup) return s;
        return {
          ...s,
          attendance: { ...(s.attendance || {}), [col]: "presente" },
        };
      })
    );
  }

  // Mark all students absent for a column
  function handleMarkAllAbsent(col: string) {
    setStudents((prev) =>
      prev.map((s) => {
        if (selectedGroup !== "ALL" && s.group !== selectedGroup) return s;
        return {
          ...s,
          attendance: { ...(s.attendance || {}), [col]: "ausente" },
        };
      })
    );
  }

  // Create new Group
  function handleCreateGroup() {
    const grp = newGroupNameInput.trim();
    if (!grp) return;
    if (groups.includes(grp)) {
      alert("El grupo ya existe.");
      return;
    }
    setCustomGroups((prev) => [...prev, grp]);
    setSelectedGroup(grp);
    setNewGroupNameInput("");
    setShowNewGroupModal(false);
  }

  // Toggle selection for group deletion
  function toggleGroupToDelete(grp: string) {
    setGroupsToDelete((prev) =>
      prev.includes(grp) ? prev.filter((g) => g !== grp) : [...prev, grp]
    );
  }

  function toggleSelectAllGroupsToDelete() {
    if (groupsToDelete.length === groups.length) {
      setGroupsToDelete([]);
    } else {
      setGroupsToDelete([...groups]);
    }
  }

  // Bulk Delete Groups
  function handleExecuteDeleteGroups() {
    if (groupsToDelete.length === 0) return;

    const affectedStudentsCount = students.filter((s) => s.group && groupsToDelete.includes(s.group)).length;

    let confirmMsg = `¿Estás seguro de eliminar los ${groupsToDelete.length} grupos seleccionados (${groupsToDelete.join(", ")})?`;
    if (groupDeleteAction === "delete-students") {
      confirmMsg += `\n⚠️ ATENCIÓN: También se eliminarán los ${affectedStudentsCount} estudiantes que pertenecen a estos grupos.`;
    } else {
      confirmMsg += `\nLos ${affectedStudentsCount} estudiantes serán reasignados a "${groupReassignTarget || "Sin Grupo"}".`;
    }

    if (!confirm(confirmMsg)) return;

    if (groupDeleteAction === "delete-students") {
      // Delete students belonging to deleted groups
      const deletedSet = new Set(groupsToDelete);
      setStudents((prev) => prev.filter((s) => !deletedSet.has(s.group)));
    } else {
      // Reassign students
      const fallback = groupReassignTarget || "Sin Grupo";
      const deletedSet = new Set(groupsToDelete);
      setStudents((prev) =>
        prev.map((s) => {
          if (deletedSet.has(s.group)) {
            return { ...s, group: fallback };
          }
          return s;
        })
      );
    }

    setCustomGroups((prev) => prev.filter((g) => !groupsToDelete.includes(g)));
    if (groupsToDelete.includes(selectedGroup)) {
      setSelectedGroup("ALL");
    }

    setGroupsToDelete([]);
    setGroupReassignTarget("");
    setShowDeleteGroupModal(false);
  }

  // Move selected students to another group
  function handleMoveSelectedToGroup() {
    if (!targetMoveGroup || selectedUsernames.length === 0) return;

    setStudents((prev) =>
      prev.map((s) => {
        if (selectedUsernames.includes(s.username)) {
          return { ...s, group: targetMoveGroup };
        }
        return s;
      })
    );

    setSelectedUsernames([]);
    setShowMoveGroupModal(false);
  }

  // Apply bulk grade to selected students or all filtered
  function handleApplyBulkGrade() {
    if (!bulkGradeCol) return;
    const num = bulkGradeValue.trim() === "" ? null : parseFloat(bulkGradeValue.replace(",", "."));
    if (bulkGradeValue.trim() !== "" && (isNaN(num!) || num! < 0 || num! > 5)) {
      alert("La nota debe estar entre 0.0 y 5.0 (o dejar en blanco para limpiar).");
      return;
    }

    const targetUsernames =
      selectedUsernames.length > 0 ? selectedUsernames : filteredStudents.map((s) => s.username);

    setStudents((prev) =>
      prev.map((s) => {
        if (targetUsernames.includes(s.username)) {
          return {
            ...s,
            grades: { ...(s.grades || {}), [bulkGradeCol]: num },
          };
        }
        return s;
      })
    );

    setBulkGradeValue("");
    setShowBulkGradeModal(false);
    setSelectedUsernames([]);
  }

  // Add new student
  function handleAddStudent() {
    if (!newStudent.fullName.trim() || !newStudent.username.trim()) {
      alert("Nombre completo y usuario institucional son requeridos.");
      return;
    }
    const cleanUser = newStudent.username.trim().toLowerCase();
    if (students.some((s) => s.username.toLowerCase() === cleanUser)) {
      alert("Ya existe un estudiante con ese usuario institucional.");
      return;
    }

    const defaultGrades: Record<string, number | null> = {};
    const defaultAttendance: Record<string, string> = {};
    evaluationColumns.forEach((col) => {
      defaultGrades[col] = null;
      defaultAttendance[col] = "pendiente";
    });

    const targetGroup = newStudent.group.trim() || (selectedGroup !== "ALL" ? selectedGroup : groups[0] || "GEA 24");

    const created: Student = {
      fullName: newStudent.fullName.trim(),
      username: cleanUser,
      email: newStudent.email.trim() || `${cleanUser}@unal.edu.co`,
      program: newStudent.program.trim() || "Ingeniería",
      group: targetGroup,
      grades: defaultGrades,
      attendance: defaultAttendance,
    };

    setStudents((prev) => [created, ...prev]);
    setNewStudent({ fullName: "", username: "", email: "", program: "", group: "" });
    setShowAddStudentModal(false);
  }

  // Export JSON Backup
  function handleExportBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(students, null, 2));
    const downloadAnchor = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `calificaciones_backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  // Import JSON Backup
  function handleImportBackup(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].username && parsed[0].fullName) {
          if (confirm(`Se encontraron ${parsed.length} estudiantes en el archivo. ¿Deseas reemplazar la lista actual?`)) {
            setStudents(parsed);
          }
        } else {
          alert("El archivo JSON no tiene el formato válido de estudiantes.");
        }
      } catch (err) {
        alert("Error al leer el archivo JSON: " + (err instanceof Error ? err.message : String(err)));
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  // Save changes to API
  async function handleSaveChanges() {
    setSaving(true);
    setSaveMessage(null);
    try {
      const token = sessionStorage.getItem("admin_token");
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ students, quizPasswords, customGroups }),
      });

      const data = await res.json();
      if (res.ok) {
        setInitialData(
          JSON.stringify({ students, quizPasswords, customGroups })
        );
        setSaveMessage({
          text: `Guardado exitoso: ${data.studentsCount} estudiantes sincronizados (${data.targets?.join(", ") || "Servidor"})`,
          type: "success",
        });
      } else {
        setSaveMessage({
          text: `Error al guardar: ${data.error || "No se pudo completar"}`,
          type: "error",
        });
      }
    } catch {
      setSaveMessage({ text: "Error de red al intentar guardar los cambios.", type: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(null), 6000);
    }
  }

  // Selection toggle (students)
  function toggleSelectAll() {
    if (selectedUsernames.length === filteredStudents.length) {
      setSelectedUsernames([]);
    } else {
      setSelectedUsernames(filteredStudents.map((s) => s.username));
    }
  }

  function toggleSelectStudent(username: string) {
    setSelectedUsernames((prev) =>
      prev.includes(username) ? prev.filter((u) => u !== username) : [...prev, username]
    );
  }

  // Logout
  function handleLogout() {
    sessionStorage.removeItem("admin_token");
    document.cookie = "admin_token=; Max-Age=0; path=/;";
    router.push("/notas");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#151d18] text-[#EDE5D8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#8FA698] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-[#A89F8D]">Cargando Panel Docente Avanzado...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121814] text-[#EDE5D8] flex flex-col font-sans selection:bg-[#34483d] selection:text-[#FAF6EE]">
      {/* Hidden File Input for Backup Import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImportBackup}
        accept=".json"
        className="hidden"
      />

      {/* Top Navbar */}
      <header className="min-h-14 py-2.5 sm:py-0 border-b border-[rgba(217,203,182,0.12)] bg-[#17201a] px-3 sm:px-6 flex flex-wrap items-center justify-between gap-2.5 sticky top-0 z-40">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#223028] border border-[rgba(217,203,182,0.15)] flex items-center justify-center text-[#8FA698] shadow-inner shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-xs sm:text-sm font-serif font-bold text-[#FAF6EE] tracking-wide">
                Panel de Control Docente
              </h1>
              <span className="px-1.5 sm:px-2 py-0.5 rounded bg-[#1e2a22] border border-[#3b4e42] text-[9px] sm:text-[10px] font-mono text-[#8FA698]">
                PRO
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-[#A89F8D] hidden xs:block">Administración de Notas, Asistencia y Grupos</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {hasUnsavedChanges && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-600/40 text-[10px] sm:text-[11px] text-amber-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              <span className="hidden sm:inline">Cambios sin guardar</span>
              <span className="sm:hidden">Sin guardar</span>
            </span>
          )}

          {/* Backup Tools */}
          <div className="hidden md:flex items-center gap-1 bg-[#19241d] p-1 rounded-lg border border-[rgba(217,203,182,0.1)]">
            <button
              onClick={handleExportBackup}
              className="h-7 px-2 rounded bg-transparent hover:bg-[#25362b] text-[#A89F8D] hover:text-[#EDE5D8] text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
              title="Descargar copia de seguridad en JSON"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#8FA698]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Backup</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="h-7 px-2 rounded bg-transparent hover:bg-[#25362b] text-[#A89F8D] hover:text-[#EDE5D8] text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors"
              title="Restaurar datos desde un archivo JSON"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>Restaurar</span>
            </button>
          </div>

          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="academic-btn-primary h-8 px-2.5 sm:px-3.5 rounded-md text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414L11 12.586l-3.293-3.293z" />
                  <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7.414A2 2 0 0016.414 6L14 3.586A2 2 0 0012.586 3H5z" />
                </svg>
                <span>Guardar</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="h-8 px-2 sm:px-2.5 rounded-md bg-[#223028] border border-[rgba(217,203,182,0.15)] text-[#A89F8D] hover:text-[#FAF6EE] text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
            title="Cerrar sesión de administrador"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="hidden md:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* Save Toast Notification */}
      {saveMessage && (
        <div
          className={`mx-3 sm:mx-6 mt-3 p-3 rounded-lg border text-xs flex items-center justify-between animate-fadeIn ${
            saveMessage.type === "success"
              ? "bg-[#182a20] border-[#2f553f] text-[#a5e0b8]"
              : "bg-red-950/60 border-red-800 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{saveMessage.text}</span>
          </div>
          <button onClick={() => setSaveMessage(null)} className="opacity-70 hover:opacity-100 cursor-pointer">✕</button>
        </div>
      )}

      {/* Control Bar & Group Management */}
      <div className="p-3 sm:p-6 pb-2 space-y-3 sm:space-y-4 max-w-full">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 sm:gap-4 bg-[#17211b] border border-[rgba(217,203,182,0.1)] rounded-xl p-3 sm:p-4 shadow-sm">
          {/* Group Selector & Group Management Actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full xl:w-auto">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <label className="text-[11px] sm:text-xs font-mono text-[#A89F8D] uppercase">Grupo:</label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="academic-input h-9 rounded-md px-2.5 sm:px-3 text-xs font-mono bg-[#1f2c24] text-[#FAF6EE] border border-[#3b4e42] focus:outline-none cursor-pointer font-semibold flex-1 sm:flex-initial"
              >
                <option value="ALL">Todos los Grupos ({students.length})</option>
                {groups.map((grp) => (
                  <option key={grp} value={grp}>
                    {grp} ({students.filter((s) => s.group === grp).length})
                  </option>
                ))}
              </select>

              {/* Group Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowNewGroupModal(true)}
                  className="h-8 px-2 sm:px-2.5 rounded-md bg-[#223028] hover:bg-[#2c3d33] border border-[#3b4e42] text-[#8FA698] hover:text-[#FAF6EE] text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                  title="Crear un nuevo grupo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>+ Grupo</span>
                </button>

                {groups.length > 0 && (
                  <button
                    onClick={() => {
                      setGroupsToDelete(selectedGroup !== "ALL" ? [selectedGroup] : []);
                      setShowDeleteGroupModal(true);
                    }}
                    className="h-8 px-2 sm:px-2.5 rounded-md bg-[#223028] hover:bg-red-950/50 border border-[#3b4e42] text-red-300 text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
                    title="Eliminar uno o múltiples grupos"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="hidden sm:inline">Eliminar Grupos</span>
                    <span className="sm:hidden">Eliminar</span>
                  </button>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="relative flex-1 min-w-[160px] sm:min-w-[200px]">
              <input
                type="text"
                placeholder="Buscar estudiante, correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="academic-input w-full h-9 rounded-md pl-8 pr-3 text-xs bg-[#1f2c24] border border-[#3b4e42]"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-[#A89F8D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              <label className="text-[11px] font-mono text-[#A89F8D] shrink-0">Ordenar:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="academic-input h-9 rounded-md px-2.5 text-xs font-mono bg-[#1f2c24] border border-[#3b4e42] cursor-pointer text-[#C8B99D] flex-1 sm:flex-initial"
              >
                <option value="name-asc">Nombre (A-Z)</option>
                <option value="name-desc">Nombre (Z-A)</option>
                <option value="avg-desc">Mayor Promedio</option>
                <option value="avg-asc">Menor Promedio</option>
                <option value="absent-desc">Más Faltas</option>
                <option value="group">Por Grupo</option>
              </select>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 text-xs font-mono text-[#C8B99D]">
            <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-[#121914] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(217,203,182,0.08)]">
              <span className="text-[#8FA698]">Estudiantes:</span>
              <span className="font-bold text-[#FAF6EE]">{filteredStudents.length}</span>
            </div>
            <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-[#121914] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(217,203,182,0.08)]">
              <span className="text-[#8FA698]">Promedio:</span>
              <span className="font-bold text-[#D4AF37]">{groupStats.avg}</span>
            </div>
            <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-[#121914] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(217,203,182,0.08)]">
              <span className="text-[#8FA698]">Aprobación:</span>
              <span className="font-bold text-[#8FA698]">{groupStats.passingPct}%</span>
            </div>
            <div className="flex items-center justify-between sm:justify-start gap-1.5 bg-[#121914] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[rgba(217,203,182,0.08)]">
              <span className="text-[#8FA698]">Asistencia:</span>
              <span className="font-bold text-[#8FA698]">{groupStats.avgAttendance}%</span>
            </div>
          </div>
        </div>

        {/* Action Toolbar & Bulk Operations */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pt-1">
          {/* Tabs */}
          <div className="flex items-center bg-[#17211b] p-1 rounded-lg border border-[rgba(217,203,182,0.12)] overflow-x-auto max-w-full no-scrollbar shrink-0">
            <button
              onClick={() => setActiveTab("grades")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "grades"
                  ? "bg-[#25362c] text-[#FAF6EE] shadow-sm font-semibold"
                  : "text-[#A89F8D] hover:text-[#EDE5D8]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span>Notas ({evaluationColumns.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("attendance")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "attendance"
                  ? "bg-[#25362c] text-[#FAF6EE] shadow-sm font-semibold"
                  : "text-[#A89F8D] hover:text-[#EDE5D8]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Asistencia ({attendanceColumns.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "students"
                  ? "bg-[#25362c] text-[#FAF6EE] shadow-sm font-semibold"
                  : "text-[#A89F8D] hover:text-[#EDE5D8]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>Estudiantes ({filteredStudents.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "stats"
                  ? "bg-[#25362c] text-[#FAF6EE] shadow-sm font-semibold"
                  : "text-[#A89F8D] hover:text-[#EDE5D8]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
              </svg>
              <span>Estadísticas</span>
            </button>
          </div>

          {/* Quick Buttons & Bulk Actions */}
          <div className="flex flex-wrap items-center gap-2">
            {selectedUsernames.length > 0 && (
              <div className="flex items-center gap-1.5 bg-[#1b2b21] border border-[#2f6645] px-2.5 py-1 rounded-lg animate-fadeIn text-xs">
                <span className="font-mono text-[#a5e0b8] font-semibold">{selectedUsernames.length} selecc.</span>
                <button
                  onClick={() => setShowMoveGroupModal(true)}
                  className="px-2 py-0.5 rounded bg-[#274432] text-[#FAF6EE] hover:bg-[#345942] font-mono cursor-pointer flex items-center gap-1"
                  title="Mover estudiantes seleccionados a otro grupo"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#8FA698]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <span>Mover Grupo</span>
                </button>
                <button
                  onClick={() => setShowBulkGradeModal(true)}
                  className="px-2 py-0.5 rounded bg-[#274432] text-[#FAF6EE] hover:bg-[#345942] font-mono cursor-pointer"
                  title="Poner nota masiva a los seleccionados"
                >
                  Asignar Nota
                </button>
                <button
                  onClick={handleBulkDeleteStudents}
                  className="px-2 py-0.5 rounded bg-red-950/80 hover:bg-red-800 text-red-200 border border-red-700/60 font-mono cursor-pointer flex items-center gap-1"
                  title="Eliminar estudiantes seleccionados"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-red-300" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>Eliminar ({selectedUsernames.length})</span>
                </button>
                <button
                  onClick={() => setSelectedUsernames([])}
                  className="text-[#A89F8D] hover:text-[#FAF6EE] px-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            <button
              onClick={() => setShowAddStudentModal(true)}
              className="h-8 px-3 rounded-md bg-[#223028] hover:bg-[#2b3c33] border border-[rgba(217,203,182,0.15)] text-[#FAF6EE] text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#8FA698]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Nuevo Estudiante</span>
            </button>

            <button
              onClick={() => setShowAddColModal(true)}
              className="h-8 px-3 rounded-md bg-[#223028] hover:bg-[#2b3c33] border border-[rgba(217,203,182,0.15)] text-[#FAF6EE] text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Nueva Evaluación</span>
            </button>

            {/* Manage Quiz Passwords Button */}
            {evaluationColumns.length > 0 && (
              <button
                onClick={() => {
                  setSelectedQuizForPass(evaluationColumns[0]);
                  setEditQuizPassInput(quizPasswords[evaluationColumns[0]] || "");
                  setShowQuizPassModal(true);
                }}
                className="h-8 px-3 rounded-md bg-[#223028] hover:bg-[#2b3c33] border border-[rgba(217,203,182,0.15)] text-[#FAF6EE] text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Configurar contraseñas para registro de asistencia de los estudiantes"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#8FA698]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span className="hidden sm:inline">Claves Asistencia</span>
              </button>
            )}

            {evaluationColumns.length > 0 && (
              <button
                onClick={() => setShowDeleteColModal(true)}
                className="h-8 px-2.5 rounded-md bg-[#223028] hover:bg-red-950/40 border border-[rgba(217,203,182,0.15)] text-[#A89F8D] hover:text-red-300 text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
                title="Eliminar columna de evaluación"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}

            <button
              onClick={() => setShowBulkGradeModal(true)}
              className="h-8 px-2.5 rounded-md bg-[#223028] hover:bg-[#2b3c33] border border-[rgba(217,203,182,0.15)] text-[#A89F8D] hover:text-[#FAF6EE] text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors"
              title="Asignar nota masiva a todos los estudiantes del filtro"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-[#D4AF37]" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">Nota Masiva</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Excel Spreadsheet View */}
      <main className="flex-1 p-3 sm:p-6 pt-2 overflow-hidden flex flex-col">
        {/* Mobile Horizontal Scroll Helper */}
        <div className="md:hidden pb-1.5 px-1 flex items-center justify-between text-[11px] text-[#A89F8D]">
          <span>💡 Desliza hacia los lados para ver más columnas</span>
          <span className="font-mono text-[#7A8F73] text-xs">↔</span>
        </div>
        <div className="flex-1 rounded-xl border border-[rgba(217,203,182,0.15)] bg-[#17211b] overflow-hidden flex flex-col shadow-xl">
          <div className="flex-1 overflow-auto">
            {/* TAB: NOTAS (Excel Live) */}
            {activeTab === "grades" && (
              <table className="w-full text-xs text-left border-collapse select-none">
                <thead className="bg-[#1b2620] sticky top-0 z-20 shadow-sm border-b border-[rgba(217,203,182,0.15)]">
                  <tr>
                    <th className="p-2.5 px-3 text-[#8FA698] font-mono font-medium text-[11px] w-10 text-center border-r border-[rgba(217,203,182,0.08)]">
                      <input
                        type="checkbox"
                        checked={filteredStudents.length > 0 && selectedUsernames.length === filteredStudents.length}
                        onChange={toggleSelectAll}
                        className="cursor-pointer accent-[#8FA698]"
                      />
                    </th>
                    <th className="p-2.5 px-3 text-[#8FA698] font-mono font-medium text-[11px] w-12 text-center border-r border-[rgba(217,203,182,0.08)]">
                      #
                    </th>
                    <th className="p-2.5 px-4 text-[#FAF6EE] font-serif font-bold text-xs sticky left-0 z-30 bg-[#1b2620] border-r border-[rgba(217,203,182,0.12)] min-w-[220px]">
                      Nombre del Estudiante
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] min-w-[120px] border-r border-[rgba(217,203,182,0.08)]">
                      Usuario
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] min-w-[120px] border-r border-[rgba(217,203,182,0.08)] text-center">
                      Grupo
                    </th>

                    {/* Dynamic evaluation columns with key password icon */}
                    {evaluationColumns.map((col) => {
                      const hasPass = !!quizPasswords[col]?.trim();
                      return (
                        <th
                          key={col}
                          className="p-2.5 px-3 text-[#D4AF37] font-mono font-bold text-[11px] text-center min-w-[80px] border-r border-[rgba(217,203,182,0.08)]"
                        >
                          <div className="flex items-center justify-center gap-1">
                            <span>{col}</span>
                            <button
                              onClick={() => {
                                setSelectedQuizForPass(col);
                                setEditQuizPassInput(quizPasswords[col] || "");
                                setShowQuizPassModal(true);
                              }}
                              className={`p-0.5 rounded hover:bg-[#25362c] cursor-pointer transition-colors ${
                                hasPass ? "text-[#8FA698]" : "text-[#A89F8D]/30 hover:text-[#A89F8D]"
                              }`}
                              title={
                                hasPass
                                  ? `Contraseña de asistencia: "${quizPasswords[col]}". Clic para editar.`
                                  : "Sin contraseña de asistencia. Clic para configurar."
                              }
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill={hasPass ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                              </svg>
                            </button>
                          </div>
                        </th>
                      );
                    })}

                    <th className="p-2.5 px-4 text-[#FAF6EE] font-serif font-bold text-xs text-center min-w-[90px] bg-[#1e2b24] border-r border-[rgba(217,203,182,0.12)]">
                      Promedio
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] text-center w-24">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(217,203,182,0.06)] font-sans">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7 + evaluationColumns.length} className="p-8 text-center text-xs text-[#A89F8D]">
                        No se encontraron estudiantes con los filtros actuales.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((st, idx) => {
                      const avg = getStudentAverage(st.grades);
                      const isSelected = selectedUsernames.includes(st.username);

                      return (
                        <tr
                          key={st.username}
                          className={`transition-colors group ${
                            isSelected ? "bg-[#203326]" : "hover:bg-[#1f2d24]/60"
                          }`}
                        >
                          {/* Selection Checkbox */}
                          <td className="p-2 text-center border-r border-[rgba(217,203,182,0.06)]">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectStudent(st.username)}
                              className="cursor-pointer accent-[#8FA698]"
                            />
                          </td>

                          {/* Row # */}
                          <td className="p-2 text-center text-[11px] font-mono text-[#8FA698]/70 border-r border-[rgba(217,203,182,0.06)]">
                            {idx + 1}
                          </td>

                          {/* Student Full Name (Sticky) */}
                          <td className="p-2.5 px-4 text-[#FAF6EE] font-medium sticky left-0 z-10 bg-[#17211b] group-hover:bg-[#1d2921] border-r border-[rgba(217,203,182,0.1)] truncate max-w-[240px]">
                            <div className="truncate font-semibold">{st.fullName}</div>
                            <div className="text-[10px] text-[#A89F8D] truncate">{st.program || "Sin programa"}</div>
                          </td>

                          {/* Username */}
                          <td className="p-2 px-3 font-mono text-[11px] text-[#C8B99D] border-r border-[rgba(217,203,182,0.06)]">
                            {st.username}
                          </td>

                          {/* Interactive Group Badge (Opens Group Change Modal) */}
                          <td className="p-2 px-3 text-center border-r border-[rgba(217,203,182,0.06)]">
                            <button
                              onClick={() => {
                                setStudentToChangeGroup(st);
                                setCustomNewGroupName("");
                              }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#1d2b22] hover:bg-[#273b2f] border border-[#3b4e42] text-[#8FA698] hover:text-[#FAF6EE] font-mono text-[11px] font-semibold transition-all cursor-pointer shadow-xs group/grpbtn"
                              title="Haz clic para cambiar a este estudiante de grupo"
                            >
                              <span>{st.group || "Sin Grupo"}</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#A89F8D] group-hover/grpbtn:text-[#8FA698]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                              </svg>
                            </button>
                          </td>

                          {/* Grade Cells (Editable Excel-like inputs) */}
                          {evaluationColumns.map((col) => {
                            const val = st.grades?.[col];
                            const displayVal = val !== null && val !== undefined ? val : "";
                            const isPassing = val !== null && val !== undefined && val >= 3.0;
                            const isFailing = val !== null && val !== undefined && val < 3.0;

                            return (
                              <td
                                key={col}
                                className="p-1 px-1.5 text-center border-r border-[rgba(217,203,182,0.06)]"
                              >
                                <input
                                  type="text"
                                  inputMode="decimal"
                                  value={displayVal}
                                  onChange={(e) => handleGradeChange(st.username, col, e.target.value)}
                                  placeholder="—"
                                  className={`w-full h-7 text-center font-mono text-xs rounded transition-all focus:outline-none focus:ring-1 focus:ring-[#8FA698] ${
                                    isPassing
                                      ? "bg-[#1b2b21] text-[#9ae6b4] font-bold"
                                      : isFailing
                                      ? "bg-[#2d1b1b] text-[#feb2b2] font-bold"
                                      : "bg-[#141b16] text-[#A89F8D]"
                                  }`}
                                />
                              </td>
                            );
                          })}

                          {/* Promedio */}
                          <td className="p-2 px-4 text-center font-mono font-bold text-xs bg-[#1a251e] border-r border-[rgba(217,203,182,0.1)]">
                            {avg !== null ? (
                              <span
                                className={`px-2 py-0.5 rounded ${
                                  avg >= 3.0
                                    ? "text-[#a5e0b8] bg-[#1d3527]"
                                    : "text-[#fca5a5] bg-red-950/60"
                                }`}
                              >
                                {avg.toFixed(2)}
                              </span>
                            ) : (
                              <span className="text-[#A89F8D]">—</span>
                            )}
                          </td>

                          {/* Row Actions */}
                          <td className="p-2 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setStudentToChangeGroup(st);
                                  setCustomNewGroupName("");
                                }}
                                className="p-1.5 rounded hover:bg-[#25362c] text-[#8FA698] hover:text-[#FAF6EE] cursor-pointer transition-colors"
                                title="Cambiar grupo del estudiante"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteStudent(st.username)}
                                className="p-1.5 rounded hover:bg-red-950/60 text-[#A89F8D] hover:text-red-400 cursor-pointer transition-colors"
                                title="Eliminar estudiante"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}

            {/* TAB: ASISTENCIA */}
            {activeTab === "attendance" && (
              <table className="w-full text-xs text-left border-collapse select-none">
                <thead className="bg-[#1b2620] sticky top-0 z-20 shadow-sm border-b border-[rgba(217,203,182,0.15)]">
                  <tr>
                    <th className="p-2.5 px-3 text-[#8FA698] font-mono font-medium text-[11px] w-10 text-center border-r border-[rgba(217,203,182,0.08)]">
                      <input
                        type="checkbox"
                        checked={filteredStudents.length > 0 && selectedUsernames.length === filteredStudents.length}
                        onChange={toggleSelectAll}
                        className="cursor-pointer accent-[#8FA698]"
                      />
                    </th>
                    <th className="p-2.5 px-3 text-[#8FA698] font-mono font-medium text-[11px] w-12 text-center border-r border-[rgba(217,203,182,0.08)]">
                      #
                    </th>
                    <th className="p-2.5 px-4 text-[#FAF6EE] font-serif font-bold text-xs sticky left-0 z-30 bg-[#1b2620] border-r border-[rgba(217,203,182,0.12)] min-w-[220px]">
                      Nombre del Estudiante
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] min-w-[120px] border-r border-[rgba(217,203,182,0.08)] text-center">
                      Grupo
                    </th>

                    {/* Attendance columns with quick toggle all */}
                    {attendanceColumns.map((col) => (
                      <th
                        key={col}
                        className="p-2 px-2 text-[#8FA698] font-mono text-[11px] text-center min-w-[76px] border-r border-[rgba(217,203,182,0.08)]"
                      >
                        <div className="font-bold">{col}</div>
                        <div className="flex items-center justify-center gap-1 mt-0.5">
                          <button
                            onClick={() => handleMarkAllPresent(col)}
                            className="text-[9px] text-[#a5e0b8] hover:underline cursor-pointer"
                            title="Marcar todos presentes en esta sesión"
                          >
                            Todos P
                          </button>
                          <span>·</span>
                          <button
                            onClick={() => handleMarkAllAbsent(col)}
                            className="text-[9px] text-red-400 hover:underline cursor-pointer"
                            title="Marcar todos ausentes"
                          >
                            Todos A
                          </button>
                        </div>
                      </th>
                    ))}

                    <th className="p-2.5 px-3 text-[#FAF6EE] font-mono text-[11px] text-center min-w-[70px] bg-[#1e2b24] border-r border-[rgba(217,203,182,0.12)]">
                      Faltas
                    </th>
                    <th className="p-2.5 px-3 text-[#FAF6EE] font-mono text-[11px] text-center min-w-[70px] bg-[#1e2b24]">
                      % Asist.
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(217,203,182,0.06)] font-sans">
                  {filteredStudents.map((st, idx) => {
                    const { absent, pct } = getStudentAttendanceStats(st.attendance);
                    const isSelected = selectedUsernames.includes(st.username);

                    return (
                      <tr
                        key={st.username}
                        className={`transition-colors group ${
                          isSelected ? "bg-[#203326]" : "hover:bg-[#1f2d24]/60"
                        }`}
                      >
                        <td className="p-2 text-center border-r border-[rgba(217,203,182,0.06)]">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectStudent(st.username)}
                            className="cursor-pointer accent-[#8FA698]"
                          />
                        </td>
                        <td className="p-2 text-center text-[11px] font-mono text-[#8FA698]/70 border-r border-[rgba(217,203,182,0.06)]">
                          {idx + 1}
                        </td>
                        <td className="p-2.5 px-4 text-[#FAF6EE] font-medium sticky left-0 z-10 bg-[#17211b] group-hover:bg-[#1d2921] border-r border-[rgba(217,203,182,0.1)] truncate max-w-[240px]">
                          <div className="truncate font-semibold">{st.fullName}</div>
                          <div className="text-[10px] text-[#A89F8D] truncate">{st.username}</div>
                        </td>
                        <td className="p-2 px-3 font-mono text-[11px] text-center text-[#8FA698] border-r border-[rgba(217,203,182,0.06)]">
                          <button
                            onClick={() => {
                              setStudentToChangeGroup(st);
                              setCustomNewGroupName("");
                            }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1e2a22] hover:bg-[#283b30] border border-[#3b4e42] text-[10px] cursor-pointer"
                            title="Cambiar grupo"
                          >
                            <span>{st.group}</span>
                          </button>
                        </td>

                        {/* Interactive Attendance Toggle Badges */}
                        {attendanceColumns.map((col) => {
                          const status = st.attendance?.[col] || "pendiente";
                          return (
                            <td
                              key={col}
                              className="p-1 px-1.5 text-center border-r border-[rgba(217,203,182,0.06)]"
                            >
                              <button
                                onClick={() => handleAttendanceToggle(st.username, col)}
                                className={`w-8 h-7 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
                                  status === "presente"
                                    ? "bg-[#183624] text-[#a5e0b8] border border-[#2f6645]"
                                    : status === "excusa"
                                    ? "bg-amber-950/80 text-amber-300 border border-amber-700/50"
                                    : status === "ausente"
                                    ? "bg-red-950/80 text-red-300 border border-red-800/50"
                                    : "bg-[#1f2c23] text-[#A89F8D] border border-[rgba(217,203,182,0.15)] hover:border-[#7A8F73]"
                                }`}
                                title={`Clic para alternar: ${status.toUpperCase()} (P = Presente, A = Ausente [Bloquea registro del estudiante], E = Excusa, — = Pendiente)`}
                              >
                                {status === "presente" ? "P" : status === "excusa" ? "E" : status === "ausente" ? "A" : "—"}
                              </button>
                            </td>
                          );
                        })}

                        {/* Total Faltas */}
                        <td className="p-2 px-3 text-center font-mono font-bold text-xs bg-[#1a251e] border-r border-[rgba(217,203,182,0.1)]">
                          <span
                            className={`px-2 py-0.5 rounded ${
                              absent === 0
                                ? "text-[#a5e0b8] bg-[#1d3527]"
                                : absent > 3
                                ? "text-red-300 bg-red-950"
                                : "text-amber-300 bg-amber-950"
                            }`}
                          >
                            {absent}
                          </span>
                        </td>

                        {/* % Asistencia */}
                        <td className="p-2 px-3 text-center font-mono font-bold text-xs bg-[#1a251e]">
                          <span className={pct >= 80 ? "text-[#a5e0b8]" : "text-red-300 font-bold"}>
                            {pct}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {/* TAB: ESTUDIANTES (Edición de Metadata y Grupos) */}
            {activeTab === "students" && (
              <table className="w-full text-xs text-left border-collapse select-none">
                <thead className="bg-[#1b2620] sticky top-0 z-20 shadow-sm border-b border-[rgba(217,203,182,0.15)]">
                  <tr>
                    <th className="p-2.5 px-3 text-[#8FA698] font-mono font-medium text-[11px] w-10 text-center border-r border-[rgba(217,203,182,0.08)]">
                      <input
                        type="checkbox"
                        checked={filteredStudents.length > 0 && selectedUsernames.length === filteredStudents.length}
                        onChange={toggleSelectAll}
                        className="cursor-pointer accent-[#8FA698]"
                      />
                    </th>
                    <th className="p-2.5 px-3 text-[#8FA698] font-mono text-[11px] w-12 text-center border-r border-[rgba(217,203,182,0.08)]">
                      #
                    </th>
                    <th className="p-2.5 px-4 text-[#FAF6EE] font-serif font-bold text-xs border-r border-[rgba(217,203,182,0.08)]">
                      Nombre Completo
                    </th>
                    <th className="p-2.5 px-3 text-[#FAF6EE] font-mono text-[11px] border-r border-[rgba(217,203,182,0.08)]">
                      Usuario Institucional
                    </th>
                    <th className="p-2.5 px-3 text-[#FAF6EE] font-mono text-[11px] border-r border-[rgba(217,203,182,0.08)]">
                      Correo Electrónico
                    </th>
                    <th className="p-2.5 px-3 text-[#FAF6EE] font-mono text-[11px] border-r border-[rgba(217,203,182,0.08)]">
                      Programa Académico
                    </th>
                    <th className="p-2.5 px-3 text-[#FAF6EE] font-mono text-[11px] border-r border-[rgba(217,203,182,0.08)] min-w-[140px] text-center">
                      Grupo Actual
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] text-center w-28">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(217,203,182,0.06)] font-sans">
                  {filteredStudents.map((st, idx) => (
                    <tr key={st.username} className="hover:bg-[#1f2d24]/60 transition-colors">
                      <td className="p-2 text-center border-r border-[rgba(217,203,182,0.06)]">
                        <input
                          type="checkbox"
                          checked={selectedUsernames.includes(st.username)}
                          onChange={() => toggleSelectStudent(st.username)}
                          className="cursor-pointer accent-[#8FA698]"
                        />
                      </td>
                      <td className="p-2 text-center text-[11px] font-mono text-[#8FA698]/70 border-r border-[rgba(217,203,182,0.06)]">
                        {idx + 1}
                      </td>
                      <td className="p-1.5 px-3 border-r border-[rgba(217,203,182,0.06)]">
                        <input
                          type="text"
                          value={st.fullName}
                          onChange={(e) => handleStudentFieldChange(st.username, "fullName", e.target.value)}
                          className="academic-input w-full h-7 px-2 text-xs rounded bg-[#131a15]"
                        />
                      </td>
                      <td className="p-1.5 px-3 border-r border-[rgba(217,203,182,0.06)]">
                        <input
                          type="text"
                          value={st.username}
                          onChange={(e) => handleStudentFieldChange(st.username, "username", e.target.value)}
                          className="academic-input w-full h-7 px-2 font-mono text-xs rounded bg-[#131a15]"
                        />
                      </td>
                      <td className="p-1.5 px-3 border-r border-[rgba(217,203,182,0.06)]">
                        <input
                          type="text"
                          value={st.email}
                          onChange={(e) => handleStudentFieldChange(st.username, "email", e.target.value)}
                          className="academic-input w-full h-7 px-2 font-mono text-xs rounded bg-[#131a15]"
                        />
                      </td>
                      <td className="p-1.5 px-3 border-r border-[rgba(217,203,182,0.06)]">
                        <input
                          type="text"
                          value={st.program}
                          onChange={(e) => handleStudentFieldChange(st.username, "program", e.target.value)}
                          className="academic-input w-full h-7 px-2 text-xs rounded bg-[#131a15]"
                        />
                      </td>
                      <td className="p-1.5 px-3 text-center border-r border-[rgba(217,203,182,0.06)]">
                        <button
                          onClick={() => {
                            setStudentToChangeGroup(st);
                            setCustomNewGroupName("");
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1e2a22] hover:bg-[#283b30] border border-[#3b4e42] text-[#8FA698] hover:text-[#FAF6EE] font-mono text-xs cursor-pointer transition-colors"
                          title="Cambiar grupo del estudiante"
                        >
                          <span className="font-semibold">{st.group || "Sin Grupo"}</span>
                          <span className="text-[10px] text-[#A89F8D]">✎</span>
                        </button>
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => {
                              setStudentToChangeGroup(st);
                              setCustomNewGroupName("");
                            }}
                            className="px-2 py-1 rounded bg-[#1f2c24] hover:bg-[#273b2f] border border-[#3b4e42] text-[#8FA698] hover:text-[#FAF6EE] text-[10px] font-mono cursor-pointer transition-colors"
                          >
                            Mover
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(st.username)}
                            className="p-1 rounded hover:bg-red-950/60 text-[#A89F8D] hover:text-red-400 cursor-pointer transition-colors"
                            title="Eliminar estudiante"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* TAB: ESTADÍSTICAS */}
            {activeTab === "stats" && (
              <div className="p-6 space-y-6 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#1b2620] p-4 rounded-xl border border-[rgba(217,203,182,0.12)] space-y-1">
                    <span className="text-[11px] font-mono text-[#8FA698] uppercase">Aprobados (≥ 3.0)</span>
                    <div className="text-2xl font-bold font-serif text-[#a5e0b8]">{groupStats.passing}</div>
                    <p className="text-[10px] text-[#A89F8D]">{groupStats.passingPct}% del grupo seleccionado</p>
                  </div>
                  <div className="bg-[#1b2620] p-4 rounded-xl border border-[rgba(217,203,182,0.12)] space-y-1">
                    <span className="text-[11px] font-mono text-[#D4AF37] uppercase">Reprobados (&lt; 3.0)</span>
                    <div className="text-2xl font-bold font-serif text-[#fca5a5]">{groupStats.failing}</div>
                    <p className="text-[10px] text-[#A89F8D]">{100 - groupStats.passingPct}% del grupo seleccionado</p>
                  </div>
                </div>

                {/* Groups Summary Table */}
                <div className="bg-[#1b2620] rounded-xl border border-[rgba(217,203,182,0.12)] p-5 space-y-3">
                  <h3 className="text-xs font-serif font-bold text-[#FAF6EE] uppercase tracking-wider">
                    Resumen Comparativo por Grupos
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-[rgba(217,203,182,0.1)] text-[#8FA698] font-mono text-[11px]">
                          <th className="py-2">Grupo</th>
                          <th className="py-2 text-center">Total Estudiantes</th>
                          <th className="py-2 text-center">Promedio</th>
                          <th className="py-2 text-center">Aprobados</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgba(217,203,182,0.06)] font-mono">
                        {groups.map((grp) => {
                          const grpStudents = students.filter((s) => s.group === grp);
                          let sum = 0;
                          let counted = 0;
                          let pass = 0;

                          grpStudents.forEach((s) => {
                            const avg = getStudentAverage(s.grades);
                            if (avg !== null) {
                              sum += avg;
                              counted++;
                              if (avg >= 3.0) pass++;
                            }
                          });

                          const grpAvg = counted > 0 ? (sum / counted).toFixed(2) : "—";

                          return (
                            <tr key={grp} className="hover:bg-[#223028]/50">
                              <td className="py-2.5 font-bold text-[#FAF6EE]">{grp}</td>
                              <td className="py-2.5 text-center text-[#A89F8D]">{grpStudents.length}</td>
                              <td className="py-2.5 text-center font-bold text-[#D4AF37]">{grpAvg}</td>
                              <td className="py-2.5 text-center text-[#a5e0b8]">{pass}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar inside sheet */}
          <div className="p-2.5 px-4 bg-[#141b16] border-t border-[rgba(217,203,182,0.1)] flex items-center justify-between text-[11px] text-[#A89F8D] font-mono">
            <div className="flex items-center gap-3">
              <span>{filteredStudents.length} estudiantes listados</span>
              <span>·</span>
              <span>{evaluationColumns.length} evaluaciones</span>
              <span>·</span>
              <span>{groups.length} grupos activos</span>
            </div>
            <div>
              <Link href="/dashboard" className="text-[#8FA698] hover:underline">
                Ir a Vista Estudiante →
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* MODAL: CAMBIAR ESTUDIANTE DE GRUPO (Dedicado y Claro) */}
      {/* ======================================================== */}
      {studentToChangeGroup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.25)] rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 sm:space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(217,203,182,0.1)] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#223028] border border-[#3b4e42] flex items-center justify-center text-[#8FA698]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Cambiar Grupo de Estudiante</h2>
                  <p className="text-[10px] text-[#A89F8D]">Reasignar curso o grupo académico</p>
                </div>
              </div>
              <button
                onClick={() => setStudentToChangeGroup(null)}
                className="text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            {/* Student Info Card */}
            <div className="bg-[#121914] p-3.5 rounded-xl border border-[rgba(217,203,182,0.08)] flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-[#FAF6EE]">{studentToChangeGroup.fullName}</h3>
                <p className="text-[10px] font-mono text-[#A89F8D]">{studentToChangeGroup.username} · {studentToChangeGroup.program || "UNAL"}</p>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono text-[#A89F8D] block uppercase">Grupo Actual:</span>
                <span className="px-2 py-0.5 rounded bg-[#1e2a22] border border-[#3b4e42] text-xs font-mono font-bold text-[#8FA698]">
                  {studentToChangeGroup.group || "Sin Grupo"}
                </span>
              </div>
            </div>

            {/* Option 1: Select from existing groups */}
            <div className="space-y-2 text-xs">
              <label className="text-[#A89F8D] font-mono uppercase text-[11px] block">
                Selecciona el nuevo grupo destino:
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                {groups.map((grp) => {
                  const isCurrent = studentToChangeGroup.group === grp;
                  const count = students.filter((s) => s.group === grp).length;
                  return (
                    <button
                      key={grp}
                      onClick={() => handleAssignStudentToGroup(studentToChangeGroup.username, grp)}
                      disabled={isCurrent}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isCurrent
                          ? "bg-[#162019] border-[#2d4234] opacity-50 cursor-not-allowed"
                          : "bg-[#1e2c23] hover:bg-[#283c30] border-[#3b4e42] hover:border-[#8FA698] text-[#FAF6EE]"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono font-bold text-xs">{grp}</span>
                        {isCurrent && <span className="text-[9px] text-[#8FA698]">(Actual)</span>}
                      </div>
                      <span className="text-[10px] text-[#A89F8D] font-mono mt-1">
                        {count} estudiante(s)
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Option 2: Type a brand new group */}
            <div className="space-y-2 pt-2 border-t border-[rgba(217,203,182,0.1)] text-xs">
              <label className="text-[#A89F8D] block text-[11px]">O escribir un nuevo grupo:</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="ej: GEA 26"
                  value={customNewGroupName}
                  onChange={(e) => setCustomNewGroupName(e.target.value)}
                  className="academic-input flex-1 h-9 rounded-md px-3 font-mono bg-[#121914]"
                />
                <button
                  onClick={() => handleAssignStudentToGroup(studentToChangeGroup.username, customNewGroupName)}
                  disabled={!customNewGroupName.trim()}
                  className="academic-btn-primary h-9 px-4 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
                >
                  Asignar
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setStudentToChangeGroup(null)}
                className="h-8 px-4 rounded-md text-xs text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Nuevo Estudiante */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.2)] rounded-xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(217,203,182,0.1)] pb-3">
              <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Agregar Nuevo Estudiante</h2>
              <button onClick={() => setShowAddStudentModal(false)} className="text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#A89F8D] block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="ej: María Alejandra López"
                  value={newStudent.fullName}
                  onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                  className="academic-input w-full h-9 rounded-md px-3 bg-[#131a15]"
                />
              </div>

              <div>
                <label className="text-[#A89F8D] block mb-1">Usuario UNAL (sin @unal.edu.co)</label>
                <input
                  type="text"
                  placeholder="ej: malopez"
                  value={newStudent.username}
                  onChange={(e) => {
                    const u = e.target.value.toLowerCase().trim();
                    setNewStudent({
                      ...newStudent,
                      username: u,
                      email: u ? `${u}@unal.edu.co` : "",
                    });
                  }}
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15]"
                />
              </div>

              <div>
                <label className="text-[#A89F8D] block mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="malopez@unal.edu.co"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#A89F8D] block mb-1">Programa</label>
                  <input
                    type="text"
                    placeholder="ej: Ingeniería Civil"
                    value={newStudent.program}
                    onChange={(e) => setNewStudent({ ...newStudent, program: e.target.value })}
                    className="academic-input w-full h-9 rounded-md px-3 bg-[#131a15]"
                  />
                </div>
                <div>
                  <label className="text-[#A89F8D] block mb-1">Grupo</label>
                  <select
                    value={newStudent.group || (selectedGroup !== "ALL" ? selectedGroup : groups[0] || "")}
                    onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })}
                    className="academic-input w-full h-9 rounded-md px-2 font-mono bg-[#131a15] text-[#FAF6EE] cursor-pointer"
                  >
                    {groups.map((grp) => (
                      <option key={grp} value={grp}>
                        {grp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(217,203,182,0.1)]">
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="h-8 px-3 rounded-md text-xs text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddStudent}
                className="academic-btn-primary h-8 px-4 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Crear Nuevo Grupo */}
      {showNewGroupModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.2)] rounded-xl max-w-sm w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(217,203,182,0.1)] pb-3">
              <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Crear Nuevo Grupo</h2>
              <button onClick={() => setShowNewGroupModal(false)} className="text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#A89F8D] block mb-1">Nombre o Código del Grupo</label>
                <input
                  type="text"
                  placeholder="ej: GEA 25, Grupo 02, etc."
                  value={newGroupNameInput}
                  onChange={(e) => setNewGroupNameInput(e.target.value)}
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15]"
                  autoFocus
                />
                <p className="text-[10px] text-[#A89F8D] mt-1.5">
                  El nuevo grupo quedará habilitado para asignar estudiantes de inmediato.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(217,203,182,0.1)]">
              <button
                onClick={() => setShowNewGroupModal(false)}
                className="h-8 px-3 rounded-md text-xs text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateGroup}
                className="academic-btn-primary h-8 px-4 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Crear Grupo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Eliminar Uno o Múltiples Grupos */}
      {showDeleteGroupModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.25)] rounded-2xl max-w-md w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(217,203,182,0.1)] pb-3">
              <div>
                <h2 className="text-sm font-serif font-bold text-red-300">Eliminar Grupos</h2>
                <p className="text-[10px] text-[#A89F8D]">Selecciona uno o más grupos para eliminar</p>
              </div>
              <button onClick={() => setShowDeleteGroupModal(false)} className="text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Quick Select/Deselect All */}
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-[rgba(217,203,182,0.06)] pb-1.5">
                <span className="text-[#A89F8D]">Grupos disponibles ({groups.length}):</span>
                <button
                  type="button"
                  onClick={toggleSelectAllGroupsToDelete}
                  className="text-[#8FA698] hover:underline cursor-pointer"
                >
                  {groupsToDelete.length === groups.length ? "Deseleccionar Todos" : "Seleccionar Todos"}
                </button>
              </div>

              {/* Group Checkbox List */}
              <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                {groups.map((grp) => {
                  const isChecked = groupsToDelete.includes(grp);
                  const count = students.filter((s) => s.group === grp).length;
                  return (
                    <label
                      key={grp}
                      className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all ${
                        isChecked
                          ? "bg-red-950/40 border-red-700/60 text-red-200"
                          : "bg-[#131a15] border-[#223028] text-[#EDE5D8] hover:border-[#3b4e42]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleGroupToDelete(grp)}
                          className="accent-red-600 cursor-pointer"
                        />
                        <span className="font-mono font-bold">{grp}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#A89F8D]">
                        {count} estudiante(s)
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* What to do with students */}
              <div className="space-y-2 pt-2 border-t border-[rgba(217,203,182,0.1)]">
                <label className="text-[#A89F8D] font-mono uppercase text-[10px] block">
                  ¿Qué hacer con los estudiantes de los grupos eliminados?
                </label>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="radio"
                      name="groupDeleteAction"
                      checked={groupDeleteAction === "reassign"}
                      onChange={() => setGroupDeleteAction("reassign")}
                      className="accent-[#8FA698]"
                    />
                    <span>Reasignar a otro grupo</span>
                  </label>

                  {groupDeleteAction === "reassign" && (
                    <div className="pl-5">
                      <select
                        value={groupReassignTarget}
                        onChange={(e) => setGroupReassignTarget(e.target.value)}
                        className="academic-input w-full h-8 px-2.5 font-mono text-xs bg-[#131a15] text-[#FAF6EE] rounded"
                      >
                        <option value="">-- Sin Grupo / General --</option>
                        {groups
                          .filter((g) => !groupsToDelete.includes(g))
                          .map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}

                  <label className="flex items-center gap-2 text-xs text-red-300 cursor-pointer">
                    <input
                      type="radio"
                      name="groupDeleteAction"
                      checked={groupDeleteAction === "delete-students"}
                      onChange={() => setGroupDeleteAction("delete-students")}
                      className="accent-red-600"
                    />
                    <span>Eliminar también a todos sus estudiantes de la plataforma</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(217,203,182,0.1)]">
              <button
                onClick={() => setShowDeleteGroupModal(false)}
                className="h-8 px-3 rounded-md text-xs text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleExecuteDeleteGroups}
                disabled={groupsToDelete.length === 0}
                className="h-8 px-4 rounded-md text-xs font-bold uppercase tracking-wider bg-red-800 hover:bg-red-700 text-white cursor-pointer disabled:opacity-40"
              >
                Eliminar {groupsToDelete.length > 0 ? `(${groupsToDelete.length})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Mover Grupo Masivo (Selección Múltiple) */}
      {showMoveGroupModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.2)] rounded-xl max-w-sm w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(217,203,182,0.1)] pb-3">
              <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Mover Estudiantes de Grupo</h2>
              <button onClick={() => setShowMoveGroupModal(false)} className="text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#A89F8D]">
                Mover <span className="text-[#FAF6EE] font-bold">{selectedUsernames.length}</span> estudiante(s) seleccionados a:
              </p>
              <div>
                <label className="text-[#A89F8D] block mb-1">Grupo destino:</label>
                <select
                  value={targetMoveGroup}
                  onChange={(e) => setTargetMoveGroup(e.target.value)}
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15] text-[#FAF6EE]"
                >
                  <option value="">-- Seleccionar grupo --</option>
                  {groups.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(217,203,182,0.1)]">
              <button
                onClick={() => setShowMoveGroupModal(false)}
                className="h-8 px-3 rounded-md text-xs text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleMoveSelectedToGroup}
                disabled={!targetMoveGroup}
                className="academic-btn-primary h-8 px-4 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                Mover
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Nota Masiva */}
      {showBulkGradeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.2)] rounded-xl max-w-sm w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(217,203,182,0.1)] pb-3">
              <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Asignar Nota Masiva</h2>
              <button onClick={() => setShowBulkGradeModal(false)} className="text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[11px] text-[#A89F8D]">
                Afectará a{" "}
                <span className="text-[#FAF6EE] font-bold">
                  {selectedUsernames.length > 0 ? selectedUsernames.length : filteredStudents.length}
                </span>{" "}
                estudiante(s).
              </p>

              <div>
                <label className="text-[#A89F8D] block mb-1">Evaluación / Columna:</label>
                <select
                  value={bulkGradeCol}
                  onChange={(e) => setBulkGradeCol(e.target.value)}
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15] text-[#FAF6EE]"
                >
                  <option value="">-- Seleccionar columna --</option>
                  {evaluationColumns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[#A89F8D] block mb-1">Nota (0.0 - 5.0) o dejar vacío para limpiar:</label>
                <input
                  type="text"
                  placeholder="ej: 5.0"
                  value={bulkGradeValue}
                  onChange={(e) => setBulkGradeValue(e.target.value)}
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(217,203,182,0.1)]">
              <button
                onClick={() => setShowBulkGradeModal(false)}
                className="h-8 px-3 rounded-md text-xs text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleApplyBulkGrade}
                disabled={!bulkGradeCol}
                className="academic-btn-primary h-8 px-4 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                Aplicar Nota
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Nueva Evaluación (Columna) */}
      {showAddColModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.2)] rounded-xl max-w-sm w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(217,203,182,0.1)] pb-3">
              <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Nueva Columna de Evaluación</h2>
              <button onClick={() => setShowAddColModal(false)} className="text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#A89F8D] block mb-1">Nombre de la Evaluación / Columna</label>
                <input
                  type="text"
                  placeholder={`Quiz ${evaluationColumns.length + 1}`}
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15]"
                  autoFocus
                />
                <p className="text-[10px] text-[#A89F8D] mt-1">
                  Se creará la columna para todos los estudiantes con valor pendiente (—).
                </p>
              </div>

              <div>
                <label className="text-[#A89F8D] block mb-1">
                  Contraseña para Asistencia (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Dejar vacío si no requiere contraseña"
                  value={newColPassword}
                  onChange={(e) => setNewColPassword(e.target.value)}
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15]"
                />
                <p className="text-[10px] text-[#8FA698] mt-1">
                  Si la defines, el estudiante deberá ingresarla para auto-registrar su asistencia. Si la dejas vacía, podrá registrarse directamente sin contraseña.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(217,203,182,0.1)]">
              <button
                onClick={() => setShowAddColModal(false)}
                className="h-8 px-3 rounded-md text-xs text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddColumn}
                className="academic-btn-primary h-8 px-4 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Crear Columna
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Gestionar Claves de Asistencia de Quices */}
      {showQuizPassModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.25)] rounded-2xl max-w-lg w-full p-5 sm:p-7 space-y-4 sm:space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(217,203,182,0.1)] pb-3">
              <div>
                <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Claves de Asistencia por Evaluación</h2>
                <p className="text-[10px] text-[#A89F8D]">Configura contraseña para obligar clave o déjalo abierto para auto-registro libre</p>
              </div>
              <button onClick={() => setShowQuizPassModal(false)} className="text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer p-1">✕</button>
            </div>

            {/* List of all quizzes with their status */}
            <div className="space-y-2 text-xs">
              <label className="text-[11px] font-mono text-[#A89F8D] block uppercase">
                Estado actual de las evaluaciones ({evaluationColumns.length}):
              </label>

              <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1">
                {evaluationColumns.map((col) => {
                  const hasPass = !!quizPasswords[col]?.trim();
                  const isSelected = selectedQuizForPass === col;

                  return (
                    <div
                      key={col}
                      onClick={() => {
                        setSelectedQuizForPass(col);
                        setEditQuizPassInput(quizPasswords[col] || "");
                      }}
                      className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-[#223328] border-[#7A8F73] text-[#FAF6EE]"
                          : "bg-[#131a15] border-[#202d25] text-[#EDE5D8] hover:border-[#35483b]"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-mono font-bold text-xs">{col}</span>
                        {hasPass ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#7A8F73]/20 text-[#a5e0b8] border border-[#7A8F73]/40">
                            🔒 Clave: {quizPasswords[col]}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#223028] text-[#C8B99D] border border-[rgba(217,203,182,0.15)]">
                            🔓 Abierto (Sin clave)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {hasPass && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLeaveQuizOpen(col);
                            }}
                            className="px-2 py-1 rounded text-[10px] font-medium bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/40 cursor-pointer transition-colors"
                            title="Dejar abierto para que cualquier estudiante pueda registrarse sin clave"
                          >
                            Dejar Abierto
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuizForPass(col);
                            setEditQuizPassInput(quizPasswords[col] || "");
                          }}
                          className="px-2 py-1 rounded text-[10px] font-medium bg-[#223028] hover:bg-[#2b3c33] text-[#EDE5D8] border border-[rgba(217,203,182,0.15)] cursor-pointer"
                        >
                          {hasPass ? "Cambiar" : "Asignar Clave"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Quiz Editor Form */}
            {selectedQuizForPass && (
              <div className="p-3.5 rounded-xl bg-[#131a15] border border-[rgba(217,203,182,0.15)] space-y-3 text-xs animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#FAF6EE]">
                    Editar clave para: <span className="font-mono text-[#D4AF37]">{selectedQuizForPass}</span>
                  </span>
                  {quizPasswords[selectedQuizForPass] ? (
                    <span className="text-[10px] text-[#a5e0b8] font-mono">Estado: Protegido con clave</span>
                  ) : (
                    <span className="text-[10px] text-[#C8B99D] font-mono">Estado: Abierto</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#A89F8D] block text-[11px]">
                    Nueva Contraseña de Asistencia:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Escribe la clave o deja en blanco para dejarlo abierto"
                      value={editQuizPassInput}
                      onChange={(e) => setEditQuizPassInput(e.target.value)}
                      className="academic-input flex-1 h-9 rounded-md px-3 font-mono text-xs bg-[#17211b]"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleSaveQuizPassword();
                      }}
                      className="academic-btn-primary h-9 px-3.5 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[rgba(217,203,182,0.08)] text-[11px]">
                  <p className="text-[#A89F8D] text-[10px]">
                    {editQuizPassInput.trim()
                      ? `Requerirá "${editQuizPassInput.trim()}" a los estudiantes.`
                      : "Sin clave: registro libre habilitado."}
                  </p>
                  {quizPasswords[selectedQuizForPass] && (
                    <button
                      type="button"
                      onClick={() => handleLeaveQuizOpen(selectedQuizForPass)}
                      className="text-red-400 hover:text-red-300 underline cursor-pointer"
                    >
                      Quitar clave (Dejar Abierto)
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(217,203,182,0.1)]">
              <button
                onClick={() => setShowQuizPassModal(false)}
                className="academic-btn-primary h-8 px-5 rounded-md text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Eliminar Evaluación */}
      {showDeleteColModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3.5 sm:p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.2)] rounded-xl max-w-sm w-full p-5 sm:p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[rgba(217,203,182,0.1)] pb-3">
              <h2 className="text-sm font-serif font-bold text-red-300">Eliminar Columna de Evaluación</h2>
              <button onClick={() => setShowDeleteColModal(false)} className="text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#A89F8D] block mb-1">Selecciona la columna a eliminar:</label>
                <select
                  value={colToDelete}
                  onChange={(e) => setColToDelete(e.target.value)}
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15] text-[#FAF6EE]"
                >
                  <option value="">-- Seleccionar evaluación --</option>
                  {evaluationColumns.map((col) => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
                <p className="text-[10px] text-red-400 mt-1.5">
                  Esta acción eliminará todas las notas asociadas a esta columna.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[rgba(217,203,182,0.1)]">
              <button
                onClick={() => setShowDeleteColModal(false)}
                className="h-8 px-3 rounded-md text-xs text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteColumn}
                disabled={!colToDelete}
                className="h-8 px-4 rounded-md text-xs font-bold uppercase tracking-wider bg-red-800 hover:bg-red-700 text-white cursor-pointer disabled:opacity-50"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
