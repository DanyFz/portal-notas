"use client";

import { useState, useRef, FormEvent } from "react";
import { parseExcelFile } from "@/lib/parseExcel";
import { Student } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
        const res = await fetch("/api/save-students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ students: parsed.students }),
        });
        const data = await res.json();
        if (res.ok) {
          setSaveStatus({ success: true, message: data.message });
        } else {
          setSaveStatus({ success: false, message: data.error || "Error al guardar." });
        }
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
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#005C39] via-[#F5A800] to-[#005C39]" />
        <div className="w-full max-w-sm space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-[#F5A800] to-[#d49200] flex items-center justify-center shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-[#005C39]">Panel de Administración</h1>
          </div>
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <form onSubmit={handleAuth} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-pass">Contraseña de administrador</Label>
                  <Input id="admin-pass" type="password" value={adminPass} onChange={(e) => setAdminPass(e.target.value)} required className="h-11" />
                </div>
                {authError && <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md">{authError}</p>}
                <Button type="submit" className="w-full h-10 bg-[#005C39] hover:bg-[#004a2e] text-white cursor-pointer">Acceder</Button>
              </form>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-muted-foreground">
            <a href="/" className="text-[#005C39] hover:underline">← Volver al login</a>
          </p>
        </div>
      </main>
    );
  }

  // Admin dashboard
  return (
    <main className="flex-1 bg-gray-50/50">
      <div className="bg-[#005C39] text-white">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-semibold text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Administración
          </span>
          <a href="/" className="text-sm text-white/80 hover:text-white">← Volver</a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#005C39]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              Subir archivo Excel
            </CardTitle>
            <CardDescription>
              Sube un archivo .xlsx con una hoja por grupo. Cada hoja debe tener columnas de Nombre, Correo, Programa, fechas de asistencia y evaluaciones (Quiz, Nota, Parcial, etc.).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#005C39]/40 transition-colors">
              <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" id="excel-upload" />
              <Label htmlFor="excel-upload" className="cursor-pointer space-y-2 block">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                <p className="text-sm font-medium text-gray-600">{file ? file.name : "Haz clic para seleccionar un archivo .xlsx"}</p>
                <p className="text-xs text-muted-foreground">Máximo un archivo Excel con hojas por grupo</p>
              </Label>
            </div>

            <Button onClick={handleUpload} disabled={!file || loading} className="w-full h-10 bg-[#005C39] hover:bg-[#004a2e] text-white cursor-pointer">
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Procesando...
                </span>
              ) : "Subir y procesar"}
            </Button>
          </CardContent>
        </Card>

        {/* Status */}
        {saveStatus && (
          <div className={`rounded-lg p-4 text-sm ${saveStatus.success ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
            <p className="font-medium">{saveStatus.success ? "✓ Éxito" : "✗ Error"}</p>
            <p>{saveStatus.message}</p>
          </div>
        )}

        {/* EROFS Help Card */}
        {saveStatus && !saveStatus.success && (saveStatus.message.includes("EROFS") || saveStatus.message.includes("read-only") || saveStatus.message.includes("solo lectura") || saveStatus.message.includes("sistema de archivos")) && result && result.students.length > 0 && (
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-amber-800 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ¿Desplegado en Vercel o Servidor de Solo Lectura?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-amber-700 leading-relaxed">
                Dado que los servidores en producción como Vercel tienen un sistema de archivos de solo lectura, no es posible escribir directamente el archivo en el servidor.
              </p>
              <p className="text-xs font-medium text-amber-800">
                ¡No te preocupes! El procesamiento ya se completó con éxito en tu navegador. Puedes descargar el archivo generado aquí mismo, guardarlo en tu proyecto local en la ruta <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[10px]">public/data/students.json</code>, hacer commit y redesplegar:
              </p>
              <Button 
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ students: result.students }, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", "students.json");
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }} 
                className="w-full sm:w-auto bg-[#d49200] hover:bg-[#b07800] text-white flex items-center gap-2 cursor-pointer mt-2 px-4 py-2 font-semibold shadow-md rounded-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Descargar students.json para Despliegue
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Warnings */}
        {result && result.warnings.length > 0 && (
          <Card className="border-amber-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-amber-700">Advertencias</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-amber-700 space-y-1">
                {result.warnings.map((w, i) => <li key={i}>⚠ {w}</li>)}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Results preview */}
        {result && result.students.length > 0 && (
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-base">Estudiantes importados ({result.students.length})</CardTitle>
              </div>
              <Button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ students: result.students }, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", "students.json");
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                variant="outline"
                size="sm"
                className="h-8 border-[#005C39] text-[#005C39] hover:bg-[#005C39]/5 flex items-center gap-1.5 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Descargar JSON
              </Button>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  {result.students.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-[#005C39]/10 flex items-center justify-center text-[#005C39] font-bold text-sm">{s.fullName.charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{s.fullName}</p>
                        <p className="text-xs text-muted-foreground">{s.email}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">{s.group}</Badge>
                      <span className="text-xs text-muted-foreground hidden sm:block">{Object.keys(s.grades).length} notas</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
