import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { verifyAdminToken } from "@/lib/adminAuth";
import { Student } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const cookieToken = req.cookies.get("admin_token")?.value;
    const authHeader = req.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    const token = cookieToken || bearerToken;

    if (!verifyAdminToken(token)) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const students: Student[] = body.students;

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
        console.error("Error saving to Vercel Blob:", blobErr);
      }
    }

    // 2. Save to local filesystem as well (or primary fallback)
    try {
      const dataDir = path.join(process.cwd(), "public", "data");
      await fs.mkdir(dataDir, { recursive: true });
      const filePath = path.join(dataDir, "students.json");
      await fs.writeFile(filePath, jsonPayload, "utf-8");
      localSaved = true;
      targets.push("Local JSON (public/data/students.json)");
    } catch (fsErr) {
      console.warn("Could not write to local file system (expected on readonly serverless):", fsErr);
    }

    if (!blobSaved && !localSaved) {
      return NextResponse.json(
        { error: "No se pudo persistir la información ni en Vercel Blob ni en el sistema local" },
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
    console.error("Error saving students:", error);
    return NextResponse.json(
      { error: "Error interno al guardar los cambios" },
      { status: 500 }
    );
  }
}
