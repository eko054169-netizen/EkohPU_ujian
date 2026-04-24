-- Tabel Profil Pengguna (Disinkronkan dengan Auth)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  fullname TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('ADMIN', 'GURU', 'TENAGA_KEPENDIDIKAN', 'SISWA')),
  major TEXT CHECK (major IN ('TKJ', 'DKV', 'AK', 'BC', 'MPLB', 'BD')),
  nisn TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Tabel Siswa (Detail tambahan)
CREATE TABLE students (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  nisn TEXT UNIQUE NOT NULL,
  class TEXT NOT NULL,
  major TEXT NOT NULL,
  PRIMARY KEY (user_id)
);

-- Tabel Absensi
CREATE TABLE attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  time TIME DEFAULT CURRENT_TIME NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'PERMIT')),
  type TEXT NOT NULL CHECK (type IN ('EMPLOYEE', 'STUDENT')),
  notes TEXT,
  location JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabel Soal Ujian
CREATE TABLE questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  major TEXT NOT NULL,
  text TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('EASY', 'HARD')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Tabel Hasil Ujian
CREATE TABLE exam_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  major TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;

-- Policy: Profiles bisa dilihat semua yang login
CREATE POLICY "Public profiles are viewable by everyone logged in" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy: User bisa edit profile sendiri
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policy: Absensi hanya bisa dilihat oleh user itu sendiri atau guru/admin
CREATE POLICY "Users can view own attendance" ON attendance
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('GURU', 'ADMIN'))
  );

-- Policy: User bisa tambah absensi sendiri
CREATE POLICY "Users can insert own attendance" ON attendance
  FOR INSERT WITH CHECK (auth.uid() = user_id);
