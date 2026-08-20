import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { parseExcelFile } from "@/lib/parseExcel";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
};

/**
 * GET /api/students
 * Reads student data from:
 * 1. Excel file (.xlsx/.xls) in Vercel Blob (parsed on the fly)
 * 2. Pre-processed JSON (students-data.json) in Vercel Blob
 * 3. Local file system fallback (public/data/students.json)
 */
export async function GET() {
  const debugInfo: any = {
    hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
    source: "none",
    excelBlobFound: null,
    jsonBlobFound: null,
    blobsList: [],
    error: null,
    warnings: [],
  };

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { list } = await import("@vercel/blob");

        // 1. Check for Excel file in Vercel Blob store
        const { blobs: allBlobs } = await list();
        debugInfo.blobsList = allBlobs.map((b) => ({ pathname: b.pathname, url: b.url }));

        const excelBlob = allBlobs.find(
          (b) => b.pathname.endsWith(".xlsx") || b.pathname.endsWith(".xls")
        );

        if (excelBlob) {
          debugInfo.excelBlobFound = excelBlob.pathname;
          const bustUrl = `${excelBlob.url}${excelBlob.url.includes("?") ? "&" : "?"}t=${Date.now()}`;
          const response = await fetch(bustUrl, {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            },
          });

          if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            const { students, warnings } = parseExcelFile(arrayBuffer);
            debugInfo.warnings = warnings;

            if (students.length > 0) {
              debugInfo.source = `excel-blob: ${excelBlob.pathname}`;
              return NextResponse.json(
                { students, debug: debugInfo },
                { headers: NO_CACHE_HEADERS }
              );
            }
          } else {
            debugInfo.error = `Failed to fetch excel blob: ${response.status} ${response.statusText}`;
          }
        }

        // 2. Fall back to pre-processed JSON blob (students-data.json)
        const { blobs: jsonBlobs } = await list({ prefix: "students-data" });
        if (jsonBlobs.length > 0) {
          const latestBlob = jsonBlobs[0];
          debugInfo.jsonBlobFound = latestBlob.pathname;
          const bustUrl = `${latestBlob.url}${latestBlob.url.includes("?") ? "&" : "?"}t=${Date.now()}`;
          const response = await fetch(bustUrl, {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.students && data.students.length > 0) {
              debugInfo.source = `json-blob: ${latestBlob.pathname}`;
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

    // 3. Fallback to local file system
    try {
      const filePath = path.join(process.cwd(), "public", "data", "students.json");
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = JSON.parse(fileContent);
      if (data.students && data.students.length > 0) {
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
    return NextResponse.json({ students: [], debug: debugInfo });
  }
}

