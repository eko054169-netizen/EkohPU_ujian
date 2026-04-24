import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, LogIn, ShieldCheck, GraduationCap, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { User as UserType, Major } from '../types';
import { MAJORS } from '../constants';
import { cn } from '../lib/utils';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [loginType, setLoginType] = useState<'STUDENT' | 'STAFF'>('STUDENT');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [major, setMajor] = useState<Major>('TKJ');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo Authentication Logic
    const normalizedUsername = username.toLowerCase();
    const normalizedPassword = password.toLowerCase();

    if (loginType === 'STUDENT') {
      if (normalizedUsername === 'ekosanjaya' && normalizedPassword === '123') {
        const student: UserType = {
          id: 'student-1',
          username: 'ekosanjaya',
          fullname: 'Eko Sanjaya',
          role: 'SISWA',
          major: major,
          nisn: '1234567890'
        };
        onLogin(student);
        navigate('/app');
      } else if (username && password) {
        // Any student login works in demo
        const student: UserType = {
          id: `student-${Date.now()}`,
          username: username,
          fullname: username.split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
          role: 'SISWA',
          major: major,
          nisn: Math.floor(Math.random() * 1000000000).toString()
        };
        onLogin(student);
        navigate('/app');
      } else {
        setError('Username dan Password harus diisi');
      }
    } else {
      // Staff/Teacher/Admin Login
      if (normalizedUsername === 'admin') {
        const admin: UserType = {
          id: 'admin-1',
          username: 'admin',
          fullname: 'Administrator SMKPU',
          role: 'ADMIN'
        };
        onLogin(admin);
        navigate('/app');
      } else if (normalizedUsername === 'guru') {
        const guru: UserType = {
          id: 'guru-1',
          username: 'guru',
          fullname: 'Bapak Guru Teladan, S.Pd',
          role: 'GURU'
        };
        onLogin(guru);
        navigate('/app');
      } else if (normalizedUsername === 'staff') {
        const staff: UserType = {
          id: 'staff-1',
          username: 'staff',
          fullname: 'Ibu Staff Administrasi',
          role: 'TENAGA_KEPENDIDIKAN'
        };
        onLogin(staff);
        navigate('/app');
      } else if (username && password) {
        // Generic Staff Login
        const staff: UserType = {
          id: `staff-${Date.now()}`,
          username: username,
          fullname: username.toUpperCase(),
          role: 'TENAGA_KEPENDIDIKAN'
        };
        onLogin(staff);
        navigate('/app');
      } else {
        setError('Username/Password salah');
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left side - Visual (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="grid grid-cols-8 gap-4 p-4">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="aspect-square border border-white rounded-full"></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 text-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-[40px] flex items-center justify-center mx-auto mb-8 border border-white/30"
          >
            <GraduationCap size={48} className="text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-black mb-4 tracking-tight"
          >
            Portal SMK Prima Unggul
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-red-100 text-lg italic max-w-md mx-auto leading-relaxed"
          >
            "Jadilah Unggul, Berintegritas, dan Siap Menghadapi Masa Depan"
          </motion.p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 p-6 flex flex-col items-center justify-center relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-primary font-bold transition-all group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Beranda
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Selamat Datang</h2>
            <p className="text-slate-500 italic">Silakan masuk untuk mengakses portal sekolah.</p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
            <button
              onClick={() => setLoginType('STUDENT')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300",
                loginType === 'STUDENT' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <GraduationCap size={18} />
              Siswa
            </button>
            <button
              onClick={() => setLoginType('STAFF')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300",
                loginType === 'STAFF' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <ShieldCheck size={18} />
              Guru / Staff
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                {loginType === 'STUDENT' ? 'NISN / Username' : 'Username'}
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-primary transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-300 italic"
                  placeholder={loginType === 'STUDENT' ? "Contoh: ekosanjaya" : "Contoh: admin / guru / staff"}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-slate-400 group-focus-within:text-primary transition-colors">
                  <LogIn size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 placeholder:text-slate-300 italic"
                  placeholder="Password (123 / admin / guru / staff)"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {loginType === 'STUDENT' && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Pilih Jurusan</label>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value as Major)}
                  className="w-full px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800 italic appearance-none"
                >
                  {MAJORS.map((m) => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            )}

            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-red-50 text-red-600 rounded-xl text-sm italic border border-red-100 flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}

            <button type="submit" className="w-full btn-primary py-4 text-lg font-bold">
              Masuk Sekarang
            </button>
          </form>

          <div className="mt-8 p-4 bg-slate-100/50 rounded-2xl border border-slate-200 border-dashed">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">Akun Demo (Uji Coba)</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-white rounded-lg text-[9px] text-slate-500 italic">
                <span className="font-bold text-primary">Siswa:</span> ekosanjaya / 123
              </div>
              <div className="p-2 bg-white rounded-lg text-[9px] text-slate-500 italic">
                <span className="font-bold text-primary">Admin:</span> admin / admin
              </div>
              <div className="p-2 bg-white rounded-lg text-[9px] text-slate-500 italic">
                <span className="font-bold text-primary">Guru:</span> guru / guru
              </div>
              <div className="p-2 bg-white rounded-lg text-[9px] text-slate-500 italic">
                <span className="font-bold text-primary">Staff:</span> staff / staff
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
