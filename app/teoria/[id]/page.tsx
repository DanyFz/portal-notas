import Link from "next/link";
import { notFound } from "next/navigation";

/* ──────────────────────────────────────────────────────────────
   DATA: Full theory content for modules 1-10, extracted verbatim
   from the official PDF of Matemáticas Básicas – UNAL Sede Medellín.
   Modules 11-30 will be added in a future update.
   ────────────────────────────────────────────────────────────── */

interface TheoryModule {
  num: number;
  title: string;
  pdfPages: string;
  tag: string;
  sections: TheorySection[];
}

interface TheorySection {
  heading: string;
  level: 1 | 2 | 3;
  content: string[];          // paragraphs & formulas rendered as text
}

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
        heading: "NOCIONES SOBRE CONJUNTOS",
        level: 1,
        content: [
          "Un conjunto es una colección de objetos, llamados elementos del conjunto.",
          "Un conjunto puede describirse:",
          "• Por extensión: haciendo una lista explícita de sus elementos, separados por comas y encerrados entre llaves.",
          "• Por comprensión: dando la condición o condiciones que cumplen los elementos del conjunto.",
          "Ejemplo: A = {x / x es una vocal de la palabra eucalipto} es un conjunto descrito por comprensión, y su respectiva descripción por extensión es A = {a, e, i, o, u}.",
          "Si un conjunto no tiene elementos se llama conjunto vacío y se denota por ∅ ó { }.",
          "Si un conjunto es vacío o su número de elementos es un número natural, se dice que el conjunto es finito. Si un conjunto no es finito, se dice que es infinito.",
        ],
      },
      {
        heading: "Ejemplos",
        level: 2,
        content: [
          "• Sea A = {x / x es una vocal cerrada en la palabra espejo}. Como no hay ninguna vocal cerrada en la palabra \"espejo\", entonces tenemos que A = ∅.",
          "• Sea A = {1, 2, 3}. Luego, A es finito, ya que posee 3 elementos.",
          "• Sea A = { 1/2, 1/3, 1/4, 1/5, … }. A es infinito ya que no podemos asignar un número natural para su número de elementos.",
        ],
      },
      {
        heading: "Pertenencia y Subconjuntos",
        level: 2,
        content: [
          "Si A es un conjunto, decimos que a pertenece a A y escribimos a ∈ A si a es un elemento de A. En caso contrario decimos que a no pertenece a A y escribimos a ∉ A. En el último ejemplo, 1/2 ∈ A y 5 ∉ A.",
          "Si A y B son conjuntos, decimos que A es subconjunto de B y escribimos A ⊆ B, si todo elemento de A es también elemento de B. En caso de que haya al menos un elemento en el conjunto A que no pertenece al conjunto B, decimos que A no es subconjunto de B, y escribimos A ⊈ B.",
          "Ejemplo: Sean A = {a, e, i, o, u} y B = {x / x es una letra del abecedario}. Entonces A ⊆ B, pero B ⊈ A.",
        ],
      },
      {
        heading: "Propiedades de los Subconjuntos",
        level: 2,
        content: [
          "Si A, B y C son conjuntos:",
          "a) ∅ ⊆ A.",
          "b) A ⊆ A.",
          "c) Si A ⊆ B y B ⊆ C entonces A ⊆ C.",
          "Dos conjuntos A y B son iguales si y sólo si A ⊆ B y B ⊆ A. Es decir, A = B si y sólo si todo elemento de A está en B y todo elemento de B está en A.",
          "Ejemplo: Sean A = {vocales de la palabra mundo} y B = {u, o}, entonces A = B.",
          "Sean A = {1, 3, 7} y B = {1, 3, 7, 1}, entonces A = B.",
        ],
      },
      {
        heading: "OPERACIONES ENTRE CONJUNTOS",
        level: 1,
        content: [],
      },
      {
        heading: "1. Unión",
        level: 2,
        content: [
          "Sean A y B dos conjuntos. Definimos la unión de A y B, denotada A ∪ B, como el conjunto:",
          "A ∪ B = {x / x ∈ A ó x ∈ B}.",
          "Ejemplo: Sean A = {1, 3, 5, 7, 9} y B = {0, 3, 6, 9, 12}. Entonces, A ∪ B = {0, 1, 3, 5, 6, 7, 9, 12}.",
        ],
      },
      {
        heading: "2. Intersección",
        level: 2,
        content: [
          "Sean A y B dos conjuntos. Definimos la intersección de A y B, denotada A ∩ B, como el conjunto:",
          "A ∩ B = {x / x ∈ A y x ∈ B}.",
          "Ejemplo: Sean A = {1, 3, 5, 7, 9} y B = {0, 3, 6, 9, 12}. Entonces, A ∩ B = {3, 9}.",
        ],
      },
      {
        heading: "Propiedades de la Unión y de la Intersección",
        level: 2,
        content: [
          "Sean A, B y C conjuntos. Entonces:",
          "A ∪ A = A                    A ∩ A = A",
          "A ∪ ∅ = A                    A ∩ ∅ = ∅",
          "A ⊆ (A ∪ B)                  (A ∩ B) ⊆ A",
          "B ⊆ (A ∪ B)                  (A ∩ B) ⊆ B",
          "A ∪ B = B ∪ A                A ∩ B = B ∩ A",
          "A ∪ (B ∪ C) = (A ∪ B) ∪ C    A ∩ (B ∩ C) = (A ∩ B) ∩ C",
          "A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)   (Distributiva)",
          "A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)   (Distributiva)",
        ],
      },
      {
        heading: "3. Complemento",
        level: 2,
        content: [
          "Si U es un conjunto universal y A es un subconjunto de U, definimos el complemento de A, denotado A′, como el conjunto A′ = {x ∈ U / x ∉ A}.",
          "Ejemplo: Si U = {a, b, c, d, e, f, g, h} y A = {c, f, h}, entonces A′ = {a, b, d, e, g}.",
          "Propiedades del Complemento: Sean A y B conjuntos. Entonces:",
          "a) (A′)′ = A",
          "b) A ∪ A′ = U",
          "c) A ∩ A′ = ∅",
          "d) (A ∪ B)′ = A′ ∩ B′   (Ley de De Morgan)",
          "e) (A ∩ B)′ = A′ ∪ B′   (Ley de De Morgan)",
        ],
      },
      {
        heading: "4. Diferencia",
        level: 2,
        content: [
          "Sean A y B dos conjuntos. Definimos la diferencia de A y B, denotada A − B, como:",
          "A − B = {x / x ∈ A y x ∉ B}.",
          "Ejemplo: Sean A = {0,1,2,3,4,5,6,7} y B = {1,4,6,7,8,9}. Entonces A − B = {0,2,3,5}.",
          "Propiedades de la Diferencia: Sean A y B conjuntos. Entonces:",
          "a) A − B = A ∩ B′",
          "b) A − B ≠ B − A",
          "c) A − A = ∅",
          "d) A − ∅ = A",
          "e) U − A = A′",
        ],
      },
      {
        heading: "5. Diferencia Simétrica",
        level: 2,
        content: [
          "Sean A y B dos conjuntos. Definimos la diferencia simétrica de A y B, denotada A △ B, como:",
          "A △ B = (A ∪ B) − (A ∩ B),",
          "o equivalentemente A △ B = (A − B) ∪ (B − A).",
          "Ejemplo: Consideremos los conjuntos A = {0,1,2,3,4,5,6,7} y B = {1,4,6,7,8,9}. Por lo tanto A △ B = {0,2,3,5,8,9}.",
        ],
      },
      {
        heading: "SISTEMAS NUMÉRICOS",
        level: 1,
        content: [
          "• Los números naturales son: 1, 2, 3, 4, … Representamos por ℕ al conjunto de todos los números naturales, es decir, ℕ = {1, 2, 3, 4, …}.",
          "• Los números enteros están formados por los números naturales junto con los números negativos y el 0. Denotamos por ℤ al conjunto de los números enteros: ℤ = {…, −3, −2, −1, 0, 1, 2, 3, …}. Algunas veces, se acostumbra escribir ℤ⁺ = ℕ.",
          "• El conjunto de los números racionales se obtiene al formar cocientes de números enteros. Este conjunto lo denotamos por ℚ. Luego, r ∈ ℚ si y sólo si r = p/q, con p, q ∈ ℤ, q ≠ 0.",
          "Números como 3/5, −7/4, 0 = 0/1, 2 = 2/1, 0.1 = 1/10 son ejemplos de números racionales. ¡Recordar que no es posible dividir por cero, por tanto, expresiones como 3/0 ó 0/0 no están definidas!",
          "• Existen números que no pueden expresarse en la forma p/q con p, q ∈ ℤ, q ≠ 0. Estos números se denominan irracionales, denotados por 𝕀. Es posible probar que números como √2, √3, √5, e, π pertenecen a 𝕀.",
          "• El conjunto de los números reales se representa por ℝ y consta de la unión de los racionales y los irracionales, es decir, ℝ = ℚ ∪ 𝕀.",
          "Todos los números reales tienen una representación decimal. Si el número es racional, entonces, su parte decimal correspondiente es periódica. Por ejemplo: 1/2 = 0.5̄0, 1/3 = 0.3̄, 157/495 = 0.31̄7̄, 9/7 = 1.2̄8̄5̄7̄1̄4̄.",
          "Si el número es irracional, la representación decimal no es periódica, por ejemplo √2 = 1.414213562373095…, e = 2.7182818284590452354…",
          "En la práctica, se acostumbra aproximar un número irracional por medio de uno racional, por ejemplo √2 ≈ 1.4142, e ≈ 2.71828, π ≈ 3.1416.",
          "• Dada la representación decimal periódica de un número x, podemos hallar una fracción equivalente multiplicando éste por potencias adecuadas de 10, y luego restando para eliminar la parte que se repite.",
          "Ejemplo: Sea x = 5.4383838… Para convertirlo en un cociente de dos enteros: 1000x = 5438.3838…, −10x = −54.3838…, 990x = 5384. Por consiguiente, x = 5384/990.",
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
        heading: "OPERACIONES CON LOS NÚMEROS REALES",
        level: 1,
        content: [
          "En ℝ se definen dos operaciones: suma o adición y producto o multiplicación. Si a ∈ ℝ y b ∈ ℝ, la suma de a y b, denotada a + b, y el producto de a y b, denotado a · b, ó a × b ó simplemente ab, son también elementos de ℝ, que cumplen las siguientes propiedades:",
          "Conmutativa: a + b = b + a ;  ab = ba",
          "Asociativa: (a + b) + c = a + (b + c) ;  (ab)c = a(bc)",
          "Distributiva del producto con respecto a la suma: a(b + c) = ab + ac",
        ],
      },
      {
        heading: "Ejemplo de demostración",
        level: 2,
        content: [
          "Probar que (a + b)(a + b) = a² + 2ab + b².",
          "Solución: Usando la propiedad distributiva: (a + b)(a + b) = (a + b)a + (a + b)b = a² + ab + ab + b² = a² + 2ab + b².",
          "Usando el hecho de que ∀a ∈ ℝ, a · a = a², escribimos: (a + b)² = a² + 2ab + b².",
        ],
      },
      {
        heading: "Otras propiedades de los números reales",
        level: 2,
        content: [
          "• 0 ∈ ℝ, es tal que ∀a ∈ ℝ, a + 0 = a. Al número 0 se le llama el elemento neutro para la suma.",
          "• Si a ∈ ℝ, ∃(−a) ∈ ℝ, tal que a + (−a) = 0. Al número −a se le llama el inverso aditivo de a.",
          "• 1 ∈ ℝ es tal que ∀a ∈ ℝ, a · 1 = a. A 1 se le llama el elemento neutro para el producto.",
          "• Si a ∈ ℝ, a ≠ 0, ∃(1/a) ∈ ℝ, tal que a · (1/a) = 1. Al número 1/a se le llama el inverso multiplicativo ó recíproco de a, y también se denota por a⁻¹.",
          "• Si a y b son números reales, el número a + (−b) se escribe también a − b y se llama la resta o diferencia de a y b.",
          "• Si a y b son números reales, con b ≠ 0, el número a · (1/b) se escribe también a/b y se llama el cociente de a y b. A la expresión a/b se le llama fracción, a se llama numerador y b denominador de la fracción.",
        ],
      },
      {
        heading: "Leyes de signos",
        level: 2,
        content: [
          "Si a, b ∈ ℝ:",
          "1. (−1)a = −a",
          "2. −(−a) = a",
          "3. (−a)b = a(−b) = −ab",
          "4. (−a)(−b) = ab",
          "5. −(a + b) = −a − b",
          "6. −(a − b) = b − a",
          "La propiedad 6 nos dice que a − b es el inverso aditivo de b − a.",
          "La propiedad 5 puede usarse con más de 2 términos, así: −(a + b + c) = −a − b − c.",
        ],
      },
      {
        heading: "Ejemplo",
        level: 3,
        content: [
          "Utilizando propiedades escriba las siguientes expresiones sin usar paréntesis:",
          "a) −(−x + y) = −(−x) − y = x − y  (por propiedades 5 y 2)",
          "b) −(x − y + z) = −x − (−y) − z = −x + y − z  (por propiedades 5 y 2)",
        ],
      },
      {
        heading: "Caracterización de algunos números reales",
        level: 2,
        content: [
          "• Un número a es un número par si puede escribirse en la forma a = 2k, con k ∈ ℤ. 6 es par (k=3), 0 es par (k=0), −8 es par (k=−4).",
          "• Un número a es un número impar si puede escribirse en la forma a = 2k + 1, con k ∈ ℤ. 3 es impar (k=1), −7 es impar (k=−4).",
          "• Dados d ∈ ℤ y b ∈ ℤ, con d ≠ 0, decimos que d divide a b ó que d es un divisor de b, si existe a ∈ ℤ tal que b = ad. También se acostumbra decir que d es un factor de b y que b es un múltiplo de d.",
          "• d es el Máximo Común Divisor de los enteros a y b, con a ≠ 0 ó b ≠ 0, si d es el mayor número entero positivo que los divide a ambos. El MCD de 24 y 30 es 6; el MCD de 7 y 18 es 1; el MCD de 0 y 12 es 12.",
          "• m es el Mínimo Común Múltiplo de los enteros a y b, con a ≠ 0 y b ≠ 0, si m es el menor número entero positivo que es múltiplo de ambos. El MCM de 6 y 10 es 30; el MCM de 15 y 14 es 210.",
          "• Dos números enteros a, b son primos relativos si el MCD de a y b es 1. 7 y 18 son primos relativos.",
          "• Un número racional a/b está en forma reducida, o \"simplificado\" si a y b son primos relativos. 7/18 está en forma reducida; 16/12 no está en forma reducida → 4/3.",
          "• Un entero positivo p ≠ 1 es un número primo si sus únicos divisores positivos son 1 y p. Los números 2, 3, 5, 7, 11, 37, 523 son números primos.",
          "• Si a ∈ ℤ, a > 1, y a no es primo, decimos que a es número compuesto.",
          "• Teorema fundamental de la aritmética: Todo número entero mayor que 1 puede descomponerse en forma única como un producto de números ó factores primos. Ejemplo: 2924 = 2² × 17 × 43.",
        ],
      },
      {
        heading: "OPERACIONES CON FRACCIONES",
        level: 1,
        content: [
          "Sean a, b, c, d números enteros.",
        ],
      },
      {
        heading: "1. Suma de fracciones",
        level: 2,
        content: [
          "Con el mismo denominador: a/c + b/c = (a + b)/c, con c ≠ 0. Ejemplo: 15/7 + 23/7 = 38/7.",
          "Con distinto denominador: Para sumar fracciones que tienen distinto denominador, hallamos el Mínimo Común Denominador (MCD) de los denominadores (Mínimo Común Múltiplo), ampliamos cada fracción multiplicando el numerador y el denominador por un número tal que cada fracción resultante tenga como denominador el MCD, y sumamos.",
          "Ejemplo: Calcule 3/64 + 7/48. Como 64 = 2⁶ y 48 = 2⁴ · 3, el MCD de 64 y 48 es 2⁶ · 3 = 192. Entonces: 3/64 + 7/48 = (3·3)/(64·3) + (7·4)/(48·4) = 9/192 + 28/192 = 37/192.",
        ],
      },
      {
        heading: "2. Producto de fracciones",
        level: 2,
        content: [
          "(a/b) · (c/d) = ac/(bd), con b ≠ 0 y d ≠ 0. Ejemplo: (2/5) · (4/3) = 8/15.",
        ],
      },
      {
        heading: "Ejercicios",
        level: 2,
        content: [
          "(i) ¿Cómo se calcula el cociente de dos fracciones?",
          "Solución: (a/b) ÷ (c/d) = (a/b) · (d/c) = ad/(bc), con b ≠ 0, c ≠ 0, y d ≠ 0. Ejemplo: (2/5) ÷ (3/7) = (2/5) · (7/3) = 14/15.",
          "(ii) Pruebe que a/b = c/d ⟹ ad = bc, con b ≠ 0, y d ≠ 0.",
          "Solución: Si a/b = c/d, entonces a/b − c/d = 0, luego (ad − bc)/(bd) = 0, y así ad − bc = 0, entonces ad = bc.",
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
        heading: "ORDEN EN LOS NÚMEROS REALES",
        level: 1,
        content: [
          "Todo número real se puede representar gráficamente como un punto sobre una línea recta, la cual llamaremos recta real y, recíprocamente, todo punto sobre la recta real representa un número real. Es decir, existe una correspondencia biunívoca entre los elementos de ℝ y los puntos de la recta real. El punto 0 sobre la recta real es el origen.",
          "Los números positivos son los que están ubicados a la \"derecha\" de 0 en la recta real; los que están ubicados a la \"izquierda\" de 0 son los negativos.",
        ],
      },
      {
        heading: "Definición",
        level: 2,
        content: [
          "Sean a, b ∈ ℝ.",
          "• Decimos que a es mayor que b y escribimos a > b, si a − b es un número positivo.",
          "• Decimos que a es menor que b, y escribimos a < b, si a − b es un número negativo.",
          "• La expresión a ≤ b es equivalente a tener a < b ó a = b, y se lee \"a es menor que o igual a b\".",
          "• Similarmente, a ≥ b ⟺ a > b ó a = b, y se lee \"a es mayor que o igual a b\".",
          "• Intuitivamente decimos que los números reales están \"ordenados\", ya que si a y b son números reales, siempre podemos determinar si a > b ó a < b ó a = b.",
        ],
      },
      {
        heading: "Observaciones",
        level: 2,
        content: [
          "• Claramente si a > b, entonces b < a.",
          "• Se acostumbra escribir a < b < c como forma corta de la expresión a < b y b < c.",
          "• Decir que un número real a es positivo es equivalente a escribir a > 0. Decir que un número real b es negativo es equivalente a escribir b < 0.",
          "• Geométricamente, si a y b son números reales, a > b si a está a la \"derecha\" de b en la recta real.",
        ],
      },
      {
        heading: "Ejemplo",
        level: 3,
        content: [
          "3 < 5 pues 5 − 3 = 2 > 0. 4 ≤ 4 ya que 4 = 4.",
        ],
      },
      {
        heading: "Algunas propiedades de orden",
        level: 2,
        content: [
          "1. Si a ∈ ℝ, entonces a² = a · a ⩾ 0 y a² = 0 sólo si a = 0. Con base en esto podemos afirmar que 1 > 0, ya que como 1 ≠ 0, entonces 1 = 1² > 0.",
          "2. Sean a, b, c ∈ ℝ.",
          "  • Si a ≤ b y b ≤ c, entonces a ≤ c.",
          "  • a = b ó a < b ó b < a.",
          "  • a ≤ b si y sólo si a + c ≤ b + c.",
          "  • Si a ≤ b y c > 0, entonces ac ≤ bc.",
          "  • Si a ≤ b y c < 0, entonces ac ≥ bc.",
          "  • Si a > 0, b > 0 y a ≥ b, entonces 1/a ≤ 1/b.",
          "Ejemplos: 3 < 8 y 3(−3) > 8(−3) ya que −3 < 0. De acuerdo a la última propiedad, 0 < 2 < 3 implica que 1/3 < 1/2.",
          "Observaciones: a > 0 ⟹ −a < 0 (si a es positivo entonces −a es negativo). a < 0 ⟹ −a > 0 (si a es negativo, entonces −a es positivo).",
        ],
      },
      {
        heading: "INTERVALOS",
        level: 1,
        content: [
          "Un intervalo es un subconjunto de ℝ de ciertas características. Sean a y b ∈ ℝ, con a < b.",
          "El intervalo abierto entre a y b, denotado por (a, b), es el conjunto de los números reales mayores que a y menores que b. Así, c ∈ (a, b) si a < c y c < b. Claramente a ∉ (a, b) y b ∉ (a, b).",
          "Se denomina intervalo cerrado desde a hasta b, y se denota por [a, b], al conjunto de los números reales mayores o iguales que a y menores o iguales que b.",
          "Usando la notación de conjuntos: (a, b) = {x ∈ ℝ / a < x < b}. [a, b] = {x ∈ ℝ / a ≤ x ≤ b}.",
          "Los intervalos pueden incluir un solo punto extremo o se pueden prolongar hasta el infinito en una dirección o en ambas direcciones.",
        ],
      },
      {
        heading: "Ejemplo",
        level: 3,
        content: [
          "Expresar en términos de desigualdades los siguientes intervalos y representarlos gráficamente:",
          "a) [−3, 8] = {x ∈ ℝ / −3 ≤ x ≤ 8}",
          "b) (5, 12] = {x ∈ ℝ / 5 < x ≤ 12}",
          "c) (−∞, 2) = {x ∈ ℝ / x < 2}",
        ],
      },
      {
        heading: "Operaciones entre intervalos",
        level: 2,
        content: [
          "Como los intervalos son conjuntos, podemos realizar entre ellos las operaciones ya definidas para conjuntos.",
          "Ejemplo: [5, 9] ∪ (3, 6) = (3, 9], ya que {x ∈ ℝ / 5 ≤ x ≤ 9} ∪ {x ∈ ℝ / 3 < x < 6} = {x ∈ ℝ / 3 < x ≤ 9}.",
          "[5, 9] ∩ (3, 6) = [5, 6), ya que {x ∈ ℝ / 5 ≤ x ≤ 9} ∩ {x ∈ ℝ / 3 < x < 6} = {x ∈ ℝ / 5 ≤ x < 6}.",
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
        heading: "VALOR ABSOLUTO Y DISTANCIA",
        level: 1,
        content: [
          "Si a y b son dos números reales, la distancia entre a y b, denotada por d(a, b), es la medida del segmento que los une en la recta real.",
          "• d(a, b) ≥ 0, d(a, b) = 0 cuando a = b.",
          "• d(a, b) = d(b, a).",
          "El valor absoluto de un número a, denotado por |a|, es la distancia desde a hasta 0, es decir |a| = d(a, 0).",
        ],
      },
      {
        heading: "Ejemplo",
        level: 2,
        content: [
          "a) |8| = 8",
          "b) |−7| = −(−7) = 7",
          "c) |0| = 0",
        ],
      },
      {
        heading: "Definición formal",
        level: 2,
        content: [
          "Para cualquier número real a, |a| ⩾ 0, ya que la distancia es siempre positiva o cero, entonces:",
          "|a| = a    si a ⩾ 0",
          "|a| = −a   si a < 0",
          "Ejemplo: |3 − e| = 3 − e (ya que e < 3 ⟹ 3 − e > 0).",
          "|2 − π| = −(2 − π) = π − 2 (ya que 2 < π ⟹ 2 − π < 0).",
        ],
      },
      {
        heading: "Propiedades del valor absoluto",
        level: 2,
        content: [
          "Si a y b son números reales:",
          "1. |a| ≥ 0",
          "2. |a| = |−a|",
          "3. −|a| ≤ a ≤ |a|",
          "4. |ab| = |a| |b|",
          "5. |a/b| = |a|/|b|, con b ≠ 0",
          "6. |a + b| ≤ |a| + |b|. La igualdad se cumple cuando a y b tienen el mismo signo (Desigualdad triangular).",
        ],
      },
      {
        heading: "Distancia usando valor absoluto",
        level: 2,
        content: [
          "Podemos calcular la distancia entre a y b utilizando el valor absoluto:",
          "En la gráfica observamos que la distancia entre −2 y 3 es 5. Como |3 − (−2)| = 5, y |−2 − 3| = 5, tenemos que d(−2, 3) = |−2 − 3| = |3 − (−2)| = d(3, −2).",
          "En general, si a y b son números reales:",
          "a) |a − b| = |b − a|, ya que |a − b| = |−(b − a)| = |b − a|, por propiedad 2.",
          "b) d(a, b) = |a − b|.",
          "En efecto: Si a ≥ b, la distancia entre a y b es a − b y como a − b ≥ 0 entonces |a − b| = a − b = d(a, b). Si a ≤ b, la distancia entre a y b es b − a, y como b − a ≥ 0, entonces a − b ≤ 0 y |a − b| = −(a − b) = b − a = d(a, b).",
          "Con base en lo anterior tenemos que d(0, a) = |a|, ya que d(0, a) = |0 − a| = |−a| = |a|.",
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
        heading: "POTENCIACIÓN Y RADICACIÓN",
        level: 1,
        content: [
          "(Tomado de: Stewart, James. \"Precálculo\". Quinta Edición. Sección 1.2.)",
          "Si a, x ∈ ℝ, una expresión de la forma aˣ se llama expresión exponencial, el número a se llama base, y el número x se conoce como exponente.",
        ],
      },
      {
        heading: "Exponentes enteros",
        level: 2,
        content: [
          "a) Exponentes enteros positivos ó naturales: Si a ∈ ℝ, el producto a·a···a, se denota por aⁿ, donde n ∈ ℕ indica el número de veces que se repite el factor a. aⁿ = a · a · · · a (n factores).",
          "Ejemplos: (1/2)⁴ = 1/16 ;  (−5)⁶ = 15625 ;  −5⁶ = −15625 ;  0⁵ = 0.",
          "b) Exponente 0: Si a ≠ 0 es un número real, definimos a⁰ = 1. Nota: La expresión 0⁰ no tiene sentido.",
          "Ejemplos: (3/2)⁰ = 1 ;  (−5)⁰ = 1.",
          "c) Exponentes enteros negativos: Si a ∈ ℝ, a ≠ 0 y n es un entero positivo, definimos a⁻ⁿ = 1/aⁿ.",
          "Ejemplos: 3⁻² = 1/9 ;  (−5)⁻¹ = −1/5 ;  x⁻¹ = 1/x.",
        ],
      },
      {
        heading: "Propiedades de los exponentes enteros (Leyes de los exponentes)",
        level: 2,
        content: [
          "Si a, b ∈ ℝ y m, n ∈ ℤ, entonces:",
          "1. aᵐaⁿ = aᵐ⁺ⁿ. Ejemplo: 5³ · 5⁶ = 5⁹.",
          "2. aᵐ/aⁿ = aᵐ⁻ⁿ, a ≠ 0. Ejemplo: 4⁷/4² = 4⁵.",
          "3. (aᵐ)ⁿ = aᵐⁿ. Ejemplo: (7⁶)³ = 7¹⁸.",
          "4. (ab)ⁿ = aⁿbⁿ. Ejemplo: (5·8)⁴ = 5⁴8⁴.",
          "5. (a/b)ⁿ = aⁿ/bⁿ, con b ≠ 0. Ejemplo: (9/4)² = 9²/4².",
          "6. (a/b)⁻ⁿ = (b/a)ⁿ, con a y b no nulos. Ejemplo: (5/3)⁻² = (3/5)².",
          "7. a⁻ⁿ/b⁻ᵐ = bᵐ/aⁿ, con a y b no nulos. Ejemplo: 4⁻³/7⁻⁵ = 7⁵/4³.",
        ],
      },
      {
        heading: "Ejercicios resueltos",
        level: 2,
        content: [
          "1. Escriba con exponentes enteros positivos:",
          "  (a) x³x⁶ = x⁹    (b) z⁻³z⁵ = z²    (c) 5⁴/5⁸ = 5⁻⁴ = 1/5⁴",
          "  (d) (t³)² = t⁶    (e) (5y)³ = 125y³  (f) (2/x)⁴ = 16/x⁴",
          "2. Simplifique:",
          "  (a) (4a⁴b³)²(5a²b⁵) = 16a⁸b⁶ · 5a²b⁵ = 80a¹⁰b¹¹",
          "  (b) (3xy²/(2x⁻¹z²))² · (x²z²/(3y²)) = 3x⁶y²/(4z²)",
          "3. Simplifique (xy⁻²z⁻³/(x²y³z⁻⁴))⁻³ = x³y¹⁵/z³.",
        ],
      },
      {
        heading: "Notación científica",
        level: 2,
        content: [
          "Un número x está escrito en notación científica si está expresado en la forma x = a × 10ⁿ, donde 1 ≤ |a| < 10.",
          "Ejemplos: 325.32 = 3.2532 × 10² ;  0.000354 = 3.54 × 10⁻⁴ ;  −2/25 = −8 × 10⁻².",
        ],
      },
      {
        heading: "Exponentes racionales",
        level: 2,
        content: [
          "I. Expresiones exponenciales de la forma a^(1/n), n ∈ ℕ:",
          "Cuando el número racional es de la forma 1/n, con n ∈ ℕ, la expresión a^(1/n) se escribe ⁿ√a y se llama raíz n-ésima principal de a. En particular, si n = 2, la expresión ²√a se escribe √a y se llama la raíz cuadrada principal de a.",
          "Definición: ²√a = b significa que b² = a y b ≥ 0. Como a = b² entonces a ≥ 0, es decir, la expresión √a tiene sentido sólo cuando a ≥ 0.",
          "Definición: Para n ∈ ℕ, ⁿ√a = b significa que bⁿ = a.",
          "Si n es par: bⁿ ≥ 0 implica que a ≥ 0 y b ≥ 0. Si n es impar: bⁿ ≥ 0 si b ≥ 0 y bⁿ ≤ 0 si b ≤ 0.",
          "En resumen: ⁿ√a está definida para todo a ∈ ℝ, si n es impar; y sólo está definida para a ≥ 0 si n es par.",
          "Ejemplos: ⁴√625 = 5 (ya que 5⁴ = 625); ³√(−27) = −3 (ya que (−3)³ = −27); ⁴√(−81) no está definida (4 es par, −81 < 0).",
          "Importante: Si a ∈ ℝ, √(a²) = |a|. Ejemplo: √(3²) = 3, pero √((−3)²) ≠ −3, de hecho √((−3)²) = 3 = |−3|.",
        ],
      },
      {
        heading: "Propiedades de los radicales",
        level: 2,
        content: [
          "Sean a, b y c números reales y n ∈ ℕ, con a y b positivos si n es par.",
          "1. ⁿ√(ab) = ⁿ√a · ⁿ√b. Ejemplo: ³√(−27 · 64) = ³√(−27) · ³√64 = (−3)(4) = −12.",
          "2. ⁿ√(a/b) = ⁿ√a / ⁿ√b, b ≠ 0. Ejemplo: √(4/9) = √4/√9 = 2/3.",
          "3. ᵐ√(ⁿ√a) = ᵐⁿ√a. Ejemplo: ³√(√729) = ⁶√729 = 3.",
          "4. ⁿ√(cⁿ) = |c| si n es par. Ejemplo: ⁴√(3⁴) = 3 y ⁴√((−5)⁴) = |−5| = 5.",
          "5. ⁿ√(cⁿ) = c si n es impar. Ejemplo: ⁷√((−2)⁷) = −2.",
          "6. c·ⁿ√b + d·ⁿ√b = (c + d)·ⁿ√b. Ejemplo: 3·⁴√5 + 6·⁴√5 = 9·⁴√5.",
        ],
      },
      {
        heading: "Ejercicio resuelto: Simplificar",
        level: 3,
        content: [
          "a) √(a²b⁶) = √(a²) · √(b⁶) = |a| · |b³|",
          "b) ³√(x³y⁹) = ³√(x³) · ³√((y³)³) = xy³",
          "c) ⁴√48 − ⁴√3 = ⁴√(16·3) − ⁴√3 = ⁴√16 · ⁴√3 − ⁴√3 = 2·⁴√3 − ⁴√3 = ⁴√3.",
        ],
      },
      {
        heading: "II. Expresiones exponenciales de la forma a^(m/n)",
        level: 2,
        content: [
          "Recordemos que ⁿ√a = a^(1/n). Aplicando leyes de exponentes: (ⁿ√a)ⁿ = (a^(1/n))ⁿ = a^(n/n) = a.",
          "En general, si m/n ∈ ℚ, y n > 0:",
          "a^(m/n) = (a^(1/n))ᵐ = (ⁿ√a)ᵐ ó, equivalentemente, a^(m/n) = (aᵐ)^(1/n) = ⁿ√(aᵐ).",
          "Si n es par, entonces es necesario que a ≥ 0.",
          "Ejemplo: (4/9)^(−1/2) = (9/4)^(1/2) = √9/√4 = 3/2.",
          "Ejemplo: (−27/8)^(2/3) = (−27)^(2/3)/(8)^(2/3) = (³√(−27))²/(³√8)² = (−3)²/2² = 9/4.",
          "Ejercicio resuelto: (2x⁴y^(−4/5))³ · (8y²)^(2/3) = 32x¹²/y^(16/15).",
          "(y¹⁰z⁻⁵)^(1/5) / (y⁻²z³)^(1/3) = y^(8/3)/z².",
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
        heading: "EXPRESIONES ALGEBRAICAS",
        level: 1,
        content: [
          "(Tomado de: Stewart, James. \"Precálculo\". Quinta Edición. Sección 1.3.)",
          "Una expresión algebraica es una combinación de constantes (números) y variables (elementos genéricos de un conjunto numérico, representados por letras), mediante suma, resta, multiplicación, división y potenciación con exponentes enteros o racionales.",
          "Generalmente las variables se representan con las últimas letras del alfabeto: u, v, w, x, y, z. Por ejemplo, 3x² + 4x − 5, (x + z)/(y² + x), (√y − 4z)/(z + y) son expresiones algebraicas.",
        ],
      },
      {
        heading: "POLINOMIOS",
        level: 1,
        content: [
          "Un polinomio en la variable x es una expresión algebraica de la forma: aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ··· + a₁x + a₀, donde a₀, a₁, ···, aₙ son números reales, llamados coeficientes del polinomio y n es un entero no negativo. Si aₙ ≠ 0, se dice que el polinomio es de grado n.",
          "Ejemplo: 7x⁵ − 3x⁴ + 2x² + x + 1 es un polinomio en la variable x de grado 5. El término en x³ no se escribe porque su coeficiente es 0.",
        ],
      },
      {
        heading: "Suma de polinomios",
        level: 2,
        content: [
          "Para sumar (o restar) polinomios, utilizamos las propiedades de la suma y el producto de números reales.",
          "Ejemplo: Sumar 3x² + 7x − 9 con −5x³ − (1/5)x² + x − 5.",
          "= −5x³ + (3 − 1/5)x² + (7+1)x + (−9−5) = −5x³ + (14/5)x² + 8x − 14.",
          "Ejemplo: a) (3x² + x + 1) + (2x² − 3x − 5) = 5x² − 2x − 4.",
          "b) (3x² + x + 1) − (2x² − 3x − 5) = x² + 4x + 6.",
        ],
      },
      {
        heading: "Producto o multiplicación de polinomios",
        level: 2,
        content: [
          "Para multiplicar polinomios usamos las propiedades de la suma y el producto de números reales, y las leyes de los exponentes.",
          "Ejemplo 1: (3x − 4)(x² + x) = 3x(x² + x) + (−4)(x² + x) = 3x³ + 3x² − 4x² − 4x = 3x³ − x² − 4x.",
          "Ejemplo 2: (√t + 2)(5 − 2√t) = 5√t − 2t + 10 − 4√t = √t − 2t + 10.",
        ],
      },
      {
        heading: "Productos notables",
        level: 2,
        content: [
          "Sean a y b números reales o expresiones algebraicas. Entonces:",
          "1. (a + b)(a − b) = a² − b²",
          "2. (a + b)² = a² + 2ab + b²",
          "3. (a − b)² = a² − 2ab + b²",
          "4. (a + b)³ = a³ + 3a²b + 3ab² + b³",
          "5. (a − b)³ = a³ − 3a²b + 3ab² − b³",
          "Verificación de (a − b)²: (a − b)(a − b) = a² − ab − ba + b² = a² − 2ab + b².",
          "Verificación de (a − b)³: (a − b)(a − b)² = (a − b)(a² − 2ab + b²) = a³ − 3a²b + 3ab² − b³.",
        ],
      },
      {
        heading: "Ejemplo: Aplicación de productos notables",
        level: 3,
        content: [
          "a) (c + 1/c)² = c² + 2(c)(1/c) + (1/c)² = c² + 2 + 1/c² (aplicando identidad 2)",
          "b) (√a − 1/b)(√a + 1/b) = (√a)² − (1/b)² = a − 1/b² (aplicando identidad 1)",
          "c) (1 − 2y)³ = 1³ − 3(1)²(2y) + 3(1)(2y)² − (2y)³ = 1 − 6y + 12y² − 8y³ (aplicando identidad 5)",
        ],
      },
      {
        heading: "División de Polinomios",
        level: 2,
        content: [
          "Si P(x) y D(x) son polinomios tales que el grado de P(x) es mayor o igual que el grado de D(x) y si D(x) ≠ 0, entonces existen polinomios Q(x) y R(x) tales que: P(x)/D(x) = Q(x) + R(x)/D(x), con grado de R(x) menor que grado de D(x).",
          "P(x) y D(x) se llaman dividendo y divisor, respectivamente; Q(x) es el cociente y R(x) es el residuo.",
          "Equivalentemente: P(x) = D(x) · Q(x) + R(x).",
          "Ejemplo: Dividir 5x³ − 2x + 1 entre x + 1.",
          "Se ordenan ambos polinomios en forma descendente. Si falta alguna potencia se agrega con coeficiente 0: 5x³ + 0x² − 2x + 1.",
          "Resultado: 5x³ − 2x + 1 = (x + 1)(5x² − 5x + 3) − 2. Q(x) = 5x² − 5x + 3, R(x) = −2.",
          "Ejemplo: x⁶ + x⁴ + 2x² + 2 = (x² + 1)(x⁴ + 2). Residuo = 0.",
        ],
      },
      {
        heading: "División Sintética",
        level: 2,
        content: [
          "La división sintética es un método rápido para dividir polinomios cuando el divisor es de la forma x − c, con c un número real.",
          "Ejemplo: Dividir x⁴ − 3x² + 2x − 5 entre x + 2 (c = −2).",
          "Sólo se escriben los coeficientes del dividendo y el valor de c. Se procede multiplicando y sumando iterativamente.",
          "Resultado: x⁴ − 3x² + 2x − 5 = (x + 2)(x³ − 2x² + x) − 5. Q(x) = x³ − 2x² + x, R(x) = −5.",
          "Observación: Si el divisor es x − c, el residuo P(c) = d. Si evaluamos P(x) en c, tenemos P(c) = (c − c)Q(c) + d = d.",
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
        heading: "Teorema del Residuo",
        level: 1,
        content: [
          "Si un polinomio P(x) se divide entre x − c, entonces, el residuo de la división es P(c).",
          "Demostración: Como x − c es un polinomio de grado 1, el residuo es una constante d. Así P(x) = (x − c)Q(x) + d. Si evaluamos en c: P(c) = (c − c)Q(c) + d = d.",
          "Ejemplo: Sin realizar la división, halle el residuo al dividir −3x² + 2x − 1 entre x − 4. Sea P(x) = −3x² + 2x − 1. El residuo es P(4) = −3(4)² + 2(4) − 1 = −48 + 8 − 1 = −41.",
        ],
      },
      {
        heading: "Teorema del Factor",
        level: 1,
        content: [
          "Si c ∈ ℝ y P(x) es un polinomio, x − c es un factor de P(x) si y sólo si P(c) = 0.",
          "Ejemplo: Pruebe que x + 3 es un factor del polinomio x³ + x² − 2x + 12. Sea P(x) = x³ + x² − 2x + 12. P(−3) = (−3)³ + (−3)² − 2(−3) + 12 = −27 + 9 + 6 + 12 = 0. Por el teorema del factor, x + 3 es factor de P(x).",
        ],
      },
      {
        heading: "Ceros reales de Polinomios",
        level: 1,
        content: [
          "Los ceros reales de un polinomio P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ··· + a₁x + a₀ ó las raíces de la ecuación polinómica P(x) = 0 son los valores c ∈ ℝ tales que P(c) = 0.",
          "Ejemplo: Los ceros de P(x) = x² − 5x + 6 son 2 y 3, pues P(2) = 0 y P(3) = 0. Luego, P(x) = (x − 2)(x − 3).",
          "Observaciones: Si P(x) es un polinomio en x y c es un número real, los siguientes enunciados son equivalentes:",
          "• c es un cero de P(x).",
          "• x = c es una raíz o solución de P(x) = 0.",
          "• x − c es un factor de P(x).",
          "• El punto (c, 0) es un punto de intersección de la gráfica de y = P(x) con el eje x.",
          "Si P(x) = (x − c)ᵐQ(x), donde c no es cero de Q(x) y m ≥ 1, decimos que c es un cero de P(x) de multiplicidad m.",
          "Ejemplo: Si P(x) = (x − 4)(x + 2)²(x + 1)⁴, decimos que 4 es un cero de multiplicidad 1, −2 es un cero de multiplicidad 2 y −1 es un cero de multiplicidad 4.",
        ],
      },
      {
        heading: "Ejemplo: Factorizar P(x) = 3x³ − 2x − 20",
        level: 2,
        content: [
          "P(2) = 3(2)³ − 2(2) − 20 = 24 − 4 − 20 = 0, luego 2 es un cero de P(x).",
          "Por el teorema del factor, x − 2 es un factor. Dividimos por división sintética:",
          "3x³ − 2x − 20 = (x − 2)(3x² + 6x + 10).",
        ],
      },
      {
        heading: "Teorema de Ceros Racionales",
        level: 1,
        content: [
          "Si el polinomio P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ··· + a₁x + a₀ tiene coeficientes enteros, entonces, todo cero racional de P tiene la forma p/q, donde: p es un factor (divisor) del coeficiente a₀, y q es un factor del coeficiente aₙ.",
          "Nota: Un polinomio con coeficientes enteros no necesariamente tiene todas sus raíces racionales.",
        ],
      },
      {
        heading: "Ejemplo completo: Factorizar P(x) = x⁴ − 5x³ − 5x² + 23x + 10",
        level: 2,
        content: [
          "Factores de 10: ±1, ±2, ±5, ±10. Factores de 1: ±1. Posibles ceros: ±1, ±2, ±5, ±10.",
          "P(1) = 24, P(−1) = −12, P(2) = 12, P(−2) = 0 ✓. Luego −2 es cero de P.",
          "Por división sintética: P(x) = (x + 2)(x³ − 7x² + 9x + 5).",
          "Para x³ − 7x² + 9x + 5: posibles ceros ±1, ±5. Como ±1 no son ceros de P, probamos ±5.",
          "(5)³ − 7(5)² + 9(5) + 5 = 125 − 175 + 45 + 5 = 0 ✓. Luego 5 es cero.",
          "x³ − 7x² + 9x + 5 = (x − 5)(x² − 2x − 1).",
          "Para x² − 2x − 1 = 0: x = (2 ± √8)/2 = 1 ± √2.",
          "P(x) = (x + 2)(x − 5)[x − (1 + √2)][x − (1 − √2)].",
        ],
      },
      {
        heading: "Ejemplo: P(x) = 3x⁵ − 10x⁴ − 6x³ + 24x² + 11x − 6",
        level: 2,
        content: [
          "a₀ = −6, a₅ = 3. Factores de −6: ±1,±2,±3,±6. Factores de 3: ±1,±3.",
          "Posibles ceros: ±1, ±1/3, ±2, ±2/3, ±3, ±6.",
          "P(1) = 16 ✗, P(−1) = 0 ✓. Por división sintética: P(x) = (3x⁴ − 13x³ + 7x² + 17x − 6)(x + 1).",
          "El nuevo polinomio evaluado en −1 da 0 ✓. Entonces: (3x³ − 16x² + 23x − 6)(x + 1)².",
          "Evaluado en 1/3 da 0 ✓. Entonces: (3x² − 15x + 18)(x − 1/3)(x + 1)².",
          "3x² − 15x + 18 = 3(x − 3)(x − 2).",
          "P(x) = 3(x − 3)(x − 2)(x − 1/3)(x + 1)². Ceros: 3, 2 y 1/3 (multiplicidad 1), −1 (multiplicidad 2).",
        ],
      },
    ],
  };

  // ─── MODULE 8 ───────────────────────────────────────────────
  modules[8] = {
    num: 8,
    title: "Productos Notables y Factorización",
    pdfPages: "Págs. 25 – 32",
    tag: "Álgebra",
    sections: [
      {
        heading: "Productos notables",
        level: 1,
        content: [
          "Sean a y b números reales o expresiones algebraicas. Tenemos las siguientes identidades:",
          "1. (a + b)(a − b) = a² − b²",
          "2. (a + b)² = a² + 2ab + b²",
          "3. (a − b)² = a² − 2ab + b²",
          "4. (a + b)³ = a³ + 3a²b + 3ab² + b³",
          "5. (a − b)³ = a³ − 3a²b + 3ab² − b³",
          "6. (a + b)(a² − ab + b²) = a³ + b³",
          "7. (a − b)(a² + ab + b²) = a³ − b³",
          "Verificación de 1: (a+b)(a−b) = a² − ab + ab − b² = a² − b².",
          "Verificación de 3: (a−b)² = (a−b)(a−b) = a² − 2ab + b².",
          "Verificación de 5: (a−b)³ = (a−b)(a−b)² = (a−b)(a²−2ab+b²) = a³ − 3a²b + 3ab² − b³.",
          "Interpretación geométrica: (a+b)² = área de un cuadrado de lado a+b = a² + 2ab + b². (a+b)³ = volumen de un cubo de lado a+b.",
        ],
      },
      {
        heading: "Ejemplo 1: Aplicación de productos notables",
        level: 2,
        content: [
          "a) (b + 1/b)² = b² + 2 + 1/b², con b ≠ 0 (aplicando identidad 2).",
          "b) (√a − 1/c)(√a + 1/c) = a − 1/c², a ≥ 0 y c ≠ 0 (aplicando identidad 1).",
          "c) (1 − 2w)³ = 1 − 6w + 12w² − 8w³ (aplicando identidad 5).",
        ],
      },
      {
        heading: "Factorización",
        level: 1,
        content: [
          "Factorizar una expresión algebraica con respecto a F (ℤ, ℚ ó ℝ), es expresarla como un producto de expresiones más simples. Diremos que la expresión está completamente factorizada, si no es posible factorizar ninguna de las expresiones que componen la factorización.",
          "Fórmulas de factorización derivadas de los productos notables:",
          "a² − b² = (a + b)(a − b)   (Diferencia de cuadrados)",
          "a³ + b³ = (a + b)(a² − ab + b²)   (Suma de cubos)",
          "a³ − b³ = (a − b)(a² + ab + b²)   (Diferencia de cubos)",
          "a² ± 2ab + b² = (a ± b)²   (Trinomio cuadrado perfecto)",
          "a³ + 3a²b + 3ab² + b³ = (a + b)³",
          "a³ − 3a²b + 3ab² − b³ = (a − b)³",
        ],
      },
      {
        heading: "Ejemplos de factorización directa",
        level: 2,
        content: [
          "1. 16w² − 9z⁴ = (4w)² − (3z²)² = (4w + 3z²)(4w − 3z²).",
          "2. 27b³ + y³ = (3b + y)(9b² − 3by + y²).",
          "3. 64 − 125p⁶ = (4 − 5p²)(16 + 20p² + 25p⁴).",
          "4. x⁴ + 10x² + 25 = (x² + 5)².",
          "5. 81c⁴ − d⁴ = (9c² − d²)(9c² + d²) = (3c − d)(3c + d)(9c² + d²).",
        ],
      },
      {
        heading: "Caso 1. Factor común",
        level: 2,
        content: [
          "a) −2t³ + 16t = −2t(t² − 8) = −2t(t + 2√2)(t − 2√2).",
          "b) −7a⁴k² + 14ak³ + 21ak⁴ = −7ak²(a³ − 2k − 3k²).",
          "c) (w + 2)² − 5(w + 2) = (w + 2)[(w + 2) − 5] = (w + 2)(w − 3).",
          "d) m⁴(m+2)³ + m⁵(m+2)⁴ = m⁴(m+2)³(1 + m(m+2)) = m⁴(m+2)³(m+1)².",
        ],
      },
      {
        heading: "Caso 2. Trinomio de la forma x² + bx + c",
        level: 2,
        content: [
          "Dado que (x+h)(x+k) = x² + (h+k)x + hk, debemos hallar h y k tales que b = h+k y c = hk.",
          "Ejemplo: x² − 6x + 5 = (x − 5)(x − 1), ya que −5 + (−1) = −6 y (−5)(−1) = 5.",
          "Ejemplo: (3x+2)² + 4(3x+2) − 12 = (3x+8)(3x).",
          "Ejemplo: b³ − b² − 56b = b(b² − b − 56) = b(b − 8)(b + 7).",
        ],
      },
      {
        heading: "Caso 3. Trinomio de la forma ax² + bx + c",
        level: 2,
        content: [
          "ax² + bx + c = (1/a)((ax)² + b(ax) + ac). La expresión entre paréntesis es de la forma z² + Bz + C, donde z = ax.",
          "Ejemplo: −6t² − 11t + 21 = (−1/6)((6t)² + 11(6t) − 126) = (−1/6)(6t + 18)(6t − 7) = (t + 3)(7 − 6t).",
          "Ejemplo: 2c² + c − 1 = (1/2)((2c)² + (2c) − 2) = (1/2)(2c + 2)(2c − 1) = (c + 1)(2c − 1).",
        ],
      },
      {
        heading: "Caso 4. Exponentes racionales",
        level: 2,
        content: [
          "Ejemplo: x^(−5/2) + 2x^(−3/2) + x^(−1/2) = x^(−5/2)(1 + 2x + x²) = x^(−5/2)(x + 1)².",
        ],
      },
      {
        heading: "Caso 5. Factorización por agrupación",
        level: 2,
        content: [
          "Ejemplo: 3x³ − x² − 6x + 2 = (3x³ − x²) − (6x − 2) = x²(3x − 1) − 2(3x − 1) = (3x − 1)(x² − 2) = (3x − 1)(x − √2)(x + √2).",
          "Ejemplo: a³ + 27b³ + a + 3b = (a + 3b)(a² − 3ab + 9b²) + (a + 3b) = (a + 3b)(a² − 3ab + 9b² + 1).",
          "Ejemplo: (1/2)x^(−1/2)(x+5)^(1/2) − (1/2)x^(1/2)(x+5)^(−1/2) = 5/(2x^(1/2)(x+5)^(1/2)).",
        ],
      },
      {
        heading: "Caso 6. Diferencia de potencias n-ésimas",
        level: 2,
        content: [
          "aⁿ − bⁿ = (a − b)(aⁿ⁻¹ + aⁿ⁻²b + aⁿ⁻³b² + ··· + abⁿ⁻² + bⁿ⁻¹).",
          "Ejemplo: x⁵ − 1 = (x − 1)(x⁴ + x³ + x² + x + 1).",
          "Ejemplo (suma de potencias impares): u⁵ + 1 = u⁵ − (−1)⁵ = (u + 1)(u⁴ − u³ + u² − u + 1).",
        ],
      },
    ],
  };

  // ─── MODULE 9 ───────────────────────────────────────────────
  modules[9] = {
    num: 9,
    title: "Factorial y Teorema del Binomio",
    pdfPages: "Págs. 32 – 37",
    tag: "Álgebra",
    sections: [
      {
        heading: "DEFINICIÓN DEL n-FACTORIAL, COEFICIENTE BINOMIAL Y TEOREMA DEL BINOMIO",
        level: 1,
        content: [],
      },
      {
        heading: "Factorial y Combinaciones",
        level: 2,
        content: [
          "Definición de n factorial: 1! = 1, 2! = 2·1 = 2, y en general, n! = n·(n−1)···3·2·1.",
          "El número n! es útil para expresar algunas fórmulas. Por conveniencia, se define 0! = 1.",
          "Teorema: El número total de formas diferentes de ordenar n objetos distintos (permutaciones) es n!.",
          "En efecto, hay n posibilidades para el \"primer objeto\", n−1 para el \"segundo\", etc. Total: n·(n−1)·(n−2)···2·1.",
        ],
      },
      {
        heading: "Combinaciones",
        level: 2,
        content: [
          "Si queremos formar todos los posibles subconjuntos de tamaño r de un conjunto de n elementos, r ≤ n, sin importar el orden, estamos haciendo combinaciones.",
          "El número de combinaciones de n objetos tomados en grupos de r se denota C(n,r) = n!/(r!(n−r)!).",
          "La expresión C(n,r) se lee \"n tomados en grupos de r\" y se denomina coeficiente binomial.",
          "¿Cuándo aplicar combinaciones? (1) no se permiten las repeticiones, y (2) el orden es irrelevante.",
        ],
      },
      {
        heading: "Ejemplos de combinaciones",
        level: 2,
        content: [
          "Ejemplo 1: De un club {A,B,C,D,E} se quieren formar comités de 3 miembros. Hay C(5,3) = 10 posibles comités.",
          "Ejemplo 2: Juan Esteban quiere comprar 10 videojuegos pero sólo tiene dinero para 4. C(10,4) = 10!/(4!·6!) = 210 maneras.",
          "Ejemplo 3: De 24 estudiantes, seleccionar 12 para un evento: C(24,12) = 2,704,156 maneras.",
        ],
      },
      {
        heading: "El Teorema del Binomio",
        level: 1,
        content: [
          "Desarrollos conocidos:",
          "(x+y)¹ = x + y",
          "(x+y)² = x² + 2xy + y²",
          "(x+y)³ = x³ + 3x²y + 3xy² + y³",
          "(x+y)⁴ = x⁴ + 4x³y + 6x²y² + 4xy³ + y⁴",
          "(x+y)⁵ = x⁵ + 5x⁴y + 10x³y² + 10x²y³ + 5xy⁴ + y⁵",
          "Teorema: Si n ∈ ℤ⁺, entonces (x+y)ⁿ = Σ C(n,k) · xⁿ⁻ᵏ · yᵏ, para k = 0, 1, …, n.",
          "Equivalentemente: (x+y)ⁿ = xⁿ + nxⁿ⁻¹y + n(n−1)/2! · xⁿ⁻²y² + n(n−1)(n−2)/3! · xⁿ⁻³y³ + ··· + nxyⁿ⁻¹ + yⁿ.",
        ],
      },
      {
        heading: "Ejemplo 4: Desarrollar (2a + b)⁶",
        level: 2,
        content: [
          "(2a+b)⁶ = C(6,0)(2a)⁶ + C(6,1)(2a)⁵b + C(6,2)(2a)⁴b² + C(6,3)(2a)³b³ + C(6,4)(2a)²b⁴ + C(6,5)(2a)b⁵ + C(6,6)b⁶",
          "= 64a⁶ + 192a⁵b + 240a⁴b² + 160a³b³ + 60a²b⁴ + 12ab⁵ + b⁶.",
        ],
      },
      {
        heading: "Ejemplo 5: Desarrollar (2x − 5h)⁴",
        level: 2,
        content: [
          "(2x − 5h)⁴ = (2x)⁴ + 4(2x)³(−5h) + 6(2x)²(−5h)² + 4(2x)(−5h)³ + (−5h)⁴",
          "= 16x⁴ − 160x³h + 600x²h² − 1000xh³ + 625h⁴.",
        ],
      },
      {
        heading: "Término general del desarrollo binomial",
        level: 2,
        content: [
          "El término que contiene xʳ en la expansión de (x+y)ⁿ es C(n, n−r) · xʳ · yⁿ⁻ʳ.",
          "Ejemplo 6: Encuentre el coeficiente del término x¹⁵y⁴ en el desarrollo de (√x + y²/2)³². Tomando r = 30: C(32,2)(√x)³⁰(y²/2)² = 496 · x¹⁵ · y⁴/4 = 124x¹⁵y⁴. El coeficiente es 124.",
        ],
      },
      {
        heading: "El triángulo de Pascal",
        level: 1,
        content: [
          "Una forma alternativa para expandir (x+y)ⁿ consiste en \"leer\" los coeficientes del triángulo de Pascal:",
          "n=0:    1",
          "n=1:   1  1",
          "n=2:  1  2  1",
          "n=3: 1  3  3  1",
          "n=4: 1  4  6  4  1",
          "Cada número es la suma de los dos números \"vecinos\" de la fila anterior. El primero y el último de cada fila es 1.",
          "Los coeficientes de (x+y)ⁿ son los números de la \"n-ésima\" fila del triángulo de Pascal.",
          "Ejemplo 7: (x+y)⁶. Fila 5: 1 5 10 10 5 1. Fila 6: 1 6 15 20 15 6 1.",
          "(x+y)⁶ = x⁶ + 6x⁵y + 15x⁴y² + 20x³y³ + 15x²y⁴ + 6xy⁵ + y⁶.",
          "Observación: El triángulo de Pascal es más sencillo cuando n es relativamente pequeña. El teorema del binomio se aplica más fácilmente cuando n es un número relativamente grande.",
        ],
      },
    ],
  };

  // ─── MODULE 10 ──────────────────────────────────────────────
  modules[10] = {
    num: 10,
    title: "Expresiones Fraccionarias, Fracciones Compuestas y Racionalización",
    pdfPages: "Págs. 37 – 42",
    tag: "Álgebra",
    sections: [
      {
        heading: "EXPRESIONES FRACCIONARIAS",
        level: 1,
        content: [
          "Se llama expresión fraccionaria o fracción al cociente de dos expresiones algebraicas. Por ejemplo, 4z²/(z−1), (√y−2)/(y³+5), (3x+1)/(2x^(3/4)) son expresiones fraccionarias.",
          "Si en una expresión fraccionaria el numerador y el denominador son polinomios, la expresión se llama expresión racional. Por ejemplo, 5x²/(x+2) y (7x³+2x²−x+1)/(4x⁴+2x²+1) son expresiones racionales.",
        ],
      },
      {
        heading: "Operaciones con fracciones",
        level: 2,
        content: [],
      },
      {
        heading: "1. Simplificación",
        level: 2,
        content: [
          "Factorizamos el numerador y el denominador, y luego aplicamos la propiedad AC/BC = A/B.",
          "Ejemplo a) (x²−x−2)/(x²−1) = (x−2)(x+1)/((x−1)(x+1)) = (x−2)/(x−1).",
          "Ejemplo b) (1−x²)/(x³−1) = (1−x)(1+x)/((x−1)(x²+x+1)) = −(x−1)(1+x)/((x−1)(x²+x+1)) = −(1+x)/(x²+x+1).",
        ],
      },
      {
        heading: "2. Suma, resta, multiplicación y división de fracciones",
        level: 2,
        content: [
          "Nota: Para obtener el mínimo común denominador (MCD), factorizamos los denominadores y el MCD es el producto de los factores comunes y no comunes con el mayor exponente.",
          "Ejemplo a) 1/x² + 1/(x²+x) = 1/x² + 1/(x(x+1)) = (x+1+x)/(x²(x+1)) = (2x+1)/(x²(x+1)).",
          "Ejemplo b) 2/(x+3) − 1/(x²+7x+12) = 2/(x+3) − 1/((x+3)(x+4)) = (2(x+4)−1)/((x+3)(x+4)) = (2x+7)/((x+3)(x+4)).",
          "Ejemplo c) (x²−x−12)/(x²−9) · (3+x)/(4−x) = (x−4)(x+3)/((x−3)(x+3)) · (x+3)/(−(x−4)) = −(x+3)/(x−3).",
          "Ejemplo d) (4y²−9)/(2y²+9y−18) ÷ (2y²+y−3)/(y²+5y−6) = 1.",
          "Ejemplo e) [(2x²−3x−2)/(x²−1)] / [(2x²+5x+2)/(x²+x−2)] = (x−2)/(x+1).",
        ],
      },
      {
        heading: "Fracciones compuestas",
        level: 1,
        content: [
          "Si en una fracción, el numerador o el denominador son también fracciones, la expresión se llama fracción compuesta.",
          "Ejemplo a): [(a−b)/a − (a+b)/b] / [(a−b)/b + (a+b)/a] = [b(a−b)−a(a+b)]/(ab) / [a(a−b)+b(a+b)]/(ab) = (−a²−b²)/(a²+b²) = −1.",
          "Ejemplo b): (x⁻¹ + y⁻¹)/((x+y)⁻¹) = [(1/x + 1/y)] / [1/(x+y)] = [(x+y)/(xy)] · (x+y) = (x+y)²/(xy).",
          "Ejemplo c): [(1−x²)^(1/2) + x²(1−x²)^(−1/2)] / (1−x²) = (1−x²)^(−1/2)[(1−x²)+x²] / (1−x²) = 1/(1−x²)^(3/2).",
        ],
      },
      {
        heading: "Racionalización",
        level: 1,
        content: [
          "Dada una expresión fraccionaria con radicales en el denominador, racionalizar el denominador consiste en multiplicarla y dividirla por un factor adecuado, de manera que se eliminen los radicales en el denominador.",
          "• Si el denominador es √a: 1/√a = √a/a.",
          "• Si el denominador es ⁿ√(aᵐ), m < n y a > 0: 1/ⁿ√(aᵐ) = ⁿ√(aⁿ⁻ᵐ)/a.",
          "• Si el denominador es a + b√c: multiplicamos por el conjugado a − b√c. 1/(a+b√c) = (a−b√c)/(a²−b²c).",
          "• Si el denominador es ³√a − ³√b: multiplicamos por ³√a² + ³√(ab) + ³√b². 1/(³√a − ³√b) = (³√a² + ³√(ab) + ³√b²)/(a−b).",
        ],
      },
      {
        heading: "Ejemplo a): Racionalice el denominador",
        level: 2,
        content: [
          "(i) 1/√10 = √10/10.",
          "(ii) 2/³√x = 2³√x²/x.",
          "(iii) 2/(3−√5) = 2(3+√5)/(9−5) = (3+√5)/2.",
          "(iv) 2(x−y)/(√x − √y) = 2(x−y)(√x + √y)/((√x)² − (√y)²) = 2(√x + √y).",
        ],
      },
      {
        heading: "Ejemplo b): Racionalice el numerador",
        level: 2,
        content: [
          "(i) (√x − √(x+h))/(h√x · √(x+h)) · (√x + √(x+h))/(√x + √(x+h)) = (x − (x+h))/(h√x√(x+h)(√x+√(x+h))) = −1/(√x√(x+h)(√x+√(x+h))).",
          "(ii) (³√x + ³√2)/(x+2) · (³√x² − ³√(2x) + ³√4)/(³√x² − ³√(2x) + ³√4) = (x+2)/((x+2)(³√x² − ³√(2x) + ³√4)) = 1/(³√x² − ³√(2x) + ³√4).",
        ],
      },
      {
        heading: "Ejemplo: Más racionalizaciones",
        level: 2,
        content: [
          "1. b/(√5 + √b) = b(√5 − √b)/(5 − b).",
          "2. 1/(√m − ⁴√n) = (√m + ⁴√n)/(m − √n) = (√m + ⁴√n)(m + √n)/(m² − n).",
          "3. 1/(³√a − ³√b) = (³√a² + ³√(ab) + ³√b²)/(a − b).",
        ],
      },
      {
        heading: "NOTA IMPORTANTE",
        level: 1,
        content: [
          "Es muy importante tener en cuenta que:",
          "• (a + b)² ≠ a² + b²",
          "• √(a + b) ≠ √a + √b",
          "• √(a² + b²) ≠ a + b",
          "• 1/a + 1/b ≠ 1/(a+b)",
          "• (a + b)/a ≠ b",
          "• (a + b)⁻¹ ≠ a⁻¹ + b⁻¹",
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
            <Link href="/teoria" className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#7A8F73] to-[#4F6B57] border border-[#D9CBB6]/30 flex items-center justify-center text-[#D9CBB6] hover:scale-105 transition-transform">
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
              <Link href={`/teoria/${moduleId - 1}`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50 transition-all">
                ← Anterior
              </Link>
            )}
            {ALL_MODULES[moduleId + 1] && (
              <Link href={`/teoria/${moduleId + 1}`} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#4F6B57]/30 text-[#BFAE8F] border border-[#D9CBB6]/15 hover:border-[#7A8F73]/50 transition-all">
                Siguiente →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 w-full">
        {/* Title Banner */}
        <div className="beige-card rounded-2xl p-6 sm:p-8 border border-[#D9CBB6]/20 mb-8 relative overflow-hidden">
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
                <h2 className="text-xl font-bold text-[#D9CBB6] glow-beige border-b border-[#7A8F73]/40 pb-2 mb-4 mt-6">
                  {section.heading}
                </h2>
              ) : section.level === 2 ? (
                <h3 className="text-base font-semibold text-[#BFAE8F] mb-3 mt-4">
                  {section.heading}
                </h3>
              ) : (
                <h4 className="text-sm font-semibold text-[#7A8F73] mb-2 mt-3">
                  {section.heading}
                </h4>
              )}
              {section.content.length > 0 && (
                <div className="beige-card rounded-xl p-5 border border-[#D9CBB6]/10 space-y-3">
                  {section.content.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className={`text-sm leading-relaxed whitespace-pre-wrap ${
                        paragraph.startsWith("•") || paragraph.startsWith("  •")
                          ? "text-[#BFAE8F] pl-2"
                          : paragraph.match(/^\d+\./)
                          ? "text-[#D9CBB6] font-medium"
                          : paragraph.startsWith("Ejemplo") || paragraph.startsWith("Solución") || paragraph.startsWith("Verificación")
                          ? "text-[#7A8F73] italic"
                          : "text-[#D9CBB6]/90"
                      }`}
                    >
                      {paragraph}
                    </p>
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
