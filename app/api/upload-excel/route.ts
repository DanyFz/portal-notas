import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

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

// ─── Helpers ─────────────────────────────────────────────────────
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
  } else {
    warnings.push(`Hoja "${groupName}": no se encontró la sección de Notas.`);
  }

  return Array.from(studentsMap.values());
}

// ─── Storage helpers ─────────────────────────────────────────────

/** Save to local file system (works in dev and self-hosted) */
async function saveToFileSystem(jsonData: string): Promise<void> {
  const filePath = path.join(process.cwd(), "public", "data", "students.json");
  const dirPath = path.dirname(filePath);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, jsonData, "utf-8");
}

/** Save to Vercel Blob (only if token is configured) */
async function saveToVercelBlob(jsonData: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { put } = await import("@vercel/blob");
    const blob = await put("students-data.json", jsonData, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return blob.url;
  } catch (err) {
    console.error("Vercel Blob save failed:", err);
    return null;
  }
}

// ─── Main handler ────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se recibió ningún archivo." },
        { status: 400 }
      );
    }

    // Parse Excel on the server
    const buffer = await file.arrayBuffer();
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

    if (allStudents.length === 0) {
      return NextResponse.json(
        {
          error: "No se encontraron estudiantes en el archivo.",
          warnings,
        },
        { status: 400 }
      );
    }

    // Save parsed data to all available storage backends
    const jsonData = JSON.stringify({ students: allStudents }, null, 2);
    const storageMethods: string[] = [];

    // 1. Always save to file system (primary storage for dev & self-hosted)
    try {
      await saveToFileSystem(jsonData);
      storageMethods.push("archivo local");
    } catch (err) {
      console.error("File system save failed:", err);
      warnings.push("No se pudo guardar en el sistema de archivos local.");
    }

    // 2. Try Vercel Blob if token is configured (production on Vercel)
    const blobUrl = await saveToVercelBlob(jsonData);
    if (blobUrl) {
      storageMethods.push("Vercel Blob (nube)");
    }

    if (storageMethods.length === 0) {
      return NextResponse.json(
        { error: "No se pudo guardar en ningún almacenamiento.", warnings },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      count: allStudents.length,
      warnings,
      blobUrl: blobUrl || null,
      storageUsed: storageMethods,
      message: `Se guardaron ${allStudents.length} estudiantes exitosamente (${storageMethods.join(" + ")}).`,
    });
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      {
        error:
          "Error al procesar el archivo: " +
          (error instanceof Error ? error.message : "Error desconocido"),
      },
      { status: 500 }
    );
  }
}
