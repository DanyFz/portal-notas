export interface Student {
  username: string;
  password: string;
  email: string;
  group: string;
  fullName: string;
  program: string;
  grades: Record<string, number | null>;
  attendance: Record<string, string>;
}

export interface StudentsData {
  students: Student[];
}
