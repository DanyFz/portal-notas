import Link from "next/link";
import { notFound } from "next/navigation";
import { MathText } from "@/components/MathText";
import { THEORY_MODULES, TheoryModule } from "@/lib/theoryModules";

/* ──────────────────────────────────────────────────────────────
   HELPER COMPONENT: Theory Paragraph Card
   Renders textbook monograph callouts for definitions,
   theorems, examples, formulas, lists, and warnings.
   ────────────────────────────────────────────────────────────── */
function TheoryParagraph({ text }: { text: string }) {
  const trimmed = text.trim();

  // Block formula: starts and ends with $$
  if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
    return (
      <div className="my-5 p-4 sm:p-5 rounded-xl math-formula-block flex justify-center items-center overflow-x-auto text-[#FAF6EE]">
        <MathText content={trimmed} />
      </div>
    );
  }

  // Example Callout: starts with "Ejemplo" or "Ejemplos"
  if (/^Ejemplo/i.test(trimmed)) {
    return (
      <div className="my-4 p-4 sm:p-5 callout-example space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-[#4F6B57]/40 text-[#EDE5D8] border border-[#7A8F73]/30">
            Ejemplo Resuelto
          </span>
        </div>
        <div className="text-[14px] leading-relaxed text-[#EDE5D8]/95">
          <MathText content={trimmed} />
        </div>
      </div>
    );
  }

  // Theorem Callout: starts with "Teorema"
  if (/^Teorema/i.test(trimmed)) {
    return (
      <div className="my-4 p-4 sm:p-5 callout-theorem space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-[#7A8F73]/30 text-[#FAF6EE] border border-[#7A8F73]/50">
            Teorema
          </span>
        </div>
        <div className="text-[14px] font-medium leading-relaxed text-[#FAF6EE] font-serif italic">
          <MathText content={trimmed} />
        </div>
      </div>
    );
  }

  // Definition Callout: starts with "Definición"
  if (/^Definición/i.test(trimmed)) {
    return (
      <div className="my-4 p-4 sm:p-5 callout-definition space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded bg-[#C8B99D]/20 text-[#EDE5D8] border border-[#C8B99D]/40">
            Definición
          </span>
        </div>
        <div className="text-[14px] leading-relaxed text-[#EDE5D8]">
          <MathText content={trimmed} />
        </div>
      </div>
    );
  }

  // Warning / Important note
  if (/^(Nota|NOTA|Cuidado|Precaución|Importante)/i.test(trimmed) || trimmed.includes("≠")) {
    if (trimmed.startsWith("• (a + b)² ≠") || trimmed.startsWith("• \\sqrt{a") || trimmed.startsWith("• \\frac{1}{a} +") || trimmed.startsWith("Es muy importante")) {
      return (
        <div className="my-3 p-4 callout-note text-[13.5px] leading-relaxed text-[#EDE5D8] space-y-1">
          <div className="text-[10px] uppercase tracking-widest font-bold text-[#dfa745]">
            Observación Importante
          </div>
          <div>
            <MathText content={trimmed} />
          </div>
        </div>
      );
    }
  }

  // List items with bullet or letters
  if (trimmed.startsWith("•") || trimmed.startsWith("-") || /^[a-z]\)/i.test(trimmed) || /^\d+\./.test(trimmed)) {
    return (
      <div className="flex items-start gap-3 my-2 pl-2 sm:pl-3">
        <span className="text-[#7A8F73] font-serif text-lg leading-none select-none mt-0.5">•</span>
        <div className="text-[14px] leading-relaxed text-[#EDE5D8]/90 flex-1">
          <MathText content={trimmed.replace(/^[•\-]\s*/, "")} />
        </div>
      </div>
    );
  }

  // Default standard paragraph
  return (
    <p className="text-[14.5px] leading-relaxed text-[#EDE5D8]/90">
      <MathText content={trimmed} />
    </p>
  );
}

/* ──────────────────────────────────────────────────────────────
   NEXT.JS: Generate static params for modules 1-10
   ────────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return Object.keys(THEORY_MODULES).map((id) => ({ id }));
}

/* ──────────────────────────────────────────────────────────────
   PAGE COMPONENT
   ────────────────────────────────────────────────────────────── */
export default async function TheoryModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const moduleId = parseInt(id, 10);
  const mod: TheoryModule | undefined = THEORY_MODULES[moduleId];

  if (!mod) return notFound();

  const prevMod = moduleId > 1 ? THEORY_MODULES[moduleId - 1] : null;
  const nextMod = THEORY_MODULES[moduleId + 1] ? THEORY_MODULES[moduleId + 1] : null;

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#151d18] text-[#EDE5D8] academic-paper-bg">
      {/* Top Academic Navigation Header */}
      <header className="border-b border-[rgba(217,203,182,0.12)] bg-[#151d18]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/teoria"
              className="px-2.5 py-1.5 rounded-lg bg-[#223028] border border-[rgba(217,203,182,0.14)] text-[#EDE5D8] hover:border-[#7A8F73] hover:text-[#FAF6EE] transition-all flex items-center gap-1.5 text-xs font-medium"
              title="Volver al Catálogo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Catálogo</span>
            </Link>

            <div className="h-4 w-px bg-[rgba(217,203,182,0.15)] hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#A89F8D]">
              <span>Matemáticas Básicas</span>
              <span>/</span>
              <span className="text-[#EDE5D8] font-medium truncate max-w-[200px]" title={`Módulo ${mod.num}: ${mod.title}`}>{mod.title}</span>
            </div>
          </div>

          {/* Quick Module Stepper */}
          <div className="flex items-center gap-2">
            {prevMod && (
              <Link
                href={`/teoria/${prevMod.num}`}
                className="px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium bg-[#223028] text-[#EDE5D8] border border-[rgba(217,203,182,0.14)] hover:border-[#7A8F73] transition-all flex items-center gap-1"
                title={`Anterior: Módulo ${prevMod.num}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Módulo {prevMod.num}</span>
              </Link>
            )}

            <span className="text-xs text-[#A89F8D] px-2 font-mono">{mod.num} / 30</span>

            {nextMod && (
              <Link
                href={`/teoria/${nextMod.num}`}
                className="px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium bg-[#7A8F73] text-[#141c17] hover:bg-[#8ba383] transition-all flex items-center gap-1 font-semibold"
                title={`Siguiente: Módulo ${nextMod.num}`}
              >
                <span className="hidden sm:inline">Módulo {nextMod.num}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-10 w-full grid lg:grid-cols-[1fr_260px] gap-5 sm:gap-8 items-start">
        {/* Main Content Column */}
        <article className="space-y-8 min-w-0">
          {/* Editorial Module Header */}
          <div className="academic-card-elevated rounded-2xl p-4 sm:p-8 space-y-3 sm:space-y-4 border border-[rgba(217,203,182,0.18)] relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#7A8F73]/20 text-[#FAF6EE] border border-[#7A8F73]/30">
                Módulo {mod.num}
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#223028] text-[#C8B99D] border border-[rgba(217,203,182,0.15)]">
                {mod.pdfPages}
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#223028] text-[#A89F8D] border border-[rgba(217,203,182,0.15)]">
                {mod.tag}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF6EE] leading-tight tracking-tight">
              {mod.title}
            </h1>

            <div className="pt-2 border-t border-[rgba(217,203,182,0.1)] flex flex-wrap items-center justify-between gap-2 text-xs text-[#A89F8D]">
              <span>Notas de Clase · Universidad Nacional de Colombia</span>
              <span>Sede Medellín</span>
            </div>
          </div>

          {/* Theory Sections */}
          <div className="space-y-8">
            {mod.sections.map((section, idx) => {
              const sectionId = `seccion-${idx + 1}`;
              return (
                <section key={idx} id={sectionId} className="space-y-4 scroll-mt-20">
                  {section.level === 1 ? (
                    <div className="border-b border-[rgba(217,203,182,0.15)] pb-2 pt-4">
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF6EE] flex items-baseline gap-2.5">
                        <span className="text-sm font-mono font-normal text-[#7A8F73]">{idx + 1}.</span>
                        <span>{section.heading}</span>
                      </h2>
                    </div>
                  ) : section.level === 2 ? (
                    <h3 className="text-base sm:text-lg font-serif font-semibold text-[#C8B99D] pt-2 flex items-baseline gap-2">
                      <span className="text-xs font-mono text-[#A89F8D]">§</span>
                      <span>{section.heading}</span>
                    </h3>
                  ) : (
                    <h4 className="text-sm font-semibold text-[#EDE5D8] pt-1">
                      {section.heading}
                    </h4>
                  )}

                  {section.content.length > 0 && (
                    <div className="academic-card rounded-xl p-3.5 sm:p-6 space-y-3 sm:space-y-4">
                      {section.content.map((paragraph, pIdx) => (
                        <TheoryParagraph key={pIdx} text={paragraph} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Rich Bottom Navigation Footer */}
          <div className="pt-8 border-t border-[rgba(217,203,182,0.15)] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {prevMod ? (
                <Link
                  href={`/teoria/${prevMod.num}`}
                  className="academic-card rounded-xl p-4 sm:p-5 block hover:border-[#7A8F73] group transition-all"
                >
                  <div className="text-[11px] uppercase tracking-wider text-[#A89F8D] mb-1 font-medium flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Módulo Anterior
                  </div>
                  <div className="font-serif font-bold text-base text-[#FAF6EE] group-hover:text-[#C8B99D] transition-colors">
                    {prevMod.title}
                  </div>
                  <div className="text-xs text-[#A89F8D] mt-1">{prevMod.pdfPages}</div>
                </Link>
              ) : (
                <div />
              )}

              {nextMod ? (
                <Link
                  href={`/teoria/${nextMod.num}`}
                  className="academic-card rounded-xl p-4 sm:p-5 block hover:border-[#7A8F73] group transition-all text-right sm:text-right"
                >
                  <div className="text-[11px] uppercase tracking-wider text-[#7A8F73] mb-1 font-semibold flex items-center justify-end gap-1">
                    Siguiente Módulo
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="font-serif font-bold text-base text-[#FAF6EE] group-hover:text-[#C8B99D] transition-colors">
                    {nextMod.title}
                  </div>
                  <div className="text-xs text-[#A89F8D] mt-1">{nextMod.pdfPages}</div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </article>

        {/* Sticky Table of Contents Sidebar (Desktop) */}
        <aside className="hidden lg:block sticky top-16 space-y-4">
          <div className="academic-card rounded-xl p-4 border border-[rgba(217,203,182,0.12)]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A89F8D] mb-3 pb-2 border-b border-[rgba(217,203,182,0.1)]">
              Índice del Módulo
            </h3>
            <nav className="space-y-1 text-xs">
              {mod.sections.map((sec, idx) => (
                <a
                  key={idx}
                  href={`#seccion-${idx + 1}`}
                  className={`block py-1.5 px-2 rounded hover:bg-[#223028] hover:text-[#FAF6EE] transition-colors truncate ${
                    sec.level === 1
                      ? "text-[#EDE5D8] font-medium"
                      : "text-[#A89F8D] pl-4"
                  }`}
                  title={sec.heading}
                >
                  {sec.level === 1 && <span className="text-[#7A8F73] font-mono mr-1.5">{idx + 1}.</span>}
                  {sec.heading}
                </a>
              ))}
            </nav>
          </div>

          <div className="p-4 rounded-xl bg-[#223028]/60 border border-[rgba(217,203,182,0.1)] text-xs text-[#A89F8D] space-y-2">
            <div className="font-semibold text-[#EDE5D8]">Referencia Oficial</div>
            <p className="leading-relaxed">
              Texto guía de Matemáticas Básicas, Escuela de Matemáticas, UNAL Medellín.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

