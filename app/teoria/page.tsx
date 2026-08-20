"use client";

import { useState } from "react";
import Link from "next/link";

interface TheoryModule {
  num: number;
  title: string;
  page: number;
  blockId: "algebra" | "ecuaciones_geometria" | "funciones" | "trigonometria";
  tag: "Álgebra" | "Geometría" | "Funciones" | "Trigonometría";
  summary: string;
  concepts: string;
  formulas: string;
  example: {
    problem: string;
    solution: string;
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
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Noción de conjuntos, pertenencia, inclusión, operaciones entre conjuntos (unión, intersección, complemento) y diagramas de Venn.",
    concepts: "Un conjunto es una colección de objetos llamados elementos. Puede describirse por extensión (lista explícita) o por comprensión (condición). Se denota el conjunto vacío como Ø o {}. Un conjunto puede ser finito o infinito.",
    formulas: "• Unión: A ∪ B = {x | x ∈ A o x ∈ B}\n• Intersección: A ∩ B = {x | x ∈ A y x ∈ B}\n• Complemento: A' = {x ∈ U | x ∉ A}\n• Diferencia: A - B = {x | x ∈ A y x ∉ B}\n• Leyes de De Morgan: (A ∪ B)' = A' ∩ B'  y  (A ∩ B)' = A' ∪ B'",
    example: {
      problem: "Sean A = {1, 3, 5, 7, 9} y B = {0, 3, 6, 9, 12}. Hallar A ∪ B y A ∩ B.",
      solution: "A ∪ B = {0, 1, 3, 5, 6, 7, 9, 12}\nA ∩ B = {3, 9}"
    }
  },
  {
    num: 2,
    title: "Propiedades de los Números Reales y Fraccionarios",
    page: 4,
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Axiomas de los números reales, operaciones con fraccionarios, simplificación, suma, resta, multiplicación y división.",
    concepts: "Sistemas numéricos: Naturales (N), Enteros (Z), Racionales (Q = {p/q | p,q ∈ Z, q ≠ 0}), Irracionales (I = {√2, e, π...}), Reales R = Q ∪ I. Todo número real tiene representación decimal periódica (Q) o no periódica (I).",
    formulas: "• Conmutativa: a + b = b + a,  ab = ba\n• Asociativa: (a + b) + c = a + (b + c),  (ab)c = a(bc)\n• Distributiva: a(b + c) = ab + ac\n• Fracciones: a/c + b/c = (a+b)/c,  a/b + c/d = (ad + bc)/(bd)\n• Multiplicación/División: (a/b)·(c/d) = (ac)/(bd),  (a/b) ÷ (c/d) = (ad)/(bc)",
    example: {
      problem: "Convertir la expresión decimal periódica x = 5.4383838... a fracción racional.",
      solution: "1000x = 5438.3838...\n- 10x = -54.3838...\n990x = 5384  ⇒  x = 5384 / 990 = 2692 / 495."
    }
  },
  {
    num: 3,
    title: "Recta Numérica, Orden e Intervalos",
    page: 7,
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Representación geométrica en la recta real, relación de orden (mayor/menor) e intervalos abiertos, cerrados y semiabiertos.",
    concepts: "Correspondencia biunívoca entre R y la recta real. Definición de orden: a > b si a - b > 0. Interpretación geométrica: a está a la derecha de b si a > b.",
    formulas: "• Intervalo Abierto: (a, b) = {x ∈ R | a < x < b}\n• Intervalo Cerrado: [a, b] = {x ∈ R | a ≤ x ≤ b}\n• Semiabiertos: [a, b) y (a, b]\n• Infinitos: (-∞, b), [a, ∞), (-∞, ∞) = R\n• Propiedad: Si a ≤ b y c < 0 ⇒ ac ≥ bc (invierte la desigualdad).",
    example: {
      problem: "Expresar en desigualdades y graficar la unión [5, 9] ∪ (3, 6).",
      solution: "{x ∈ R | 5 ≤ x ≤ 9} ∪ {x ∈ R | 3 < x < 6} = {x ∈ R | 3 < x ≤ 9} = (3, 9]."
    }
  },
  {
    num: 4,
    title: "Valor Absoluto y Distancia",
    page: 10,
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Definición rigurosa del valor absoluto, propiedades, interpretación geométrica como distancia entre dos puntos en la recta real.",
    concepts: "La distancia entre dos puntos a y b es d(a, b) = |a - b|. El valor absoluto representa la distancia de a al origen 0.",
    formulas: "• Definición: |a| = a si a ≥ 0,  -a si a < 0\n• Propiedades: |a| ≥ 0, |-a| = |a|,  -|a| ≤ a ≤ |a|\n• Multiplicatividad: |ab| = |a||b|,  |a/b| = |a|/|b| (b ≠ 0)\n• Desigualdad Triangular: |a + b| ≤ |a| + |b|",
    example: {
      problem: "Calcular la distancia entre a = -2 y b = 3 en la recta real.",
      solution: "d(-2, 3) = |3 - (-2)| = |3 + 2| = |5| = 5."
    }
  },
  {
    num: 5,
    title: "Potenciación y Radicación",
    page: 11,
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Leyes de los exponentes enteros y racionales, propiedades de los radicales, simplificación y operaciones con radicales.",
    concepts: "Expresión exponencial a^x con base a y exponente x. Raíz n-ésima principal ⁿ√a = b ⇔ bⁿ = a. Racionalización de radicales.",
    formulas: "• aᵐ · aⁿ = aᵐ⁺ⁿ,   aᵐ / aⁿ = aᵐ⁻ⁿ,   (aᵐ)ⁿ = aᵐⁿ\n• (ab)ⁿ = aⁿ bⁿ,   (a/b)ⁿ = aⁿ / bⁿ,   a⁻ⁿ = 1 / aⁿ\n• Exponente Racional: aᵐ/ⁿ = ⁿ√(aᵐ) = (ⁿ√a)ᵐ\n• Radicales: ⁿ√(ab) = ⁿ√a · ⁿ√b,   ⁿ√(a/b) = ⁿ√a / ⁿ√b",
    example: {
      problem: "Evaluar la expresión (-27 / 8)^(2/3).",
      solution: "[(-27)^(1/3) / 8^(1/3)]^2 = [ ∛(-27) / ∛8 ]^2 = [ -3 / 2 ]^2 = 9 / 4."
    }
  },
  {
    num: 6,
    title: "Expresiones Algebraicas Polinomios",
    page: 15,
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Clasificación de polinomios, grado, operaciones fundamentales (suma, resta, producto y división sintética/larga de polinomios).",
    concepts: "Un polinomio en x es una expresión P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀. El mayor exponente n se llama grado del polinomio. Los coeficientes aᵢ son números reales.",
    formulas: "• Algoritmo de la División: P(x) / D(x) = Q(x) + R(x)/D(x)\n  o equivalentemente P(x) = D(x)·Q(x) + R(x)\n  donde grado(R) < grado(D).\n• Productos Notables: (a+b)(a-b) = a² - b²,  (a±b)² = a² ± 2ab + b².",
    example: {
      problem: "Dividir P(x) = 5x³ - 2x + 1 entre D(x) = x + 1.",
      solution: "Mediante división sintética con c = -1:\n  5   0  -2   1  | -1\n     -5   5  -3\n ------------------\n  5  -5   3  -2 (residuo)\nResultado: Q(x) = 5x² - 5x + 3  con Residuo R = -2."
    }
  },
  {
    num: 7,
    title: "Ceros Reales de Polinomios",
    page: 21,
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Teorema del residuo, teorema del factor, ceros racionales y factorización completa de polinomios de grado superior.",
    concepts: "Un número c es un cero o raíz de P(x) si P(c) = 0. Gráficamente, los ceros correspondientes a intersecciones con el eje X.",
    formulas: "• Teorema del Residuo: Si P(x) se divide entre x - c, el residuo es P(c).\n• Teorema del Factor: (x - c) es un factor de P(x) ssi P(c) = 0.\n• Ceros Racionales: Todo cero racional p/q cumple que p es factor del término independiente a₀ y q es factor del coeficiente principal aₙ.",
    example: {
      problem: "Probar si x = 2 es un cero del polinomio P(x) = 3x³ - 2x - 20.",
      solution: "P(2) = 3(2)³ - 2(2) - 20 = 3(8) - 4 - 20 = 24 - 24 = 0. Luego, x = 2 sí es un cero y (x - 2) es un factor de P(x)."
    }
  },
  {
    num: 8,
    title: "Productos Notables y Factorización",
    page: 25,
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Fórmulas de productos notables (cuadrados, cubos), métodos de factorización: factor común, agrupación, trinomios y diferencias.",
    concepts: "Factorizar una expresión es escribirla como un producto de expresiones más simples. Métodos principales: Factor común, agrupación, trinomio cuadrado perfecto, trinomio x² + bx + c y ax² + bx + c.",
    formulas: "• Diferencia de cuadrados: a² - b² = (a + b)(a - b)\n• Suma de cubos: a³ + b³ = (a + b)(a² - ab + b²)\n• Diferencia de cubos: a³ - b³ = (a - b)(a² + ab + b²)\n• Trinomio cuadrado perfecto: a² ± 2ab + b² = (a ± b)²",
    example: {
      problem: "Factorizar completamente la expresión 3x³ - x² - 6x + 2 por agrupación.",
      solution: "(3x³ - x²) - (6x - 2) = x²(3x - 1) - 2(3x - 1) = (3x - 1)(x² - 2) = (3x - 1)(x - √2)(x + √2)."
    }
  },
  {
    num: 9,
    title: "Factorial y Teorema del Binomio",
    page: 32,
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Notación de factorial (!), coeficientes binomiales, triángulo de Pascal y desarrollo del binomio de Newton.",
    concepts: "Factorial n! = n·(n-1)···2·1, con 0! = 1. Combinaciones C(n, r) = (n r) es el número de grupos no ordenados de r objetos elegidos entre n.",
    formulas: "• Coeficiente Binomial: (n r) = n! / [ r! (n - r)! ]\n• Teorema del Binomio: (x + y)ⁿ = Σₖ₌₀ⁿ (n k) xⁿ⁻ᵏ yᵏ\n• Término general: Tₖ = (n k) xⁿ⁻ᵏ yᵏ\n• Coeficientes mediante el Triángulo de Pascal.",
    example: {
      problem: "Calcular el valor de combinaciones (10 4).",
      solution: "(10 4) = 10! / (4! · 6!) = (10 · 9 · 8 · 7) / (4 · 3 · 2 · 1) = 5040 / 24 = 210."
    }
  },
  {
    num: 10,
    title: "Expresiones Fraccionarias, Fracciones Compuestas y Racionalización",
    page: 37,
    blockId: "algebra",
    tag: "Álgebra",
    summary: "Dominio de expresiones racionales, simplificación de fracciones compuestas y técnicas de racionalización de numeradores y denominadores.",
    concepts: "Una expresión racional es un cociente P(x)/Q(x) donde P y Q son polinomios. El dominio requiere Q(x) ≠ 0. Racionalizar es eliminar los radicales del denominador o numerador multiplicando por la expresión conjugada adecuada.",
    formulas: "• Simplificación: (A·C)/(B·C) = A/B (C ≠ 0)\n• Conjugado de a + b√c es a - b√c: (a + b√c)(a - b√c) = a² - b²c\n• Racionalizar 1 / (∛a - ∛b): multiplicar por (∛a² + ∛ab + ∛b²) / (∛a² + ∛ab + ∛b²)",
    example: {
      problem: "Simplificar la expresión racional (x² - x - 2) / (x² - 1).",
      solution: "Factorizando numerador y denominador: [(x - 2)(x + 1)] / [(x - 1)(x + 1)] = (x - 2) / (x - 1) para x ≠ -1."
    }
  },

  // Bloque 2 (11 - 19) STRICT SEQUENTIAL ORDER
  {
    num: 11,
    title: "Ecuaciones",
    page: 42,
    blockId: "ecuaciones_geometria",
    tag: "Álgebra",
    summary: "Ecuaciones lineales, cuadráticas, despejes de variables, ecuaciones con valor absoluto y ecuaciones cuadráticas con fórmula general.",
    concepts: "Una ecuación es la afirmación de igualdad entre dos expresiones. Resolver una ecuación consiste en encontrar los valores que la satisfacen (conjunto solución).",
    formulas: "• Ecuación Lineal: ax + b = 0  ⇒  x = -b/a\n• Ecuación Cuadrática: ax² + bx + c = 0 (a ≠ 0)\n• Fórmula Cuadrática: x = [ -b ± √(b² - 4ac) ] / (2a)\n• Discriminante D = b² - 4ac: D > 0 (2 soluciones reales), D = 0 (1 doble), D < 0 (sin soluciones reales).",
    example: {
      problem: "Resolver la ecuación cuadrática 3x² - 6x - 1 = 0.",
      solution: "a = 3, b = -6, c = -1. D = 36 - 4(3)(-1) = 48 > 0.\nx = [ 6 ± √48 ] / 6 = [ 6 ± 4√3 ] / 6 = 1 ± (2√3)/3."
    }
  },
  {
    num: 12,
    title: "Línea Recta y Circunferencia",
    page: 47,
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Pendiente, ecuación de la recta (punto-pendiente, explícita, general), rectas paralelas/perpendiculares y ecuación de la circunferencia.",
    concepts: "Plano cartesiano R². Pendiente m es el cambio vertical sobre horizontal. Rectas paralelas tienen igual pendiente (m₁ = m₂). Rectas perpendiculares cumplen m₁·m₂ = -1.",
    formulas: "• Pendiente: m = (y₂ - y₁) / (x₂ - x₁)\n• Punto-Pendiente: y - y₁ = m(x - x₁)\n• Pendiente-Intercepto: y = mx + b\n• Forma General: ax + by + c = 0\n• Circunferencia centro (h, k) y radio r: (x - h)² + (y - k)² = r²",
    example: {
      problem: "Hallar la ecuación de la circunferencia con centro en (-4, 2) y radio r = 2.",
      solution: "(x - (-4))² + (y - 2)² = 2²  ⇒  (x + 4)² + (y - 2)² = 4  ⇒  x² + y² + 8x - 4y + 16 = 0."
    }
  },
  {
    num: 13,
    title: "Sistemas 2x2",
    page: 51,
    blockId: "ecuaciones_geometria",
    tag: "Álgebra",
    summary: "Sistemas de dos ecuaciones lineales con dos incógnitas: métodos de sustitución, igualación, reducción y regla de Cramer.",
    concepts: "Un sistema 2x2 representa dos rectas en el plano. La solución es el punto de intersección. Puede tener solución única (rectas secantes), infinitas soluciones (rectas coincidentes) o ninguna solución (rectas paralelas).",
    formulas: "• Sistema: a₁x + b₁y = c₁  y  a₂x + b₂y = c₂\n• Métodos: Sustitución, Eliminación/Reducción, Igualación.\n• Regla de Cramer: x = Dx / D,  y = Dy / D.",
    example: {
      problem: "Resolver el sistema 3x - 2y = -2 y 5x + y = 1.",
      solution: "De la segunda ecuación: y = 1 - 5x. Sustituyendo en la primera:\n3x - 2(1 - 5x) = -2  ⇒  3x - 2 + 10x = -2  ⇒  13x = 0  ⇒  x = 0.\nLuego y = 1 - 5(0) = 1. Solución: (0, 1)."
    }
  },
  {
    num: 14,
    title: "Desigualdades",
    page: 54,
    blockId: "ecuaciones_geometria",
    tag: "Álgebra",
    summary: "Desigualdades lineales, cuadráticas, racionales, desigualdades con valor absoluto y método de intervalos/signos (método del cementerio).",
    concepts: "Una inecuación es una proposición con símbolos <, >, ≤, ≥. Multiplicar o dividir por un número negativo invierte el sentido de la desigualdad.",
    formulas: "• Inecuación con Valor Absoluto:\n  |x| < a  ⇔  -a < x < a\n  |x| > a  ⇔  x < -a  o  x > a\n• Método del cementerio para productos/cocientes f(x)g(x) < 0.",
    example: {
      problem: "Resolver la desigualdad x² < x + 2.",
      solution: "x² - x - 2 < 0  ⇒  (x - 2)(x + 1) < 0.\nPuntos críticos: x = -1 y x = 2.\nProbando signos en (-∞, -1), (-1, 2) y (2, ∞) da negativo en (-1, 2).\nSolución: x ∈ (-1, 2)."
    }
  },
  {
    num: 15,
    title: "Ángulos y Triángulos",
    page: 60,
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Clasificación de ángulos, medidas en grados y radianes, propiedades de los triángulos y suma de ángulos internos.",
    concepts: "Ángulo en posición estándar. Medición en grados y radianes. Relación: 180° = π rad. Clasificación: agudo (<90°), recto (90°), obtuso (>90°), llano (180°). Complementarios (suman 90°), suplementarios (suman 180°).",
    formulas: "• Conversión: rad = grad · (π / 180°),   grad = rad · (180° / π)\n• Suma de ángulos internos de triángulo: α + β + γ = 180°\n• Ángulo exterior de triángulo = suma de los dos interiores no adyacentes.",
    example: {
      problem: "Convertir un ángulo de 36° a radianes.",
      solution: "36° · (π / 180°) = 36π / 180 = π / 5 rad."
    }
  },
  {
    num: 16,
    title: "Congruencia y Semejanza de Triángulos",
    page: 65,
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Criterios de congruencia (LLL, LAL, ALA) y semejanza de triángulos, Teorema de Thales y proporciones geométricas.",
    concepts: "Triángulos congruentes tienen lados y ángulos iguales (misma forma y tamaño). Triángulos semejantes tienen ángulos iguales y lados proporcionales (misma forma).",
    formulas: "• Criterios Congruencia: L-A-L, L-L-L, A-L-A.\n• Criterios Semejanza: A-A, L-L-L, L-A-L.\n• Teorema de Thales: Si DE || AB en ∆ABC ⇒ ∆ABC ~ ∆DEC ⇒ AB/DE = AC/DC = BC/EC.\n• Teorema de la Bisectriz: BD bisectriz ⇒ AB / BC = AD / DC.",
    example: {
      problem: "Si ∆ABC ~ ∆CED con lados AB = 18, BC = 12, CD = 10, hallar x = CE.",
      solution: "Por lados proporcionales: BC / CD = AB / x  ⇒  12 / 10 = 18 / x  ⇒  12x = 180  ⇒  x = 15."
    }
  },
  {
    num: 17,
    title: "Área y Perímetro de Figuras Planas y Teorema de Pitágoras",
    page: 70,
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Cálculo de áreas y perímetros de polígonos regulares e irregulares, círculo y aplicación del Teorema de Pitágoras en triángulos rectángulos.",
    concepts: "Perímetro es la longitud del contorno. Área es la medida de la superficie en unidades cuadradas. El Teorema de Pitágoras aplica exclusivamente a triángulos rectángulos.",
    formulas: "• Rectángulo: P = 2(b+h), A = bh\n• Triángulo: P = a+b+c, A = (1/2)bh\n• Trapecio: A = (1/2)(B+b)h\n• Círculo: C = 2πR, A = πR²\n• Teorema de Pitágoras: h² = a² + b² (donde h es la hipotenusa).",
    example: {
      problem: "Calcular la hipotenusa h y el área A de un triángulo rectángulo de catetos a = 3 cm y b = 4 cm.",
      solution: "h = √(3² + 4²) = √(9 + 16) = √25 = 5 cm.\nÁrea A = (1/2)·3·4 = 6 cm²."
    }
  },
  {
    num: 18,
    title: "Volumen y Área Superficial de Sólidos",
    page: 74,
    blockId: "ecuaciones_geometria",
    tag: "Geometría",
    summary: "Geometría del espacio: volumen y área lateral/superficial de prismas, cilindros, pirámides, conos y esferas.",
    concepts: "Los sólidos son cuerpos tridimensionales (poliedros o cuerpos redondos). El volumen mide el espacio ocupado en unidades cúbicas. El área superficial es la suma de las áreas de sus caras.",
    formulas: "• Paralelepípedo: V = abh, A = 2(ab + ah + bh)\n• Cilindro: V = πR²h, A = 2πR² + 2πRh\n• Cono: V = (1/3)πR²h, A = πRl + πR²\n• Pirámide: V = (1/3)Bh\n• Esfera: V = (4/3)πR³, A = 4πR²",
    example: {
      problem: "Calcular el volumen y área superficial de un cilindro con radio R = 7 cm y altura h = 18 cm.",
      solution: "Volumen V = π·(7)²·18 = 882π cm³ ≈ 2770.88 cm³.\nÁrea A = 2π(7)² + 2π(7)(18) = 98π + 252π = 350π cm² ≈ 1099.56 cm²."
    }
  },
  {
    num: 19,
    title: "Modelado Mediante Ecuaciones",
    page: 77,
    blockId: "ecuaciones_geometria",
    tag: "Álgebra",
    summary: "Planteamiento y resolución de problemas de la vida real aplicados a la física, economía y geometría utilizando ecuaciones.",
    concepts: "Modelar consiste en traducir un problema verbal a una ecuación matemática. Pasos: 1. Dibujar e identificar datos, 2. Definir variable x, 3. Expresar relaciones, 4. Plantear ecuación, 5. Resolver y verificar contexto.",
    formulas: "• Fórmulas de aplicación: Interés simple I = P·r·t,  Velocidad distancia d = v·t,  Costo total C = Fijo + Var(x).",
    example: {
      problem: "Carlos invirtió $120.000 en dos fondos al 4.5% y 4% anual. Si el interés total fue $5.250, ¿cuánto invirtió en cada uno?",
      solution: "Sea x el monto al 4.5% y (120000 - x) al 4%:\n0.045x + 0.04(120000 - x) = 5250  ⇒  0.005x + 4800 = 5250  ⇒  0.005x = 450  ⇒  x = $90.000 al 4.5% y $30.000 al 4%."
    }
  },

  // Bloque 3 (20 - 25)
  {
    num: 20,
    title: "Funciones",
    page: 81,
    blockId: "funciones",
    tag: "Funciones",
    summary: "Definición formal de función, regla de correspondencia, prueba de la línea vertical, dominio y rango de una función.",
    concepts: "Una función f: A -> B asigna a cada elemento x ∈ A un único elemento y = f(x) ∈ B. Dominio Df es el conjunto de entrada; Rango Rf son los valores de salida alcanzados. Una curva representa función ssi ninguna recta vertical la corta en más de un punto.",
    formulas: "• Evaluación: f(a)\n• Cociente de Diferencias: [ f(a + h) - f(a) ] / h  (h ≠ 0)\n• Restricciones de Dominio: Denominadores ≠ 0,  Radicandos pares ≥ 0.",
    example: {
      problem: "Hallar el dominio de la función f(x) = 1 / (9x² - 4).",
      solution: "Requerimos 9x² - 4 ≠ 0  ⇒  (3x - 2)(3x + 2) ≠ 0  ⇒  x ≠ 2/3 y x ≠ -2/3.\nDominio Df = R - {-2/3, 2/3} = (-∞, -2/3) ∪ (-2/3, 2/3) ∪ (2/3, ∞)."
    }
  },
  {
    num: 21,
    title: "Funciones por Tramos, Valor Absoluto y de la forma x^n y x^(1/n)",
    page: 85,
    blockId: "funciones",
    tag: "Funciones",
    summary: "Gráficas de funciones definidas a trozos, función valor absoluto, funciones potencia y funciones raíz n-ésima.",
    concepts: "Una función a trozos tiene reglas distintas en subintervalos de su dominio. Función valor absoluto f(x) = |x|. Comportamiento de f(x) = xⁿ para n par (parábolas) e impar (s-shape).",
    formulas: "• f(x) = |x| = { -x si x < 0,  x si x ≥ 0 }\n• g(x) = ||x| - 3| descompuesto por tramos según x ≤ -3, -3 < x < 0, 0 ≤ x < 3, x ≥ 3.\n• f(x) = ⁿ√x: Dominio [0, ∞) para n par, y R para n impar.",
    example: {
      problem: "Determinar el dominio y gráfica básica de f(x) = √x.",
      solution: "Requiere x ≥ 0. Dominio Df = [0, ∞), Rango Rf = [0, ∞). Pasa por (0,0), (1,1), (4,2), (9,3)."
    }
  },
  {
    num: 22,
    title: "Funciones Pares e Impares, Combinación de Funciones",
    page: 87,
    blockId: "funciones",
    tag: "Funciones",
    summary: "Simetría respecto al eje Y y al origen, operaciones algebraicas entre funciones (suma, resta, producto, cociente) y composición (f o g).",
    concepts: "Función Par: f(-x) = f(x) (simetría respecto al eje Y). Función Impar: f(-x) = -f(x) (simetría respecto al origen). La composición (f o g)(x) = f(g(x)) aplica g primero y luego f.",
    formulas: "• (f ± g)(x) = f(x) ± g(x),   Dominio Df ∩ Dg\n• (f·g)(x) = f(x)g(x),   Dominio Df ∩ Dg\n• (f/g)(x) = f(x)/g(x),   Dominio (Df ∩ Dg) - {x | g(x) = 0}\n• (f ◦ g)(x) = f(g(x)),   Dominio Df◦g = {x ∈ Dg | g(x) ∈ Df}",
    example: {
      problem: "Determinar si f(x) = x² + |x| es par o impar.",
      solution: "f(-x) = (-x)² + |-x| = x² + |x| = f(x). Como f(-x) = f(x), la función es PAR."
    }
  },
  {
    num: 23,
    title: "Funciones Inyectivas e Inversa de una Función",
    page: 91,
    blockId: "funciones",
    tag: "Funciones",
    summary: "Prueba de la línea horizontal, funciones uno a uno (inyectivas), definición de la función inversa f^-1 y simetría respecto a y = x.",
    concepts: "Una función es inyectiva (1 a 1) si f(x₁) = f(x₂) ⇒ x₁ = x₂. Pasa la prueba de la línea horizontal. Posee inversa f⁻¹ que intercambia dominio y rango: Df⁻¹ = Rf y Rf⁻¹ = Df.",
    formulas: "• Cancelación: f⁻¹(f(x)) = x,   f(f⁻¹(y)) = y\n• Simetría: La gráfica de y = f⁻¹(x) es el reflejo de y = f(x) respecto a la recta y = x.\n• Pasos para hallar f⁻¹: 1. Escribir y = f(x), 2. Despejar x, 3. Intercambiar x por y.",
    example: {
      problem: "Calcular la función inversa de f(x) = (x⁷ / 3) + 1.",
      solution: "1. y = (x⁷ / 3) + 1  ⇒  2. y - 1 = x⁷ / 3  ⇒  3(y - 1) = x⁷  ⇒  x = ⁷√(3y - 3).\n3. Intercambiando x e y: f⁻¹(x) = ⁷√(3x - 3)."
    }
  },
  {
    num: 24,
    title: "Funciones Exponenciales",
    page: 95,
    blockId: "funciones",
    tag: "Funciones",
    summary: "Definición de f(x) = a^x, el número e, propiedades de los exponentes, gráficas y aplicaciones de crecimiento/decaimiento.",
    concepts: "Función exponencial f(x) = aⁿ con a > 0, a ≠ 1. Dominio R, Rango (0, ∞). Pasa por (0, 1). El número de Euler e ≈ 2.7182818... define la exponencial natural f(x) = eⁿ.",
    formulas: "• Crecimiento/Decaimiento Exponencial: P(t) = P₀ eʳᵗ\n  (r > 0 crecimiento, r < 0 decaimiento)\n• Leyes: aˣ·aʸ = aˣ⁺ʸ,  (aˣ)ʸ = aˣʸ,  a⁻ˣ = 1/aˣ",
    example: {
      problem: "Población inicial de 230.000 hab. que crece al r = 3% anual. Calcular la población proyectada a los t = 15 años.",
      solution: "P(t) = 230000 e^(0.03t). Para t = 15: P(15) = 230000 e^(0.45) ≈ 230000 · (1.56831) ≈ 360.712 habitantes."
    }
  },
  {
    num: 25,
    title: "Funciones Logarítmicas y Propiedades de los Logaritmos",
    page: 99,
    blockId: "funciones",
    tag: "Funciones",
    summary: "Logaritmo como inversa de la exponencial, logaritmo natural ln(x), propiedades de expansión, compresión y cambio de base.",
    concepts: "Definición: logₐ x = y ⇔ aʸ = x (x > 0). Dominio (0, ∞), Rango R. Logaritmo común log₁₀(x) = log(x) y natural logₑ(x) = ln(x).",
    formulas: "• Cancelación: logₐ(aⁿ) = x,   a^(logₐ x) = x\n• Leyes: logₐ(xy) = logₐ x + logₐ y\n  logₐ(x/y) = logₐ x - logₐ y\n  logₐ(xʳ) = r logₐ x\n• Cambio de base: log_b x = (logₐ x) / (logₐ b)",
    example: {
      problem: "Resolver la ecuación e^(8 - 3x) = 20 para x.",
      solution: "Tomando ln a ambos lados: ln(e^(8 - 3x)) = ln(20)  ⇒  8 - 3x = ln(20)  ⇒  3x = 8 - ln(20)  ⇒  x = [ 8 - ln(20) ] / 3 ≈ 1.668."
    }
  },

  // Bloque 4 (26 - 30)
  {
    num: 26,
    title: "Funciones Trigonométricas de Ángulos",
    page: 103,
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Definición de las 6 razones trigonométricas en triángulos rectángulos (seno, coseno, tangente, cotangente, secante, cosecante) y ángulos notables.",
    concepts: "En un triángulo rectángulo de cateto opuesto y, adyacente x e hipotenusa r = √(x² + y²). Ángulos coterminales θ y θ + 360°n. Ángulos de referencia en los 4 cuadrantes.",
    formulas: "• sen θ = y/r,   cos θ = x/r,   tan θ = y/x\n• csc θ = r/y,   sec θ = r/x,   cot θ = x/y\n• Valores Notables:\n  sen(30°) = 1/2,  cos(30°) = √3/2,  tan(30°) = √3/3\n  sen(45°) = √2/2, cos(45°) = √2/2, tan(45°) = 1\n  sen(60°) = √3/2, cos(60°) = 1/2,  tan(60°) = √3\n• Área de Triángulo: A = (1/2) a b sen θ",
    example: {
      problem: "Hallar el valor exacto de cos(7π/3).",
      solution: "7π/3 - 2π = π/3 (ángulo de referencia en I cuadrante).\ncos(7π/3) = cos(π/3) = 1/2."
    }
  },
  {
    num: 27,
    title: "Aplicaciones de Trigonometría y Ley de Senos y Cosenos",
    page: 108,
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Resolución de triángulos oblicuángulos mediante la Ley de Senos y la Ley de Cosenos, cálculo de distancias inaccesibles y vectores.",
    concepts: "Resolver un triángulo es hallar sus 3 lados y 3 ángulos. Ángulos de elevación y depresión. Ley de Senos para L-A-A o L-L-A (caso ambiguo). Ley de Cosenos para L-A-L o L-L-L.",
    formulas: "• Ley de Senos: (sen A) / a = (sen B) / b = (sen C) / c\n• Ley de Cosenos:\n  a² = b² + c² - 2bc cos A\n  b² = a² + c² - 2ac cos B\n  c² = a² + b² - 2ab cos C",
    example: {
      problem: "En un triángulo con a = 20, b = 25, c = 22, hallar el ángulo A.",
      solution: "Por Ley de Cosenos: 20² = 25² + 22² - 2(25)(22) cos A\n400 = 625 + 484 - 1100 cos A  ⇒  1100 cos A = 709  ⇒  cos A = 709 / 1100 ≈ 0.6445  ⇒  A ≈ 49.87°."
    }
  },
  {
    num: 28,
    title: "Funciones Trigonométricas de Números Reales",
    page: 113,
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Círculo unitario, definición de funciones circulares, periodo, amplitud, desfase y gráficas de las funciones trigonométricas en R.",
    concepts: "En el círculo unitario x² + y² = 1, para cada número real t: sen t = y, cos t = x. Periodicidad: las funciones se repiten tras intervalos de longitud p.",
    formulas: "• Periodos: sen, cos, csc, sec tienen periodo 2π. tan y cot tienen periodo π.\n  sen(t + 2π) = sen t,   cos(t + 2π) = cos t,   tan(t + π) = tan t\n• Dominio y Rango:\n  D(sen) = R, R(sen) = [-1, 1]\n  D(cos) = R, R(cos) = [-1, 1]\n• Paridad: cos(-t) = cos t (Par),  sen(-t) = -sen t (Impar).",
    example: {
      problem: "Graficar un periodo completo de f(t) = sen t en [0, 2π].",
      solution: "Puntos clave (t, sen t): (0, 0), (π/2, 1), (π, 0), (3π/2, -1), (2π, 0). Forma de onda sinusoidal oscilando entre 1 y -1."
    }
  },
  {
    num: 29,
    title: "Identidades Trigonométricas",
    page: 117,
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Identidades fundamentales (pitagóricas, recíprocas, cociente), identidades de suma/resta de ángulos y del ángulo doble.",
    concepts: "Una identidad trigonométrica es una igualdad válida para todo valor del dominio. Se prueban transformando el lado más complejo mediante álgebra e identidades conocidas.",
    formulas: "• Recíprocas: csc x = 1/sen x,  sec x = 1/cos x,  cot x = 1/tan x\n• Cociente: tan x = sen x / cos x,  cot x = cos x / sen x\n• Pitagóricas: sen² x + cos² x = 1,   1 + tan² x = sec² x,   1 + cot² x = csc² x\n• Adición: sen(s ± t) = sen s cos t ± cos s sen t\n  cos(s ± t) = cos s cos t ∓ sen s sen t\n• Ángulo Doble: sen(2x) = 2 sen x cos x,   cos(2x) = cos² x - sen² x",
    example: {
      problem: "Demostrar la identidad (1 + sec² x) / (1 + tan² x) = 1 + cos² x.",
      solution: "Como 1 + tan² x = sec² x:\nLHS = (1 + sec² x) / sec² x = (1 / sec² x) + (sec² x / sec² x) = cos² x + 1 = 1 + cos² x. Q.E.D."
    }
  },
  {
    num: 30,
    title: "Ecuaciones Trigonométricas",
    page: 122,
    blockId: "trigonometria",
    tag: "Trigonometría",
    summary: "Resolución de ecuaciones que involucran funciones trigonométricas, cálculo de soluciones generales y restringidas en un intervalo.",
    concepts: "Una ecuación trigonométrica se resuelve despejando las razones numéricas y determinando los ángulos en [0, 2π), agregando + 2kπ para la solución general en R.",
    formulas: "• Para sen x = c: soluciones x = θ + 2kπ y x = (π - θ) + 2kπ (k ∈ Z)\n• Para cos x = c: soluciones x = ±θ + 2kπ (k ∈ Z)\n• Para tan x = c: solución general x = θ + kπ (k ∈ Z)",
    example: {
      problem: "Resolver la ecuación 4 sen² x - 1 = 0 en el intervalo [0, 2π).",
      solution: "4 sen² x = 1  ⇒  sen² x = 1/4  ⇒  sen x = ± 1/2.\n• sen x = 1/2  ⇒  x = π/6  y  x = 5π/6.\n• sen x = -1/2 ⇒  x = 7π/6  y  x = 11π/6.\nConjunto solución: { π/6, 5π/6, 7π/6, 11π/6 }."
    }
  }
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
          m.tag.toLowerCase().includes(term) ||
          m.summary.toLowerCase().includes(term) ||
          m.concepts.toLowerCase().includes(term) ||
          m.formulas.toLowerCase().includes(term)
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
              <span className="text-xs text-[#BFAE8F]">Módulo de Teoría (30 Capítulos Oficiales)</span>
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
                📚 Contenido Completo del Texto Guía
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#BFAE8F]/15 border border-[#BFAE8F]/30 text-[#BFAE8F]">
                30 Módulos Consecutivos (Pág. 1 a 125)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#D9CBB6] glow-beige">
              Módulo de Teoría y Contenidos Académicos
            </h1>
            <p className="text-[#BFAE8F] text-sm max-w-3xl leading-relaxed">
              Catálogo oficial de los 30 temas de Matemáticas Básicas en estricto orden secuencial. Cada sección detalla los conceptos fundamentales, axiomas, leyes, fórmulas principales y un ejemplo resuelto paso a paso.
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
              placeholder="Buscar por tema, fórmula, # o palabra..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="beige-input w-full h-10 rounded-lg pl-9 pr-3 text-xs"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#BFAE8F] absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Render Sequential Blocks Sections */}
        <div className="space-y-12">
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
                  m.summary.toLowerCase().includes(term) ||
                  m.concepts.toLowerCase().includes(term) ||
                  m.formulas.toLowerCase().includes(term)
                );
              });

              if (modulesInBlock.length === 0) return null;

              return (
                <section key={block.id} className="space-y-6 animate-fade-in">
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

                  {/* Modules Cards Grid - FULLY OPEN AND POPULATED WITH DETAILED CONTENT */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modulesInBlock.map((mod) => (
                      <div
                        key={mod.num}
                        className="beige-card rounded-2xl p-6 border border-[#D9CBB6]/20 hover:border-[#7A8F73]/70 transition-all flex flex-col justify-between shadow-lg space-y-4"
                      >
                        {/* Module Top Badges & Title */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs border-b border-[#D9CBB6]/10 pb-2.5">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 rounded-full font-extrabold bg-[#7A8F73]/30 text-[#D9CBB6] border border-[#7A8F73]/50 text-xs">
                                Módulo #{mod.num}
                              </span>
                              <span className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${
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
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full font-bold bg-[#BFAE8F]/15 text-[#BFAE8F] border border-[#BFAE8F]/30 text-xs">
                              Página {mod.page}
                            </span>
                          </div>

                          <h3 className="text-lg font-extrabold text-[#D9CBB6] leading-snug">
                            {mod.title}
                          </h3>

                          <p className="text-xs text-[#BFAE8F] leading-relaxed italic">
                            "{mod.summary}"
                          </p>
                        </div>

                        {/* Concepts Section */}
                        <div className="space-y-1.5 bg-[#2E3B33]/60 p-3.5 rounded-xl border border-[#D9CBB6]/10">
                          <h4 className="text-xs font-bold text-[#D9CBB6] uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7A8F73]" />
                            Conceptos Teóricos Fundamentales
                          </h4>
                          <p className="text-xs text-[#D9CBB6]/90 leading-relaxed whitespace-pre-line">
                            {mod.concepts}
                          </p>
                        </div>

                        {/* Formulas & Properties Section */}
                        <div className="space-y-1.5 bg-[#4F6B57]/20 p-3.5 rounded-xl border border-[#7A8F73]/30">
                          <h4 className="text-xs font-bold text-[#7A8F73] uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7A8F73]" />
                            Fórmulas, Teoremas y Propiedades
                          </h4>
                          <pre className="text-xs text-[#D9CBB6] font-mono leading-relaxed whitespace-pre-wrap font-sans">
                            {mod.formulas}
                          </pre>
                        </div>

                        {/* Solved Example Box */}
                        <div className="space-y-2 bg-[#2E3B33]/90 p-4 rounded-xl border border-[#BFAE8F]/20 shadow-inner">
                          <h4 className="text-xs font-bold text-[#BFAE8F] uppercase tracking-wider flex items-center gap-1.5">
                            <span>💡</span>
                            Ejemplo Práctico Resuelto del Texto Guía
                          </h4>
                          <p className="text-xs font-semibold text-[#D9CBB6]">
                            {mod.example.problem}
                          </p>
                          <div className="text-xs text-[#BFAE8F]/95 pt-1.5 border-t border-[#D9CBB6]/10 font-mono whitespace-pre-line font-sans">
                            <strong className="text-[#7A8F73]">Solución:</strong> {mod.example.solution}
                          </div>
                        </div>

                        {/* Footer Indicator */}
                        <div className="pt-2 border-t border-[#D9CBB6]/10 flex items-center justify-between text-[11px] text-[#BFAE8F]">
                          <span className="font-semibold text-[#7A8F73]">Módulo #{mod.num} Completo</span>
                          <span>Consultar página {mod.page} del libro</span>
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
