import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const cookieToken = req.cookies.get("admin_token")?.value;
  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const token = cookieToken || bearerToken;

  if (verifyAdminToken(token)) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json(
    { authenticated: false, error: "No autorizado" },
    { status: 401 }
  );
}
