import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

/**
 * GET /api/students
 * Reads student data from:
 * 1. Admin-saved JSON (students-data.json) in Vercel Blob
 * 2. Local file system fallback (public/data/students.json)
 */
export async function GET() {
  const debugInfo: any = {
    hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    source: "none",
    jsonBlobFound: null,
    blobsList: [],
    error: null,
  };

  try {
    // 1. Check Vercel Blob for admin-saved JSON
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { list } = await import("@vercel/blob");

        const { blobs: allBlobs } = await list();
        debugInfo.blobsList = allBlobs.map((b) => ({ pathname: b.pathname, url: b.url }));

        const jsonBlob = allBlobs.find(
          (b) => b.pathname.startsWith("students-data") && b.pathname.endsWith(".json")
        );

        if (jsonBlob) {
          debugInfo.jsonBlobFound = jsonBlob.pathname;
          const bustUrl = `${jsonBlob.url}${jsonBlob.url.includes("?") ? "&" : "?"}t=${Date.now()}`;
          const response = await fetch(bustUrl, {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data && Array.isArray(data.students)) {
              debugInfo.source = `json-blob: ${jsonBlob.pathname}`;
              return NextResponse.json(
                { students: data.students, debug: debugInfo },
                { headers: NO_CACHE_HEADERS }
              );
            }
          } else {
            debugInfo.error = `Failed to fetch json blob: ${response.status}`;
          }
        }
      } catch (err) {
        console.error("Vercel Blob read failed:", err);
        debugInfo.error = err instanceof Error ? err.message : String(err);
      }
    }

    // 2. Fallback to local file system
    try {
      const filePath = path.join(process.cwd(), "public", "data", "students.json");
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);
      if (data && Array.isArray(data.students)) {
        debugInfo.source = "local-fs: public/data/students.json";
        return NextResponse.json(
          { students: data.students, debug: debugInfo },
          { headers: NO_CACHE_HEADERS }
        );
      }
    } catch (fsErr) {
      debugInfo.error =
        (debugInfo.error || "") +
        " | FS error: " +
        (fsErr instanceof Error ? fsErr.message : String(fsErr));
    }

    return NextResponse.json(
      { students: [], debug: debugInfo },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error("Error fetching students:", error);
    debugInfo.error = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ students: [], debug: debugInfo }, { headers: NO_CACHE_HEADERS });
  }
}
