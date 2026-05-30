'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { token, role, name } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      if (name) localStorage.setItem('name', name);

      if (role === 'ADMIN') router.push('/admin');
      else if (role === 'SALES') router.push('/sales');
      else if (role === 'SANCTION') router.push('/sanction');
      else if (role === 'DISBURSEMENT') router.push('/disbursement');
      else if (role === 'COLLECTION') router.push('/collection');
      else router.push('/borrower');
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans antialiased">
      {/* Left Panel — Branding + Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

        <div className="relative z-10 flex flex-col justify-between py-10 px-10 xl:px-16 w-full">
          {/* Top — Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="CreditSea Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-xl"
            />
            <span className="text-2xl font-bold text-white">CreditSea</span>
          </Link>

          {/* Center — Illustration + Text */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-sm"
            >
              <div className="absolute -inset-6 bg-white/5 rounded-3xl blur-2xl" />
              <Image
                src="/login-illustration.png"
                alt="Welcome Back"
                width={450}
                height={400}
                className="relative z-10 w-full h-auto drop-shadow-2xl"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center mt-8"
            >
              <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
                Welcome Back
              </h1>
              <p className="mt-3 text-base text-blue-100/70 max-w-sm mx-auto leading-relaxed">
                Access your dashboard, track loan applications, and manage your finances seamlessly.
              </p>
            </motion.div>
          </div>

          {/* Bottom — Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            {[
              { icon: ShieldCheck, text: 'Secure & Encrypted' },
              { icon: Zap, text: 'Instant Updates' },
              { icon: BarChart3, text: 'Live Tracking' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <item.icon className="w-4 h-4 text-blue-200" />
                <span className="text-xs font-medium text-blue-100">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/40 px-6 py-12 relative">
        {/* Subtle bg blobs for mobile */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link href="/" className="flex items-center space-x-2 mb-10 lg:hidden">
            <Image
              src="/logo.png"
              alt="CreditSea Logo"
              width={36}
              height={36}
              className="w-9 h-9 object-contain rounded-xl"
            />
            <span className="text-xl font-bold text-slate-900">Credit<span className="text-blue-600">Sea</span></span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="email-address" className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 text-sm text-slate-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 placeholder-slate-400 transition-all shadow-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 text-sm text-slate-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 placeholder-slate-400 transition-all shadow-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-xl hover:shadow-blue-300/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-slate-400 font-medium">or</span></div>
            </div>

            <p className="text-sm text-center text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Create one for free
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
