import Link from "next/link";

export default function MainHubPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-[#2E3B33] text-[#D9CBB6] beige-grid-bg">
      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 beige-gradient-bar" />

      {/* Ambient background glows with palette colors */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#7A8F73]/10 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#4F6B57]/20 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-4xl space-y-10 animate-fade-in relative z-10 py-8">
        {/* Main Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center shadow-xl shadow-[#7A8F73]/20 animate-warm-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-[#D9CBB6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v6" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#D9CBB6] glow-beige">
            Portal Académico Universitario
          </h1>
          <p className="text-[#BFAE8F] text-base max-w-xl mx-auto">
            Bienvenido al portal institucional. Selecciona el módulo al que deseas acceder.
          </p>
        </div>

        {/* Two Main Option Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Teoría */}
          <Link href="/teoria" className="group block focus:outline-none">
            <div className="beige-card h-full rounded-2xl p-6 sm:p-8 border border-[#D9CBB6]/20 group-hover:border-[#7A8F73] transition-all duration-300 transform group-hover:-translate-y-1 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7A8F73]/10 rounded-full blur-2xl group-hover:bg-[#7A8F73]/20 transition-all" />
              
              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-[#4F6B57]/60 border border-[#7A8F73]/40 flex items-center justify-center text-[#D9CBB6] group-hover:scale-110 group-hover:border-[#7A8F73] transition-all shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#D9CBB6] group-hover:text-[#BFAE8F] transition-colors">
                    Teoría
                  </h2>
                  <p className="text-[#BFAE8F]/90 text-sm mt-1">
                    Materiales de estudio, guías temáticas, bibliografía y conceptos clave de la asignatura.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-[#D9CBB6]/80 pt-2 border-t border-[#D9CBB6]/10">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A8F73]" />
                    Contenidos estructurados por unidad
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A8F73]" />
                    Guías complementarias y talleres
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A8F73]" />
                    Lecturas y recursos de apoyo
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D9CBB6]/10 flex items-center justify-between text-sm font-semibold text-[#7A8F73] group-hover:text-[#D9CBB6] transition-colors">
                <span>Ingresar al Módulo</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Card 2: Notas */}
          <Link href="/notas" className="group block focus:outline-none">
            <div className="beige-card h-full rounded-2xl p-6 sm:p-8 border border-[#D9CBB6]/20 group-hover:border-[#7A8F73] transition-all duration-300 transform group-hover:-translate-y-1 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#BFAE8F]/10 rounded-full blur-2xl group-hover:bg-[#BFAE8F]/20 transition-all" />

              <div className="space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-xl bg-[#4F6B57]/60 border border-[#7A8F73]/40 flex items-center justify-center text-[#D9CBB6] group-hover:scale-110 group-hover:border-[#7A8F73] transition-all shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#D9CBB6] group-hover:text-[#BFAE8F] transition-colors">
                    Notas
                  </h2>
                  <p className="text-[#BFAE8F]/90 text-sm mt-1">
                    Consulta individual de notas por quiz, promedio acumulado y porcentaje de asistencia.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-[#D9CBB6]/80 pt-2 border-t border-[#D9CBB6]/10">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BFAE8F]" />
                    Calificaciones por evaluación y quiz
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BFAE8F]" />
                    Seguimiento detallado de asistencia
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BFAE8F]" />
                    Acceso rápido mediante usuario institucional
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#D9CBB6]/10 flex items-center justify-between text-sm font-semibold text-[#7A8F73] group-hover:text-[#D9CBB6] transition-colors">
                <span>Ingresar a Notas</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </main>
  );
}

