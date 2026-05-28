import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.students || !Array.isArray(body.students)) {
      return NextResponse.json(
        { error: "Formato inválido: se esperaba un arreglo de estudiantes." },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public", "data", "students.json");
    const dirPath = path.dirname(filePath);

    // Ensure directory exists
    await fs.mkdir(dirPath, { recursive: true });

    // Write the JSON file
    await fs.writeFile(
      filePath,
      JSON.stringify({ students: body.students }, null, 2),
      "utf-8"
    );

    return NextResponse.json({
      success: true,
      count: body.students.length,
      message: `Se guardaron ${body.students.length} estudiantes exitosamente.`,
    });
  } catch (error) {
    console.error("Error saving students:", error);
    return NextResponse.json(
      {
        error: "Error al guardar los datos. " +
          (error instanceof Error ? error.message : "Error desconocido"),
      },
      { status: 500 }
    );
  }
}
