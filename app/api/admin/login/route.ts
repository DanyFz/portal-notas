import { NextRequest, NextResponse } from "next/server";
import { ADMIN_USERNAME, ADMIN_PASSWORD, generateAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuario y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const trimmedUser = username.trim().toLowerCase();
    const expectedUser = ADMIN_USERNAME.trim().toLowerCase();

    // Constant-time-like check for security
    if (trimmedUser === expectedUser && password === ADMIN_PASSWORD) {
      const token = generateAdminToken();

      const response = NextResponse.json({
        success: true,
        message: "Autenticación exitosa",
        token,
      });

      // Set secure HTTP-only cookie
      response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response;
    }

    return NextResponse.json(
      { error: "Credenciales de administrador inválidas" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Error en el servidor al autenticar" },
      { status: 500 }
    );
  }
}
