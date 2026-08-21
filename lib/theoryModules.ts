export interface TheorySection {
  heading: string;
  level: 1 | 2 | 3;
  content: string[];
}

export interface TheoryModule {
  num: number;
  title: string;
  pdfPages: string;
  tag: string;
  sections: TheorySection[];
}

export const THEORY_MODULES: Record<number, TheoryModule> = {
  // ══════════════════════════════════════════════════════════════
  // MÓDULO 1: TEORÍA INTUITIVA DE CONJUNTOS Y SISTEMAS NUMÉRICOS
  // ══════════════════════════════════════════════════════════════
  1: {
    num: 1,
    title: "Teoría Intuitiva de Conjuntos y Sistemas Numéricos",
    pdfPages: "Págs. 1 – 3",
    tag: "Álgebra",
    sections: [
      {
        heading: "Nociones sobre Conjuntos",
        level: 1,
        content: [
          "Un **conjunto** es una colección de objetos bien determinados y diferenciados, llamados **elementos** del conjunto.",
          "Un conjunto puede describirse de dos formas principales:",
          "• **Por extensión:** haciendo una lista explícita de sus elementos, separados por comas y encerrados entre llaves $\\{ \\}$.",
          "• **Por comprensión:** dando la condición o condiciones lógicas y matemáticas que cumplen exclusivamente los elementos del conjunto.",
          "Ejemplo: El conjunto $A = \\{x \\mid x \\text{ es una vocal de la palabra eucalipto}\\}$ es un conjunto descrito por comprensión. Su respectiva descripción por extensión es $A = \\{a, e, i, o, u\\}$.",
          "• Si un conjunto no tiene elementos se llama **conjunto vacío** y se denota por $\\emptyset$ ó $\\{\\}$.",
          "• Si un conjunto es vacío o su número de elementos es un número natural $n \\in \\mathbb{N}$, se dice que el conjunto es **finito**. Si un conjunto no es finito, se dice que es **infinito**.",
          "Ejemplo: Sea $A = \\{x \\mid x \\text{ es una vocal cerrada en la palabra \"espejo\"}\\}$. Como en la palabra \"espejo\" sólo figuran las vocales abiertas $e, o$, no existe ninguna vocal cerrada, por tanto $A = \\emptyset$.",
          "Ejemplo: Sea $A = \\{1, 2, 3\\}$. Luego, $A$ es finito, ya que posee exactamente $3$ elementos.",
          "Ejemplo: Sea $A = \\left\\{ \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, \\frac{1}{5}, \\dots \\right\\}$. $A$ es infinito ya que no podemos asignar un número natural para su cantidad total de elementos.",
        ],
      },
      {
        heading: "Pertenencia y Subconjuntos",
        level: 2,
        content: [
          "• **Pertenencia:** Si $A$ es un conjunto, decimos que $a$ pertenece a $A$ y escribimos $a \\in A$ si $a$ es un elemento de $A$. En caso contrario decimos que $a$ no pertenece a $A$ y escribimos $a \\notin A$. En el ejemplo anterior, $\\frac{1}{2} \\in A$ y $5 \\notin A$.",
          "• **Inclusión de Subconjuntos:** Si $A$ y $B$ son conjuntos, decimos que $A$ es subconjunto de $B$ y escribimos $A \\subseteq B$, si todo elemento de $A$ es también elemento de $B$:",
          "$$A \\subseteq B \\iff (\\forall x, \\; x \\in A \\implies x \\in B)$$",
          "En caso de que haya al menos un elemento en el conjunto $A$ que no pertenece al conjunto $B$, decimos que $A$ no es subconjunto de $B$, y escribimos $A \\nsubseteq B$.",
          "Ejemplo: Sean $A = \\{a, e, i, o, u\\}$ y $B = \\{x \\mid x \\text{ es una letra del abecedario}\\}$. Entonces $A \\subseteq B$, pero $B \\nsubseteq A$.",
        ],
      },
      {
        heading: "Propiedades de los Subconjuntos e Igualdad",
        level: 2,
        content: [
          "Teorema: Si $A, B$ y $C$ son conjuntos, se cumplen:",
          "• a) $\\emptyset \\subseteq A$ (el conjunto vacío está contenido en cualquier conjunto).",
          "• b) $A \\subseteq A$ (todo conjunto es subconjunto de sí mismo).",
          "• c) Si $A \\subseteq B$ y $B \\subseteq C$, entonces $A \\subseteq C$ (transitividad de la inclusión).",
          "Definición: Dos conjuntos $A$ y $B$ son **iguales** si y sólo si $A \\subseteq B$ y $B \\subseteq A$. Es decir, $A = B$ si y sólo si todo elemento de $A$ está en $B$ y todo elemento de $B$ está en $A$:",
          "$$A = B \\iff (A \\subseteq B \\;\\land\\; B \\subseteq A)$$",
          "Ejemplo: Sean $A = \\{\\text{vocales de la palabra mundo}\\}$ y $B = \\{u, o\\}$, entonces $A = B$.",
          "Ejemplo: Sean $A = \\{1, 3, 7\\}$ y $B = \\{1, 3, 7, 1\\}$, entonces $A = B$ (en un conjunto no importa el orden ni la repetición de sus elementos).",
        ],
      },
      {
        heading: "Operaciones entre Conjuntos",
        level: 1,
        content: [
          "Sean $A$ y $B$ dos conjuntos en un universo $U$:",
          "• **1. Unión ($A \\cup B$):** Definimos la unión de $A$ y $B$ como el conjunto:",
          "$$A \\cup B = \\{x \\mid x \\in A \\;\\lor\\; x \\in B\\}$$",
          "Ejemplo: Sean $A = \\{1, 3, 5, 7, 9\\}$ y $B = \\{0, 3, 6, 9, 12\\}$. Entonces $A \\cup B = \\{0, 1, 3, 5, 6, 7, 9, 12\\}$.",
          "• **2. Intersección ($A \\cap B$):** Definimos la intersección de $A$ y $B$ como el conjunto:",
          "$$A \\cap B = \\{x \\mid x \\in A \\;\\land\\; x \\in B\\}$$",
          "Ejemplo: Sean $A = \\{1, 3, 5, 7, 9\\}$ y $B = \\{0, 3, 6, 9, 12\\}$. Entonces $A \\cap B = \\{3, 9\\}$. Si $A \\cap B = \\emptyset$, se dice que $A$ y $B$ son **disjuntos**.",
          "• **3. Complemento ($A'$ ó $A^c$):** Si $U$ es un conjunto universal y $A \\subseteq U$, definimos el complemento de $A$ como:",
          "$$A' = \\{x \\in U \\mid x \\notin A\\}$$",
          "Ejemplo: Si $U = \\{a, b, c, d, e, f, g, h\\}$ y $A = \\{c, f, h\\}$, entonces $A' = \\{a, b, d, e, g\\}$.",
          "• **4. Diferencia ($A - B$ ó $A \\setminus B$):** Definimos la diferencia de $A$ y $B$ como:",
          "$$A - B = \\{x \\mid x \\in A \\;\\land\\; x \\notin B\\} = A \\cap B'$$",
          "Ejemplo: Sean $A = \\{0, 1, 2, 3, 4, 5, 6, 7\\}$ y $B = \\{1, 4, 6, 7, 8, 9\\}$. Entonces $A - B = \\{0, 2, 3, 5\\}$, mientras que $B - A = \\{8, 9\\}$. Nótese que $A - B \\neq B - A$.",
          "• **5. Diferencia Simétrica ($A \\Delta B$):** Definimos la diferencia simétrica como:",
          "$$A \\Delta B = (A \\cup B) - (A \\cap B) = (A - B) \\cup (B - A)$$",
          "Ejemplo: Con los conjuntos anteriores, $A \\Delta B = \\{0, 2, 3, 5, 8, 9\\}$.",
        ],
      },
      {
        heading: "Propiedades de las Operaciones y Leyes de De Morgan",
        level: 2,
        content: [
          "Teorema: Sean $A, B, C$ subconjuntos de un universo $U$. Entonces se verifican:",
          "• **Idempotencia:** $A \\cup A = A$, $\\quad A \\cap A = A$.",
          "• **Identidad:** $A \\cup \\emptyset = A$, $\\quad A \\cap \\emptyset = \\emptyset$, $\\quad A \\cup U = U$, $\\quad A \\cap U = A$.",
          "• **Inclusión:** $A \\subseteq (A \\cup B)$, $\\quad B \\subseteq (A \\cup B)$, $\\quad (A \\cap B) \\subseteq A$, $\\quad (A \\cap B) \\subseteq B$.",
          "• **Conmutatividad:** $A \\cup B = B \\cup A$, $\\quad A \\cap B = B \\cap A$.",
          "• **Asociatividad:** $(A \\cup B) \\cup C = A \\cup (B \\cup C)$, $\\quad (A \\cap B) \\cap C = A \\cap (B \\cap C)$.",
          "• **Distributividad:**",
          "$$A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)$$",
          "$$A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$$",
          "• **Propiedades del Complemento:** $(A')' = A$, $\\quad A \\cup A' = U$, $\\quad A \\cap A' = \\emptyset$, $\\quad U' = \\emptyset$, $\\quad \\emptyset' = U$.",
          "• **Leyes de De Morgan:**",
          "$$(A \\cup B)' = A' \\cap B'$$",
          "$$(A \\cap B)' = A' \\cup B'$$",
        ],
      },
      {
        heading: "Sistemas Numéricos",
        level: 1,
        content: [
          "• **Números Naturales ($\\mathbb{N}$):** $\\mathbb{N} = \\{1, 2, 3, 4, \\dots\\}$, utilizados fundamentalmente para el conteo.",
          "• **Números Enteros ($\\mathbb{Z}$):** Formados por los naturales, sus negativos y el cero:",
          "$$\\mathbb{Z} = \\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}$$",
          "• **Números Racionales ($\\mathbb{Q}$):** Formados por todos los cocientes de números enteros con denominador no nulo:",
          "$$\\mathbb{Q} = \\left\\{ \\frac{p}{q} \\;\\middle|\\; p, q \\in \\mathbb{Z}, \\; q \\neq 0 \\right\\}$$",
          "Ejemplos: $\\frac{1}{2}, -\\frac{7}{5}, 0 = \\frac{0}{4}, 2 = \\frac{2}{1}, 0.1 = \\frac{1}{10}$. Las expresiones $\\frac{a}{0}$ no están definidas.",
          "• **Números Irracionales ($\\mathbb{I}$):** Números que no pueden expresarse como cociente de dos enteros. Su desarrollo decimal es infinito no periódico. Ejemplos: $\\sqrt{2} \\approx 1.41421356\\dots$, $\\sqrt{3}$, $\\pi \\approx 3.14159265\\dots$, $e \\approx 2.71828182\\dots$.",
          "• **Números Reales ($\\mathbb{R}$):** Consta de la unión de los números racionales y los números irracionales:",
          "$$\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}, \\quad \\mathbb{Q} \\cap \\mathbb{I} = \\emptyset$$",
          "$$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$$",
          "Ejemplo de conversión de decimal periódico a fracción: Sea $x = 5.4\\overline{38} = 5.4383838\\dots$. Multiplicamos por $1000$ y por $10$:",
          "$$1000x = 5438.3838\\dots$$",
          "$$10x = 54.3838\\dots$$",
          "Restando ambas ecuaciones: $990x = 5384 \\implies x = \\frac{5384}{990} = \\frac{2692}{495}$.",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // MÓDULO 2: PROPIEDADES DE LOS NÚMEROS REALES Y FRACCIONARIOS
  // ══════════════════════════════════════════════════════════════
  2: {
    num: 2,
    title: "Propiedades de los Números Reales y Fraccionarios",
    pdfPages: "Págs. 4 – 7",
    tag: "Álgebra",
    sections: [
      {
        heading: "Propiedades de las Operaciones en los Reales",
        level: 1,
        content: [
          "Para cualesquiera números reales $a, b, c \\in \\mathbb{R}$, se satisfacen los siguientes axiomas fundamentales:",
          "• **Conmutatividad:**",
          "  • Suma: $a + b = b + a$",
          "  • Producto: $a \\cdot b = b \\cdot a$",
          "• **Asociatividad:**",
          "  • Suma: $(a + b) + c = a + (b + c)$",
          "  • Producto: $(ab)c = a(bc)$",
          "• **Distributividad del producto respecto a la suma:**",
          "$$a(b + c) = ab + ac \\quad \\text{y} \\quad (b + c)a = ba + ca$$",
          "• **Elementos neutros:**",
          "  • Neutro de la suma: Existe $0 \\in \\mathbb{R}$ tal que $a + 0 = a$.",
          "  • Neutro del producto: Existe $1 \\in \\mathbb{R}$ ($1 \\neq 0$) tal que $a \\cdot 1 = a$.",
          "• **Inversos:**",
          "  • Inverso aditivo (opuesto): Para cada $a \\in \\mathbb{R}$ existe $-a \\in \\mathbb{R}$ tal que $a + (-a) = 0$.",
          "  • Inverso multiplicativo (recíproco): Para cada $a \\in \\mathbb{R}$ con $a \\neq 0$, existe $a^{-1} = \\frac{1}{a} \\in \\mathbb{R}$ tal que $a \\cdot \\frac{1}{a} = 1$.",
        ],
      },
      {
        heading: "Leyes de Signos y Propiedades Aritméticas",
        level: 2,
        content: [
          "Teorema: A partir de los axiomas de cuerpo se demuestran rigurosamente las siguientes propiedades:",
          "• 1. $a \\cdot 0 = 0$ para todo $a \\in \\mathbb{R}$.",
          "• 2. $(-1)a = -a$.",
          "• 3. $-(-a) = a$.",
          "• 4. $(-a)b = a(-b) = -(ab)$.",
          "• 5. $(-a)(-b) = ab$.",
          "• 6. $-(a + b) = -a - b$.",
          "• 7. $-(a - b) = b - a$.",
          "• 8. Si $ab = 0$, entonces $a = 0$ ó $b = 0$ (Propiedad del producto nulo).",
          "Ejemplo: Justificar que $-(a + b) = -a - b$:",
          "$$ -(a + b) = (-1)(a + b) = (-1)a + (-1)b = -a - b $$",
        ],
      },
      {
        heading: "Caracterización de Números Enteros y Teoría de Números",
        level: 2,
        content: [
          "• **Número Par:** Un número $a \\in \\mathbb{Z}$ es par si puede escribirse como $a = 2k$, con $k \\in \\mathbb{Z}$. Ejemplos: $6 = 2(3)$, $0 = 2(0)$, $-8 = 2(-4)$.",
          "• **Número Impar:** Un número $a \\in \\mathbb{Z}$ es impar si puede escribirse como $a = 2k + 1$, con $k \\in \\mathbb{Z}$. Ejemplos: $3 = 2(1) + 1$, $-7 = 2(-4) + 1$.",
          "• **Divisibilidad:** Dados $d, b \\in \\mathbb{Z}$ con $d \\neq 0$, decimos que $d$ divide a $b$ ($d \\mid b$) si existe $a \\in \\mathbb{Z}$ tal que $b = ad$. En este caso, $d$ es divisor o factor de $b$, y $b$ es múltiplo de $d$.",
          "• **Máximo Común Divisor (MCD):** $d = \\operatorname{MCD}(a, b)$ es el mayor entero positivo que divide a ambos números $a$ y $b$. Ejemplo: $\\operatorname{MCD}(24, 30) = 6$; $\\operatorname{MCD}(7, 18) = 1$; $\\operatorname{MCD}(0, 12) = 12$.",
          "• **Mínimo Común Múltiplo (MCM):** $m = \\operatorname{MCM}(a, b)$ es el menor entero positivo que es múltiplo de ambos. Ejemplo: $\\operatorname{MCM}(6, 10) = 30$; $\\operatorname{MCM}(15, 14) = 210$.",
          "• **Primos Relativos (Coprimos):** Dos enteros $a$ y $b$ son primos relativos si $\\operatorname{MCD}(a, b) = 1$.",
          "• **Forma Reducida de una Fracción:** La fracción $\\frac{a}{b}$ está en forma reducida (simplificada) si $a$ y $b$ son primos relativos. Ejemplo: $\\frac{7}{18}$ está en forma reducida; $\\frac{16}{12} = \\frac{4}{3}$.",
          "• **Número Primo:** Entero positivo $p > 1$ cuyos únicos divisores positivos son $1$ y $p$. Ejemplos: $2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, \\dots$. Si un entero $a > 1$ no es primo, se denomina **compuesto**.",
          "Teorema: **Teorema Fundamental de la Aritmética:** Todo entero $n > 1$ puede descomponerse de forma única como producto de factores primos. Ejemplo: $2924 = 2^2 \\times 17 \\times 43$.",
        ],
      },
      {
        heading: "Operaciones con Fracciones",
        level: 1,
        content: [
          "Sean $a, b, c, d \\in \\mathbb{Z}$ con los denominadores no nulos:",
          "• **1. Suma y Resta con igual denominador:**",
          "$$\\frac{a}{c} + \\frac{b}{c} = \\frac{a + b}{c}, \\quad \\frac{a}{c} - \\frac{b}{c} = \\frac{a - b}{c}, \\quad (c \\neq 0)$$",
          "Ejemplo: $\\frac{15}{7} + \\frac{23}{7} = \\frac{38}{7}$.",
          "• **2. Suma y Resta con distinto denominador:** Se halla el $\\operatorname{MCM}$ de los denominadores (Mínimo Común Denominador) y se amplifican las fracciones:",
          "$$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}, \\quad (b, d \\neq 0)$$",
          "Ejemplo: Calcular $\\frac{3}{64} + \\frac{7}{48}$. Descomponiendo en factores primos: $64 = 2^6$ y $48 = 2^4 \\cdot 3$.",
          "El $\\operatorname{MCM}(64, 48) = 2^6 \\cdot 3 = 192$.",
          "$$\\frac{3}{64} + \\frac{7}{48} = \\frac{3 \\cdot 3}{64 \\cdot 3} + \\frac{7 \\cdot 4}{48 \\cdot 4} = \\frac{9}{192} + \\frac{28}{192} = \\frac{37}{192}$$",
          "• **3. Producto de fracciones:**",
          "$$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}, \\quad (b, d \\neq 0)$$",
          "Ejemplo: $\\frac{2}{5} \\cdot \\frac{4}{3} = \\frac{8}{15}$.",
          "• **4. Cociente de fracciones:**",
          "$$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{ad}{bc}, \\quad (b, c, d \\neq 0)$$",
          "Ejemplo: $\\frac{2}{3} \\div \\frac{5}{7} = \\frac{2 \\cdot 7}{3 \\cdot 5} = \\frac{14}{15}$.",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // MÓDULO 3: RECTA NUMÉRICA, ORDEN E INTERVALOS
  // ══════════════════════════════════════════════════════════════
  3: {
    num: 3,
    title: "Recta Numérica, Orden e Intervalos",
    pdfPages: "Págs. 7 – 10",
    tag: "Álgebra",
    sections: [
      {
        heading: "Orden en los Números Reales",
        level: 1,
        content: [
          "Existe una correspondencia biunívoca entre los números reales $\\mathbb{R}$ y los puntos de una línea recta (la **recta real**). El punto $0$ es el origen.",
          "• Los números a la derecha de $0$ son los **positivos** ($a > 0$).",
          "• Los números a la izquierda de $0$ son los **negativos** ($a < 0$).",
          "Definición: Sean $a, b \\in \\mathbb{R}$:",
          "• $a > b \\iff a - b > 0$ ($a$ es mayor que $b$).",
          "• $a < b \\iff a - b < 0$ ($a$ es menor que $b$).",
          "• $a \\le b \\iff a < b \\;\\lor\\; a = b$ ($a$ es menor o igual que $b$).",
          "• $a \\ge b \\iff a > b \\;\\lor\\; a = b$ ($a$ es mayor o igual que $b$).",
          "Ejemplo: $3 < 5$ pues $5 - 3 = 2 > 0$. $4 \\le 4$ ya que $4 = 4$.",
        ],
      },
      {
        heading: "Propiedades Fundamentales de Orden",
        level: 2,
        content: [
          "Teorema: Para cualesquiera $a, b, c \\in \\mathbb{R}$:",
          "• 1. Para todo $a \\in \\mathbb{R}$, $a^2 \\ge 0$, y $a^2 = 0 \\iff a = 0$. En particular, como $1 \\neq 0$, se deduce que $1 = 1^2 > 0$.",
          "• 2. **Tricotomía:** Se cumple una y sólo una de: $a < b$, $a = b$ ó $a > b$.",
          "• 3. **Transitividad:** Si $a \\le b$ y $b \\le c$, entonces $a \\le c$.",
          "• 4. **Adición de constante:** Si $a \\le b$, entonces $a + c \\le b + c$.",
          "• 5. **Multiplicación por positivo ($c > 0$):**",
          "$$a \\le b \\;\\land\\; c > 0 \\implies ac \\le bc$$",
          "• 6. **Multiplicación por negativo ($c < 0$):** ¡Se invierte el sentido de la desigualdad!",
          "$$a \\le b \\;\\land\\; c < 0 \\implies ac \\ge bc$$",
          "• 7. **Inversos:** Si $a > 0$ y $b > 0$, entonces $a \\le b \\iff \\frac{1}{a} \\ge \\frac{1}{b}$.",
          "• 8. Si $a \\le b$ y $c \\le d$, entonces $a + c \\le b + d$.",
          "• 9. Si $0 \\le a \\le b$ y $0 \\le c \\le d$, entonces $ac \\le bd$.",
        ],
      },
      {
        heading: "Intervalos en la Recta Real",
        level: 1,
        content: [
          "Sean $a, b \\in \\mathbb{R}$ con $a < b$. Se definen los siguientes tipos de intervalos:",
          "• **Intervalo Abierto:** $(a, b) = \\{x \\in \\mathbb{R} \\mid a < x < b\\}$ (no incluye los extremos).",
          "• **Intervalo Cerrado:** $[a, b] = \\{x \\in \\mathbb{R} \\mid a \\le x \\le b\\}$ (incluye ambos extremos).",
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
          "Ejemplo 1: Exprese el conjunto $\\{x \\in \\mathbb{R} \\mid -2 \\le x < 3\\}$ en notación de intervalos. Solución: $[-2, 3)$.",
          "Ejemplo 2: Sean los intervalos $A = [-3, 5)$ y $B = (1, 8]$. Halle:",
          "• $A \\cup B = [-3, 8]$",
          "• $A \\cap B = (1, 5)$",
          "• $A - B = [-3, 1]$",
          "• $B - A = [5, 8]$",
          "• $A' = (-\\infty, -3) \\cup [5, \\infty)$",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // MÓDULO 4: VALOR ABSOLUTO Y DISTANCIA
  // ══════════════════════════════════════════════════════════════
  4: {
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
          "• $|3| = 3$",
          "• $|-3| = -(-3) = 3$",
          "• $|0| = 0$",
          "• $|3 - \\pi| = -(3 - \\pi) = \\pi - 3 \\approx 0.14159$, ya que $3 < \\pi$.",
          "• $|\\sqrt{2} - 1| = \\sqrt{2} - 1$, ya que $\\sqrt{2} > 1$.",
        ],
      },
      {
        heading: "Propiedades del Valor Absoluto",
        level: 2,
        content: [
          "Teorema: Para cualesquiera $a, b \\in \\mathbb{R}$:",
          "• 1. $|a| \\ge 0$, y $|a| = 0 \\iff a = 0$.",
          "• 2. $|-a| = |a|$.",
          "• 3. $-|a| \\le a \\le |a|$.",
          "• 4. $|ab| = |a| \\cdot |b|$.",
          "• 5. $\\left|\\frac{a}{b}\\right| = \\frac{|a|}{|b|}$, con $b \\neq 0$.",
          "• 6. $|a|^2 = a^2 = |-a|^2$.",
          "• 7. $\\sqrt{a^2} = |a|$.",
          "• 8. **Desigualdad Triangular:**",
          "$$|a + b| \\le |a| + |b|$$",
          "Demostración de la Desigualdad Triangular: Como $-|a| \\le a \\le |a|$ y $-|b| \\le b \\le |b|$, sumando miembro a miembro tenemos $-(|a| + |b|) \\le a + b \\le |a| + |b|$, lo cual equivale a $|a + b| \\le |a| + |b|$.",
        ],
      },
      {
        heading: "Distancia entre Puntos en la Recta Real",
        level: 2,
        content: [
          "Definición: Si $a, b \\in \\mathbb{R}$, la **distancia** entre $a$ y $b$, denotada $d(a, b)$, es:",
          "$$d(a, b) = |b - a| = |a - b|$$",
          "Propiedades de la distancia:",
          "• $d(a, b) \\ge 0$, y $d(a, b) = 0 \\iff a = b$.",
          "• $d(a, b) = d(b, a)$ (simetría).",
          "• $d(a, c) \\le d(a, b) + d(b, c)$ (desigualdad triangular para la distancia).",
          "Ejemplo: La distancia entre $-2$ y $5$ es $d(-2, 5) = |5 - (-2)| = |7| = 7$.",
          "• **Propiedades para resolver ecuaciones e inecuaciones ($c > 0$):**",
          "  • $|x| = c \\iff x = c \\;\\lor\\; x = -c$",
          "  • $|x| < c \\iff -c < x < c \\iff x \\in (-c, c)$",
          "  • $|x| \\le c \\iff -c \\le x \\le c \\iff x \\in [-c, c]$",
          "  • $|x| > c \\iff x > c \\;\\lor\\; x < -c \\iff x \\in (-\\infty, -c) \\cup (c, \\infty)$",
          "  • $|x| \\ge c \\iff x \\ge c \\;\\lor\\; x \\le -c \\iff x \\in (-\\infty, -c] \\cup [c, \\infty)$",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // MÓDULO 5: POTENCIACIÓN Y RADICACIÓN
  // ══════════════════════════════════════════════════════════════
  5: {
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
          "• **Exponente cero:** Si $a \\neq 0$, definimos $a^0 = 1$. (Nota: $0^0$ no tiene sentido).",
          "• **Exponente entero negativo:** Si $a \\neq 0$ y $n \\in \\mathbb{N}$:",
          "$$a^{-n} = \\frac{1}{a^n}$$",
          "Ejemplos:",
          "• $\\left(\\frac{1}{2}\\right)^4 = \\frac{1}{16}$",
          "• $(-5)^6 = 15625$, mientras que $-5^6 = -15625$",
          "• $\\left(\\frac{3}{2}\\right)^0 = 1$, $(-5)^0 = 1$",
          "• $\\left(\\frac{1}{2}\\right)^{-3} = 2^3 = 8$",
          "• $(-3)^{-2} = \\frac{1}{(-3)^2} = \\frac{1}{9}$",
        ],
      },
      {
        heading: "Leyes de los Exponentes",
        level: 2,
        content: [
          "Teorema: Para bases reales $a, b$ y exponentes enteros $m, n$:",
          "• 1. **Producto de igual base:** $a^m \\cdot a^n = a^{m+n}$",
          "• 2. **Cociente de igual base:** $\\frac{a^m}{a^n} = a^{m-n}, \\quad (a \\neq 0)$",
          "• 3. **Potencia de una potencia:** $(a^m)^n = a^{mn}$",
          "• 4. **Potencia de un producto:** $(ab)^n = a^n b^n$",
          "• 5. **Potencia de un cociente:** $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}, \\quad (b \\neq 0)$",
          "• 6. $\\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n = \\frac{b^n}{a^n}, \\quad (a, b \\neq 0)$",
          "• 7. $\\frac{a^{-m}}{b^{-n}} = \\frac{b^n}{a^m}, \\quad (a, b \\neq 0)$",
          "Ejemplo: Simplificar $\\left(\\frac{2a^3 b^{-2}}{c^{-3}}\\right)^{-2}$ dejando solo exponentes positivos:",
          "$$\\left(\\frac{2a^3 b^{-2}}{c^{-3}}\\right)^{-2} = \\left(\\frac{2a^3 c^3}{b^2}\\right)^{-2} = \\left(\\frac{b^2}{2a^3 c^3}\\right)^2 = \\frac{b^4}{4a^6 c^6}$$",
        ],
      },
      {
        heading: "Radicación y Exponentes Racionales",
        level: 1,
        content: [
          "Definición: Sea $n \\in \\mathbb{N}$ ($n \\ge 2$) y $a \\in \\mathbb{R}$. La **raíz $n$-ésima principal** de $a$, denotada $\\sqrt[n]{a}$, es el número $b \\in \\mathbb{R}$ tal que:",
          "$$\\sqrt[n]{a} = b \\iff b^n = a$$",
          "*(Si $n$ es par, se exige $a \\ge 0$ y $b \\ge 0$. Si $n$ es impar, $b$ tiene el mismo signo de $a$)*.",
          "• **Propiedad de simplificación:**",
          "$$\\sqrt[n]{a^n} = \\begin{cases} |a| & \\text{si } n \\text{ es par} \\\\ a & \\text{si } n \\text{ es impar} \\end{cases}$$",
          "Ejemplos: $\\sqrt{(-5)^2} = |-5| = 5$, $\\sqrt[3]{(-2)^3} = -2$, $\\sqrt[4]{x^4} = |x|$.",
          "• **Leyes de los Radicales:**",
          "  • 1. $\\sqrt[n]{ab} = \\sqrt[n]{a} \\cdot \\sqrt[n]{b}$",
          "  • 2. $\\sqrt[n]{\\frac{a}{b}} = \\frac{\\sqrt[n]{a}}{\\sqrt[n]{b}}, \\quad (b > 0)$",
          "  • 3. $\\sqrt[m]{\\sqrt[n]{a}} = \\sqrt[mn]{a}$",
          "• **Definición de Exponente Racional:** Para $m, n \\in \\mathbb{Z}$ con $n > 0$:",
          "$$a^{m/n} = \\sqrt[n]{a^m} = (\\sqrt[n]{a})^m$$",
          "Ejemplos:",
          "• $8^{2/3} = (\\sqrt[3]{8})^2 = 2^2 = 4$",
          "• $16^{-3/4} = \\frac{1}{16^{3/4}} = \\frac{1}{(\\sqrt[4]{16})^3} = \\frac{1}{2^3} = \\frac{1}{8}$",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // MÓDULO 6: EXPRESIONES ALGEBRAICAS – POLINOMIOS
  // ══════════════════════════════════════════════════════════════
  6: {
    num: 6,
    title: "Expresiones Algebraicas – Polinomios",
    pdfPages: "Págs. 15 – 21",
    tag: "Álgebra",
    sections: [
      {
        heading: "Expresiones Algebraicas y Definición de Polinomio",
        level: 1,
        content: [
          "Una **expresión algebraica** es una combinación de constantes y variables mediante suma, resta, multiplicación, división y potenciación con exponentes racionales.",
          "Definición: Un **polinomio en la variable $x$** es una expresión algebraica de la forma:",
          "$$P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_1 x + a_0$$",
          "donde $a_0, a_1, \\dots, a_n \\in \\mathbb{R}$ son los **coeficientes**, $n \\in \\mathbb{N} \\cup \\{0\\}$ y $a_n \\neq 0$.",
          "• $n$ es el **grado** del polinomio (denotado $\\deg(P) = n$).",
          "• $a_n$ es el **coeficiente principal** y $a_0$ es el **término independiente**.",
          "• **Clasificación por número de términos:** Monomio ($1$ término), Binomio ($2$ términos), Trinomio ($3$ términos).",
          "Ejemplo: $P(x) = 7x^5 - 3x^4 + 2x^2 + x + 1$ es un polinomio de grado $5$, coeficiente principal $7$ y término independiente $1$.",
        ],
      },
      {
        heading: "Operaciones con Polinomios",
        level: 2,
        content: [
          "• **Suma y Resta:** Se agrupan y reducen los **términos semejantes** (términos con las mismas variables e idénticos exponentes).",
          "• **Multiplicación:** Se aplica la ley distributiva multiplicando cada término del primer polinomio por todos los términos del segundo, aplicando la ley de exponentes $x^m \\cdot x^n = x^{m+n}$.",
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
          "• Si $R(x) = 0$, decimos que $D(x)$ divide exactamente a $P(x)$, y que $D(x)$ es un **factor** de $P(x)$.",
          "• **División Sintética (Regla de Ruffini):** Procedimiento abreviado para dividir un polinomio $P(x)$ entre un binomio lineal de la forma $x - c$.",
          "Ejemplo: Dividir $2x^3 - 7x^2 + 5$ entre $x - 3$ por división sintética:",
          "Coeficientes: $[2, -7, 0, 5]$, con $c = 3$:",
          "• Bajamos el $2$. Multiplicamos $2 \\times 3 = 6$. Sumamos: $-7 + 6 = -1$.",
          "• Multiplicamos $-1 \\times 3 = -3$. Sumamos: $0 + (-3) = -3$.",
          "• Multiplicamos $-3 \\times 3 = -9$. Sumamos: $5 + (-9) = -4$.",
          "Resultado: Cociente $Q(x) = 2x^2 - x - 3$, Residuo $R = -4$.",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // MÓDULO 7: CEROS REALES DE POLINOMIOS
  // ══════════════════════════════════════════════════════════════
  7: {
    num: 7,
    title: "Ceros Reales de Polinomios",
    pdfPages: "Págs. 22 – 25",
    tag: "Álgebra",
    sections: [
      {
        heading: "Teoremas del Residuo y del Factor",
        level: 1,
        content: [
          "Teorema: **Teorema del Residuo:** Si un polinomio $P(x)$ se divide entre el binomio $x - c$, entonces el residuo de la división es igual al valor del polinomio evaluado en $c$:",
          "$$R = P(c)$$",
          "Demostración: Por el algoritmo de la división, $P(x) = (x - c)Q(x) + R$ donde $R$ es una constante. Evaluando en $x = c$: $P(c) = (c - c)Q(c) + R = 0 + R = R$.",
          "Ejemplo: El residuo de dividir $P(x) = 3x^3 - 5x^2 + 2x - 7$ entre $x - 2$ es $P(2) = 3(2)^3 - 5(2)^2 + 2(2) - 7 = 24 - 20 + 4 - 7 = 1$.",
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
          "tiene una raíz racional $\\frac{p}{q}$ (fracción irreducible), entonces:",
          "• $p$ es un divisor entero del término independiente $a_0$.",
          "• $q$ es un divisor entero del coeficiente principal $a_n$.",
          "Ejemplo Completo: Factorizar y hallar los ceros de $P(x) = 2x^3 + x^2 - 13x + 6$:",
          "• Divisores de $a_0 = 6$: $p \\in \\{\\pm 1, \\pm 2, \\pm 3, \\pm 6\\}$.",
          "• Divisores de $a_n = 2$: $q \\in \\{\\pm 1, \\pm 2\\}$.",
          "• Posibles ceros racionales $\\frac{p}{q}$: $\\left\\{ \\pm 1, \\pm 2, \\pm 3, \\pm 6, \\pm \\frac{1}{2}, \\pm \\frac{3}{2} \\right\\}$.",
          "Probando con $c = 2$ mediante división sintética: $P(2) = 2(8) + 4 - 26 + 6 = 0$.",
          "El cociente resultante es $2x^2 + 5x - 3 = (2x - 1)(x + 3)$.",
          "Factorización completa: $P(x) = (x - 2)(2x - 1)(x + 3)$.",
          "Los ceros reales son: $x = 2$, $x = \\frac{1}{2}$, $x = -3$.",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // MÓDULO 8: PRODUCTOS NOTABLES Y FACTORIZACIÓN
  // ══════════════════════════════════════════════════════════════
  8: {
    num: 8,
    title: "Productos Notables y Factorización",
    pdfPages: "Págs. 26 – 32",
    tag: "Álgebra",
    sections: [
      {
        heading: "Fórmulas de Productos Notables",
        level: 1,
        content: [
          "• **1. Cuadrado de un binomio (Trinomio Cuadrado Perfecto):**",
          "$$(a + b)^2 = a^2 + 2ab + b^2$$",
          "$$(a - b)^2 = a^2 - 2ab + b^2$$",
          "• **2. Suma por diferencia (Diferencia de Cuadrados):**",
          "$$(a + b)(a - b) = a^2 - b^2$$",
          "• **3. Cubo de un binomio:**",
          "$$(a + b)^3 = a^3 + 3a^2 b + 3ab^2 + b^3$$",
          "$$(a - b)^3 = a^3 - 3a^2 b + 3ab^2 - b^3$$",
          "• **4. Cuadrado de un trinomio:**",
          "$$(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2ac + 2bc$$",
          "• **5. Producto de binomios con término común:**",
          "$$(x + a)(x + b) = x^2 + (a + b)x + ab$$",
        ],
      },
      {
        heading: "Casos Fundamentales de Factorización",
        level: 1,
        content: [
          "Factorizar una expresión algebraica consiste en expresarla como un producto de factores irreducibles:",
          "• **1. Factor Común:** $ab + ac = a(b + c)$.",
          "• **2. Factor Común por Agrupación:** $ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)$.",
          "• **3. Diferencia de Cuadrados:**",
          "$$a^2 - b^2 = (a - b)(a + b)$$",
          "• **4. Suma y Diferencia de Cubos:**",
          "$$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$",
          "$$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$$",
          "• **5. Trinomio de la forma $x^2 + bx + c$:** Se buscan $p, q \\in \\mathbb{R}$ tales que $p + q = b$ y $pq = c$:",
          "$$x^2 + bx + c = (x + p)(x + q)$$",
          "• **6. Diferencia de potencias $n$-ésimas:**",
          "$$a^n - b^n = (a - b)(a^{n-1} + a^{n-2}b + \\dots + ab^{n-2} + b^{n-1})$$",
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════
  // MÓDULO 9: FACTORIAL Y TEOREMA DEL BINOMIO
  // ══════════════════════════════════════════════════════════════
  9: {
    num: 9,
    title: "Factorial y Teorema del Binomio",
    pdfPages: "Págs. 33 – 37",
    tag: "Álgebra",
    sections: [
      {
        heading: "Definición de Factorial y Coeficientes Binomiales",
        level: 1,
        content: [
          "Definición: Para $n \\in \\mathbb{N}$, el **factorial** de $n$, denotado $n!$, es el producto de todos los números naturales sucesivos desde $1$ hasta $n$:",
          "$$n! = n \\cdot (n - 1) \\cdot (n - 2) \\cdots 3 \\cdot 2 \\cdot 1$$",
          "Por definición y conveniencia: $0! = 1$.",
          "Definición: El **coeficiente binomial** $\\binom{n}{r}$ (combinaciones de $n$ tomados en grupos de $r$) se define como:",
          "$$\\binom{n}{r} = C(n, r) = \\frac{n!}{r!(n - r)!}, \\quad (0 \\le r \\le n)$$",
          "Propiedades de los coeficientes binomiales:",
          "• $\\binom{n}{0} = \\binom{n}{n} = 1$",
          "• $\\binom{n}{1} = \\binom{n}{n-1} = n$",
          "• $\\binom{n}{r} = \\binom{n}{n-r}$ (simetría)",
          "• $\\binom{n}{r} + \\binom{n}{r+1} = \\binom{n+1}{r+1}$ (Identidad de Pascal)",
          "Ejemplo: $\\binom{6}{2} = \\frac{6!}{2! \\cdot 4!} = \\frac{6 \\times 5 \\times 4!}{2 \\times 1 \\times 4!} = \\frac{30}{2} = 15$.",
        ],
      },
      {
        heading: "El Teorema del Binomio de Newton",
        level: 1,
        content: [
          "Teorema: Para todo $n \\in \\mathbb{N}$ y para cualesquiera $x, y \\in \\mathbb{R}$:",
          "$$(x + y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k$$",
          "Desarrollo completo:",
          "$$(x + y)^n = \\binom{n}{0}x^n + \\binom{n}{1}x^{n-1}y + \\binom{n}{2}x^{n-2}y^2 + \\dots + \\binom{n}{n}y^n$$",
          "• **Fórmula del término general:** El término que ocupa la posición $(k+1)$-ésima en la expansión es:",
          "$$T_{k+1} = \\binom{n}{k} x^{n-k} y^k$$",
          "Ejemplo: Desarrollar $(2a + b)^4$:",
          "$$(2a + b)^4 = \\binom{4}{0}(2a)^4 + \\binom{4}{1}(2a)^3 b + \\binom{4}{2}(2a)^2 b^2 + \\binom{4}{3}(2a)b^3 + \\binom{4}{4}b^4$$",
          "$$= 1(16a^4) + 4(8a^3)b + 6(4a^2)b^2 + 4(2a)b^3 + 1(b^4) = 16a^4 + 32a^3 b + 24a^2 b^2 + 8ab^3 + b^4$$",
        ],
      },
      {
        heading: "El Triángulo de Pascal",
        level: 2,
        content: [
          "Los coeficientes binomiales $\\binom{n}{k}$ forman el Triángulo de Pascal, donde cada entrada es la suma de los dos números superiores contiguos:",
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
  },

  // ══════════════════════════════════════════════════════════════
  // MÓDULO 10: EXPRESIONES FRACCIONARIAS Y RACIONALIZACIÓN
  // ══════════════════════════════════════════════════════════════
  10: {
    num: 10,
    title: "Expresiones Fraccionarias, Fracciones Compuestas y Racionalización",
    pdfPages: "Págs. 38 – 42",
    tag: "Álgebra",
    sections: [
      {
        heading: "Expresiones Fraccionarias y Dominio",
        level: 1,
        content: [
          "Una **expresión fraccionaria** es el cociente de dos expresiones algebraicas. Si el numerador y el denominador son polinomios, se llama **expresión racional**:",
          "$$R(x) = \\frac{P(x)}{Q(x)}$$",
          "• **Dominio:** Es el conjunto de todos los números reales para los cuales el denominador no se anula:",
          "$$\\text{Dom}(R) = \\{x \\in \\mathbb{R} \\mid Q(x) \\neq 0\\}$$",
          "Ejemplo: Para $R(x) = \\frac{x + 3}{x^2 - 4}$, como $x^2 - 4 = (x-2)(x+2) = 0 \\implies x = \\pm 2$, el dominio es $\\mathbb{R} \\setminus \\{-2, 2\\}$.",
        ],
      },
      {
        heading: "Fracciones Compuestas",
        level: 1,
        content: [
          "Una fracción compuesta contiene una o más expresiones fraccionarias en su numerador o en su denominador.",
          "Ejemplo: Simplificar $\\frac{\\frac{a-b}{a} - \\frac{a+b}{b}}{\\frac{a-b}{b} + \\frac{a+b}{a}}$:",
          "Calculando el común denominador $ab$ tanto en el numerador como en el denominador:",
          "$$\\frac{\\frac{b(a-b) - a(a+b)}{ab}}{\\frac{a(a-b) + b(a+b)}{ab}} = \\frac{ab - b^2 - a^2 - ab}{a^2 - ab + ab + b^2} = \\frac{-a^2 - b^2}{a^2 + b^2} = \\frac{-(a^2 + b^2)}{a^2 + b^2} = -1$$",
        ],
      },
      {
        heading: "Técnicas de Racionalización",
        level: 1,
        content: [
          "Racionalizar consiste en eliminar los radicales de una fracción multiplicando numerador y denominador por un factor conveniente unitario:",
          "• **1. Denominador con monomio radical $\\sqrt{a}$:**",
          "$$\\frac{1}{\\sqrt{a}} = \\frac{1}{\\sqrt{a}} \\cdot \\frac{\\sqrt{a}}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}$$",
          "• **2. Denominador con radical de orden $n$ ($\\sqrt[n]{a^m}$, $m < n$):**",
          "$$\\frac{1}{\\sqrt[n]{a^m}} = \\frac{1}{\\sqrt[n]{a^m}} \\cdot \\frac{\\sqrt[n]{a^{n-m}}}{\\sqrt[n]{a^{n-m}}} = \\frac{\\sqrt[n]{a^{n-m}}}{a}$$",
          "• **3. Denominador con binomio con raíces cuadradas (Uso del Conjugado):**",
          "El conjugado de $a + b\\sqrt{c}$ es $a - b\\sqrt{c}$:",
          "$$\\frac{1}{a + b\\sqrt{c}} = \\frac{1}{a + b\\sqrt{c}} \\cdot \\frac{a - b\\sqrt{c}}{a - b\\sqrt{c}} = \\frac{a - b\\sqrt{c}}{a^2 - b^2 c}$$",
          "Ejemplo: Racionalizar $\\frac{2}{3 - \\sqrt{5}}$:",
          "$$\\frac{2}{3 - \\sqrt{5}} = \\frac{2(3 + \\sqrt{5})}{(3 - \\sqrt{5})(3 + \\sqrt{5})} = \\frac{2(3 + \\sqrt{5})}{9 - 5} = \\frac{2(3 + \\sqrt{5})}{4} = \\frac{3 + \\sqrt{5}}{2}$$",
          "• **4. Denominador con raíces cúbicas ($\\sqrt[3]{a} - \\sqrt[3]{b}$):**",
          "Multiplicamos por el factor trinómico $(\\sqrt[3]{a^2} + \\sqrt[3]{ab} + \\sqrt[3]{b^2})$:",
          "$$\\frac{1}{\\sqrt[3]{a} - \\sqrt[3]{b}} = \\frac{\\sqrt[3]{a^2} + \\sqrt[3]{ab} + \\sqrt[3]{b^2}}{a - b}$$",
        ],
      },
      {
        heading: "Errores Algebraicos Frecuentes a Evitar",
        level: 1,
        content: [
          "• $(a + b)^2 \\neq a^2 + b^2 \\quad \\text{(Falta el término central } 2ab\\text{)}",
          "• $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$",
          "• $\\sqrt{a^2 + b^2} \\neq a + b$",
          "• $\\frac{1}{a} + \\frac{1}{b} \\neq \\frac{1}{a + b} \\quad \\left(\\text{lo correcto es } \\frac{a+b}{ab}\\right)$",
          "• $\\frac{a + b}{a} \\neq 1 + b \\quad \\left(\\text{lo correcto es } 1 + \\frac{b}{a}\\right)$",
          "• $(a + b)^{-1} \\neq a^{-1} + b^{-1}$",
        ],
      },
    ],
  },
};
