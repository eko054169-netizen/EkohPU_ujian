import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck, 
  Users, 
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { User, Attendance as AttendanceType } from '../types';
import { cn, formatDate, formatTime } from '../lib/utils';

interface AttendanceProps {
  user: User;
}

export default function Attendance({ user }: AttendanceProps) {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') === 'student' ? 'STUDENT' : 'EMPLOYEE';
  const [now, setNow] = useState(new Date());
  const [status, setStatus] = useState<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAttendance = () => {
    setStatus('IDLE');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setStatus('SUCCESS');
          // Add to local storage or Supabase here
        },
        () => {
          // Default to Tangerang Selatan
          setLocation({ lat: -6.29, lng: 106.72 });
          setStatus('SUCCESS');
        }
      );
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-1">
            {type === 'STUDENT' ? 'Absensi Kehadiran Siswa' : 'Absensi Mandiri Karyawan'}
          </h1>
          <p className="text-slate-500 italic">Portal pencatatan kehadiran resmi SMK Prima Unggul.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-600 flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            {formatTime(now)}
          </div>
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-600 flex items-center gap-2">
            <MapPin size={16} className="text-primary" />
            Tangerang Selatan
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Action Area */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm text-center"
          >
            <div className="w-20 h-20 bg-red-50 text-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-500/10">
              <UserCheck size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2 italic">Absen Sekarang</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed italic">
              Silakan tekan tombol di bawah untuk melakukan pengabsensian menggunakan lokasi real-time Anda.
            </p>

            {status === 'SUCCESS' ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-100 p-4 rounded-2xl mb-6 text-green-600 text-sm flex items-center justify-center gap-2 italic"
              >
                <CheckCircle2 size={18} /> Absen Berhasil Dicatat!
              </motion.div>
            ) : (
              <button 
                onClick={handleAttendance}
                className="w-full btn-primary py-4 text-lg mb-4"
              >
                Hadir
              </button>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <button className="px-4 py-3 bg-slate-50 hover:bg-red-50 hover:text-primary rounded-xl text-sm font-bold text-slate-500 transition-all italic">Izin</button>
              <button className="px-4 py-3 bg-slate-50 hover:bg-red-50 hover:text-primary rounded-xl text-sm font-bold text-slate-500 transition-all italic">Sakit</button>
            </div>
          </motion.div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              Lokasi Penjemputan Data
            </h4>
            <div className="w-full aspect-video bg-slate-100 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1526778545894-62b44c09726b?q=80&w=2070&auto=format&fit=crop" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" 
                alt="Map" 
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-primary animate-bounce">
                  <MapPin size={20} />
                </div>
                <div className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-800 italic border border-white/50">
                  Tangerang Selatan, Indonesia
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-[8px] text-slate-500 font-mono italic">
                {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : '-6.29, 106.72'}
              </div>
            </div>
          </div>
        </div>

        {/* List / History Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h3 className="text-xl font-bold text-slate-800 italic">Riwayat Kehadiran</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Cari nama/tanggal..." 
                    className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 italic" 
                  />
                </div>
                <button className="p-2 bg-slate-50 rounded-xl text-slate-500 hover:text-primary transition-colors">
                  <Filter size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="group flex items-center justify-between p-4 bg-white border border-slate-50 rounded-2xl hover:border-red-100 hover:bg-red-50/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-red-100 group-hover:text-primary transition-colors">
                      <Users size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 leading-tight">Eko Sanjaya</h5>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{type === 'STUDENT' ? 'XII TKJ 1' : 'TENAGA PENDIDIK'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-slate-700">{formatTime(now)}</span>
                    <span className="text-[10px] text-slate-400 italic">{formatDate(now)}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider italic">
                      Hadir
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3 bg-slate-50 text-slate-400 text-sm font-bold italic rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <FileText size={18} />
              Export Rekap Bulanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
