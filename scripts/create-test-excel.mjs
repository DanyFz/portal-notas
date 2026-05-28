import XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const wb = XLSX.utils.book_new();

// Exact student data from user prompt
const studentList = [
  { name: "Jeronimo Torres Arroyave", email: "jetorresa@unal.edu.co", program: "Ingenieria Civil", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Isaac Arboleda Velasquez", email: "iarboledav@unal.edu.co", program: "Ingenieria Mecanica", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Juan Jose Bueno Bueno", email: "jbuenob@unal.edu.co", program: "Ingenieria Civil", group: "GEA 24", grades: ["", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Maria Delosangeles Posada David", email: "maposadad@unal.edu.co", program: "Ingenieria Civil", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Wiston Eliuth Jaimes Sanjuan", email: "wjaimess@unal.edu.co", program: "Ingenieria Civil", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Luciana Marin Morales", email: "lumarinmo@unal.edu.co", program: "Ingenieria Civil", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Samuel Mauricio Melo Hernandez", email: "smelohe@unal.edu.co", program: "Ingenieria Civil", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Caren Julieth Alarcon Balaguera", email: "calarconb@unal.edu.co", program: "Ingenieria Forestal", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Maria Camila Zuluaga Montenegro", email: "mzuluagam@unal.edu.co", program: "Ingenieria Industrial", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Maicol Smit Zapata Rincon", email: "mazapatari@unal.edu.co", program: "Ingenieria Geologica", group: "GEA 24", grades: ["0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Jaiver Joseph Torres Barbosa", email: "jaitorresba@unal.edu.co", program: "Economia", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Samuel David Yepes Zambrano", email: "syepesz@unal.edu.co", program: "Ingenieria de Sistemas e Informatica", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Daniel Felipe Torres Guarin", email: "dantorresgu@unal.edu.co", program: "Ingenieria de Minas y Metalurgia", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Andres Felipe Mendivelso Hernandez", email: "amendivelsoh@unal.edu.co", program: "Ingenieria de Minas y Metalurgia", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Orlando Andres Zorrilla Garcia", email: "ozorrilla@unal.edu.co", program: "Ingenieria Civil", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Thomas Hernandez Granda", email: "thhernandezg@unal.edu.co", program: "Ingenieria Mecanica", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Juan Felipe Gallo Giraldo", email: "jgallogi@unal.edu.co", program: "Ingenieria de Petroleos", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Isabella Ochoa Gonzalez", email: "iochoag@unal.edu.co", program: "Ingenieria Agricola", group: "GEA 24", grades: ["4,00", "4,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Mateo Dominguez Preciado", email: "mdominguezp@unal.edu.co", program: "Ingenieria de Petroleos", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Janna Sofia Uribe Tabares", email: "juribeta@unal.edu.co", program: "Zootecnia", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Isabella Serrano Chaparro", email: "iserranoc@unal.edu.co", program: "Ingenieria Fisica", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Diego Alejandro Zandon Cavadias", email: "dzandon@unal.edu.co", program: "Ingenieria Electrica", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Daniel Alexander Daza Molina", email: "ddazamo@unal.edu.co", program: "Ingenieria Electrica", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Juan Luis Ramirez Velasquez", email: "juaramirezve@unal.edu.co", program: "Ingenieria Agronomica", group: "GEA 24", grades: ["5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Laura Isabel Gomez Orozco", email: "laugomezor@unal.edu.co", program: "Ingenieria Civil", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Sofia Puerta Florez", email: "sopuertaf@unal.edu.co", program: "Economia", group: "GEA 24", grades: ["5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
  { name: "Julian Osorio Morales", email: "julosorio@unal.edu.co", program: "Ingenieria Fisica", group: "GEA 24", grades: ["5,00", "5,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00"] },
];

function buildSheetRows() {
  const rows = [];
  
  // Metadata rows
  rows.push(["SALON", "Bloque 11 - 209/14-16", "GRUPO", "34", "Tutor Encargado", "", "", "Daniel Felipe López Zapata"]);
  rows.push([]);
  rows.push(["", "", "", "", "ASISTENCIA"]);
  
  // Attendance Header
  rows.push([
    "NOMBRE DEL ESTUDIANTE", "CORREO", "PROGRAMA ACADÉMICO", "Grupo", 
    "4/5/2026", "11/5/2026", "18/5/2026", "25/5/2026", "1/6/2026", "8/6/2026", 
    "15/6/2026", "22/6/2026", "29/6/2026", "6/7/2026", "13/7/2026", "20/7/2026", 
    "27/7/2026", "3/8/2026"
  ]);

  // Attendance Data (we default attendance to "P" / present)
  for (const s of studentList) {
    rows.push([
      s.name, s.email, s.program, s.group,
      "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P", "P"
    ]);
  }

  // Blank spacing rows
  for (let i = 0; i < 6; i++) {
    rows.push([]);
  }

  // Grades Header
  rows.push([
    "NOMBRE DEL ESTUDIANTE", "CORREO", "PROGRAMA ACADÉMICO", "Grupo", 
    "Quices", "", "", "", "", "", "", "", "", "", "", "", "", "", "Promedio"
  ]);

  // Grades Data
  for (const s of studentList) {
    const avg = s.grades.reduce((acc, g) => acc + (parseFloat(g.replace(",", ".")) || 0), 0) / s.grades.length;
    rows.push([
      s.name, s.email, s.program, s.group,
      ...s.grades,
      avg.toFixed(2).replace(".", ",")
    ]);
  }

  // Average footer
  rows.push([
    "", "Promedio Total Por Quiz", "", "", 
    "4,77", "4,38", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,00", "0,64"
  ]);

  return rows;
}

const wsData1 = buildSheetRows();
const wsData2 = buildSheetRows();
const wsData3 = buildSheetRows();

const ws1 = XLSX.utils.aoa_to_sheet(wsData1);
const ws2 = XLSX.utils.aoa_to_sheet(wsData2);
const ws3 = XLSX.utils.aoa_to_sheet(wsData3);

XLSX.utils.book_append_sheet(wb, ws1, "GEA 24");
XLSX.utils.book_append_sheet(wb, ws2, "Gea 14");
XLSX.utils.book_append_sheet(wb, ws3, "Gea 13");

const outPath = path.join(__dirname, "..", "test-data.xlsx");
XLSX.writeFile(wb, outPath);
console.log("Excel realístico generado exitosamente en:", outPath);
