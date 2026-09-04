import Link from "next/link";

export default function MainHubPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 bg-[#151d18] text-[#EDE5D8] academic-paper-bg">
      <div className="w-full max-w-5xl space-y-12 py-8 relative z-10">
        {/* Institutional Branding Header */}
        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#223028] border border-[rgba(217,203,182,0.15)] text-xs text-[#C8B99D] font-medium mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A8F73]" />
            Universidad Nacional de Colombia · Sede Medellín
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#FAF6EE] leading-tight">
            Portal Académico de Matemáticas Básicas
          </h1>

          <p className="text-[#A89F8D] text-sm sm:text-base leading-relaxed">
            Plataforma institucional para el estudio riguroso de la teoría del curso y la consulta individual de notas y asistencia para los grupos GEAS de Daniel Felipe Lopez Zapata.
          </p>
        </header>

        {/* Two Curated Main Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Teoría */}
          <Link href="/teoria" className="group block focus:outline-none">
            <div className="academic-card-elevated rounded-2xl p-7 sm:p-8 h-full flex flex-col justify-between hover:border-[#7A8F73] transition-all relative overflow-hidden group-hover:-translate-y-1">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#223028] border border-[rgba(217,203,182,0.15)] flex items-center justify-center text-[#7A8F73] group-hover:bg-[#7A8F73] group-hover:text-[#141c17] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="font-mono text-xs text-[#A89F8D] px-2.5 py-1 rounded-md bg-[#17211b] border border-[rgba(217,203,182,0.1)]">
                    30 MÓDULOS
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-serif font-bold text-[#FAF6EE] group-hover:text-[#C8B99D] transition-colors">
                    Módulos Teóricos
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A89F8D] leading-relaxed">
                    Notas de clase oficiales desarrolladas con rigor: teoremas, axiomas, definiciones formales y ejemplos resueltos paso a paso.
                  </p>
                </div>

                {/* Scope list */}
                <div className="space-y-2 pt-4 border-t border-[rgba(217,203,182,0.08)] text-xs text-[#EDE5D8]/80">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#7A8F73]">01.</span>
                    <span>Álgebra y Fundamentos Numéricos (1–10)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#7A8F73]">02.</span>
                    <span>Ecuaciones, Geometría y Modelado (11–19)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#7A8F73]">03.</span>
                    <span>Funciones y Propiedades (20–25)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#7A8F73]">04.</span>
                    <span>Trigonometría y Aplicaciones (26–30)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[rgba(217,203,182,0.1)] flex items-center justify-between text-xs font-semibold text-[#7A8F73] group-hover:text-[#FAF6EE] transition-colors">
                <span>Explorar notas teóricas</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Card 2: Notas */}
          <Link href="/notas" className="group block focus:outline-none">
            <div className="academic-card-elevated rounded-2xl p-7 sm:p-8 h-full flex flex-col justify-between hover:border-[#7A8F73] transition-all relative overflow-hidden group-hover:-translate-y-1">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#223028] border border-[rgba(217,203,182,0.15)] flex items-center justify-center text-[#C8B99D] group-hover:bg-[#C8B99D] group-hover:text-[#141c17] transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="font-mono text-xs text-[#A89F8D] px-2.5 py-1 rounded-md bg-[#17211b] border border-[rgba(217,203,182,0.1)]">
                    ESTUDIANTES
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-serif font-bold text-[#FAF6EE] group-hover:text-[#C8B99D] transition-colors">
                    Consulta de Calificaciones
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A89F8D] leading-relaxed">
                    Acceso personalizado al registro de quizes, talleres, porcentaje de asistencia acumulado y promedio ponderado.
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-4 border-t border-[rgba(217,203,182,0.08)] text-xs text-[#EDE5D8]/80">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99D]" />
                    <span>Calificaciones discriminadas por evaluación</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99D]" />
                    <span>Porcentaje de fallas y asistencia a clase</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99D]" />
                    <span>Ingreso directo con usuario institucional (@unal.edu.co)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8B99D]" />
                    <span>Estadísticas de rendimiento individual</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[rgba(217,203,182,0.1)] flex items-center justify-between text-xs font-semibold text-[#7A8F73] group-hover:text-[#FAF6EE] transition-colors">
                <span>Ingresar al módulo de notas</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Institutional Footer */}
        <footer className="pt-8 border-t border-[rgba(217,203,182,0.12)] text-center text-xs text-[#A89F8D] space-y-1">
          <p>Universidad Nacional de Colombia · Facultad de Ciencias · Escuela de Matemáticas</p>
          <p className="text-[11px] text-[#A89F8D]/70">Semestre Académico 2025-01 · Sede Medellín</p>
        </footer>
      </div>
    </main>
  );
}


