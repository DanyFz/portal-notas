import Link from "next/link";

export default function ParcialesPage() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#151d18] text-[#EDE5D8] academic-paper-bg">
      {/* Top Academic Header */}
      <header className="border-b border-[rgba(217,203,182,0.12)] bg-[#151d18]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-2.5 py-1.5 rounded-lg bg-[#223028] border border-[rgba(217,203,182,0.14)] text-[#EDE5D8] hover:border-[#7A8F73] hover:text-[#FAF6EE] transition-all flex items-center gap-1.5 text-xs font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Inicio</span>
            </Link>

            <div className="h-4 w-px bg-[rgba(217,203,182,0.15)]" />

            <div>
              <span className="font-serif font-bold text-sm text-[#FAF6EE] block leading-tight">
                Parciales Pasados Resueltos
              </span>
              <span className="text-[11px] text-[#A89F8D] hidden sm:block">
                Universidad Nacional de Colombia · Sede Medellín
              </span>
            </div>
          </div>

          <div className="text-xs text-[#A89F8D]">
            <span className="font-mono text-[#dfa745]">Exámenes</span> Resueltos
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-3.5 sm:px-6 py-12 sm:py-20 flex-1 w-full flex flex-col items-center justify-center">
        <div className="academic-card-elevated rounded-2xl p-6 sm:p-12 border border-[rgba(217,203,182,0.18)] text-center space-y-6 sm:space-y-8 w-full relative overflow-hidden">
          {/* Decorative icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#223028] border border-[rgba(217,203,182,0.15)] mx-auto flex items-center justify-center text-[#dfa745]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF6EE] tracking-tight">
              Próximamente
            </h1>
            <p className="text-sm sm:text-base text-[#C8B99D] font-medium">
              (antes del parcial, claro)
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#A89F8D] leading-relaxed max-w-md mx-auto">
            Estamos preparando los parciales resueltos de forma guiada con explicaciones paso a paso. Este material estará disponible próximamente para que puedas prepararte de la mejor manera.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 justify-center pt-2">
            <div className="h-px w-12 bg-[rgba(217,203,182,0.15)]" />
            <span className="text-[#7A8F73] text-xs font-mono">⏳</span>
            <div className="h-px w-12 bg-[rgba(217,203,182,0.15)]" />
          </div>

          {/* Back button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold academic-btn-primary cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
