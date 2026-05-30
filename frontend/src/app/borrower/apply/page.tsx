'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, CreditCard, Calendar, Banknote, Briefcase, UploadCloud, 
  CheckCircle2, Sliders, ShieldCheck, ArrowRight, ArrowLeft, 
  Sparkles, X, ChevronRight, Info, LogOut
} from 'lucide-react';

const floatAnimation: any = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

function SparkleDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M12 2C12 2 12.5 7.5 13.5 8.5C14.5 9.5 20 12 20 12C20 12 14.5 12.5 13.5 13.5C12.5 14.5 12 20 12 20C12 20 11.5 14.5 10.5 13.5C9.5 12.5 4 12 4 12C4 12 9.5 11.5 10.5 10.5C11.5 7.5 12 2 12 2Z" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoanGrowthArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 85C30 80 60 80 110 85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="60" cy="75" r="12" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
      <path d="M57 71H63M57 74H62.5C64 74 64 71 62.5 71M57 77L63 77" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="45" cy="78" r="8" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
      <path d="M43 75V79" stroke="currentColor" strokeWidth="1.2" />
      <path d="M60 63C60 63 62 45 58 30C56 22 52 15 52 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M58 48C64 45 72 46 76 52C72 58 64 57 58 48Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
      <path d="M56 35C49 32 41 33 37 39C41 45 49 44 56 35Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
      <path d="M52 15C56 12 60 14 62 17C58 19 54 18 52 15Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(255,255,255,0.1)" />
      <path d="M85 20L87 25L92 27L87 29L85 34L83 29L78 27L83 25L85 20Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" className="opacity-30" />
      <path d="M25 25L26.5 29L30.5 30.5L26.5 32L25 36L23.5 32L19.5 30.5L23.5 29L25 25Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" className="opacity-30" />
      <path d="M15 45C30 40 40 50 55 42C70 34 85 38 100 35" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
    </svg>
  );
}

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
      }
    }
  }, [router]);
  
  // Step 2: Personal Details
  const [personalDetails, setPersonalDetails] = useState({
    pan: '',
    dob: '',
    monthlySalary: '',
    employmentType: 'SALARIED',
  });
  
  // Step 3: Salary Slip Upload
  const [file, setFile] = useState<File | null>(null);
  
  // Step 4: Loan Config
  const [loanConfig, setLoanConfig] = useState({
    principalAmount: 50000,
    tenureDays: 30,
  });
  
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...personalDetails,
        monthlySalary: Number(personalDetails.monthlySalary),
      };
      const res = await apiClient.post('/applications', payload);
      setApplicationId(res.data._id);
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.reason || err.response?.data?.message || 'BRE Validation Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !applicationId) return;
    setError('');
    setLoading(true);
    const formData = new FormData();
    formData.append('salarySlip', file);
    formData.append('applicationId', applicationId);
    
    try {
      await apiClient.post('/applications/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleLoanSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiClient.post('/loans', {
        applicationId,
        ...loanConfig,
      });
      router.push('/borrower');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Loan Application Failed');
    } finally {
      setLoading(false);
    }
  };

  const interestRate = 12; // 12% p.a.
  const calculateSI = () => {
    return (loanConfig.principalAmount * interestRate * loanConfig.tenureDays) / (365 * 100);
  };
  const totalRepayment = loanConfig.principalAmount + calculateSI();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans antialiased text-slate-800 flex flex-col">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-100/20 to-purple-100/20 rounded-full blur-3xl opacity-80 pointer-events-none" />

      {/* ─── NAVBAR ─── */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/borrower" className="flex items-center space-x-2">
                <Image
                  src="/logo.png"
                  alt="CreditSea Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain rounded-md"
                />
                <span className="text-xl font-bold text-slate-900">
                  Credit<span className="text-blue-600">Sea</span>
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/borrower" className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/60 hover:bg-blue-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer">
                Cancel
              </Link>
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

      {/* ─── WIZARD CONTAINER ─── */}
      <main className="flex-1 max-w-3xl w-full mx-auto py-10 px-4 sm:px-6 relative z-10 flex flex-col justify-center items-center">
        
        {/* Step progress timeline */}
        <div className="w-full mb-10">
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight text-center flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500 fill-amber-500 animate-pulse" /> Apply for a Loan
          </h1>
          
          <div className="relative mt-8 max-w-md mx-auto">
            {/* Timeline track bar */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 -translate-y-1/2 transition-all duration-500 z-0" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />

            {/* Timeline nodes */}
            <div className="relative z-10 flex justify-between">
              {[
                { s: 1, label: 'Profile', icon: User },
                { s: 2, label: 'Income', icon: UploadCloud },
                { s: 3, label: 'Configure', icon: Sliders },
              ].map((node) => {
                const isCompleted = step > node.s;
                const isActive = step === node.s;
                return (
                  <div key={node.s} className="flex flex-col items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-slate-50 transition-all duration-300 font-bold shadow-md
                        ${isCompleted ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white' : ''}
                        ${isActive ? 'bg-white text-blue-600 scale-110 border-blue-600 shadow-blue-100' : ''}
                        ${!isActive && !isCompleted ? 'bg-slate-200 text-slate-400' : ''}
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        <node.icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider mt-2 transition-colors duration-300
                      ${isActive ? 'text-blue-600 font-extrabold' : 'text-slate-400'}
                    `}>
                      {node.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Error notification alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full bg-red-50 border border-red-100 text-red-700 p-4 rounded-2xl mb-6 shadow-sm flex items-center gap-3"
            >
              <Info className="w-5 h-5 text-red-500 shrink-0" />
              <div className="text-sm font-semibold">{error}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── SLIDING STEP FORMS ─── */}
        <div className="w-full relative">
          <AnimatePresence mode="wait">
            
            {/* ─── STEP 1 CARD ─── */}
            {step === 1 && (
              <motion.form 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                onSubmit={handlePersonalSubmit} 
                className="w-full space-y-6 bg-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 relative overflow-hidden"
              >
                {/* Embedded Faint Artwork background */}
                <div className="absolute -right-6 -bottom-6 w-36 h-36 text-blue-500/5 pointer-events-none z-0">
                  <LoanGrowthArt className="w-full h-full" />
                </div>
                
                <motion.div 
                  className="absolute top-8 right-8 text-blue-300 w-8 h-8 pointer-events-none"
                  variants={floatAnimation}
                  animate="animate"
                >
                  <SparkleDoodle />
                </motion.div>

                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Personal & Eligibility Details</h2>
                  <p className="text-xs text-slate-400 font-medium mb-6">Enter your credentials below to run standard BRE check.</p>
                  
                  <div className="space-y-4">
                    {/* PAN Number Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">PAN Number</label>
                      <div className="relative group">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          type="text" 
                          required 
                          value={personalDetails.pan} 
                          onChange={(e) => setPersonalDetails({...personalDetails, pan: e.target.value.toUpperCase()})} 
                          className="block w-full pl-11 pr-4 py-3 text-sm text-slate-900 bg-slate-50/50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner outline-none" 
                          placeholder="ABCDE1234F"
                        />
                      </div>
                    </div>

                    {/* Date of Birth Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Date of Birth</label>
                      <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          type="date" 
                          required 
                          value={personalDetails.dob} 
                          onChange={(e) => setPersonalDetails({...personalDetails, dob: e.target.value})} 
                          className="block w-full pl-11 pr-4 py-3 text-sm text-slate-900 bg-slate-50/50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner outline-none"
                        />
                      </div>
                    </div>

                    {/* Monthly Salary Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Monthly Salary (₹)</label>
                      <div className="relative group">
                        <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                          type="number" 
                          required 
                          value={personalDetails.monthlySalary} 
                          onChange={(e) => setPersonalDetails({...personalDetails, monthlySalary: e.target.value})} 
                          className="block w-full pl-11 pr-4 py-3 text-sm text-slate-900 bg-slate-50/50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner outline-none" 
                          placeholder="25000"
                        />
                      </div>
                    </div>

                    {/* Employment Type Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Employment Type</label>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                        <select 
                          value={personalDetails.employmentType} 
                          onChange={(e) => setPersonalDetails({...personalDetails, employmentType: e.target.value})} 
                          className="block w-full pl-11 pr-4 py-3 text-sm text-slate-900 bg-slate-50/50 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-inner outline-none cursor-pointer"
                        >
                          <option value="SALARIED">Salaried Employee</option>
                          <option value="SELF_EMPLOYED">Self Employed</option>
                          <option value="UNEMPLOYED">Unemployed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:shadow-xl hover:shadow-blue-300/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-1.5 mt-8 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Check Eligibility & Next <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
            
            {/* ─── STEP 2 CARD ─── */}
            {step === 2 && (
              <motion.form 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                onSubmit={handleUploadSubmit} 
                className="w-full space-y-6 bg-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 relative overflow-hidden"
              >
                {/* Embedded Faint Artwork background */}
                <div className="absolute -right-6 -bottom-6 w-36 h-36 text-blue-500/5 pointer-events-none z-0">
                  <LoanGrowthArt className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Upload Salary Slip</h2>
                  <p className="text-xs text-slate-400 font-medium mb-6">Please upload your most recent salary slip. Formats: PDF, PNG, JPG (Max: 5MB).</p>
                  
                  {/* Neomorphic upload zone */}
                  <div className="border-2 border-dashed border-blue-200 hover:border-blue-500/80 rounded-2xl p-8 bg-slate-50/50 hover:bg-slate-50 flex flex-col items-center justify-center cursor-pointer transition-all relative group">
                    <input 
                      type="file" 
                      required 
                      accept=".pdf,image/png,image/jpeg,image/jpg" 
                      onChange={(e) => setFile(e.target.files?.[0] || null)} 
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
                    />
                    
                    <UploadCloud className="w-12 h-12 text-blue-400/80 group-hover:text-blue-600 mb-3 transition-colors stroke-[1.5] group-hover:scale-110 duration-300" />
                    
                    {file ? (
                      <div className="space-y-2 text-center relative z-30">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100">
                          <CheckCircle2 className="w-3.5 h-3.5" /> File Selected
                        </span>
                        <p className="text-sm font-bold text-slate-800 max-w-xs truncate">{file.name}</p>
                        <p className="text-xs text-slate-400">Size: {(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-700">Drag and drop salary slip here</p>
                        <p className="text-xs text-slate-400 mt-1">or click to browse local files</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-5 py-3.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={!file || loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:shadow-xl hover:shadow-blue-300/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Upload & Continue <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
            
            {/* ─── STEP 3 CARD ─── */}
            {step === 3 && (
              <motion.form 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                onSubmit={handleLoanSubmit} 
                className="w-full space-y-6 bg-white p-6 sm:p-10 rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 relative overflow-hidden"
              >
                {/* Embedded Faint Artwork background */}
                <div className="absolute -right-6 -bottom-6 w-36 h-36 text-blue-500/5 pointer-events-none z-0">
                  <LoanGrowthArt className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Loan Configuration</h2>
                  <p className="text-xs text-slate-400 font-medium mb-6">Fine tune your requested loan principal and repayment duration.</p>
                  
                  <div className="space-y-6">
                    {/* Slider 1: Loan Amount */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Loan Amount</label>
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                          <span className="text-sm font-semibold text-slate-400 mr-1.5">₹</span>
                          <input 
                            type="number" 
                            value={loanConfig.principalAmount || ''} 
                            onChange={(e) => setLoanConfig({...loanConfig, principalAmount: e.target.value === '' ? 0 : Number(e.target.value)})}
                            className="bg-transparent border-none focus:ring-0 text-right font-extrabold text-slate-900 w-24 p-0 text-sm focus:outline-none"
                            placeholder="Amount"
                          />
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min="50000" 
                        max="500000" 
                        step="10000" 
                        value={loanConfig.principalAmount} 
                        onChange={(e) => setLoanConfig({...loanConfig, principalAmount: Number(e.target.value)})} 
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3" 
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-semibold">
                        <span>₹50K</span>
                        <span>₹5L</span>
                      </div>
                    </div>
                    
                    {/* Slider 2: Tenure */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Tenure duration</label>
                        <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                          <input 
                            type="number" 
                            value={loanConfig.tenureDays || ''} 
                            onChange={(e) => setLoanConfig({...loanConfig, tenureDays: e.target.value === '' ? 0 : Number(e.target.value)})}
                            className="bg-transparent border-none focus:ring-0 text-right font-extrabold text-slate-900 w-16 p-0 text-sm focus:outline-none"
                            placeholder="Days"
                          />
                          <span className="text-xs font-semibold text-slate-400 ml-1.5">Days</span>
                        </div>
                      </div>
                      <input 
                        type="range" 
                        min="30" 
                        max="365" 
                        step="1" 
                        value={loanConfig.tenureDays} 
                        onChange={(e) => setLoanConfig({...loanConfig, tenureDays: Number(e.target.value)})} 
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-3" 
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-semibold">
                        <span>30 Days</span>
                        <span>365 Days</span>
                      </div>
                    </div>
                  </div>

                  {/* Neomorphic Summary panel */}
                  <div className="mt-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Repayment Summary</h3>
                    
                    <div className="space-y-3 text-xs font-semibold">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Principal Amount:</span>
                        <span className="text-slate-800">₹{loanConfig.principalAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Interest (12% p.a.):</span>
                        <span className="text-slate-800">₹{calculateSI().toFixed(2)}</span>
                      </div>
                      <div className="border-t border-slate-200/50 pt-3 flex justify-between items-center mt-2.5">
                        <span className="text-slate-900">Total Repayment Amount:</span>
                        <span className="font-extrabold text-blue-600 text-lg">₹{totalRepayment.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-3.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl hover:shadow-xl hover:shadow-blue-300/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" /> Submit Application
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.form>
            )}
            
          </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
