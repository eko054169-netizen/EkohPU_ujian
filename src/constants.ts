import { Question, Major } from './types';

export const MAJORS = [
  { id: 'TKJ', name: 'Teknik Komputer Jaringan' },
  { id: 'DKV', name: 'Desain Komunikasi Visual' },
  { id: 'AK', name: 'Akuntansi' },
  { id: 'BC', name: 'Broadcasting' },
  { id: 'MPLB', name: 'Manajemen Perkantoran dan Layanan Bisnis' },
  { id: 'BD', name: 'Bisnis Digital' }
];

export const KKM = 50;

export const GENERIC_QUESTIONS: Record<Major, Question[]> = {
  TKJ: Array.from({ length: 30 }, (_, i) => ({
    id: `tkj-${i}`,
    major: 'TKJ',
    text: i % 2 === 0 ? `Apa fungsi dari Router pada jaringan level ${i}?` : `Bagaimana cara konfigurasi IP Address pada Linux OS?`,
    options: ['Menghubungkan jaringan', 'Mengamankan data', 'Mempercepat internet', 'Semua benar'],
    correctAnswer: 0,
    difficulty: i % 5 === 0 ? 'HARD' : 'EASY'
  })),
  DKV: Array.from({ length: 30 }, (_, i) => ({
    id: `dkv-${i}`,
    major: 'DKV',
    text: i % 2 === 0 ? `Prinsip desain apa yang menekankan pada keseimbangan visual?` : `Format gambar apa yang mendukung transparansi?`,
    options: ['Balance', 'Contrast', 'Hierarchy', 'Repetition'],
    correctAnswer: 0,
    difficulty: i % 5 === 0 ? 'HARD' : 'EASY'
  })),
  AK: Array.from({ length: 30 }, (_, i) => ({
    id: `ak-${i}`,
    major: 'AK',
    text: i % 2 === 0 ? `Apa itu Debet dan Kredit?` : `Sebutkan laporan keuangan utama dalam akuntansi!`,
    options: ['Catatan keuangan', 'Jenis Pajak', 'Modal usaha', 'Piutang'],
    correctAnswer: 0,
    difficulty: i % 5 === 0 ? 'HARD' : 'EASY'
  })),
  BC: Array.from({ length: 30 }, (_, i) => ({
    id: `bc-${i}`,
    major: 'BC',
    text: i % 2 === 0 ? `Apa fungsi dari Lensa Prime?` : `Sebutkan teknik pengambilan gambar 'Bird Eye View'!`,
    options: ['Fokus tetap', 'Zoom besar', 'Wide angle', 'Macro'],
    correctAnswer: 0,
    difficulty: i % 5 === 0 ? 'HARD' : 'EASY'
  })),
  MPLB: Array.from({ length: 30 }, (_, i) => ({
    id: `mplb-${i}`,
    major: 'MPLB',
    text: i % 2 === 0 ? `Bagaimana cara pengarsipan surat yang baik?` : `Apa itu etika perkantoran?`,
    options: ['Sistematis', 'Acak', 'Sesuai warna', 'Terserah'],
    correctAnswer: 0,
    difficulty: i % 5 === 0 ? 'HARD' : 'EASY'
  })),
  BD: Array.from({ length: 30 }, (_, i) => ({
    id: `bd-${i}`,
    major: 'BD',
    text: i % 2 === 0 ? `Apa itu SEO dalam pemasaran digital?` : `Sebutkan platform marketplace terpopuler!`,
    options: ['Search Engine Optimization', 'Social Engine Option', 'Super Easy Operation', 'Semua salah'],
    correctAnswer: 0,
    difficulty: i % 5 === 0 ? 'HARD' : 'EASY'
  }))
};
