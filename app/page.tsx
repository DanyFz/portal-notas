"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authenticate, saveSession } from "@/lib/auth";

export default function LoginPage() {
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
    <main className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 beige-gradient-bar" />
      
      {/* Background warm ambient glows */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#e6d5b8]/5 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px]" />

      <div className="w-full max-w-md space-y-8 animate-fade-in relative z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e6d5b8] to-[#d4af37] flex items-center justify-center shadow-lg shadow-[#e6d5b8]/15 animate-warm-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#0b0b0e] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#e6d5b8] glow-beige">Portal de Notas</h1>
          <p className="text-[#9e9389] text-sm">Ingresa tu usuario para consultar tus notas</p>
        </div>

        {/* Login card */}
        <div className="beige-card rounded-2xl p-6 border border-[#e6d5b8]/20 animate-warm-border">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-[#d4af37]">Iniciar Sesión</h2>
            <p className="text-xs text-[#9e9389] mt-1">
              Usuario: parte del correo antes de @
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-[#e6d5b8]">Usuario</label>
              <input
                id="username"
                type="text"
                placeholder="ej: dalopezza"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="beige-input w-full h-11 rounded-lg px-3 text-sm"
              />
            </div>
            {error && (
              <div className="rounded-lg bg-[#e05d5d]/10 border border-[#e05d5d]/30 p-3 text-sm text-[#e05d5d] flex items-start gap-2 animate-shake">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="beige-btn w-full h-11 text-base rounded-lg cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Verificando...
                </span>
              ) : "Ingresar"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
