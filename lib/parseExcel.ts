import * as XLSX from "xlsx";
import { Student } from "./types";

interface ParseResult {
  students: Student[];
  warnings: string[];
}

/**
 * Parses a date or returns a string representation of the Excel date value.
 */
function parseExcelDate(value: any): string {
  if (value == null) return "";
  if (typeof value === "number") {
    try {
      const date = XLSX.SSF.parse_date_code(value);
      const y = date.y;
      const m = String(date.m).padStart(2, "0");
      const d = String(date.d).padStart(2, "0");
      return `${y}-${m}-${d}`;
    } catch {
      return value.toString();
    }
  }
  
  const str = value.toString().trim();
  // If in DD/MM/YYYY format, convert to YYYY-MM-DD
  const parts = str.split(/[\/\-\.]/);
  if (parts.length === 3) {
    // Check if first part is day and last is year
    if (parts[2].length === 4) {
      const d = parts[0].padStart(2, "0");
      const m = parts[1].padStart(2, "0");
      const y = parts[2];
      return `${y}-${m}-${d}`;
    }
  }
  return str;
}

/**
 * Converts a cell value to a grade number or null (excusa).
 */
function parseGrade(value: any): number | null {
  if (value == null) return null;
  const str = value.toString().trim().replace(",", "."); // Handle Spanish decimals
  if (str === "" || str.toLowerCase() === "excusa" || str.toLowerCase() === "e") return null;
  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

function parseSheet(
  sheet: XLSX.WorkSheet,
  groupName: string,
  warnings: string[]
): Student[] {
  const rawData: any[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: null,
  });

  if (rawData.length < 2) {
    warnings.push(`Hoja "${groupName}": no tiene suficientes datos.`);
    return [];
  }

  // Find attendance and grade header rows
  let attendanceHeaderIdx = -1;
  let gradesHeaderIdx = -1;

  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row || row.length === 0) continue;
    
    const firstCell = row[0]?.toString().trim().toUpperCase() || "";
    if (firstCell.includes("NOMBRE DEL ESTUDIANTE") || firstCell === "NOMBRE") {
      // Check if it's the grades section
      const isGrades = row.some(cell => {
        const str = cell?.toString().trim().toUpperCase() || "";
        return str.includes("QUIC") || str.includes("PROMEDIO") || str.includes("NOTA");
      });

      if (isGrades) {
        gradesHeaderIdx = i;
      } else if (attendanceHeaderIdx === -1) {
        attendanceHeaderIdx = i;
      }
    }
  }

  if (attendanceHeaderIdx === -1) {
    warnings.push(`Hoja "${groupName}": no se encontró la cabecera de la tabla de asistencia (buscando "NOMBRE DEL ESTUDIANTE").`);
    return [];
  }

  const attendanceHeader = rawData[attendanceHeaderIdx];
  const nameColIdx = attendanceHeader.findIndex(c => c?.toString().trim().toUpperCase().includes("NOMBRE"));
  const emailColIdx = attendanceHeader.findIndex(c => c?.toString().trim().toUpperCase().includes("CORREO"));
  const programColIdx = attendanceHeader.findIndex(c => c?.toString().trim().toUpperCase().includes("PROGRAMA"));
  const groupColIdx = attendanceHeader.findIndex(c => c?.toString().trim().toUpperCase() === "GRUPO");

  if (nameColIdx === -1 || emailColIdx === -1) {
    warnings.push(`Hoja "${groupName}": no se encontraron las columnas de Nombre o Correo en la tabla de asistencia.`);
    return [];
  }

  // Find all date columns starting from index 4
  const dateColumns: { idx: number; label: string }[] = [];
  for (let colIdx = 4; colIdx < attendanceHeader.length; colIdx++) {
    const val = attendanceHeader[colIdx];
    if (val != null && val.toString().trim() !== "") {
      dateColumns.push({
        idx: colIdx,
        label: parseExcelDate(val)
      });
    }
  }

  // Parse attendance rows
  const studentsMap = new Map<string, Student>();
  
  let rowIdx = attendanceHeaderIdx + 1;
  while (rowIdx < rawData.length) {
    const row = rawData[rowIdx];
    if (!row) {
      rowIdx++;
      continue;
    }

    const name = row[nameColIdx]?.toString().trim();
    const email = row[emailColIdx]?.toString().trim();
    
    // Stop if we hit a blank row or the next section
    if (!name && !email) {
      // If we see blank rows, we might be transitioning to the grades table
      if (rowIdx > gradesHeaderIdx && gradesHeaderIdx !== -1) {
        break;
      }
      rowIdx++;
      continue;
    }

    // Skip helper/header rows or section titles
    if (name?.toUpperCase().includes("ASISTENCIA") || name?.toUpperCase().includes("NOMBRE DEL ESTUDIANTE")) {
      rowIdx++;
      continue;
    }

    if (!email || !email.includes("@")) {
      rowIdx++;
      continue;
    }

    const username = email.split("@")[0].toLowerCase();
    const program = row[programColIdx]?.toString().trim() || "";
    const groupVal = row[groupColIdx]?.toString().trim() || groupName;

    // Parse attendance states
    const attendance: Record<string, string> = {};
    for (const dc of dateColumns) {
      const cellVal = row[dc.idx];
      if (cellVal == null || cellVal.toString().trim() === "") {
        attendance[dc.label] = "ausente";
      } else {
        const valStr = cellVal.toString().trim().toLowerCase();
        if (["1", "p", "presente", "x", "✓", "si", "sí", "asistio", "asistió"].includes(valStr)) {
          attendance[dc.label] = "presente";
        } else if (["e", "excusa", "excusado", "justificado"].includes(valStr)) {
          attendance[dc.label] = "excusa";
        } else {
          attendance[dc.label] = "ausente";
        }
      }
    }

    studentsMap.set(username, {
      username,
      password: program,
      email,
      group: groupVal,
      fullName: name,
      program,
      grades: {},
      attendance,
    });

    rowIdx++;
  }

  // Parse grades section
  if (gradesHeaderIdx !== -1) {
    const gradesHeader = rawData[gradesHeaderIdx];
    
    const gNameColIdx = gradesHeader.findIndex(c => c?.toString().trim().toUpperCase().includes("NOMBRE"));
    const gEmailColIdx = gradesHeader.findIndex(c => c?.toString().trim().toUpperCase().includes("CORREO"));
    
    // Quizzes columns start from column 4 up to where we hit "PROMEDIO" or the end of columns
    const quizColumns: { idx: number; label: string }[] = [];
    let quizCounter = 1;

    for (let colIdx = 4; colIdx < gradesHeader.length; colIdx++) {
      const headerVal = gradesHeader[colIdx]?.toString().trim().toUpperCase() || "";
      if (headerVal.includes("PROMEDIO")) {
        break; // Stop when we hit the Promedio column
      }
      
      quizColumns.push({
        idx: colIdx,
        label: `Quiz ${quizCounter++}`
      });
    }

    let gRowIdx = gradesHeaderIdx + 1;
    while (gRowIdx < rawData.length) {
      const row = rawData[gRowIdx];
      if (!row) {
        gRowIdx++;
        continue;
      }

      const emailVal = row[gEmailColIdx]?.toString().trim();
      const nameVal = row[gNameColIdx]?.toString().trim();

      if (!nameVal && !emailVal) {
        gRowIdx++;
        continue;
      }

      if (nameVal?.toUpperCase().includes("PROMEDIO TOTAL") || nameVal?.toUpperCase().includes("NOMBRE DEL ESTUDIANTE")) {
        gRowIdx++;
        continue;
      }

      if (!emailVal || !emailVal.includes("@")) {
        gRowIdx++;
        continue;
      }

      const username = emailVal.split("@")[0].toLowerCase();
      const student = studentsMap.get(username);

      if (student) {
        const grades: Record<string, number | null> = {};
        const attendance: Record<string, string> = {};
        
        for (let i = 0; i < quizColumns.length; i++) {
          const qc = quizColumns[i];
          const val = row[qc.idx];
          const parsedVal = parseGrade(val);
          grades[qc.label] = parsedVal;

          // Determine attendance based on the grade value:
          // si la nota es cero significa ausente, si es espacio en blanco excusa y si es un numero distinto de cero asistio
          let status = "presente";
          if (parsedVal === 0) {
            status = "ausente";
          } else if (parsedVal === null) {
            status = "excusa";
          }

          // Use corresponding date from dateColumns if available, otherwise quiz label
          const dateLabel = dateColumns[i] ? dateColumns[i].label : qc.label;
          attendance[dateLabel] = status;
        }
        
        student.grades = grades;
        student.attendance = attendance;
      }

      gRowIdx++;
    }
  } else {
    warnings.push(`Hoja "${groupName}": no se encontró la sección de Notas ("Quices" / "Promedio").`);
  }

  return Array.from(studentsMap.values());
}

export function parseExcelFile(buffer: ArrayBuffer): ParseResult {
  const workbook = XLSX.read(buffer, { type: "array" });
  const warnings: string[] = [];
  const allStudents: Student[] = [];

  for (let i = 0; i < workbook.SheetNames.length; i++) {
    const sheetName = workbook.SheetNames[i];
    const sheet = workbook.Sheets[sheetName];
    const groupName = sheetName || `Grupo ${i + 1}`;

    try {
      const students = parseSheet(sheet, groupName, warnings);
      if (students.length === 0) {
        warnings.push(`Hoja "${groupName}": no se encontraron estudiantes válidos.`);
      } else {
        allStudents.push(...students);
      }
    } catch (err) {
      warnings.push(
        `Hoja "${groupName}": error al procesar — ${
          err instanceof Error ? err.message : "Error desconocido"
        }`
      );
    }
  }

  return { students: allStudents, warnings };
}
