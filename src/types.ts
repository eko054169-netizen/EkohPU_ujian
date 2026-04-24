export type UserRole = 'ADMIN' | 'GURU' | 'TENAGA_KEPENDIDIKAN' | 'SISWA';

export type Major = 'TKJ' | 'DKV' | 'AK' | 'BC' | 'MPLB' | 'BD';

export interface User {
  id: string;
  username: string;
  fullname: string;
  role: UserRole;
  major?: Major;
  nisn?: string;
  avatar_url?: string;
}

export interface Student extends User {
  nisn: string;
  class: string;
  major: Major;
}

export interface Attendance {
  id: string;
  user_id: string;
  date: string;
  time: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'PERMIT';
  type: 'EMPLOYEE' | 'STUDENT';
  notes?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface Question {
  id: string;
  major: Major;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'EASY' | 'HARD';
}

export interface ExamResult {
  id: string;
  student_id: string;
  score: number;
  passed: boolean;
  date: string;
  major: Major;
}
