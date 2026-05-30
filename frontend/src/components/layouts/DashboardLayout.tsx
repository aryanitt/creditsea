'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, CheckSquare, Banknote,
  CreditCard, LogOut, RefreshCw, ChevronRight
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      let localName = localStorage.getItem('name');
      if (!localName || localName === 'undefined') {
        try {
          const { default: apiClient } = await import('@/lib/api-client');
          const userRes = await apiClient.get('/auth/me');
          localName = userRes.data.name;
          if (localName) localStorage.setItem('name', localName);
        } catch (e) {}
      }
      setUserName(localName || 'User');
    };
    fetchUser();

    const storedRole = localStorage.getItem('role');
    if (!storedRole) {
      router.push('/');
    } else {
      setRole(storedRole);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    router.push('/');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const navItems = [
    { name: 'Admin Analytics', href: '/admin', icon: LayoutDashboard, roles: ['ADMIN'] },
    { name: 'Sales Leads', href: '/sales', icon: Users, roles: ['ADMIN', 'SALES'] },
    { name: 'Sanction Desk', href: '/sanction', icon: CheckSquare, roles: ['ADMIN', 'SANCTION'] },
    { name: 'Disbursement', href: '/disbursement', icon: Banknote, roles: ['ADMIN', 'DISBURSEMENT'] },
    { name: 'Collection', href: '/collection', icon: CreditCard, roles: ['ADMIN', 'COLLECTION'] },
  ];

  const filteredNav = navItems.filter(item => item.roles.includes(role));

  if (!role) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans antialiased text-slate-800 flex flex-col">
      {/* Ambient background glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[400px] bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl opacity-70 pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-100/20 to-purple-100/20 rounded-full blur-3xl opacity-70 pointer-events-none z-0" />

      {/* ─── NAVBAR (matches borrower dashboard exactly) ─── */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo + Brand */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="CreditSea Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain rounded-md"
                />
                <span className="text-xl font-bold text-slate-900">
                  Credit<span className="text-blue-600">Sea</span>
                  <span className="ml-1.5 text-[10px] font-semibold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded align-middle">Ops</span>
                </span>
              </Link>
            </div>

            {/* Right side — Refresh + User + Logout */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
              </button>

              <div className="h-6 w-[1px] bg-slate-200" />

              <span className="text-sm font-semibold text-slate-600 hidden sm:inline-block">
                Hello, {userName}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── BODY: Sidebar + Main ─── */}
      <div className="flex flex-1 relative z-10">

        {/* ─── SIDEBAR ─── */}
        <aside className="w-60 shrink-0 bg-white/70 backdrop-blur-sm border-r border-slate-100 flex flex-col py-6 px-3 gap-1 min-h-[calc(100vh-64px)]">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-3 mb-2">Navigation</p>
          {filteredNav.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative
                  ${isActive
                    ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-blue-600 rounded-r-full"
                  />
                )}
                <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{item.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-blue-400" />}
              </Link>
            );
          })}

          {/* Role badge at bottom */}
          <div className="mt-auto px-3 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{userName}</p>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{role}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-8 px-6 lg:px-8">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
