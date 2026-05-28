"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, clearSession, calculateAverage } from "@/lib/auth";
import { Student } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s) { router.push("/"); return; }
    setStudent(s);
  }, [router]);

  function handleLogout() {
    clearSession();
    router.push("/");
  }

  if (!student) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-neon-cyan" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          <span className="text-sm text-[#8888aa]">Cargando...</span>
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
    <main className="flex-1">
      {/* Top bar */}
      <div className="border-b border-[#00f0ff]/20 bg-[#0a0a0f]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f0ff]/20 to-[#ff00e5]/20 border border-[#00f0ff]/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-neon-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>
            </div>
            <span className="font-semibold text-sm text-neon-cyan glow-cyan">Portal de Notas</span>
          </div>
          <button onClick={handleLogout} className="text-sm text-[#8888aa] hover:text-neon-magenta flex items-center gap-1.5 transition-all cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:drop-shadow-[0_0_5px_#ff00e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Student info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#ff00e5] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#00f0ff]/20 animate-neon-pulse">
            {student.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[#e8e8f0]">{student.fullName}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs px-3 py-1 rounded-full border border-[#00f0ff]/30 text-neon-cyan bg-[#00f0ff]/5">{student.group}</span>
              <span className="text-xs px-3 py-1 rounded-full border border-[#ff00e5]/30 text-neon-magenta bg-[#ff00e5]/5">{student.program}</span>
            </div>
            <p className="text-sm text-[#8888aa] mt-1">{student.email}</p>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent" />

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Average card */}
          <div className={`neon-card rounded-xl p-4 border-2 ${isPassing ? 'border-[#39ff14]/30' : 'border-[#ff3366]/30'} col-span-2 md:col-span-1`}>
            <p className="text-xs font-medium text-[#8888aa] uppercase tracking-wider">Promedio</p>
            <p className={`text-3xl font-extrabold mt-1 ${isPassing ? 'text-neon-green glow-green' : 'text-[#ff3366]'}`}>
              {avg !== null ? avg.toFixed(2) : "N/A"}
            </p>
            <p className="text-xs mt-1" style={{color: isPassing ? '#39ff14' : '#ff3366'}}>
              {isPassing ? "✓ Aprobando" : "✗ Por debajo de 3.0"}
            </p>
          </div>
          
          {/* Attendance stats */}
          <div className="neon-card rounded-xl p-4">
            <p className="text-xs font-medium text-[#8888aa] uppercase tracking-wider">Asistencia</p>
            <p className="text-3xl font-extrabold mt-1 text-neon-green glow-green">{presentCount}</p>
            <p className="text-xs text-[#39ff14]/70 mt-1">de {totalAttendance}</p>
          </div>
          
          <div className="neon-card rounded-xl p-4">
            <p className="text-xs font-medium text-[#8888aa] uppercase tracking-wider">Ausencias</p>
            <p className="text-3xl font-extrabold mt-1 text-[#ff3366]">{absentCount}</p>
            <p className="text-xs text-[#ff3366]/70 mt-1">registradas</p>
          </div>
          
          <div className="neon-card rounded-xl p-4">
            <p className="text-xs font-medium text-[#8888aa] uppercase tracking-wider">Excusas</p>
            <p className="text-3xl font-extrabold mt-1 text-neon-yellow">{excusaCount}</p>
            <p className="text-xs text-[#f5f500]/70 mt-1">justificadas</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Grades table */}
          <div className="neon-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#00f0ff]/10 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-neon-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              <h2 className="text-base font-bold text-neon-cyan">Notas</h2>
            </div>
            <div className="p-4">
              {gradeEntries.length === 0 ? (
                <p className="text-sm text-[#8888aa] py-4 text-center">No hay notas registradas.</p>
              ) : (
                <table className="w-full neon-table text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2 px-3 rounded-tl-lg">Evaluación</th>
                      <th className="text-right py-2 px-3 rounded-tr-lg">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradeEntries.map(([quiz, grade]) => (
                      <tr key={quiz}>
                        <td className="py-2.5 px-3 font-medium text-[#c8c8d8]">{quiz}</td>
                        <td className="py-2.5 px-3 text-right">
                          {grade === null ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#f5f500]/10 text-neon-yellow border border-[#f5f500]/30">
                              Excusa
                            </span>
                          ) : grade === 0 ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#ff3366]/10 text-[#ff3366] border border-[#ff3366]/30">
                              0.0 — Ausente
                            </span>
                          ) : (
                            <span className={`font-bold ${grade >= 3.0 ? 'text-neon-green' : 'text-[#ff3366]'}`}>
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

          {/* Attendance table */}
          <div className="neon-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#00f0ff]/10 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <h2 className="text-base font-bold text-neon-cyan">Asistencia</h2>
            </div>
            <div className="p-4">
              {attendanceEntries.length === 0 ? (
                <p className="text-sm text-[#8888aa] py-4 text-center">No hay registros de asistencia.</p>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  <table className="w-full neon-table text-sm">
                    <thead>
                      <tr>
                        <th className="text-left py-2 px-3 rounded-tl-lg">Evaluación</th>
                        <th className="text-right py-2 px-3 rounded-tr-lg">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceEntries.map(([date, status]) => (
                        <tr key={date}>
                          <td className="py-2.5 px-3 font-medium text-[#c8c8d8]">{date}</td>
                          <td className="py-2.5 px-3 text-right">
                            {status === "presente" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#39ff14]/10 text-neon-green border border-[#39ff14]/30 shadow-[0_0_5px_rgba(57,255,20,0.15)]">
                                ✓ Asistencia
                              </span>
                            ) : status === "excusa" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#f5f500]/10 text-neon-yellow border border-[#f5f500]/30 shadow-[0_0_5px_rgba(245,245,0,0.15)]">
                                ◎ Excusa
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ff3366]/10 text-[#ff3366] border border-[#ff3366]/30 shadow-[0_0_5px_rgba(255,51,102,0.15)]">
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
