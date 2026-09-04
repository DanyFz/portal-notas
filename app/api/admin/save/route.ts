import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifyAdminToken } from "@/lib/adminAuth";
import { Student } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const errors: string[] = [];

  try {
    // Auth check
    const cookieToken = req.cookies.get("admin_token")?.value;
    const authHeader = req.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    const token = cookieToken || bearerToken;

    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Parse body
    let students: Student[];
    try {
      const body = await req.json();
      students = body.students;
    } catch (parseErr) {
      return NextResponse.json(
        { error: "Error al leer los datos enviados: " + (parseErr instanceof Error ? parseErr.message : String(parseErr)) },
        { status: 400 }
      );
    }

    if (!Array.isArray(students)) {
      return NextResponse.json(
        { error: "Formato de datos inválido (se esperaba un arreglo de estudiantes)" },
        { status: 400 }
      );
    }

    const jsonPayload = JSON.stringify({ students }, null, 2);
    let blobSaved = false;
    let localSaved = false;
    const targets: string[] = [];

    // 1. Save to Vercel Blob if token exists
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import("@vercel/blob");
        const blobResult = await put("students-data.json", jsonPayload, {
          access: "public",
          addRandomSuffix: false,
          contentType: "application/json",
        });
        blobSaved = true;
        targets.push(`Vercel Blob (${blobResult.pathname})`);
      } catch (blobErr) {
        const msg = blobErr instanceof Error ? blobErr.message : String(blobErr);
        console.error("Error saving to Vercel Blob:", msg);
        errors.push(`Blob: ${msg}`);
      }
    }

    // 2. Save to local filesystem
    const cwd = process.cwd();
    const dataDir = path.join(cwd, "public", "data");

    try {
      await fs.mkdir(dataDir, { recursive: true });
      const filePath = path.join(dataDir, "students.json");
      await fs.writeFile(filePath, jsonPayload, "utf-8");
      localSaved = true;
      targets.push(`Local (${filePath})`);
    } catch (fsErr) {
      const msg = fsErr instanceof Error ? fsErr.message : String(fsErr);
      console.error(`FS write error (cwd=${cwd}, dir=${dataDir}):`, msg);
      errors.push(`FS: ${msg}`);
    }

    if (!blobSaved && !localSaved) {
      return NextResponse.json(
        {
          error: `No se pudo persistir la información. Detalles: ${errors.join(" | ")}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Cambios guardados exitosamente (${students.length} estudiantes)`,
      targets,
      studentsCount: students.length,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Unhandled error saving students:", msg);
    return NextResponse.json(
      { error: `Error interno: ${msg}` },
      { status: 500 }
    );
  }
}
