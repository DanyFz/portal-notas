import Link from "next/link";
import { notFound } from "next/navigation";
import { MathText } from "@/components/MathText";

/* ──────────────────────────────────────────────────────────────
   DATA TYPES
   ────────────────────────────────────────────────────────────── */

export interface TheoryModule {
  num: number;
  title: string;
  pdfPages: string;
  tag: string;
  sections: TheorySection[];
}

export interface TheorySection {
  heading: string;
  level: 1 | 2 | 3;
  content: string[];
}

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
            📜 TEOREMA / LEY
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
    if (trimmed.startsWith("• (a + b)² ≠") || trimmed.startsWith("• √(a") || trimmed.startsWith("• 1/a +") || trimmed.startsWith("Es muy importante")) {
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
   DATA: Modules 1-10 with Complete LaTeX Math Notation
   ────────────────────────────────────────────────────────────── */
function buildModules(): Record<number, TheoryModule> {
  const modules: Record<number, TheoryModule> = {};

  // ─── MODULE 1 ───────────────────────────────────────────────
  modules[1] = {
    num: 1,
    title: "Teoría Intuitiva de Conjuntos",
    pdfPages: "Págs. 1 – 3",
    tag: "Álgebra",
    sections: [
      {
        heading: "Nociones sobre Conjuntos",
        level: 1,
        content: [
          "Un conjunto es una colección bien definida de objetos, llamados **elementos** del conjunto.",
          "Un conjunto puede describirse de dos formas fundamentales:",
          "• **Por extensión:** haciendo una lista explícita de sus elementos, separados por comas y encerrados entre llaves.",
          "• **Por comprensión:** dando la propiedad o condición matemática que cumplen exclusivamente sus elementos.",
          "Ejemplo: El conjunto $A = \\{x \\mid x \\text{ es una vocal de la palabra eucalipto}\\}$ está descrito por comprensión. Su descripción por extensión es $A = \\{a, e, i, o, u\\}$.",
          "• Si un conjunto carece de elementos se denomina **conjunto vacío** y se denota por $\\emptyset$ ó $\\{\\}$.",
          "• Si un conjunto es vacío o su número de elementos es un número natural $n \\in \\mathbb{N}$, se dice que el conjunto es **finito**. En caso contrario, se dice que es **infinito**.",
          "Ejemplo: Sea $A = \\{x \\mid x \\text{ es una vocal cerrada en la palabra \"espejo\"}\\}$. Como en \"espejo\" sólo están las vocales abiertas $e, o$, tenemos que $A = \\emptyset$.",
          "Ejemplo: El conjunto $A = \\{1, 2, 3\\}$ es finito con $3$ elementos. Mientras que $B = \\left\\{ \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, \\dots \\right\\}$ es un conjunto infinito.",
        ],
      },
      {
        heading: "Pertenencia e Inclusión de Subconjuntos",
        level: 2,
        content: [
          "• **Pertenencia:** Si $A$ es un conjunto y $a$ es un objeto, escribimos $a \\in A$ si $a$ pertenece a $A$. En caso contrario, escribimos $a \\notin A$.",
          "Ejemplo: Si $A = \\left\\{\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}\\right\\}$, entonces $\\frac{1}{2} \\in A$ y $5 \\notin A$.",
          "• **Subconjuntos (Inclusión):** Decimos que $A$ es subconjunto de $B$, denotado $A \\subseteq B$, si todo elemento de $A$ es también elemento de $B$:",
          "$$A \\subseteq B \\iff (\\forall x \\in A \\implies x \\in B)$$",
          "Si existe al menos un elemento en $A$ que no pertenece a $B$, entonces $A \\nsubseteq B$.",
          "Ejemplo: Sean $A = \\{a, e, i, o, u\\}$ y $B = \\{x \\mid x \\text{ es una letra del abecedario}\\}$. Entonces $A \\subseteq B$, pero $B \\nsubseteq A$.",
        ],
      },
      {
        heading: "Propiedades de la Inclusión e Igualdad de Conjuntos",
        level: 2,
        content: [
          "Teorema: Para cualesquiera conjuntos $A, B, C$ se satisfacen las siguientes propiedades:",
          "• $\\emptyset \\subseteq A$ (el conjunto vacío es subconjunto de todo conjunto).",
          "• $A \\subseteq A$ (reflexividad).",
          "• Si $A \\subseteq B$ y $B \\subseteq C$, entonces $A \\subseteq C$ (transitividad).",
          "Definición: Dos conjuntos $A$ y $B$ son **iguales** ($A = B$) si y sólo si tienen exactamente los mismos elementos:",
          "$$A = B \\iff (A \\subseteq B \\land B \\subseteq A)$$",
          "Ejemplo: Sean $A = \\{x \\mid x \\text{ es vocal de \"mundo\"}\\}$ y $B = \\{u, o\\}$, entonces $A = B$. Además, en un conjunto no importa el orden ni la repetición: $\\{1, 3, 7\\} = \\{1, 3, 7, 1\\}$.",
        ],
      },
      {
        heading: "Operaciones entre Conjuntos",
        level: 1,
        content: [
          "Sean $A$ y $B$ subconjuntos de un conjunto universal $U$. Se definen las siguientes operaciones:",
          "• **1. Unión ($A \\cup B$):** Conjunto formado por los elementos que están en $A$, en $B$ o en ambos:",
          "$$A \\cup B = \\{x \\in U \\mid x \\in A \\lor x \\in B\\}$$",
          "Ejemplo: Sean $A = \\{1, 3, 5, 7, 9\\}$ y $B = \\{0, 3, 6, 9, 12\\}$. Entonces $A \\cup B = \\{0, 1, 3, 5, 6, 7, 9, 12\\}$.",
          "• **2. Intersección ($A \\cap B$):** Conjunto de elementos comunes a ambos conjuntos:",
          "$$A \\cap B = \\{x \\in U \\mid x \\in A \\land x \\in B\\}$$",
          "Ejemplo: Con los mismos conjuntos, $A \\cap B = \\{3, 9\\}$. Si $A \\cap B = \\emptyset$, se dice que $A$ y $B$ son **disjuntos**.",
          "• **3. Complemento ($A^c$ ó $A'$):** Elementos del universal $U$ que no pertenecen a $A$:",
          "$$A^c = \\{x \\in U \\mid x \\notin A\\}$$",
          "• **4. Diferencia ($A \\setminus B$ ó $A - B$):** Elementos que pertenecen a $A$ pero no a $B$:",
          "$$A \\setminus B = \\{x \\in U \\mid x \\in A \\land x \\notin B\\} = A \\cap B^c$$",
          "Ejemplo: Si $U = \\{0, 1, 2, 3, 4, 5, 6, 7, 8, 9\\}$, $A = \\{1, 3, 5, 7, 9\\}$ y $B = \\{0, 3, 6, 9\\}$:",
          "• $A^c = \\{0, 2, 4, 6, 8\\}$",
          "• $A \\setminus B = \\{1, 5, 7\\}$",
          "• $B \\setminus A = \\{0, 6\\}$",
        ],
      },
      {
        heading: "Leyes del Álgebra de Conjuntos y De Morgan",
        level: 2,
        content: [
          "Teorema: Para cualesquiera subconjuntos $A, B, C \\subseteq U$ se cumplen las siguientes leyes:",
          "• **Idempotencia:** $A \\cup A = A$, $\\quad A \\cap A = A$.",
          "• **Conmutatividad:** $A \\cup B = B \\cup A$, $\\quad A \\cap B = B \\cap A$.",
          "• **Asociatividad:** $(A \\cup B) \\cup C = A \\cup (B \\cup C)$, $\\quad (A \\cap B) \\cap C = A \\cap (B \\cap C)$.",
          "• **Distributividad:**",
          "$$A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)$$",
          "$$A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$$",
          "• **Leyes de De Morgan:**",
          "$$(A \\cup B)^c = A^c \\cap B^c$$",
          "$$(A \\cap B)^c = A^c \\cup B^c$$",
          "• **Complemento doble:** $(A^c)^c = A$, $\\quad U^c = \\emptyset$, $\\quad \\emptyset^c = U$.",
        ],
      },
    ],
  };

  // ─── MODULE 2 ───────────────────────────────────────────────
  modules[2] = {
    num: 2,
    title: "Propiedades de los Números Reales y Fraccionarios",
    pdfPages: "Págs. 4 – 7",
    tag: "Álgebra",
    sections: [
      {
        heading: "Los Sistemas Numéricos",
        level: 1,
        content: [
          "El conjunto de los números reales $\\mathbb{R}$ está constituido por varios subconjuntos estructurales:",
          "• **Números Naturales ($\\mathbb{N}$):** $\\mathbb{N} = \\{1, 2, 3, 4, 5, \\dots\\}$, utilizados para contar.",
          "• **Números Enteros ($\\mathbb{Z}$):** $\\mathbb{Z} = \\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}$.",
          "• **Números Racionales ($\\mathbb{Q}$):** Números que pueden expresarse como cociente de dos enteros con denominador no nulo:",
          "$$\\mathbb{Q} = \\left\\{ \\frac{a}{b} \\;\\middle|\\; a, b \\in \\mathbb{Z}, \\; b \\neq 0 \\right\\}$$",
          "Todo número racional tiene una representación decimal finita (ej. $\\frac{1}{4} = 0.25$) o decimal periódica (ej. $\\frac{1}{3} = 0.333\\dots = 0.\\overline{3}$).",
          "• **Números Irracionales ($\\mathbb{I}$):** Números con representación decimal infinita no periódica. Ejemplos: $\\sqrt{2} \\approx 1.4142\\dots$, $\\pi \\approx 3.14159\\dots$, $e \\approx 2.71828\\dots$.",
          "• **Conjunto de los Reales ($\\mathbb{R}$):** $\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$, donde $\\mathbb{Q} \\cap \\mathbb{I} = \\emptyset$. Cadena de inclusiones:",
          "$$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$$",
        ],
      },
      {
        heading: "Axiomas de Campo de los Números Reales",
        level: 2,
        content: [
          "Para cualesquiera $a, b, c \\in \\mathbb{R}$ se verifican las siguientes propiedades fundamentales:",
          "• **Clausura:** $a + b \\in \\mathbb{R}$ y $a \\cdot b \\in \\mathbb{R}$.",
          "• **Conmutatividad:** $a + b = b + a$ y $a \\cdot b = b \\cdot a$.",
          "• **Asociatividad:** $(a + b) + c = a + (b + c)$ y $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$.",
          "• **Elementos neutros:** $a + 0 = a$ (neutro aditivo $0$) y $a \\cdot 1 = a$ (neutro multiplicativo $1$).",
          "• **Inversos:** Para cada $a \\in \\mathbb{R}$ existe $-a$ tal que $a + (-a) = 0$. Para cada $a \\neq 0$ existe $a^{-1} = \\frac{1}{a}$ tal que $a \\cdot \\frac{1}{a} = 1$.",
          "• **Distributividad del producto respecto a la suma:**",
          "$$a(b + c) = ab + ac \\quad \\text{y} \\quad (a + b)c = ac + bc$$",
        ],
      },
      {
        heading: "Leyes de Signos y Propiedades Aritméticas",
        level: 2,
        content: [
          "• $a \\cdot 0 = 0$ para todo $a \\in \\mathbb{R}$.",
          "• Si $ab = 0$, entonces $a = 0$ ó $b = 0$ (Propiedad del producto nulo).",
          "• $-(-a) = a$.",
          "• $(-a)b = a(-b) = -(ab)$.",
          "• $(-a)(-b) = ab$.",
          "• $-(a + b) = -a - b$.",
          "• $-(a - b) = b - a$.",
        ],
      },
      {
        heading: "Divisibilidad, Números Primos, MCD y MCM",
        level: 2,
        content: [
          "• **Paridad:** $a \\in \\mathbb{Z}$ es par si $a = 2k$ ($k \\in \\mathbb{Z}$). Es impar si $a = 2k + 1$ ($k \\in \\mathbb{Z}$).",
          "• **Divisor y Múltiplo:** Dados $d, b \\in \\mathbb{Z}$ con $d \\neq 0$, decimos que $d$ divide a $b$ ($d \\mid b$) si existe $a \\in \\mathbb{Z}$ tal que $b = ad$.",
          "• **Máximo Común Divisor (MCD):** Mayor entero positivo que divide simultáneamente a $a$ y $b$. Ejemplo: $\\operatorname{MCD}(24, 30) = 6$.",
          "• **Mínimo Común Múltiplo (MCM):** Menor entero positivo que es múltiplo de ambos. Ejemplo: $\\operatorname{MCM}(6, 10) = 30$.",
          "• **Primos relativos:** $a$ y $b$ son coprimos si $\\operatorname{MCD}(a, b) = 1$.",
          "• **Fracción irreductible:** $\\frac{a}{b}$ está simplificada si $a$ y $b$ son primos relativos.",
          "Teorema: **Teorema Fundamental de la Aritmética:** Todo entero $n > 1$ se descompone de forma única (salvo el orden) como producto de factores primos. Ejemplo: $2924 = 2^2 \\times 17 \\times 43$.",
        ],
      },
      {
        heading: "Operaciones Fundamentales con Fracciones",
        level: 1,
        content: [
          "Sean $a, b, c, d \\in \\mathbb{Z}$ con denominadores no nulos:",
          "• **Suma con igual denominador:**",
          "$$\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}, \\quad (c \\neq 0)$$",
          "• **Suma con distinto denominador:**",
          "$$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}, \\quad (b, d \\neq 0)$$",
          "Ejemplo: $\\frac{3}{64} + \\frac{7}{48}$. Descomponiendo: $64 = 2^6$ y $48 = 2^4 \\cdot 3$. El $\\operatorname{MCM}(64, 48) = 2^6 \\cdot 3 = 192$.",
          "$$\\frac{3}{64} + \\frac{7}{48} = \\frac{3 \\cdot 3}{192} + \\frac{7 \\cdot 4}{192} = \\frac{9 + 28}{192} = \\frac{37}{192}$$",
          "• **Multiplicación de fracciones:**",
          "$$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{ac}{bd}, \\quad (b, d \\neq 0)$$",
          "• **División de fracciones (Ley de la Oreja / Cociente):**",
          "$$\\frac{\\frac{a}{b}}{\\frac{c}{d}} = \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a \\cdot d}{b \\cdot c}, \\quad (b, c, d \\neq 0)$$",
        ],
      },
    ],
  };

  // ─── MODULE 3 ───────────────────────────────────────────────
  modules[3] = {
    num: 3,
    title: "Recta Numérica, Orden e Intervalos",
    pdfPages: "Págs. 7 – 10",
    tag: "Álgebra",
    sections: [
      {
        heading: "La Recta Real y Relación de Orden",
        level: 1,
        content: [
          "Existe una correspondencia biunívoca entre los elementos del conjunto $\\mathbb{R}$ y los puntos de una línea recta geométrica (la recta real). El número $0$ se asocia con el punto origen.",
          "• Los números a la derecha del $0$ son **positivos** ($x > 0$).",
          "• Los números a la izquierda del $0$ son **negativos** ($x < 0$).",
          "Definición: Sean $a, b \\in \\mathbb{R}$:",
          "• $a > b \\iff a - b > 0$ ($a$ es mayor que $b$).",
          "• $a < b \\iff a - b < 0$ ($a$ es menor que $b$).",
          "• $a \\le b \\iff a < b \\lor a = b$ ($a$ es menor o igual que $b$).",
          "• $a \\ge b \\iff a > b \\lor a = b$ ($a$ es mayor o igual que $b$).",
          "Ejemplo: $3 < 5$ ya que $5 - 3 = 2 > 0$. Geométricamente, $a < b$ indica que $a$ está situado a la izquierda de $b$ en la recta real.",
        ],
      },
      {
        heading: "Propiedades del Orden en los Reales",
        level: 2,
        content: [
          "Teorema: Para cualesquiera números reales $a, b, c$ se verifican:",
          "• **Tricotomía:** Se cumple exactamente una de las tres: $a < b$, $a = b$ ó $a > b$.",
          "• **Transitividad:** Si $a \\le b$ y $b \\le c$, entonces $a \\le c$.",
          "• **Suma de una constante:** Si $a \\le b$, entonces $a + c \\le b + c$.",
          "• **Multiplicación por constante positiva ($c > 0$):**",
          "$$a \\le b \\land c > 0 \\implies ac \\le bc$$",
          "• **Multiplicación por constante negativa ($c < 0$):** ¡El sentido de la desigualdad se invierte!",
          "$$a \\le b \\land c < 0 \\implies ac \\ge bc$$",
          "• **Inversos multiplicativos:** Si $0 < a < b$, entonces $\\frac{1}{a} > \\frac{1}{b} > 0$.",
          "• Para todo $a \\in \\mathbb{R}$, $a^2 \\ge 0$. Como $1 \\neq 0$, se deduce que $1 = 1^2 > 0$.",
        ],
      },
      {
        heading: "Tipos de Intervalos",
        level: 1,
        content: [
          "Un intervalo es un subconjunto continuo de $\\mathbb{R}$ delimitado por sus extremos $a$ y $b$ ($a < b$):",
          "• **Intervalo Abierto:** $(a, b) = \\{x \\in \\mathbb{R} \\mid a < x < b\\}$.",
          "• **Intervalo Cerrado:** $[a, b] = \\{x \\in \\mathbb{R} \\mid a \\le x \\le b\\}$.",
          "• **Intervalo Semiabierto a derecha:** $[a, b) = \\{x \\in \\mathbb{R} \\mid a \\le x < b\\}$.",
          "• **Intervalo Semiabierto a izquierda:** $(a, b] = \\{x \\in \\mathbb{R} \\mid a < x \\le b\\}$.",
          "• **Intervalos Infinitos:**",
          "  • $(a, \\infty) = \\{x \\in \\mathbb{R} \\mid x > a\\}$",
          "  • $[a, \\infty) = \\{x \\in \\mathbb{R} \\mid x \\ge a\\}$",
          "  • $(-\\infty, b) = \\{x \\in \\mathbb{R} \\mid x < b\\}$",
          "  • $(-\\infty, b] = \\{x \\in \\mathbb{R} \\mid x \\le b\\}$",
          "  • $(-\\infty, \\infty) = \\mathbb{R}$",
        ],
      },
      {
        heading: "Operaciones con Intervalos",
        level: 2,
        content: [
          "Ejemplo: Sean $A = [-3, 5)$ y $B = (1, 8]$. Halle $A \\cup B$, $A \\cap B$, $A \\setminus B$ y $A^c$:",
          "• **Unión:** $A \\cup B = [-3, 8]$.",
          "• **Intersección:** $A \\cap B = (1, 5)$.",
          "• **Diferencia:** $A \\setminus B = [-3, 1]$.",
          "• **Complemento:** $A^c = (-\\infty, -3) \\cup [5, \\infty)$.",
        ],
      },
    ],
  };

  // ─── MODULE 4 ───────────────────────────────────────────────
  modules[4] = {
    num: 4,
    title: "Valor Absoluto y Distancia",
    pdfPages: "Pág. 11",
    tag: "Álgebra",
    sections: [
      {
        heading: "Definición de Valor Absoluto",
        level: 1,
        content: [
          "Definición: Sea $a \\in \\mathbb{R}$. El **valor absoluto** de $a$, denotado $|a|$, es la distancia no negativa desde $a$ hasta el origen $0$ en la recta real:",
          "$$|a| = \\begin{cases} a & \\text{si } a \\ge 0 \\\\ -a & \\text{si } a < 0 \\end{cases}$$",
          "Ejemplos:",
          "• $|5| = 5$",
          "• $|-5| = -(-5) = 5$",
          "• $|0| = 0$",
          "• $|3 - \\pi| = -(3 - \\pi) = \\pi - 3 \\approx 0.14159$, ya que $3 < \\pi$.",
        ],
      },
      {
        heading: "Propiedades del Valor Absoluto",
        level: 2,
        content: [
          "Teorema: Para cualesquiera $a, b \\in \\mathbb{R}$:",
          "• **No negatividad:** $|a| \\ge 0$, y $|a| = 0 \\iff a = 0$.",
          "• **Simetría:** $|-a| = |a|$.",
          "• **Multiplicatividad:** $|ab| = |a| \\cdot |b|$.",
          "• **División:** $\\left| \\frac{a}{b} \\right| = \\frac{|a|}{|b|}, \\quad (b \\neq 0)$.",
          "• **Potencia par:** $|a|^2 = a^2 = |-a|^2$.",
          "• **Raíz cuadrada principal:** $\\sqrt{a^2} = |a|$.",
          "• **Desigualdad Triangular:**",
          "$$|a + b| \\le |a| + |b|$$",
        ],
      },
      {
        heading: "Distancia en la Recta Real",
        level: 2,
        content: [
          "Definición: La distancia entre dos puntos $a$ y $b$ sobre la recta real, denotada $d(a, b)$, es el valor absoluto de su diferencia:",
          "$$d(a, b) = |b - a| = |a - b|$$",
          "Ejemplo: La distancia entre $-3$ y $4$ es $d(-3, 4) = |4 - (-3)| = |7| = 7$.",
          "• **Ecuaciones e Inecuaciones con valor absoluto ($c > 0$):**",
          "  • $|x| = c \\iff x = c \\lor x = -c$",
          "  • $|x| < c \\iff -c < x < c \\iff x \\in (-c, c)$",
          "  • $|x| \\le c \\iff -c \\le x \\le c \\iff x \\in [-c, c]$",
          "  • $|x| > c \\iff x > c \\lor x < -c \\iff x \\in (-\\infty, -c) \\cup (c, \\infty)$",
        ],
      },
    ],
  };

  // ─── MODULE 5 ───────────────────────────────────────────────
  modules[5] = {
    num: 5,
    title: "Potenciación y Radicación",
    pdfPages: "Págs. 12 – 15",
    tag: "Álgebra",
    sections: [
      {
        heading: "Potenciación con Exponentes Enteros",
        level: 1,
        content: [
          "Si $a, x \\in \\mathbb{R}$, una expresión $a^x$ es una expresión exponencial donde $a$ es la **base** y $x$ es el **exponente**.",
          "• **Exponente natural ($n \\in \\mathbb{N}$):**",
          "$$a^n = \\underbrace{a \\cdot a \\cdot a \\cdots a}_{n \\text{ factores}}$$ ",
          "• **Exponente cero:** Si $a \\neq 0$, definimos $a^0 = 1$. (Nota: $0^0$ es una indeterminación).",
          "• **Exponente entero negativo:** Si $a \\neq 0$ y $n \\in \\mathbb{N}$:",
          "$$a^{-n} = \\frac{1}{a^n}$$",
          "Ejemplos:",
          "• $(-\\frac{1}{2})^4 = \\frac{1}{16}$",
          "• $(-5)^3 = -125$",
          "• $2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$",
        ],
      },
      {
        heading: "Leyes de los Exponentes",
        level: 2,
        content: [
          "Teorema: Para bases $a, b \\in \\mathbb{R}$ y exponentes enteros $m, n$ (evitando divisiones por cero):",
          "• **Producto de igual base:** $a^m \\cdot a^n = a^{m+n}$",
          "• **Cociente de igual base:** $\\frac{a^m}{a^n} = a^{m-n}$",
          "• **Potencia de una potencia:** $(a^m)^n = a^{m \\cdot n}$",
          "• **Potencia de un producto:** $(ab)^n = a^n b^n$",
          "• **Potencia de un cociente:** $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$",
          "• **Fracción con exponente negativo:** $\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n = \\frac{b^n}{a^n}$",
          "• $\\frac{a^{-m}}{b^{-n}} = \\frac{b^n}{a^m}$",
        ],
      },
      {
        heading: "Radicación y Exponentes Racionales",
        level: 1,
        content: [
          "Definición: Si $n \\in \\mathbb{N}$ ($n \\ge 2$) y $a \\in \\mathbb{R}$, la raíz $n$-ésima principal de $a$, denotada $\\sqrt[n]{a}$, se define como:",
          "$$\\sqrt[n]{a} = b \\iff b^n = a$$",
          "*(Si $n$ es par, se exige $a \\ge 0$ y $b \\ge 0$)*.",
          "• **Propiedad de simplificación:**",
          "$$\\sqrt[n]{a^n} = \\begin{cases} |a| & \\text{si } n \\text{ es par} \\\\ a & \\text{si } n \\text{ es impar} \\end{cases}$$",
          "• **Definición de exponente racional:** Para $m, n \\in \\mathbb{Z}$ con $n > 0$:",
          "$$a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$$",
          "Ejemplo: $8^{2/3} = (\\sqrt[3]{8})^2 = 2^2 = 4$.",
          "• **Leyes de los Radicales:**",
          "  • $\\sqrt[n]{ab} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$",
          "  • $\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}$",
          "  • $\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[mn]{a}$",
        ],
      },
    ],
  };

  // ─── MODULE 6 ───────────────────────────────────────────────
  modules[6] = {
    num: 6,
    title: "Expresiones Algebraicas – Polinomios",
    pdfPages: "Págs. 15 – 21",
    tag: "Álgebra",
    sections: [
      {
        heading: "Polinomios y su Estructura",
        level: 1,
        content: [
          "Una expresión algebraica combina constantes y variables mediante operaciones aritméticas elementales.",
          "Definición: Un **polinomio** en la variable $x$ es una expresión algebraica de la forma:",
          "$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0$$",
          "donde los coeficientes $a_0, a_1, \\dots, a_n \\in \\mathbb{R}$, $n \\in \\mathbb{N} \\cup \\{0\\}$ y $a_n \\neq 0$.",
          "• El entero $n$ es el **grado** del polinomio (denotado $\\deg(P) = n$).",
          "• $a_n$ es el **coeficiente principal** y $a_0$ es el **término independiente**.",
          "Ejemplo: $P(x) = 7x^5 - 3x^4 + 2x^2 + x + 1$ es un polinomio de grado $5$, con coeficiente principal $7$ y término independiente $1$.",
        ],
      },
      {
        heading: "Operaciones con Polinomios",
        level: 2,
        content: [
          "• **Suma y Resta:** Se reducen términos semejantes (términos con idéntica variable y exponente).",
          "• **Multiplicación:** Se aplica la ley distributiva reiterada: $a^m \\cdot a^n = a^{m+n}$.",
          "Ejemplo: Multiplicar $(2x - 3)(x^2 + 4x - 5)$:",
          "$$(2x - 3)(x^2 + 4x - 5) = 2x(x^2 + 4x - 5) - 3(x^2 + 4x - 5)$$",
          "$$= (2x^3 + 8x^2 - 10x) - (3x^2 + 12x - 15) = 2x^3 + 5x^2 - 22x + 15$$",
        ],
      },
      {
        heading: "Algoritmo de la División de Polinomios",
        level: 1,
        content: [
          "Teorema: **Algoritmo de la División:** Dados dos polinomios $P(x)$ (dividendo) y $D(x)$ (divisor con $D(x) \\neq 0$), existen polinomios únicos $Q(x)$ (cociente) y $R(x)$ (residuo) tales que:",
          "$$P(x) = D(x) \\cdot Q(x) + R(x)$$",
          "donde $\\deg(R) < \\deg(D)$ ó $R(x) = 0$.",
          "• Si $R(x) = 0$, decimos que $D(x)$ **divide exactamente** a $P(x)$ y que $D(x)$ es un **factor** de $P(x)$.",
          "• **División Sintética (Regla de Ruffini):** Método abreviado para dividir un polinomio $P(x)$ entre un binomio lineal de la forma $x - c$.",
        ],
      },
    ],
  };

  // ─── MODULE 7 ───────────────────────────────────────────────
  modules[7] = {
    num: 7,
    title: "Ceros Reales de Polinomios",
    pdfPages: "Págs. 22 – 25",
    tag: "Álgebra",
    sections: [
      {
        heading: "Teoremas del Residuo y del Factor",
        level: 1,
        content: [
          "Teorema: **Teorema del Residuo:** Si un polinomio $P(x)$ se divide entre el binomio $x - c$, entonces el residuo es igual al valor numérico evaluado en $c$:",
          "$$R = P(c)$$",
          "Ejemplo: El residuo de dividir $P(x) = 3x^3 - 5x^2 + 2x - 7$ entre $x - 2$ es simplemente $P(2) = 3(8) - 5(4) + 2(2) - 7 = 24 - 20 + 4 - 7 = 1$.",
          "Teorema: **Teorema del Factor:** Un número $c$ es un cero o raíz de $P(x)$ (es decir, $P(c) = 0$) si y sólo si $(x - c)$ es un factor de $P(x)$:",
          "$$P(c) = 0 \\iff P(x) = (x - c) \\cdot Q(x)$$",
        ],
      },
      {
        heading: "Teorema de los Ceros Racionales",
        level: 1,
        content: [
          "Teorema: **Teorema de las Raíces Racionales:** Si el polinomio con coeficientes enteros:",
          "$$P(x) = a_n x^n + a_{n-1}x^{n-1} + \\dots + a_1 x + a_0$$",
          "tiene una raíz racional de la forma $\\frac{p}{q}$ (en forma irreducible), entonces:",
          "• $p$ es un divisor entero del término independiente $a_0$.",
          "• $q$ es un divisor entero del coeficiente principal $a_n$.",
          "Ejemplo: Para $P(x) = 2x^3 + x^2 - 13x + 6$:",
          "• Divisores de $a_0 = 6$: $p \\in \\{\\pm 1, \\pm 2, \\pm 3, \\pm 6\\}$.",
          "• Divisores de $a_n = 2$: $q \\in \\{\\pm 1, \\pm 2\\}$.",
          "• Posibles raíces racionales $\\frac{p}{q}$: $\\left\\{\\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm \\frac{1}{2}, \\pm \\frac{3}{2}\\right\\}$.",
          "Evaluando por división sintética se comprueba que las raíces son $x = 2$, $x = -3$ y $x = \\frac{1}{2}$. Por tanto, la factorización completa es:",
          "$$P(x) = (x - 2)(x + 3)(2x - 1)$$",
        ],
      },
    ],
  };

  // ─── MODULE 8 ───────────────────────────────────────────────
  modules[8] = {
    num: 8,
    title: "Productos Notables y Factorización",
    pdfPages: "Págs. 26 – 32",
    tag: "Álgebra",
    sections: [
      {
        heading: "Fórmulas de Productos Notables",
        level: 1,
        content: [
          "Los productos notables son multiplicaciones polinómicas que siguen reglas fijas cuyo resultado puede escribirse por simple inspección:",
          "• **Cuadrado de un binomio (Trinomio Cuadrado Perfecto):**",
          "$$(a + b)^2 = a^2 + 2ab + b^2$$",
          "$$(a - b)^2 = a^2 - 2ab + b^2$$",
          "• **Suma por diferencia (Diferencia de Cuadrados):**",
          "$$(a + b)(a - b) = a^2 - b^2$$",
          "• **Cubo de un binomio:**",
          "$$(a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3$$",
          "$$(a - b)^3 = a^3 - 3a^2 b + 3ab^2 - b^3$$",
          "• **Cuadrado de un trinomio:**",
          "$$(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2ac + 2bc$$",
          "• **Producto con término común:**",
          "$$(x + a)(x + b) = x^2 + (a + b)x + ab$$",
        ],
      },
      {
        heading: "Métodos Fundamentales de Factorización",
        level: 1,
        content: [
          "Factorizar consiste en transformar una suma algebraica en un producto de factores primos irreducibles:",
          "• **1. Factor Común:** $ab + ac = a(b + c)$.",
          "• **2. Factor Común por Agrupación:** $ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)$.",
          "• **3. Diferencia de Cuadrados:** $a^2 - b^2 = (a - b)(a + b)$.",
          "• **4. Suma y Diferencia de Cubos:**",
          "$$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$",
          "$$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$$",
          "• **5. Trinomio de la forma $x^2 + bx + c$:** Se buscan dos números $p$ y $q$ tales que $p + q = b$ y $p \\cdot q = c$:",
          "$$x^2 + bx + c = (x + p)(x + q)$$",
          "• **6. Trinomio general $ax^2 + bx + c$:** Se factoriza transformando el término central o aplicando la fórmula cuadrática.",
        ],
      },
    ],
  };

  // ─── MODULE 9 ───────────────────────────────────────────────
  modules[9] = {
    num: 9,
    title: "Factorial y Teorema del Binomio",
    pdfPages: "Págs. 33 – 37",
    tag: "Álgebra",
    sections: [
      {
        heading: "Factorial y Coeficientes Binomiales",
        level: 1,
        content: [
          "Definición: Para $n \\in \\mathbb{N}$, el **factorial** de $n$, denotado $n!$, es el producto de todos los enteros positivos desde $1$ hasta $n$:",
          "$$n! = n \\cdot (n - 1) \\cdot (n - 2) \\cdots 3 \\cdot 2 \\cdot 1$$",
          "Por convenio y conveniencia matemática, se define $0! = 1$.",
          "Definición: El **coeficiente binomial** $\\binom{n}{r}$ (combinaciones de $n$ tomados de $r$ en $r$) se define como:",
          "$$\\binom{n}{r} = C(n, r) = \\frac{n!}{r!(n - r)!}, \\quad (0 \\le r \\le n)$$",
          "Ejemplo: $\\binom{6}{2} = \\frac{6!}{2! \\cdot 4!} = \\frac{6 \\times 5 \\times 4!}{2 \\times 1 \\times 4!} = \\frac{30}{2} = 15$.",
        ],
      },
      {
        heading: "El Teorema del Binomio de Newton",
        level: 1,
        content: [
          "Teorema: Para todo $n \\in \\mathbb{N}$ y para cualesquiera $x, y \\in \\mathbb{R}$:",
          "$$(x + y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k$$",
          "Desarrollo explícito:",
          "$$(x + y)^n = \\binom{n}{0}x^n + \\binom{n}{1}x^{n-1}y + \\binom{n}{2}x^{n-2}y^2 + \\dots + \\binom{n}{n-1}xy^{n-1} + \\binom{n}{n}y^n$$",
          "• **Término general:** El término que ocupa la posición $(k+1)$-ésima en el desarrollo de $(x + y)^n$ viene dado por:",
          "$$T_{k+1} = \\binom{n}{k} x^{n-k} y^k$$",
          "Ejemplo: Desarrollar $(2a + b)^4$:",
          "$$(2a + b)^4 = \\binom{4}{0}(2a)^4 + \\binom{4}{1}(2a)^3 b + \\binom{4}{2}(2a)^2 b^2 + \\binom{4}{3}(2a)b^3 + \\binom{4}{4}b^4$$",
          "$$= 1(16a^4) + 4(8a^3)b + 6(4a^2)b^2 + 4(2a)b^3 + 1(b^4)$$",
          "$$= 16a^4 + 32a^3 b + 24a^2 b^2 + 8ab^3 + b^4$$",
        ],
      },
      {
        heading: "El Triángulo de Pascal",
        level: 2,
        content: [
          "Los coeficientes binomiales $\\binom{n}{k}$ forman el célebre Triángulo de Pascal, donde cada número interior es la suma de los dos números superiores inmediatos:",
          "• $n=0$: $\\quad 1$",
          "• $n=1$: $\\quad 1 \\quad 1$",
          "• $n=2$: $\\quad 1 \\quad 2 \\quad 1$",
          "• $n=3$: $\\quad 1 \\quad 3 \\quad 3 \\quad 1$",
          "• $n=4$: $\\quad 1 \\quad 4 \\quad 6 \\quad 4 \\quad 1$",
          "• $n=5$: $\\quad 1 \\quad 5 \\quad 10 \\quad 10 \\quad 5 \\quad 1$",
          "• $n=6$: $\\quad 1 \\quad 6 \\quad 15 \\quad 20 \\quad 15 \\quad 6 \\quad 1$",
        ],
      },
    ],
  };

  // ─── MODULE 10 ──────────────────────────────────────────────
  modules[10] = {
    num: 10,
    title: "Expresiones Fraccionarias, Fracciones Compuestas y Racionalización",
    pdfPages: "Págs. 38 – 42",
    tag: "Álgebra",
    sections: [
      {
        heading: "Expresiones Fraccionarias y su Dominio",
        level: 1,
        content: [
          "Una **expresión fraccionaria** es el cociente de dos expresiones algebraicas. Cuando el numerador y el denominador son polinomios, se llama **expresión racional**:",
          "$$R(x) = \\frac{P(x)}{Q(x)}$$",
          "• **Dominio:** Está constituido por todos los números reales excepto aquellos que anulan el denominador:",
          "$$\\text{Dom}(R) = \\{x \\in \\mathbb{R} \\mid Q(x) \\neq 0\\}$$",
          "Ejemplo: Para $R(x) = \\frac{x + 3}{x^2 - 4}$, como $x^2 - 4 = (x-2)(x+2) = 0 \\implies x = \\pm 2$, el dominio es $\\mathbb{R} \\setminus \\{-2, 2\\}$.",
        ],
      },
      {
        heading: "Fracciones Compuestas",
        level: 1,
        content: [
          "Una fracción compuesta es aquella donde el numerador, el denominador o ambos contienen expresiones fraccionarias.",
          "Ejemplo: Simplificar $\\frac{\\frac{1}{x} + \\frac{1}{y}}{\\frac{1}{x} - \\frac{1}{y}}$:",
          "$$\\frac{\\frac{1}{x} + \\frac{1}{y}}{\\frac{1}{x} - \\frac{1}{y}} = \\frac{\\frac{y + x}{xy}}{\\frac{y - x}{xy}} = \\frac{(y + x) \\cdot xy}{(y - x) \\cdot xy} = \\frac{x + y}{y - x}$$",
        ],
      },
      {
        heading: "Técnicas de Racionalización",
        level: 1,
        content: [
          "Racionalizar consiste en eliminar los radicales del denominador (o del numerador) multiplicando por un factor adecuado unitario:",
          "• **1. Denominador con monomio radical $\\sqrt{a}$:**",
          "$$\\frac{1}{\\sqrt{a}} = \\frac{1}{\\sqrt{a}} \\cdot \\frac{\\sqrt{a}}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}$$",
          "• **2. Denominador con monomio de orden superior $\\sqrt[n]{a^m}$ ($m < n$):**",
          "$$\\frac{1}{\\sqrt[n]{a^m}} = \\frac{1}{\\sqrt[n]{a^m}} \\cdot \\frac{\\sqrt[n]{a^{n-m}}}{\\sqrt[n]{a^{n-m}}} = \\frac{\\sqrt[n]{a^{n-m}}}{a}$$",
          "• **3. Denominador con binomio con raíces cuadradas (Uso del Conjugado):**",
          "El conjugado de $a + b\\sqrt{c}$ es $a - b\\sqrt{c}$:",
          "$$\\frac{1}{a + b\\sqrt{c}} = \\frac{1}{a + b\\sqrt{c}} \\cdot \\frac{a - b\\sqrt{c}}{a - b\\sqrt{c}} = \\frac{a - b\\sqrt{c}}{a^2 - b^2 c}$$",
          "Ejemplo: Racionalizar $\\frac{2}{3 - \\sqrt{5}}$:",
          "$$\\frac{2}{3 - \\sqrt{5}} = \\frac{2(3 + \\sqrt{5})}{(3 - \\sqrt{5})(3 + \\sqrt{5})} = \\frac{2(3 + \\sqrt{5})}{9 - 5} = \\frac{2(3 + \\sqrt{5})}{4} = \\frac{3 + \\sqrt{5}}{2}$$",
          "• **4. Binomios con raíces cúbicas:** Se multiplica por el trinomio asociado a la suma o diferencia de cubos $(a \\pm b)(a^2 \\mp ab + b^2) = a^3 \\pm b^3$.",
        ],
      },
      {
        heading: "Errores Algebraicos Comunes que Deben Evitarse",
        level: 1,
        content: [
          "• $(a + b)^2 \\neq a^2 + b^2 \\quad \\text{(Falta el doble producto } 2ab\\text{)}$",
          "• $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$",
          "• $\\sqrt{a^2 + b^2} \\neq a + b$",
          "• $\\frac{1}{a} + \\frac{1}{b} \\neq \\frac{1}{a + b}$",
          "• $\\frac{a + b}{a} \\neq 1 + b \\quad \\left(\\text{lo correcto es } 1 + \\frac{b}{a}\\right)$",
          "• $(a + b)^{-1} \\neq a^{-1} + b^{-1}$",
        ],
      },
    ],
  };

  return modules;
}

const ALL_MODULES = buildModules();

/* ──────────────────────────────────────────────────────────────
   NEXT.JS: Generate static params for modules 1-10
   ────────────────────────────────────────────────────────────── */
export function generateStaticParams() {
  return Object.keys(ALL_MODULES).map((id) => ({ id }));
}

/* ──────────────────────────────────────────────────────────────
   PAGE COMPONENT
   ────────────────────────────────────────────────────────────── */
export default async function TheoryModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const moduleId = parseInt(id, 10);
  const mod = ALL_MODULES[moduleId];

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
            {moduleId > 1 && ALL_MODULES[moduleId - 1] && (
              <Link
                href={`/teoria/${moduleId - 1}`}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50 transition-all flex items-center gap-1"
              >
                ← Anterior
              </Link>
            )}
            {ALL_MODULES[moduleId + 1] && (
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
                ✨ Renderizado KaTeX LaTeX
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
            {moduleId > 1 && ALL_MODULES[moduleId - 1] && (
              <Link href={`/teoria/${moduleId - 1}`} className="beige-btn-outline px-4 py-2 rounded-lg text-xs">
                ← Módulo #{moduleId - 1}
              </Link>
            )}
            {ALL_MODULES[moduleId + 1] && (
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
