import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { parseExcelFile } from "@/lib/parseExcel";

export const runtime = "nodejs";

/** Save to local file system (works in dev and self-hosted) */
async function saveToFileSystem(jsonData: string): Promise<void> {
  const filePath = path.join(process.cwd(), "public", "data", "students.json");
  const dirPath = path.dirname(filePath);
  await fs.mkdir(dirPath, { recursive: true });
  await fs.writeFile(filePath, jsonData, "utf-8");
}

/** Save both original Excel and parsed JSON to Vercel Blob */
async function saveToVercelBlob(fileBuffer: ArrayBuffer, fileName: string, jsonData: string): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const { put } = await import("@vercel/blob");

    // 1. Upload raw Excel file
    const excelBlob = await put("students.xlsx", fileBuffer, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // 2. Upload parsed JSON file
    await put("students-data.json", jsonData, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });

    return excelBlob.url;
  } catch (err) {
    console.error("Vercel Blob save failed:", err);
    return null;
  }
}

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

    const buffer = await file.arrayBuffer();
    const { students: allStudents, warnings } = parseExcelFile(buffer);

    if (allStudents.length === 0) {
      return NextResponse.json(
        {
          error: "No se encontraron estudiantes válidos en el archivo Excel.",
          warnings,
        },
        { status: 400 }
      );
    }

    const jsonData = JSON.stringify({ students: allStudents }, null, 2);
    const storageMethods: string[] = [];

    // 1. Always save to local file system for dev
    try {
      await saveToFileSystem(jsonData);
      storageMethods.push("archivo local");
    } catch (err) {
      console.error("File system save failed:", err);
      warnings.push("No se pudo guardar en el sistema de archivos local.");
    }

    // 2. Upload to Vercel Blob if token configured
    const blobUrl = await saveToVercelBlob(buffer, file.name, jsonData);
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

