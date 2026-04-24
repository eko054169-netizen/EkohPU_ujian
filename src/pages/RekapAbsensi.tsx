import React from 'react';
import { motion } from 'motion/react';
import { FileText, Download, Calendar, Users } from 'lucide-react';
import { cn } from '../lib/utils';

export default function RekapAbsensi() {
  const [tab, setTab] = React.useState<'STUDENT' | 'EMPLOYEE'>('STUDENT');

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-1 italic">Rekap Absensi</h1>
        <p className="text-slate-500 italic">Laporan kehadiran harian, mingguan, dan bulanan.</p>
      </div>

      <div className="flex bg-white p-1 rounded-2xl border border-slate-100 w-fit mb-8">
        <button 
          onClick={() => setTab('STUDENT')}
          className={cn("px-6 py-2 rounded-xl text-sm font-bold italic transition-all", tab === 'STUDENT' ? "bg-primary text-white shadow-lg" : "text-slate-400")}
        >
          Absensi Siswa
        </button>
        <button 
          onClick={() => setTab('EMPLOYEE')}
          className={cn("px-6 py-2 rounded-xl text-sm font-bold italic transition-all", tab === 'EMPLOYEE' ? "bg-primary text-white shadow-lg" : "text-slate-400")}
        >
          Absensi Karyawan
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center"><Calendar size={24} /></div>
          <div><p className="text-[10px] font-bold text-slate-400 italic">Bulan Ini</p><p className="text-xl font-bold">April 2026</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center"><Users size={24} /></div>
          <div><p className="text-[10px] font-bold text-slate-400 italic">Target Peserta</p><p className="text-xl font-bold">{tab === 'STUDENT' ? '1,248 Siswa' : '84 Karyawan'}</p></div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 text-primary rounded-2xl flex items-center justify-center"><FileText size={24} /></div>
          <div><p className="text-[10px] font-bold text-slate-400 italic">Total Laporan</p><p className="text-xl font-bold">24 File</p></div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-slate-800 italic">Daftar Laporan yang Tersedia</h3>
          <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"><Download size={16} /> Download Semua</button>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl text-slate-400"><FileText size={20} /></div>
                <div>
                  <p className="font-bold text-slate-800">Laporan {tab === 'STUDENT' ? 'Siswa' : 'Karyawan'} - Minggu {i}</p>
                  <p className="text-[10px] text-slate-400 italic">Generated on 24 April 2026</p>
                </div>
              </div>
              <button className="text-primary font-bold text-xs px-4 py-2 bg-white rounded-lg border border-slate-100 hover:bg-red-50">View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
