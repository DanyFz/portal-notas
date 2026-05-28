"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, clearSession, calculateAverage } from "@/lib/auth";
import { Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

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
        <svg className="animate-spin h-8 w-8 text-[#005C39]" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
      </main>
    );
  }

  const avg = calculateAverage(student.grades);
  const gradeEntries = Object.entries(student.grades);
  const attendanceEntries = Object.entries(student.attendance).sort(([a], [b]) => a.localeCompare(b));
  const isPassing = avg !== null && avg >= 3.0;

  return (
    <main className="flex-1 bg-gray-50/50">
      {/* Top bar */}
      <div className="bg-[#005C39] text-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" /></svg>
            </div>
            <span className="font-semibold text-sm">Portal de Notas</span>
          </div>
          <Button onClick={handleLogout} variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Cerrar sesión
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Student info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#005C39] to-[#00804d] flex items-center justify-center text-white text-xl font-bold shadow-md">
            {student.fullName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{student.fullName}</h1>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge className="bg-[#005C39]/10 text-[#005C39] border-[#005C39]/20 hover:bg-[#005C39]/10">{student.group}</Badge>
              <Badge className="bg-[#F5A800]/10 text-[#b07800] border-[#F5A800]/20 hover:bg-[#F5A800]/10">{student.program}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{student.email}</p>
          </div>
        </div>

        <Separator />

        {/* Average card */}
        <Card className={`border-2 ${isPassing ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"}`}>
          <CardContent className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Promedio Actual</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isPassing ? "Estás aprobando ✓" : "Tu promedio está por debajo de 3.0"}
              </p>
            </div>
            <div className={`text-5xl font-extrabold tracking-tight ${isPassing ? "text-green-600" : "text-red-600"}`}>
              {avg !== null ? avg.toFixed(2) : "N/A"}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Grades table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#F5A800]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Notas
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {gradeEntries.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No hay notas registradas.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Evaluación</TableHead>
                      <TableHead className="text-right">Nota</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradeEntries.map(([quiz, grade]) => (
                      <TableRow key={quiz}>
                        <TableCell className="font-medium">{quiz}</TableCell>
                        <TableCell className="text-right">
                          {grade === null ? (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Excusa</Badge>
                          ) : (
                            <span className={`font-semibold ${grade >= 3.0 ? "text-green-600" : "text-red-600"}`}>{grade.toFixed(1)}</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Attendance table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#005C39]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Asistencia
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {attendanceEntries.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No hay registros de asistencia.</p>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceEntries.map(([date, status]) => (
                        <TableRow key={date}>
                          <TableCell className="font-medium">{date}</TableCell>
                          <TableCell className="text-right">
                            {status === "presente" ? (
                              <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">Presente</Badge>
                            ) : status === "excusa" ? (
                              <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">Excusa</Badge>
                            ) : (
                              <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">Ausente</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
