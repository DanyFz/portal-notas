"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authenticate, saveSession } from "@/lib/auth";

export default function StudentLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const student = await authenticate(username.trim());
      if (student) {
        saveSession(student);
        router.push("/dashboard");
      } else {
        setError("Usuario no encontrado. Verifica tu nombre de usuario institucional.");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#151d18] text-[#EDE5D8] academic-paper-bg">
      <div className="w-full max-w-md space-y-6 relative z-10 py-6">
        {/* Navigation header */}
        <div className="flex items-center justify-between text-xs text-[#A89F8D]">
          <Link href="/" className="flex items-center gap-1.5 hover:text-[#FAF6EE] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Menú
          </Link>
          <span className="px-2.5 py-0.5 rounded-md bg-[#223028] border border-[rgba(217,203,182,0.12)] text-[#C8B99D] font-mono text-[11px]">
            ESTUDIANTES
          </span>
        </div>

        {/* Academic Institutional Login Card */}
        <div className="academic-card-elevated rounded-2xl p-7 sm:p-8 border border-[rgba(217,203,182,0.18)] space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-xl bg-[#223028] border border-[rgba(217,203,182,0.15)] mx-auto flex items-center justify-center text-[#C8B99D]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#FAF6EE]">
              Consulta de Calificaciones
            </h1>
            <p className="text-xs text-[#A89F8D] leading-relaxed">
              Ingresa el usuario de tu correo institucional UNAL (sin incluir <i>@unal.edu.co</i>).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-xs font-medium text-[#EDE5D8] block">
                Usuario Institucional
              </label>
              <input
                id="username"
                type="text"
                placeholder="ej: dalopezza"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="academic-input w-full h-11 rounded-lg px-3.5 text-sm"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-950/40 border border-red-800/40 p-3 text-xs text-red-300 flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="academic-btn-primary w-full h-11 text-xs uppercase tracking-wider font-bold rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  <span>Verificando...</span>
                </>
              ) : (
                <span>Consultar Calificaciones</span>
              )}
            </button>
          </form>

          <div className="pt-3 border-t border-[rgba(217,203,182,0.1)] text-center text-[11px] text-[#A89F8D]">
            Universidad Nacional de Colombia · Sede Medellín
          </div>
        </div>
      </div>
    </main>
  );
}

