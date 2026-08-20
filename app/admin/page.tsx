"use client";

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import { Student } from "@/lib/types";

const ADMIN_PASSWORD = "admin123";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [authError, setAuthError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ students: Student[]; warnings: string[] } | null>(null);
  const [saveStatus, setSaveStatus] = useState<{ success: boolean; message: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleAuth(e: FormEvent) {
    e.preventDefault();
    if (adminPass === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Contraseña incorrecta.");
    }
  }

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setSaveStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload-excel", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setSaveStatus({
          success: false,
          message: data.error || "Error desconocido al procesar el archivo.",
        });
        if (data.warnings) {
          setResult({ students: [], warnings: data.warnings });
        }
        return;
      }

      setSaveStatus({
        success: true,
        message: data.message,
      });

      try {
        const studentsRes = await fetch("/api/students");
        if (studentsRes.ok) {
          const studentsData = await studentsRes.json();
          setResult({
            students: studentsData.students || [],
            warnings: data.warnings || [],
          });
        }
      } catch {
        setResult({
          students: [],
          warnings: data.warnings || [],
        });
      }
    } catch (err) {
      setSaveStatus({
        success: false,
        message: "Error al subir el archivo: " + (err instanceof Error ? err.message : "Error desconocido"),
      });
    } finally {
      setLoading(false);
    }
  }

  // Auth screen
  if (!authenticated) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#2E3B33] text-[#D9CBB6] beige-grid-bg min-h-screen">
        <div className="absolute top-0 left-0 w-full h-1.5 beige-gradient-bar" />
        
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#7A8F73]/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#4F6B57]/20 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-sm space-y-6 animate-fade-in relative z-10">
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center shadow-lg shadow-[#7A8F73]/20 animate-warm-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#D9CBB6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-[#D9CBB6] glow-beige">Panel de Administración</h1>
            <p className="text-xs text-[#BFAE8F]">Acceso reservado a docentes y administradores</p>
          </div>
          <div className="beige-card rounded-2xl p-6 border border-[#D9CBB6]/20">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="admin-pass" className="text-sm font-medium text-[#D9CBB6]">Contraseña de administrador</label>
                <input
                  id="admin-pass"
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  required
                  className="beige-input w-full h-11 rounded-lg px-3.5 text-sm"
                />
              </div>
              {authError && (
                <p className="text-xs text-[#e05d5d] bg-[#e05d5d]/10 border border-[#e05d5d]/30 p-2.5 rounded-lg animate-shake">
                  {authError}
                </p>
              )}
              <button type="submit" className="beige-btn w-full h-10 rounded-lg cursor-pointer font-semibold text-sm">
                Acceder al Panel
              </button>
            </form>
          </div>
          <p className="text-center text-xs text-[#BFAE8F]">
            <Link href="/" className="text-[#D9CBB6] hover:text-[#BFAE8F] transition-all">← Volver al Portal Principal</Link>
          </p>
        </div>
      </main>
    );
  }

  // Admin dashboard
  return (
    <main className="flex-1 min-h-screen bg-[#2E3B33] text-[#D9CBB6] beige-grid-bg">
      {/* Top bar */}
      <div className="border-b border-[#D9CBB6]/20 bg-[#2E3B33]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-semibold text-sm flex items-center gap-2 text-[#D9CBB6]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#7A8F73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="glow-beige">Administración de Estudiantes</span>
          </span>
          <Link href="/" className="text-xs text-[#BFAE8F] hover:text-[#D9CBB6] transition-all">← Volver al Inicio</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Upload card */}
        <div className="beige-card rounded-2xl overflow-hidden border border-[#D9CBB6]/20">
          <div className="p-6 border-b border-[#D9CBB6]/15 bg-[#4F6B57]/20">
            <h2 className="text-lg font-bold flex items-center gap-2 text-[#D9CBB6]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#7A8F73]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <span className="glow-beige">Subir Archivo Excel</span>
            </h2>
            <p className="text-xs text-[#BFAE8F] mt-1">
              Sube un archivo .xlsx con una hoja por grupo. Se guardará en la nube (Vercel Blob) y estará disponible para <strong className="text-[#D9CBB6]">todos los estudiantes</strong>.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="border-2 border-dashed border-[#D9CBB6]/25 rounded-xl p-8 text-center hover:border-[#7A8F73] transition-all group cursor-pointer bg-[#2E3B33]/50" onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" id="excel-upload" />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto text-[#BFAE8F]/60 group-hover:text-[#7A8F73] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <p className="text-sm font-medium mt-2 text-[#D9CBB6]">
                {file ? (
                  <span className="text-[#7A8F73] font-semibold">{file.name}</span>
                ) : (
                  "Haz clic para seleccionar un archivo .xlsx"
                )}
              </p>
              <p className="text-xs text-[#BFAE8F]/70 mt-1">Soporta libros de Excel con múltiples hojas por grupo</p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="beige-btn w-full h-10 text-xs rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Procesando y guardando en la nube...
                </>
              ) : "Subir y procesar"}
            </button>
          </div>
        </div>

        {/* Status notice */}
        {saveStatus && (
          <div className={`rounded-xl p-4 text-xs border ${
            saveStatus.success 
              ? "bg-[#7A8F73]/20 border-[#7A8F73]/50 text-[#D9CBB6]" 
              : "bg-[#e05d5d]/15 border-[#e05d5d]/40 text-[#e05d5d]"
          }`}>
            <p className="font-bold text-sm">{saveStatus.success ? "✓ Éxito — Datos procesados correctamente" : "✗ Error"}</p>
            <p className="mt-1 opacity-90">{saveStatus.message}</p>
          </div>
        )}

        {/* Warnings */}
        {result && result.warnings.length > 0 && (
          <div className="beige-card rounded-xl overflow-hidden border-[#BFAE8F]/30">
            <div className="p-4 border-b border-[#BFAE8F]/20 bg-[#4F6B57]/20">
              <h3 className="text-xs font-bold text-[#BFAE8F]">⚠ Advertencias del proceso</h3>
            </div>
            <div className="p-4">
              <ul className="text-xs text-[#BFAE8F] space-y-1">
                {result.warnings.map((w, i) => <li key={i}>⚠ {w}</li>)}
              </ul>
            </div>
          </div>
        )}

        {/* Results preview */}
        {result && result.students.length > 0 && (
          <div className="beige-card rounded-2xl overflow-hidden border border-[#D9CBB6]/20">
            <div className="p-4 border-b border-[#D9CBB6]/15 bg-[#4F6B57]/20">
              <h3 className="text-sm font-bold text-[#D9CBB6]">
                Estudiantes Importados ({result.students.length})
              </h3>
            </div>
            <div className="p-4">
              <div className="max-h-96 overflow-y-auto space-y-2">
                {result.students.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#2E3B33]/80 border border-[#D9CBB6]/10 hover:border-[#7A8F73]/40 transition-all group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7A8F73]/30 to-[#4F6B57]/40 border border-[#7A8F73]/40 flex items-center justify-center text-[#D9CBB6] font-bold text-xs">
                      {s.fullName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate text-[#D9CBB6]">{s.fullName}</p>
                      <p className="text-[11px] text-[#BFAE8F]">{s.email}</p>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full border border-[#7A8F73]/40 text-[#D9CBB6] bg-[#7A8F73]/20">
                      {s.group}
                    </span>
                    <span className="text-[11px] text-[#BFAE8F] hidden sm:block">
                      {Object.keys(s.grades).length} notas
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

