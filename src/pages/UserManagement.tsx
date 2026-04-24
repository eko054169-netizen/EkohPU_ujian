import React from 'react';
import { motion } from 'motion/react';
import { Users, UserPlus, Search, Edit2, Trash2, Shield, GraduationCap, Briefcase } from 'lucide-react';
import { cn } from '../lib/utils';
import { UserRole } from '../types';

export default function UserManagement() {
  const [activeRole, setActiveRole] = React.useState<UserRole | 'ALL'>('ALL');

  const users = [
    { id: '1', fullname: 'Eko Sanjaya', username: 'ekosanjaya', role: 'SISWA', major: 'TKJ', status: 'Active' },
    { id: '2', fullname: 'Bapak Guru Teladan, S.Pd', username: 'guru', role: 'GURU', major: 'Global', status: 'Active' },
    { id: '3', fullname: 'Siti Aminah', username: 'saminah', role: 'TENAGA_KEPENDIDIKAN', major: 'Office', status: 'Active' },
    { id: '4', fullname: 'Super Admin', username: 'admin', role: 'ADMIN', major: 'Root', status: 'Active' },
  ];

  const filteredUsers = activeRole === 'ALL' ? users : users.filter(u => u.role === activeRole);

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 mb-1 italic">Manajemen Pengguna</h1>
          <p className="text-slate-500 italic">Kelola semua akun siswa, guru, dan tenaga kependidikan SMK Prima Unggul.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 group">
          <UserPlus size={20} className="group-hover:rotate-12 transition-transform" />
          Tambah User Baru
        </button>
      </div>

      <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            {['ALL', 'SISWA', 'GURU', 'TENAGA_KEPENDIDIKAN', 'ADMIN'].map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role as any)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold transition-all italic",
                  activeRole === role ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                )}
              >
                {role.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="relative group lg:w-72">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Cari user (nama/username)..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 italic" 
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest px-4 italic">User Profile</th>
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest px-4 italic">Role / Access</th>
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest px-4 italic">Status</th>
                <th className="pb-4 font-bold text-slate-400 text-xs uppercase tracking-widest px-4 italic text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 overflow-hidden relative border-2 border-transparent group-hover:border-primary transition-colors">
                        <Users size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-700 italic">{user.fullname}</div>
                        <div className="text-xs text-slate-400 italic">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-2 mb-1">
                      {user.role === 'ADMIN' ? (
                        <Shield size={14} className="text-primary" />
                      ) : user.role === 'SISWA' ? (
                        <GraduationCap size={14} className="text-blue-500" />
                      ) : (
                        <Briefcase size={14} className="text-orange-500" />
                      )}
                      <span className="text-sm font-bold text-slate-700 italic">{user.role}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 italic font-medium uppercase tracking-wider">{user.major} Spec</div>
                  </td>
                  <td className="py-5 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider italic">
                      {user.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-red-100 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
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
