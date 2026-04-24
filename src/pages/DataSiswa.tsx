import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Search, Filter, Plus } from 'lucide-react';

export default function DataSiswa() {
  const students = [
    { nis: '1001', nama: 'Eko Sanjaya', kelas: 'XII TKJ 1', jurusan: 'TKJ' },
    { nis: '1002', nama: 'Andi Pratama', kelas: 'XII DKV 2', jurusan: 'DKV' },
    { nis: '1003', nama: 'Sari Wahyuni', kelas: 'XI AK 1', jurusan: 'AK' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-1 italic">Master Data Siswa</h1>
          <p className="text-slate-500 italic">Daftar siswa SMK Prima Unggul Tangerang Selatan.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Tambah Siswa
        </button>
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Cari NIS atau Nama..." className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl border border-slate-100 text-sm italic" />
          </div>
          <button className="p-3 bg-slate-50 text-slate-500 rounded-xl"><Filter size={18} /></button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-widest italic">
                <th className="px-4 pb-4">NIS</th>
                <th className="px-4 pb-4">Nama Lengkap</th>
                <th className="px-4 pb-4">Kelas</th>
                <th className="px-4 pb-4">Jurusan</th>
                <th className="px-4 pb-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((s) => (
                <tr key={s.nis} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-bold text-slate-700">{s.nis}</td>
                  <td className="px-4 py-4 font-medium text-slate-600">{s.nama}</td>
                  <td className="px-4 py-4 italic text-sm">{s.kelas}</td>
                  <td className="px-4 py-4">
                    <span className="px-3 py-1 bg-red-100 text-primary rounded-full text-[10px] font-bold">{s.jurusan}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button className="text-primary font-bold text-xs hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
