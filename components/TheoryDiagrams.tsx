import React from "react";

interface TheoryDiagramProps {
  id: string;
  caption?: string;
}

export function TheoryDiagram({ id, caption }: TheoryDiagramProps) {
  let diagramContent: React.ReactNode = null;

  switch (id) {
    // ══════════════════════════════════════════════════════════════
    // MÓDULO 1: TEORÍA DE CONJUNTOS
    // ══════════════════════════════════════════════════════════════
    case "conjuntos_venn_operaciones":
      diagramContent = (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          <div className="p-2.5 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-[11px] font-bold text-[#7A8F73]">Unión (A ∪ B)</div>
            <svg viewBox="0 0 100 70" className="w-full h-14 mx-auto">
              <rect x="2" y="2" width="96" height="66" rx="4" fill="#151d18" stroke="#556b5d" strokeWidth="1" />
              <text x="8" y="14" fill="#A89F8D" fontSize="8">U</text>
              <circle cx="40" cy="38" r="22" fill="rgba(122,143,115,0.45)" stroke="#7A8F73" strokeWidth="1.2" />
              <circle cx="60" cy="38" r="22" fill="rgba(122,143,115,0.45)" stroke="#7A8F73" strokeWidth="1.2" />
              <text x="32" y="40" fill="#FAF6EE" fontSize="9" fontWeight="bold">A</text>
              <text x="65" y="40" fill="#FAF6EE" fontSize="9" fontWeight="bold">B</text>
            </svg>
            <div className="text-[9.5px] text-[#EDE5D8]">Todo A y todo B</div>
          </div>

          <div className="p-2.5 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-[11px] font-bold text-[#7A8F73]">Intersección (A ∩ B)</div>
            <svg viewBox="0 0 100 70" className="w-full h-14 mx-auto">
              <rect x="2" y="2" width="96" height="66" rx="4" fill="#151d18" stroke="#556b5d" strokeWidth="1" />
              <text x="8" y="14" fill="#A89F8D" fontSize="8">U</text>
              <circle cx="40" cy="38" r="22" fill="none" stroke="#7A8F73" strokeWidth="1.2" />
              <circle cx="60" cy="38" r="22" fill="none" stroke="#7A8F73" strokeWidth="1.2" />
              {/* Intersection clip path / lens */}
              <path d="M 50,22 A 22 22 0 0 1 50,54 A 22 22 0 0 1 50,22" fill="#dfa745" opacity="0.8" />
              <text x="30" y="40" fill="#A89F8D" fontSize="8">A</text>
              <text x="68" y="40" fill="#A89F8D" fontSize="8">B</text>
            </svg>
            <div className="text-[9.5px] text-[#dfa745]">Elementos comunes</div>
          </div>

          <div className="p-2.5 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-[11px] font-bold text-[#7A8F73]">Complemento (A')</div>
            <svg viewBox="0 0 100 70" className="w-full h-14 mx-auto">
              <rect x="2" y="2" width="96" height="66" rx="4" fill="rgba(122,143,115,0.3)" stroke="#7A8F73" strokeWidth="1.2" />
              <circle cx="50" cy="38" r="22" fill="#151d18" stroke="#dfa745" strokeWidth="1.5" />
              <text x="8" y="14" fill="#FAF6EE" fontSize="8">U</text>
              <text x="50" y="42" fill="#EDE5D8" fontSize="10" fontWeight="bold" textAnchor="middle">A</text>
            </svg>
            <div className="text-[9.5px] text-[#EDE5D8]">Fuera de A en U</div>
          </div>

          <div className="p-2.5 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-[11px] font-bold text-[#7A8F73]">Diferencia (A − B)</div>
            <svg viewBox="0 0 100 70" className="w-full h-14 mx-auto">
              <rect x="2" y="2" width="96" height="66" rx="4" fill="#151d18" stroke="#556b5d" strokeWidth="1" />
              <circle cx="40" cy="38" r="22" fill="rgba(223,167,69,0.5)" stroke="#7A8F73" strokeWidth="1.2" />
              <circle cx="60" cy="38" r="22" fill="#151d18" stroke="#7A8F73" strokeWidth="1.2" />
              <text x="30" y="40" fill="#FAF6EE" fontSize="9" fontWeight="bold">A</text>
              <text x="68" y="40" fill="#A89F8D" fontSize="8">B</text>
            </svg>
            <div className="text-[9.5px] text-[#EDE5D8]">Solo en A, no en B</div>
          </div>

          <div className="p-2.5 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-[11px] font-bold text-[#7A8F73]">Dif. Simétrica (A Δ B)</div>
            <svg viewBox="0 0 100 70" className="w-full h-14 mx-auto">
              <rect x="2" y="2" width="96" height="66" rx="4" fill="#151d18" stroke="#556b5d" strokeWidth="1" />
              <circle cx="40" cy="38" r="22" fill="rgba(122,143,115,0.4)" stroke="#7A8F73" strokeWidth="1.2" />
              <circle cx="60" cy="38" r="22" fill="rgba(122,143,115,0.4)" stroke="#7A8F73" strokeWidth="1.2" />
              <path d="M 50,22 A 22 22 0 0 1 50,54 A 22 22 0 0 1 50,22" fill="#151d18" stroke="none" />
              <text x="30" y="40" fill="#FAF6EE" fontSize="8">A</text>
              <text x="68" y="40" fill="#FAF6EE" fontSize="8">B</text>
            </svg>
            <div className="text-[9.5px] text-[#EDE5D8]">(A ∪ B) − (A ∩ B)</div>
          </div>
        </div>
      );
      break;

    case "sistemas_numericos_inclusion":
      diagramContent = (
        <svg viewBox="0 0 460 220" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Real Numbers Box */}
          <rect x="15" y="15" width="430" height="190" rx="16" fill="rgba(122,143,115,0.08)" stroke="#7A8F73" strokeWidth="2" />
          <text x="35" y="40" fill="#FAF6EE" fontSize="14" fontWeight="bold">Reales (ℝ)</text>

          {/* Rationals Box */}
          <rect x="35" y="55" width="250" height="135" rx="12" fill="rgba(217,203,182,0.06)" stroke="#C8B99D" strokeWidth="1.5" />
          <text x="50" y="75" fill="#EDE5D8" fontSize="12" fontWeight="bold">Racionales (ℚ)</text>
          <text x="180" y="75" fill="#A89F8D" fontSize="10">½, −¾, 0.333...</text>

          {/* Integers Box */}
          <rect x="50" y="88" width="220" height="92" rx="10" fill="rgba(223,167,69,0.08)" stroke="#dfa745" strokeWidth="1.5" />
          <text x="65" y="108" fill="#dfa745" fontSize="12" fontWeight="bold">Enteros (ℤ)</text>
          <text x="170" y="108" fill="#A89F8D" fontSize="10">... −3, −2, −1, 0</text>

          {/* Naturals Box */}
          <rect x="65" y="120" width="190" height="50" rx="8" fill="rgba(122,143,115,0.25)" stroke="#7A8F73" strokeWidth="1.5" />
          <text x="80" y="142" fill="#FAF6EE" fontSize="12" fontWeight="bold">Naturales (ℕ)</text>
          <text x="80" y="158" fill="#EDE5D8" fontSize="10">1, 2, 3, 4, 5, ...</text>

          {/* Irrationals Box */}
          <rect x="300" y="55" width="130" height="135" rx="12" fill="rgba(217,203,182,0.04)" stroke="#A89F8D" strokeWidth="1.5" />
          <text x="315" y="75" fill="#EDE5D8" fontSize="12" fontWeight="bold">Irracionales (𝕀)</text>
          <text x="315" y="105" fill="#C8B99D" fontSize="11">√2, √3, √5</text>
          <text x="315" y="130" fill="#C8B99D" fontSize="11">π, e</text>
          <text x="315" y="160" fill="#A89F8D" fontSize="9.5">No periódicos</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 3: RECTA NUMÉRICA E INTERVALOS
    // ══════════════════════════════════════════════════════════════
    case "recta_clasificacion_intervalos":
      diagramContent = (
        <svg viewBox="0 0 460 220" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Abierto (a, b) */}
          <text x="25" y="30" fill="#FAF6EE" fontSize="11" fontWeight="bold">Abierto (a, b):</text>
          <line x1="150" y1="26" x2="420" y2="26" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="200" y1="26" x2="360" y2="26" stroke="#7A8F73" strokeWidth="3.5" />
          <circle cx="200" cy="26" r="4.5" fill="#151d18" stroke="#7A8F73" strokeWidth="2" />
          <circle cx="360" cy="26" r="4.5" fill="#151d18" stroke="#7A8F73" strokeWidth="2" />
          <text x="200" y="44" fill="#A89F8D" fontSize="9" textAnchor="middle">a</text>
          <text x="360" y="44" fill="#A89F8D" fontSize="9" textAnchor="middle">b</text>

          {/* Cerrado [a, b] */}
          <text x="25" y="80" fill="#FAF6EE" fontSize="11" fontWeight="bold">Cerrado [a, b]:</text>
          <line x1="150" y1="76" x2="420" y2="76" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="200" y1="76" x2="360" y2="76" stroke="#dfa745" strokeWidth="3.5" />
          <circle cx="200" cy="76" r="5" fill="#dfa745" />
          <circle cx="360" cy="76" r="5" fill="#dfa745" />
          <text x="200" y="94" fill="#A89F8D" fontSize="9" textAnchor="middle">a</text>
          <text x="360" y="94" fill="#A89F8D" fontSize="9" textAnchor="middle">b</text>

          {/* Semiabierto [a, b) */}
          <text x="25" y="130" fill="#FAF6EE" fontSize="11" fontWeight="bold">Semiabierto [a, b):</text>
          <line x1="150" y1="126" x2="420" y2="126" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="200" y1="126" x2="360" y2="126" stroke="#7A8F73" strokeWidth="3.5" />
          <circle cx="200" cy="126" r="5" fill="#7A8F73" />
          <circle cx="360" cy="126" r="4.5" fill="#151d18" stroke="#7A8F73" strokeWidth="2" />
          <text x="200" y="144" fill="#A89F8D" fontSize="9" textAnchor="middle">a</text>
          <text x="360" y="144" fill="#A89F8D" fontSize="9" textAnchor="middle">b</text>

          {/* Infinito [a, ∞) */}
          <text x="25" y="180" fill="#FAF6EE" fontSize="11" fontWeight="bold">Infinito [a, ∞):</text>
          <line x1="150" y1="176" x2="420" y2="176" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="200" y1="176" x2="420" y2="176" stroke="#dfa745" strokeWidth="3.5" />
          <circle cx="200" cy="176" r="5" fill="#dfa745" />
          <text x="200" y="194" fill="#A89F8D" fontSize="9" textAnchor="middle">a</text>
          <text x="410" y="194" fill="#dfa745" fontSize="11" fontWeight="bold">+</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 8: PRODUCTOS NOTABLES (GEOMÉTRICO)
    // ══════════════════════════════════════════════════════════════
    case "productos_notables_geometrico":
      diagramContent = (
        <svg viewBox="0 0 360 250" className="w-full max-w-xs mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Main outer square (a + b) */}
          <rect x="40" y="20" width="200" height="200" fill="none" stroke="#7A8F73" strokeWidth="2" />

          {/* Subdivisions: a x a */}
          <rect x="40" y="20" width="130" height="130" fill="rgba(122,143,115,0.25)" stroke="#7A8F73" strokeWidth="1.5" />
          <text x="105" y="90" fill="#FAF6EE" fontSize="16" fontWeight="bold" textAnchor="middle">a²</text>

          {/* a x b (Top right) */}
          <rect x="170" y="20" width="70" height="130" fill="rgba(223,167,69,0.15)" stroke="#dfa745" strokeWidth="1.5" />
          <text x="205" y="90" fill="#dfa745" fontSize="13" fontWeight="bold" textAnchor="middle">ab</text>

          {/* b x a (Bottom left) */}
          <rect x="40" y="150" width="130" height="70" fill="rgba(223,167,69,0.15)" stroke="#dfa745" strokeWidth="1.5" />
          <text x="105" y="190" fill="#dfa745" fontSize="13" fontWeight="bold" textAnchor="middle">ab</text>

          {/* b x b (Bottom right) */}
          <rect x="170" y="150" width="70" height="70" fill="rgba(200,185,157,0.25)" stroke="#C8B99D" strokeWidth="1.5" />
          <text x="205" y="190" fill="#EDE5D8" fontSize="14" fontWeight="bold" textAnchor="middle">b²</text>

          {/* Dimension ticks */}
          <text x="105" y="14" fill="#EDE5D8" fontSize="11" textAnchor="middle">a</text>
          <text x="205" y="14" fill="#EDE5D8" fontSize="11" textAnchor="middle">b</text>
          <text x="28" y="90" fill="#EDE5D8" fontSize="11">a</text>
          <text x="28" y="190" fill="#EDE5D8" fontSize="11">b</text>

          <rect x="255" y="80" width="95" height="50" rx="6" fill="#223028" stroke="rgba(217,203,182,0.2)" />
          <text x="262" y="100" fill="#FAF6EE" fontSize="9.5" fontWeight="bold">(a + b)² =</text>
          <text x="262" y="118" fill="#dfa745" fontSize="9.5">a² + 2ab + b²</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 9: TRIÁNGULO DE PASCAL
    // ══════════════════════════════════════════════════════════════
    case "triangulo_pascal_visual":
      diagramContent = (
        <div className="p-4 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center font-mono space-y-1.5 select-none text-xs sm:text-sm">
          <div className="text-[11px] font-bold text-[#A89F8D] uppercase font-sans mb-2">Coeficientes del Binomio (x + y)ⁿ</div>
          <div className="text-[#EDE5D8]"><span className="text-[#7A8F73] text-[10px] mr-2">n=0</span> 1</div>
          <div className="text-[#EDE5D8]"><span className="text-[#7A8F73] text-[10px] mr-2">n=1</span> 1 &nbsp; 1</div>
          <div className="text-[#EDE5D8]"><span className="text-[#7A8F73] text-[10px] mr-2">n=2</span> 1 &nbsp; 2 &nbsp; 1</div>
          <div className="text-[#EDE5D8]"><span className="text-[#7A8F73] text-[10px] mr-2">n=3</span> 1 &nbsp; 3 &nbsp; 3 &nbsp; 1</div>
          <div className="text-[#EDE5D8]"><span className="text-[#7A8F73] text-[10px] mr-2">n=4</span> 1 &nbsp; 4 &nbsp; 6 &nbsp; 4 &nbsp; 1</div>
          <div className="text-[#dfa745] font-bold"><span className="text-[#7A8F73] text-[10px] mr-2">n=5</span> 1 &nbsp; 5 &nbsp; 10 &nbsp; 10 &nbsp; 5 &nbsp; 1</div>
          <div className="text-[#EDE5D8]"><span className="text-[#7A8F73] text-[10px] mr-2">n=6</span> 1 &nbsp; 6 &nbsp; 15 &nbsp; 20 &nbsp; 15 &nbsp; 6 &nbsp; 1</div>
        </div>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 12: LÍNEA RECTA Y CIRCUNFERENCIA
    // ══════════════════════════════════════════════════════════════
    case "plano_cartesiano_puntos":
      diagramContent = (
        <svg viewBox="0 0 500 360" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-mod12" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(217, 203, 182, 0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="500" height="360" fill="url(#grid-mod12)" rx="8" />

          {/* Axes */}
          <line x1="40" y1="180" x2="460" y2="180" stroke="#7A8F73" strokeWidth="2" />
          <line x1="250" y1="330" x2="250" y2="30" stroke="#7A8F73" strokeWidth="2" />
          <text x="470" y="184" fill="#EDE5D8" fontSize="13" fontWeight="bold" fontFamily="monospace">x</text>
          <text x="246" y="22" fill="#EDE5D8" fontSize="13" fontWeight="bold" fontFamily="monospace">y</text>
          <text x="238" y="196" fill="#A89F8D" fontSize="11" fontFamily="sans-serif">0</text>

          {/* Quadrants */}
          <text x="350" y="100" fill="#EDE5D8" opacity="0.3" fontSize="13" fontWeight="600" fontStyle="italic">CUADRANTE I (+, +)</text>
          <text x="60" y="100" fill="#EDE5D8" opacity="0.3" fontSize="13" fontWeight="600" fontStyle="italic">CUADRANTE II (−, +)</text>
          <text x="60" y="270" fill="#EDE5D8" opacity="0.3" fontSize="13" fontWeight="600" fontStyle="italic">CUADRANTE III (−, −)</text>
          <text x="350" y="270" fill="#EDE5D8" opacity="0.3" fontSize="13" fontWeight="600" fontStyle="italic">CUADRANTE IV (+, −)</text>

          {/* Tick marks */}
          {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((val) => (
            <g key={`x-${val}`}>
              <line x1={250 + val * 35} y1="176" x2={250 + val * 35} y2="184" stroke="#A89F8D" strokeWidth="1.5" />
              <text x={250 + val * 35} y="197" fill="#A89F8D" fontSize="10" textAnchor="middle">{val}</text>
            </g>
          ))}
          {[-4, -3, -2, -1, 1, 2, 3, 4].map((val) => (
            <g key={`y-${val}`}>
              <line x1="246" y1={180 - val * 35} x2="254" y2={180 - val * 35} stroke="#A89F8D" strokeWidth="1.5" />
              <text x="238" y={180 - val * 35 + 3.5} fill="#A89F8D" fontSize="10" textAnchor="end">{val}</text>
            </g>
          ))}

          {/* Points */}
          <line x1="145" y1="180" x2="145" y2="40" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.2" />
          <line x1="250" y1="40" x2="145" y2="40" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.2" />
          <circle cx="145" cy="40" r="5" fill="#dfa745" />
          <text x="135" y="32" fill="#FAF6EE" fontSize="12" fontWeight="bold">P(−3, 4)</text>

          <line x1="215" y1="180" x2="215" y2="250" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.2" />
          <line x1="250" y1="250" x2="215" y2="250" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.2" />
          <circle cx="215" cy="250" r="5" fill="#dfa745" />
          <text x="150" y="260" fill="#FAF6EE" fontSize="12" fontWeight="bold">Q(−1, −2)</text>

          <line x1="320" y1="180" x2="320" y2="25" stroke="#7A8F73" strokeDasharray="3,3" strokeWidth="1.2" />
          <line x1="250" y1="25" x2="320" y2="25" stroke="#7A8F73" strokeDasharray="3,3" strokeWidth="1.2" />
          <circle cx="320" cy="25" r="5" fill="#7A8F73" />
          <text x="330" y="25" fill="#FAF6EE" fontSize="12" fontWeight="bold">R(2, 5)</text>

          <line x1="355" y1="180" x2="355" y2="285" stroke="#7A8F73" strokeDasharray="3,3" strokeWidth="1.2" />
          <line x1="250" y1="285" x2="355" y2="285" stroke="#7A8F73" strokeDasharray="3,3" strokeWidth="1.2" />
          <circle cx="355" cy="285" r="5" fill="#7A8F73" />
          <text x="365" y="295" fill="#FAF6EE" fontSize="12" fontWeight="bold">S(3, −3)</text>
        </svg>
      );
      break;

    case "recta_pendiente_inclinacion":
      diagramContent = (
        <svg viewBox="0 0 500 300" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="250" x2="470" y2="250" stroke="#7A8F73" strokeWidth="2" />
          <line x1="80" y1="280" x2="80" y2="20" stroke="#7A8F73" strokeWidth="2" />
          <text x="475" y="254" fill="#EDE5D8" fontSize="13" fontWeight="bold">x</text>
          <text x="76" y="14" fill="#EDE5D8" fontSize="13" fontWeight="bold">y</text>

          <line x1="60" y1="240" x2="420" y2="60" stroke="#EDE5D8" strokeWidth="2.5" />
          <text x="425" y="60" fill="#EDE5D8" fontSize="14" fontWeight="bold" fontStyle="italic">L</text>

          <line x1="160" y1="190" x2="360" y2="190" stroke="#dfa745" strokeDasharray="4,4" strokeWidth="1.5" />
          <line x1="360" y1="190" x2="360" y2="90" stroke="#dfa745" strokeDasharray="4,4" strokeWidth="1.5" />

          <circle cx="160" cy="190" r="5" fill="#7A8F73" />
          <text x="135" y="180" fill="#FAF6EE" fontSize="12" fontWeight="bold">P(x₁, y₁)</text>

          <circle cx="360" cy="90" r="5" fill="#7A8F73" />
          <text x="365" y="85" fill="#FAF6EE" fontSize="12" fontWeight="bold">Q(x₂, y₂)</text>

          <circle cx="80" cy="230" r="4" fill="#dfa745" />
          <text x="40" y="225" fill="#C8B99D" fontSize="11" fontWeight="bold">(0, b)</text>

          <text x="260" y="212" fill="#EDE5D8" fontSize="11" textAnchor="middle">Desplazamiento horizontal (x₂ − x₁)</text>
          <text x="370" y="145" fill="#EDE5D8" fontSize="11">Desplazamiento vertical (y₂ − y₁)</text>

          <path d="M 120 250 A 40 40 0 0 0 110 215" fill="none" stroke="#dfa745" strokeWidth="2" />
          <text x="125" y="235" fill="#dfa745" fontSize="13" fontWeight="bold">α</text>

          <rect x="60" y="30" width="220" height="48" rx="8" fill="#223028" stroke="rgba(217,203,182,0.2)" />
          <text x="70" y="48" fill="#EDE5D8" fontSize="11">Pendiente: m = (y₂ − y₁) / (x₂ − x₁)</text>
          <text x="70" y="66" fill="#C8B99D" fontSize="11">Ángulo: m = tan(α)</text>
        </svg>
      );
      break;

    case "recta_ejemplo_3x_menos_2":
      diagramContent = (
        <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="160" x2="380" y2="160" stroke="#7A8F73" strokeWidth="1.5" />
          <line x1="160" y1="280" x2="160" y2="20" stroke="#7A8F73" strokeWidth="1.5" />
          <text x="385" y="164" fill="#EDE5D8" fontSize="12">x</text>
          <text x="156" y="15" fill="#EDE5D8" fontSize="12">y</text>

          <line x1="100" y1="310" x2="270" y2="5" stroke="#EDE5D8" strokeWidth="2.5" />

          <circle cx="160" cy="220" r="5" fill="#dfa745" />
          <text x="80" y="225" fill="#FAF6EE" fontSize="11" fontWeight="bold">(0, −2) [b]</text>

          <circle cx="210" cy="130" r="5" fill="#7A8F73" />
          <text x="220" y="130" fill="#FAF6EE" fontSize="11" fontWeight="bold">(1, 1)</text>

          <line x1="160" y1="220" x2="210" y2="220" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.5" />
          <line x1="210" y1="220" x2="210" y2="130" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.5" />
          <text x="185" y="235" fill="#C8B99D" fontSize="10">Δx = 1</text>
          <text x="215" y="180" fill="#C8B99D" fontSize="10">Δy = 3</text>

          <rect x="230" y="220" width="150" height="36" rx="6" fill="#223028" stroke="rgba(217,203,182,0.2)" />
          <text x="240" y="242" fill="#EDE5D8" fontSize="11" fontWeight="bold">y = 3x − 2 (m = 3)</text>
        </svg>
      );
      break;

    case "circunferencia_ejemplo_centro_radio":
      diagramContent = (
        <svg viewBox="0 0 460 280" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="210" x2="430" y2="210" stroke="#7A8F73" strokeWidth="1.5" />
          <line x1="330" y1="270" x2="330" y2="20" stroke="#7A8F73" strokeWidth="1.5" />
          <text x="435" y="214" fill="#EDE5D8" fontSize="12">x</text>
          <text x="326" y="15" fill="#EDE5D8" fontSize="12">y</text>

          <circle cx="170" cy="130" r="80" fill="rgba(122, 143, 115, 0.15)" stroke="#7A8F73" strokeWidth="2.5" />
          <circle cx="170" cy="130" r="5" fill="#dfa745" />
          <text x="85" y="125" fill="#FAF6EE" fontSize="12" fontWeight="bold">Centro C(−4, 2)</text>

          <line x1="170" y1="130" x2="226" y2="74" stroke="#dfa745" strokeWidth="2" />
          <text x="205" y="95" fill="#dfa745" fontSize="11" fontWeight="bold">r = 2</text>

          <line x1="170" y1="130" x2="170" y2="210" stroke="#A89F8D" strokeDasharray="3,3" strokeWidth="1" />
          <line x1="170" y1="130" x2="330" y2="130" stroke="#A89F8D" strokeDasharray="3,3" strokeWidth="1" />
          <text x="170" y="225" fill="#A89F8D" fontSize="10" textAnchor="middle">−4</text>
          <text x="340" y="134" fill="#A89F8D" fontSize="10">2</text>

          <rect x="30" y="30" width="220" height="42" rx="6" fill="#223028" stroke="rgba(217,203,182,0.2)" />
          <text x="40" y="48" fill="#EDE5D8" fontSize="10.5">(x + 4)² + (y − 2)² = 4</text>
          <text x="40" y="63" fill="#C8B99D" fontSize="10">x² + y² + 8x − 4y + 16 = 0</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 13: SISTEMAS LINEALES 2x2
    // ══════════════════════════════════════════════════════════════
    case "sistemas_3_casos":
      diagramContent = (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#7A8F73] uppercase tracking-wider">1. Solución Única</div>
            <svg viewBox="0 0 160 120" className="w-full h-24 mx-auto select-none">
              <line x1="10" y1="60" x2="150" y2="60" stroke="#556b5d" strokeWidth="1" />
              <line x1="80" y1="10" x2="80" y2="110" stroke="#556b5d" strokeWidth="1" />
              <line x1="20" y1="100" x2="140" y2="20" stroke="#EDE5D8" strokeWidth="2" />
              <line x1="20" y1="20" x2="140" y2="100" stroke="#dfa745" strokeWidth="2" />
              <circle cx="80" cy="60" r="4.5" fill="#7A8F73" />
              <text x="90" y="55" fill="#FAF6EE" fontSize="10" fontWeight="bold">(x₀, y₀)</text>
            </svg>
            <p className="text-[11px] text-[#A89F8D]">Rectas secantes. Se cortan en un único punto.</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#dfa745] uppercase tracking-wider">2. Sin Solución</div>
            <svg viewBox="0 0 160 120" className="w-full h-24 mx-auto select-none">
              <line x1="10" y1="60" x2="150" y2="60" stroke="#556b5d" strokeWidth="1" />
              <line x1="80" y1="10" x2="80" y2="110" stroke="#556b5d" strokeWidth="1" />
              <line x1="20" y1="80" x2="140" y2="20" stroke="#EDE5D8" strokeWidth="2" />
              <line x1="20" y1="110" x2="140" y2="50" stroke="#dfa745" strokeWidth="2" />
              <text x="135" y="15" fill="#EDE5D8" fontSize="9">L₁</text>
              <text x="135" y="45" fill="#dfa745" fontSize="9">L₂</text>
            </svg>
            <p className="text-[11px] text-[#A89F8D]">Rectas paralelas distintas ($m_1 = m_2, b_1 \neq b_2$).</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#C8B99D] uppercase tracking-wider">3. Infinitas Soluciones</div>
            <svg viewBox="0 0 160 120" className="w-full h-24 mx-auto select-none">
              <line x1="10" y1="60" x2="150" y2="60" stroke="#556b5d" strokeWidth="1" />
              <line x1="80" y1="10" x2="80" y2="110" stroke="#556b5d" strokeWidth="1" />
              <line x1="20" y1="90" x2="140" y2="30" stroke="#EDE5D8" strokeWidth="4" />
              <line x1="20" y1="90" x2="140" y2="30" stroke="#7A8F73" strokeWidth="2" strokeDasharray="6,4" />
              <text x="120" y="25" fill="#FAF6EE" fontSize="10" fontWeight="bold">L₁ = L₂</text>
            </svg>
            <p className="text-[11px] text-[#A89F8D]">Rectas coincidentes. Misma pendiente y mismo corte.</p>
          </div>
        </div>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 14: DESIGUALDADES
    // ══════════════════════════════════════════════════════════════
    case "desigualdades_signos_cuadratica":
      diagramContent = (
        <svg viewBox="0 0 480 160" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="130" x2="450" y2="130" stroke="#7A8F73" strokeWidth="2" />
          <circle cx="160" cy="130" r="5" fill="#151d18" stroke="#dfa745" strokeWidth="2" />
          <circle cx="320" cy="130" r="5" fill="#151d18" stroke="#dfa745" strokeWidth="2" />
          <text x="160" y="152" fill="#FAF6EE" fontSize="12" fontWeight="bold" textAnchor="middle">−1</text>
          <text x="320" y="152" fill="#FAF6EE" fontSize="12" fontWeight="bold" textAnchor="middle">2</text>

          <line x1="160" y1="130" x2="320" y2="130" stroke="#dfa745" strokeWidth="4" />
          <text x="240" y="118" fill="#dfa745" fontSize="11" fontWeight="bold" textAnchor="middle">Solución: (−1, 2)</text>

          <text x="40" y="30" fill="#A89F8D" fontSize="11">Signo de (x + 1):</text>
          <text x="100" y="30" fill="#EDE5D8" fontSize="12" fontWeight="bold">−</text>
          <text x="240" y="30" fill="#7A8F73" fontSize="12" fontWeight="bold">+</text>
          <text x="380" y="30" fill="#7A8F73" fontSize="12" fontWeight="bold">+</text>

          <text x="40" y="60" fill="#A89F8D" fontSize="11">Signo de (x − 2):</text>
          <text x="100" y="60" fill="#EDE5D8" fontSize="12" fontWeight="bold">−</text>
          <text x="240" y="60" fill="#EDE5D8" fontSize="12" fontWeight="bold">−</text>
          <text x="380" y="60" fill="#7A8F73" fontSize="12" fontWeight="bold">+</text>

          <line x1="30" y1="75" x2="450" y2="75" stroke="rgba(217,203,182,0.15)" strokeWidth="1" />

          <text x="40" y="95" fill="#FAF6EE" fontSize="11" fontWeight="bold">Producto (x−2)(x+1):</text>
          <text x="100" y="95" fill="#7A8F73" fontSize="13" fontWeight="bold">+</text>
          <text x="240" y="95" fill="#dfa745" fontSize="14" fontWeight="bold">−</text>
          <text x="380" y="95" fill="#7A8F73" fontSize="13" fontWeight="bold">+</text>
        </svg>
      );
      break;

    case "desigualdades_valor_absoluto_geom":
      diagramContent = (
        <svg viewBox="0 0 480 160" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <text x="30" y="20" fill="#FAF6EE" fontSize="11.5" fontWeight="bold">|x − c| ≤ a (Distancia al centro c es a lo sumo a)</text>
          <line x1="40" y1="50" x2="440" y2="50" stroke="#7A8F73" strokeWidth="1.5" />
          <line x1="160" y1="50" x2="320" y2="50" stroke="#dfa745" strokeWidth="4" />
          <circle cx="240" cy="50" r="4" fill="#EDE5D8" />
          <circle cx="160" cy="50" r="4" fill="#dfa745" />
          <circle cx="320" cy="50" r="4" fill="#dfa745" />
          <text x="240" y="70" fill="#EDE5D8" fontSize="11" textAnchor="middle">c</text>
          <text x="160" y="70" fill="#dfa745" fontSize="11" textAnchor="middle">c − a</text>
          <text x="320" y="70" fill="#dfa745" fontSize="11" textAnchor="middle">c + a</text>

          <text x="30" y="105" fill="#FAF6EE" fontSize="11.5" fontWeight="bold">Ejemplo resuelto: |x − 5| ≤ 3 ⟹ Intervalo cerrado [2, 8]</text>
          <line x1="40" y1="130" x2="440" y2="130" stroke="#7A8F73" strokeWidth="1.5" />
          <line x1="160" y1="130" x2="320" y2="130" stroke="#7A8F73" strokeWidth="4" />
          <circle cx="240" cy="130" r="4" fill="#EDE5D8" />
          <circle cx="160" cy="130" r="4" fill="#7A8F73" />
          <circle cx="320" cy="130" r="4" fill="#7A8F73" />
          <text x="240" y="150" fill="#EDE5D8" fontSize="11" textAnchor="middle">5</text>
          <text x="160" y="150" fill="#7A8F73" fontSize="11" textAnchor="middle">2 (5 − 3)</text>
          <text x="320" y="150" fill="#7A8F73" fontSize="11" textAnchor="middle">8 (5 + 3)</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 15: ÁNGULOS Y TRIÁNGULOS
    // ══════════════════════════════════════════════════════════════
    case "angulos_paralelas_secante":
      diagramContent = (
        <svg viewBox="0 0 460 250" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="40" y1="75" x2="420" y2="75" stroke="#7A8F73" strokeWidth="2" />
          <line x1="40" y1="175" x2="420" y2="175" stroke="#7A8F73" strokeWidth="2" />
          <text x="430" y="79" fill="#EDE5D8" fontSize="12" fontWeight="bold">L₁</text>
          <text x="430" y="179" fill="#EDE5D8" fontSize="12" fontWeight="bold">L₂</text>

          <line x1="120" y1="15" x2="320" y2="235" stroke="#EDE5D8" strokeWidth="2" />
          <text x="330" y="240" fill="#EDE5D8" fontSize="12" fontStyle="italic">Secante</text>

          <text x="150" y="60" fill="#dfa745" fontSize="12" fontWeight="bold">1</text>
          <text x="195" y="60" fill="#7A8F73" fontSize="12" fontWeight="bold">2</text>
          <text x="150" y="100" fill="#7A8F73" fontSize="12" fontWeight="bold">3</text>
          <text x="195" y="100" fill="#dfa745" fontSize="12" fontWeight="bold">4</text>

          <text x="240" y="160" fill="#dfa745" fontSize="12" fontWeight="bold">5</text>
          <text x="285" y="160" fill="#7A8F73" fontSize="12" fontWeight="bold">6</text>
          <text x="240" y="200" fill="#7A8F73" fontSize="12" fontWeight="bold">7</text>
          <text x="285" y="200" fill="#dfa745" fontSize="12" fontWeight="bold">8</text>

          <rect x="260" y="15" width="180" height="50" rx="6" fill="#223028" stroke="rgba(217,203,182,0.2)" />
          <text x="270" y="32" fill="#dfa745" fontSize="10.5">∠1 ≅ ∠4 ≅ ∠5 ≅ ∠8</text>
          <text x="270" y="48" fill="#7A8F73" fontSize="10.5">∠2 ≅ ∠3 ≅ ∠6 ≅ ∠7</text>
        </svg>
      );
      break;

    case "triangulos_suma_angulos_demostracion":
      diagramContent = (
        <svg viewBox="0 0 460 230" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="40" y1="45" x2="420" y2="45" stroke="#dfa745" strokeDasharray="4,4" strokeWidth="1.5" />
          <text x="30" y="40" fill="#dfa745" fontSize="11">Recta paralela a AC</text>

          <polygon points="100,195 230,45 380,195" fill="rgba(122, 143, 115, 0.12)" stroke="#7A8F73" strokeWidth="2.5" />

          <text x="80" y="210" fill="#FAF6EE" fontSize="13" fontWeight="bold">A</text>
          <text x="225" y="35" fill="#FAF6EE" fontSize="13" fontWeight="bold">B</text>
          <text x="390" y="210" fill="#FAF6EE" fontSize="13" fontWeight="bold">C</text>

          <text x="125" y="185" fill="#EDE5D8" fontSize="12" fontWeight="bold">1</text>
          <text x="227" y="75" fill="#EDE5D8" fontSize="12" fontWeight="bold">2</text>
          <text x="345" y="185" fill="#EDE5D8" fontSize="12" fontWeight="bold">3</text>

          <text x="175" y="38" fill="#dfa745" fontSize="12" fontWeight="bold">α (≅ 1)</text>
          <text x="275" y="38" fill="#dfa745" fontSize="12" fontWeight="bold">β (≅ 3)</text>

          <rect x="250" y="125" width="180" height="42" rx="6" fill="#223028" stroke="rgba(217,203,182,0.2)" />
          <text x="260" y="143" fill="#EDE5D8" fontSize="11">α + ∠2 + β = 180°</text>
          <text x="260" y="158" fill="#7A8F73" fontSize="11" fontWeight="bold">∠1 + ∠2 + ∠3 = 180°</text>
        </svg>
      );
      break;

    case "triangulos_lineas_notables":
      diagramContent = (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-[#7A8F73]">Alturas</div>
            <svg viewBox="0 0 100 80" className="w-full h-16 mx-auto">
              <polygon points="15,70 50,15 85,70" fill="none" stroke="#A89F8D" strokeWidth="1.5" />
              <line x1="50" y1="15" x2="50" y2="70" stroke="#dfa745" strokeWidth="1.5" />
              <rect x="50" y="62" width="8" height="8" fill="none" stroke="#dfa745" strokeWidth="1" />
            </svg>
            <div className="text-[10px] text-[#FAF6EE] font-medium">Ortocentro</div>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-[#7A8F73]">Medianas</div>
            <svg viewBox="0 0 100 80" className="w-full h-16 mx-auto">
              <polygon points="15,70 50,15 85,70" fill="none" stroke="#A89F8D" strokeWidth="1.5" />
              <line x1="50" y1="15" x2="50" y2="70" stroke="#7A8F73" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="3" fill="#7A8F73" />
            </svg>
            <div className="text-[10px] text-[#FAF6EE] font-medium">Baricentro</div>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-[#7A8F73]">Mediatrices</div>
            <svg viewBox="0 0 100 80" className="w-full h-16 mx-auto">
              <polygon points="15,70 50,15 85,70" fill="none" stroke="#A89F8D" strokeWidth="1.5" />
              <line x1="50" y1="5" x2="50" y2="75" stroke="#C8B99D" strokeDasharray="3,3" strokeWidth="1.5" />
              <rect x="50" y="62" width="8" height="8" fill="none" stroke="#C8B99D" strokeWidth="1" />
            </svg>
            <div className="text-[10px] text-[#FAF6EE] font-medium">Circuncentro</div>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-[#7A8F73]">Bisectrices</div>
            <svg viewBox="0 0 100 80" className="w-full h-16 mx-auto">
              <polygon points="15,70 50,15 85,70" fill="none" stroke="#A89F8D" strokeWidth="1.5" />
              <line x1="50" y1="15" x2="50" y2="70" stroke="#dfa745" strokeWidth="1.5" />
              <path d="M 42 30 A 10 10 0 0 1 58 30" fill="none" stroke="#dfa745" strokeWidth="1" />
            </svg>
            <div className="text-[10px] text-[#FAF6EE] font-medium">Incentro</div>
          </div>
        </div>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 16: CONGRUENCIA Y SEMEJANZA
    // ══════════════════════════════════════════════════════════════
    case "semejanza_tanque_cono_agua":
      diagramContent = (
        <svg viewBox="0 0 420 270" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="110,40 310,40 210,220" fill="rgba(217,203,182,0.05)" stroke="#A89F8D" strokeWidth="2" />
          <ellipse cx="210" cy="40" rx="100" ry="16" fill="none" stroke="#A89F8D" strokeWidth="2" />

          <polygon points="150,112 270,112 210,220" fill="rgba(122, 143, 115, 0.25)" stroke="#7A8F73" strokeWidth="2" />
          <ellipse cx="210" cy="112" rx="60" ry="10" fill="rgba(122, 143, 115, 0.4)" stroke="#7A8F73" strokeWidth="1.5" />

          <line x1="210" y1="40" x2="210" y2="220" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.5" />
          <line x1="210" y1="40" x2="310" y2="40" stroke="#EDE5D8" strokeWidth="2" />
          <line x1="210" y1="112" x2="270" y2="112" stroke="#dfa745" strokeWidth="2" />

          <text x="210" y="235" fill="#FAF6EE" fontSize="12" fontWeight="bold" textAnchor="middle">Vértice A</text>
          <text x="315" y="45" fill="#FAF6EE" fontSize="12" fontWeight="bold">C (FC = 1 m)</text>
          <text x="275" y="116" fill="#dfa745" fontSize="12" fontWeight="bold">E (Radio GE = r)</text>
          <text x="200" y="35" fill="#A89F8D" fontSize="11">F</text>
          <text x="200" y="108" fill="#A89F8D" fontSize="11">G</text>

          <text x="70" y="45" fill="#EDE5D8" fontSize="11">Diámetro = 2 m</text>
          <text x="70" y="130" fill="#EDE5D8" fontSize="11">Altura = 3 m</text>
          <text x="70" y="170" fill="#dfa745" fontSize="11">AG = 1.8 m</text>

          <rect x="250" y="170" width="160" height="42" rx="6" fill="#223028" stroke="rgba(217,203,182,0.2)" />
          <text x="260" y="188" fill="#EDE5D8" fontSize="10.5">AG / AF = GE / FC</text>
          <text x="260" y="203" fill="#7A8F73" fontSize="11" fontWeight="bold">r = GE = 0.6 m</text>
        </svg>
      );
      break;

    case "teorema_bisectriz_demostracion":
      diagramContent = (
        <svg viewBox="0 0 460 240" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="60,190 180,80 320,190" fill="rgba(122, 143, 115, 0.1)" stroke="#7A8F73" strokeWidth="2.5" />
          <line x1="180" y1="80" x2="200" y2="190" stroke="#dfa745" strokeWidth="2.5" />

          <line x1="320" y1="190" x2="310" y2="20" stroke="#A89F8D" strokeDasharray="3,3" strokeWidth="1.5" />
          <line x1="180" y1="80" x2="310" y2="20" stroke="#A89F8D" strokeDasharray="3,3" strokeWidth="1.5" />

          <text x="45" y="205" fill="#FAF6EE" fontSize="13" fontWeight="bold">A</text>
          <text x="175" y="70" fill="#FAF6EE" fontSize="13" fontWeight="bold">B</text>
          <text x="330" y="205" fill="#FAF6EE" fontSize="13" fontWeight="bold">C</text>
          <text x="195" y="210" fill="#dfa745" fontSize="13" fontWeight="bold">D</text>
          <text x="315" y="15" fill="#A89F8D" fontSize="13" fontWeight="bold">E</text>

          <text x="165" y="105" fill="#dfa745" fontSize="11">α</text>
          <text x="190" y="105" fill="#dfa745" fontSize="11">α</text>
          <text x="295" y="45" fill="#dfa745" fontSize="11">α</text>

          <rect x="50" y="20" width="160" height="42" rx="6" fill="#223028" stroke="rgba(217,203,182,0.2)" />
          <text x="60" y="38" fill="#EDE5D8" fontSize="11">Teorema de la Bisectriz:</text>
          <text x="60" y="54" fill="#dfa745" fontSize="11.5" fontWeight="bold">AB / BC = AD / DC</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 17: ÁREAS Y PITÁGORAS
    // ══════════════════════════════════════════════════════════════
    case "figuras_planas_catalogo":
      diagramContent = (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-[#7A8F73]">Rectángulo</div>
            <svg viewBox="0 0 100 60" className="w-full h-14 mx-auto">
              <rect x="10" y="10" width="80" height="40" fill="none" stroke="#EDE5D8" strokeWidth="1.5" />
              <text x="50" y="58" fill="#A89F8D" fontSize="9" textAnchor="middle">b</text>
              <text x="5" y="33" fill="#A89F8D" fontSize="9">h</text>
            </svg>
            <div className="text-[10px] text-[#EDE5D8]">A = b · h</div>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-[#7A8F73]">Trapecio</div>
            <svg viewBox="0 0 100 60" className="w-full h-14 mx-auto">
              <polygon points="25,12 75,12 90,48 10,48" fill="none" stroke="#EDE5D8" strokeWidth="1.5" />
              <text x="50" y="9" fill="#A89F8D" fontSize="8" textAnchor="middle">b</text>
              <text x="50" y="58" fill="#A89F8D" fontSize="8" textAnchor="middle">B</text>
              <line x1="25" y1="12" x2="25" y2="48" stroke="#dfa745" strokeDasharray="2,2" strokeWidth="1" />
              <text x="29" y="32" fill="#dfa745" fontSize="8">h</text>
            </svg>
            <div className="text-[10px] text-[#EDE5D8]">A = ½(B + b)h</div>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-[#7A8F73]">Sector Circular</div>
            <svg viewBox="0 0 100 60" className="w-full h-14 mx-auto">
              <path d="M 20,48 L 70,48 A 50 50 0 0 0 50,10 Z" fill="rgba(122,143,115,0.2)" stroke="#EDE5D8" strokeWidth="1.5" />
              <text x="45" y="57" fill="#A89F8D" fontSize="8">R</text>
              <text x="32" y="44" fill="#dfa745" fontSize="8">α</text>
              <text x="68" y="26" fill="#C8B99D" fontSize="8">l = Rα</text>
            </svg>
            <div className="text-[10px] text-[#EDE5D8]">A = ½ α R²</div>
          </div>
        </div>
      );
      break;

    case "pitagoras_demostracion_cuadrados":
      diagramContent = (
        <svg viewBox="0 0 360 250" className="w-full max-w-sm mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="15" width="220" height="220" fill="none" stroke="#7A8F73" strokeWidth="2" />

          <polygon points="190,15 260,145 110,235 40,105" fill="rgba(223, 167, 69, 0.15)" stroke="#dfa745" strokeWidth="2.5" />

          <text x="110" y="10" fill="#EDE5D8" fontSize="11">a</text>
          <text x="220" y="10" fill="#EDE5D8" fontSize="11">b</text>

          <text x="268" y="80" fill="#EDE5D8" fontSize="11">a</text>
          <text x="268" y="195" fill="#EDE5D8" fontSize="11">b</text>

          <text x="145" y="130" fill="#dfa745" fontSize="14" fontWeight="bold">h²</text>

          <text x="90" y="60" fill="#A89F8D" fontSize="9">ab/2</text>
          <text x="215" y="80" fill="#A89F8D" fontSize="9">ab/2</text>
          <text x="195" y="200" fill="#A89F8D" fontSize="9">ab/2</text>
          <text x="65" y="180" fill="#A89F8D" fontSize="9">ab/2</text>
        </svg>
      );
      break;

    case "area_ventana_normanda":
      diagramContent = (
        <svg viewBox="0 0 300 230" className="w-full max-w-xs mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 70,90 A 80 80 0 0 1 230,90 Z" fill="rgba(122,143,115,0.2)" stroke="#7A8F73" strokeWidth="2" />
          <rect x="70" y="90" width="160" height="120" fill="rgba(217,203,182,0.06)" stroke="#EDE5D8" strokeWidth="2" />

          <text x="150" y="225" fill="#FAF6EE" fontSize="12" fontWeight="bold" textAnchor="middle">x</text>
          <text x="50" y="155" fill="#FAF6EE" fontSize="12" fontWeight="bold">x</text>
          <line x1="150" y1="90" x2="150" y2="10" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.5" />
          <text x="158" y="55" fill="#dfa745" fontSize="11" fontWeight="bold">r = x/2</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 18: SÓLIDOS 3D
    // ══════════════════════════════════════════════════════════════
    case "solido_cilindro_semiesferas":
      diagramContent = (
        <svg viewBox="0 0 340 230" className="w-full max-w-xs mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <rect x="100" y="65" width="140" height="100" fill="rgba(217,203,182,0.08)" stroke="#EDE5D8" strokeWidth="2" />
          <ellipse cx="170" cy="65" rx="70" ry="16" fill="none" stroke="#EDE5D8" strokeWidth="1.5" />
          <ellipse cx="170" cy="165" rx="70" ry="16" fill="none" stroke="#EDE5D8" strokeWidth="1.5" />

          <path d="M 100,65 A 70 70 0 0 1 240,65" fill="rgba(122,143,115,0.2)" stroke="#7A8F73" strokeWidth="2" />
          <path d="M 100,165 A 70 70 0 0 0 240,165" fill="rgba(122,143,115,0.2)" stroke="#7A8F73" strokeWidth="2" />

          <line x1="255" y1="65" x2="255" y2="165" stroke="#dfa745" strokeWidth="1.5" />
          <text x="265" y="120" fill="#dfa745" fontSize="11" fontWeight="bold">h = 18 cm</text>
          <line x1="170" y1="65" x2="240" y2="65" stroke="#EDE5D8" strokeWidth="1.5" />
          <text x="195" y="58" fill="#EDE5D8" fontSize="10">R = 7 cm</text>
        </svg>
      );
      break;

    case "solido_tronco_cono":
      diagramContent = (
        <svg viewBox="0 0 360 250" className="w-full max-w-sm mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="120,105 240,105 280,205 80,205" fill="rgba(122,143,115,0.15)" stroke="#7A8F73" strokeWidth="2" />
          <ellipse cx="180" cy="105" rx="60" ry="12" fill="none" stroke="#7A8F73" strokeWidth="1.5" />
          <ellipse cx="180" cy="205" rx="100" ry="18" fill="none" stroke="#7A8F73" strokeWidth="1.5" />

          <polygon points="120,105 180,25 240,105" fill="none" stroke="#A89F8D" strokeDasharray="3,3" strokeWidth="1.5" />
          <line x1="180" y1="25" x2="180" y2="205" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.5" />

          <text x="185" y="70" fill="#A89F8D" fontSize="10">x (cono elim.)</text>
          <text x="185" y="155" fill="#dfa745" fontSize="11" fontWeight="bold">h = 7.6 cm</text>
          <text x="210" y="100" fill="#EDE5D8" fontSize="10">r = 2.1 cm</text>
          <text x="230" y="222" fill="#EDE5D8" fontSize="10">R = 4.9 cm</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 19: MODELADO
    // ══════════════════════════════════════════════════════════════
    case "modelado_poste_sombra":
      diagramContent = (
        <svg viewBox="0 0 460 210" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="170" x2="430" y2="170" stroke="#7A8F73" strokeWidth="2" />

          <line x1="80" y1="170" x2="80" y2="35" stroke="#EDE5D8" strokeWidth="4" />
          <circle cx="80" cy="35" r="7" fill="#dfa745" />
          <text x="45" y="105" fill="#EDE5D8" fontSize="12" fontWeight="bold">6 m</text>

          <line x1="260" y1="170" x2="260" y2="125" stroke="#7A8F73" strokeWidth="3" />
          <circle cx="260" cy="120" r="4" fill="#7A8F73" />
          <text x="270" y="148" fill="#7A8F73" fontSize="11" fontWeight="bold">2 m</text>

          <line x1="80" y1="35" x2="380" y2="170" stroke="#dfa745" strokeDasharray="4,4" strokeWidth="1.5" />
          <circle cx="380" cy="170" r="4" fill="#dfa745" />

          <text x="170" y="190" fill="#A89F8D" fontSize="11" textAnchor="middle">10 m (distancia al poste)</text>
          <text x="320" y="190" fill="#dfa745" fontSize="11" fontWeight="bold" textAnchor="middle">x = 5 m (sombra)</text>
        </svg>
      );
      break;

    case "modelado_mapa_carreteras":
      diagramContent = (
        <svg viewBox="0 0 460 190" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="130" x2="410" y2="130" stroke="#A89F8D" strokeWidth="3" />

          <circle cx="70" cy="130" r="6" fill="#7A8F73" />
          <text x="50" y="155" fill="#FAF6EE" fontSize="12" fontWeight="bold">Guatavita (G)</text>

          <circle cx="210" cy="130" r="5" fill="#dfa745" />
          <text x="195" y="155" fill="#dfa745" fontSize="11">Tramo viejo (x)</text>

          <circle cx="370" cy="35" r="6" fill="#7A8F73" />
          <text x="380" y="40" fill="#FAF6EE" fontSize="12" fontWeight="bold">Fontibón (F)</text>

          <line x1="370" y1="130" x2="370" y2="35" stroke="#A89F8D" strokeDasharray="3,3" strokeWidth="1.5" />
          <text x="380" y="90" fill="#A89F8D" fontSize="11">10 km</text>

          <line x1="210" y1="130" x2="370" y2="35" stroke="#dfa745" strokeWidth="2.5" />
          <text x="230" y="70" fill="#dfa745" fontSize="10.5">Vía nueva: √(100 + (40−x)²)</text>

          <text x="220" y="180" fill="#A89F8D" fontSize="10">Distancia total a la proyección = 40 km</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 20: FUNCIONES
    // ══════════════════════════════════════════════════════════════
    case "funciones_diagrama_flechas":
      diagramContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1.5">
            <div className="text-xs font-bold text-[#7A8F73]">Relación f: SÍ es una función</div>
            <svg viewBox="0 0 240 140" className="w-full h-28 mx-auto">
              {/* Set A */}
              <ellipse cx="50" cy="70" rx="35" ry="55" fill="rgba(122,143,115,0.12)" stroke="#7A8F73" strokeWidth="1.5" />
              <text x="50" y="25" fill="#FAF6EE" fontSize="11" fontWeight="bold" textAnchor="middle">A</text>
              {/* Elements of A */}
              <text x="50" y="45" fill="#EDE5D8" fontSize="10" textAnchor="middle">0</text>
              <text x="50" y="62" fill="#EDE5D8" fontSize="10" textAnchor="middle">1</text>
              <text x="50" y="79" fill="#EDE5D8" fontSize="10" textAnchor="middle">2</text>
              <text x="50" y="96" fill="#EDE5D8" fontSize="10" textAnchor="middle">3</text>
              <text x="50" y="113" fill="#EDE5D8" fontSize="10" textAnchor="middle">4</text>

              {/* Set B */}
              <ellipse cx="190" cy="70" rx="35" ry="55" fill="rgba(122,143,115,0.12)" stroke="#7A8F73" strokeWidth="1.5" />
              <text x="190" y="25" fill="#FAF6EE" fontSize="11" fontWeight="bold" textAnchor="middle">B</text>
              {/* Elements of B */}
              <text x="190" y="55" fill="#EDE5D8" fontSize="10" textAnchor="middle">10</text>
              <text x="190" y="80" fill="#EDE5D8" fontSize="10" textAnchor="middle">20</text>
              <text x="190" y="105" fill="#EDE5D8" fontSize="10" textAnchor="middle">30</text>

              {/* Arrows */}
              <line x1="58" y1="42" x2="170" y2="52" stroke="#dfa745" strokeWidth="1.5" />
              <line x1="58" y1="59" x2="170" y2="77" stroke="#dfa745" strokeWidth="1.5" />
              <line x1="58" y1="76" x2="170" y2="77" stroke="#dfa745" strokeWidth="1.5" />
              <line x1="58" y1="93" x2="170" y2="102" stroke="#dfa745" strokeWidth="1.5" />
              <line x1="58" y1="110" x2="170" y2="102" stroke="#dfa745" strokeWidth="1.5" />
            </svg>
            <p className="text-[10.5px] text-[#7A8F73]">A cada elemento de A le corresponde exactamente una imagen en B.</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1.5">
            <div className="text-xs font-bold text-red-400">Relación g: NO es una función</div>
            <svg viewBox="0 0 240 140" className="w-full h-28 mx-auto">
              {/* Set C */}
              <ellipse cx="50" cy="70" rx="35" ry="55" fill="rgba(217,203,182,0.08)" stroke="#A89F8D" strokeWidth="1.5" />
              <text x="50" y="25" fill="#FAF6EE" fontSize="11" fontWeight="bold" textAnchor="middle">C</text>
              <text x="50" y="50" fill="#EDE5D8" fontSize="10" textAnchor="middle">5</text>
              <text x="50" y="70" fill="#EDE5D8" fontSize="10" textAnchor="middle">6</text>
              <text x="50" y="90" fill="#EDE5D8" fontSize="10" textAnchor="middle">7</text>
              <text x="50" y="110" fill="#EDE5D8" fontSize="10" textAnchor="middle">8</text>

              {/* Set D */}
              <ellipse cx="190" cy="70" rx="35" ry="55" fill="rgba(217,203,182,0.08)" stroke="#A89F8D" strokeWidth="1.5" />
              <text x="190" y="25" fill="#FAF6EE" fontSize="11" fontWeight="bold" textAnchor="middle">D</text>
              <text x="190" y="55" fill="#EDE5D8" fontSize="10" textAnchor="middle">40</text>
              <text x="190" y="80" fill="#EDE5D8" fontSize="10" textAnchor="middle">50</text>
              <text x="190" y="105" fill="#EDE5D8" fontSize="10" textAnchor="middle">60</text>

              {/* Red multiple arrows from 5 */}
              <line x1="58" y1="48" x2="170" y2="53" stroke="#f87171" strokeWidth="2" />
              <line x1="58" y1="48" x2="170" y2="77" stroke="#f87171" strokeWidth="2" strokeDasharray="3,3" />
              <line x1="58" y1="67" x2="170" y2="77" stroke="#A89F8D" strokeWidth="1.2" />
              <line x1="58" y1="87" x2="170" y2="102" stroke="#A89F8D" strokeWidth="1.2" />
            </svg>
            <p className="text-[10.5px] text-red-300">El elemento 5 tiene 2 imágenes distintas (40 y 50).</p>
          </div>
        </div>
      );
      break;

    case "funciones_maquina":
      diagramContent = (
        <svg viewBox="0 0 460 150" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="50" y1="75" x2="160" y2="75" stroke="#EDE5D8" strokeWidth="3" />
          <text x="90" y="63" fill="#EDE5D8" fontSize="13" fontWeight="bold">Entrada x</text>

          <rect x="170" y="25" width="120" height="100" rx="14" fill="#223028" stroke="#7A8F73" strokeWidth="2.5" />
          <text x="230" y="70" fill="#FAF6EE" fontSize="18" fontWeight="bold" fontFamily="serif" textAnchor="middle">f(x)</text>
          <text x="230" y="93" fill="#A89F8D" fontSize="10" textAnchor="middle">MÁQUINA</text>

          <line x1="300" y1="75" x2="410" y2="75" stroke="#dfa745" strokeWidth="3" />
          <text x="330" y="63" fill="#dfa745" fontSize="13" fontWeight="bold">Salida f(x)</text>
        </svg>
      );
      break;

    case "funciones_prueba_recta_vertical":
      diagramContent = (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-red-400">Circunferencia</div>
            <svg viewBox="0 0 140 100" className="w-full h-20 mx-auto">
              <line x1="10" y1="50" x2="130" y2="50" stroke="#556b5d" strokeWidth="1" />
              <line x1="70" y1="10" x2="70" y2="90" stroke="#556b5d" strokeWidth="1" />
              <circle cx="70" cy="50" r="30" fill="none" stroke="#EDE5D8" strokeWidth="1.5" />
              <line x1="85" y1="10" x2="85" y2="90" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.5" />
              <circle cx="85" cy="24" r="3" fill="#dfa745" />
              <circle cx="85" cy="76" r="3" fill="#dfa745" />
            </svg>
            <p className="text-[10.5px] text-red-300 font-semibold">NO es función (2 cortes)</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-red-400">Curva 'S' horizontal</div>
            <svg viewBox="0 0 140 100" className="w-full h-20 mx-auto">
              <line x1="10" y1="50" x2="130" y2="50" stroke="#556b5d" strokeWidth="1" />
              <line x1="70" y1="10" x2="70" y2="90" stroke="#556b5d" strokeWidth="1" />
              <path d="M 20,80 Q 80,10 70,50 T 120,20" fill="none" stroke="#EDE5D8" strokeWidth="1.5" />
              <line x1="70" y1="10" x2="70" y2="90" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.5" />
              <circle cx="70" cy="28" r="3" fill="#dfa745" />
              <circle cx="70" cy="50" r="3" fill="#dfa745" />
              <circle cx="70" cy="72" r="3" fill="#dfa745" />
            </svg>
            <p className="text-[10.5px] text-red-300 font-semibold">NO es función (3 cortes)</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1">
            <div className="text-xs font-bold text-[#7A8F73]">Curva Cúbica Estándar</div>
            <svg viewBox="0 0 140 100" className="w-full h-20 mx-auto">
              <line x1="10" y1="50" x2="130" y2="50" stroke="#556b5d" strokeWidth="1" />
              <line x1="70" y1="10" x2="70" y2="90" stroke="#556b5d" strokeWidth="1" />
              <path d="M 20,85 C 50,85 60,50 70,50 C 80,50 90,15 120,15" fill="none" stroke="#7A8F73" strokeWidth="2" />
              <line x1="90" y1="10" x2="90" y2="90" stroke="#dfa745" strokeDasharray="3,3" strokeWidth="1.5" />
              <circle cx="90" cy="27" r="3" fill="#7A8F73" />
            </svg>
            <p className="text-[10.5px] text-[#7A8F73] font-semibold">SÍ es función (máx 1 corte)</p>
          </div>
        </div>
      );
      break;

    case "funciones_lineal_y_constante":
      diagramContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1.5">
            <div className="text-xs font-bold text-[#7A8F73]">Función Lineal: f(x) = 2x − 1</div>
            <svg viewBox="0 0 180 140" className="w-full h-28 mx-auto">
              <line x1="20" y1="70" x2="160" y2="70" stroke="#556b5d" strokeWidth="1" />
              <line x1="90" y1="10" x2="90" y2="130" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="130" x2="140" y2="10" stroke="#7A8F73" strokeWidth="2.5" />
              <circle cx="90" cy="90" r="3.5" fill="#dfa745" />
              <circle cx="110" cy="50" r="3.5" fill="#dfa745" />
              <text x="50" y="93" fill="#FAF6EE" fontSize="8">(0, −1)</text>
              <text x="115" y="50" fill="#FAF6EE" fontSize="8">(1, 1)</text>
            </svg>
            <p className="text-[10.5px] text-[#A89F8D]">Pendiente m = 2, corte (0, −1), Df = ℝ, Rf = ℝ</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-1.5">
            <div className="text-xs font-bold text-[#dfa745]">Función Constante: f(x) = 2</div>
            <svg viewBox="0 0 180 140" className="w-full h-28 mx-auto">
              <line x1="20" y1="90" x2="160" y2="90" stroke="#556b5d" strokeWidth="1" />
              <line x1="90" y1="10" x2="90" y2="130" stroke="#556b5d" strokeWidth="1" />
              <line x1="20" y1="50" x2="160" y2="50" stroke="#dfa745" strokeWidth="2.5" />
              <circle cx="90" cy="50" r="3.5" fill="#EDE5D8" />
              <text x="96" y="44" fill="#FAF6EE" fontSize="9" fontWeight="bold">y = 2</text>
            </svg>
            <p className="text-[10.5px] text-[#A89F8D]">Recta horizontal m = 0, Df = ℝ, Rf = &#123;2&#125;</p>
          </div>
        </div>
      );
      break;

    case "funciones_traslaciones_reflexion":
      diagramContent = (
        <svg viewBox="0 0 460 210" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="30" y1="110" x2="430" y2="110" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="230" y1="200" x2="230" y2="15" stroke="#556b5d" strokeWidth="1.5" />

          <path d="M 170,30 Q 230,140 290,30" fill="none" stroke="#EDE5D8" strokeWidth="2" />
          <text x="295" y="35" fill="#EDE5D8" fontSize="10.5">y = x²</text>

          <path d="M 170,10 Q 230,90 290,10" fill="none" stroke="#dfa745" strokeWidth="2" />
          <text x="295" y="15" fill="#dfa745" fontSize="10.5">y = x² + 1 (Arriba)</text>

          <path d="M 130,30 Q 190,140 250,30" fill="none" stroke="#7A8F73" strokeWidth="2" strokeDasharray="4,3" />
          <text x="110" y="20" fill="#7A8F73" fontSize="10.5">y = (x+1)² (Izquierda)</text>

          <path d="M 170,190 Q 230,80 290,190" fill="none" stroke="#C8B99D" strokeWidth="2" />
          <text x="295" y="195" fill="#C8B99D" fontSize="10.5">y = −x² (Reflexión)</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 21: TRAMOS, VALOR ABSOLUTO Y POTENCIAS
    // ══════════════════════════════════════════════════════════════
    case "tramos_ejemplo_rectas":
      diagramContent = (
        <svg viewBox="0 0 460 230" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Grid lines */}
          <line x1="30" y1="160" x2="430" y2="160" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="210" y1="210" x2="210" y2="20" stroke="#556b5d" strokeWidth="1.5" />
          <text x="435" y="164" fill="#A89F8D" fontSize="10">x</text>
          <text x="214" y="25" fill="#A89F8D" fontSize="10">y</text>

          {/* Tramo 1: x <= -2 -> y = -x - 3 (from x=-5 => y=2 to x=-2 => y=-1) */}
          <line x1="70" y1="100" x2="150" y2="190" stroke="#7A8F73" strokeWidth="2.5" />
          <circle cx="150" cy="190" r="4" fill="#7A8F73" />
          <text x="75" y="90" fill="#7A8F73" fontSize="10" fontWeight="bold">y = −x − 3</text>

          {/* Tramo 2: -2 < x < 1 -> y = 3 */}
          <line x1="150" y1="70" x2="240" y2="70" stroke="#dfa745" strokeWidth="2.5" />
          <circle cx="150" cy="70" r="4" fill="#151d18" stroke="#dfa745" strokeWidth="2" />
          <circle cx="240" cy="70" r="4" fill="#151d18" stroke="#dfa745" strokeWidth="2" />
          <text x="180" y="60" fill="#dfa745" fontSize="10" fontWeight="bold">y = 3</text>

          {/* Tramo 3: x = 1 -> y = 2 */}
          <circle cx="240" cy="100" r="4.5" fill="#EDE5D8" stroke="#dfa745" strokeWidth="1.5" />
          <text x="250" y="102" fill="#EDE5D8" fontSize="9.5">punto (1, 2)</text>

          {/* Tramo 4: x > 1 -> y = 1/2 x + 1/2 (from x=1,y=1 to x=5,y=3) */}
          <line x1="240" y1="130" x2="380" y2="70" stroke="#C8B99D" strokeWidth="2.5" />
          <circle cx="240" cy="130" r="4" fill="#151d18" stroke="#C8B99D" strokeWidth="2" />
          <text x="320" y="60" fill="#C8B99D" fontSize="10" fontWeight="bold">y = ½x + ½</text>

          {/* Axis markers */}
          <text x="145" y="175" fill="#A89F8D" fontSize="9">−2</text>
          <text x="237" y="175" fill="#A89F8D" fontSize="9">1</text>
          <text x="200" y="73" fill="#A89F8D" fontSize="9">3</text>
        </svg>
      );
      break;

    case "valor_absoluto_desplazado":
      diagramContent = (
        <svg viewBox="0 0 460 210" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="160" x2="440" y2="160" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="230" y1="200" x2="230" y2="20" stroke="#556b5d" strokeWidth="1.5" />

          {/* W shape for g(x) = ||x| - 3| */}
          {/* x <= -3: y = -x - 3 (x=-6 => y=3, x=-3 => y=0) */}
          <line x1="80" y1="50" x2="140" y2="160" stroke="#dfa745" strokeWidth="2.5" />
          {/* -3 < x < 0: y = x + 3 (x=-3 => y=0, x=0 => y=3) */}
          <line x1="140" y1="160" x2="230" y2="50" stroke="#dfa745" strokeWidth="2.5" />
          {/* 0 <= x < 3: y = -x + 3 (x=0 => y=3, x=3 => y=0) */}
          <line x1="230" y1="50" x2="320" y2="160" stroke="#dfa745" strokeWidth="2.5" />
          {/* x >= 3: y = x - 3 (x=3 => y=0, x=6 => y=3) */}
          <line x1="320" y1="160" x2="380" y2="50" stroke="#dfa745" strokeWidth="2.5" />

          {/* Points */}
          <circle cx="140" cy="160" r="3.5" fill="#FAF6EE" />
          <circle cx="230" cy="50" r="3.5" fill="#FAF6EE" />
          <circle cx="320" cy="160" r="3.5" fill="#FAF6EE" />

          <text x="130" y="178" fill="#EDE5D8" fontSize="10">−3</text>
          <text x="218" y="42" fill="#FAF6EE" fontSize="10" fontWeight="bold">(0, 3)</text>
          <text x="315" y="178" fill="#EDE5D8" fontSize="10">3</text>
          <text x="330" y="45" fill="#dfa745" fontSize="11" fontWeight="bold">g(x) = ||x| − 3|</text>
        </svg>
      );
      break;

    case "funciones_potencia_pares_impares":
      diagramContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#7A8F73]">Potencias Pares: f(x) = x² y x⁴</div>
            <svg viewBox="0 0 200 150" className="w-full h-32 mx-auto">
              <line x1="10" y1="110" x2="190" y2="110" stroke="#556b5d" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="140" stroke="#556b5d" strokeWidth="1" />
              {/* x^2 */}
              <path d="M 40,20 Q 100,140 160,20" fill="none" stroke="#EDE5D8" strokeWidth="2" />
              {/* x^4 */}
              <path d="M 50,15 C 80,110 85,110 100,110 C 115,110 120,110 150,15" fill="none" stroke="#7A8F73" strokeWidth="2" strokeDasharray="4,2" />
              <text x="162" y="25" fill="#EDE5D8" fontSize="9">x²</text>
              <text x="152" y="15" fill="#7A8F73" fontSize="9">x⁴</text>
            </svg>
            <p className="text-[10px] text-[#A89F8D]">Pasan por (−1,1), (0,0) y (1,1). Simetría par.</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#dfa745]">Potencias Impares: f(x) = x³ y x⁵</div>
            <svg viewBox="0 0 200 150" className="w-full h-32 mx-auto">
              <line x1="10" y1="75" x2="190" y2="75" stroke="#556b5d" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="140" stroke="#556b5d" strokeWidth="1" />
              {/* x^3 */}
              <path d="M 40,135 Q 85,85 100,75 Q 115,65 160,15" fill="none" stroke="#EDE5D8" strokeWidth="2" />
              {/* x^5 */}
              <path d="M 55,140 C 85,80 90,75 100,75 C 110,75 115,70 145,10" fill="none" stroke="#dfa745" strokeWidth="2" strokeDasharray="4,2" />
              <text x="162" y="20" fill="#EDE5D8" fontSize="9">x³</text>
              <text x="146" y="12" fill="#dfa745" fontSize="9">x⁵</text>
            </svg>
            <p className="text-[10px] text-[#A89F8D]">Pasan por (−1,−1), (0,0) y (1,1). Simetría impar.</p>
          </div>
        </div>
      );
      break;

    case "funciones_raiz_n":
      diagramContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#7A8F73]">Raíz de Índice Par: f(x) = √x</div>
            <svg viewBox="0 0 200 130" className="w-full h-28 mx-auto">
              <line x1="20" y1="100" x2="190" y2="100" stroke="#556b5d" strokeWidth="1" />
              <line x1="50" y1="10" x2="50" y2="120" stroke="#556b5d" strokeWidth="1" />
              <path d="M 50,100 Q 80,40 180,30" fill="none" stroke="#7A8F73" strokeWidth="2.5" />
              <circle cx="50" cy="100" r="3.5" fill="#7A8F73" />
              <text x="130" y="25" fill="#7A8F73" fontSize="10" fontWeight="bold">y = √x</text>
              <text x="40" y="115" fill="#A89F8D" fontSize="9">(0,0)</text>
            </svg>
            <p className="text-[10.5px] text-[#EDE5D8]">Dominio: [0, ∞), Rango: [0, ∞)</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#dfa745]">Raíz de Índice Impar: f(x) = ∛x</div>
            <svg viewBox="0 0 200 130" className="w-full h-28 mx-auto">
              <line x1="10" y1="65" x2="190" y2="65" stroke="#556b5d" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="120" stroke="#556b5d" strokeWidth="1" />
              <path d="M 20,100 Q 70,80 100,65 Q 130,50 180,30" fill="none" stroke="#dfa745" strokeWidth="2.5" />
              <circle cx="100" cy="65" r="3.5" fill="#dfa745" />
              <text x="140" y="25" fill="#dfa745" fontSize="10" fontWeight="bold">y = ∛x</text>
            </svg>
            <p className="text-[10.5px] text-[#EDE5D8]">Dominio: ℝ, Rango: ℝ</p>
          </div>
        </div>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 22: PARIDAD Y COMPOSICIÓN
    // ══════════════════════════════════════════════════════════════
    case "funciones_simetria_par_impar":
      diagramContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#7A8F73]">Función Par: f(−x) = f(x)</div>
            <svg viewBox="0 0 200 130" className="w-full h-28 mx-auto">
              <line x1="15" y1="100" x2="185" y2="100" stroke="#556b5d" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="120" stroke="#7A8F73" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M 35,25 Q 100,130 165,25" fill="none" stroke="#EDE5D8" strokeWidth="2.5" />
              <circle cx="50" cy="45" r="3" fill="#dfa745" />
              <circle cx="150" cy="45" r="3" fill="#dfa745" />
              <text x="40" y="38" fill="#dfa745" fontSize="8.5">(−x, y)</text>
              <text x="140" y="38" fill="#dfa745" fontSize="8.5">(x, y)</text>
            </svg>
            <p className="text-[10.5px] text-[#A89F8D]">Simetría especular respecto al eje Y</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#dfa745]">Función Impar: f(−x) = −f(x)</div>
            <svg viewBox="0 0 200 130" className="w-full h-28 mx-auto">
              <line x1="15" y1="65" x2="185" y2="65" stroke="#556b5d" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="120" stroke="#556b5d" strokeWidth="1" />
              <path d="M 30,110 Q 75,75 100,65 Q 125,55 170,20" fill="none" stroke="#EDE5D8" strokeWidth="2.5" />
              <circle cx="45" cy="98" r="3" fill="#7A8F73" />
              <circle cx="155" cy="32" r="3" fill="#7A8F73" />
              <text x="25" y="94" fill="#7A8F73" fontSize="8.5">(−x, −y)</text>
              <text x="140" y="26" fill="#7A8F73" fontSize="8.5">(x, y)</text>
            </svg>
            <p className="text-[10.5px] text-[#A89F8D]">Simetría de rotación 180° respecto al origen (0,0)</p>
          </div>
        </div>
      );
      break;

    case "funciones_composicion_maquinas":
      diagramContent = (
        <svg viewBox="0 0 460 120" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Input x */}
          <text x="20" y="65" fill="#FAF6EE" fontSize="13" fontWeight="bold">x</text>
          <line x1="35" y1="60" x2="90" y2="60" stroke="#7A8F73" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Machine g */}
          <rect x="95" y="30" width="85" height="60" rx="8" fill="#223028" stroke="#7A8F73" strokeWidth="1.8" />
          <text x="137" y="55" fill="#FAF6EE" fontSize="11" fontWeight="bold" textAnchor="middle">Máquina g</text>
          <text x="137" y="72" fill="#7A8F73" fontSize="10" textAnchor="middle">g(x)</text>

          {/* Intermediate g(x) */}
          <line x1="180" y1="60" x2="250" y2="60" stroke="#dfa745" strokeWidth="2" />
          <text x="215" y="52" fill="#dfa745" fontSize="10.5" textAnchor="middle">g(x)</text>

          {/* Machine f */}
          <rect x="255" y="30" width="85" height="60" rx="8" fill="#223028" stroke="#dfa745" strokeWidth="1.8" />
          <text x="297" y="55" fill="#FAF6EE" fontSize="11" fontWeight="bold" textAnchor="middle">Máquina f</text>
          <text x="297" y="72" fill="#dfa745" fontSize="10" textAnchor="middle">f(u)</text>

          {/* Output (f o g)(x) */}
          <line x1="340" y1="60" x2="395" y2="60" stroke="#EDE5D8" strokeWidth="2" />
          <text x="405" y="65" fill="#FAF6EE" fontSize="11.5" fontWeight="bold">(f ∘ g)(x)</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 23: INVERSAS Y RECTA HORIZONTAL
    // ══════════════════════════════════════════════════════════════
    case "prueba_recta_horizontal":
      diagramContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#7A8F73]">Función 1-1 (Inyectiva)</div>
            <svg viewBox="0 0 200 130" className="w-full h-28 mx-auto">
              <line x1="15" y1="100" x2="185" y2="100" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="10" x2="40" y2="120" stroke="#556b5d" strokeWidth="1" />
              <path d="M 40,100 Q 80,40 180,30" fill="none" stroke="#7A8F73" strokeWidth="2.5" />
              {/* Horizontal line */}
              <line x1="20" y1="55" x2="185" y2="55" stroke="#dfa745" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="85" cy="55" r="3.5" fill="#dfa745" />
              <text x="95" y="50" fill="#dfa745" fontSize="8.5">1 solo corte</text>
            </svg>
            <p className="text-[10.5px] text-[#EDE5D8]">Pasa la prueba: Es Inyectiva</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#e06c75]">No es 1-1 (No Inyectiva)</div>
            <svg viewBox="0 0 200 130" className="w-full h-28 mx-auto">
              <line x1="15" y1="100" x2="185" y2="100" stroke="#556b5d" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="120" stroke="#556b5d" strokeWidth="1" />
              <path d="M 40,25 Q 100,120 160,25" fill="none" stroke="#EDE5D8" strokeWidth="2.5" />
              {/* Horizontal line */}
              <line x1="20" y1="55" x2="185" y2="55" stroke="#e06c75" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="58" cy="55" r="3.5" fill="#e06c75" />
              <circle cx="142" cy="55" r="3.5" fill="#e06c75" />
              <text x="100" y="50" fill="#e06c75" fontSize="8.5" textAnchor="middle">2 cortes: f(a) = f(b)</text>
            </svg>
            <p className="text-[10.5px] text-[#e06c75]">Falla la prueba: No tiene inversa</p>
          </div>
        </div>
      );
      break;

    case "inversa_simetria_identidad":
      diagramContent = (
        <svg viewBox="0 0 460 260" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid_inv" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(85,107,93,0.25)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect x="30" y="10" width="400" height="240" fill="url(#grid_inv)" rx="10" />

          {/* Coordinate Axes with Origin at (120, 200) => 1 unit = 30px */}
          <line x1="40" y1="200" x2="415" y2="200" stroke="#556b5d" strokeWidth="1.8" />
          <line x1="120" y1="250" x2="120" y2="15" stroke="#556b5d" strokeWidth="1.8" />
          <text x="420" y="204" fill="#A89F8D" fontSize="11" fontWeight="bold">x</text>
          <text x="124" y="20" fill="#A89F8D" fontSize="11" fontWeight="bold">y</text>

          {/* Tick numbers on X */}
          <text x="120" y="215" fill="#A89F8D" fontSize="9" textAnchor="middle">0</text>
          <text x="150" y="215" fill="#A89F8D" fontSize="9" textAnchor="middle">1</text>
          <text x="180" y="215" fill="#A89F8D" fontSize="9" textAnchor="middle">2</text>
          <text x="210" y="215" fill="#A89F8D" fontSize="9" textAnchor="middle">3</text>
          <text x="240" y="215" fill="#A89F8D" fontSize="9" textAnchor="middle">4</text>
          <text x="270" y="215" fill="#A89F8D" fontSize="9" textAnchor="middle">5</text>
          <text x="300" y="215" fill="#A89F8D" fontSize="9" textAnchor="middle">6</text>

          {/* Tick numbers on Y */}
          <text x="110" y="174" fill="#A89F8D" fontSize="9" textAnchor="end">1</text>
          <text x="110" y="144" fill="#A89F8D" fontSize="9" textAnchor="end">2</text>
          <text x="110" y="114" fill="#A89F8D" fontSize="9" textAnchor="end">3</text>
          <text x="110" y="84" fill="#A89F8D" fontSize="9" textAnchor="end">4</text>
          <text x="110" y="54" fill="#A89F8D" fontSize="9" textAnchor="end">5</text>

          {/* Line of Symmetry y = x */}
          <line x1="75" y1="245" x2="310" y2="10" stroke="#EDE5D8" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.8" />
          <text x="315" y="18" fill="#EDE5D8" fontSize="11" fontWeight="bold">y = x</text>

          {/* Function f(x) = sqrt(2x + 1) */}
          <path d="M 105,200 Q 130,165 240,110 T 360,70" fill="none" stroke="#7A8F73" strokeWidth="3" />
          <text x="365" y="70" fill="#7A8F73" fontSize="11.5" fontWeight="bold">y = f(x) = √(2x+1)</text>

          {/* Inverse Function f^-1(x) = (x^2 - 1)/2 for x >= 0 */}
          <path d="M 120,215 Q 165,190 210,80 T 230,15" fill="none" stroke="#dfa745" strokeWidth="3" />
          <text x="180" y="30" fill="#dfa745" fontSize="11.5" fontWeight="bold">y = f⁻¹(x) = (x²−1)/2</text>

          {/* Symmetric dashed connecting lines */}
          <line x1="120" y1="170" x2="150" y2="200" stroke="rgba(217,203,182,0.45)" strokeWidth="1.2" strokeDasharray="3,3" />
          <circle cx="120" cy="170" r="4" fill="#7A8F73" stroke="#FAF6EE" strokeWidth="1" />
          <circle cx="150" cy="200" r="4" fill="#dfa745" stroke="#FAF6EE" strokeWidth="1" />
          <text x="90" y="166" fill="#7A8F73" fontSize="9.5" fontWeight="bold">(0, 1)</text>
          <text x="155" y="215" fill="#dfa745" fontSize="9.5" fontWeight="bold">(1, 0)</text>

          <line x1="240" y1="110" x2="210" y2="80" stroke="rgba(217,203,182,0.45)" strokeWidth="1.2" strokeDasharray="3,3" />
          <circle cx="240" cy="110" r="4" fill="#7A8F73" stroke="#FAF6EE" strokeWidth="1" />
          <circle cx="210" cy="80" r="4" fill="#dfa745" stroke="#FAF6EE" strokeWidth="1" />
          <text x="248" y="118" fill="#7A8F73" fontSize="9.5" fontWeight="bold">(4, 3)</text>
          <text x="168" y="76" fill="#dfa745" fontSize="9.5" fontWeight="bold">(3, 4)</text>

          {/* Intersection Point on y = x */}
          <circle cx="192.4" cy="127.6" r="4.5" fill="#EDE5D8" stroke="#dfa745" strokeWidth="1.5" />
          <text x="198" y="138" fill="#EDE5D8" fontSize="8.5">Punto fijo sobre y = x</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 24: EXPONENCIALES
    // ══════════════════════════════════════════════════════════════
    case "exponencial_bases_comparacion":
      diagramContent = (
        <svg viewBox="0 0 460 230" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid_exp" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(85,107,93,0.2)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect x="25" y="15" width="410" height="205" fill="url(#grid_exp)" rx="10" />

          <line x1="30" y1="170" x2="430" y2="170" stroke="#556b5d" strokeWidth="1.8" />
          <line x1="230" y1="215" x2="230" y2="20" stroke="#556b5d" strokeWidth="1.8" />
          <text x="435" y="174" fill="#A89F8D" fontSize="11" fontWeight="bold">x</text>
          <text x="234" y="25" fill="#A89F8D" fontSize="11" fontWeight="bold">y</text>

          {/* Common point (0, 1) */}
          <circle cx="230" cy="130" r="4.5" fill="#FAF6EE" stroke="#dfa745" strokeWidth="1.5" />
          <text x="240" y="132" fill="#FAF6EE" fontSize="10" fontWeight="bold">(0, 1)</text>

          {/* y = 3^x */}
          <path d="M 60,169 Q 205,165 260,25" fill="none" stroke="#7A8F73" strokeWidth="2.5" />
          <text x="265" y="30" fill="#7A8F73" fontSize="10.5" fontWeight="bold">y = 3ˣ</text>

          {/* y = 2^x */}
          <path d="M 40,169 Q 200,160 290,40" fill="none" stroke="#dfa745" strokeWidth="2.5" />
          <text x="295" y="45" fill="#dfa745" fontSize="10.5" fontWeight="bold">y = 2ˣ</text>

          {/* y = (1/2)^x */}
          <path d="M 170,40 Q 260,160 420,169" fill="none" stroke="#C8B99D" strokeWidth="2.5" strokeDasharray="5,3" />
          <text x="125" y="45" fill="#C8B99D" fontSize="10.5" fontWeight="bold">y = (½)ˣ = 2⁻ˣ</text>

          <text x="45" y="190" fill="#A89F8D" fontSize="10">Asíntota horizontal: y = 0</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 25: LOGARITMOS
    // ══════════════════════════════════════════════════════════════
    case "logaritmo_exponencial_inversa":
      diagramContent = (
        <svg viewBox="0 0 460 260" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid_log" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(85,107,93,0.25)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect x="30" y="10" width="400" height="240" fill="url(#grid_log)" rx="10" />

          {/* Coordinate Axes with Origin at (150, 180) */}
          <line x1="40" y1="180" x2="415" y2="180" stroke="#556b5d" strokeWidth="1.8" />
          <line x1="150" y1="245" x2="150" y2="15" stroke="#556b5d" strokeWidth="1.8" />
          <text x="420" y="184" fill="#A89F8D" fontSize="11" fontWeight="bold">x</text>
          <text x="154" y="20" fill="#A89F8D" fontSize="11" fontWeight="bold">y</text>

          {/* Line of Symmetry y = x */}
          <line x1="85" y1="245" x2="315" y2="15" stroke="#EDE5D8" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.8" />
          <text x="320" y="22" fill="#EDE5D8" fontSize="11" fontWeight="bold">y = x</text>

          {/* Exponential y = e^x */}
          <path d="M 50,178 Q 145,175 182,93 T 202,18" fill="none" stroke="#7A8F73" strokeWidth="3" />
          <text x="208" y="25" fill="#7A8F73" fontSize="11.5" fontWeight="bold">y = eˣ</text>

          {/* Logarithm y = ln(x) */}
          <path d="M 152,245 Q 155,155 237,148 T 390,110" fill="none" stroke="#dfa745" strokeWidth="3" />
          <text x="395" y="112" fill="#dfa745" fontSize="11.5" fontWeight="bold">y = ln(x)</text>

          {/* Symmetric dashed connecting lines */}
          <line x1="150" y1="148" x2="182" y2="180" stroke="rgba(217,203,182,0.45)" strokeWidth="1.2" strokeDasharray="3,3" />
          <circle cx="150" cy="148" r="4" fill="#7A8F73" stroke="#FAF6EE" strokeWidth="1" />
          <circle cx="182" cy="180" r="4" fill="#dfa745" stroke="#FAF6EE" strokeWidth="1" />
          <text x="120" y="145" fill="#7A8F73" fontSize="9.5" fontWeight="bold">(0, 1)</text>
          <text x="186" y="196" fill="#dfa745" fontSize="9.5" fontWeight="bold">(1, 0)</text>

          <line x1="182" y1="93" x2="237" y2="148" stroke="rgba(217,203,182,0.45)" strokeWidth="1.2" strokeDasharray="3,3" />
          <circle cx="182" cy="93" r="4" fill="#7A8F73" stroke="#FAF6EE" strokeWidth="1" />
          <circle cx="237" cy="148" r="4" fill="#dfa745" stroke="#FAF6EE" strokeWidth="1" />
          <text x="148" y="90" fill="#7A8F73" fontSize="9.5" fontWeight="bold">(1, e)</text>
          <text x="242" y="156" fill="#dfa745" fontSize="9.5" fontWeight="bold">(e, 1)</text>

          {/* Asymptotes indicators */}
          <text x="50" y="195" fill="#7A8F73" fontSize="9">Asíntota horizontal: y = 0</text>
          <text x="60" y="240" fill="#dfa745" fontSize="9">Asíntota vertical: x = 0</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 26: ÁNGULOS Y TRIGONOMETRÍA DE ÁNGULOS
    // ══════════════════════════════════════════════════════════════
    case "triangulo_rectangulo_razones":
      diagramContent = (
        <svg viewBox="0 0 460 200" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Right triangle */}
          <polygon points="60,160 320,160 320,40" fill="rgba(122,143,115,0.12)" stroke="#7A8F73" strokeWidth="2.5" />
          {/* Right angle symbol at (320, 160) */}
          <polyline points="305,160 305,145 320,145" fill="none" stroke="#7A8F73" strokeWidth="1.5" />

          {/* Angle theta arc at (60, 160) */}
          <path d="M 100,160 A 40 40 0 0 0 92,145" fill="none" stroke="#dfa745" strokeWidth="2" />
          <text x="105" y="152" fill="#dfa745" fontSize="12" fontWeight="bold">θ</text>

          {/* Labels */}
          <text x="190" y="178" fill="#EDE5D8" fontSize="11" fontWeight="bold" textAnchor="middle">Cateto Adyacente (x)</text>
          <text x="330" y="105" fill="#EDE5D8" fontSize="11" fontWeight="bold">Cateto Opuesto (y)</text>
          <text x="175" y="90" fill="#FAF6EE" fontSize="11" fontWeight="bold">Hipotenusa r = √(x²+y²)</text>
        </svg>
      );
      break;

    case "angulos_notables_triangulos_geometricos":
      diagramContent = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#7A8F73]">Triángulo 45° - 45° - 90°</div>
            <svg viewBox="0 0 160 140" className="w-full h-28 mx-auto">
              <polygon points="30,120 130,120 130,20" fill="rgba(122,143,115,0.15)" stroke="#7A8F73" strokeWidth="2" />
              <polyline points="118,120 118,108 130,108" fill="none" stroke="#7A8F73" strokeWidth="1.2" />
              <text x="80" y="134" fill="#EDE5D8" fontSize="9.5">1</text>
              <text x="135" y="75" fill="#EDE5D8" fontSize="9.5">1</text>
              <text x="65" y="65" fill="#dfa745" fontSize="10" fontWeight="bold">√2</text>
              <text x="50" y="115" fill="#dfa745" fontSize="8.5">45°</text>
              <text x="110" y="45" fill="#dfa745" fontSize="8.5">45°</text>
            </svg>
            <p className="text-[10px] text-[#A89F8D]">sen(45°) = cos(45°) = √2/2, tan(45°) = 1</p>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#dfa745]">Triángulo 30° - 60° - 90°</div>
            <svg viewBox="0 0 160 140" className="w-full h-28 mx-auto">
              <polygon points="20,120 140,120 140,30" fill="rgba(223,167,69,0.15)" stroke="#dfa745" strokeWidth="2" />
              <polyline points="128,120 128,108 140,108" fill="none" stroke="#dfa745" strokeWidth="1.2" />
              <text x="80" y="134" fill="#EDE5D8" fontSize="9.5">√3</text>
              <text x="145" y="80" fill="#EDE5D8" fontSize="9.5">1</text>
              <text x="70" y="65" fill="#7A8F73" fontSize="10" fontWeight="bold">2</text>
              <text x="45" y="115" fill="#dfa745" fontSize="8.5">30°</text>
              <text x="120" y="55" fill="#dfa745" fontSize="8.5">60°</text>
            </svg>
            <p className="text-[10px] text-[#A89F8D]">sen(30°) = 1/2, cos(30°) = √3/2, tan(30°) = √3/3</p>
          </div>
        </div>
      );
      break;

    case "angulo_referencia_cuadrantes":
      diagramContent = (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.1)] text-center space-y-1">
            <div className="text-[11px] font-bold text-[#7A8F73]">Cuadrante I</div>
            <svg viewBox="0 0 80 80" className="w-full h-16 mx-auto">
              <line x1="5" y1="40" x2="75" y2="40" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="40" x2="68" y2="15" stroke="#dfa745" strokeWidth="2" />
              <text x="50" y="32" fill="#dfa745" fontSize="8">θ̄ = θ</text>
            </svg>
            <div className="text-[9px] text-[#EDE5D8]">θ̄ = θ</div>
          </div>

          <div className="p-2 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.1)] text-center space-y-1">
            <div className="text-[11px] font-bold text-[#7A8F73]">Cuadrante II</div>
            <svg viewBox="0 0 80 80" className="w-full h-16 mx-auto">
              <line x1="5" y1="40" x2="75" y2="40" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="40" x2="12" y2="15" stroke="#dfa745" strokeWidth="2" />
              <text x="18" y="32" fill="#dfa745" fontSize="8">θ̄</text>
            </svg>
            <div className="text-[9px] text-[#EDE5D8]">θ̄ = π − θ (180°−θ)</div>
          </div>

          <div className="p-2 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.1)] text-center space-y-1">
            <div className="text-[11px] font-bold text-[#7A8F73]">Cuadrante III</div>
            <svg viewBox="0 0 80 80" className="w-full h-16 mx-auto">
              <line x1="5" y1="40" x2="75" y2="40" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="40" x2="12" y2="65" stroke="#dfa745" strokeWidth="2" />
              <text x="18" y="52" fill="#dfa745" fontSize="8">θ̄</text>
            </svg>
            <div className="text-[9px] text-[#EDE5D8]">θ̄ = θ − π (θ−180°)</div>
          </div>

          <div className="p-2 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.1)] text-center space-y-1">
            <div className="text-[11px] font-bold text-[#7A8F73]">Cuadrante IV</div>
            <svg viewBox="0 0 80 80" className="w-full h-16 mx-auto">
              <line x1="5" y1="40" x2="75" y2="40" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="5" x2="40" y2="75" stroke="#556b5d" strokeWidth="1" />
              <line x1="40" y1="40" x2="68" y2="65" stroke="#dfa745" strokeWidth="2" />
              <text x="50" y="52" fill="#dfa745" fontSize="8">θ̄</text>
            </svg>
            <div className="text-[9px] text-[#EDE5D8]">θ̄ = 2π − θ (360°−θ)</div>
          </div>
        </div>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 27: LEY DE SENO Y COSENO
    // ══════════════════════════════════════════════════════════════
    case "angulo_elevacion_depresion":
      diagramContent = (
        <svg viewBox="0 0 460 170" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Observer left */}
          <circle cx="60" cy="110" r="5" fill="#dfa745" />
          <text x="35" y="130" fill="#EDE5D8" fontSize="10">Observador A</text>

          {/* Horizontal line */}
          <line x1="60" y1="110" x2="260" y2="110" stroke="#556b5d" strokeWidth="1.5" strokeDasharray="4,4" />
          <text x="140" y="105" fill="#A89F8D" fontSize="9.5">Línea Horizontal</text>

          {/* Line of sight UP to Object B */}
          <line x1="60" y1="110" x2="240" y2="30" stroke="#7A8F73" strokeWidth="2" />
          <circle cx="240" cy="30" r="5" fill="#7A8F73" />
          <text x="248" y="32" fill="#FAF6EE" fontSize="10">Objeto elevado</text>
          <text x="115" y="85" fill="#dfa745" fontSize="10" fontWeight="bold">Ángulo Elevación</text>

          {/* Observer right / Line of sight DOWN */}
          <circle cx="300" cy="40" r="5" fill="#dfa745" />
          <line x1="300" y1="40" x2="430" y2="40" stroke="#556b5d" strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="300" y1="40" x2="410" y2="130" stroke="#C8B99D" strokeWidth="2" />
          <circle cx="410" cy="130" r="5" fill="#C8B99D" />
          <text x="350" y="70" fill="#dfa745" fontSize="10" fontWeight="bold">Ángulo Depresión</text>
          <text x="385" y="145" fill="#EDE5D8" fontSize="10">Objeto bajo</text>
        </svg>
      );
      break;

    case "ley_senos_triangulo_general":
      diagramContent = (
        <svg viewBox="0 0 460 200" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Oblique triangle ABC */}
          <polygon points="60,160 380,160 220,40" fill="rgba(122,143,115,0.1)" stroke="#7A8F73" strokeWidth="2.5" />
          {/* Height h from C to AB */}
          <line x1="220" y1="40" x2="220" y2="160" stroke="#dfa745" strokeWidth="1.8" strokeDasharray="4,3" />
          <polyline points="208,160 208,148 220,148" fill="none" stroke="#dfa745" strokeWidth="1.2" />
          <text x="228" y="105" fill="#dfa745" fontSize="11" fontWeight="bold">h = c·sen(B) = b·sen(C)</text>

          {/* Vertices */}
          <text x="45" y="170" fill="#FAF6EE" fontSize="12" fontWeight="bold">B</text>
          <text x="390" y="170" fill="#FAF6EE" fontSize="12" fontWeight="bold">C</text>
          <text x="215" y="30" fill="#FAF6EE" fontSize="12" fontWeight="bold">A</text>

          {/* Opposing sides */}
          <text x="220" y="180" fill="#EDE5D8" fontSize="11" textAnchor="middle">lado a</text>
          <text x="120" y="90" fill="#EDE5D8" fontSize="11">lado c</text>
          <text x="310" y="90" fill="#EDE5D8" fontSize="11">lado b</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 28: CIRCUNFERENCIA UNITARIA Y ONDAS
    // ══════════════════════════════════════════════════════════════
    case "circunferencia_unitaria_completa":
      diagramContent = (
        <svg viewBox="0 0 380 380" className="w-full max-w-sm mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Coordinate axes */}
          <line x1="20" y1="190" x2="360" y2="190" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="190" y1="20" x2="190" y2="360" stroke="#556b5d" strokeWidth="1.5" />
          <text x="365" y="194" fill="#A89F8D" fontSize="10">x</text>
          <text x="194" y="25" fill="#A89F8D" fontSize="10">y</text>

          {/* Unit circle */}
          <circle cx="190" cy="190" r="130" fill="none" stroke="#7A8F73" strokeWidth="2.5" />

          {/* Key angles rays */}
          {/* 30 deg (pi/6) */}
          <line x1="190" y1="190" x2="302" y2="125" stroke="rgba(217,203,182,0.3)" strokeWidth="1" />
          <circle cx="302" cy="125" r="3.5" fill="#dfa745" />
          <text x="310" y="125" fill="#EDE5D8" fontSize="8.5">(√3/2, ½) π/6</text>

          {/* 45 deg (pi/4) */}
          <line x1="190" y1="190" x2="282" y2="98" stroke="rgba(217,203,182,0.3)" strokeWidth="1" />
          <circle cx="282" cy="98" r="3.5" fill="#7A8F73" />
          <text x="290" y="95" fill="#FAF6EE" fontSize="8.5">(√2/2, √2/2) π/4</text>

          {/* 60 deg (pi/3) */}
          <line x1="190" y1="190" x2="255" y2="77" stroke="rgba(217,203,182,0.3)" strokeWidth="1" />
          <circle cx="255" cy="77" r="3.5" fill="#dfa745" />
          <text x="260" y="70" fill="#EDE5D8" fontSize="8.5">(½, √3/2) π/3</text>

          {/* Axis intercepts */}
          <circle cx="320" cy="190" r="4" fill="#EDE5D8" />
          <text x="325" y="185" fill="#EDE5D8" fontSize="9">(1, 0) 0</text>

          <circle cx="190" cy="60" r="4" fill="#EDE5D8" />
          <text x="195" y="55" fill="#EDE5D8" fontSize="9">(0, 1) π/2</text>

          <circle cx="60" cy="190" r="4" fill="#EDE5D8" />
          <text x="15" y="185" fill="#EDE5D8" fontSize="9">(−1, 0) π</text>

          <circle cx="190" cy="320" r="4" fill="#EDE5D8" />
          <text x="195" y="335" fill="#EDE5D8" fontSize="9">(0, −1) 3π/2</text>
        </svg>
      );
      break;

    case "graficas_seno_coseno":
      diagramContent = (
        <div className="space-y-4">
          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#7A8F73]">Función Seno: y = sen(x) (Periodo 2π, Rango [−1, 1])</div>
            <svg viewBox="0 0 460 140" className="w-full h-28 mx-auto">
              <line x1="20" y1="70" x2="440" y2="70" stroke="#556b5d" strokeWidth="1.2" />
              <line x1="230" y1="10" x2="230" y2="130" stroke="#556b5d" strokeWidth="1.2" />
              {/* Sine curve [-2pi, 2pi] */}
              <path d="M 50,70 Q 95,15 140,70 Q 185,125 230,70 Q 275,15 320,70 Q 365,125 410,70" fill="none" stroke="#7A8F73" strokeWidth="2.5" />
              {/* Labels */}
              <text x="220" y="85" fill="#A89F8D" fontSize="8.5">0</text>
              <text x="315" y="85" fill="#A89F8D" fontSize="8.5">π</text>
              <text x="405" y="85" fill="#A89F8D" fontSize="8.5">2π</text>
              <text x="135" y="85" fill="#A89F8D" fontSize="8.5">−π</text>
              <text x="40" y="85" fill="#A89F8D" fontSize="8.5">−2π</text>
            </svg>
          </div>

          <div className="p-3 bg-[#223028]/80 rounded-xl border border-[rgba(217,203,182,0.12)] text-center space-y-2">
            <div className="text-xs font-bold text-[#dfa745]">Función Coseno: y = cos(x) (Periodo 2π, Rango [−1, 1])</div>
            <svg viewBox="0 0 460 140" className="w-full h-28 mx-auto">
              <line x1="20" y1="70" x2="440" y2="70" stroke="#556b5d" strokeWidth="1.2" />
              <line x1="230" y1="10" x2="230" y2="130" stroke="#556b5d" strokeWidth="1.2" />
              {/* Cosine curve [-2pi, 2pi] */}
              <path d="M 50,15 Q 95,70 140,125 Q 185,70 230,15 Q 275,70 320,125 Q 365,70 410,15" fill="none" stroke="#dfa745" strokeWidth="2.5" />
              <text x="220" y="85" fill="#A89F8D" fontSize="8.5">0</text>
              <text x="315" y="85" fill="#A89F8D" fontSize="8.5">π</text>
              <text x="405" y="85" fill="#A89F8D" fontSize="8.5">2π</text>
              <text x="135" y="85" fill="#A89F8D" fontSize="8.5">−π</text>
              <text x="40" y="85" fill="#A89F8D" fontSize="8.5">−2π</text>
            </svg>
          </div>
        </div>
      );
      break;

    case "grafica_tangente_asintotas":
      diagramContent = (
        <svg viewBox="0 0 460 180" className="w-full max-w-lg mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="90" x2="440" y2="90" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="230" y1="10" x2="230" y2="170" stroke="#556b5d" strokeWidth="1.5" />

          {/* Asymptotes at -3pi/2, -pi/2, pi/2, 3pi/2 */}
          <line x1="110" y1="10" x2="110" y2="170" stroke="#e06c75" strokeWidth="1.2" strokeDasharray="4,4" />
          <line x1="170" y1="10" x2="170" y2="170" stroke="#e06c75" strokeWidth="1.2" strokeDasharray="4,4" />
          <line x1="290" y1="10" x2="290" y2="170" stroke="#e06c75" strokeWidth="1.2" strokeDasharray="4,4" />
          <line x1="350" y1="10" x2="350" y2="170" stroke="#e06c75" strokeWidth="1.2" strokeDasharray="4,4" />

          {/* Branch in (-pi/2, pi/2) */}
          <path d="M 180,165 Q 220,120 230,90 Q 240,60 280,15" fill="none" stroke="#dfa745" strokeWidth="2.5" />
          {/* Branch in (pi/2, 3pi/2) */}
          <path d="M 300,165 Q 340,120 350,90 Q 360,60 400,15" fill="none" stroke="#dfa745" strokeWidth="2.5" />
          {/* Branch in (-3pi/2, -pi/2) */}
          <path d="M 60,165 Q 100,120 110,90 Q 120,60 160,15" fill="none" stroke="#dfa745" strokeWidth="2.5" />

          <text x="295" y="25" fill="#e06c75" fontSize="9">x = π/2</text>
          <text x="140" y="25" fill="#e06c75" fontSize="9">x = −π/2</text>
          <text x="235" y="105" fill="#FAF6EE" fontSize="10" fontWeight="bold">(0,0)</text>
          <text x="375" y="165" fill="#dfa745" fontSize="10" fontWeight="bold">Periodo π</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 29: IDENTIDADES TRIGONOMÉTRICAS
    // ══════════════════════════════════════════════════════════════
    case "identidad_suma_angulos_geometrica":
      diagramContent = (
        <svg viewBox="0 0 460 220" className="w-full max-w-md mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          {/* Geometric deduction rectangles and triangles */}
          <rect x="80" y="40" width="280" height="150" fill="rgba(122,143,115,0.06)" stroke="#556b5d" strokeWidth="1" />
          <line x1="80" y1="190" x2="360" y2="190" stroke="#7A8F73" strokeWidth="2" />

          {/* Triangles with angles s and t */}
          <polyline points="80,190 290,60 360,190" fill="rgba(223,167,69,0.15)" stroke="#dfa745" strokeWidth="2" />
          <line x1="80" y1="190" x2="290" y2="190" stroke="#EDE5D8" strokeWidth="1.5" />

          <text x="115" y="180" fill="#7A8F73" fontSize="11" fontWeight="bold">s</text>
          <text x="145" y="150" fill="#dfa745" fontSize="11" fontWeight="bold">t</text>
          <text x="240" y="110" fill="#FAF6EE" fontSize="10.5">sen(s+t) = sen s·cos t + cos s·sen t</text>
          <text x="240" y="130" fill="#C8B99D" fontSize="10.5">cos(s+t) = cos s·cos t − sen s·sen t</text>
        </svg>
      );
      break;

    // ══════════════════════════════════════════════════════════════
    // MÓDULO 30: ECUACIONES TRIGONOMÉTRICAS
    // ══════════════════════════════════════════════════════════════
    case "ecuaciones_trig_circulo_soluciones":
      diagramContent = (
        <svg viewBox="0 0 360 240" className="w-full max-w-sm mx-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="20" y1="120" x2="340" y2="120" stroke="#556b5d" strokeWidth="1.5" />
          <line x1="180" y1="15" x2="180" y2="225" stroke="#556b5d" strokeWidth="1.5" />

          <circle cx="180" cy="120" r="90" fill="none" stroke="#7A8F73" strokeWidth="2" />

          {/* Horizontal lines y = 1/2 and y = -1/2 */}
          <line x1="80" y1="75" x2="280" y2="75" stroke="#7A8F73" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="285" y="78" fill="#7A8F73" fontSize="9">sen x = ½</text>
          <circle cx="258" cy="75" r="4" fill="#7A8F73" />
          <circle cx="102" cy="75" r="4" fill="#7A8F73" />
          <text x="265" y="68" fill="#FAF6EE" fontSize="9" fontWeight="bold">π/6</text>
          <text x="75" y="68" fill="#FAF6EE" fontSize="9" fontWeight="bold">5π/6</text>

          <line x1="80" y1="165" x2="280" y2="165" stroke="#dfa745" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="285" y="168" fill="#dfa745" fontSize="9">sen x = −½</text>
          <circle cx="258" cy="165" r="4" fill="#dfa745" />
          <circle cx="102" cy="165" r="4" fill="#dfa745" />
          <text x="265" y="180" fill="#dfa745" fontSize="9" fontWeight="bold">11π/6</text>
          <text x="70" y="180" fill="#dfa745" fontSize="9" fontWeight="bold">7π/6</text>
        </svg>
      );
      break;

    default:
      return null;
  }

  return (
    <figure className="my-6 p-4 sm:p-5 rounded-2xl bg-[#1e2b23]/70 border border-[rgba(217,203,182,0.16)] shadow-inner space-y-3">
      {diagramContent}
      {caption && (
        <figcaption className="text-center text-xs text-[#A89F8D] font-serif italic tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
