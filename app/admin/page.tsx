"use client";

import { useEffect, useState, useMemo, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as XLSX from "xlsx";
import { Student } from "@/lib/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [initialData, setInitialData] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("ALL");
  const [activeTab, setActiveTab] = useState<"grades" | "attendance" | "students">("grades");
  const [searchTerm, setSearchTerm] = useState("");
  const [saveMessage, setSaveMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Modals state
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddColModal, setShowAddColModal] = useState(false);
  const [showDeleteColModal, setShowDeleteColModal] = useState(false);
  const [showNewGroupModal, setShowNewGroupModal] = useState(false);

  // Modal form inputs
  const [newStudent, setNewStudent] = useState({
    fullName: "",
    username: "",
    email: "",
    program: "",
    group: "",
  });
  const [newColName, setNewColName] = useState("");
  const [colToDelete, setColToDelete] = useState("");
  const [newGroupName, setNewGroupName] = useState("");

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

        // Fetch students
        const res = await fetch("/api/students", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const list: Student[] = data.students || [];
          setStudents(list);
          setInitialData(JSON.stringify(list));

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

  // Detected groups
  const groups = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.group) set.add(s.group);
    });
    return Array.from(set).sort();
  }, [students]);

  // Detected evaluation columns (e.g., "Quiz 1", "Quiz 2")
  const evaluationColumns = useMemo(() => {
    const colSet = new Set<string>();
    students.forEach((s) => {
      if (s.grades) {
        Object.keys(s.grades).forEach((col) => colSet.add(col));
      }
    });
    // Natural sort: Quiz 1, Quiz 2 ... Quiz 10
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
    // If no attendance cols or fewer than evaluation cols, fallback to evaluation columns
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

  // Filtered students by group and search
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesGroup = selectedGroup === "ALL" || s.group === selectedGroup;
      const q = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !q ||
        s.fullName.toLowerCase().includes(q) ||
        s.username.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.program.toLowerCase().includes(q);
      return matchesGroup && matchesSearch;
    });
  }, [students, selectedGroup, searchTerm]);

  // Unsaved changes check
  const hasUnsavedChanges = useMemo(() => {
    return initialData !== "" && JSON.stringify(students) !== initialData;
  }, [students, initialData]);

  // Calculate student average
  function getStudentAverage(grades: Record<string, number | null>): number | null {
    if (!grades) return null;
    const valid = Object.values(grades).filter((g): g is number => g !== null && typeof g === "number");
    if (valid.length === 0) return null;
    const sum = valid.reduce((acc, g) => acc + g, 0);
    return Math.round((sum / valid.length) * 100) / 100;
  }

  // Calculate group stats
  const groupStats = useMemo(() => {
    const inGroup = students.filter((s) => selectedGroup === "ALL" || s.group === selectedGroup);
    if (inGroup.length === 0) return { total: 0, avg: 0, passing: 0 };

    let sumAvg = 0;
    let counted = 0;
    let passing = 0;

    inGroup.forEach((s) => {
      const avg = getStudentAverage(s.grades);
      if (avg !== null) {
        sumAvg += avg;
        counted++;
        if (avg >= 3.0) passing++;
      }
    });

    return {
      total: inGroup.length,
      avg: counted > 0 ? (sumAvg / counted).toFixed(2) : "0.00",
      passing,
      passingPct: counted > 0 ? Math.round((passing / counted) * 100) : 0,
    };
  }, [students, selectedGroup]);

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
          // Auto-sync attendance if empty or default
          const updatedAttendance = { ...(s.attendance || {}) };
          if (parsed === 0) {
            updatedAttendance[col] = "ausente";
          } else if (parsed !== null) {
            updatedAttendance[col] = "presente";
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
          const current = s.attendance?.[col] || "ausente";
          let next = "presente";
          if (current === "presente") next = "ausente";
          else if (current === "ausente") next = "excusa";
          else if (current === "excusa") next = "presente";

          const updatedAttendance = { ...(s.attendance || {}), [col]: next };
          return { ...s, attendance: updatedAttendance };
        }
        return s;
      })
    );
  }

  // Edit student metadata
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

  // Delete student
  function handleDeleteStudent(studentUsername: string) {
    if (!confirm(`¿Eliminar al estudiante ${studentUsername}? Esta acción no se puede deshacer.`)) {
      return;
    }
    setStudents((prev) => prev.filter((s) => s.username.toLowerCase() !== studentUsername.toLowerCase()));
  }

  // Add new evaluation column
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
        attendance: { ...(s.attendance || {}), [col]: "ausente" },
      }))
    );
    setNewColName("");
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
    setColToDelete("");
    setShowDeleteColModal(false);
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
      defaultAttendance[col] = "ausente";
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
        body: JSON.stringify({ students }),
      });

      const data = await res.json();
      if (res.ok) {
        setInitialData(JSON.stringify(students));
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

  // Export to Excel (.xlsx)
  function handleExportExcel() {
    try {
      const wb = XLSX.utils.book_new();

      // Group students by group
      const groupsMap = new Map<string, Student[]>();
      students.forEach((s) => {
        const grp = s.group || "Sin Grupo";
        if (!groupsMap.has(grp)) groupsMap.set(grp, []);
        groupsMap.get(grp)!.push(s);
      });

      groupsMap.forEach((groupStudents, groupName) => {
        // Build raw matrix for Excel sheet
        const sheetData: any[][] = [];

        // 1. Asistencia Header
        const attHeaders = ["NOMBRE DEL ESTUDIANTE", "CORREO", "PROGRAMA", "GRUPO", ...attendanceColumns];
        sheetData.push(["REGISTRO DE ASISTENCIA - " + groupName]);
        sheetData.push(attHeaders);

        groupStudents.forEach((st) => {
          const row: (string | number)[] = [st.fullName, st.email, st.program, st.group];
          attendanceColumns.forEach((col) => {
            const status = st.attendance?.[col] || "ausente";
            row.push(status === "presente" ? 1 : status === "excusa" ? "E" : 0);
          });
          sheetData.push(row);
        });

        sheetData.push([]); // blank row separator
        sheetData.push([]);

        // 2. Calificaciones Header
        const gradesHeaders = ["NOMBRE DEL ESTUDIANTE", "CORREO", "PROGRAMA", "GRUPO", ...evaluationColumns, "PROMEDIO"];
        sheetData.push(["CALIFICACIONES - " + groupName]);
        sheetData.push(gradesHeaders);

        groupStudents.forEach((st) => {
          const row: (string | number)[] = [st.fullName, st.email, st.program, st.group];
          evaluationColumns.forEach((col) => {
            const grade = st.grades?.[col];
            row.push(grade !== null && grade !== undefined ? grade : "");
          });
          const avg = getStudentAverage(st.grades);
          row.push(avg !== null ? avg : "");
          sheetData.push(row);
        });

        const ws = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(wb, ws, groupName.substring(0, 31));
      });

      XLSX.writeFile(wb, `notas_asistencia_${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (err) {
      console.error("Error exporting to Excel:", err);
      alert("Error al exportar a Excel.");
    }
  }

  // Import Excel file
  function handleImportExcel(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const buffer = evt.target?.result as ArrayBuffer;
        const { parseExcelFile } = await import("@/lib/parseExcel");
        const { students: parsed, warnings } = parseExcelFile(buffer);

        if (parsed.length === 0) {
          alert("No se encontraron datos válidos de estudiantes en el archivo Excel.\n" + warnings.join("\n"));
          return;
        }

        if (confirm(`Se detectaron ${parsed.length} estudiantes en el archivo Excel. ¿Deseas importarlos a la lista actual?`)) {
          // Merge or replace
          setStudents(parsed);
          alert(`Excel cargado con éxito (${parsed.length} estudiantes). Recuerda presionar "Guardar Cambios" para persistir.`);
        }
      } catch (err) {
        console.error("Error parsing Excel:", err);
        alert("Error al procesar el archivo Excel.");
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
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
          <span className="text-xs font-mono text-[#A89F8D]">Cargando Panel de Administración Excel...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121814] text-[#EDE5D8] flex flex-col font-sans selection:bg-[#34483d] selection:text-[#FAF6EE]">
      {/* Top Navbar */}
      <header className="h-14 border-b border-[rgba(217,203,182,0.12)] bg-[#17201a] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#223028] border border-[rgba(217,203,182,0.15)] flex items-center justify-center text-[#8FA698] shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-serif font-bold text-[#FAF6EE] tracking-wide">
                Panel de Control Docente
              </h1>
              <span className="px-2 py-0.5 rounded bg-[#1e2a22] border border-[#3b4e42] text-[10px] font-mono text-[#8FA698]">
                EXCEL LIVE
              </span>
            </div>
            <p className="text-[10px] text-[#A89F8D]">Administración de Calificaciones, Faltas y Estudiantes</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {hasUnsavedChanges && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-600/40 text-[11px] text-amber-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Cambios sin guardar
            </span>
          )}

          <button
            onClick={handleSaveChanges}
            disabled={saving}
            className="academic-btn-primary h-8 px-3.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
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
                <span>Guardar Cambios</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className="h-8 px-2.5 rounded-md bg-[#223028] border border-[rgba(217,203,182,0.15)] text-[#A89F8D] hover:text-[#FAF6EE] text-xs font-mono flex items-center gap-1 cursor-pointer transition-colors"
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
          className={`mx-4 sm:mx-6 mt-3 p-3 rounded-lg border text-xs flex items-center justify-between animate-fadeIn ${
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

      {/* Control Bar & Stats */}
      <div className="p-4 sm:p-6 pb-2 space-y-4 max-w-full">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#17211b] border border-[rgba(217,203,182,0.1)] rounded-xl p-4 shadow-sm">
          {/* Group Selector & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-[#A89F8D] uppercase">Grupo:</label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="academic-input h-9 rounded-md px-3 text-xs font-mono bg-[#1f2c24] text-[#FAF6EE] border border-[#3b4e42] focus:outline-none cursor-pointer"
              >
                <option value="ALL">Todos los Grupos ({students.length})</option>
                {groups.map((grp) => (
                  <option key={grp} value={grp}>
                    {grp} ({students.filter((s) => s.group === grp).length})
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="relative min-w-[220px]">
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
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 text-xs font-mono text-[#C8B99D]">
            <div className="flex items-center gap-1.5 bg-[#121914] px-3 py-1.5 rounded-lg border border-[rgba(217,203,182,0.08)]">
              <span className="text-[#8FA698]">Estudiantes:</span>
              <span className="font-bold text-[#FAF6EE]">{filteredStudents.length}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#121914] px-3 py-1.5 rounded-lg border border-[rgba(217,203,182,0.08)]">
              <span className="text-[#8FA698]">Promedio Grupo:</span>
              <span className="font-bold text-[#D4AF37]">{groupStats.avg}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#121914] px-3 py-1.5 rounded-lg border border-[rgba(217,203,182,0.08)]">
              <span className="text-[#8FA698]">Aprobación:</span>
              <span className="font-bold text-[#8FA698]">{groupStats.passingPct}%</span>
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Tabs */}
          <div className="flex items-center bg-[#17211b] p-1 rounded-lg border border-[rgba(217,203,182,0.12)]">
            <button
              onClick={() => setActiveTab("grades")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "grades"
                  ? "bg-[#25362c] text-[#FAF6EE] shadow-sm font-semibold"
                  : "text-[#A89F8D] hover:text-[#EDE5D8]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span>Notas ({evaluationColumns.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("attendance")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "attendance"
                  ? "bg-[#25362c] text-[#FAF6EE] shadow-sm font-semibold"
                  : "text-[#A89F8D] hover:text-[#EDE5D8]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Asistencia ({attendanceColumns.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "students"
                  ? "bg-[#25362c] text-[#FAF6EE] shadow-sm font-semibold"
                  : "text-[#A89F8D] hover:text-[#EDE5D8]"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>Estudiantes</span>
            </button>
          </div>

          {/* Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2">
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

            <div className="h-5 w-px bg-[rgba(217,203,182,0.15)] mx-1"></div>

            {/* Export XLSX */}
            <button
              onClick={handleExportExcel}
              className="h-8 px-3 rounded-md bg-[#1d2821] hover:bg-[#25352c] border border-[#3b4e42] text-[#8FA698] hover:text-[#FAF6EE] text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Descargar archivo Excel con notas y asistencia"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Exportar Excel</span>
            </button>

            {/* Import XLSX */}
            <label className="h-8 px-3 rounded-md bg-[#1d2821] hover:bg-[#25352c] border border-[#3b4e42] text-[#C8B99D] hover:text-[#FAF6EE] text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span>Subir Excel</span>
              <input type="file" accept=".xlsx,.xls" onChange={handleImportExcel} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* Main Interactive Excel Spreadsheet View */}
      <main className="flex-1 p-4 sm:p-6 pt-2 overflow-hidden flex flex-col">
        <div className="flex-1 rounded-xl border border-[rgba(217,203,182,0.15)] bg-[#17211b] overflow-hidden flex flex-col shadow-xl">
          <div className="flex-1 overflow-auto">
            {activeTab === "grades" && (
              <table className="w-full text-xs text-left border-collapse select-none">
                <thead className="bg-[#1b2620] sticky top-0 z-20 shadow-sm border-b border-[rgba(217,203,182,0.15)]">
                  <tr>
                    <th className="p-2.5 px-3 text-[#8FA698] font-mono font-medium text-[11px] w-12 text-center border-r border-[rgba(217,203,182,0.08)]">
                      #
                    </th>
                    <th className="p-2.5 px-4 text-[#FAF6EE] font-serif font-bold text-xs sticky left-0 z-30 bg-[#1b2620] border-r border-[rgba(217,203,182,0.12)] min-w-[220px]">
                      Nombre del Estudiante
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] min-w-[130px] border-r border-[rgba(217,203,182,0.08)]">
                      Usuario UNAL
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] min-w-[90px] border-r border-[rgba(217,203,182,0.08)]">
                      Grupo
                    </th>

                    {/* Dynamic evaluation columns */}
                    {evaluationColumns.map((col) => (
                      <th
                        key={col}
                        className="p-2.5 px-3 text-[#D4AF37] font-mono font-bold text-[11px] text-center min-w-[80px] border-r border-[rgba(217,203,182,0.08)]"
                      >
                        {col}
                      </th>
                    ))}

                    <th className="p-2.5 px-4 text-[#FAF6EE] font-serif font-bold text-xs text-center min-w-[90px] bg-[#1e2b24] border-r border-[rgba(217,203,182,0.12)]">
                      Promedio
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] text-center w-20">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(217,203,182,0.06)] font-sans">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6 + evaluationColumns.length} className="p-8 text-center text-xs text-[#A89F8D]">
                        No se encontraron estudiantes con los filtros actuales.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((st, idx) => {
                      const avg = getStudentAverage(st.grades);
                      return (
                        <tr key={st.username} className="hover:bg-[#1f2d24]/60 transition-colors group">
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

                          {/* Group Badge */}
                          <td className="p-2 px-3 font-mono text-[11px] text-[#8FA698] border-r border-[rgba(217,203,182,0.06)]">
                            <span className="px-2 py-0.5 rounded bg-[#1e2b23] border border-[#3b4e42]/50 text-[10px]">
                              {st.group}
                            </span>
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
                            <button
                              onClick={() => handleDeleteStudent(st.username)}
                              className="p-1 rounded hover:bg-red-950/60 text-[#A89F8D] hover:text-red-400 cursor-pointer transition-colors"
                              title="Eliminar estudiante"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            )}

            {activeTab === "attendance" && (
              <table className="w-full text-xs text-left border-collapse select-none">
                <thead className="bg-[#1b2620] sticky top-0 z-20 shadow-sm border-b border-[rgba(217,203,182,0.15)]">
                  <tr>
                    <th className="p-2.5 px-3 text-[#8FA698] font-mono font-medium text-[11px] w-12 text-center border-r border-[rgba(217,203,182,0.08)]">
                      #
                    </th>
                    <th className="p-2.5 px-4 text-[#FAF6EE] font-serif font-bold text-xs sticky left-0 z-30 bg-[#1b2620] border-r border-[rgba(217,203,182,0.12)] min-w-[220px]">
                      Nombre del Estudiante
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] min-w-[120px] border-r border-[rgba(217,203,182,0.08)]">
                      Usuario
                    </th>

                    {/* Attendance columns */}
                    {attendanceColumns.map((col) => (
                      <th
                        key={col}
                        className="p-2 px-2 text-[#8FA698] font-mono text-[11px] text-center min-w-[70px] border-r border-[rgba(217,203,182,0.08)]"
                      >
                        <div>{col}</div>
                        <button
                          onClick={() => handleMarkAllPresent(col)}
                          className="mt-0.5 text-[9px] text-[#A89F8D] hover:text-[#FAF6EE] underline cursor-pointer"
                          title="Marcar todos presentes en esta sesión"
                        >
                          todos P
                        </button>
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
                    // Count absences and attendance %
                    let presentCount = 0;
                    let absentCount = 0;
                    let excuseCount = 0;

                    attendanceColumns.forEach((col) => {
                      const status = st.attendance?.[col] || "ausente";
                      if (status === "presente") presentCount++;
                      else if (status === "ausente") absentCount++;
                      else if (status === "excusa") excuseCount++;
                    });

                    const total = attendanceColumns.length;
                    const pct = total > 0 ? Math.round((presentCount / total) * 100) : 100;

                    return (
                      <tr key={st.username} className="hover:bg-[#1f2d24]/60 transition-colors group">
                        <td className="p-2 text-center text-[11px] font-mono text-[#8FA698]/70 border-r border-[rgba(217,203,182,0.06)]">
                          {idx + 1}
                        </td>
                        <td className="p-2.5 px-4 text-[#FAF6EE] font-medium sticky left-0 z-10 bg-[#17211b] group-hover:bg-[#1d2921] border-r border-[rgba(217,203,182,0.1)] truncate max-w-[240px]">
                          <div className="truncate font-semibold">{st.fullName}</div>
                          <div className="text-[10px] text-[#A89F8D] truncate">{st.group}</div>
                        </td>
                        <td className="p-2 px-3 font-mono text-[11px] text-[#C8B99D] border-r border-[rgba(217,203,182,0.06)]">
                          {st.username}
                        </td>

                        {/* Interactive Attendance Toggle Badges */}
                        {attendanceColumns.map((col) => {
                          const status = st.attendance?.[col] || "ausente";
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
                                    : "bg-red-950/80 text-red-300 border border-red-800/50"
                                }`}
                                title={`Clic para alternar: ${status.toUpperCase()}`}
                              >
                                {status === "presente" ? "P" : status === "excusa" ? "E" : "A"}
                              </button>
                            </td>
                          );
                        })}

                        {/* Total Faltas */}
                        <td className="p-2 px-3 text-center font-mono font-bold text-xs bg-[#1a251e] border-r border-[rgba(217,203,182,0.1)]">
                          <span
                            className={`px-2 py-0.5 rounded ${
                              absentCount === 0
                                ? "text-[#a5e0b8] bg-[#1d3527]"
                                : absentCount > 3
                                ? "text-red-300 bg-red-950"
                                : "text-amber-300 bg-amber-950"
                            }`}
                          >
                            {absentCount}
                          </span>
                        </td>

                        {/* % Asistencia */}
                        <td className="p-2 px-3 text-center font-mono font-bold text-xs bg-[#1a251e]">
                          <span className={pct >= 80 ? "text-[#a5e0b8]" : "text-red-300"}>
                            {pct}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {activeTab === "students" && (
              <table className="w-full text-xs text-left border-collapse select-none">
                <thead className="bg-[#1b2620] sticky top-0 z-20 shadow-sm border-b border-[rgba(217,203,182,0.15)]">
                  <tr>
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
                    <th className="p-2.5 px-3 text-[#FAF6EE] font-mono text-[11px] border-r border-[rgba(217,203,182,0.08)]">
                      Grupo
                    </th>
                    <th className="p-2.5 px-3 text-[#A89F8D] font-mono text-[11px] text-center w-20">
                      Acción
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(217,203,182,0.06)] font-sans">
                  {filteredStudents.map((st, idx) => (
                    <tr key={st.username} className="hover:bg-[#1f2d24]/60 transition-colors">
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
                      <td className="p-1.5 px-3 border-r border-[rgba(217,203,182,0.06)]">
                        <input
                          type="text"
                          value={st.group}
                          onChange={(e) => handleStudentFieldChange(st.username, "group", e.target.value)}
                          className="academic-input w-full h-7 px-2 font-mono text-xs rounded bg-[#131a15]"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleDeleteStudent(st.username)}
                          className="p-1 rounded hover:bg-red-950/60 text-[#A89F8D] hover:text-red-400 cursor-pointer transition-colors"
                          title="Eliminar estudiante"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer Bar inside sheet */}
          <div className="p-2.5 px-4 bg-[#141b16] border-t border-[rgba(217,203,182,0.1)] flex items-center justify-between text-[11px] text-[#A89F8D] font-mono">
            <div className="flex items-center gap-3">
              <span>{filteredStudents.length} estudiantes listados</span>
              <span>·</span>
              <span>{evaluationColumns.length} columnas de evaluación</span>
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

      {/* MODAL: Nuevo Estudiante */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.2)] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
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
                  <input
                    type="text"
                    placeholder={selectedGroup !== "ALL" ? selectedGroup : "GEA 24"}
                    value={newStudent.group}
                    onChange={(e) => setNewStudent({ ...newStudent, group: e.target.value })}
                    className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15]"
                  />
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

      {/* MODAL: Nueva Evaluación (Columna) */}
      {showAddColModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.2)] rounded-xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
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
                <p className="text-[10px] text-[#A89F8D] mt-1.5">
                  Se creará la columna para todos los estudiantes con valor pendiente (—).
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

      {/* MODAL: Eliminar Evaluación */}
      {showDeleteColModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.2)] rounded-xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
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
