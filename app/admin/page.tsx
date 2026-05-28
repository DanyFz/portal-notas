"use client";

import { useState, useRef, FormEvent } from "react";
import { parseExcelFile } from "@/lib/parseExcel";
import { saveStudentsData } from "@/lib/auth";
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
      const buffer = await file.arrayBuffer();
      const parsed = parseExcelFile(buffer);
      setResult(parsed);

      if (parsed.students.length > 0) {
        // Save to localStorage instead of server filesystem
        saveStudentsData(parsed.students);
        setSaveStatus({
          success: true,
          message: `Se guardaron ${parsed.students.length} estudiantes exitosamente.`,
        });
      }
    } catch (err) {
      setSaveStatus({
        success: false,
        message: "Error al procesar el archivo: " + (err instanceof Error ? err.message : "Error desconocido"),
      });
    } finally {
      setLoading(false);
    }
  }

  // Auth screen
  if (!authenticated) {
    return (
      <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Neon top bar */}
        <div className="absolute top-0 left-0 w-full h-1 neon-gradient-bar" />
        
        {/* Background glows */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#00f0ff]/5 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#ff00e5]/5 blur-[100px]" />

        <div className="w-full max-w-sm space-y-6 animate-fade-in">
          <div className="text-center space-y-3">
            <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-[#ff00e5] to-[#bf00ff] flex items-center justify-center shadow-lg shadow-[#ff00e5]/30 animate-neon-pulse" style={{animationDuration: '3s'}}>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-neon-magenta glow-magenta">Panel de Administración</h1>
          </div>
          <div className="neon-card rounded-xl p-6">
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="admin-pass" className="text-sm font-medium text-neon-cyan">Contraseña de administrador</label>
                <input
                  id="admin-pass"
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  required
                  className="neon-input w-full h-11 rounded-lg px-3 text-sm"
                />
              </div>
              {authError && (
                <p className="text-sm text-[#ff3366] bg-[#ff3366]/10 border border-[#ff3366]/30 p-2 rounded-md">
                  {authError}
                </p>
              )}
              <button type="submit" className="neon-btn w-full h-10 rounded-lg cursor-pointer font-semibold">
                Acceder
              </button>
            </form>
          </div>
          <p className="text-center text-xs text-[#8888aa]">
            <a href="/" className="text-neon-cyan hover:glow-cyan transition-all">← Volver al login</a>
          </p>
        </div>
      </main>
    );
  }

  // Admin dashboard
  return (
    <main className="flex-1">
      {/* Top bar */}
      <div className="border-b border-[#00f0ff]/20 bg-[#0a0a0f]/90 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-semibold text-sm flex items-center gap-2 text-neon-magenta">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="glow-magenta">Administración</span>
          </span>
          <a href="/" className="text-sm text-neon-cyan hover:glow-cyan transition-all">← Volver</a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Upload card */}
        <div className="neon-card rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[#00f0ff]/10">
            <h2 className="text-lg font-bold flex items-center gap-2 text-neon-cyan">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <span className="glow-cyan">Subir archivo Excel</span>
            </h2>
            <p className="text-sm text-[#8888aa] mt-1">
              Sube un archivo .xlsx con una hoja por grupo. Cada hoja debe tener columnas de Nombre, Correo, Programa, fechas de asistencia y evaluaciones.
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="border-2 border-dashed border-[#00f0ff]/20 rounded-xl p-8 text-center hover:border-[#00f0ff]/40 transition-all group cursor-pointer" onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" id="excel-upload" />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto text-[#555577] group-hover:text-neon-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              <p className="text-sm font-medium mt-2 text-[#c8c8d8]">
                {file ? (
                  <span className="text-neon-green glow-green">{file.name}</span>
                ) : (
                  "Haz clic para seleccionar un archivo .xlsx"
                )}
              </p>
              <p className="text-xs text-[#555577] mt-1">Máximo un archivo Excel con hojas por grupo</p>
            </div>

            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="neon-btn w-full h-10 rounded-lg cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Procesando...
                </span>
              ) : "Subir y procesar"}
            </button>
          </div>
        </div>

        {/* Status */}
        {saveStatus && (
          <div className={`rounded-xl p-4 text-sm border ${
            saveStatus.success 
              ? "bg-[#39ff14]/5 border-[#39ff14]/30 text-neon-green" 
              : "bg-[#ff3366]/5 border-[#ff3366]/30 text-[#ff3366]"
          }`}>
            <p className="font-bold">{saveStatus.success ? "✓ Éxito" : "✗ Error"}</p>
            <p className="mt-1 opacity-90">{saveStatus.message}</p>
          </div>
        )}

        {/* Warnings */}
        {result && result.warnings.length > 0 && (
          <div className="neon-card rounded-xl overflow-hidden border-[#f5f500]/30">
            <div className="p-4 border-b border-[#f5f500]/10">
              <h3 className="text-sm font-bold text-neon-yellow">⚠ Advertencias</h3>
            </div>
            <div className="p-4">
              <ul className="text-sm text-neon-yellow/80 space-y-1">
                {result.warnings.map((w, i) => <li key={i}>⚠ {w}</li>)}
              </ul>
            </div>
          </div>
        )}

        {/* Results preview */}
        {result && result.students.length > 0 && (
          <div className="neon-card rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#00f0ff]/10">
              <h3 className="text-base font-bold text-neon-cyan">
                Estudiantes importados ({result.students.length})
              </h3>
            </div>
            <div className="p-4">
              <div className="max-h-96 overflow-y-auto space-y-2">
                {result.students.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#0a0a1a]/50 border border-[#00f0ff]/10 hover:border-[#00f0ff]/30 transition-all group">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00f0ff]/20 to-[#ff00e5]/20 border border-[#00f0ff]/30 flex items-center justify-center text-neon-cyan font-bold text-sm group-hover:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-shadow">
                      {s.fullName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-[#e8e8f0]">{s.fullName}</p>
                      <p className="text-xs text-[#8888aa]">{s.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full border border-[#ff00e5]/30 text-neon-magenta bg-[#ff00e5]/5">
                      {s.group}
                    </span>
                    <span className="text-xs text-[#8888aa] hidden sm:block">
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
