"use client";

import { useEffect, useState, useMemo, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, clearSession, calculateAverage, saveSession } from "@/lib/auth";
import { Student } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [quizRequiresPassword, setQuizRequiresPassword] = useState<Record<string, boolean>>({});

  // Attendance Registration Modal State
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [attendancePassword, setAttendancePassword] = useState("");
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [attendanceError, setAttendanceError] = useState("");
  const [attendanceSuccess, setAttendanceSuccess] = useState("");

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.push("/notas");
      return;
    }
    setStudent(s);

    // Fetch fresh data in the background to reflect any live changes made by admin
    async function syncFreshData() {
      try {
        const res = await fetch("/api/students", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.quizRequiresPassword) {
            setQuizRequiresPassword(data.quizRequiresPassword);
          }
          const fresh = data.students?.find(
            (item: Student) => item.username.toLowerCase() === s!.username.toLowerCase()
          );
          if (fresh) {
            setStudent(fresh);
            saveSession(fresh);
          } else {
            // Student was deleted or no longer exists
            clearSession();
            router.push("/notas");
          }
        }
      } catch (e) {
        console.warn("Could not sync fresh student data:", e);
      }
    }
    syncFreshData();
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/notas");
  }

  // Quizzes list from grades and attendance
  const availableQuizzes = useMemo(() => {
    if (!student) return [];
    const set = new Set<string>();
    if (student.grades) Object.keys(student.grades).forEach((k) => set.add(k));
    if (student.attendance) Object.keys(student.attendance).forEach((k) => set.add(k));
    return Array.from(set).sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ""), 10);
      const numB = parseInt(b.replace(/\D/g, ""), 10);
      if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
      return a.localeCompare(b);
    });
  }, [student]);

  function openRegisterModal(targetQuiz?: string) {
    setAttendanceError("");
    setAttendanceSuccess("");
    setAttendancePassword("");

    if (targetQuiz) {
      setSelectedQuiz(targetQuiz);
    } else if (availableQuizzes.length > 0) {
      // Find first uncompleted or first available quiz
      const firstAbsent = availableQuizzes.find(
        (q) => student?.attendance?.[q] !== "presente"
      );
      setSelectedQuiz(firstAbsent || availableQuizzes[0]);
    }

    setShowAttendanceModal(true);
  }

  async function handleRegisterAttendance(e: FormEvent) {
    e.preventDefault();
    if (!student || !selectedQuiz) return;

    setAttendanceError("");
    setAttendanceSuccess("");
    setAttendanceLoading(true);

    try {
      const res = await fetch("/api/students/register-attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: student.username,
          quiz: selectedQuiz,
          password: attendancePassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.student) {
          setStudent(data.student);
          saveSession(data.student);
        }
        setAttendanceSuccess(data.message || `¡Asistencia registrada para ${selectedQuiz}!`);
        setAttendancePassword("");
      } else {
        setAttendanceError(data.error || "No se pudo registrar la asistencia.");
      }
    } catch {
      setAttendanceError("Error de conexión al enviar el registro de asistencia.");
    } finally {
      setAttendanceLoading(false);
    }
  }

  if (!student) {
    return (
      <main className="flex-1 flex items-center justify-center bg-[#151d18] text-[#EDE5D8]">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-[#7A8F73]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          <span className="text-sm text-[#A89F8D]">Cargando expediente...</span>
        </div>
      </main>
    );
  }

  const avg = calculateAverage(student.grades);
  const gradeEntries = Object.entries(student.grades);
  const attendanceEntries = Object.entries(student.attendance).sort(([a], [b]) => a.localeCompare(b));
  const isPassing = avg !== null && avg >= 3.0;

  // Count attendance stats
  const totalAttendance = attendanceEntries.length;
  const presentCount = attendanceEntries.filter(([, s]) => s === "presente").length;
  const absentCount = attendanceEntries.filter(([, s]) => s === "ausente").length;
  const excusaCount = attendanceEntries.filter(([, s]) => s === "excusa").length;

  const currentQuizStatus = student.attendance?.[selectedQuiz] || "ausente";
  const isSelectedQuizPresent = currentQuizStatus === "presente";
  const requiresPass = quizRequiresPassword[selectedQuiz] === true;

  return (
    <main className="flex-1 min-h-screen bg-[#151d18] text-[#EDE5D8] academic-paper-bg">
      {/* Top navigation bar */}
      <header className="border-b border-[rgba(217,203,182,0.12)] bg-[#151d18]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="px-2.5 py-1.5 rounded-lg bg-[#223028] border border-[rgba(217,203,182,0.14)] text-[#EDE5D8] hover:border-[#7A8F73] transition-all flex items-center gap-1.5 text-xs font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span>Inicio</span>
            </Link>
            <div className="h-4 w-px bg-[rgba(217,203,182,0.15)] hidden sm:block" />
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-sm text-[#FAF6EE] block leading-tight">Expediente Académico</span>
              <span className="text-[11px] text-[#A89F8D]">Consulta de calificaciones y asistencia</span>
            </div>
          </div>
          <button onClick={handleLogout} className="text-xs text-[#A89F8D] hover:text-[#FAF6EE] flex items-center gap-1.5 transition-colors cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Student header info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#223028] border border-[rgba(217,203,182,0.18)] flex items-center justify-center text-[#C8B99D] text-xl font-serif font-bold">
              {student.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-[#FAF6EE]">{student.fullName}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-md border border-[#7A8F73]/30 text-[#EDE5D8] bg-[#7A8F73]/15 font-medium">{student.group}</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md border border-[rgba(217,203,182,0.15)] text-[#C8B99D] bg-[#223028] font-medium">{student.program}</span>
              </div>
              <p className="text-xs text-[#A89F8D] mt-1.5">{student.email}</p>
            </div>
          </div>

          {/* Registrar Asistencia Button */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openRegisterModal()}
              className="academic-btn-primary px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer shadow-sm hover:brightness-110 active:scale-[0.98] transition-all"
              title="Registrar Asistencia a una sesión / quiz"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Registrar Asistencia</span>
            </button>
          </div>
        </div>

        {/* Separator bar */}
        <div className="h-px bg-[rgba(217,203,182,0.12)]" />

        {/* Stats summary row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {/* Average score card */}
          <div className={`academic-card rounded-xl p-4 col-span-2 md:col-span-1 ${isPassing ? 'border-[#7A8F73]/50' : 'border-[#d9534f]/50'}`}>
            <p className="text-[11px] font-semibold text-[#A89F8D] uppercase tracking-wider">Promedio Acumulado</p>
            <p className={`text-3xl font-extrabold mt-1 ${isPassing ? 'text-[#FAF6EE]' : 'text-[#d9534f]'}`}>
              {avg !== null ? avg.toFixed(2) : "N/A"}
            </p>
            <p className="text-xs mt-1 font-medium" style={{color: isPassing ? '#7A8F73' : '#d9534f'}}>
              {isPassing ? "✓ Estado: Aprobando" : "✗ Por debajo de 3.0"}
            </p>
          </div>
          
          {/* Attendance stats */}
          <div className="academic-card rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#A89F8D] uppercase tracking-wider">Asistencias</p>
            <p className="text-3xl font-extrabold mt-1 text-[#7A8F73]">{presentCount}</p>
            <p className="text-xs text-[#A89F8D] mt-1">de {totalAttendance} sesiones</p>
          </div>
          
          <div className="academic-card rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#A89F8D] uppercase tracking-wider">Ausencias</p>
            <p className="text-3xl font-extrabold mt-1 text-[#d9534f]">{absentCount}</p>
            <p className="text-xs text-[#d9534f]/70 mt-1">registradas</p>
          </div>
          
          <div className="academic-card rounded-xl p-4">
            <p className="text-[11px] font-semibold text-[#A89F8D] uppercase tracking-wider">Excusas</p>
            <p className="text-3xl font-extrabold mt-1 text-[#C8B99D]">{excusaCount}</p>
            <p className="text-xs text-[#A89F8D] mt-1">justificadas</p>
          </div>
        </div>

        {/* Detailed Tables Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Grades Table */}
          <div className="academic-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[rgba(217,203,182,0.12)] bg-[#202d26] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#7A8F73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Detalle de Evaluaciones</h2>
            </div>
            <div className="p-4">
              {gradeEntries.length === 0 ? (
                <p className="text-xs text-[#A89F8D] py-4 text-center">No hay notas registradas en el sistema.</p>
              ) : (
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-3 text-[11px] font-semibold text-[#A89F8D] uppercase tracking-wider border-b border-[rgba(217,203,182,0.12)]">Evaluación</th>
                      <th className="text-right py-2 px-3 text-[11px] font-semibold text-[#A89F8D] uppercase tracking-wider border-b border-[rgba(217,203,182,0.12)]">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradeEntries.map(([quiz, grade]) => (
                      <tr key={quiz} className="hover:bg-[#223028] transition-colors">
                        <td className="py-2.5 px-3 font-medium text-[#EDE5D8]">{quiz}</td>
                        <td className="py-2.5 px-3 text-right">
                          {grade === null ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#C8B99D]/15 text-[#C8B99D] border border-[#C8B99D]/25">
                              Pendiente
                            </span>
                          ) : grade === 0 ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#d9534f]/15 text-[#d9534f] border border-[#d9534f]/25">
                              0.0 — Ausente
                            </span>
                          ) : (
                            <span className={`font-bold font-mono ${grade >= 3.0 ? 'text-[#7A8F73]' : 'text-[#d9534f]'}`}>
                              {grade.toFixed(1)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Attendance Table */}
          <div className="academic-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[rgba(217,203,182,0.12)] bg-[#202d26] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#7A8F73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Registro de Asistencia</h2>
              </div>
              <button
                type="button"
                onClick={() => openRegisterModal()}
                className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-[#223028] border border-[rgba(217,203,182,0.15)] text-[#C8B99D] hover:border-[#7A8F73] hover:text-[#FAF6EE] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#7A8F73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span>Registrar Asistencia</span>
              </button>
            </div>
            <div className="p-4">
              {attendanceEntries.length === 0 ? (
                <p className="text-xs text-[#A89F8D] py-4 text-center">No hay registros de asistencia.</p>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left py-2 px-3 text-[11px] font-semibold text-[#A89F8D] uppercase tracking-wider border-b border-[rgba(217,203,182,0.12)]">Evaluación / Sesión</th>
                        <th className="text-right py-2 px-3 text-[11px] font-semibold text-[#A89F8D] uppercase tracking-wider border-b border-[rgba(217,203,182,0.12)]">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceEntries.map(([date, status]) => (
                        <tr key={date} className="hover:bg-[#223028] transition-colors">
                          <td className="py-2.5 px-3 font-medium text-[#EDE5D8]">{date}</td>
                          <td className="py-2.5 px-3 text-right">
                            {status === "presente" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#7A8F73]/15 text-[#7A8F73] border border-[#7A8F73]/30">
                                ✓ Asistencia
                              </span>
                            ) : status === "excusa" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#C8B99D]/15 text-[#C8B99D] border border-[#C8B99D]/25">
                                ◎ Excusa
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => openRegisterModal(date)}
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#d9534f]/15 text-[#d9534f] border border-[#d9534f]/25 hover:bg-[#d9534f]/30 transition-all cursor-pointer"
                                title="Haz clic para registrar tu asistencia a esta sesión"
                              >
                                <span>✗ Ausente</span>
                                <span className="text-[10px] text-[#C8B99D] underline ml-1">Registrar</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Registrar Asistencia a Quiz */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.25)] rounded-2xl max-w-sm w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAttendanceModal(false)}
              className="absolute top-4 right-4 text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer p-1"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <div className="w-11 h-11 rounded-xl bg-[#223028] border border-[rgba(217,203,182,0.15)] mx-auto flex items-center justify-center text-[#7A8F73] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-base font-serif font-bold text-[#FAF6EE]">
                Registrar Asistencia
              </h2>
              <p className="text-[11px] text-[#A89F8D]">
                Selecciona la evaluación correspondiente y confirma tu asistencia.
              </p>
            </div>

            {availableQuizzes.length === 0 ? (
              <div className="text-center py-4 space-y-3">
                <p className="text-xs text-[#A89F8D]">No hay evaluaciones registradas en el curso actualmente.</p>
                <button
                  type="button"
                  onClick={() => setShowAttendanceModal(false)}
                  className="academic-btn-primary px-4 py-2 text-xs rounded-lg cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterAttendance} className="space-y-4 text-xs">
                {/* Quiz Selector */}
                <div className="space-y-1.5">
                  <label className="text-[#EDE5D8] block font-medium">Evaluación / Quiz</label>
                  <select
                    value={selectedQuiz}
                    onChange={(e) => {
                      setSelectedQuiz(e.target.value);
                      setAttendanceError("");
                      setAttendanceSuccess("");
                      setAttendancePassword("");
                    }}
                    className="academic-input w-full h-10 rounded-lg px-3 font-mono bg-[#131a15] text-[#FAF6EE] cursor-pointer"
                  >
                    {availableQuizzes.map((q) => {
                      const isPres = student.attendance?.[q] === "presente";
                      return (
                        <option key={q} value={q}>
                          {q} {isPres ? "— (✓ Ya Registrado)" : "— (Pendiente / Ausente)"}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Status indicator for selected quiz */}
                {isSelectedQuizPresent ? (
                  <div className="p-3 rounded-lg bg-[#7A8F73]/15 border border-[#7A8F73]/30 text-[#EDE5D8] flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#7A8F73] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[11px] leading-tight">
                      Ya te encuentras registrado como <b>Presente</b> en <b>{selectedQuiz}</b>.
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Password Input */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[#EDE5D8] block font-medium">
                          Contraseña del Quiz {requiresPass ? <span className="text-[#d9534f]">*</span> : <span className="text-[#A89F8D] text-[10px] font-normal">(si aplica)</span>}
                        </label>
                        {!requiresPass && (
                          <span className="text-[10px] text-[#7A8F73] font-mono">Sin clave requerida</span>
                        )}
                      </div>
                      <input
                        type="password"
                        placeholder={requiresPass ? "Ingresa la clave dada por el docente" : "Dejar vacío o ingresar clave si aplica"}
                        value={attendancePassword}
                        onChange={(e) => setAttendancePassword(e.target.value)}
                        required={requiresPass}
                        className="academic-input w-full h-10 rounded-lg px-3 font-mono bg-[#131a15]"
                        autoFocus={requiresPass}
                      />
                      <p className="text-[10px] text-[#A89F8D]">
                        {requiresPass
                          ? "El docente configuró una clave obligatoria para esta sesión."
                          : "Si esta sesión no tiene contraseña, puedes confirmar de inmediato."}
                      </p>
                    </div>

                    {attendanceError && (
                      <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/50 text-[11px] text-red-300 flex items-start gap-2 animate-fadeIn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{attendanceError}</span>
                      </div>
                    )}

                    {attendanceSuccess && (
                      <div className="p-3 rounded-lg bg-[#7A8F73]/20 border border-[#7A8F73]/40 text-[11px] text-[#a5e0b8] flex items-center gap-2 animate-fadeIn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#7A8F73] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{attendanceSuccess}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={attendanceLoading}
                      className="academic-btn-primary w-full h-11 text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      {attendanceLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                          <span>Validando Asistencia...</span>
                        </>
                      ) : (
                        <span>Confirmar Asistencia</span>
                      )}
                    </button>
                  </>
                )}

                {isSelectedQuizPresent && (
                  <button
                    type="button"
                    onClick={() => setShowAttendanceModal(false)}
                    className="w-full h-10 text-xs font-medium rounded-lg bg-[#223028] text-[#EDE5D8] hover:border-[#7A8F73] border border-[rgba(217,203,182,0.15)] cursor-pointer mt-2"
                  >
                    Cerrar
                  </button>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
