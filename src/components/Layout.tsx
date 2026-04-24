import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  User as UserIcon, 
  ClipboardList,
  GraduationCap
} from 'lucide-react';
import { User } from '../types';
import { cn } from '../lib/utils';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  user: User;
  onLogout: () => void;
}

export default function Layout({ user, onLogout }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(window.innerWidth >= 1024);
  const location = useLocation();

  // Close sidebar on mobile when navigating
  React.useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/app', roles: ['ADMIN', 'GURU', 'TENAGA_KEPENDIDIKAN', 'SISWA'] },
    { name: 'Absensi Karyawan', icon: Calendar, path: '/app/attendance?type=employee', roles: ['ADMIN', 'GURU', 'TENAGA_KEPENDIDIKAN'] },
    { name: 'Absensi Siswa', icon: ClipboardList, path: '/app/attendance?type=student', roles: ['ADMIN', 'GURU'] },
    { name: 'Data Siswa', icon: GraduationCap, path: '/app/students', roles: ['ADMIN'] },
    { name: 'Rekap Absensi', icon: FileText, path: '/app/recap', roles: ['ADMIN', 'GURU'] },
    { name: 'Ujian Online', icon: BookOpen, path: '/app/exam', roles: ['SISWA'] },
    { name: 'User Management', icon: Users, path: '/app/users', roles: ['ADMIN'] },
  ];

  const filteredMenu = menuItems.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 lg:relative lg:translate-x-0 shadow-2xl lg:shadow-none",
          !isSidebarOpen && "-translate-x-full lg:-ml-64"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/30">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 leading-none">SMK Prima</span>
                <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Unggul Portal</span>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 lg:hidden text-slate-400">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {filteredMenu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                  (item.path === '/app' ? location.pathname === '/app' : location.pathname.startsWith(item.path))
                    ? "bg-primary text-white shadow-md shadow-red-500/20"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100 italic text-[10px] text-slate-400 text-center">
            Tangerang Selatan, Indonesia
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-sm">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 lg:flex-none"></div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-slate-800">{user.fullname}</span>
              <span className="text-xs text-slate-400 capitalize whitespace-nowrap">{user.role.toLowerCase().replace('_', ' ')}</span>
            </div>
            
            <div className="relative group">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 overflow-hidden border-2 border-white shadow-sm group-hover:border-primary transition-all">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt={user.fullname} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={20} />
                )}
              </div>
            </div>

            <button 
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-primary hover:bg-red-50 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content - THIS IS THE SCROLLABLE AREA */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative bg-slate-50">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && window.innerWidth < 1024 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
