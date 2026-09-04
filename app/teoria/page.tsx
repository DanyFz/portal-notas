"use client";

import { useState } from "react";
import Link from "next/link";

interface TheoryCatalogItem {
  num: number;
  title: string;
  page: number;
  pdfPages: string;
  blockId: "algebra" | "ecuaciones_geometria" | "funciones" | "trigonometria";
  tag: "Álgebra" | "Geometría" | "Funciones" | "Trigonometría";
  summary: string;
}

interface TheoryBlock {
  id: "algebra" | "ecuaciones_geometria" | "funciones" | "trigonometria";
  title: string;
  subtitle: string;
  range: string;
  count: number;
}

const THEORY_BLOCKS: TheoryBlock[] = [
  {
    id: "algebra",
    title: "Bloque 1 · Álgebra y Fundamentos",
    subtitle: "Conjuntos, números reales, polinomios, factorización, binomio y expresiones fraccionarias",
    range: "Módulos 1 al 10",
    count: 10,
  },
  {
    id: "ecuaciones_geometria",
    title: "Bloque 2 · Ecuaciones, Geometría y Modelado",
    subtitle: "Ecuaciones, recta, circunferencia, sistemas 2x2, inecuaciones, geometría plana, sólidos y modelado",
    range: "Módulos 11 al 19",
    count: 9,
  },
  {
    id: "funciones",
    title: "Bloque 3 · Funciones y sus Propiedades",
    subtitle: "Dominio, tramos, paridad, composición, inversas, exponenciales y logaritmos",
    range: "Módulos 20 al 25",
    count: 6,
  },
  {
    id: "trigonometria",
    title: "Bloque 4 · Trigonometría y Aplicaciones",
    subtitle: "Razones trigonométricas, ley de senos/cosenos, identidades y ecuaciones trigonométricas",
    range: "Módulos 26 al 30",
    count: 5,
  },
];

const THEORY_CATALOG: TheoryCatalogItem[] = [
  // Bloque 1 (1 - 10)
  { num: 1, title: "Teoría Intuitiva de Conjuntos", page: 1, pdfPages: "Págs. 1 – 3", blockId: "algebra", tag: "Álgebra", summary: "Noción de conjuntos, pertenencia, inclusión, operaciones entre conjuntos (unión, intersección, complemento, diferencia) y sistemas numéricos fundamentales." },
  { num: 2, title: "Propiedades de los Números Reales", page: 4, pdfPages: "Págs. 4 – 6", blockId: "algebra", tag: "Álgebra", summary: "Operaciones en R, axiomas de cuerpo, leyes de signos, divisibilidad, MCD, MCM, números primos y operaciones con fracciones." },
  { num: 3, title: "Recta Numérica, Orden e Intervalos", page: 7, pdfPages: "Págs. 7 – 9", blockId: "algebra", tag: "Álgebra", summary: "Representación geométrica en la recta real, definición y propiedades de orden, clasificación completa de intervalos y operaciones algebraicas." },
  { num: 4, title: "Valor Absoluto y Distancia", page: 10, pdfPages: "Pág. 10", blockId: "algebra", tag: "Álgebra", summary: "Definición rigurosa del valor absoluto, propiedades algebraicas fundamentales y cálculo de distancia entre puntos en la recta real." },
  { num: 5, title: "Potenciación y Radicación", page: 11, pdfPages: "Págs. 11 – 14", blockId: "algebra", tag: "Álgebra", summary: "Leyes de los exponentes enteros, notación científica, raíz n-ésima principal, leyes de los radicales y exponentes racionales." },
  { num: 6, title: "Expresiones Algebraicas – Polinomios", page: 15, pdfPages: "Págs. 15 – 20", blockId: "algebra", tag: "Álgebra", summary: "Definición y grado de polinomios, suma, producto, productos notables básicos, algoritmo de la división y división sintética." },
  { num: 7, title: "Ceros Reales de Polinomios", page: 21, pdfPages: "Págs. 21 – 24", blockId: "algebra", tag: "Álgebra", summary: "Teorema del residuo, teorema del factor, multiplicidad de ceros, teorema de las raíces racionales y factorización completa." },
  { num: 8, title: "Productos Notables y Factorización", page: 25, pdfPages: "Págs. 25 – 31", blockId: "algebra", tag: "Álgebra", summary: "Identidades de productos notables, interpretación geométrica 2D/3D, factor común, trinomios y diferencias de potencias n-ésimas." },
  { num: 9, title: "Factorial y Teorema del Binomio", page: 32, pdfPages: "Págs. 32 – 36", blockId: "algebra", tag: "Álgebra", summary: "Factorial, permutaciones, combinaciones, coeficientes binomiales, teorema del binomio de Newton y triángulo de Pascal." },
  { num: 10, title: "Expresiones Fraccionarias, Fracciones Compuestas y Racionalización", page: 37, pdfPages: "Págs. 37 – 41", blockId: "algebra", tag: "Álgebra", summary: "Expresiones fraccionarias, operaciones con fracciones algebraicas, simplificación de fracciones compuestas y métodos de racionalización." },

  // Bloque 2 (11 - 19)
  { num: 11, title: "Ecuaciones", page: 42, pdfPages: "Págs. 42 – 47", blockId: "ecuaciones_geometria", tag: "Álgebra", summary: "Ecuaciones lineales, cuadráticas, despejes de variables, ecuaciones con valor absoluto y fórmula cuadrática general." },
  { num: 12, title: "Línea Recta y Circunferencia", page: 47, pdfPages: "Págs. 47 – 51", blockId: "ecuaciones_geometria", tag: "Geometría", summary: "Pendiente, ecuaciones de la recta (punto-pendiente, general), paralelismo/perpendicularidad y ecuación canónica de la circunferencia." },
  { num: 13, title: "Sistemas 2x2", page: 51, pdfPages: "Págs. 51 – 54", blockId: "ecuaciones_geometria", tag: "Álgebra", summary: "Sistemas de ecuaciones lineales con dos incógnitas: métodos de sustitución, igualación, eliminación y regla de Cramer." },
  { num: 14, title: "Desigualdades", page: 54, pdfPages: "Págs. 54 – 60", blockId: "ecuaciones_geometria", tag: "Álgebra", summary: "Desigualdades lineales, cuadráticas, racionales, desigualdades con valor absoluto y método de signos en intervalos." },
  { num: 15, title: "Ángulos y Triángulos", page: 60, pdfPages: "Págs. 60 – 65", blockId: "ecuaciones_geometria", tag: "Geometría", summary: "Clasificación de ángulos, medidas en grados y radianes, propiedades de los triángulos y suma de ángulos internos." },
  { num: 16, title: "Congruencia y Semejanza de Triángulos", page: 65, pdfPages: "Págs. 65 – 70", blockId: "ecuaciones_geometria", tag: "Geometría", summary: "Criterios de congruencia y semejanza de triángulos, Teorema de Tales y razones de proporcionalidad geométrica." },
  { num: 17, title: "Área y Perímetro de Figuras Planas y Teorema de Pitágoras", page: 70, pdfPages: "Págs. 70 – 74", blockId: "ecuaciones_geometria", tag: "Geometría", summary: "Cálculo de áreas y perímetros de polígonos regulares, círculo y Teorema de Pitágoras en triángulos rectángulos." },
  { num: 18, title: "Volumen y Área Superficial de Sólidos", page: 74, pdfPages: "Págs. 74 – 77", blockId: "ecuaciones_geometria", tag: "Geometría", summary: "Geometría espacial: volumen y área lateral/superficial de prismas, cilindros, pirámides, conos y esferas." },
  { num: 19, title: "Modelado Mediante Ecuaciones", page: 77, pdfPages: "Págs. 77 – 81", blockId: "ecuaciones_geometria", tag: "Álgebra", summary: "Planteamiento y resolución rigurosa de problemas aplicados a la física, economía y geometría mediante ecuaciones." },

  // Bloque 3 (20 - 25)
  { num: 20, title: "Funciones", page: 81, pdfPages: "Págs. 81 – 85", blockId: "funciones", tag: "Funciones", summary: "Definición formal de función, regla de correspondencia, prueba de la recta vertical, dominio y rango." },
  { num: 21, title: "Funciones por Tramos, Valor Absoluto y Potencias", page: 85, pdfPages: "Págs. 86 – 87", blockId: "funciones", tag: "Funciones", summary: "Gráficas de funciones definidas a trozos, función valor absoluto, funciones potencia y raíces n-ésimas." },
  { num: 22, title: "Funciones Pares e Impares, Combinación de Funciones", page: 87, pdfPages: "Págs. 88 – 91", blockId: "funciones", tag: "Funciones", summary: "Simetría respecto al eje Y y al origen, álgebra de funciones y composición de funciones (f ∘ g)." },
  { num: 23, title: "Funciones Inyectivas e Inversa de una Función", page: 91, pdfPages: "Págs. 91 – 95", blockId: "funciones", tag: "Funciones", summary: "Prueba de la recta horizontal, funciones inyectivas (uno a uno), función inversa y simetría respecto a y = x." },
  { num: 24, title: "Funciones Exponenciales", page: 95, pdfPages: "Págs. 96 – 99", blockId: "funciones", tag: "Funciones", summary: "Definición de f(x) = a^x, base e, propiedades de los exponentes, curvas de crecimiento y decaimiento." },
  { num: 25, title: "Funciones Logarítmicas y Propiedades de los Logaritmos", page: 99, pdfPages: "Págs. 100 – 103", blockId: "funciones", tag: "Funciones", summary: "Logaritmo como función inversa, logaritmo natural ln(x), leyes de los logaritmos y fórmula de cambio de base." },

  // Bloque 4 (26 - 30)
  { num: 26, title: "Funciones Trigonométricas de Ángulos", page: 103, pdfPages: "Págs. 104 – 108", blockId: "trigonometria", tag: "Trigonometría", summary: "Definición de las 6 razones trigonométricas en triángulos rectángulos y valores para ángulos notables." },
  { num: 27, title: "Aplicaciones de Trigonometría y Ley de Senos y Cosenos", page: 108, pdfPages: "Págs. 109 – 113", blockId: "trigonometria", tag: "Trigonometría", summary: "Resolución de triángulos oblicuángulos mediante Ley de Senos y Cosenos, cálculo de distancias y aplicaciones." },
  { num: 28, title: "Funciones Trigonométricas de Números Reales", page: 113, pdfPages: "Págs. 114 – 117", blockId: "trigonometria", tag: "Trigonometría", summary: "Círculo unitario, funciones circulares, periodo, amplitud, desfase y gráficas trigonométricas en R." },
  { num: 29, title: "Identidades Trigonométricas", page: 117, pdfPages: "Págs. 118 – 122", blockId: "trigonometria", tag: "Trigonometría", summary: "Identidades fundamentales pitagóricas, recíprocas, identidades de suma/diferencia y del ángulo doble." },
  { num: 30, title: "Ecuaciones Trigonométricas", page: 122, pdfPages: "Págs. 123 – 126", blockId: "trigonometria", tag: "Trigonometría", summary: "Resolución de ecuaciones trigonométricas, cálculo de soluciones generales y soluciones particulares en un intervalo." },
];

export default function TheoryCatalogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlock, setSelectedBlock] = useState<string>("all");

  const filteredBlocks = THEORY_BLOCKS.filter((block) => {
    if (selectedBlock !== "all" && block.id !== selectedBlock) return false;
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase().trim();
    const blockModules = THEORY_CATALOG.filter((m) => m.blockId === block.id);
    return (
      block.title.toLowerCase().includes(term) ||
      block.subtitle.toLowerCase().includes(term) ||
      blockModules.some(
        (m) =>
          m.title.toLowerCase().includes(term) ||
          m.num.toString() === term ||
          m.tag.toLowerCase().includes(term) ||
          m.summary.toLowerCase().includes(term)
      )
    );
  });

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#151d18] text-[#EDE5D8] academic-paper-bg">
      {/* Top Academic Header */}
      <header className="border-b border-[rgba(217,203,182,0.12)] bg-[#151d18]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
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
                Matemáticas Básicas
              </span>
              <span className="text-[11px] text-[#A89F8D] hidden sm:block">
                Universidad Nacional de Colombia · Sede Medellín
              </span>
            </div>
          </div>

          <div className="text-xs text-[#A89F8D]">
            <span className="font-mono text-[#EDE5D8]">30</span> Módulos Teóricos
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 py-5 sm:py-10 space-y-5 sm:space-y-8 flex-1 w-full">
        {/* Editorial Hero Banner */}
        <div className="academic-card-elevated rounded-2xl p-4 sm:p-10 border border-[rgba(217,203,182,0.18)] space-y-3 sm:space-y-4 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-[#7A8F73]/20 text-[#FAF6EE] border border-[#7A8F73]/30">
              Programa Oficial
            </span>
            <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#223028] text-[#C8B99D] border border-[rgba(217,203,182,0.15)]">
              Escuela de Matemáticas
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF6EE] tracking-tight leading-tight">
            Catálogo de Módulos y Notas de Clase
          </h1>

          <p className="text-[#EDE5D8]/90 text-sm sm:text-base max-w-3xl leading-relaxed">
            Estructura curricular completa del curso. Cada módulo contiene el desarrollo riguroso de definiciones, propiedades, teoremas fundamentales y ejemplos detallados basados en los textos guía de la universidad.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center justify-between pb-2 border-b border-[rgba(217,203,182,0.12)]">
          {/* Block Filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            <button
              onClick={() => setSelectedBlock("all")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedBlock === "all"
                  ? "academic-btn-primary"
                  : "academic-btn-secondary"
              }`}
            >
              Todos (30)
            </button>
            <button
              onClick={() => setSelectedBlock("algebra")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedBlock === "algebra"
                  ? "academic-btn-primary"
                  : "academic-btn-secondary"
              }`}
            >
              1. Álgebra (1–10)
            </button>
            <button
              onClick={() => setSelectedBlock("ecuaciones_geometria")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedBlock === "ecuaciones_geometria"
                  ? "academic-btn-primary"
                  : "academic-btn-secondary"
              }`}
            >
              2. Ecuaciones & Geometría (11–19)
            </button>
            <button
              onClick={() => setSelectedBlock("funciones")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedBlock === "funciones"
                  ? "academic-btn-primary"
                  : "academic-btn-secondary"
              }`}
            >
              3. Funciones (20–25)
            </button>
            <button
              onClick={() => setSelectedBlock("trigonometria")}
              className={`px-3 sm:px-3.5 py-2 rounded-lg text-[11px] sm:text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedBlock === "trigonometria"
                  ? "academic-btn-primary"
                  : "academic-btn-secondary"
              }`}
            >
              4. Trigonometría (26–30)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Buscar tema, concepto o módulo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="academic-input w-full h-10 rounded-lg pl-9 pr-3 text-xs"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#A89F8D] absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Catalog Blocks */}
        <div className="space-y-8 sm:space-y-12">
          {filteredBlocks.length === 0 ? (
            <div className="academic-card rounded-xl p-12 text-center space-y-2">
              <p className="text-base text-[#FAF6EE] font-serif font-bold">No se encontraron temas coincidentes</p>
              <p className="text-xs text-[#A89F8D]">Prueba con otra palabra clave o selecciona "Todos".</p>
            </div>
          ) : (
            filteredBlocks.map((block) => {
              const modulesInBlock = THEORY_CATALOG.filter((m) => {
                if (m.blockId !== block.id) return false;
                if (!searchTerm.trim()) return true;
                const term = searchTerm.toLowerCase().trim();
                return (
                  m.title.toLowerCase().includes(term) ||
                  m.num.toString() === term ||
                  m.tag.toLowerCase().includes(term) ||
                  m.summary.toLowerCase().includes(term)
                );
              });

              if (modulesInBlock.length === 0) return null;

              return (
                <section key={block.id} className="space-y-5">
                  {/* Block Header */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2 border-b border-[rgba(217,203,182,0.15)]">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF6EE]">
                        {block.title}
                      </h2>
                      <p className="text-xs text-[#A89F8D] mt-0.5">
                        {block.subtitle}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#C8B99D]">
                      {block.range}
                    </span>
                  </div>

                  {/* Clean Grid of Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {modulesInBlock.map((mod) => (
                      <Link
                        key={mod.num}
                        href={`/teoria/${mod.num}`}
                        className="academic-card rounded-xl p-5 block group focus:outline-none flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          {/* Module Card Header */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-xs font-bold text-[#7A8F73] px-2 py-0.5 rounded bg-[#223028] border border-[rgba(217,203,182,0.1)]">
                              MÓDULO {mod.num < 10 ? `0${mod.num}` : mod.num}
                            </span>
                            <span className="text-[11px] text-[#A89F8D]">
                              {mod.pdfPages}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-serif font-bold text-[#FAF6EE] group-hover:text-[#C8B99D] transition-colors leading-snug">
                            {mod.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-xs text-[#A89F8D] leading-relaxed line-clamp-3">
                            {mod.summary}
                          </p>
                        </div>

                        {/* Card Footer Link */}
                        <div className="mt-4 pt-3 border-t border-[rgba(217,203,182,0.08)] flex items-center justify-between text-xs font-medium text-[#7A8F73] group-hover:text-[#EDE5D8] transition-colors">
                          <span>Estudiar módulo</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}

