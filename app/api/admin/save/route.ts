import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/adminAuth";
import { writeData } from "@/lib/dataStore";
import { Student } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
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
    const body = await req.json();
    const students: Student[] = body.students;
    const quizPasswords: Record<string, string> = body.quizPasswords || {};
    const customGroups: string[] = body.customGroups || [];

    if (!Array.isArray(students)) {
      return NextResponse.json(
        { error: "Formato de datos inválido (se esperaba un arreglo de estudiantes)" },
        { status: 400 }
      );
    }

    const saveResult = await writeData({
      students,
      quizPasswords,
      customGroups,
    });

    if (!saveResult.success) {
      return NextResponse.json(
        { error: `No se pudo persistir la información. Detalles: ${saveResult.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Cambios guardados exitosamente (${students.length} estudiantes)`,
      targets: saveResult.targets,
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
