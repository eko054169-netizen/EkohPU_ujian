import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowRight, CheckCircle2, LayoutDashboard, Database, Code, Palette, Calculator, Radio, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const MAJORS_INFO = [
  { id: 'TKJ', name: 'TKJ', full: 'Teknik Komputer Jaringan', icon: Code, color: 'bg-blue-500' },
  { id: 'DKV', name: 'DKV', full: 'Desain Komunikasi Visual', icon: Palette, color: 'bg-purple-500' },
  { id: 'AK', name: 'AK', full: 'Akuntansi', icon: Calculator, color: 'bg-green-500' },
  { id: 'BC', name: 'BC', full: 'Broadcasting', icon: Radio, color: 'bg-red-500' },
  { id: 'MPLB', name: 'MPLB', full: 'Manajemen Perkantoran', icon: Briefcase, color: 'bg-orange-500' },
  { id: 'BD', name: 'BD', full: 'Bisnis Digital', icon: LayoutDashboard, color: 'bg-cyan-500' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
            <span className="font-extrabold text-xl tracking-tight text-slate-800">SMK PRIMA UNGGUL</span>
          </div>
          <Link to="/login" className="btn-primary">
            Masuk Portal
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-red-50 rounded-l-[100px] hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Official School Portal
            </span>
            <h1 className="text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
              Membangun Generasi <br />
              <span className="text-primary italic">Unggul & Berintegritas</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl mb-10">
              SMK Prima Unggul Kota Tangerang Selatan hadir untuk mencetak tenaga profesional siap kerja di era digital dengan 6 kompetensi keahlian unggulan.
            </p>
            <div className="flex gap-4">
              <Link to="/login" className="btn-primary flex items-center gap-2 py-4">
                Mulai Ujian <ArrowRight size={20} />
              </Link>
              <button className="px-8 py-4 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                Profil Sekolah
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                alt="School" 
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-lg">Pendaftaran 2026</h4>
                    <p className="text-white/80 text-sm italic">Kota Tangerang Selatan</p>
                  </div>
                  <div className="bg-primary text-white p-3 rounded-full">
                    <GraduationCap size={24} />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-10 -left-10 bg-white p-6 rounded-3xl shadow-xl hidden xl:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center font-bold">100%</div>
                <div>
                  <h5 className="font-bold text-slate-800 leading-tight">Lulusan Terserap</h5>
                  <p className="text-xs text-slate-400 italic">Dunia Industri (IDUKA)</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Majors Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Kompetensi Keahlian</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic">Pilih keahlianmu dan jadilah ahli di bidangnya bersama pengajar berpengalaman.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MAJORS_INFO.map((major, idx) => (
              <motion.div
                key={major.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white p-8 rounded-[32px] border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6", major.color)}>
                  <major.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{major.full}</h3>
                <p className="text-slate-500 mb-6 italic leading-relaxed">Persiapkan dirimu untuk menjadi profesional di bidang {major.full} dengan kurikulum industri terkini.</p>
                <div className="flex items-center gap-2 text-primary font-bold">
                  Pelajari Lebih Lanjut <ArrowRight size={18} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          {[
            { label: 'Siswa Aktif', value: '1.2k+' },
            { label: 'Guru Profesional', value: '80+' },
            { label: 'Laboratorium', value: '12' },
            { label: 'Industri Partner', value: '25+' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-red-100 font-medium uppercase tracking-widest text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">P</div>
              <span className="font-extrabold text-2xl tracking-tight">SMK PRIMA UNGGUL</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed italic">
              Jl. SMK Prima Unggul No. 1, Kota Tangerang Selatan, Banten. <br />
              Wadah pendidikan vokasi unggulan untuk masa depan gemilang.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Navigasi</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/" className="hover:text-primary transition-colors italic">Beranda</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors italic">Portal Ujian</Link></li>
              <li><button className="hover:text-primary transition-colors italic">Profil Sekolah</button></li>
              <li><button className="hover:text-primary transition-colors italic">Kontak</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">Hubungi Kami</h4>
            <p className="text-slate-400 italic mb-4">Email: info@smkpu.sch.id</p>
            <p className="text-slate-400 italic">Phone: (021) 1234-5678</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 border-t border-slate-800 text-center text-slate-500 text-sm italic">
          &copy; 2026 SMK Prima Unggul Tangerang Selatan. Programmer Expert.
        </div>
      </footer>
    </div>
  );
}
