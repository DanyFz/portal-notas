import Link from "next/link";
import { notFound } from "next/navigation";
import { MathText } from "@/components/MathText";
import { THEORY_MODULES, TheoryModule } from "@/lib/theoryModules";

/* ──────────────────────────────────────────────────────────────
   HELPER COMPONENT: Theory Paragraph Card
   Renders paragraphs with smart callouts for definitions,
   theorems, examples, formulas, lists, and warnings.
   ────────────────────────────────────────────────────────────── */
function TheoryParagraph({ text }: { text: string }) {
  const trimmed = text.trim();

  // Block formula: starts and ends with $$
  if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
    return (
      <div className="my-4 p-4 rounded-xl bg-[#2E3B33]/80 border border-[#7A8F73]/40 shadow-inner flex justify-center items-center overflow-x-auto">
        <MathText content={trimmed} />
      </div>
    );
  }

  // Example Callout: starts with "Ejemplo" or "Ejemplos"
  if (/^Ejemplo/i.test(trimmed)) {
    return (
      <div className="my-3 p-4 rounded-xl bg-[#7A8F73]/15 border-l-4 border-[#7A8F73] border-t border-r border-b border-[#7A8F73]/30 shadow-sm space-y-1.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#7A8F73]/30 text-[#D9CBB6] border border-[#7A8F73]/50">
            💡 EJEMPLO RESUELTO
          </span>
        </div>
        <div className="text-sm leading-relaxed text-[#D9CBB6]/95">
          <MathText content={trimmed} />
        </div>
      </div>
    );
  }

  // Theorem Callout: starts with "Teorema"
  if (/^Teorema/i.test(trimmed)) {
    return (
      <div className="my-3 p-4 rounded-xl bg-[#BFAE8F]/15 border-l-4 border-[#BFAE8F] border-t border-r border-b border-[#BFAE8F]/30 shadow-sm space-y-1.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#BFAE8F]/30 text-[#D9CBB6] border border-[#BFAE8F]/50">
            📜 TEOREMA / PROPIEDAD
          </span>
        </div>
        <div className="text-sm font-medium leading-relaxed text-[#D9CBB6]">
          <MathText content={trimmed} />
        </div>
      </div>
    );
  }

  // Definition Callout: starts with "Definición"
  if (/^Definición/i.test(trimmed)) {
    return (
      <div className="my-3 p-4 rounded-xl bg-[#4F6B57]/30 border-l-4 border-[#4F6B57] border-t border-r border-b border-[#4F6B57]/40 shadow-sm space-y-1.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#4F6B57]/50 text-[#D9CBB6] border border-[#7A8F73]/40">
            📖 DEFINICIÓN FORMAL
          </span>
        </div>
        <div className="text-sm leading-relaxed text-[#D9CBB6]">
          <MathText content={trimmed} />
        </div>
      </div>
    );
  }

  // Warning / Important note
  if (/^(Nota|NOTA|Cuidado|Precaución|Importante)/i.test(trimmed) || trimmed.includes("≠")) {
    if (trimmed.startsWith("• (a + b)² ≠") || trimmed.startsWith("• \\sqrt{a") || trimmed.startsWith("• \\frac{1}{a} +") || trimmed.startsWith("Es muy importante")) {
      return (
        <div className="my-2 p-3 rounded-lg bg-amber-950/25 border-l-4 border-amber-500/70 border-t border-r border-b border-amber-500/20 text-amber-200/90 text-sm">
          <MathText content={trimmed} />
        </div>
      );
    }
  }

  // List items with bullet or letters
  if (trimmed.startsWith("•") || trimmed.startsWith("-") || /^[a-z]\)/i.test(trimmed) || /^\d+\./.test(trimmed)) {
    return (
      <div className="flex items-start gap-2.5 my-1.5 pl-2">
        <span className="text-[#7A8F73] font-bold select-none text-base leading-snug">•</span>
        <div className="text-sm leading-relaxed text-[#D9CBB6]/90 flex-1">
          <MathText content={trimmed.replace(/^[•\-]\s*/, "")} />
        </div>
      </div>
    );
  }

  // Default standard paragraph
  return (
    <p className="text-sm leading-relaxed text-[#D9CBB6]/90">
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

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#2E3B33] text-[#D9CBB6] beige-grid-bg">
      {/* Top navigation */}
      <div className="border-b border-[#D9CBB6]/20 bg-[#2E3B33]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/teoria"
              className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center text-[#D9CBB6] hover:scale-105 transition-transform"
              title="Volver al Catálogo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <span className="font-bold text-sm text-[#D9CBB6] block">Módulo #{mod.num}</span>
              <span className="text-xs text-[#BFAE8F]">{mod.tag} · {mod.pdfPages}</span>
            </div>
          </div>
          {/* Prev / Next navigation */}
          <div className="flex items-center gap-2">
            {moduleId > 1 && THEORY_MODULES[moduleId - 1] && (
              <Link
                href={`/teoria/${moduleId - 1}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50 transition-all flex items-center gap-1"
              >
                ← Anterior
              </Link>
            )}
            {THEORY_MODULES[moduleId + 1] && (
              <Link
                href={`/teoria/${moduleId + 1}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#7A8F73]/30 text-[#D9CBB6] border border-[#7A8F73]/50 hover:bg-[#7A8F73]/50 transition-all flex items-center gap-1 font-semibold"
              >
                Siguiente →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Title Banner */}
        <div className="beige-card rounded-2xl p-6 sm:p-8 border border-[#D9CBB6]/20 mb-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7A8F73]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7A8F73]/25 text-[#D9CBB6] border border-[#7A8F73]/40">
                Módulo #{mod.num}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#BFAE8F]/15 text-[#BFAE8F] border border-[#BFAE8F]/30">
                {mod.pdfPages}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#7A8F73]/20 text-[#D9CBB6] border border-[#7A8F73]/30">
                {mod.tag}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#BFAE8F]/20 text-[#BFAE8F] border border-[#BFAE8F]/30">
                ✨ Contenido Íntegro LaTeX
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#D9CBB6] glow-beige leading-tight">
              {mod.title}
            </h1>
            <p className="text-xs text-[#BFAE8F]">
              MATEMÁTICAS BÁSICAS — Universidad Nacional de Colombia, Sede Medellín
            </p>
          </div>
        </div>

        {/* Theory Sections */}
        <div className="space-y-6">
          {mod.sections.map((section, idx) => (
            <section key={idx} className="animate-fade-in" style={{ animationDelay: `${idx * 40}ms` }}>
              {section.level === 1 ? (
                <div className="border-b border-[#7A8F73]/40 pb-2 mb-4 mt-8 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7A8F73] shadow-sm" />
                  <h2 className="text-xl font-bold text-[#D9CBB6] glow-beige">
                    {section.heading}
                  </h2>
                </div>
              ) : section.level === 2 ? (
                <h3 className="text-base font-semibold text-[#BFAE8F] mb-3 mt-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BFAE8F]" />
                  {section.heading}
                </h3>
              ) : (
                <h4 className="text-sm font-semibold text-[#7A8F73] mb-2 mt-4">
                  {section.heading}
                </h4>
              )}

              {section.content.length > 0 && (
                <div className="beige-card rounded-xl p-5 border border-[#D9CBB6]/15 space-y-3 shadow-md">
                  {section.content.map((paragraph, pIdx) => (
                    <TheoryParagraph key={pIdx} text={paragraph} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-6 border-t border-[#D9CBB6]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/teoria" className="beige-btn-outline px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Volver al Catálogo de Módulos
          </Link>
          <div className="flex items-center gap-3">
            {moduleId > 1 && THEORY_MODULES[moduleId - 1] && (
              <Link href={`/teoria/${moduleId - 1}`} className="beige-btn-outline px-4 py-2 rounded-lg text-xs">
                ← Módulo #{moduleId - 1}
              </Link>
            )}
            {THEORY_MODULES[moduleId + 1] && (
              <Link href={`/teoria/${moduleId + 1}`} className="beige-btn px-4 py-2 rounded-lg text-xs">
                Módulo #{moduleId + 1} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
