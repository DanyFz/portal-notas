import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

// Force dynamic rendering — never cache this route
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * GET /api/students
 * Returns the students data. Storage priority:
 * 1. Vercel Blob (cloud — if BLOB_READ_WRITE_TOKEN is set)
 * 2. Local file system (public/data/students.json)
 *
 * IMPORTANT: This route is force-dynamic to ensure fresh data after uploads.
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
          // Add cache-busting query param + no-store to avoid stale CDN cache
          const bustUrl = `${latestBlob.url}${latestBlob.url.includes("?") ? "&" : "?"}t=${Date.now()}`;
          const response = await fetch(bustUrl, { cache: "no-store" });
          if (response.ok) {
            const data = await response.json();
            if (data.students && data.students.length > 0) {
              return NextResponse.json(data, {
                headers: {
                  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
                },
              });
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
        return NextResponse.json(data, {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          },
        });
      }
    } catch {
      // File doesn't exist yet, that's fine
    }

    // No data found anywhere
    return NextResponse.json({ students: [] }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ students: [] });
  }
}
