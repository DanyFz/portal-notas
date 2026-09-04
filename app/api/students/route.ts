import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/dataStore";
import { verifyAdminToken } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

/**
 * GET /api/students
 * Reads student data from Vercel Blob or local fallback
 */
export async function GET(req: NextRequest) {
  try {
    const data = await readData();

    // Check if caller is admin
    const cookieToken = req.cookies.get("admin_token")?.value;
    const authHeader = req.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;
    const isAdmin = verifyAdminToken(cookieToken || bearerToken);

    // Build quiz status map for public/students
    const quizRequiresPassword: Record<string, boolean> = {};
    if (data.quizPasswords) {
      Object.entries(data.quizPasswords).forEach(([quiz, pass]) => {
        quizRequiresPassword[quiz] = typeof pass === "string" && pass.trim().length > 0;
      });
    }

    return NextResponse.json(
      {
        students: data.students,
        customGroups: data.customGroups || [],
        quizRequiresPassword,
        // Only return plain-text passwords to authorized admin
        quizPasswords: isAdmin ? data.quizPasswords || {} : undefined,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { students: [], customGroups: [], quizRequiresPassword: {} },
      { headers: NO_CACHE_HEADERS }
    );
  }
}
