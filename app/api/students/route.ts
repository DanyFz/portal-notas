import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import * as XLSX from "xlsx";

export const runtime = "nodejs";

// Force dynamic rendering — never cache this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

// ─── Types ───────────────────────────────────────────────────────
interface Student {
  username: string;
  email: string;
  group: string;
  fullName: string;
  program: string;
  grades: Record<string, number | null>;
  attendance: Record<string, string>;
}

// ─── Helpers (same parsing logic as upload-excel) ────────────────
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
  const parts = str.split(/[\/\-\.]/);
  if (parts.length === 3) {
    if (parts[2].length === 4) {
      const d = parts[0].padStart(2, "0");
      const m = parts[1].padStart(2, "0");
      const y = parts[2];
      return `${y}-${m}-${d}`;
    }
  }
  return str;
}

function parseGrade(value: any): number | null {
  if (value == null) return null;
  const str = value.toString().trim().replace(",", ".");
  if (str === "" || str.toLowerCase() === "excusa" || str.toLowerCase() === "e") return null;
  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

function gradeToAttendance(grade: number | null): string {
  if (grade === null) return "excusa";
  if (grade === 0) return "ausente";
  return "presente";
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

  let attendanceHeaderIdx = -1;
  let gradesHeaderIdx = -1;

  for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row || row.length === 0) continue;
    const firstCell = row[0]?.toString().trim().toUpperCase() || "";
    if (firstCell.includes("NOMBRE DEL ESTUDIANTE") || firstCell === "NOMBRE") {
      const isGrades = row.some((cell: any) => {
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
    warnings.push(`Hoja "${groupName}": no se encontró la cabecera de la tabla de asistencia.`);
    return [];
  }

  const attendanceHeader = rawData[attendanceHeaderIdx];
  const nameColIdx = attendanceHeader.findIndex((c: any) =>
    c?.toString().trim().toUpperCase().includes("NOMBRE")
  );
  const emailColIdx = attendanceHeader.findIndex((c: any) =>
    c?.toString().trim().toUpperCase().includes("CORREO")
  );
  const programColIdx = attendanceHeader.findIndex((c: any) =>
    c?.toString().trim().toUpperCase().includes("PROGRAMA")
  );
  const groupColIdx = attendanceHeader.findIndex((c: any) =>
    c?.toString().trim().toUpperCase() === "GRUPO"
  );

  if (nameColIdx === -1 || emailColIdx === -1) {
    warnings.push(`Hoja "${groupName}": no se encontraron columnas de Nombre o Correo.`);
    return [];
  }

  const dateColumns: { idx: number; label: string }[] = [];
  for (let colIdx = 4; colIdx < attendanceHeader.length; colIdx++) {
    const val = attendanceHeader[colIdx];
    if (val != null && val.toString().trim() !== "") {
      dateColumns.push({ idx: colIdx, label: parseExcelDate(val) });
    }
  }

  const studentsMap = new Map<string, Student>();
  let rowIdx = attendanceHeaderIdx + 1;

  while (rowIdx < rawData.length) {
    const row = rawData[rowIdx];
    if (!row) { rowIdx++; continue; }

    const name = row[nameColIdx]?.toString().trim();
    const email = row[emailColIdx]?.toString().trim();

    if (!name && !email) {
      if (rowIdx > gradesHeaderIdx && gradesHeaderIdx !== -1) break;
      rowIdx++;
      continue;
    }

    if (
      name?.toUpperCase().includes("ASISTENCIA") ||
      name?.toUpperCase().includes("NOMBRE DEL ESTUDIANTE")
    ) {
      rowIdx++;
      continue;
    }

    if (!email || !email.includes("@")) { rowIdx++; continue; }

    const username = email.split("@")[0].toLowerCase();
    const program = row[programColIdx]?.toString().trim() || "";
    const groupVal = row[groupColIdx]?.toString().trim() || groupName;

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
    const gEmailColIdx = gradesHeader.findIndex((c: any) =>
      c?.toString().trim().toUpperCase().includes("CORREO")
    );
    const gNameColIdx = gradesHeader.findIndex((c: any) =>
      c?.toString().trim().toUpperCase().includes("NOMBRE")
    );

    const quizColumns: { idx: number; label: string }[] = [];
    let quizCounter = 1;
    for (let colIdx = 4; colIdx < gradesHeader.length; colIdx++) {
      const headerVal = gradesHeader[colIdx]?.toString().trim().toUpperCase() || "";
      if (headerVal.includes("PROMEDIO")) break;
      quizColumns.push({ idx: colIdx, label: `Quiz ${quizCounter++}` });
    }

    let gRowIdx = gradesHeaderIdx + 1;
    while (gRowIdx < rawData.length) {
      const row = rawData[gRowIdx];
      if (!row) { gRowIdx++; continue; }

      const emailVal = row[gEmailColIdx]?.toString().trim();
      const nameVal = row[gNameColIdx]?.toString().trim();

      if (!nameVal && !emailVal) { gRowIdx++; continue; }
      if (
        nameVal?.toUpperCase().includes("PROMEDIO TOTAL") ||
        nameVal?.toUpperCase().includes("NOMBRE DEL ESTUDIANTE")
      ) {
        gRowIdx++;
        continue;
      }
      if (!emailVal || !emailVal.includes("@")) { gRowIdx++; continue; }

      const username = emailVal.split("@")[0].toLowerCase();
      const student = studentsMap.get(username);

      if (student) {
        const grades: Record<string, number | null> = {};
        const gradeAttendance: Record<string, string> = {};
        for (const qc of quizColumns) {
          const val = row[qc.idx];
          const grade = parseGrade(val);
          grades[qc.label] = grade;
          gradeAttendance[qc.label] = gradeToAttendance(grade);
        }
        student.grades = grades;
        student.attendance = gradeAttendance;
      }

      gRowIdx++;
    }
  }

  return Array.from(studentsMap.values());
}

function parseExcelBuffer(buffer: ArrayBuffer): { students: Student[]; warnings: string[] } {
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

// ─── Response helpers ────────────────────────────────────────────
const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

/**
 * GET /api/students
 * Reads student data. Priority:
 * 1. Excel file (.xlsx) from Vercel Blob → parses on the fly
 * 2. Pre-processed JSON (students-data.json) from Vercel Blob
 * 3. Local file system fallback (public/data/students.json)
 */
export async function GET() {
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { list } = await import("@vercel/blob");

        // 1. Look for any .xlsx file in the Blob store
        const { blobs: allBlobs } = await list();
        const excelBlob = allBlobs.find(
          (b) => b.pathname.endsWith(".xlsx") || b.pathname.endsWith(".xls")
        );

        if (excelBlob) {
          console.log(`[students] Found Excel in Blob: ${excelBlob.pathname}`);
          const bustUrl = `${excelBlob.url}${excelBlob.url.includes("?") ? "&" : "?"}t=${Date.now()}`;
          const response = await fetch(bustUrl, { cache: "no-store" });
          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const { students, warnings } = parseExcelBuffer(arrayBuffer);
            if (students.length > 0) {
              console.log(`[students] Parsed ${students.length} students from Excel blob`);
              if (warnings.length > 0) {
                console.warn("[students] Warnings:", warnings);
              }
              return NextResponse.json({ students }, { headers: NO_CACHE_HEADERS });
            }
          }
        }

        // 2. Fall back to pre-processed JSON blob (students-data.json)
        const { blobs: jsonBlobs } = await list({ prefix: "students-data" });
        if (jsonBlobs.length > 0) {
          const latestBlob = jsonBlobs[0];
          const bustUrl = `${latestBlob.url}${latestBlob.url.includes("?") ? "&" : "?"}t=${Date.now()}`;
          const response = await fetch(bustUrl, { cache: "no-store" });
          if (response.ok) {
            const data = await response.json();
            if (data.students && data.students.length > 0) {
              return NextResponse.json(data, { headers: NO_CACHE_HEADERS });
            }
          }
        }
      } catch (err) {
        console.error("Vercel Blob read failed:", err);
        // Fall through to file system
      }
    }

    // 3. Try local file system (dev & self-hosted)
    try {
      const filePath = path.join(process.cwd(), "public", "data", "students.json");
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);
      if (data.students && data.students.length > 0) {
        return NextResponse.json(data, { headers: NO_CACHE_HEADERS });
      }
    } catch {
      // File doesn't exist yet, that's fine
    }

    // No data found anywhere
    return NextResponse.json({ students: [] }, { headers: NO_CACHE_HEADERS });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ students: [] });
  }
}
