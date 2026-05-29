import { Student, StudentsData } from "./types";

const SESSION_KEY = "portal_notas_user";

/**
 * Authenticate a student by username.
 * 1. First tries fetching from the API (Vercel Blob — cloud-persisted data).
 * 2. Falls back to the static /data/students.json (bundled example data).
 */
export async function authenticate(
  username: string
): Promise<Student | null> {
  try {
    // Primary: fetch from the API (Vercel Blob cloud storage)
    try {
      const res = await fetch("/api/students");
      if (res.ok) {
        const data: StudentsData = await res.json();
        if (data.students && data.students.length > 0) {
          const student = data.students.find(
            (s) => s.username.toLowerCase() === username.toLowerCase()
          );
          if (student) return student;
        }
      }
    } catch {
      // API not available, continue to fallback
    }

    // Fallback: try fetching from static public/data/students.json
    try {
      const res = await fetch("/data/students.json");
      if (res.ok) {
        const data: StudentsData = await res.json();
        const student = data.students.find(
          (s) => s.username.toLowerCase() === username.toLowerCase()
        );
        if (student) return student;
      }
    } catch {
      // File not available, that's fine
    }

    return null;
  } catch {
    return null;
  }
}

export function saveSession(student: Student): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(student));
  }
}

export function getSession(): Student | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Student;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

export function calculateAverage(grades: Record<string, number | null>): number | null {
  const validGrades = Object.values(grades).filter(
    (g): g is number => g !== null
  );
  if (validGrades.length === 0) return null;
  const sum = validGrades.reduce((acc, g) => acc + g, 0);
  return Math.round((sum / validGrades.length) * 100) / 100;
}
