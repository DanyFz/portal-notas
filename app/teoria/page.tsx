"use client";

import { useState } from "react";
import Link from "next/link";

interface TheoryModule {
  num: number;
  title: string;
  page: number;
  blockId: "algebra" | "ecuaciones" | "geometria" | "funciones" | "trigonometria";
  summary: string;
}

interface TheoryBlock {
  id: "algebra" | "ecuaciones" | "geometria" | "funciones" | "trigonometria";
  title: string;
  subtitle: string;
  icon: string;
}

const THEORY_BLOCKS: TheoryBlock[] = [
  {
    id: "algebra",
    title: "1. Álgebra y Fundamentos",
    subtitle: "Conjuntos, números reales, polinomios, factorización y expresiones algebraicas",
    icon: "🧮",
  },
  {
    id: "ecuaciones",
    title: "2. Ecuaciones, Sistemas y Desigualdades",
    subtitle: "Ecuaciones lineales, cuadráticas, sistemas 2x2, inecuaciones y modelado",
    icon: "⚖️",
  },
  {
    id: "geometria",
    title: "3. Geometría Plana, del Espacio y Analítica",
    subtitle: "Triángulos, recta, circunferencia, áreas, perímetros, volúmenes y Pitágoras",
    icon: "📐",
  },
  {
    id: "funciones",
    title: "4. Funciones y Análisis",
    subtitle: "Dominio, gráficas, inversas, composición, exponenciales y logaritmos",
    icon: "📈",
  },
  {
    id: "trigonometria",
    title: "5. Trigonometría y Aplicaciones",
    subtitle: "Razones trigonométricas, Ley de Senos/Cosenos, identidades y ecuaciones",
    icon: "🔄",
  },
];

const THEORY_MODULES: TheoryModule[] = [
  // Bloque 1: Álgebra y Fundamentos (1-10)
  { num: 1, title: "Teoría Intuitiva de Conjuntos", page: 1, blockId: "algebra", summary: "Noción de conjuntos, pertenencia, inclusión, operaciones entre conjuntos (unión, intersección, complemento) y diagramas de Venn." },
  { num: 2, title: "Propiedades de los Números Reales y Fraccionarios", page: 4, blockId: "algebra", summary: "Axiomas de los números reales, operaciones con fraccionarios, simplificación, suma, resta, multiplicación y división." },
  { num: 3, title: "Recta Numérica, Orden e Intervalos", page: 7, blockId: "algebra", summary: "Representación geométrica en la recta real, relación de orden (mayor/menor) e intervalos abiertos, cerrados y semiabiertos." },
  { num: 4, title: "Valor Absoluto y Distancia", page: 10, blockId: "algebra", summary: "Definición rigurosa del valor absoluto, propiedades, interpretación geométrica como distancia entre dos puntos en la recta real." },
  { num: 5, title: "Potenciación y Radicación", page: 11, blockId: "algebra", summary: "Leyes de los exponentes enteros y racionales, propiedades de los radicales, simplificación y operaciones con radicales." },
  { num: 6, title: "Expresiones Algebraicas Polinomios", page: 15, blockId: "algebra", summary: "Clasificación de polinomios, grado, operaciones fundamentales (suma, resta, producto y división sintética/larga de polinomios)." },
  { num: 7, title: "Ceros Reales de Polinomios", page: 21, blockId: "algebra", summary: "Teorema del residuo, teorema del factor, ceros racionales y factorización completa de polinomios de grado superior." },
  { num: 8, title: "Productos Notables y Factorización", page: 25, blockId: "algebra", summary: "Fórmulas de productos notables (cuadrados, cubos), métodos de factorización: factor común, agrupación, trinomios y diferencias." },
  { num: 9, title: "Factorial y Teorema del Binomio", page: 32, blockId: "algebra", summary: "Notación de factorial (!), coeficientes binomiales, triángulo de Pascal y desarrollo del binomio de Newton." },
  { num: 10, title: "Expresiones Fraccionarias, Fracciones Compuestas y Racionalización", page: 37, blockId: "algebra", summary: "Dominio de expresiones racionales, simplificación de fracciones compuestas y técnicas de racionalización de numeradores y denominadores." },

  // Bloque 2: Ecuaciones y Desigualdades (11, 13, 14, 19)
  { num: 11, title: "Ecuaciones", page: 42, blockId: "ecuaciones", summary: "Ecuaciones lineales, cuadráticas, despejes de variables, ecuaciones con valor absoluto y ecuaciones cuadráticas con fórmula general." },
  { num: 13, title: "Sistemas 2x2", page: 51, blockId: "ecuaciones", summary: "Sistemas de dos ecuaciones lineales con dos incógnitas: métodos de sustitución, igualación, reducción y regla de Cramer." },
  { num: 14, title: "Desigualdades", page: 54, blockId: "ecuaciones", summary: "Desigualdades lineales, cuadráticas, racionales, desigualdades con valor absoluto y método de intervalos/signos (método del cementerio)." },
  { num: 19, title: "Modelado Mediante Ecuaciones", page: 77, blockId: "ecuaciones", summary: "Planteamiento y resolución de problemas de la vida real aplicados a la física, economía y geometría utilizando ecuaciones." },

  // Bloque 3: Geometría y Geometría Analítica (12, 15, 16, 17, 18) - BLOQUE INDEPENDIENTE
  { num: 12, title: "Línea Recta y Circunferencia", page: 47, blockId: "geometria", summary: "Pendiente, ecuación de la recta (punto-pendiente, explícita, general), rectas paralelas/perpendiculares y ecuación de la circunferencia." },
  { num: 15, title: "Ángulos y Triángulos", page: 60, blockId: "geometria", summary: "Clasificación de ángulos, medidas en grados y radianes, propiedades de los triángulos y suma de ángulos internos." },
  { num: 16, title: "Congruencia y Semejanza de Triángulos", page: 65, blockId: "geometria", summary: "Criterios de congruencia (LLL, LAL, ALA) y semejanza de triángulos, Teorema de Thales y proporciones geométricas." },
  { num: 17, title: "Área y Perímetro de Figuras Planas y Teorema de Pitágoras", page: 70, blockId: "geometria", summary: "Cálculo de áreas y perímetros de polígonos regulares e irregulares, círculo y aplicación del Teorema de Pitágoras en triángulos rectángulos." },
  { num: 18, title: "Volumen y Área Superficial de Sólidos", page: 74, blockId: "geometria", summary: "Geometría del espacio: volumen y área lateral/superficial de prismas, cilindros, pirámides, conos y esferas." },

  // Bloque 4: Funciones (20 - 25)
  { num: 20, title: "Funciones", page: 81, blockId: "funciones", summary: "Definición formal de función, regla de correspondencia, prueba de la línea vertical, dominio y rango de una función." },
  { num: 21, title: "Funciones por Tramos, Valor Absoluto y de la forma x^n y x^(1/n)", page: 85, blockId: "funciones", summary: "Gráficas de funciones definidas a trozos, función valor absoluto, funciones potencia y funciones raíz n-ésima." },
  { num: 22, title: "Funciones Pares e Impares, Combinación de Funciones", page: 87, blockId: "funciones", summary: "Simetría respecto al eje Y y al origen, operaciones algebraicas entre funciones (suma, resta, producto, cociente) y composición (f o g)." },
  { num: 23, title: "Funciones Inyectivas e Inversa de una Función", page: 91, blockId: "funciones", summary: "Prueba de la línea horizontal, funciones uno a uno (inyectivas), definición de la función inversa f^-1 y simetría respecto a y = x." },
  { num: 24, title: "Funciones Exponenciales", page: 95, blockId: "funciones", summary: "Definición de f(x) = a^x, el número e, propiedades de los exponentes, gráficas y aplicaciones de crecimiento/decaimiento." },
  { num: 25, title: "Funciones Logarítmicas y Propiedades de los Logaritmos", page: 99, blockId: "funciones", summary: "Logaritmo como inversa de la exponencial, logaritmo natural ln(x), propiedades de expansión, compresión y cambio de base." },

  // Bloque 5: Trigonometría (26 - 30)
  { num: 26, title: "Funciones Trigonométricas de Ángulos", page: 103, blockId: "trigonometria", summary: "Definición de las 6 razones trigonométricas en triángulos rectángulos (seno, coseno, tangente, cotangente, secante, cosecante) y ángulos notables." },
  { num: 27, title: "Aplicaciones de Trigonometría y Ley de Senos y Cosenos", page: 108, blockId: "trigonometria", summary: "Resolución de triángulos oblicuángulos mediante la Ley de Senos y la Ley de Cosenos, cálculo de distancias inaccesibles y vectores." },
  { num: 28, title: "Funciones Trigonométricas de Números Reales", page: 113, blockId: "trigonometria", summary: "Círculo unitario, definición de funciones circulares, periodo, amplitud, desfase y gráficas de las funciones trigonométricas en R." },
  { num: 29, title: "Identidades Trigonométricas", page: 117, blockId: "trigonometria", summary: "Identidades fundamentales (pitagóricas, recíprocas, cociente), identidades de suma/resta de ángulos y del ángulo doble." },
  { num: 30, title: "Ecuaciones Trigonométricas", page: 122, blockId: "trigonometria", summary: "Resolución de ecuaciones que involucran funciones trigonométricas, cálculo de soluciones generales y restringidas en un intervalo." },
];

export default function TheoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlock, setSelectedBlock] = useState<string>("all");

  const filteredBlocks = THEORY_BLOCKS.filter((block) => {
    if (selectedBlock !== "all" && block.id !== selectedBlock) return false;
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase().trim();
    const blockModules = THEORY_MODULES.filter((m) => m.blockId === block.id);
    return (
      block.title.toLowerCase().includes(term) ||
      block.subtitle.toLowerCase().includes(term) ||
      blockModules.some(
        (m) =>
          m.title.toLowerCase().includes(term) ||
          m.num.toString() === term ||
          m.summary.toLowerCase().includes(term)
      )
    );
  });

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#2E3B33] text-[#D9CBB6] beige-grid-bg">
      {/* Navigation Top Bar */}
      <div className="border-b border-[#D9CBB6]/20 bg-[#2E3B33]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center text-[#D9CBB6] hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </Link>
            <div>
              <span className="font-bold text-sm text-[#D9CBB6] glow-beige block">Portal Académico</span>
              <span className="text-xs text-[#BFAE8F]">Módulo de Teoría por Secciones</span>
            </div>
          </div>
          <Link href="/" className="text-xs text-[#BFAE8F] hover:text-[#D9CBB6] flex items-center gap-1.5 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Menú
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 flex-1 w-full">
        {/* Banner Hero */}
        <div className="beige-card rounded-2xl p-6 sm:p-8 border border-[#D9CBB6]/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#7A8F73]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#7A8F73]/20 border border-[#7A8F73]/40 text-[#D9CBB6]">
                📚 Contenido Oficial del Curso
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#BFAE8F]/15 border border-[#BFAE8F]/30 text-[#BFAE8F]">
                5 Bloques Temáticos Visibles
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#D9CBB6] glow-beige">
              Módulo de Teoría por Bloques Temáticos
            </h1>
            <p className="text-[#BFAE8F] text-sm max-w-3xl leading-relaxed">
              Todos los 30 temas de la asignatura están organizados en 5 secciones de bloques independientes. Cada tema se muestra con su número de capítulo, contenido explicativo completo e indicación de página del libro guía.
            </p>
          </div>
        </div>

        {/* Filter and Search Navigation Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Quick Block Filter Buttons */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedBlock("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "all"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              Todos los Bloques (5)
            </button>
            <button
              onClick={() => setSelectedBlock("algebra")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "algebra"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              1. Álgebra
            </button>
            <button
              onClick={() => setSelectedBlock("ecuaciones")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "ecuaciones"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              2. Ecuaciones
            </button>
            <button
              onClick={() => setSelectedBlock("geometria")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "geometria"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              3. Geometría
            </button>
            <button
              onClick={() => setSelectedBlock("funciones")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "funciones"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              4. Funciones
            </button>
            <button
              onClick={() => setSelectedBlock("trigonometria")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "trigonometria"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              5. Trigonometría
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar tema, palabra o # de módulo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="beige-input w-full h-10 rounded-lg pl-9 pr-3 text-xs"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#BFAE8F] absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Render Blocks Sections */}
        <div className="space-y-10">
          {filteredBlocks.length === 0 ? (
            <div className="beige-card rounded-xl p-8 text-center space-y-2">
              <p className="text-base text-[#D9CBB6] font-semibold">No se encontraron temas coincidentes</p>
              <p className="text-xs text-[#BFAE8F]">Intenta buscar con otra palabra clave o selecciona "Todos los Bloques".</p>
            </div>
          ) : (
            filteredBlocks.map((block) => {
              const modulesInBlock = THEORY_MODULES.filter((m) => {
                if (m.blockId !== block.id) return false;
                if (!searchTerm.trim()) return true;
                const term = searchTerm.toLowerCase().trim();
                return (
                  m.title.toLowerCase().includes(term) ||
                  m.num.toString() === term ||
                  m.summary.toLowerCase().includes(term)
                );
              });

              if (modulesInBlock.length === 0) return null;

              return (
                <section key={block.id} className="space-y-4 animate-fade-in">
                  {/* Block Section Header Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-[#4F6B57]/30 border border-[#7A8F73]/40 shadow-md">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{block.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold text-[#D9CBB6]">{block.title}</h2>
                        <p className="text-xs text-[#BFAE8F] mt-0.5">{block.subtitle}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#7A8F73]/30 text-[#D9CBB6] border border-[#7A8F73]/50 self-start sm:self-center">
                      {modulesInBlock.length} temas en esta sección
                    </span>
                  </div>

                  {/* Modules Cards Grid - ALL ALWAYS VISIBLE */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modulesInBlock.map((mod) => (
                      <div
                        key={mod.num}
                        className="beige-card rounded-2xl p-5 border border-[#D9CBB6]/15 hover:border-[#7A8F73]/60 transition-all flex flex-col justify-between shadow-md group"
                      >
                        <div className="space-y-3">
                          {/* Module Header Badges */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#7A8F73]/25 text-[#D9CBB6] border border-[#7A8F73]/40">
                              Módulo #{mod.num}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full font-semibold bg-[#BFAE8F]/15 text-[#BFAE8F] border border-[#BFAE8F]/30 text-[11px]">
                              Pág. {mod.page}
                            </span>
                          </div>

                          {/* Module Title */}
                          <h3 className="text-base font-bold text-[#D9CBB6] group-hover:text-[#BFAE8F] transition-colors leading-snug">
                            {mod.title}
                          </h3>

                          {/* Module Summary - FULLY VISIBLE ALWAYS */}
                          <p className="text-xs text-[#BFAE8F]/95 leading-relaxed pt-1 border-t border-[#D9CBB6]/10">
                            {mod.summary}
                          </p>
                        </div>

                        {/* Footer Indicator */}
                        <div className="mt-4 pt-3 border-t border-[#D9CBB6]/10 flex items-center justify-between text-xs font-semibold text-[#7A8F73]">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7A8F73]" />
                            Tema activo
                          </span>
                          <span className="text-[11px] text-[#BFAE8F] font-normal">Página {mod.page}</span>
                        </div>
                      </div>
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
