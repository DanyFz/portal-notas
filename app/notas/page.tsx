"use client";

import { useState, FormEvent, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { authenticate, saveSession } from "@/lib/auth";

function StudentLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hidden admin modal state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Auto-open if query has admin
  useEffect(() => {
    if (searchParams.get("admin")) {
      setShowAdminModal(true);
    }
  }, [searchParams]);

  // Keyboard shortcut listener: Ctrl + Alt + A
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a")) {
        e.preventDefault();
        setShowAdminModal(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Multi-click secret trigger on top badge
  function handleSecretBadgeClick() {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setShowAdminModal(true);
        return 0;
      }
      return next;
    });
  }

  // Student login
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

  // Admin login submission
  async function handleAdminSubmit(e: FormEvent) {
    e.preventDefault();
    setAdminError("");
    setAdminLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: adminUser.trim(),
          password: adminPass,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.token) {
          sessionStorage.setItem("admin_token", data.token);
        }
        router.push("/admin");
      } else {
        setAdminError(data.error || "Credenciales incorrectas.");
      }
    } catch {
      setAdminError("Error al contactar el servidor de autenticación.");
    } finally {
      setAdminLoading(false);
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#151d18] text-[#EDE5D8] academic-paper-bg min-h-screen">
      <div className="w-full max-w-md space-y-6 relative z-10 py-6">
        {/* Navigation header */}
        <div className="flex items-center justify-between text-xs text-[#A89F8D]">
          <Link href="/" className="flex items-center gap-1.5 hover:text-[#FAF6EE] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Menú
          </Link>
          <span
            onClick={handleSecretBadgeClick}
            className="px-2.5 py-0.5 rounded-md bg-[#223028] border border-[rgba(217,203,182,0.12)] text-[#C8B99D] font-mono text-[11px] cursor-default select-none"
            title="Portal de Calificaciones"
          >
            ESTUDIANTES
          </span>
        </div>

        {/* Academic Institutional Login Card */}
        <div className="academic-card-elevated rounded-2xl p-7 sm:p-8 border border-[rgba(217,203,182,0.18)] space-y-6">
          <div className="space-y-2 text-center">
            <div
              onClick={handleSecretBadgeClick}
              className="w-12 h-12 rounded-xl bg-[#223028] border border-[rgba(217,203,182,0.15)] mx-auto flex items-center justify-center text-[#C8B99D] cursor-pointer hover:border-[rgba(217,203,182,0.3)] transition-all select-none"
              title="Universidad Nacional de Colombia"
            >
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
                placeholder="usuario institucional"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="academic-input w-full h-11 rounded-lg px-3.5 text-sm"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-950/40 border border-red-800/40 p-3 text-xs text-red-300 flex items-start gap-2 animate-fadeIn">
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

          {/* Footer with subtle hidden admin access */}
          <div className="pt-3 border-t border-[rgba(217,203,182,0.1)] flex items-center justify-between text-[11px] text-[#A89F8D]">
            <span>Universidad Nacional de Colombia · Sede Medellín</span>
            <button
              type="button"
              onClick={() => setShowAdminModal(true)}
              className="opacity-20 hover:opacity-80 p-1 text-[#C8B99D] transition-opacity cursor-pointer"
              title="Acceso Docente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Hidden Admin Login Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#18231c] border border-[rgba(217,203,182,0.25)] rounded-2xl max-w-sm w-full p-6 sm:p-7 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowAdminModal(false)}
              className="absolute top-4 right-4 text-[#A89F8D] hover:text-[#FAF6EE] cursor-pointer p-1"
            >
              ✕
            </button>

            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-lg bg-[#223028] border border-[rgba(217,203,182,0.15)] mx-auto flex items-center justify-center text-[#8FA698] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-base font-serif font-bold text-[#FAF6EE]">
                Acceso Docente / Administración
              </h2>
              <p className="text-[11px] text-[#A89F8D]">
                Gestión de notas, asistencia y hojas de cálculo.
              </p>
            </div>

            <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#EDE5D8] block font-medium">Usuario</label>
                <input
                  type="text"
                  placeholder="usuario"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  required
                  autoFocus
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#EDE5D8] block font-medium">Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  required
                  className="academic-input w-full h-9 rounded-md px-3 font-mono bg-[#131a15]"
                />
              </div>

              {adminError && (
                <div className="p-2.5 rounded-md bg-red-950/60 border border-red-800/50 text-[11px] text-red-300">
                  {adminError}
                </div>
              )}

              <button
                type="submit"
                disabled={adminLoading}
                className="academic-btn-primary w-full h-10 text-xs font-bold uppercase tracking-wider rounded-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {adminLoading ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                    <span>Ingresando...</span>
                  </>
                ) : (
                  <span>Acceder al Panel</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default function StudentLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#151d18]" />}>
      <StudentLoginContent />
    </Suspense>
  );
}
