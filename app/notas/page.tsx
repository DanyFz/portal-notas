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
        setError("Usuario no encontrado. Verifica tu nombre de usuario.");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#2E3B33] text-[#D9CBB6] beige-grid-bg">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 beige-gradient-bar" />
      
      {/* Background warm ambient glows */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7A8F73]/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#4F6B57]/20 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 animate-fade-in relative z-10 py-6">
        {/* Navigation header */}
        <div className="flex items-center justify-between text-xs text-[#BFAE8F]">
          <Link href="/" className="flex items-center gap-1 hover:text-[#D9CBB6] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Inicio
          </Link>
          <span className="px-2.5 py-1 rounded-full bg-[#4F6B57]/40 border border-[#7A8F73]/30 text-[#D9CBB6] font-medium">
            Módulo Notas
          </span>
        </div>

        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center shadow-lg shadow-[#7A8F73]/20 animate-warm-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-[#D9CBB6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#D9CBB6] glow-beige">Consulta de Notas</h1>
          <p className="text-[#BFAE8F] text-xs">Ingresa tu usuario institucional para acceder a tus calificaciones</p>
        </div>

        {/* Login card */}
        <div className="beige-card rounded-2xl p-6 border border-[#D9CBB6]/20 animate-warm-border">
          <div className="text-center mb-6">
            <h2 className="text-base font-bold text-[#D9CBB6]">Iniciar Sesión</h2>
            <p className="text-xs text-[#BFAE8F]/80 mt-1">
              Usuario: parte de tu correo institucional antes de @
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-[#D9CBB6]">Usuario institucional</label>
              <input
                id="username"
                type="text"
                placeholder="ej: dalopezza"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="beige-input w-full h-11 rounded-lg px-3.5 text-sm"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-[#e05d5d]/10 border border-[#e05d5d]/30 p-3 text-xs text-[#e05d5d] flex items-start gap-2 animate-shake">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="beige-btn w-full h-11 text-sm rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Verificando...
                </>
              ) : "Ingresar a mis Notas"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
