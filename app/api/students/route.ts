import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

/**
 * GET /api/students
 * Returns the students data. Storage priority:
 * 1. Vercel Blob (cloud — if BLOB_READ_WRITE_TOKEN is set)
 * 2. Local file system (public/data/students.json)
 */
export async function GET() {
  try {
    // 1. Try Vercel Blob first (production on Vercel)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { list } = await import("@vercel/blob");
        const { blobs } = await list({ prefix: "students-data" });
        if (blobs.length > 0) {
          const latestBlob = blobs[0];
          const response = await fetch(latestBlob.url);
          if (response.ok) {
            const data = await response.json();
            if (data.students && data.students.length > 0) {
              return NextResponse.json(data);
            }
          }
        }
      } catch (err) {
        console.error("Vercel Blob read failed:", err);
        // Fall through to file system
      }
    }

    // 2. Try local file system (dev & self-hosted)
    try {
      const filePath = path.join(process.cwd(), "public", "data", "students.json");
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);
      if (data.students && data.students.length > 0) {
        return NextResponse.json(data);
      }
    } catch {
      // File doesn't exist yet, that's fine
    }

    // No data found anywhere
    return NextResponse.json({ students: [] });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ students: [] });
  }
}
