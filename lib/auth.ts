import { Student, StudentsData } from "./types";

const SESSION_KEY = "portal_notas_user";
const STUDENTS_KEY = "portal_notas_students";

/**
 * Save students data to localStorage (replaces file-based storage).
 * This avoids the EROFS error on Vercel's read-only filesystem.
 */
export function saveStudentsData(students: Student[]): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify({ students }));
  }
}

/**
 * Load students data from localStorage.
 */
export function loadStudentsData(): StudentsData | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STUDENTS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StudentsData;
  } catch {
    return null;
  }
}

export async function authenticate(
  username: string,
  password: string
): Promise<Student | null> {
  try {
    // First try localStorage (uploaded data)
    const localData = loadStudentsData();
    if (localData && localData.students.length > 0) {
      const student = localData.students.find(
        (s) =>
          s.username.toLowerCase() === username.toLowerCase() &&
          s.password === password
      );
      if (student) return student;
    }

    // Fallback: try fetching from public/data/students.json (for pre-loaded data)
    try {
      const res = await fetch("/data/students.json");
      if (res.ok) {
        const data: StudentsData = await res.json();
        const student = data.students.find(
          (s) =>
            s.username.toLowerCase() === username.toLowerCase() &&
            s.password === password
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
