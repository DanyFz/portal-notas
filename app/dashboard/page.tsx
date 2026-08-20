"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, clearSession, calculateAverage } from "@/lib/auth";
import { Student } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s) { router.push("/notas"); return; }
    setStudent(s);
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/notas");
  }

  if (!student) {
    return (
      <main className="flex-1 flex items-center justify-center bg-[#2E3B33] text-[#D9CBB6]">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-[#7A8F73]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          <span className="text-sm text-[#BFAE8F]">Cargando expediente...</span>
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
    <main className="flex-1 min-h-screen bg-[#2E3B33] text-[#D9CBB6] beige-grid-bg">
      {/* Top navigation bar */}
      <div className="border-b border-[#D9CBB6]/20 bg-[#2E3B33]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center text-[#D9CBB6] hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>
            </Link>
            <div>
              <span className="font-semibold text-sm text-[#D9CBB6] glow-beige block">Portal de Notas</span>
              <span className="text-[11px] text-[#BFAE8F]">Expediente del Estudiante</span>
            </div>
          </div>
          <button onClick={handleLogout} className="text-xs text-[#BFAE8F] hover:text-[#D9CBB6] flex items-center gap-1.5 transition-colors cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Student header info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center text-[#D9CBB6] text-2xl font-bold shadow-lg shadow-[#7A8F73]/20 animate-warm-pulse">
            {student.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#D9CBB6]">{student.fullName}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs px-3 py-0.5 rounded-full border border-[#7A8F73]/40 text-[#D9CBB6] bg-[#7A8F73]/20 font-medium">{student.group}</span>
              <span className="text-xs px-3 py-0.5 rounded-full border border-[#BFAE8F]/40 text-[#BFAE8F] bg-[#BFAE8F]/10 font-medium">{student.program}</span>
            </div>
            <p className="text-xs text-[#BFAE8F] mt-1.5">{student.email}</p>
          </div>
        </div>

        {/* Separator bar */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D9CBB6]/20 to-transparent" />

        {/* Stats summary row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {/* Average score card */}
          <div className={`beige-card rounded-xl p-4 border-2 ${isPassing ? 'border-[#7A8F73]/60' : 'border-[#e05d5d]/50'} col-span-2 md:col-span-1`}>
            <p className="text-[11px] font-semibold text-[#BFAE8F] uppercase tracking-wider">Promedio Acumulado</p>
            <p className={`text-3xl font-extrabold mt-1 ${isPassing ? 'text-[#D9CBB6] glow-sage' : 'text-[#e05d5d]'}`}>
              {avg !== null ? avg.toFixed(2) : "N/A"}
            </p>
            <p className="text-xs mt-1 font-medium" style={{color: isPassing ? '#7A8F73' : '#e05d5d'}}>
              {isPassing ? "✓ Estado: Aprobando" : "✗ Por debajo de 3.0"}
            </p>
          </div>
          
          {/* Attendance stats */}
          <div className="beige-card rounded-xl p-4 border border-[#D9CBB6]/15">
            <p className="text-[11px] font-semibold text-[#BFAE8F] uppercase tracking-wider">Asistencias</p>
            <p className="text-3xl font-extrabold mt-1 text-[#7A8F73] glow-sage">{presentCount}</p>
            <p className="text-xs text-[#BFAE8F]/80 mt-1">de {totalAttendance} sesiones</p>
          </div>
          
          <div className="beige-card rounded-xl p-4 border border-[#D9CBB6]/15">
            <p className="text-[11px] font-semibold text-[#BFAE8F] uppercase tracking-wider">Ausencias</p>
            <p className="text-3xl font-extrabold mt-1 text-[#e05d5d]">{absentCount}</p>
            <p className="text-xs text-[#e05d5d]/80 mt-1">registradas</p>
          </div>
          
          <div className="beige-card rounded-xl p-4 border border-[#D9CBB6]/15">
            <p className="text-[11px] font-semibold text-[#BFAE8F] uppercase tracking-wider">Excusas</p>
            <p className="text-3xl font-extrabold mt-1 text-[#BFAE8F] glow-gold">{excusaCount}</p>
            <p className="text-xs text-[#BFAE8F]/80 mt-1">justificadas</p>
          </div>
        </div>

        {/* Detailed Tables Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Grades Table */}
          <div className="beige-card rounded-2xl overflow-hidden border border-[#D9CBB6]/20">
            <div className="p-4 border-b border-[#D9CBB6]/15 bg-[#4F6B57]/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#7A8F73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <h2 className="text-base font-bold text-[#D9CBB6]">Detalle de Evaluaciones</h2>
            </div>
            <div className="p-4">
              {gradeEntries.length === 0 ? (
                <p className="text-xs text-[#BFAE8F] py-4 text-center">No hay notas registradas en el sistema.</p>
              ) : (
                <table className="w-full beige-table text-xs">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-3 rounded-tl-lg">Evaluación</th>
                      <th className="text-right py-2 px-3 rounded-tr-lg">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradeEntries.map(([quiz, grade]) => (
                      <tr key={quiz}>
                        <td className="py-2.5 px-3 font-medium text-[#D9CBB6]">{quiz}</td>
                        <td className="py-2.5 px-3 text-right">
                          {grade === null ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#BFAE8F]/15 text-[#BFAE8F] border border-[#BFAE8F]/30">
                              Excusa
                            </span>
                          ) : grade === 0 ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#e05d5d]/15 text-[#e05d5d] border border-[#e05d5d]/30">
                              0.0 — Ausente
                            </span>
                          ) : (
                            <span className={`font-bold ${grade >= 3.0 ? 'text-[#7A8F73]' : 'text-[#e05d5d]'}`}>
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
          <div className="beige-card rounded-2xl overflow-hidden border border-[#D9CBB6]/20">
            <div className="p-4 border-b border-[#D9CBB6]/15 bg-[#4F6B57]/20 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#7A8F73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <h2 className="text-base font-bold text-[#D9CBB6]">Registro de Asistencia</h2>
            </div>
            <div className="p-4">
              {attendanceEntries.length === 0 ? (
                <p className="text-xs text-[#BFAE8F] py-4 text-center">No hay registros de asistencia.</p>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full beige-table text-xs">
                    <thead>
                      <tr>
                        <th className="text-left py-2 px-3 rounded-tl-lg">Fecha / Sesión</th>
                        <th className="text-right py-2 px-3 rounded-tr-lg">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceEntries.map(([date, status]) => (
                        <tr key={date}>
                          <td className="py-2.5 px-3 font-medium text-[#D9CBB6]">{date}</td>
                          <td className="py-2.5 px-3 text-right">
                            {status === "presente" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#7A8F73]/20 text-[#7A8F73] border border-[#7A8F73]/40">
                                ✓ Asistencia
                              </span>
                            ) : status === "excusa" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#BFAE8F]/15 text-[#BFAE8F] border border-[#BFAE8F]/30">
                                ◎ Excusa
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#e05d5d]/15 text-[#e05d5d] border border-[#e05d5d]/30">
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

