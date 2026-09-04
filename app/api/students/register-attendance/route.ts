import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/dataStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, quiz, password } = body;

    if (!username || typeof username !== "string" || !quiz || typeof quiz !== "string") {
      return NextResponse.json(
        { error: "Datos incompletos: username y quiz son obligatorios." },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().toLowerCase();
    const cleanQuiz = quiz.trim();
    const cleanPassword = typeof password === "string" ? password.trim() : "";

    const data = await readData();
    const studentIndex = data.students.findIndex(
      (s) => s.username.toLowerCase() === cleanUsername
    );

    if (studentIndex === -1) {
      return NextResponse.json(
        { error: "Estudiante no encontrado en el sistema." },
        { status: 404 }
      );
    }

    const currentStudent = data.students[studentIndex];

    // Check required password for this quiz/column
    const requiredPassword = (data.quizPasswords?.[cleanQuiz] || "").trim();

    if (requiredPassword !== "") {
      if (cleanPassword === "") {
        return NextResponse.json(
          {
            error: "Esta evaluación requiere contraseña para registrar asistencia.",
            requiresPassword: true,
          },
          { status: 401 }
        );
      }
      if (cleanPassword !== requiredPassword) {
        return NextResponse.json(
          {
            error: "Contraseña incorrecta para esta evaluación.",
            requiresPassword: true,
          },
          { status: 403 }
        );
      }
    }

    // Mark student attendance as "presente"
    const updatedAttendance = {
      ...(currentStudent.attendance || {}),
      [cleanQuiz]: "presente",
    };

    const updatedStudent = {
      ...currentStudent,
      attendance: updatedAttendance,
    };

    data.students[studentIndex] = updatedStudent;

    const saveResult = await writeData(data);
    if (!saveResult.success) {
      return NextResponse.json(
        { error: `Error al guardar asistencia: ${saveResult.error}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `¡Asistencia para "${cleanQuiz}" registrada exitosamente!`,
      student: updatedStudent,
    });
  } catch (err) {
    console.error("Error in register-attendance API:", err);
    return NextResponse.json(
      { error: "Error interno al procesar el registro de asistencia." },
      { status: 500 }
    );
  }
}
