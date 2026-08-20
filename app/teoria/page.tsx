"use client";

import { useState } from "react";
import Link from "next/link";

interface TheoryModule {
  num: number;
  title: string;
  page: number;
  pdfPages: string;
  blockId: "algebra" | "ecuaciones_geometria" | "funciones" | "trigonometria";
  tag: "Álgebra" | "Geometría" | "Funciones" | "Trigonometría";
  summary: string;
  fullTheory: {
    introduction: string;
    sections: {
      subtitle: string;
      content: string;
    }[];
    propertiesAndFormulas: string[];
    examples: {
      title: string;
      problem: string;
      solution: string;
    }[];
  };
}

interface TheoryBlock {
  id: "algebra" | "ecuaciones_geometria" | "funciones" | "trigonometria";
  title: string;
  subtitle: string;
  icon: string;
  range: string;
}

const THEORY_BLOCKS: TheoryBlock[] = [
  {
    id: "algebra",
    title: "Bloque 1: Álgebra y Fundamentos",
    subtitle: "Conjuntos, números reales, polinomios, productos notables y racionalización",
    icon: "🧮",
    range: "Módulos #1 al #10",
  },
  {
    id: "ecuaciones_geometria",
    title: "Bloque 2: Ecuaciones, Geometría y Modelado",
    subtitle: "Ecuaciones, recta, circunferencia, sistemas 2x2, inecuaciones, geometría plana, sólidos y modelado",
    icon: "📐",
    range: "Módulos #11 al #19",
  },
  {
    id: "funciones",
    title: "Bloque 3: Funciones y sus Propiedades",
    subtitle: "Dominio, tramos, paridad, composición, inversas, exponenciales y logaritmos",
    icon: "📈",
    range: "Módulos #20 al #25",
  },
  {
    id: "trigonometria",
    title: "Bloque 4: Trigonometría y Aplicaciones",
    subtitle: "Razones trigonométricas, ley de senos/cosenos, identidades y ecuaciones trigonométricas",
    icon: "🔄",
    range: "Módulos #26 al #30",
  },
];

const THEORY_MODULES: TheoryModule[] = [
  // Bloque 1 (1 - 10)
  {
    num: 1,
    title: "Teoría Intuitiva de Conjuntos",
    page: 1,
    pdfPages: "Págs. 1 - 3",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Noción de conjuntos, pertenencia, inclusión, operaciones entre conjuntos (unión, intersección, complemento) y diagramas de Venn.",
    fullTheory: {
      introduction: "Un conjunto es una colección de objetos bien definidos llamados elementos del conjunto. Los conjuntos pueden describirse por extensión (haciendo una lista explícita de sus elementos encerrados entre llaves) o por comprensión (dando la propiedad que cumplen sus elementos).",
      sections: [
        {
          subtitle: "1. Nociones y Tipos de Conjuntos",
          content: "• Conjunto Vacío: Es aquel que no posee elementos. Se denota por ∅ o { }.\n• Conjunto Finito / Infinito: Si el número de elementos es un número natural, es finito; de lo contrario, es infinito.\n• Pertenencia: Si a es un elemento del conjunto A, escribimos a ∈ A. En caso contrario, a ∉ A.\n• Inclusión y Subconjuntos: A es subconjunto de B (A ⊆ B) si todo elemento de A es también elemento de B."
        },
        {
          subtitle: "2. Operaciones Fundamentales",
          content: "1. Unión (A ∪ B): Conjunto formado por los elementos que pertenecen a A o a B.\n2. Intersección (A ∩ B): Conjunto formado por los elementos que pertenecen simultáneamente a A y a B.\n3. Complemento (A'): Conjunto de elementos del conjunto universal U que no pertenecen a A.\n4. Diferencia (A - B): Conjunto de elementos que están en A pero no están en B.\n5. Diferencia Simétrica (A Δ B): (A ∪ B) - (A ∩ B) = (A - B) ∪ (B - A)."
        }
      ],
      propertiesAndFormulas: [
        "A ∪ A = A  y  A ∩ A = A",
        "A ∪ ∅ = A  y  A ∩ ∅ = ∅",
        "A ∪ B = B ∪ A  y  A ∩ B = B ∩ A (Conmutatividad)",
        "Leyes de De Morgan: (A ∪ B)' = A' ∩ B'  y  (A ∩ B)' = A' ∪ B'",
        "Diferencia: A - B = A ∩ B'"
      ],
      examples: [
        {
          title: "Ejemplo 1: Operaciones con Conjuntos",
          problem: "Sean A = {1, 3, 5, 7, 9} y B = {0, 3, 6, 9, 12}. Encuentre A ∪ B y A ∩ B.",
          solution: "A ∪ B = {0, 1, 3, 5, 6, 7, 9, 12}\nA ∩ B = {3, 9}"
        },
        {
          title: "Ejemplo 2: Complemento de Conjuntos",
          problem: "Sea U = {a, b, c, d, e, f, g, h} y A = {c, f, h}. Encuentre A'.",
          solution: "A' = {x ∈ U | x ∉ A} = {a, b, d, e, g}."
        }
      ]
    }
  },
  {
    num: 2,
    title: "Propiedades de los Números Reales y Fraccionarios",
    page: 4,
    pdfPages: "Págs. 4 - 7",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Axiomas de los números reales, operaciones con fraccionarios, simplificación, suma, resta, multiplicación y división.",
    fullTheory: {
      introduction: "El conjunto de los números reales R resulta de la unión de los números racionales Q (expresables como p/q) y los irracionales I (con representación decimal infinita no periódica como √2, e, π). En R se definen la suma y la multiplicación cumpliendo axiomas algebraicos fundamentales.",
      sections: [
        {
          subtitle: "1. Sistemas Numéricos",
          content: "• Naturales (N) = {1, 2, 3, 4, ...}\n• Enteros (Z) = {..., -3, -2, -1, 0, 1, 2, 3, ...}\n• Racionales (Q) = {r | r = p/q, con p, q ∈ Z, q ≠ 0}\n• Irracionales (I): Números que no pueden expresarse como cociente de enteros.\n• Reales (R) = Q ∪ I."
        },
        {
          subtitle: "2. Axiomas y Leyes de Signos",
          content: "• Conmutativa: a + b = b + a,  ab = ba\n• Asociativa: (a + b) + c = a + (b + c),  (ab)c = a(bc)\n• Distributiva: a(b + c) = ab + ac\n• Elementos neutros: 0 para la suma (a + 0 = a) y 1 para la multiplicación (a · 1 = a).\n• Inversos: Inverso aditivo -a (a + (-a) = 0); Inverso multiplicativo 1/a para a ≠ 0 (a · (1/a) = 1)."
        },
        {
          subtitle: "3. Divisibilidad y Fracciones",
          content: "• MCD (Máximo Común Divisor) y MCM (Mínimo Común Múltiplo).\n• Fracciones equivalentes y forma simplificada a/b con a y b primos relativos.\n• Teorema Fundamental de la Aritmética: Todo número compuesto se descompone de forma única como producto de factores primos."
        }
      ],
      propertiesAndFormulas: [
        "Suma con igual denominador: a/c + b/c = (a + b)/c",
        "Suma con distinto denominador: a/b + c/d = (ad + bc) / (bd)",
        "Producto de fracciones: (a/b) · (c/d) = (ac) / (bd)",
        "Cociente de fracciones: (a/b) ÷ (c/d) = (ad) / (bc)",
        "Igualdad de fracciones: a/b = c/d ⇔ ad = bc"
      ],
      examples: [
        {
          title: "Ejemplo 1: Conversión de Decimal Periódico a Fracción",
          problem: "Convertir x = 5.4383838... a fracción racional.",
          solution: "Multiplicamos por 1000 y por 10:\n  1000x = 5438.3838...\n-   10x = -54.3838...\n  --------------------\n  990x = 5384  ⇒  x = 5384 / 990 = 2692 / 495."
        },
        {
          title: "Ejemplo 2: Suma de Fracciones con Distinto Denominador",
          problem: "Calcular 3/64 + 7/48.",
          solution: "MCM(64, 48) = 192. Homogeneizando:\n  3/64 + 7/48 = (3·3)/192 + (7·4)/192 = 9/192 + 28/192 = 37/192."
        }
      ]
    }
  },
  {
    num: 3,
    title: "Recta Numérica, Orden e Intervalos",
    page: 7,
    pdfPages: "Págs. 7 - 10",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Representación geométrica en la recta real, relación de orden (mayor/menor) e intervalos abiertos, cerrados y semiabiertos.",
    fullTheory: {
      introduction: "Existe una correspondencia biunívoca entre los números reales y los puntos de la recta real. Los números a la derecha de 0 son positivos y a la izquierda son negativos.",
      sections: [
        {
          subtitle: "1. Relación de Orden en R",
          content: "Definición: a > b si y solo si a - b es un número positivo.\nPropiedades:\n• Si a ≤ b y b ≤ c ⇒ a ≤ c (Transitividad).\n• Si a ≤ b ⇒ a + c ≤ b + c (Adición de desigualdades).\n• Si a ≤ b y c > 0 ⇒ ac ≤ bc (Multiplicación por positivo).\n• Si a ≤ b y c < 0 ⇒ ac ≥ bc (Multiplicación por negativo invierte el sentido)."
        },
        {
          subtitle: "2. Tipos de Intervalos",
          content: "• Intervalo Abierto (a, b) = {x ∈ R | a < x < b}\n• Intervalo Cerrado [a, b] = {x ∈ R | a ≤ x ≤ b}\n• Intervalos Semiabiertos [a, b) y (a, b]\n• Intervalos Infinitos (a, ∞), [a, ∞), (-∞, b), (-∞, b]"
        }
      ],
      propertiesAndFormulas: [
        "a > 0 ⇔ -a < 0",
        "a < 0 ⇔ -a > 0",
        "Si a > 0 y b > 0 y a ≥ b ⇒ 1/a ≤ 1/b",
        "Operaciones de conjuntos (Unión e Intersección) aplican a los intervalos reales."
      ],
      examples: [
        {
          title: "Ejemplo 1: Representación de Intervalos",
          problem: "Expresar [ -3, 8 ] y ( 5, 12 ] en notación de conjuntos.",
          solution: "[ -3, 8 ] = {x ∈ R | -3 ≤ x ≤ 8}\n( 5, 12 ] = {x ∈ R | 5 < x ≤ 12}"
        },
        {
          title: "Ejemplo 2: Unión de Intervalos",
          problem: "Hallar [5, 9] ∪ (3, 6).",
          solution: "[5, 9] ∪ (3, 6) = {x ∈ R | 5 ≤ x ≤ 9} ∪ {x ∈ R | 3 < x < 6} = (3, 9]."
        }
      ]
    }
  },
  {
    num: 4,
    title: "Valor Absoluto y Distancia",
    page: 10,
    pdfPages: "Pág. 11",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Definición rigurosa del valor absoluto, propiedades, interpretación geométrica como distancia entre dos puntos en la recta real.",
    fullTheory: {
      introduction: "La distancia entre dos números a y b se define como d(a, b) = |a - b|. El valor absoluto de un número real a representa su distancia al origen 0 y nunca es negativo.",
      sections: [
        {
          subtitle: "1. Definición por Tramos",
          content: "|a| = a si a ≥ 0,  y  |a| = -a si a < 0.\nEjemplos: |8| = 8, |-7| = -(-7) = 7, |0| = 0."
        },
        {
          subtitle: "2. Distancia Geométrica",
          content: "Para dos números reales a y b: d(a, b) = |a - b| = |b - a|.\nEn particular, d(0, a) = |a|."
        }
      ],
      propertiesAndFormulas: [
        "1. |a| ≥ 0",
        "2. |a| = |-a|",
        "3. -|a| ≤ a ≤ |a|",
        "4. |ab| = |a| |b|",
        "5. |a / b| = |a| / |b|  (b ≠ 0)",
        "6. Desigualdad Triangular: |a + b| ≤ |a| + |b|"
      ],
      examples: [
        {
          title: "Ejemplo 1: Evaluación con Constantes",
          problem: "Calcular |3 - e| sabiendo que e ≈ 2.718.",
          solution: "Como 3 > e, entonces 3 - e > 0. Por lo tanto |3 - e| = 3 - e."
        },
        {
          title: "Ejemplo 2: Distancia entre Puntos",
          problem: "Calcular la distancia d(-2, 3).",
          solution: "d(-2, 3) = |3 - (-2)| = |5| = 5."
        }
      ]
    }
  },
  {
    num: 5,
    title: "Potenciación y Radicación",
    page: 11,
    pdfPages: "Págs. 12 - 15",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Leyes de los exponentes enteros y racionales, propiedades de los radicales, simplificación y operaciones con radicales.",
    fullTheory: {
      introduction: "Una expresión de la forma a^x es una expresión exponencial con base a y exponente x. La raíz n-ésima principal ⁿ√a = b significa bⁿ = a.",
      sections: [
        {
          subtitle: "1. Leyes de los Exponentes Enteros",
          content: "• aᵐ · aⁿ = aᵐ⁺ⁿ\n• aᵐ / aⁿ = aᵐ⁻ⁿ (a ≠ 0)\n• (aᵐ)ⁿ = aᵐⁿ\n• (ab)ⁿ = aⁿ bⁿ\n• (a/b)ⁿ = aⁿ / bⁿ (b ≠ 0)\n• a⁰ = 1 (a ≠ 0)\n• a⁻ⁿ = 1 / aⁿ"
        },
        {
          subtitle: "2. Exponentes Racionales y Radicales",
          content: "• a¹/ⁿ = ⁿ√a\n• aᵐ/ⁿ = (ⁿ√a)ᵐ = ⁿ√(aᵐ)\n• ⁿ√(ab) = ⁿ√a · ⁿ√b\n• ⁿ√(a/b) = ⁿ√a / ⁿ√b\n• ᵐ√(ⁿ√a) = ᵐⁿ√a\n• ⁿ√(cⁿ) = |c| si n es par; c si n es impar."
        }
      ],
      propertiesAndFormulas: [
        "Notación científica: x = a × 10ⁿ con 1 ≤ |a| < 10.",
        "(a/b)⁻ⁿ = (b/a)ⁿ",
        "a⁻ⁿ / b⁻ᵐ = bᵐ / aⁿ",
        "c ⁿ√b + d ⁿ√b = (c + d) ⁿ√b"
      ],
      examples: [
        {
          title: "Ejemplo 1: Exponentes Racionales",
          problem: "Evaluar (-27 / 8)^(2/3).",
          solution: "(-27 / 8)^(2/3) = [ ∛(-27) / ∛8 ]² = [ -3 / 2 ]² = 9 / 4."
        },
        {
          title: "Ejemplo 2: Simplificación con Radicales",
          problem: "Simplificar ∛(x³y⁹).",
          solution: "∛(x³y⁹) = ∛(x³) · ∛((y³)³) = x · y³."
        }
      ]
    }
  },
  {
    num: 6,
    title: "Expresiones Algebraicas Polinomios",
    page: 15,
    pdfPages: "Págs. 16 - 21",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Clasificación de polinomios, grado, operaciones fundamentales (suma, resta, producto y división sintética/larga de polinomios).",
    fullTheory: {
      introduction: "Un polinomio en la variable x es una expresión algebraica de la forma P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀, donde n es un entero no negativo y aₙ ≠ 0 es el coeficiente principal de grado n.",
      sections: [
        {
          subtitle: "1. Suma, Resta y Multiplicación",
          content: "• La suma y resta se efectúan agrupando términos semejantes.\n• El producto utiliza la propiedad distributiva a(b + c) = ab + ac y las leyes de exponentes."
        },
        {
          subtitle: "2. División de Polinomios",
          content: "Para polinomios P(x) (dividendo) y D(x) (divisor), existen polinomios Q(x) (cociente) y R(x) (residuo) tales que:\n   P(x) = D(x) · Q(x) + R(x)\ndonde el grado de R(x) es menor que el grado de D(x)."
        },
        {
          subtitle: "3. División Sintética",
          content: "Método abreviado para dividir P(x) entre divisores lineales de la forma (x - c)."
        }
      ],
      propertiesAndFormulas: [
        "Productos Notables:\n1. (a + b)(a - b) = a² - b²\n2. (a ± b)² = a² ± 2ab + b²\n3. (a ± b)³ = a³ ± 3a²b + 3ab² ± b³"
      ],
      examples: [
        {
          title: "Ejemplo 1: División de Polinomios",
          problem: "Dividir P(x) = 5x³ - 2x + 1 entre D(x) = x + 1.",
          solution: "Completando con 0x²: 5x³ + 0x² - 2x + 1 entre x + 1.\nAl realizar la división se obtiene Cociente Q(x) = 5x² - 5x + 3 y Residuo R(x) = -2.\nExpresión: (5x³ - 2x + 1)/(x + 1) = 5x² - 5x + 3 + (-2)/(x + 1)."
        },
        {
          title: "Ejemplo 2: División Sintética",
          problem: "Dividir x⁴ - 3x² + 2x - 5 entre x + 2.",
          solution: "Coeficientes: 1, 0, -3, 2, -5 con c = -2.\nResultado: Q(x) = x³ - 2x² + x  con Residuo R = -5."
        }
      ]
    }
  },
  {
    num: 7,
    title: "Ceros Reales de Polinomios",
    page: 21,
    pdfPages: "Págs. 22 - 25",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Teorema del residuo, teorema del factor, ceros racionales y factorización completa de polinomios de grado superior.",
    fullTheory: {
      introduction: "Los ceros o raíces de un polinomio P(x) son los valores c tales que P(c) = 0. Corresponden geométricamente a los puntos de corte de la gráfica y = P(x) con el eje X.",
      sections: [
        {
          subtitle: "1. Teoremas Fundamentales",
          content: "• Teorema del Residuo: Si P(x) se divide entre x - c, el residuo es R = P(c).\n• Teorema del Factor: x - c es un factor de P(x) si y solo si P(c) = 0.\n• Multiplicidad: Si P(x) = (x - c)ᵐ Q(x), c es un cero de multiplicidad m."
        },
        {
          subtitle: "2. Teorema de Ceros Racionales",
          content: "Si P(x) = aₙxⁿ + ... + a₀ tiene coeficientes enteros, todo cero racional tiene la forma p/q, donde p es factor del término independiente a₀ y q es factor del coeficiente principal aₙ."
        }
      ],
      propertiesAndFormulas: [
        "P(c) = 0 ⇔ (x - c) es un factor de P(x)",
        "Posibles ceros racionales = (Factores de a₀) / (Factores de aₙ)"
      ],
      examples: [
        {
          title: "Ejemplo 1: Uso del Teorema del Factor",
          problem: "Probar que x = -3 es un cero de P(x) = x³ + x² - 2x + 12.",
          solution: "P(-3) = (-3)³ + (-3)² - 2(-3) + 12 = -27 + 9 + 6 + 12 = 0. Como P(-3) = 0, x = -3 es un cero y (x + 3) es factor de P(x)."
        },
        {
          title: "Ejemplo 2: Factorización Completa",
          problem: "Factorizar P(x) = 3x⁵ - 10x⁴ - 6x³ + 24x² + 11x - 6.",
          solution: "Ceros racionales encontrados: x = -1 (multiplicidad 2), x = 1/3, x = 2, x = 3.\nFactorización: P(x) = 3(x - 3)(x - 2)(x - 1/3)(x + 1)²."
        }
      ]
    }
  },
  {
    num: 8,
    title: "Productos Notables y Factorización",
    page: 25,
    pdfPages: "Págs. 26 - 32",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Fórmulas de productos notables (cuadrados, cubos), métodos de factorización: factor común, agrupación, trinomios y diferencias.",
    fullTheory: {
      introduction: "Factorizar una expresión algebraica con respecto a un conjunto numérico es expresarla como un producto de factores más simples.",
      sections: [
        {
          subtitle: "1. Principales Casos de Factorización",
          content: "• Factor Común: ax + ay = a(x + y)\n• Trinomio Cuadrado Perfecto: a² ± 2ab + b² = (a ± b)²\n• Diferencia de Cuadrados: a² - b² = (a + b)(a - b)\n• Suma y Diferencia de Cubos: a³ ± b³ = (a ± b)(a² ∓ ab + b²)\n• Trinomio x² + bx + c: Buscar h y k tales que h + k = b y hk = c ⇒ (x + h)(x + k)\n• Trinomio ax² + bx + c: Método del cociente/descomposición.\n• Factorización por Agrupación."
        }
      ],
      propertiesAndFormulas: [
        "Diferencia de n-ésimas potencias:\naⁿ - bⁿ = (a - b)(aⁿ⁻¹ + aⁿ⁻²b + ... + abⁿ⁻² + bⁿ⁻¹)"
      ],
      examples: [
        {
          title: "Ejemplo 1: Factor Común y Trinomio",
          problem: "Factorizar b³ - b² - 56b.",
          solution: "Sacando factor común b: b(b² - b - 56). Factorizando el trinomio: b(b - 8)(b + 7)."
        },
        {
          title: "Ejemplo 2: Factorización por Agrupación",
          problem: "Factorizar 3x³ - x² - 6x + 2.",
          solution: "(3x³ - x²) - (6x - 2) = x²(3x - 1) - 2(3x - 1) = (3x - 1)(x² - 2) = (3x - 1)(x - √2)(x + √2)."
        }
      ]
    }
  },
  {
    num: 9,
    title: "Factorial y Teorema del Binomio",
    page: 32,
    pdfPages: "Págs. 33 - 37",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Notación de factorial (!), coeficientes binomiales, triángulo de Pascal y desarrollo del binomio de Newton.",
    fullTheory: {
      introduction: "El factorial de n (n!) representa el número de permutaciones u ordenamientos de n objetos. Las combinaciones C(n, r) representan el número de subconjuntos de r elementos elegidos entre n sin importar el orden.",
      sections: [
        {
          subtitle: "1. Factorial y Combinaciones",
          content: "• n! = n · (n - 1) ··· 2 · 1,  con 0! = 1.\n• Coeficiente Binomial: (n r) = n! / [ r! (n - r)! ].\n• Aplica cuando no se permiten repeticiones y el orden es irrelevante."
        },
        {
          subtitle: "2. Teorema del Binomio",
          content: "(x + y)ⁿ = (n 0)xⁿ + (n 1)xⁿ⁻¹y + (n 2)xⁿ⁻²y² + ... + (n n)yⁿ.\nTérmino k-ésimo que contiene xʳ: (n n-r) xʳ yⁿ⁻ʳ."
        },
        {
          subtitle: "3. Triángulo de Pascal",
          content: "Arreglo triangular donde cada número es la suma de los dos superiores vecinos. Sus filas dan los coeficientes binomiales."
        }
      ],
      propertiesAndFormulas: [
        "(n r) = (n n-r)",
        "Fila n del Triángulo de Pascal da los coeficientes de (x + y)ⁿ."
      ],
      examples: [
        {
          title: "Ejemplo 1: Aplicación de Combinaciones",
          problem: "De 10 videojuegos se comprarán 4. ¿De cuántas maneras se puede elegir?",
          solution: "(10 4) = 10! / (4! · 6!) = (10 · 9 · 8 · 7) / (4 · 3 · 2 · 1) = 210 maneras distintas."
        },
        {
          title: "Ejemplo 2: Expansión Binomial",
          problem: "Desarrollar (2x - 5h)⁴.",
          solution: "(2x)⁴ + 4(2x)³(-5h) + 6(2x)²(-5h)² + 4(2x)(-5h)³ + (-5h)⁴\n= 16x⁴ - 160x³h + 600x²h² - 1000xh³ + 625h⁴."
        }
      ]
    }
  },
  {
    num: 10,
    title: "Expresiones Fraccionarias, Fracciones Compuestas y Racionalización",
    page: 37,
    pdfPages: "Págs. 38 - 42",
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Dominio de expresiones racionales, simplificación de fracciones compuestas y técnicas de racionalización de numeradores y denominadores.",
    fullTheory: {
      introduction: "Una expresión racional es el cociente de dos polinomios. Simplificar consiste en factorizar numerador y denominador cancelando factores comunes. Racionalizar es eliminar los radicales de un numerador o denominador.",
      sections: [
        {
          subtitle: "1. Fracciones Compuestas",
          content: "Fracción donde el numerador o denominador contienen otras fracciones. Se simplifican sumando/restando términos y luego dividiendo."
        },
        {
          subtitle: "2. Términos Conjugados y Racionalización",
          content: "• Para √a, el factor racionalizante es √a.\n• Para a + b√c, la expresión conjugada es a - b√c.\n• Para ∛a - ∛b, el factor es ∛a² + ∛ab + ∛b²."
        }
      ],
      propertiesAndFormulas: [
        "1 / √a = √a / a",
        "1 / (a + b√c) = (a - b√c) / (a² - b²c)",
        "1 / (∛a - ∛b) = (∛a² + ∛ab + ∛b²) / (a - b)"
      ],
      examples: [
        {
          title: "Ejemplo 1: Simplificación de Fracción Compuesta",
          problem: "Simplificar (1/x + 1/y) / (x + y)⁻¹.",
          solution: "Numerador: (y + x)/(xy). Denominador: 1/(x + y).\nCociente: [ (x + y)/xy ] / [ 1/(x + y) ] = (x + y)² / (xy)."
        },
        {
          title: "Ejemplo 2: Racionalización de Denominador",
          problem: "Racionalizar el denominador de 2 / (3 - √5).",
          solution: "[ 2 / (3 - √5) ] · [ (3 + √5) / (3 + √5) ] = 2(3 + √5) / (9 - 5) = 2(3 + √5) / 4 = (3 + √5) / 2."
        }
      ]
    }
  },

  // Bloque 2 (11 - 19) STRICT SEQUENTIAL ORDER
  {
    num: 11,
    title: "Ecuaciones",
    page: 42,
    pdfPages: "Págs. 42 - 47",
    blockId: "ecuaciones_geometria",
    tag: "Álgebra",
    summary: "Ecuaciones lineales, cuadráticas, despejes de variables, ecuaciones con valor absoluto y ecuaciones cuadráticas con fórmula general.",
    fullTheory: {
      introduction: "Una ecuación es una igualdad entre expresiones algebraicas. Las soluciones o raíces son los valores numéricos que convierten la ecuación en una proposición verdadera.",
      sections: [
        {
          subtitle: "1. Ecuaciones Lineales y Cuadráticas",
          content: "• Ecuación Lineal ax + b = 0 ⇒ x = -b/a.\n• Ecuación Cuadrática ax² + bx + c = 0 (a ≠ 0).\n• Completación de Cuadrados: x² + bx + (b/2)² = -c + (b/2)².\n• Fórmula Cuadrática: x = [ -b ± √(b² - 4ac) ] / (2a).\n• Discriminante D = b² - 4ac: D > 0 (2 raíces reales distintas), D = 0 (1 raíz doble), D < 0 (sin raíces reales)."
        },
        {
          subtitle: "2. Otros Tipos de Ecuaciones",
          content: "• Ecuaciones Fraccionarias: Se multiplican por el MCM de denominadores.\n• Ecuaciones con Radicales: Se aisla el radical y se elevan ambos lados a la potencia correspondiente (requiere comprobación obligatoria).\n• Ecuaciones de Grado Superior y Cambio de Variable: ax²ⁿ + bxⁿ + c = 0 haciendo y = xⁿ.\n• Ecuaciones con Valor Absoluto: |a| = b ⇔ a = b  o  a = -b."
        }
      ],
      propertiesAndFormulas: [
        "AB = 0 ⇔ A = 0 o B = 0",
        "D = b² - 4ac",
        "|a| = b (b ≥ 0) ⇔ a = b o a = -b"
      ],
      examples: [
        {
          title: "Ejemplo 1: Fórmula Cuadrática",
          problem: "Resolver 3x² - 6x - 1 = 0.",
          solution: "a = 3, b = -6, c = -1. D = (-6)² - 4(3)(-1) = 36 + 12 = 48.\nx = [ 6 ± √48 ] / (2·3) = [ 6 ± 4√3 ] / 6 = 1 ± (2√3)/3."
        },
        {
          title: "Ejemplo 2: Ecuación con Radicales",
          problem: "Resolver √(5 - x) + 1 = x - 2.",
          solution: "Aislando el radical: √(5 - x) = x - 3.\nElevando al cuadrado: 5 - x = (x - 3)²  ⇒  5 - x = x² - 6x + 9  ⇒  x² - 5x + 4 = 0  ⇒  (x - 4)(x - 1) = 0.\nSoluciones candidatas: x = 4 y x = 1.\nComprobando: x = 4 da √(5-4)+1 = 2 = 4-2 (Válida). x = 1 da √(5-1)+1 = 3 ≠ -1 (Falsa).\nSolución única: x = 4."
        }
      ]
    }
  },
  {
    num: 12,
    title: "Línea Recta y Circunferencia",
    page: 47,
    pdfPages: "Págs. 47 - 51",
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Pendiente, ecuación de la recta (punto-pendiente, explícita, general), rectas paralelas/perpendiculares y ecuación de la circunferencia.",
    fullTheory: {
      introduction: "Estudio analítico de la recta y la circunferencia en el plano cartesiano R².",
      sections: [
        {
          subtitle: "1. Geometría de la Línea Recta",
          content: "• Pendiente m = (y₂ - y₁) / (x₂ - x₁).\n• Pendiente como ángulo de inclinación: m = tan α.\n• Forma Punto-Pendiente: y - y₁ = m(x - x₁).\n• Forma Pendiente-Intercepto: y = mx + b (donde b es el corte con el eje Y).\n• Forma General: ax + by + c = 0.\n• Rectas Paralelas: m₁ = m₂.\n• Rectas Perpendiculares: m₁ · m₂ = -1."
        },
        {
          subtitle: "2. La Circunferencia",
          content: "Lugar geométrico de puntos que equidistan r del centro C(h, k).\nDistancia d(P, Q) = √[ (x₂ - x₁)² + (y₂ - y₁)² ].\nEcuación canónica: (x - h)² + (y - k)² = r²."
        }
      ],
      propertiesAndFormulas: [
        "Distancia: d = √[ (x₂ - x₁)² + (y₂ - y₁)² ]",
        "Circunferencia Canónica: (x - h)² + (y - k)² = r²",
        "Forma general circunferencia: x² + y² + ax + by + c = 0"
      ],
      examples: [
        {
          title: "Ejemplo 1: Recta Perpendicular",
          problem: "Halle la recta que pasa por (2, -12) y es perpendicular a la recta que pasa por (1, 1) y (5, -1).",
          solution: "Pendiente m₂ = (-1 - 1)/(5 - 1) = -2/4 = -1/2.\nPendiente m₁ = -1 / m₂ = 2.\nEcuación: y - (-12) = 2(x - 2)  ⇒  y + 12 = 2x - 4  ⇒  y = 2x - 16."
        },
        {
          title: "Ejemplo 2: Ecuación de Circunferencia",
          problem: "Muestre que x² + y² + (1/2)x + 2y + 1/16 = 0 es una circunferencia y halle su centro y radio.",
          solution: "Completando cuadrados:\n[ x² + (1/2)x + 1/16 ] + [ y² + 2y + 1 ] = -1/16 + 1/16 + 1\n(x + 1/4)² + (y + 1)² = 1.\nRepresenta una circunferencia con Centro C(-1/4, -1) y Radio r = 1."
        }
      ]
    }
  },
  {
    num: 13,
    title: "Sistemas 2x2",
    page: 51,
    pdfPages: "Págs. 51 - 54",
    blockId: "ecuaciones_geometria",
    tag: "Álgebra",
    summary: "Sistemas de dos ecuaciones lineales con dos incógnitas: métodos de sustitución, igualación, reducción y regla de Cramer.",
    fullTheory: {
      introduction: "Un sistema de ecuaciones lineales 2x2 consiste en dos ecuaciones de la forma a₁x + b₁y = c₁ y a₂x + b₂y = c₂. Geométricamente representa dos rectas en el plano cartesiano.",
      sections: [
        {
          subtitle: "1. Tipos de Sistemas",
          content: "1. Sistema Consistente con Solución Única: Las rectas se cortan en un punto.\n2. Sistema Inconsistente (Sin Solución): Las rectas son paralelas no coincidentes.\n3. Sistema Dependiente (Infinitas Soluciones): Las rectas son coincidentes."
        },
        {
          subtitle: "2. Métodos de Resolución",
          content: "• Sustitución: Despejar una variable en una ecuación y reemplazarla en la otra.\n• Eliminación (Reducción): Multiplicar las ecuaciones por constantes para eliminar una variable al sumarlas.\n• Igualación: Despejar la misma variable en ambas ecuaciones e igualar."
        }
      ],
      propertiesAndFormulas: [
        "Sistema:  a₁x + b₁y = c₁  y  a₂x + b₂y = c₂",
        "Forma Paramétrica para infinitas soluciones: {(t, t - 1) | t ∈ R}"
      ],
      examples: [
        {
          title: "Ejemplo 1: Método de Sustitución",
          problem: "Resolver el sistema:  3x - 5y = 2  (1)  y  4x + 2y = 9  (2).",
          solution: "De (1): x = 2/3 + (5/3)y.\nEn (2): 4(2/3 + 5/3 y) + 2y = 9  ⇒  8/3 + 20/3 y + 2y = 9  ⇒  26/3 y = 19/3  ⇒  y = 19/26.\nSustituyendo y: x = 147/78. Solución: (147/78, 19/26)."
        },
        {
          title: "Ejemplo 2: Método de Eliminación",
          problem: "Resolver el sistema:  2x + 5y = 1  (1)  y  3x - 2y = 2  (2).",
          solution: "Multiplicando (1) por 3 y (2) por -2:\n   6x + 15y = 3\n  -6x + 4y = -4\n  ---------------\n  19y = -1  ⇒  y = -1/19.\nSustituyendo y en (2): 3x - 2(-1/19) = 2  ⇒  3x + 2/19 = 2  ⇒  3x = 36/19  ⇒  x = 12/19.\nSolución: (12/19, -1/19)."
        }
      ]
    }
  },
  {
    num: 14,
    title: "Desigualdades",
    page: 54,
    pdfPages: "Págs. 54 - 60",
    blockId: "ecuaciones_geometria",
    tag: "Álgebra",
    summary: "Desigualdades lineales, cuadráticas, racionales, desigualdades con valor absoluto y método de intervalos/signos (método del cementerio).",
    fullTheory: {
      introduction: "Una inecuación es una desigualdad proposicional. El conjunto solución contiene todos los valores de la variable que la hacen verdadera.",
      sections: [
        {
          subtitle: "1. Desigualdades Lineales",
          content: "Se resuelven aislando la variable. Regla fundamental: multiplicar o dividir por un número negativo invierte el sentido del símbolo de desigualdad (< a >, ≤ a ≥)."
        },
        {
          subtitle: "2. Desigualdades No Lineales y Método del Cementerio",
          content: "Para f(x)g(x) < 0 o f(x)/g(x) ≥ 0, se pasa todo a un lado (obteniendo 0 al otro), se factoriza, se hallan puntos críticos (donde se hace 0 o indefinido) y se analizan los signos en cada subintervalo."
        },
        {
          subtitle: "3. Desigualdades con Valor Absoluto",
          content: "• |x| < a  ⇔  -a < x < a\n• |x| ≤ a  ⇔  -a ≤ x ≤ a\n• |x| > a  ⇔  x < -a  o  x > a\n• |x| ≥ a  ⇔  x ≤ -a  o  x ≥ a"
        }
      ],
      propertiesAndFormulas: [
        "Si C > 0: A ≤ B ⇔ CA ≤ CB",
        "Si C < 0: A ≤ B ⇔ CA ≥ CB (Cambia sentido)",
        "|x - c| ≤ a es la distancia a c menor o igual que a."
      ],
      examples: [
        {
          title: "Ejemplo 1: Desigualdad Racional (Método de Signos)",
          problem: "Resolver (3 + x) / (3 - x) ≥ 1.",
          solution: "(3 + x)/(3 - x) - 1 ≥ 0  ⇒  [(3 + x) - (3 - x)] / (3 - x) ≥ 0  ⇒  2x / (3 - x) ≥ 0.\nPuntos críticos: x = 0 (numerador) y x = 3 (denominador).\nAnalizando signos: positivo en [0, 3).\nSolución: x ∈ [0, 3)."
        },
        {
          title: "Ejemplo 2: Desigualdad con Valor Absoluto",
          problem: "Resolver |x - 5| ≤ 3.",
          solution: "-3 ≤ x - 5 ≤ 3  ⇒  Sumando 5:  2 ≤ x ≤ 8.\nSolución: x ∈ [2, 8]."
        }
      ]
    }
  },
  {
    num: 15,
    title: "Ángulos y Triángulos",
    page: 60,
    pdfPages: "Págs. 60 - 65",
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Clasificación de ángulos, medidas en grados y radianes, propiedades de los triángulos y suma de ángulos internos.",
    fullTheory: {
      introduction: "Estudio de las figuras formadas por rayos con un extremo común (ángulos) y tres segmentos que unen tres puntos no colineales (triángulos).",
      sections: [
        {
          subtitle: "1. Ángulos y su Medida",
          content: "• Medición en Grados (360° en una vuelta) y Radianes (2π rad en una vuelta).\n• Conversión: 180° = π rad.\n• Clasificación: Agudo (<90°), Recto (90°), Obtuso (>90° y <180°), Llano (180°).\n• Ángulos Complementarios (suman 90°), Suplementarios (suman 180°).\n• Ángulos entre rectas paralelas cortadas por una secante: alternos internos, alternos externos y correspondientes son congruentes."
        },
        {
          subtitle: "2. Triángulos y sus Propiedades",
          content: "• Suma de ángulos interiores = 180°.\n• Ángulo exterior = suma de los dos ángulos interiores no adyacentes.\n• Clasificación por lados: Equilátero (3 lados iguales), Isósceles (2 lados iguales), Escaleno (3 lados distintos).\n• Clasificación por ángulos: Acutángulo, Obtusángulo, Rectángulo.\n• Líneas notables: Altura (ortocentro), Mediana (baricentro), Mediatriz (circuncentro), Bisectriz (incentro)."
        }
      ],
      propertiesAndFormulas: [
        "180° = π rad",
        "Suma de ángulos internos = 180°",
        "Ángulo exterior γ = α + β"
      ],
      examples: [
        {
          title: "Ejemplo 1: Conversión Grados a Radianes",
          problem: "Encontrar la medida en radianes de 36°.",
          solution: "36° · (π / 180°) = 36π / 180 = π / 5 rad."
        },
        {
          title: "Ejemplo 2: Ángulo Exterior de Triángulo",
          problem: "En ∆ABC, si los ángulos interiores no adyacentes miden 32° y 38°, calcular el ángulo exterior u.",
          solution: "u = 32° + 38° = 70°."
        }
      ]
    }
  },
  {
    num: 16,
    title: "Congruencia y Semejanza de Triángulos",
    page: 65,
    pdfPages: "Págs. 65 - 70",
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Criterios de congruencia (LLL, LAL, ALA) y semejanza de triángulos, Teorema de Thales y proporciones geométricas.",
    fullTheory: {
      introduction: "Dos triángulos son congruentes (∆ABC ≅ ∆DEF) si sus lados y ángulos correspondientes son iguales. Son semejantes (∆ABC ~ ∆DEF) si tienen la misma forma y sus lados correspondientes son proporcionales.",
      sections: [
        {
          subtitle: "1. Criterios de Congruencia",
          content: "• L-A-L (Lado-Ángulo-Lado)\n• L-L-L (Lado-Lado-Lado)\n• A-L-A (Ángulo-Lado-Ángulo)"
        },
        {
          subtitle: "2. Criterios de Semejanza",
          content: "• A-A (Ángulo-Ángulo: 2 ángulos congruentes)\n• L-L-L (Lados proporcionales)\n• L-A-L (1 ángulo congruente y lados adyacentes proporcionales)"
        },
        {
          subtitle: "3. Teoremas Fundamentales",
          content: "• Teorema de Tales: Toda recta paralela a un lado de un triángulo determina un segundo triángulo semejante al primero.\n• Teorema de la Bisectriz: La bisectriz del ángulo de un triángulo divide al lado opuesto en segmentos proporcionales a los lados adyacentes (AB/BC = AD/DC)."
        }
      ],
      propertiesAndFormulas: [
        "Semejanza: ∆ABC ~ ∆DEF ⇒ AB/DE = BC/EF = AC/DF",
        "Teorema de la Bisectriz: AB/BC = AD/DC"
      ],
      examples: [
        {
          title: "Ejemplo 1: Aplicación de Semejanza",
          problem: "Un tanque cónico invertido de 3m de altura y 2m de diámetro tiene agua hasta 1.8m de profundidad. Calcule el radio de la superficie de agua.",
          solution: "Por triángulos semejantes: r / R = h_agua / h_total  ⇒  r / 1 = 1.8 / 3  ⇒  r = 0.6 m."
        },
        {
          title: "Ejemplo 2: Teorema de la Bisectriz",
          problem: "En un triángulo con lados AB = 20, AC = 10+12 = 22, si AD es bisectriz de A, halle x = BC.",
          solution: "x / 20 = 12 / 10  ⇒  x = (20 · 12) / 10 = 24."
        }
      ]
    }
  },
  {
    num: 17,
    title: "Área y Perímetro de Figuras Planas y Teorema de Pitágoras",
    page: 70,
    pdfPages: "Págs. 70 - 74",
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Cálculo de áreas y perímetros de polígonos regulares e irregulares, círculo y aplicación del Teorema de Pitágoras en triángulos rectángulos.",
    fullTheory: {
      introduction: "El perímetro es la longitud del borde de una figura plana. El área mide la superficie encerrada en unidades cuadradas. El Teorema de Pitágoras establece la relación fundamental entre los lados de un triángulo rectángulo.",
      sections: [
        {
          subtitle: "1. Fórmulas de Perímetro y Área",
          content: "• Rectángulo: P = 2(b + h), A = bh\n• Cuadrado: P = 4l, A = l²\n• Paralelogramo: P = 2(b + l), A = bh\n• Triángulo: P = a + b + c, A = (1/2)bh\n• Trapecio: A = (1/2)(B + b)h\n• Círculo: C = 2πR = πd, A = πR²\n• Sector Circular: Longitud de arco l = Rα, Área A = (1/2)αR² (α en rad)."
        },
        {
          subtitle: "2. Teorema de Pitágoras",
          content: "En todo triángulo rectángulo de catetos a y b e hipotenusa c: c² = a² + b².\nInterpretación geométrica: El área del cuadrado construido sobre la hipotenusa es igual a la suma de las áreas de los cuadrados sobre los catetos."
        }
      ],
      propertiesAndFormulas: [
        "c² = a² + b² (Pitágoras)",
        "Altura de triángulo equilátero de lado a: h = (√3 / 2)a",
        "Área de triángulo equilátero: A = (√3 / 4)a²"
      ],
      examples: [
        {
          title: "Ejemplo 1: Región Sombreada",
          problem: "Halle el área entre un cuadrado de lado 8 cm y un círculo inscrito en él.",
          solution: "Radio del círculo R = 4 cm.\nÁrea cuadrado = 8² = 64 cm².\nÁrea círculo = π(4)² = 16π cm².\nÁrea sombreada = 64 - 16π cm² ≈ 13.73 cm²."
        },
        {
          title: "Ejemplo 2: Triángulo Equilátero",
          problem: "Demostrar que la altura de un triángulo equilátero de lado a es h = (√3 / 2)a.",
          solution: "Por Pitágoras en la mitad del triángulo: a² = h² + (a/2)²  ⇒  h² = a² - a²/4 = 3a²/4  ⇒  h = (√3 / 2)a."
        }
      ]
    }
  },
  {
    num: 18,
    title: "Volumen y Área Superficial de Sólidos",
    page: 74,
    pdfPages: "Págs. 74 - 77",
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Geometría del espacio: volumen y área lateral/superficial de prismas, cilindros, pirámides, conos y esferas.",
    fullTheory: {
      introduction: "Estudio de cuerpos tridimensionales. El volumen mide el espacio ocupado en unidades cúbicas. El área superficial representa la suma de las áreas de sus caras límites.",
      sections: [
        {
          subtitle: "1. Poliedros y Cuerpos Redondos",
          content: "• Paralelepípedo Rectangular: V = abh,  A = 2ab + 2ah + 2bh.\n• Cilindro Circular Recto: V = πR²h,  A = 2πR² + 2πRh.\n• Prisma: V = Bh (B es área de la base),  A = 2B + Ph.\n• Cono Circular Recto: V = (1/3)πR²h,  A = πRl + πR² (l es la generatriz).\n• Pirámide: V = (1/3)Bh.\n• Esfera: V = (4/3)πR³,  A = 4πR²."
        }
      ],
      propertiesAndFormulas: [
        "Unidad Cúbica: 1 cm³ = 1000 mm³",
        "Tronco de Cono: V = V_total - V_superior"
      ],
      examples: [
        {
          title: "Ejemplo 1: Sólido Compuesto (Cilindro + 2 Semiesferas)",
          problem: "Un sólido está compuesto por un cilindro recto de h = 18 cm y R = 7 cm con 2 semiesferas en los extremos. Calcule el volumen.",
          solution: "Volumen = V_cilindro + V_esfera completa = π(7)²(18) + (4/3)π(7)³ = 882π + 1372π/3 = 4018π / 3 cm³ ≈ 4207.67 cm³."
        },
        {
          title: "Ejemplo 2: Esfera",
          problem: "Calcular el volumen y área superficial de una esfera de radio R = 3 cm.",
          solution: "V = (4/3)π(3)³ = 36π cm³ ≈ 113.1 cm³.\nA = 4π(3)² = 36π cm² ≈ 113.1 cm²."
        }
      ]
    }
  },
  {
    num: 19,
    title: "Modelado Mediante Ecuaciones",
    page: 77,
    pdfPages: "Págs. 77 - 81",
    blockId: "ecuaciones_geometria",
    tag: "Álgebra",
    summary: "Planteamiento y resolución de problemas de la vida real aplicados a la física, economía y geometría utilizando ecuaciones.",
    fullTheory: {
      introduction: "El modelado matemático consiste en expresar situaciones del mundo real mediante ecuaciones para encontrar valores desconocidos.",
      sections: [
        {
          subtitle: "1. Pasos para la Solución de Problemas",
          content: "1. Leer atentamente e ilustrar con un esquema.\n2. Identificar y asignar letras a las incógnitas.\n3. Buscar la información que relaciona las variables.\n4. Formular el modelo matemático (ecuación).\n5. Resolver la ecuación y interpretar la respuesta en el contexto original."
        }
      ],
      propertiesAndFormulas: [
        "Distancia = Velocidad × Tiempo (d = v · t)",
        "Interés Simple: I = P · r · t",
        "Área de Triángulo Equilátero en términos de h: A = (√3 h²) / 3"
      ],
      examples: [
        {
          title: "Ejemplo 1: Problema de Movimiento y Sombras",
          problem: "Un hombre de 2 m de estatura se aleja a 10 m de un poste de 6 m de altura. ¿Cuánto mide su sombra x?",
          solution: "Por semejanza de triángulos: 6 / (10 + x) = 2 / x  ⇒  6x = 2(10 + x)  ⇒  6x = 20 + 2x  ⇒  4x = 20  ⇒  x = 5 m."
        },
        {
          title: "Ejemplo 2: Problema de Velocidad y Tiempo",
          problem: "María recorrió 400 km viajando un tramo en bus a 55 km/h y otro en tren a 70 km/h durante 6 horas en total. ¿Cuánto tiempo viajó en tren?",
          solution: "Sea t el tiempo en tren. Distancia tren = 70t. Distancia bus = 55(6 - t).\n70t + 55(6 - t) = 400  ⇒  15t + 330 = 400  ⇒  15t = 70  ⇒  t = 70/15 ≈ 4.67 horas (4h 40min)."
        }
      ]
    }
  },

  // Bloque 3 (20 - 25)
  {
    num: 20,
    title: "Funciones",
    page: 81,
    pdfPages: "Págs. 81 - 85",
    blockId: "funciones",
    tag: "Funciones",
    summary: "Definición formal de función, regla de correspondencia, prueba de la línea vertical, dominio y rango de una función.",
    fullTheory: {
      introduction: "Una función f de A en B es una regla que asigna a cada elemento x ∈ A exactamente un elemento y = f(x) ∈ B. La variable x es independiente y y es dependiente.",
      sections: [
        {
          subtitle: "1. Dominio, Rango y Evaluación",
          content: "• Dominio (Df): Conjunto de valores de entrada x para los cuales la función está definida.\n• Rango (Rf): Conjunto de todos los valores posibles de salida y = f(x).\n• Evaluación: Reemplazar x por un punto a para hallar f(a)."
        },
        {
          subtitle: "2. Gráfica y Prueba de la Línea Vertical",
          content: "Gráfica de f = { (x, f(x)) | x ∈ Df }.\nPrueba de la Línea Vertical: Una curva en el plano xy representa una función si y solo si ninguna recta vertical corta la gráfica en más de un punto."
        }
      ],
      propertiesAndFormulas: [
        "Cociente de diferencias: [ f(a + h) - f(a) ] / h",
        "Restricciones de Dominio: Denominadores ≠ 0; Cantidades subradicales pares ≥ 0."
      ],
      examples: [
        {
          title: "Ejemplo 1: Cociente de Diferencias",
          problem: "Dada f(x) = 4x² + 5x, calcular [ f(a + h) - f(a) ] / h.",
          solution: "f(a+h) = 4(a+h)² + 5(a+h) = 4a² + 8ah + 4h² + 5a + 5h.\nf(a+h) - f(a) = 8ah + 4h² + 5h = h(8a + 4h + 5).\nDividiendo entre h: 8a + 4h + 5."
        },
        {
          title: "Ejemplo 2: Dominio con Radical y Fracción",
          problem: "Halle el dominio de f(x) = √(16 - 4x²).",
          solution: "Requiere 16 - 4x² ≥ 0  ⇒  4 - x² ≥ 0  ⇒  (2 + x)(2 - x) ≥ 0.\nEl producto es positivo en el intervalo [-2, 2]. Dominio Df = [-2, 2]."
        }
      ]
    }
  },
  {
    num: 21,
    title: "Funciones por Tramos, Valor Absoluto y de la forma x^n y x^(1/n)",
    page: 85,
    pdfPages: "Págs. 86 - 87",
    blockId: "funciones",
    tag: "Funciones",
    summary: "Gráficas de funciones definidas a trozos, función valor absoluto, funciones potencia y funciones raíz n-ésima.",
    fullTheory: {
      introduction: "Una función por tramos o a trozos se define mediante reglas distintas en diferentes subconjuntos de su dominio.",
      sections: [
        {
          subtitle: "1. Función Valor Absoluto",
          content: "f(x) = |x| es una función a trozos: f(x) = -x si x < 0; x si x ≥ 0. Su gráfica es una V con vértice en el origen."
        },
        {
          subtitle: "2. Funciones Potencia y Raíz n-ésima",
          content: "• f(x) = xⁿ: Si n es par, gráfica tipo parábola; si n es impar, gráfica con simetría al origen.\n• f(x) = x¹/ⁿ = ⁿ√x: Si n es par, dominio [0, ∞); si n es impar, dominio R."
        }
      ],
      propertiesAndFormulas: [
        "g(x) = ||x| - 3| se descompone en 4 tramos según los intervalos (-∞, -3], (-3, 0), [0, 3) y [3, ∞)."
      ],
      examples: [
        {
          title: "Ejemplo 1: Función a Tramos Compleja",
          problem: "Trazar la gráfica de g(x) = ||x| - 3|.",
          solution: "Se analiza por tramos:\n  -x - 3  si x ≤ -3\n   x + 3  si -3 < x < 0\n  -x + 3  si 0 ≤ x < 3\n   x - 3  si x ≥ 3.\nGráfica en forma de 'W' sobre el eje X."
        }
      ]
    }
  },
  {
    num: 22,
    title: "Funciones Pares e Impares, Combinación de Funciones",
    page: 87,
    pdfPages: "Págs. 88 - 91",
    blockId: "funciones",
    tag: "Funciones",
    summary: "Simetría respecto al eje Y y al origen, operaciones algebraicas entre funciones (suma, resta, producto, cociente) y composición (f o g).",
    fullTheory: {
      introduction: "Las funciones pueden clasificarse según su simetría y pueden combinarse mediante operaciones algebraicas o composición.",
      sections: [
        {
          subtitle: "1. Simetría Par e Impar",
          content: "• Función Par: f(-x) = f(x) para todo x. Gráfica simétrica respecto al eje Y.\n• Función Impar: f(-x) = -f(x) para todo x. Gráfica simétrica respecto al origen (0, 0)."
        },
        {
          subtitle: "2. Álgebra de Funciones",
          content: "(f ± g)(x) = f(x) ± g(x),  (f·g)(x) = f(x)g(x),  (f/g)(x) = f(x)/g(x) (donde g(x) ≠ 0)."
        },
        {
          subtitle: "3. Composición de Funciones",
          content: "La función compuesta (f ◦ g)(x) = f(g(x)). Dominio Df◦g = {x ∈ Dg | g(x) ∈ Df}."
        }
      ],
      propertiesAndFormulas: [
        "f es Par ⇔ f(-x) = f(x)",
        "f es Impar ⇔ f(-x) = -f(x)",
        "(f ◦ g)(x) = f(g(x))"
      ],
      examples: [
        {
          title: "Ejemplo 1: Determinación de Paridad",
          problem: "Determinar si f(x) = (x² + x⁴)² es par o impar.",
          solution: "f(-x) = ((-x)² + (-x)⁴)² = (x² + x⁴)² = f(x). Luego, f es PAR."
        },
        {
          title: "Ejemplo 2: Composición de Funciones",
          problem: "Sean f(x) = x² y g(x) = √(x + 1). Hallar (f ◦ g)(x) y su dominio.",
          solution: "(f ◦ g)(x) = f(g(x)) = (√(x + 1))² = x + 1.\nDominio Dg = [-1, ∞) y g(x) ≥ 0 ∈ Df = R.\nLuego, Df◦g = [-1, ∞)."
        }
      ]
    }
  },
  {
    num: 23,
    title: "Funciones Inyectivas e Inversa de una Función",
    page: 91,
    pdfPages: "Págs. 91 - 95",
    blockId: "funciones",
    tag: "Funciones",
    summary: "Prueba de la línea horizontal, funciones uno a uno (inyectivas), definición de la función inversa f^-1 y simetría respecto a y = x.",
    fullTheory: {
      introduction: "Una función f es uno a uno (inyectiva) si no hay dos elementos distintos del dominio con la misma imagen: f(x₁) = f(x₂) ⇒ x₁ = x₂.",
      sections: [
        {
          subtitle: "1. Prueba de la Línea Horizontal",
          content: "Una función es inyectiva si y solo si ninguna recta horizontal corta su gráfica en más de un punto."
        },
        {
          subtitle: "2. Función Inversa f⁻¹",
          content: "Si f es inyectiva, su inversa f⁻¹ cumple: f⁻¹(y) = x ⇔ f(x) = y. Intercambia dominio y rango: Df⁻¹ = Rf y Rf⁻¹ = Df.\nGráficas de f y f⁻¹ son simétricas respecto a la recta y = x."
        },
        {
          subtitle: "3. Pasos para Hallar f⁻¹",
          content: "1. Escribir y = f(x).\n2. Despejar la variable x en términos de y.\n3. Intercambiar x e y para obtener y = f⁻¹(x)."
        }
      ],
      propertiesAndFormulas: [
        "Propiedades de Cancelación:\nf⁻¹(f(x)) = x  para todo x ∈ Df\nf(f⁻¹(y)) = y  para todo y ∈ Rf"
      ],
      examples: [
        {
          title: "Ejemplo 1: Hallar la Función Inversa",
          problem: "Calcular la inversa de f(x) = (x⁷ / 3) + 1.",
          solution: "y = (x⁷ / 3) + 1  ⇒  y - 1 = x⁷ / 3  ⇒  3y - 3 = x⁷  ⇒  x = ⁷√(3y - 3).\nIntercambiando variables: f⁻¹(x) = ⁷√(3x - 3)."
        },
        {
          title: "Ejemplo 2: Inversa con Dominio Restringido",
          problem: "Hallar la inversa de f(x) = √(2x + 1).",
          solution: "Dominio Df = [-1/2, ∞) y Rango Rf = [0, ∞).\ny = √(2x + 1)  ⇒  y² = 2x + 1 (con y ≥ 0)  ⇒  x = (y² - 1) / 2.\nInversa: f⁻¹(x) = (x² - 1) / 2 para x ≥ 0."
        }
      ]
    }
  },
  {
    num: 24,
    title: "Funciones Exponenciales",
    page: 95,
    pdfPages: "Págs. 96 - 99",
    blockId: "funciones",
    tag: "Funciones",
    summary: "Definición de f(x) = a^x, el número e, propiedades de los exponentes, gráficas y aplicaciones de crecimiento/decaimiento.",
    fullTheory: {
      introduction: "La función exponencial con base a (a > 0, a ≠ 1) se define como f(x) = aˣ para cualquier número real x.",
      sections: [
        {
          subtitle: "1. Propiedades de la Gráfica",
          content: "• Dominio = R, Rango = (0, ∞).\n• Pasa siempre por la ordenada (0, 1).\n• Si a > 1, es estrictamente creciente; si 0 < a < 1, es estrictamente decreciente."
        },
        {
          subtitle: "2. La Exponencial Natural",
          content: "Base e =lim_{n->∞} (1 + 1/n)ⁿ ≈ 2.718281828... la función exponencial natural es f(x) = eˣ."
        },
        {
          subtitle: "3. Modelos de Crecimiento y Decaimiento Exponencial",
          content: "P(t) = P₀ eʳᵗ, donde P₀ es la población/masa inicial y r es la tasa relativa de crecimiento (r > 0) o decaimiento (r < 0)."
        }
      ],
      propertiesAndFormulas: [
        "aˣ > 0 para todo x ∈ R",
        "P(t) = P₀ eʳᵗ"
      ],
      examples: [
        {
          title: "Ejemplo 1: Crecimiento Poblacional",
          problem: "La población de Itagüí en 2010 era P₀ = 230.000 hab. con tasa r = 3% anual. Estimar la población en 2025 (t = 15 años).",
          solution: "P(t) = 230000 e^(0.03t).\nPara t = 15: P(15) = 230000 e^(0.03·15) = 230000 e^(0.45) ≈ 360.712 habitantes."
        },
        {
          title: "Ejemplo 2: Decaimiento Radiactivo",
          problem: "Una sustancia m(t) = 15 e^(-0.023t) kg se desintegra. ¿Cuánta masa queda tras 60 días?",
          solution: "m(60) = 15 e^(-0.023 · 60) = 15 e^(-1.38) ≈ 3.7736 kg."
        }
      ]
    }
  },
  {
    num: 25,
    title: "Funciones Logarítmicas y Propiedades de los Logaritmos",
    page: 99,
    pdfPages: "Págs. 100 - 103",
    blockId: "funciones",
    tag: "Funciones",
    summary: "Logaritmo como inversa de la exponencial, logaritmo natural ln(x), propiedades de expansión, compresión y cambio de base.",
    fullTheory: {
      introduction: "La función logarítmica con base a es la función inversa de f(x) = aˣ: logₐ x = y ⇔ aʸ = x.",
      sections: [
        {
          subtitle: "1. Definición y Notación",
          content: "• Dominio = (0, ∞), Rango = R.\n• Logaritmo Común: log x = log₁₀ x.\n• Logaritmo Natural: ln x = logₑ x."
        },
        {
          subtitle: "2. Leyes de los Logaritmos",
          content: "1. logₐ(xy) = logₐ x + logₐ y\n2. logₐ(x / y) = logₐ x - logₐ y\n3. logₐ(xʳ) = r logₐ x\n4. Cambio de Base: log_b x = (logₐ x) / (logₐ b)"
        },
        {
          subtitle: "3. Solución de Ecuaciones Exponenciales y Logarítmicas",
          content: "Aplicar la función inversa adecuada (ln o e) a ambos lados para despejar la variable."
        }
      ],
      propertiesAndFormulas: [
        "logₐ 1 = 0  y  logₐ a = 1",
        "logₐ(aˣ) = x  y  a^(logₐ x) = x",
        "ln e = 1  y  e^(ln x) = x"
      ],
      examples: [
        {
          title: "Ejemplo 1: Ecuación Exponencial",
          problem: "Resolver e^(8 - 3x) = 20.",
          solution: "Tomando ln: ln(e^(8 - 3x)) = ln(20)  ⇒  8 - 3x = ln(20)  ⇒  3x = 8 - ln(20)  ⇒  x = (8 - ln(20)) / 3 ≈ 1.668."
        },
        {
          title: "Ejemplo 2: Ecuación Logarítmica",
          problem: "Resolver ln(x - 2) + ln(x - 3) = ln 2.",
          solution: "ln[(x - 2)(x - 3)] = ln 2  ⇒  (x - 2)(x - 3) = 2  ⇒  x² - 5x + 6 = 2  ⇒  x² - 5x + 4 = 0  ⇒  (x - 4)(x - 1) = 0.\nComprobando: x = 4 da ln(2)+ln(1) = ln(2) (Válida). x = 1 invalida ln(-1) (Falsa).\nSolución única: x = 4."
        }
      ]
    }
  },

  // Bloque 4 (26 - 30)
  {
    num: 26,
    title: "Funciones Trigonométricas de Ángulos",
    page: 103,
    pdfPages: "Págs. 104 - 108",
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Definición de las 6 razones trigonométricas en triángulos rectángulos (seno, coseno, tangente, cotangente, secante, cosecante) y ángulos notables.",
    fullTheory: {
      introduction: "La trigonometría estudia la relación entre las medidas de los lados y los ángulos de un triángulo. En posición estándar, para P(x, y) y r = √(x² + y²):",
      sections: [
        {
          subtitle: "1. Las 6 Razones Trigonométricas",
          content: "• sen θ = y / r,   cos θ = x / r,   tan θ = y / x (x ≠ 0)\n• csc θ = r / y,   sec θ = r / x,   cot θ = x / y (y ≠ 0)\n• En triángulo rectángulo: sen θ = Opuesto/Hipotenusa, cos θ = Adyacente/Hipotenusa, tan θ = Opuesto/Adyacente."
        },
        {
          subtitle: "2. Ángulos Coterminales y Ángulo de Referencia",
          content: "• Coterminales: Tienen el mismo lado terminal (θ + 360°n).\n• Ángulo de Referencia θ̄: Ángulo agudo formado entre el lado terminal de θ y el eje X."
        },
        {
          subtitle: "3. Área de un Triángulo",
          content: "A = (1/2) a b sen θ (donde a y b son lados y θ es el ángulo comprendido entre ellos)."
        }
      ],
      propertiesAndFormulas: [
        "Valores Notables:\n  • 30° (π/6): sen = 1/2, cos = √3/2, tan = √3/3\n  • 45° (π/4): sen = √2/2, cos = √2/2, tan = 1\n  • 60° (π/3): sen = √3/2, cos = 1/2, tan = √3\nParidad: sen(-θ) = -sen θ (Impar),  cos(-θ) = cos θ (Par)."
      ],
      examples: [
        {
          title: "Ejemplo 1: Ángulo de Referencia",
          problem: "Hallar el valor exacto de cos(7π / 3).",
          solution: "7π/3 - 2π = π/3 rad (ángulo de referencia en cuadrante I).\ncos(7π / 3) = cos(π / 3) = 1/2."
        },
        {
          title: "Ejemplo 2: Área de Triángulo Isósceles",
          problem: "Un triángulo isósceles de lados a = b tiene área A = 24 cm² y ángulo θ = 5π/6 (150°). Halle la longitud a.",
          solution: "A = (1/2) a² sen(150°)  ⇒  24 = (1/2) a² (1/2)  ⇒  24 = a² / 4  ⇒  a² = 96  ⇒  a = √96 cm."
        }
      ]
    }
  },
  {
    num: 27,
    title: "Aplicaciones de Trigonometría y Ley de Senos y Cosenos",
    page: 108,
    pdfPages: "Págs. 109 - 113",
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Resolución de triángulos oblicuángulos mediante la Ley de Senos y la Ley de Cosenos, cálculo de distancias inaccesibles y vectores.",
    fullTheory: {
      introduction: "Para resolver triángulos no rectángulos (oblicuángulos) se utilizan dos teoremas fundamentales: la Ley de Senos y la Ley de Cosenos.",
      sections: [
        {
          subtitle: "1. Ley de Senos",
          content: "(sen A) / a = (sen B) / b = (sen C) / c\nSe aplica cuando se conocen: 2 ángulos y 1 lado (A-A-L / A-L-A) o 2 lados y el ángulo opuesto a uno de ellos (L-L-A, caso ambiguo)."
        },
        {
          subtitle: "2. Ley de Cosenos",
          content: "a² = b² + c² - 2bc cos A\nb² = a² + c² - 2ac cos B\nc² = a² + b² - 2ab cos C\nSe aplica cuando se conocen: 2 lados y el ángulo comprendido (L-A-L) o los 3 lados (L-L-L)."
        }
      ],
      propertiesAndFormulas: [
        "Ley de Senos: (sen A)/a = (sen B)/b = (sen C)/c",
        "Ley de Cosenos: a² = b² + c² - 2bc cos A"
      ],
      examples: [
        {
          title: "Ejemplo 1: Ley de Senos",
          problem: "En ∆ABC con A = 45°, a = 7√2 y b = 7. Halle el ángulo B.",
          solution: "(sen A) / a = (sen B) / b  ⇒  sen B = (b sen A) / a = (7 · sen 45°) / (7√2) = (7 · (√2/2)) / (7√2) = 1/2.\nB = 30° (ya que 150° no es posible porque 150° + 45° > 180°)."
        },
        {
          title: "Ejemplo 2: Ley de Cosenos",
          problem: "Los lados de un triángulo son a = 20, b = 25 y c = 22. Encuentre los ángulos.",
          solution: "cos A = (b² + c² - a²) / (2bc) = (625 + 484 - 400) / (2·25·22) = 709 / 1100 ≈ 0.6445  ⇒  A ≈ 49.87°.\nDe forma similar: B ≈ 72.88° y C ≈ 57.25°."
        }
      ]
    }
  },
  {
    num: 28,
    title: "Funciones Trigonométricas de Números Reales",
    page: 113,
    pdfPages: "Págs. 114 - 117",
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Círculo unitario, definición de funciones circulares, periodo, amplitud, desfase y gráficas de las funciones trigonométricas en R.",
    fullTheory: {
      introduction: "Estudio de las funciones trigonométricas con dominio en R basándose en la circunferencia unitaria x² + y² = 1. Para cada número real t (longitud de arco en rad): sen t = y, cos t = x.",
      sections: [
        {
          subtitle: "1. Funciones Periódicas",
          content: "Una función f es periódica de periodo p si f(t + p) = f(t) para todo t.\n• Periodo de sen t, cos t, csc t, sec t es 2π.\n• Periodo de tan t y cot t es π."
        },
        {
          subtitle: "2. Dominios y Rangos",
          content: "• sen t: Dominio R, Rango [-1, 1]\n• cos t: Dominio R, Rango [-1, 1]\n• tan t: Dominio R - {π/2 + kπ}, Rango R\n• cot t: Dominio R - {kπ}, Rango R"
        }
      ],
      propertiesAndFormulas: [
        "sen(t + 2nπ) = sen t",
        "cos(t + 2nπ) = cos t",
        "tan(t + nπ) = tan t"
      ],
      examples: [
        {
          title: "Ejemplo 1: Gráfica de Seno",
          problem: "Describir el comportamiento del periodo principal de sen t en [0, 2π].",
          solution: "t = 0 ⇒ sen(0) = 0\nt = π/2 ⇒ sen(π/2) = 1\nt = π ⇒ sen(π) = 0\nt = 3π/2 ⇒ sen(3π/2) = -1\nt = 2π ⇒ sen(2π) = 0."
        }
      ]
    }
  },
  {
    num: 29,
    title: "Identidades Trigonométricas",
    page: 117,
    pdfPages: "Págs. 118 - 122",
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Identidades fundamentales (pitagóricas, recíprocas, cociente), identidades de suma/resta de ángulos y del ángulo doble.",
    fullTheory: {
      introduction: "Una identidad trigonométrica es una igualdad entre expresiones trigonométricas válida para todos los valores del dominio.",
      sections: [
        {
          subtitle: "1. Identidades Fundamentales",
          content: "• Recíprocas: csc x = 1/sen x,  sec x = 1/cos x,  cot x = 1/tan x.\n• Cociente: tan x = sen x / cos x,  cot x = cos x / sen x.\n• Pitagóricas: sen² x + cos² x = 1,   1 + tan² x = sec² x,   1 + cot² x = csc² x."
        },
        {
          subtitle: "2. Fórmulas de Adición y Sustracción",
          content: "• sen(s ± t) = sen s cos t ± cos s sen t\n• cos(s ± t) = cos s cos t ∓ sen s sen t\n• tan(s ± t) = (tan s ± tan t) / (1 ∓ tan s tan t)"
        },
        {
          subtitle: "3. Ángulo Doble y Semiángulo",
          content: "• sen(2x) = 2 sen x cos x\n• cos(2x) = cos² x - sen² x = 2cos² x - 1 = 1 - 2sen² x\n• sen² x = (1 - cos(2x)) / 2  y  cos² x = (1 + cos(2x)) / 2"
        }
      ],
      propertiesAndFormulas: [
        "sen² x + cos² x = 1",
        "1 + tan² x = sec² x",
        "sen(2x) = 2 sen x cos x"
      ],
      examples: [
        {
          title: "Ejemplo 1: Demostración de Identidad",
          problem: "Demostrar que (1 + sec² x) / (1 + tan² x) = 1 + cos² x.",
          solution: "Como 1 + tan² x = sec² x:\nLHS = (1 + sec² x) / sec² x = (1 / sec² x) + (sec² x / sec² x) = cos² x + 1 = 1 + cos² x. Q.E.D."
        },
        {
          title: "Ejemplo 2: Uso de Ángulo Doble",
          problem: "Calcular sen(2x) si sen x = 3/5 con x en el primer cuadrante.",
          solution: "cos x = √(1 - sen² x) = √(1 - 9/25) = √(16/25) = 4/5.\nsen(2x) = 2 sen x cos x = 2 · (3/5) · (4/5) = 24 / 25."
        }
      ]
    }
  },
  {
    num: 30,
    title: "Ecuaciones Trigonométricas",
    page: 122,
    pdfPages: "Págs. 123 - 126",
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Resolución de ecuaciones que involucran funciones trigonométricas, cálculo de soluciones generales y restringidas en un intervalo.",
    fullTheory: {
      introduction: "Una ecuación trigonométrica es una igualdad con variables en argumentos trigonométricos. Consiste en encontrar los ángulos que satisfacen la ecuación en [0, 2π) y generalizar en R sumando + 2kπ o + kπ.",
      sections: [
        {
          subtitle: "1. Estrategia de Resolución",
          content: "1. Usar identidades para expresar la ecuación en términos de una sola función trigonométrica.\n2. Factorizar o aplicar la fórmula cuadrática para aislar la función.\n3. Hallar las soluciones particulares en [0, 2π).\n4. Expresar las soluciones generales en R agregando + 2kπ (para sen/cos/csc/sec) o + kπ (para tan/cot)."
        }
      ],
      propertiesAndFormulas: [
        "sen x = c  ⇒  x = θ + 2kπ  o  x = (π - θ) + 2kπ",
        "cos x = c  ⇒  x = ±θ + 2kπ",
        "tan x = c  ⇒  x = θ + kπ"
      ],
      examples: [
        {
          title: "Ejemplo 1: Ecuación Factorizable",
          problem: "Resolver 4 sen² x - 1 = 0 en el intervalo [0, 2π).",
          solution: "(2 sen x + 1)(2 sen x - 1) = 0  ⇒  sen x = -1/2  o  sen x = 1/2.\n• sen x = 1/2  ⇒  x = π/6,  5π/6.\n• sen x = -1/2 ⇒  x = 7π/6,  11π/6.\nSoluciones en [0, 2π): { π/6, 5π/6, 7π/6, 11π/6 }."
        },
        {
          title: "Ejemplo 2: Ecuación Cuadrática Trigonométrica",
          problem: "Resolver 2 sen² x - sen x - 1 = 0 en [0, 2π).",
          solution: "(2 sen x + 1)(sen x - 1) = 0  ⇒  sen x = -1/2  o  sen x = 1.\n• sen x = 1  ⇒  x = π/2.\n• sen x = -1/2  ⇒  x = 7π/6,  11π/6.\nSoluciones: { π/2, 7π/6, 11π/6 }."
        }
      ]
    }
  }
];

export default function TheoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlock, setSelectedBlock] = useState<string>("all");
  const [activeModule, setActiveModule] = useState<TheoryModule | null>(null);

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
          m.tag.toLowerCase().includes(term) ||
          m.summary.toLowerCase().includes(term)
      )
    );
  });

  return (
    <main className="flex-1 flex flex-col min-h-screen bg-[#2E3B33] text-[#D9CBB6] beige-grid-bg relative">
      {/* Navigation Top Bar */}
      <div className="border-b border-[#D9CBB6]/20 bg-[#2E3B33]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center text-[#D9CBB6] hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </Link>
            <div>
              <span className="font-bold text-sm text-[#D9CBB6] glow-beige block">Portal Académico</span>
              <span className="text-xs text-[#BFAE8F]">Módulo de Teoría (30 Módulos Interactivos)</span>
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
                📚 Contenido Oficial del Texto Guía
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#BFAE8F]/15 border border-[#BFAE8F]/30 text-[#BFAE8F]">
                Haz clic en cualquier tarjeta para abrir la teoría completa del PDF
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#D9CBB6] glow-beige">
              Catálogo de Módulos Teóricos
            </h1>
            <p className="text-[#BFAE8F] text-sm max-w-3xl leading-relaxed">
              Selecciona cualquiera de los 30 módulos temáticos para abrir el visor interactivo de lectura con la teoría completa, conceptos, axiomas, fórmulas y ejemplos resueltos del texto guía oficial.
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
              Todos (1-30)
            </button>
            <button
              onClick={() => setSelectedBlock("algebra")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "algebra"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              Bloque 1 (#1-10)
            </button>
            <button
              onClick={() => setSelectedBlock("ecuaciones_geometria")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "ecuaciones_geometria"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              Bloque 2 (#11-19)
            </button>
            <button
              onClick={() => setSelectedBlock("funciones")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "funciones"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              Bloque 3 (#20-25)
            </button>
            <button
              onClick={() => setSelectedBlock("trigonometria")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBlock === "trigonometria"
                  ? "bg-[#7A8F73] text-[#D9CBB6] border border-[#7A8F73] shadow-md font-semibold"
                  : "bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50"
              }`}
            >
              Bloque 4 (#26-30)
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

        {/* Render Sequential Blocks Sections with Clean Interactive Cards */}
        <div className="space-y-10">
          {filteredBlocks.length === 0 ? (
            <div className="beige-card rounded-xl p-8 text-center space-y-2">
              <p className="text-base text-[#D9CBB6] font-semibold">No se encontraron temas coincidentes</p>
              <p className="text-xs text-[#BFAE8F]">Intenta buscar con otra palabra clave o selecciona "Todos".</p>
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
                  m.tag.toLowerCase().includes(term) ||
                  m.summary.toLowerCase().includes(term)
                );
              });

              if (modulesInBlock.length === 0) return null;

              return (
                <section key={block.id} className="space-y-4 animate-fade-in">
                  {/* Block Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-[#4F6B57]/30 border border-[#7A8F73]/40 shadow-md">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{block.icon}</span>
                      <div>
                        <h2 className="text-xl font-bold text-[#D9CBB6]">{block.title}</h2>
                        <p className="text-xs text-[#BFAE8F] mt-0.5">{block.subtitle}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#7A8F73]/30 text-[#D9CBB6] border border-[#7A8F73]/50 self-start sm:self-center">
                      {block.range}
                    </span>
                  </div>

                  {/* Clean Grid Cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modulesInBlock.map((mod) => (
                      <div
                        key={mod.num}
                        className="beige-card rounded-2xl p-5 border border-[#D9CBB6]/15 hover:border-[#7A8F73] transition-all flex flex-col justify-between shadow-md cursor-pointer group hover:-translate-y-1"
                        onClick={() => setActiveModule(mod)}
                      >
                        <div className="space-y-3">
                          {/* Module Header Badges */}
                          <div className="flex items-center justify-between text-xs">
                            <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#7A8F73]/25 text-[#D9CBB6] border border-[#7A8F73]/40">
                              Módulo #{mod.num}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                                mod.tag === "Geometría"
                                  ? "bg-[#BFAE8F]/20 text-[#BFAE8F] border-[#BFAE8F]/40"
                                  : mod.tag === "Trigonometría"
                                  ? "bg-[#7A8F73]/30 text-[#D9CBB6] border-[#7A8F73]/50"
                                  : mod.tag === "Funciones"
                                  ? "bg-[#4F6B57]/40 text-[#D9CBB6] border-[#7A8F73]/30"
                                  : "bg-[#7A8F73]/20 text-[#D9CBB6] border-[#7A8F73]/30"
                              }`}>
                                {mod.tag}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full font-semibold bg-[#BFAE8F]/15 text-[#BFAE8F] border border-[#BFAE8F]/30 text-[11px]">
                                Pág. {mod.page}
                              </span>
                            </div>
                          </div>

                          {/* Module Title */}
                          <h3 className="text-base font-bold text-[#D9CBB6] group-hover:text-[#BFAE8F] transition-colors leading-snug">
                            {mod.title}
                          </h3>

                          {/* Summary */}
                          <p className="text-xs text-[#BFAE8F]/90 leading-relaxed line-clamp-3">
                            {mod.summary}
                          </p>
                        </div>

                        {/* Interactive Click Action CTA */}
                        <div className="mt-4 pt-3 border-t border-[#D9CBB6]/10 flex items-center justify-between text-xs font-semibold text-[#7A8F73] group-hover:text-[#D9CBB6] transition-colors">
                          <span className="flex items-center gap-1">
                            <span>📖</span> Leer Teoría Completa del PDF
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
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

      {/* FULL THEORY MODAL READER FOR CLICKED MODULE */}
      {activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="beige-card w-full max-w-4xl max-h-[90vh] rounded-2xl border border-[#7A8F73] shadow-2xl flex flex-col overflow-hidden bg-[#2E3B33] text-[#D9CBB6] my-auto">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#D9CBB6]/20 bg-[#4F6B57]/40 flex items-start justify-between gap-4 sticky top-0 z-10 backdrop-blur-md">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#7A8F73] text-[#2E3B33]">
                    Módulo #{activeModule.num}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-[#BFAE8F]/20 text-[#BFAE8F] border border-[#BFAE8F]/40">
                    {activeModule.tag}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#2E3B33] text-[#D9CBB6] border border-[#D9CBB6]/20">
                    Documento Oficial: {activeModule.pdfPages}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#D9CBB6] glow-beige">
                  {activeModule.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveModule(null)}
                className="p-2 rounded-xl bg-[#2E3B33] border border-[#D9CBB6]/30 text-[#BFAE8F] hover:text-[#D9CBB6] hover:border-[#7A8F73] transition-all cursor-pointer shadow-md"
                title="Cerrar lectura"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body Scrollable Reader */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 leading-relaxed">
              {/* Introduction Box */}
              <div className="beige-card p-5 rounded-xl border-l-4 border-l-[#7A8F73] bg-[#4F6B57]/20 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A8F73]">
                  📌 Resumen General del Capítulo
                </h3>
                <p className="text-sm text-[#D9CBB6] leading-relaxed">
                  {activeModule.fullTheory.introduction}
                </p>
              </div>

              {/* Sections Breakdown */}
              <div className="space-y-6">
                <h3 className="text-base font-extrabold text-[#D9CBB6] border-b border-[#D9CBB6]/15 pb-2 flex items-center gap-2">
                  <span>📖</span> Desarrollo Teórico e Integración del Texto Guía
                </h3>
                {activeModule.fullTheory.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-2 bg-[#2E3B33]/80 p-5 rounded-xl border border-[#D9CBB6]/10 shadow-sm">
                    <h4 className="text-sm font-bold text-[#BFAE8F]">
                      {sec.subtitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#D9CBB6]/90 whitespace-pre-line leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Properties & Formulas Box */}
              {activeModule.fullTheory.propertiesAndFormulas.length > 0 && (
                <div className="space-y-3 bg-[#4F6B57]/30 p-5 rounded-xl border border-[#7A8F73]/40 shadow-md">
                  <h3 className="text-sm font-bold text-[#7A8F73] uppercase tracking-wider flex items-center gap-2">
                    <span>⚡</span> Fórmulas, Teoremas y Axiomas Clave
                  </h3>
                  <ul className="space-y-2">
                    {activeModule.fullTheory.propertiesAndFormulas.map((form, idx) => (
                      <li key={idx} className="text-xs sm:text-sm font-mono bg-[#2E3B33]/90 px-3.5 py-2 rounded-lg border border-[#D9CBB6]/15 text-[#D9CBB6] font-sans">
                        {form}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solved Examples Section */}
              {activeModule.fullTheory.examples.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-base font-extrabold text-[#D9CBB6] border-b border-[#D9CBB6]/15 pb-2 flex items-center gap-2">
                    <span>💡</span> Ejemplos Prácticos Resueltos del PDF
                  </h3>
                  {activeModule.fullTheory.examples.map((ex, idx) => (
                    <div key={idx} className="beige-card p-5 rounded-xl border border-[#BFAE8F]/30 space-y-3 shadow-md bg-[#2E3B33]/90">
                      <span className="text-xs font-bold text-[#BFAE8F] uppercase tracking-wider block">
                        {ex.title}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-[#D9CBB6]">
                        {ex.problem}
                      </p>
                      <div className="text-xs sm:text-sm text-[#BFAE8F] pt-3 border-t border-[#D9CBB6]/10 space-y-1 font-sans">
                        <span className="font-bold text-[#7A8F73] block">Demostración / Solución:</span>
                        <div className="whitespace-pre-line leading-relaxed">
                          {ex.solution}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#D9CBB6]/20 bg-[#4F6B57]/40 flex items-center justify-between gap-4 sticky bottom-0 z-10 backdrop-blur-md">
              <span className="text-xs text-[#BFAE8F]">
                Página {activeModule.page} de Matemáticas Básicas
              </span>
              <button
                onClick={() => setActiveModule(null)}
                className="beige-btn px-5 py-2 rounded-xl text-xs font-semibold cursor-pointer shadow-md"
              >
                Cerrar Lectura
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
