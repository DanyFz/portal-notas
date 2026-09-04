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
 * Reads student data with this priority:
 * 1. Admin-saved JSON (students-data.json) in Vercel Blob — highest priority (panel docente edits)
 * 2. Excel file (.xlsx/.xls) in Vercel Blob (original upload, parsed on the fly)
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

        const { blobs: allBlobs } = await list();
        debugInfo.blobsList = allBlobs.map((b) => ({ pathname: b.pathname, url: b.url }));

        // 1. PRIORITY: Check for admin-saved JSON blob (students-data.json)
        //    This takes precedence because it contains edits from the admin panel.
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
            if (data.students && data.students.length > 0) {
              debugInfo.source = `json-blob: ${jsonBlob.pathname} (admin-saved)`;
              return NextResponse.json(
                { students: data.students, debug: debugInfo },
                { headers: NO_CACHE_HEADERS }
              );
            }
          } else {
            debugInfo.error = `Failed to fetch json blob: ${response.status}`;
          }
        }

        // 2. FALLBACK: Check for Excel file in Vercel Blob store (original upload)
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

