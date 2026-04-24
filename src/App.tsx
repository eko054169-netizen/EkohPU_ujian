import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Exam from './pages/Exam';
import UserManagement from './pages/UserManagement';
import DataSiswa from './pages/DataSiswa';
import RekapAbsensi from './pages/RekapAbsensi';
import { User } from './types';
import Layout from './components/Layout';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Basic local state auth for demo purposes as requested
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to="/app" /> : <LoginPage onLogin={login} />} />
      
      <Route path="/app" element={user ? <Layout user={user} onLogout={logout} /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard user={user!} />} />
        <Route path="attendance" element={<Attendance user={user!} />} />
        <Route path="exam" element={<Exam user={user!} />} />
        <Route path="users" element={user?.role === 'ADMIN' ? <UserManagement /> : <Navigate to="/app" />} />
        <Route path="students" element={user?.role === 'ADMIN' ? <DataSiswa /> : <Navigate to="/app" />} />
        <Route path="recap" element={['ADMIN', 'GURU'].includes(user?.role || '') ? <RekapAbsensi /> : <Navigate to="/app" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
