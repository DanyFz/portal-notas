import { promises as fs } from "fs";
import path from "path";
import { Student } from "./types";

export interface StoredData {
  students: Student[];
  quizPasswords?: Record<string, string>;
  customGroups?: string[];
}

/**
 * Reads student data and quiz settings from Vercel Blob or local filesystem.
 */
export async function readData(): Promise<StoredData> {
  // 1. Check Vercel Blob for admin-saved JSON
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { list } = await import("@vercel/blob");
      const { blobs } = await list();
      const jsonBlob = blobs.find(
        (b) => b.pathname.startsWith("students-data") && b.pathname.endsWith(".json")
      );

      if (jsonBlob) {
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
            return {
              students: data.students,
              quizPasswords: data.quizPasswords || {},
              customGroups: data.customGroups || [],
            };
          }
        }
      }
    } catch (err) {
      console.error("Vercel Blob read error:", err);
    }
  }

  // 2. Fallback to local filesystem
  try {
    const filePath = path.join(process.cwd(), "public", "data", "students.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    if (data && Array.isArray(data.students)) {
      return {
        students: data.students,
        quizPasswords: data.quizPasswords || {},
        customGroups: data.customGroups || [],
      };
    }
  } catch (fsErr) {
    console.warn("Local FS read warning:", fsErr);
  }

  return { students: [], quizPasswords: {}, customGroups: [] };
}

/**
 * Writes student data and quiz settings to Vercel Blob and local filesystem.
 */
export async function writeData(data: StoredData): Promise<{ success: boolean; targets: string[]; error?: string }> {
  const payload = JSON.stringify(
    {
      students: data.students,
      quizPasswords: data.quizPasswords || {},
      customGroups: data.customGroups || [],
    },
    null,
    2
  );

  let blobSaved = false;
  let localSaved = false;
  const targets: string[] = [];
  const errors: string[] = [];

  // 1. Save to Vercel Blob if token exists
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const blobResult = await put("students-data.json", payload, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
      });
      blobSaved = true;
      targets.push(`Vercel Blob (${blobResult.pathname})`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Error saving to Vercel Blob:", msg);
      errors.push(`Blob: ${msg}`);
    }
  }

  // 2. Save to local filesystem
  const cwd = process.cwd();
  const dataDir = path.join(cwd, "public", "data");
  try {
    await fs.mkdir(dataDir, { recursive: true });
    const filePath = path.join(dataDir, "students.json");
    await fs.writeFile(filePath, payload, "utf-8");
    localSaved = true;
    targets.push(`Local (${filePath})`);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`FS write error:`, msg);
    errors.push(`FS: ${msg}`);
  }

  if (!blobSaved && !localSaved) {
    return { success: false, targets: [], error: errors.join(" | ") };
  }

  return { success: true, targets };
}
