"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, clearSession, calculateAverage, saveSession } from "@/lib/auth";
import { Student } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);

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
          const fresh = data.students?.find(
            (item: Student) => item.username.toLowerCase() === s!.username.toLowerCase()
          );
          if (fresh) {
            setStudent(fresh);
            saveSession(fresh);
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
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#223028] border border-[rgba(217,203,182,0.18)] flex items-center justify-center text-[#C8B99D] text-xl font-serif font-bold">
            {student.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-serif font-bold text-[#FAF6EE]">{student.fullName}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[11px] px-2.5 py-0.5 rounded-md border border-[#7A8F73]/30 text-[#EDE5D8] bg-[#7A8F73]/15 font-medium">{student.group}</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-md border border-[rgba(217,203,182,0.15)] text-[#C8B99D] bg-[#223028] font-medium">{student.program}</span>
            </div>
            <p className="text-xs text-[#A89F8D] mt-1.5">{student.email}</p>
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
                              Excusa
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
            <div className="p-4 border-b border-[rgba(217,203,182,0.12)] bg-[#202d26] flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#7A8F73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <h2 className="text-sm font-serif font-bold text-[#FAF6EE]">Registro de Asistencia</h2>
            </div>
            <div className="p-4">
              {attendanceEntries.length === 0 ? (
                <p className="text-xs text-[#A89F8D] py-4 text-center">No hay registros de asistencia.</p>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="text-left py-2 px-3 text-[11px] font-semibold text-[#A89F8D] uppercase tracking-wider border-b border-[rgba(217,203,182,0.12)]">Fecha / Sesión</th>
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
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#d9534f]/15 text-[#d9534f] border border-[#d9534f]/25">
                                ✗ Ausente
                              </span>
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
    </main>
  );
}
