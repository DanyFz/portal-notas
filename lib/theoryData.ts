export interface TheorySection {
  title: string;
  body: string[];
}

export interface SolvedExample {
  title: string;
  problem: string;
  solution: string[];
}

export interface TheoryModuleFull {
  num: number;
  title: string;
  page: number;
  pdfPages: string;
  blockId: "algebra" | "ecuaciones_geometria" | "funciones" | "trigonometria";
  tag: "Álgebra" | "Geometría" | "Funciones" | "Trigonometría";
  summary: string;
  institutionHeader?: string;
  sections: TheorySection[];
  properties?: string[];
  notes?: string[];
  examples: SolvedExample[];
}

export const THEORY_MODULES_FULL_DATA: Record<number, TheoryModuleFull> = {
  // -------------------------------------------------------------
  // MÓDULO 1: NOCIONES SOBRE CONJUNTOS (PDF Págs 1 - 3)
  // -------------------------------------------------------------
  1: {
    num: 1,
    title: "Teoría Intuitiva de Conjuntos",
    page: 1,
    pdfPages: "Páginas 1 a 3",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Noción de conjuntos, pertenencia, inclusión, operaciones entre conjuntos (unión, intersección, complemento, diferencia) y diagramas de Venn.",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "NOCIONES SOBRE CONJUNTOS",
        body: [
          "Un conjunto es una colección de objetos, llamados elementos del conjunto.",
          "Un conjunto puede describirse:",
          "• Por extensión: haciendo una lista explícita de sus elementos, separados por comas y encerrados entre llaves.",
          "• Por comprensión: dando la condición o condiciones que cumplen los elementos del conjunto.",
          "Ejemplo: A = {x / x es una vocal de la palabra eucalipto} es un conjunto descrito por comprensión, y su respectiva descripción por extensión es A = {a, e, i, o, u}.",
          "Si un conjunto no tiene elementos se llama conjunto vacío y se denota por ∅ ó { }.",
          "Si un conjunto es vacío o su número de elementos es un número natural, se dice que el conjunto es finito. Si un conjunto no es finito, se dice que es infinito.",
          "Si A es un conjunto, decimos que 'a pertenece a A' y escribimos a ∈ A si a es un elemento de A. En caso contrario decimos que 'a no pertenece a A' y escribimos a ∉ A.",
          "Si A y B son conjuntos, decimos que 'A es subconjunto de B' y escribimos A ⊆ B, si todo elemento de A es también elemento de B. En caso de que haya al menos un elemento en el conjunto A que no pertenece al conjunto B, decimos que A no es subconjunto de B, y escribimos A ⊄ B.",
          "Usando diagramas de Venn, podemos representar gráficamente los conjuntos.",
          "Dos conjuntos A y B son iguales si y sólo si A ⊆ B y B ⊆ A. Es decir, A = B si y sólo si todo elemento de A está en B y todo elemento de B está en A."
        ]
      },
      {
        title: "OPERACIONES ENTRE CONJUNTOS",
        body: [
          "1. Unión: Sean A y B dos conjuntos. Definimos la unión de A y B, denotada A ∪ B, como el conjunto A ∪ B = {x / x ∈ A ó x ∈ B}.",
          "2. Intersección: Sean A y B dos conjuntos. Definimos la intersección de A y B, denotada A ∩ B, como el conjunto A ∩ B = {x / x ∈ A y x ∈ B}.",
          "3. Complemento: Si U es un conjunto universal y A es un subconjunto de U, definimos el complemento de A, denotado A', como el conjunto A' = {x ∈ U / x ∉ A}.",
          "4. Diferencia: Sean A y B dos conjuntos. Definimos la diferencia de A y B, denotada A - B, como A - B = {x / x ∈ A y x ∉ B}.",
          "5. Diferencia Simétrica: Definimos la diferencia simétrica de A y B, denotada A Δ B, como A Δ B = (A ∪ B) - (A ∩ B), o equivalentemente A Δ B = (A - B) ∪ (B - A)."
        ]
      }
    ],
    properties: [
      "Propiedades de la Inclusión: a) ∅ ⊆ A,  b) A ⊆ A,  c) Si A ⊆ B y B ⊆ C entonces A ⊆ C.",
      "Propiedades de la Unión e Intersección:\n• A ∪ A = A ,   A ∩ A = A\n• A ∪ ∅ = A ,   A ∩ ∅ = ∅\n• A ⊆ (A ∪ B) ,   (A ∩ B) ⊆ A\n• B ⊆ (A ∪ B) ,   (A ∩ B) ⊆ B\n• A ∪ B = B ∪ A ,   A ∩ B = B ∩ A (Conmutatividad)\n• A ∪ (B ∪ C) = (A ∪ B) ∪ C ,   A ∩ (B ∩ C) = (A ∩ B) ∩ C (Asociatividad)\n• A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C) (Distributividad de ∪ sobre ∩)\n• A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) (Distributividad de ∩ sobre ∪)",
      "Propiedades del Complemento:\na) (A')' = A\nb) A ∪ A' = U\nc) A ∩ A' = ∅\nd) (A ∪ B)' = A' ∩ B' (Leyes de De Morgan)\ne) (A ∩ B)' = A' ∪ B' (Leyes de De Morgan)",
      "Propiedades de la Diferencia:\na) A - B = A ∩ B'\nb) A - B ≠ B - A\nc) A - A = ∅\nd) A - ∅ = A\ne) U - A = A'"
    ],
    notes: [
      "Nota: Las propiedades (A ∪ B)' = A' ∩ B' y (A ∩ B)' = A' ∪ B' son conocidas como las 'Leyes de De Morgan'."
    ],
    examples: [
      {
        title: "Ejemplo 1: Conjunto Finito e Infinito",
        problem: "Analizar si los conjuntos A = {1, 2, 3} y B = {1/2, 1/3, 1/4, 1/5, ...} son finitos o infinitos.",
        solution: [
          "• A = {1, 2, 3} es finito ya que posee exactamente 3 elementos.",
          "• B = {1/2, 1/3, 1/4, 1/5, ...} es infinito ya que no podemos asignar un número natural para su número de elementos."
        ]
      },
      {
        title: "Ejemplo 2: Unión e Intersección",
        problem: "Sean A = {1, 3, 5, 7, 9} y B = {0, 3, 6, 9, 12}. Calcular A ∪ B y A ∩ B.",
        solution: [
          "Unión: A ∪ B = {0, 1, 3, 5, 6, 7, 9, 12}.",
          "Intersección: A ∩ B = {3, 9} (elementos que están en A y en B)."
        ]
      },
      {
        title: "Ejemplo 3: Complemento de un Conjunto",
        problem: "Si U = {a, b, c, d, e, f, g, h} y A = {c, f, h}, hallar A'.",
        solution: [
          "A' = {x ∈ U / x ∉ A} = {a, b, d, e, g}."
        ]
      },
      {
        title: "Ejemplo 4: Diferencia y Diferencia Simétrica",
        problem: "Sean A = {0, 1, 2, 3, 4, 5, 6, 7} y B = {1, 4, 6, 7, 8, 9}. Calcular A - B y A Δ B.",
        solution: [
          "• Diferencia: A - B = {0, 2, 3, 5} (elementos de A que no están en B).",
          "• Diferencia Simétrica: A Δ B = (A - B) ∪ (B - A) = {0, 2, 3, 5} ∪ {8, 9} = {0, 2, 3, 5, 8, 9}."
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // MÓDULO 2: PROPIEDADES DE LOS NÚMEROS REALES Y FRACCIONARIOS (PDF Págs 4 - 7)
  // -------------------------------------------------------------
  2: {
    num: 2,
    title: "Propiedades de los Números Reales y Fraccionarios",
    page: 4,
    pdfPages: "Páginas 4 a 7",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Sistemas numéricos (N, Z, Q, I, R), axiomas de los números reales, leyes de signos, divisibilidad, MCD, MCM y operaciones con fracciones.",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "SISTEMAS NUMÉRICOS",
        body: [
          "• Los números naturales son N = {1, 2, 3, 4, ...}.",
          "• Los números enteros están formados por los números naturales junto con los números negativos y el 0: Z = {..., -3, -2, -1, 0, 1, 2, 3, ...}.",
          "• El conjunto de los números racionales Q se obtiene al formar cocientes de números enteros: r ∈ Q si y sólo si r = p/q, con p,q ∈ Z, q ≠ 0.",
          "¡Recordar que no es posible dividir por cero, por tanto, expresiones como 3/0 ó 0/0 no están definidas!",
          "• Existen números que no pueden expresarse en la forma p/q con p,q ∈ Z, q ≠ 0. Estos números se denominan irracionales (I). Ejemplos: √2, √3, √5, e, π ∈ I.",
          "• El conjunto de los números reales R consta de la unión de los racionales y los irracionales: R = Q ∪ I.",
          "Representación decimal: Si el número es racional, su parte decimal correspondiente es periódica (ej: 1/2 = 0.50, 1/3 = 0.333..., 9/7 = 1.285714...). Si es irracional, la representación decimal no es periódica (√2 ≈ 1.4142, e ≈ 2.71828, π ≈ 3.1416)."
        ]
      },
      {
        title: "OPERACIONES CON LOS NÚMEROS REALES",
        body: [
          "En R se definen dos operaciones: suma (o adición) y producto (o multiplicación). Cumplen las siguientes propiedades:",
          "• Conmutativa: a + b = b + a ,   ab = ba",
          "• Asociativa: (a + b) + c = a + (b + c) ,   (ab)c = a(bc)",
          "• Distributiva del producto respecto a la suma: a(b + c) = ab + ac",
          "Otras propiedades fundamentales:",
          "• Elemento neutro para la suma: 0 ∈ R tal que a + 0 = a.",
          "• Inverso aditivo: Para a ∈ R, existe (-a) ∈ R tal que a + (-a) = 0.",
          "• Elemento neutro para el producto: 1 ∈ R tal que a · 1 = a.",
          "• Inverso multiplicativo (recíproco): Para a ∈ R (a ≠ 0), existe (1/a) ∈ R tal que a · (1/a) = 1. Se denota por a⁻¹.",
          "• Resta o diferencia: a - b = a + (-b).",
          "• Cociente o división: a / b = a · (1/b) (b ≠ 0)."
        ]
      },
      {
        title: "CARACTERIZACIÓN DE ALGUNOS NÚMEROS Y ARITMÉTICA",
        body: [
          "• Número par: a = 2k, con k ∈ Z. Número impar: a = 2k + 1, con k ∈ Z.",
          "• Divisor o Factor: d divide a b si existe a ∈ Z tal que b = ad.",
          "• Máximo Común Divisor (MCD): d es el mayor entero positivo que divide a a y a b.",
          "• Mínimo Común Múltiplo (MCM): m es el menor entero positivo que es múltiplo de a y de b.",
          "• Primos Relativos: Dos enteros a y b son primos relativos si su MCD es 1.",
          "• Número Primo: Entero p > 1 cuyos únicos divisores positivos son 1 y p.",
          "• Teorema Fundamental de la Aritmética: Todo número entero mayor que 1 puede descomponerse en forma única como un producto de factores primos."
        ]
      },
      {
        title: "OPERACIONES CON FRACCIONES",
        body: [
          "1. Suma de fracciones con el mismo denominador: a/c + b/c = (a + b)/c  (c ≠ 0).",
          "2. Suma con distinto denominador: Se halla el Mínimo Común Denominador (MCD de los denominadores), se amplían las fracciones y se suman sus numeradores.",
          "3. Producto de fracciones: (a/b) · (c/d) = (ac) / (bd)  (b, d ≠ 0).",
          "4. Cociente de fracciones: (a/b) ÷ (c/d) = (a/b) · (d/c) = (ad) / (bc)  (b, c, d ≠ 0)."
        ]
      }
    ],
    properties: [
      "Leyes de Signos:\n1. (-1)a = -a\n2. -(-a) = a\n3. (-a)b = a(-b) = -ab\n4. (-a)(-b) = ab\n5. -(a + b) = -a - b\n6. -(a - b) = b - a\n7. -(a + b + c) = -a - b - c",
      "Prueba de Igualdad de Fracciones: a/b = c/d ⇔ ad = bc  (b, d ≠ 0)."
    ],
    notes: [
      "Nota: En la descomposición de un número, los factores primos pueden repetirse y el orden no importa por la propiedad conmutativa."
    ],
    examples: [
      {
        title: "Ejemplo 1: Expresiones con Paréntesis",
        problem: "Escriba sin usar paréntesis: a) -(-x + y) ,  b) -(x - y + z).",
        solution: [
          "a) -(-x + y) = -(-x) - y = x - y.",
          "b) -(x - y + z) = -x - (-y) - z = -x + y - z."
        ]
      },
      {
        title: "Ejemplo 2: Convertir Decimal Periódico a Fracción Racional",
        problem: "Convertir x = 5.4383838... en cociente de dos enteros.",
        solution: [
          "1000x = 5438.3838...",
          "- 10x =  -54.3838...",
          "---------------------",
          "990x  = 5384  ⇒  x = 5384 / 990 = 2692 / 495."
        ]
      },
      {
        title: "Ejemplo 3: Suma de Fracciones con MCM",
        problem: "Calcule: 3/64 + 7/48.",
        solution: [
          "64 = 2⁶  y  48 = 2⁴ · 3. MCM(64, 48) = 2⁶ · 3 = 192.",
          "Ampliando fracciones: 3/64 = (3·3)/192 = 9/192. 7/48 = (7·4)/192 = 28/192.",
          "Suma: 9/192 + 28/192 = 37/192."
        ]
      },
      {
        title: "Ejemplo 4: Cociente de Fracciones",
        problem: "Calcule (2/5) ÷ (3/7).",
        solution: [
          "(2/5) ÷ (3/7) = (2/5) · (7/3) = 14 / 15."
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // MÓDULO 3: RECTA NUMÉRICA, ORDEN E INTERVALOS (PDF Págs 8 - 10)
  // -------------------------------------------------------------
  3: {
    num: 3,
    title: "Recta Numérica, Orden e Intervalos",
    page: 7,
    pdfPages: "Páginas 7 a 10",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Representación geométrica en la recta real, relación de orden (mayor/menor) e intervalos abiertos, cerrados y semiabiertos.",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "ORDEN EN LOS NÚMEROS REALES",
        body: [
          "Todo número real se puede representar gráficamente como un punto sobre una línea recta llamada recta real. Existe una correspondencia biunívoca entre los elementos de R y los puntos de la recta real. El punto 0 es el origen.",
          "Los números positivos están a la derecha de 0 y los negativos a la izquierda.",
          "Definición (Sean a, b ∈ R):",
          "• Decimos que a es mayor que b y escribimos a > b, si a - b es un número positivo.",
          "• Decimos que a es menor que b y escribimos a < b, si a - b es un número negativo.",
          "• La expresión a ≤ b es equivalente a a < b ó a = b ('a es menor o igual a b').",
          "• La expresión a ≥ b es equivalente a a > b ó a = b ('a es mayor o igual a b').",
          "Intuitivamente, los números reales están ordenados: para a y b reales, siempre se cumple a > b, a < b o a = b (Tricotomía)."
        ]
      },
      {
        title: "INTERVALOS",
        body: [
          "Un intervalo es un subconjunto de R de ciertas características.",
          "• Intervalo abierto (a, b) = {x ∈ R / a < x < b}: números entre a y b, sin incluir a ni b.",
          "• Intervalo cerrado [a, b] = {x ∈ R / a ≤ x ≤ b}: incluye los extremos a y b.",
          "Tabla de Intervalos:",
          "1. (a, b) = {x / a < x < b}  (Abierto)",
          "2. [a, b] = {x / a ≤ x ≤ b}  (Cerrado)",
          "3. [a, b) = {x / a ≤ x < b}  (Semiabierto a la derecha)",
          "4. (a, b] = {x / a < x ≤ b}  (Semiabierto a la izquierda)",
          "5. (a, ∞) = {x / x > a}  (Infinito abierto)",
          "6. [a, ∞) = {x / x ≥ a}  (Infinito cerrado)",
          "7. (-∞, b) = {x / x < b}  (Infinito abierto)",
          "8. (-∞, b] = {x / x ≤ b}  (Infinito cerrado)",
          "9. (-∞, ∞) = R"
        ]
      }
    ],
    properties: [
      "Propiedades de Orden:\n1. Si a ∈ R, entonces a² = a · a ≥ 0, y a² = 0 sólo si a = 0. En particular, 1 > 0.\n2. Si a ≤ b y b ≤ c ⇒ a ≤ c (Transitividad).\n3. a ≤ b ⇔ a + c ≤ b + c (Se preserva al sumar c).\n4. Si a ≤ b y c > 0 ⇒ ac ≤ bc.\n5. Si a ≤ b y c < 0 ⇒ ac ≥ bc (Multiplicar por negativo invierte la desigualdad).\n6. Si a > 0, b > 0 y a ≥ b ⇒ 1/a ≤ 1/b.",
      "Observaciones de Signo:\n• a > 0 ⇔ -a < 0 (si a es positivo, -a es negativo).\n• a < 0 ⇔ -a > 0 (si a es negativo, -a es positivo)."
    ],
    examples: [
      {
        title: "Ejemplo 1: Comparación de Orden",
        problem: "Verificar las desigualdades 3 < 5  y  3(-3) > 8(-3).",
        solution: [
          "• 3 < 5 pues 5 - 3 = 2 > 0.",
          "• Como -3 < 0, al multiplicar 3 < 8 por -3 se invierte la desigualdad: 3(-3) > 8(-3), es decir, -9 > -24."
        ]
      },
      {
        title: "Ejemplo 2: Operaciones con Intervalos",
        problem: "Hallar [5, 9] ∪ (3, 6)  y  [5, 9] ∩ (3, 6).",
        solution: [
          "• [5, 9] ∪ (3, 6) = {x ∈ R / 5 ≤ x ≤ 9} ∪ {x ∈ R / 3 < x < 6} = {x ∈ R / 3 < x ≤ 9} = (3, 9].",
          "• [5, 9] ∩ (3, 6) = {x ∈ R / 5 ≤ x ≤ 9} ∩ {x ∈ R / 3 < x < 6} = {x ∈ R / 5 ≤ x < 6} = [5, 6)."
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // MÓDULO 4: VALOR ABSOLUTO Y DISTANCIA (PDF Pág 11)
  // -------------------------------------------------------------
  4: {
    num: 4,
    title: "Valor Absoluto y Distancia",
    page: 10,
    pdfPages: "Página 11",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Definición rigurosa del valor absoluto, propiedades, interpretación geométrica como distancia entre dos puntos en la recta real.",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "DISTANCIA Y VALOR ABSOLUTO",
        body: [
          "Si a y b son dos números reales, la distancia entre a y b, denotada por d(a, b), es la medida del segmento que los une en la recta real.",
          "Propiedades de la distancia: d(a, b) ≥ 0; d(a, b) = 0 cuando a = b; d(a, b) = d(b, a).",
          "El valor absoluto de un número a, denotado por |a|, es la distancia desde a hasta 0, es decir |a| = d(a, 0).",
          "Definición: Para cualquier número real a, |a| ≥ 0, donde:\n  |a| = a   si a ≥ 0\n  |a| = -a  si a < 0",
          "Ejemplos: |8| = 8; |-7| = -(-7) = 7; |0| = 0.",
          "Fórmula de Distancia con Valor Absoluto:\n  a) |a - b| = |b - a|\n  b) d(a, b) = |a - b|",
          "En efecto:\n  Si a ≥ b ⇒ d(a, b) = a - b = |a - b|.\n  Si a ≤ b ⇒ d(a, b) = b - a = -(a - b) = |a - b|."
        ]
      }
    ],
    properties: [
      "Propiedades del Valor Absoluto (Sean a, b ∈ R):\n1. |a| ≥ 0\n2. |a| = |-a|\n3. -|a| ≤ a ≤ |a|\n4. |ab| = |a| |b|\n5. |a / b| = |a| / |b|  (con b ≠ 0)\n6. |a + b| ≤ |a| + |b| (Desigualdad Triangular; la igualdad se cumple cuando a y b tienen el mismo signo)."
    ],
    examples: [
      {
        title: "Ejemplo 1: Evaluación de Expresiones",
        problem: "Evaluar |3 - e| y |2 - π| sabiendo que e ≈ 2.71828 y π ≈ 3.1416.",
        solution: [
          "• |3 - e|: Como e < 3 ⇒ 3 - e > 0, por tanto |3 - e| = 3 - e.",
          "• |2 - π|: Como 2 < π ⇒ 2 - π < 0, por tanto |2 - π| = -(2 - π) = π - 2."
        ]
      },
      {
        title: "Ejemplo 2: Cálculo de Distancias",
        problem: "Calcular la distancia entre -2 y 3.",
        solution: [
          "d(-2, 3) = |3 - (-2)| = |3 + 2| = |5| = 5.",
          "Geométricamente, la distancia entre -2 y 3 es 5 unidades."
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // MÓDULO 5: POTENCIACIÓN Y RADICACIÓN (PDF Págs 12 - 15)
  // -------------------------------------------------------------
  5: {
    num: 5,
    title: "Potenciación y Radicación",
    page: 11,
    pdfPages: "Páginas 12 a 15",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Leyes de los exponentes enteros y racionales, propiedades de los radicales, simplificación y operaciones con radicales.",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "POTENCIACIÓN Y EXPONENTES ENTEROS",
        body: [
          "Si a, x ∈ R, una expresión de la forma a^x se llama expresión exponencial, donde a es la base y x es el exponente.",
          "• Exponentes enteros positivos: aⁿ = a · a · ... · a (n factores).",
          "• Exponente cero: a⁰ = 1 (para a ≠ 0). La expresión 0⁰ no tiene sentido.",
          "• Exponentes enteros negativos: a⁻ⁿ = 1 / aⁿ (para a ≠ 0, n > 0)."
        ]
      },
      {
        title: "NOTACIÓN CIENTÍFICA",
        body: [
          "Un número x está escrito en notación científica si está expresado en la forma x = a × 10ⁿ, donde 1 ≤ |a| < 10 y n ∈ Z.",
          "Ejemplos: 325.32 = 3.2532 × 10²;  0.000354 = 3.54 × 10⁻⁴;  -2/25 = -8 × 10⁻²."
        ]
      },
      {
        title: "EXPONENTES RACIONALES Y RADICALES",
        body: [
          "• Cuando el exponente es 1/n, a¹/ⁿ = ⁿ√a (raíz n-ésima principal de a).",
          "• Definición: ⁿ√a = b significa bⁿ = a.",
          "  - Si n es par: bⁿ ≥ 0 implica a ≥ 0 y b ≥ 0 (solo definida para a ≥ 0).",
          "  - Si n es impar: ⁿ√a está definida para todo a ∈ R.",
          "• Exponentes aᵐ/ⁿ: aᵐ/ⁿ = (a¹/ⁿ)ᵐ = (ⁿ√a)ᵐ, ó aᵐ/ⁿ = (aᵐ)¹/ⁿ = ⁿ√(aᵐ)."
        ]
      }
    ],
    properties: [
      "Leyes de los Exponentes Enteros:\n1. aᵐ · aⁿ = aᵐ⁺ⁿ\n2. aᵐ / aⁿ = aᵐ⁻ⁿ (a ≠ 0)\n3. (aᵐ)ⁿ = aᵐⁿ\n4. (ab)ⁿ = aⁿ bⁿ\n5. (a/b)ⁿ = aⁿ / bⁿ (b ≠ 0)\n6. (a/b)⁻ⁿ = (b/a)ⁿ\n7. a⁻ⁿ / b⁻ᵐ = bᵐ / aⁿ",
      "Propiedades de los Radicales:\n1. ⁿ√(ab) = ⁿ√a · ⁿ√b\n2. ⁿ√(a/b) = ⁿ√a / ⁿ√b\n3. ᵐ√(ⁿ√a) = ᵐⁿ√a\n4. ⁿ√(cⁿ) = |c| (si n es par)\n5. ⁿ√(cⁿ) = c (si n es impar)\n6. c ⁿ√b + d ⁿ√b = (c + d) ⁿ√b"
    ],
    examples: [
      {
        title: "Ejemplo 1: Leyes de Exponentes",
        problem: "Simplificar [(3xy²) / (2x⁻¹z²)]² · [x²z² / (3y²)].",
        solution: [
          "= [ 9x²y⁴ / (4x⁻²z⁴) ] · [ x²z² / (3y²) ]",
          "= [ 9x⁴y⁴ / (4z⁴) ] · [ x²z² / (3y²) ]",
          "= (9 · 1 / (4 · 3)) · (x⁴ · x²) · (y⁴ / y²) · (z² / z⁴)",
          "= (3/4) x⁶ y² z⁻² = (3x⁶y²) / (4z²)."
        ]
      },
      {
        title: "Ejemplo 2: Exponentes Racionales",
        problem: "Evaluar (-27 / 8)^(2/3).",
        solution: [
          "= [ ∛(-27) / ∛8 ]² = [ -3 / 2 ]² = 9 / 4."
        ]
      },
      {
        title: "Ejemplo 3: Operaciones con Radicales",
        problem: "Simplificar ∛(x³y⁹)  y  ⁴√48 - ⁴√3.",
        solution: [
          "a) ∛(x³y⁹) = ∛(x³) · ∛((y³)³) = x · y³.",
          "b) ⁴√48 - ⁴√3 = ⁴√(16 · 3) - ⁴√3 = 2 ⁴√3 - ⁴√3 = ⁴√3."
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // MÓDULO 6: EXPRESIONES ALGEBRAICAS Y POLINOMIOS (PDF Págs 16 - 21)
  // -------------------------------------------------------------
  6: {
    num: 6,
    title: "Expresiones Algebraicas Polinomios",
    page: 15,
    pdfPages: "Páginas 16 a 21",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Clasificación de polinomios, grado, operaciones fundamentales (suma, resta, producto y división sintética/larga de polinomios).",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "POLINOMIOS Y OPERACIONES",
        body: [
          "Una expresión algebraica es una combinación de constantes y variables mediante suma, resta, multiplicación, división y potenciación.",
          "Un polinomio en la variable x es una expresión de la forma P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀, donde los aᵢ son números reales y n es un entero no negativo. Si aₙ ≠ 0, el polinomio es de grado n.",
          "• Suma y Resta: Se efectúa agrupando términos semejantes.",
          "• Multiplicación: Utiliza la propiedad distributiva y las leyes de exponentes."
        ]
      },
      {
        title: "DIVISIÓN DE POLINOMIOS",
        body: [
          "Si P(x) (dividendo) y D(x) (divisor) son polinomios con D(x) ≠ 0 y grado(P) ≥ grado(D), existen polinomios Q(x) (cociente) y R(x) (residuo) tales que:",
          "  P(x) / D(x) = Q(x) + R(x) / D(x)   o   P(x) = D(x) · Q(x) + R(x)",
          "donde el grado del residuo R(x) es menor que el grado de D(x)."
        ]
      },
      {
        title: "DIVISIÓN SINTÉTICA",
        body: [
          "Método abreviado para dividir P(x) entre divisores lineales de la forma (x - c).",
          "Procedimiento: Se escriben los coeficientes del dividendo y el valor c. Se baja el primer coeficiente, se multiplica por c y se suma al siguiente coeficiente, repitiendo el proceso hasta hallar el residuo final."
        ]
      }
    ],
    properties: [
      "Productos Notables Fundamentales:\n1. (a + b)(a - b) = a² - b²\n2. (a + b)² = a² + 2ab + b²\n3. (a - b)² = a² - 2ab + b²\n4. (a + b)³ = a³ + 3a²b + 3ab² + b³\n5. (a - b)³ = a³ - 3a²b + 3ab² - b³"
    ],
    examples: [
      {
        title: "Ejemplo 1: Resta de Polinomios",
        problem: "De (3x² + x + 1) restar (2x² - 3x - 5).",
        solution: [
          "(3x² + x + 1) - (2x² - 3x - 5) = 3x² + x + 1 - 2x² + 3x + 5",
          "= (3 - 2)x² + (1 + 3)x + (1 + 5) = x² + 4x + 6."
        ]
      },
      {
        title: "Ejemplo 2: División Larga de Polinomios",
        problem: "Dividir 5x³ - 2x + 1 entre x + 1.",
        solution: [
          "Agregando 0x²: (5x³ + 0x² - 2x + 1) ÷ (x + 1).",
          "Cociente Q(x) = 5x² - 5x + 3.",
          "Residuo R(x) = -2.",
          "Resultado: (5x³ - 2x + 1)/(x + 1) = 5x² - 5x + 3 + (-2)/(x + 1)."
        ]
      },
      {
        title: "Ejemplo 3: División Sintética",
        problem: "Dividir x⁴ - 3x² + 2x - 5 entre x + 2.",
        solution: [
          "Coeficientes: 1, 0, -3, 2, -5  con c = -2.",
          "  1   0  -3   2  -5 | -2\n     -2   4  -2   0\n ----------------------\n  1  -2   1   0  -5 (residuo)",
          "Cociente Q(x) = x³ - 2x² + x  y Residuo R = -5."
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // MÓDULO 7: CEROS REALES DE POLINOMIOS (PDF Págs 22 - 25)
  // -------------------------------------------------------------
  7: {
    num: 7,
    title: "Ceros Reales de Polinomios",
    page: 21,
    pdfPages: "Páginas 22 a 25",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Teorema del residuo, teorema del factor, ceros racionales y factorización completa de polinomios de grado superior.",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "TEOREMAS SOBRE CEROS DE POLINOMIOS",
        body: [
          "• Teorema del Residuo: Si un polinomio P(x) se divide entre x - c, el residuo de la división es R = P(c).",
          "• Teorema del Factor: Si c ∈ R y P(x) es un polinomio, (x - c) es un factor de P(x) si y sólo si P(c) = 0.",
          "• Ceros de un Polinomio: Los ceros reales o raíces de P(x) son los valores c tales que P(c) = 0. Corresponden geométricamente a las intersecciones de la gráfica y = P(x) con el eje X.",
          "• Multiplicidad: Si P(x) = (x - c)ᵐ Q(x), se dice que c es un cero de multiplicidad m."
        ]
      },
      {
        title: "TEOREMA DE CEROS RACIONALES",
        body: [
          "Si el polinomio P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀ tiene coeficientes enteros, entonces todo cero racional de P tiene la forma p/q, donde:",
          "  p es un factor (divisor) del término independiente a₀.",
          "  q es un factor (divisor) del coeficiente principal aₙ."
        ]
      }
    ],
    properties: [
      "Equivalencias para c ∈ R:\n1. c es un cero de P(x).\n2. x = c es una raíz de P(x) = 0.\n3. (x - c) es un factor de P(x).\n4. El punto (c, 0) es corte con el eje X."
    ],
    examples: [
      {
        title: "Ejemplo 1: Teorema del Residuo",
        problem: "Sin realizar la división, halle el residuo de dividir P(x) = -3x² + 2x - 1 entre x - 4.",
        solution: [
          "Con c = 4: R = P(4) = -3(4)² + 2(4) - 1 = -3(16) + 8 - 1 = -48 + 8 - 1 = -41."
        ]
      },
      {
        title: "Ejemplo 2: Teorema del Factor",
        problem: "Pruebe que x + 3 es un factor del polinomio P(x) = x³ + x² - 2x + 12.",
        solution: [
          "Evaluando en c = -3: P(-3) = (-3)³ + (-3)² - 2(-3) + 12 = -27 + 9 + 6 + 12 = 0.",
          "Como P(-3) = 0, (x + 3) es un factor de P(x)."
        ]
      },
      {
        title: "Ejemplo 3: Teorema de Ceros Racionales y Factorización Completa",
        problem: "Factorice completamente P(x) = x⁴ - 5x³ - 5x² + 23x + 10.",
        solution: [
          "Posibles ceros racionales p/q (factores de 10): ±1, ±2, ±5, ±10.",
          "Evaluando: P(2) = 0 (x - 2 es factor). Dividiendo por x - 2 da x³ - 7x² + 9x + 5.",
          "Para el nuevo polinomio, P(5) = 0 (x - 5 es factor). Dividiendo da x² - 2x - 1.",
          "Las raíces cuadráticas de x² - 2x - 1 son 1 ± √2.",
          "Factorización completa: P(x) = (x + 2)(x - 5)[x - (1 + √2)][x - (1 - √2)]."
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // MÓDULO 8: PRODUCTOS NOTABLES Y FACTORIZACIÓN (PDF Págs 26 - 32)
  // -------------------------------------------------------------
  8: {
    num: 8,
    title: "Productos Notables y Factorización",
    page: 25,
    pdfPages: "Páginas 26 a 32",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Fórmulas de productos notables (cuadrados, cubos), métodos de factorización: factor común, agrupación, trinomios y diferencias.",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "PRODUCTOS NOTABLES",
        body: [
          "1. (a + b)(a - b) = a² - b²",
          "2. (a + b)² = a² + 2ab + b²",
          "3. (a - b)² = a² - 2ab + b²",
          "4. (a + b)³ = a³ + 3a²b + 3ab² + b³",
          "5. (a - b)³ = a³ - 3a²b + 3ab² - b³",
          "6. (a + b)(a² - ab + b²) = a³ + b³",
          "7. (a - b)(a² + ab + b²) = a³ - b³"
        ]
      },
      {
        title: "MÉTODOS DE FACTORIZACIÓN",
        body: [
          "• Factor Común: Extraer el factor común algebraico presente en todos los términos.",
          "• Trinomio x² + bx + c: Buscar h y k tales que h + k = b y hk = c ⇒ (x + h)(x + k).",
          "• Trinomio ax² + bx + c: Escribir (1/a)[(ax)² + b(ax) + ac] y factorizar.",
          "• Factorización por Agrupación: Agrupar términos en pares o tríos para extraer factores comunes secuenciales.",
          "• Diferencia de potencias n-ésimas: aⁿ - bⁿ = (a - b)(aⁿ⁻¹ + aⁿ⁻²b + ... + abⁿ⁻² + bⁿ⁻¹)."
        ]
      }
    ],
    properties: [
      "Diferencia de Cuadrados: a² - b² = (a + b)(a - b)",
      "Suma de Cubos: a³ + b³ = (a + b)(a² - ab + b²)",
      "Diferencia de Cubos: a³ - b³ = (a - b)(a² + ab + b²)",
      "Trinomio Cuadrado Perfecto: a² ± 2ab + b² = (a ± b)²"
    ],
    examples: [
      {
        title: "Ejemplo 1: Factor Común",
        problem: "Factorizar -7a⁴k² + 14ak³ + 21ak⁴.",
        solution: [
          "El factor común es -7ak².",
          "-7a⁴k² + 14ak³ + 21ak⁴ = -7ak²(a³ - 2k - 3k²)."
        ]
      },
      {
        title: "Ejemplo 2: Trinomio ax² + bx + c",
        problem: "Factorizar -6t² - 11t + 21.",
        solution: [
          "-6t² - 11t + 21 = (-1/6) [ (6t)² + 11(6t) - 126 ].",
          "Buscamos dos números que sumen 11 y multipliquen -126: son 18 y -7.",
          "= (-1/6) (6t + 18)(6t - 7) = -(t + 3)(6t - 7) = (t + 3)(7 - 6t)."
        ]
      },
      {
        title: "Ejemplo 3: Factorización por Agrupación",
        problem: "Factorizar 3x³ - x² - 6x + 2.",
        solution: [
          "(3x³ - x²) - (6x - 2) = x²(3x - 1) - 2(3x - 1)",
          "= (3x - 1)(x² - 2) = (3x - 1)(x - √2)(x + √2)."
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // MÓDULO 9: FACTORIAL Y TEOREMA DEL BINOMIO (PDF Págs 33 - 37)
  // -------------------------------------------------------------
  9: {
    num: 9,
    title: "Factorial y Teorema del Binomio",
    page: 32,
    pdfPages: "Páginas 33 a 37",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Notación de factorial (!), coeficientes binomiales, triángulo de Pascal y desarrollo del binomio de Newton.",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "FACTORIAL Y COMBINACIONES",
        body: [
          "• Definición de n-factorial: 1! = 1, 2! = 2, y en general n! = n · (n - 1) ··· 2 · 1. Por convención 0! = 1.",
          "• Permutaciones: El número total de formas diferentes de ordenar n objetos distintos es n!.",
          "• Combinaciones: Número de subconjuntos de tamaño r tomados de un conjunto de n elementos (sin importar el orden):",
          "  (n r) = n! / [ r! (n - r)! ]  (se lee 'n tomados de a r')."
        ]
      },
      {
        title: "EL TEOREMA DEL BINOMIO DE NEWTON",
        body: [
          "Para n ∈ Z⁺, el desarrollo de la potencia n-ésima de un binomio es:",
          "  (x + y)ⁿ = (n 0)xⁿ + (n 1)xⁿ⁻¹y + (n 2)xⁿ⁻²y² + ... + (n n)yⁿ",
          "o equivalentemente:",
          "  (x + y)ⁿ = xⁿ + n xⁿ⁻¹ y + [ n(n-1)/2! ] xⁿ⁻² y² + ... + n x yⁿ⁻¹ + yⁿ.",
          "• Término general que contiene xʳ: (n n-r) xʳ yⁿ⁻ʳ."
        ]
      },
      {
        title: "EL TRIÁNGULO DE PASCAL",
        body: [
          "Forma alternativa para leer los coeficientes binomiales (n k):\n  n = 0:    1\n  n = 1:   1  1\n  n = 2:  1  2  1\n  n = 3: 1  3  3  1\n  n = 4:1  4  6  4  1\nCada número interior es la suma de los dos superiores vecinos."
        ]
      }
    ],
    properties: [
      "0! = 1",
      "(n r) = (n n-r)",
      "Combinaciones aplican cuando NO se permiten repeticiones y el ORDEN no importa."
    ],
    examples: [
      {
        title: "Ejemplo 1: Aplicación de Combinaciones",
        problem: "De 24 estudiantes se elegirán 12 asistentes a un evento. ¿De cuántas maneras puede hacerse?",
        solution: [
          "(24 12) = 24! / [ 12! (24 - 12)! ] = 2,704,156 maneras distintas."
        ]
      },
      {
        title: "Ejemplo 2: Expansión Binomial",
        problem: "Desarrollar (2a + b)⁶ usando coeficientes binomiales.",
        solution: [
          "(2a + b)⁶ = (2a)⁶ + 6(2a)⁵b + 15(2a)⁴b² + 20(2a)³b³ + 15(2a)²b⁴ + 6(2a)b⁵ + b⁶",
          "= 64a⁶ + 192a⁵b + 240a⁴b² + 160a³b³ + 60a²b⁴ + 12ab⁵ + b⁶."
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // MÓDULO 10: EXPRESIONES FRACCIONARIAS Y RACIONALIZACIÓN (PDF Págs 38 - 42)
  // -------------------------------------------------------------
  10: {
    num: 10,
    title: "Expresiones Fraccionarias, Fracciones Compuestas y Racionalización",
    page: 37,
    pdfPages: "Páginas 38 a 42",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Dominio de expresiones racionales, simplificación de fracciones compuestas y técnicas de racionalización de numeradores y denominadores.",
    institutionHeader: "MATEMÁTICAS BÁSICAS - UNIVERSIDAD NACIONAL DE COLOMBIA SEDE MEDELLÍN",
    sections: [
      {
        title: "EXPRESIONES FRACCIONARIAS Y RACIONALES",
        body: [
          "Una expresión fraccionaria es el cociente de dos expresiones algebraicas. Si numerador y denominador son polinomios, se llama expresión racional.",
          "• Simplificación: Se factorizan numerador y denominador y se aplica (A·C)/(B·C) = A/B.",
          "• Operaciones: Suma, resta, producto y cociente se efectúan usando el Mínimo Común Denominador (MCD)."
        ]
      },
      {
        title: "FRACCIONES COMPUESTAS",
        body: [
          "Expresiones donde el numerador o el denominador contienen a su vez fracciones. Se simplifican sumando las fracciones parciales y aplicando productos de extremos y medios."
        ]
      },
      {
        title: "RACIONALIZACIÓN DE DENOMINADORES Y NUMERADORES",
        body: [
          "Consiste en multiplicar y dividir por un factor adecuado de modo que se eliminen los radicales.",
          "• Denominador √a: Multiplicar por √a / √a.",
          "• Denominador ⁿ√(aᵐ) (m < n): Multiplicar por ⁿ√(aⁿ⁻ᵐ) / ⁿ√(aⁿ⁻ᵐ).",
          "• Denominador a + b√c: Multiplicar por su conjugado (a - b√c) / (a - b√c).",
          "• Denominador ∛a - ∛b: Multiplicar por (∛a² + ∛ab + ∛b²) / (∛a² + ∛ab + ∛b²)."
        ]
      }
    ],
    properties: [
      "Conjugado de a + b√c es a - b√c",
      "(a + b√c)(a - b√c) = a² - b²c",
      "(∛a - ∛b)(∛a² + ∛ab + ∛b²) = a - b"
    ],
    examples: [
      {
        title: "Ejemplo 1: Simplificación Racional",
        problem: "Simplificar (1 - x²) / (x³ - 1).",
        solution: [
          "= [ (1 - x)(1 + x) ] / [ (x - 1)(x² + x + 1) ]",
          "= [ -(x - 1)(1 + x) ] / [ (x - 1)(x² + x + 1) ]",
          "= -(1 + x) / (x² + x + 1)."
        ]
      },
      {
        title: "Ejemplo 2: Racionalizar Denominador Binomio",
        problem: "Racionalizar el denominador de 2 / (3 - √5).",
        solution: [
          "= [ 2 / (3 - √5) ] · [ (3 + √5) / (3 + √5) ]",
          "= 2(3 + √5) / (3² - (√5)²)",
          "= 2(3 + √5) / (9 - 5) = 2(3 + √5) / 4 = (3 + √5) / 2."
        ]
      },
      {
        title: "Ejemplo 3: Racionalizar Numerador con Radicales",
        problem: "Racionalizar el numerador de [ √(x + h) - √x ] / h.",
        solution: [
          "= [ (√(x + h) - √x) / h ] · [ (√(x + h) + √x) / (√(x + h) + √x) ]",
          "= [ (x + h) - x ] / [ h(√(x + h) + √x) ]",
          "= h / [ h(√(x + h) + √x) ] = 1 / [ √(x + h) + √x ]."
        ]
      }
    ]
  }
};
