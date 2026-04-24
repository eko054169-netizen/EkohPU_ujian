import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon, 
  TrendingUp,
  Award,
  AlertCircle
} from 'lucide-react';
import { User, ExamResult } from '../types';
import { formatDate, formatTime } from '../lib/utils';

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dummyResults: ExamResult[] = [
    { id: '1', student_id: '1', score: 85, passed: true, date: '2026-04-20', major: 'TKJ' },
    { id: '2', student_id: '1', score: 45, passed: false, date: '2026-04-18', major: 'TKJ' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header Stat Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Halo, {user.fullname}!</h1>
                <p className="text-slate-500 italic">Selamat datang kembali di portal SMK Prima Unggul.</p>
                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm text-slate-600 font-medium italic">
                    <MapPin size={16} className="text-primary" />
                    Tangerang Selatan
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm text-slate-600 font-medium italic">
                    <CalendarIcon size={16} className="text-primary" />
                    {formatDate(now)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-6 bg-primary rounded-3xl text-white shadow-xl shadow-red-500/20">
                <Clock size={28} className="mb-2" />
                <span className="text-3xl font-black">{formatTime(now).split(':')[0]}:{formatTime(now).split(':')[1]}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 italic">Waktu Lokal</span>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {user.role === 'SISWA' ? (
              <>
                <QuickStat 
                  icon={Award} 
                  label="Nilai Rata-rata" 
                  value="82.4" 
                  trend="+2.5%" 
                  color="bg-blue-500" 
                />
                <QuickStat 
                  icon={BookOpen} 
                  label="Ujian Selesai" 
                  value="12/15" 
                  trend="On Track" 
                  color="bg-green-500" 
                />
              </>
            ) : (
              <>
                <QuickStat 
                  icon={Users} 
                  label="Total Siswa" 
                  value="1,248" 
                  trend="+12 bln ini" 
                  color="bg-primary" 
                />
                <QuickStat 
                  icon={TrendingUp} 
                  label="Kehadiran Hari Ini" 
                  value="94%" 
                  trend="Sangat Baik" 
                  color="bg-blue-500" 
                />
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm h-full">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <AlertCircle size={18} className="text-primary" />
              Pengumuman Terbaru
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Ujian Tengah Semester', date: '5 Mei 2026', type: 'Akademik' },
                { title: 'Libur Hari Raya', date: '21-30 April 2026', type: 'Info' },
                { title: 'Workshop DKV 2026', date: '12 Mei 2026', type: 'Ekskul' },
              ].map((item, idx) => (
                <div key={idx} className="group p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-primary transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{item.type}</span>
                    <span className="text-[10px] text-slate-400 italic">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-700 group-hover:text-primary transition-colors">{item.title}</h4>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 text-slate-400 text-sm font-bold italic hover:text-primary transition-colors">
              Lihat Semua Pengumuman
            </button>
          </div>
        </div>
      </div>

      {user.role === 'SISWA' && (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 italic">Riwayat Nilai Ujian</h3>
            <span className="px-4 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 italic">KKM: 50</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest px-4 italic">Mata Pelajaran / Tema</th>
                  <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest px-4 italic">Tanggal</th>
                  <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest px-4 italic">Nilai</th>
                  <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest px-4 italic">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {dummyResults.map((result) => (
                  <tr key={result.id} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-700 italic">Ujian Kompetensi Keahlian - {result.major}</div>
                      <div className="text-xs text-slate-400 italic">Gelombang 1</div>
                    </td>
                    <td className="py-4 px-4 text-slate-500 italic text-sm">{result.date}</td>
                    <td className="py-4 px-4 font-black text-lg">{result.score}</td>
                    <td className="py-4 px-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider italic",
                        result.passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      )}>
                        {result.passed ? 'Lulus' : 'Remedial'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {user.role !== 'SISWA' && (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800 italic">Data Absensi Hari Ini</h3>
            <button className="text-primary font-bold text-sm italic hover:underline">Kelola Data</button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Hadir" value="28" sublabel="Guru & Staff" color="text-green-600" />
            <StatCard label="Izin" value="2" sublabel="Guru & Staff" color="text-blue-600" />
            <StatCard label="Sakit" value="1" sublabel="Guru & Staff" color="text-orange-600" />
            <StatCard label="Tanpa Ket." value="0" sublabel="Guru & Staff" color="text-slate-400" />
          </div>
        </div>
      )}
    </div>
  );
}

function QuickStat({ icon: Icon, label, value, trend, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", color)}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 italic">{label}</p>
          <p className="text-2xl font-black text-slate-800">{value}</p>
        </div>
      </div>
      <div className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full italic">{trend}</div>
    </div>
  );
}

function StatCard({ label, value, sublabel, color }: any) {
  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
      <p className={cn("text-4xl font-black mb-1", color)}>{value}</p>
      <p className="text-sm font-bold text-slate-800 mb-1">{label}</p>
      <p className="text-[10px] text-slate-400 italic">{sublabel}</p>
    </div>
  );
}
