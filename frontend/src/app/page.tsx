'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet, Zap, CalendarClock, FileX2, ShieldOff, Globe,
  ClipboardCheck, Upload, Banknote, UserCircle, Briefcase, Flag, ChevronRight, Menu, X,
  Users, TrendingUp, ShieldCheck, BarChart3, Calculator, Mail, Lock, User, LogIn, UserPlus,
  Laptop, Car, Coins, ReceiptText, Plane, Home, Sparkles
} from 'lucide-react';
import { useState, useMemo } from 'react';

const floatAnimation: any = {
  animate: {
    y: [0, -12, 0],
    rotate: [0, 6, -6, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const floatDelayedAnimation: any = {
  animate: {
    y: [0, 10, 0],
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 1.5,
    },
  },
};

const floatSlowerAnimation: any = {
  animate: {
    y: [0, -15, 0],
    rotate: [0, 4, -4, 0],
    transition: {
      duration: 9,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 0.5,
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

function RupeeDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 4H18M6 9H16C18.5 9 18.5 4 16 4M6 14H12L18 20M6 9H12M6 14H18" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CurlyArrowDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M6 12C12 8 20 6 28 12C36 18 38 28 32 34C28 38 20 38 16 32C12 26 14 18 20 14C26 10 36 14 42 22M42 22L36 20M42 22L38 28" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SquiggleDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 10C10 15 15 15 20 10C25 5 30 5 35 10C40 15 45 15 50 10C55 5 57 8 58 10" 
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PercentDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PlusMinusDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5 7H13M9 3V11M5 18H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoanGrowthArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Sketched ground/hump */}
      <path d="M10 85C30 80 60 80 110 85" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Sketched base coin */}
      <circle cx="60" cy="75" r="12" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
      {/* Rupee sign on base coin */}
      <path d="M57 71H63M57 74H62.5C64 74 64 71 62.5 71M57 77L63 77" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Another overlapping sketched coin */}
      <circle cx="45" cy="78" r="8" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
      <path d="M43 75V79" stroke="currentColor" strokeWidth="1.2" />

      {/* Growing stem */}
      <path d="M60 63C60 63 62 45 58 30C56 22 52 15 52 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Leaves */}
      <path d="M58 48C64 45 72 46 76 52C72 58 64 57 58 48Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
      <path d="M56 35C49 32 41 33 37 39C41 45 49 44 56 35Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.08)" />
      
      {/* Little baby sprout leaf at the top */}
      <path d="M52 15C56 12 60 14 62 17C58 19 54 18 52 15Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(255,255,255,0.1)" />

      {/* Sparkles around growth */}
      <path d="M85 20L87 25L92 27L87 29L85 34L83 29L78 27L83 25L85 20Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" className="opacity-30" />
      <path d="M25 25L26.5 29L30.5 30.5L26.5 32L25 36L23.5 32L19.5 30.5L23.5 29L25 25Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" className="opacity-30" />
      
      {/* Flowy wind line */}
      <path d="M15 45C30 40 40 50 55 42C70 34 85 38 100 35" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="opacity-40" />
    </svg>
  );
}

function LoanAmountArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M50 20C40 20 30 25 30 35C30 45 42 50 42 65C30 67 15 72 15 80C15 85 85 85 85 80C85 72 70 67 58 65C58 50 70 45 70 35C70 25 60 20 50 20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35 30C35 30 42 28 50 28C58 28 65 30 65 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="78" r="6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="72" cy="78" r="6" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="50" cy="75" r="8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M48 72H52M48 75H51.5C52.5 75 52.5 73 51.5 73M48 77L52 77" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M20 35L22 38L25 35" stroke="currentColor" strokeWidth="1.2" />
      <path d="M80 40L82 43L85 40" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function QuickDisbursalArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="55" r="28" stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 27V18M45 18H55M50 38V55L62 62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 35C24 38 20 44 23 48" stroke="currentColor" strokeWidth="1.5" />
      <path d="M72 35C76 38 80 44 77 48" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 65L25 60L20 70L30 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M85 65L75 60L80 70L70 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FlexibleRepaymentArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="20" y="30" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 42H60M30 24V32M50 24V32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="35" cy="52" r="2" fill="currentColor" />
      <circle cx="45" cy="52" r="2" fill="currentColor" />
      <circle cx="35" cy="60" r="2" fill="currentColor" />
      <circle cx="45" cy="60" r="2" fill="currentColor" />
      <path d="M55 60C68 62 78 52 78 40C78 28 65 22 52 28M52 28L58 24M52 28L58 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function NoPaperworkArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M25 20H55L75 40V80C75 85 70 85 65 85H25C20 85 15 85 15 80V25C15 20 20 20 25 20Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M55 20V40H75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M25 45H45M25 55H55M25 65H40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="65" cy="65" r="14" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
      <path d="M59 59L71 71M71 59L59 71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function NoCollateralArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 75V45L50 20L80 45V75H20Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 75V55H58V75" stroke="currentColor" strokeWidth="1.5" />
      <rect x="52" y="55" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="white" className="text-slate-900" />
      <path d="M58 55V48C58 43 68 43 68 48V55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="63" cy="63" r="2" fill="currentColor" />
    </svg>
  );
}

function OnlineProcessArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="35" y="15" width="30" height="60" rx="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="50" cy="68" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M35 22H65" stroke="currentColor" strokeWidth="1.2" />
      <path d="M55 45L68 55L60 58L65 68L60 70L55 60L48 62L55 45Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(255,255,255,0.05)" />
      <path d="M25 45C22 35 30 25 40 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
      <path d="M75 55C78 65 70 75 60 78" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

function TrustUsersArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="60" cy="40" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M40 75C40 60 50 55 60 55C70 55 80 60 80 75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="35" cy="48" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 78C20 68 28 65 35 65C40 65 45 68 47 72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="85" cy="48" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M100 78C100 68 92 65 85 65C80 65 75 68 73 72" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 15C58 10 52 10 50 15C48 20 60 25 60 25C60 25 72 20 70 15C68 10 62 10 60 15Z" stroke="currentColor" strokeWidth="1.2" fill="rgba(255,255,255,0.05)" />
    </svg>
  );
}

function TrustCreditBuilderArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M30 65C30 50 45 42 60 42C75 42 90 50 90 65C90 75 75 82 60 82C45 82 30 75 30 65Z" stroke="currentColor" strokeWidth="1.5" />
      <rect x="90" y="58" width="8" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M42 42L35 30L52 38" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="42" y="82" width="8" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="70" y="82" width="8" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M60 42V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 28C65 25 72 26 74 30C70 34 64 33 60 28Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
      <path d="M60 22C55 19 48 20 46 24C50 28 56 27 60 22Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
    </svg>
  );
}

function TrustSecurityArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M60 15C60 15 30 25 30 50C30 75 60 85 60 85C60 85 90 75 90 50C90 25 60 15 60 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="rgba(255,255,255,0.05)" />
      <path d="M60 25V75" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M45 50L55 60L75 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 25L17 28L20 25L17 22L15 25Z" stroke="currentColor" strokeWidth="1" />
      <path d="M100 35L102 38L105 35L102 32L100 35Z" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function TrustKeyStatsArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="25" y="60" width="12" height="25" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="45" y="45" width="12" height="40" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="65" y="30" width="12" height="55" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="85" y="15" width="12" height="70" rx="3" stroke="currentColor" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
      <path d="M20 70L31 52L51 38L71 22L91 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M91 8L82 6M91 8L89 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const fadeUp: any = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const features = [
  { icon: Wallet, title: 'Loan Amount', desc: '₹2,000 – ₹2,00,000', art: LoanAmountArt },
  { icon: Zap, title: 'Quick Disbursal', desc: 'Funds to your bank in 2 minutes', art: QuickDisbursalArt },
  { icon: CalendarClock, title: 'Flexible Repayment', desc: 'Choose between 2 to 36 months', art: FlexibleRepaymentArt },
  { icon: FileX2, title: 'No Paperwork', desc: 'Just PAN, Aadhaar, and bank statement', art: NoPaperworkArt },
  { icon: ShieldOff, title: 'No Collateral Needed', desc: 'Get funds without pledging any assets', art: NoCollateralArt },
  { icon: Globe, title: '100% Online Process', desc: 'Apply, upload, and receive money', art: OnlineProcessArt },
];

const steps = [
  { icon: ClipboardCheck, title: 'Apply Online', desc: 'Fill out a quick application form with your basic personal and financial details. No paperwork needed.' },
  { icon: Upload, title: 'Get Express Approval', desc: 'Once your details are reviewed, CreditSea will instantly share your loan offer for approval.' },
  { icon: Banknote, title: 'Receive Funds Promptly', desc: 'Accept the offer and get the loan amount credited to your bank account within minutes.' },
];

const eligibility = [
  { icon: UserCircle, title: 'Age', desc: 'Between 23 and 50 years', art: TrustUsersArt },
  { icon: Briefcase, title: 'Monthly Income', desc: 'Minimum ₹25,000 / month', art: LoanAmountArt },
  { icon: Flag, title: 'Nationality', desc: 'Must be a Resident Indian Citizen', art: OnlineProcessArt },
  { icon: Briefcase, title: 'Work Experience', desc: 'At least 1 year in current job/profession', art: TrustKeyStatsArt },
];


function EMICalculator({
  setAuthTab,
  setAuthModalOpen,
}: {
  setAuthTab: (tab: 'login' | 'register') => void;
  setAuthModalOpen: (open: boolean) => void;
}) {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenure, setTenure] = useState(90);

  const calc = useMemo(() => {
    const P = loanAmount;
    const rate = 12; // 12% p.a.
    const T = tenure; // in Days
    // Simple Interest: SI = (P * R * T) / (365 * 100)
    const interestAmount = (P * rate * T) / (365 * 100);
    const totalPayment = P + interestAmount;
    // Monthly equivalent EMI (assuming 30 days per month)
    const emi = T >= 30 ? (totalPayment / (T / 30)) : totalPayment;
    const principalPercent = (P / totalPayment) * 100;
    return { 
      emi: Math.round(emi), 
      totalPayment: Math.round(totalPayment), 
      totalInterest: Math.round(interestAmount), 
      principalPercent 
    };
  }, [loanAmount, tenure]);

  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <section id="calculator" className="relative py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      {/* Modern mesh background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

      {/* Floating Math Doodles */}
      <motion.div 
        className="absolute top-1/4 left-[6%] text-blue-300 w-12 h-12 hidden lg:block pointer-events-none"
        variants={floatAnimation}
        animate="animate"
      >
        <PercentDoodle />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-[6%] text-indigo-300 w-10 h-10 hidden lg:block pointer-events-none"
        variants={floatDelayedAnimation}
        animate="animate"
      >
        <PlusMinusDoodle />
      </motion.div>

      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold">
            <Calculator className="w-4 h-4" /> EMI Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Calculate your EMI</h2>
          <p className="mt-3 text-base text-slate-500">Plan your loan repayment before you apply</p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeUp}
          custom={1}
          className="bg-white rounded-3xl shadow-xl shadow-blue-100/30 border border-gray-100 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — Sliders */}
            <div className="p-8 lg:p-10 space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-700">Loan Amount:</label>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                    <span className="text-sm font-bold text-slate-500">₹</span>
                    <span className="text-sm font-bold text-slate-900">{loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={500000}
                  step={10000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-gray-200 appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                  <span>₹50K</span><span>₹1.5L</span><span>₹2.5L</span><span>₹3.5L</span><span>₹4.5L</span><span>₹5L</span>
                </div>
              </div>

              {/* Fixed Interest Rate Display */}
              <div className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border border-blue-100/50 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-0.5">Fixed Interest Rate</span>
                  <span className="text-xs font-medium text-slate-400">Fixed rate of interest p.a.</span>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-sm px-4 py-2 rounded-xl shadow-md shadow-blue-500/10">
                  12% p.a.
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-slate-700">Tenure duration:</label>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Days</span>
                    <span className="text-sm font-bold text-slate-900">{tenure}</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={30}
                  max={365}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-gray-200 appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1.5 font-medium">
                  <span>30 Days</span><span>90 Days</span><span>180 Days</span><span>270 Days</span><span>365 Days</span>
                </div>
              </div>
            </div>

            {/* Right — Chart + Summary */}
            <div className="p-8 lg:p-10 bg-gradient-to-br from-slate-50 to-blue-50/40 flex flex-col items-center justify-center">
              {/* Pie Chart */}
              <div className="relative w-52 h-52 mb-8">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90 drop-shadow-lg">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                  <circle
                    cx="18" cy="18" r="15.9" fill="none"
                    stroke="url(#grad)" strokeWidth="3.5"
                    strokeDasharray={`${calc.principalPercent} ${100 - calc.principalPercent}`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-slate-400 font-medium">Total</span>
                  <span className="text-lg font-bold text-slate-900">{fmt(calc.totalPayment)}</span>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                  <span className="text-xs text-slate-500 font-medium">Principal</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="text-xs text-slate-500 font-medium">Interest</span>
                </div>
              </div>

              {/* Summary */}
              <div className="w-full space-y-3">
                {[
                  { label: 'Loan Amount', value: fmt(loanAmount) },
                  { label: 'Equivalent Monthly EMI', value: fmt(calc.emi), highlight: true },
                  { label: 'Total Interest', value: fmt(calc.totalInterest) },
                  { label: 'Total Payment', value: fmt(calc.totalPayment) },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-2 px-4 rounded-xl bg-white/80 border border-gray-100">
                    <span className="text-sm text-slate-500 font-medium">{row.label}</span>
                    <span className={`text-sm font-bold ${row.highlight ? 'text-blue-600' : 'text-slate-900'}`}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Apply Button */}
              <button
                onClick={() => { setAuthTab('register'); setAuthModalOpen(true); }}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-300/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Apply for This Loan <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Auth Drawer States
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (authTab === 'login') {
        const response = await apiClient.post('/auth/login', { email, password });
        const { token, role, name: returnedName } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        if (returnedName) localStorage.setItem('name', returnedName);

        if (role === 'ADMIN') router.push('/admin');
        else if (role === 'SALES') router.push('/sales');
        else if (role === 'SANCTION') router.push('/sanction');
        else if (role === 'DISBURSEMENT') router.push('/disbursement');
        else if (role === 'COLLECTION') router.push('/collection');
        else router.push('/borrower');
      } else {
        const response = await apiClient.post('/auth/register', { name, email, password, role: 'BORROWER' });
        const { token, role, name: returnedName } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        if (returnedName) localStorage.setItem('name', returnedName);

        router.push('/borrower');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || (authTab === 'login' ? 'Login failed' : 'Registration failed'));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="CreditSea Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain rounded-md"
              />
              <span className="text-xl font-bold text-slate-900">Credit<span className="text-blue-600">Sea</span></span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">What We Offer</Link>
              <Link href="#calculator" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Loan Calculator</Link>
              <Link href="#steps" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">How It Works</Link>
              <Link href="#eligibility" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Eligibility</Link>
              <Link href="#why" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Why CreditSea</Link>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <button 
                onClick={() => { setAuthTab('register'); setAuthModalOpen(true); }}
                className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all cursor-pointer"
              >
                Free Consultation
              </button>
              <button 
                onClick={() => { setAuthTab('login'); setAuthModalOpen(true); }}
                className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all cursor-pointer"
              >
                Sign In
              </button>
            </div>

            {/* Mobile hamburger */}
            <button className="md:hidden p-2 text-slate-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 space-y-3"
          >
            <Link href="#features" className="block py-2 text-sm font-medium text-slate-700">What We Offer</Link>
            <Link href="#steps" className="block py-2 text-sm font-medium text-slate-700">How It Works</Link>
            <Link href="#eligibility" className="block py-2 text-sm font-medium text-slate-700">Eligibility</Link>
            <button 
              onClick={() => { setAuthTab('login'); setAuthModalOpen(true); setMobileMenuOpen(false); }}
              className="block w-full text-center py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg cursor-pointer"
            >
              Sign In
            </button>
          </motion.div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#eff6ff]" />
        
        {/* Tech radial dot mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60" />
        
        {/* Glowing auroras */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl opacity-70 animate-[pulse_8s_infinite]" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/30 to-blue-100/30 rounded-full blur-3xl opacity-70 animate-[pulse_10s_infinite_1s]" />

        {/* Floating Doodles */}
        {/* Sparkle Left */}
        <motion.div 
          className="absolute top-24 left-[10%] text-blue-400 w-10 h-10 hidden sm:block pointer-events-none"
          variants={floatAnimation}
          animate="animate"
        >
          <SparkleDoodle />
        </motion.div>
        
        {/* Rupee Right */}
        <motion.div 
          className="absolute top-48 right-[15%] text-indigo-400 w-12 h-12 hidden lg:block pointer-events-none"
          variants={floatDelayedAnimation}
          animate="animate"
        >
          <RupeeDoodle />
        </motion.div>

        {/* Squiggle Center */}
        <motion.div 
          className="absolute bottom-12 left-[20%] text-slate-300 w-20 h-8 hidden sm:block pointer-events-none"
          variants={floatSlowerAnimation}
          animate="animate"
        >
          <SquiggleDoodle />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center lg:text-left relative"
          >
            {/* Floating unexpected expense badges matching screenshot */}
            <motion.div 
              className="absolute -top-12 left-10 text-slate-400/70 p-2.5 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-md shadow-blue-100/10 pointer-events-none hidden sm:block"
              variants={floatAnimation}
              animate="animate"
            >
              <Laptop className="w-5 h-5" strokeWidth={1.5} />
            </motion.div>

            <motion.div 
              className="absolute -top-14 right-12 text-slate-400/70 p-2.5 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-md shadow-blue-100/10 pointer-events-none hidden sm:block"
              variants={floatDelayedAnimation}
              animate="animate"
            >
              <Car className="w-5 h-5" strokeWidth={1.5} />
            </motion.div>

            <motion.div 
              className="absolute -bottom-14 left-4 text-slate-400/70 p-2.5 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-md shadow-blue-100/10 pointer-events-none hidden sm:block"
              variants={floatSlowerAnimation}
              animate="animate"
            >
              <Coins className="w-5 h-5" strokeWidth={1.5} />
            </motion.div>

            <motion.div 
              className="absolute -bottom-16 right-16 text-slate-400/70 p-2.5 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-100 shadow-md shadow-blue-100/10 pointer-events-none hidden sm:block"
              variants={floatDelayedAnimation}
              animate="animate"
            >
              <ReceiptText className="w-5 h-5" strokeWidth={1.5} />
            </motion.div>

            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
              ✨ Borrowing Made Easy with CreditSea
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Get Personal Loans{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                up to ₹2 Lakhs
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-slate-500 font-medium tracking-wide">
              Facing unexpected expenses or last-minute financial needs?
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto lg:mx-0">
              <button
                onClick={() => { setAuthTab('register'); setAuthModalOpen(true); }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-300 cursor-pointer"
              >
                Get Started <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setAuthTab('login'); setAuthModalOpen(true); }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-blue-600 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400 max-w-lg mx-auto lg:mx-0">
              By continuing, you agree to our{' '}
              <span className="underline cursor-pointer text-blue-500">Privacy Policy</span> and{' '}
              <span className="underline cursor-pointer text-blue-500">T&C</span>.
            </p>
          </motion.div>

          {/* Right — Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-lg mx-auto">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-200/30 to-indigo-200/30 rounded-3xl blur-2xl" />
              <Image
                src="/hero-illustration.png"
                alt="CreditSea Instant Loans"
                width={600}
                height={500}
                className="relative z-10 w-full h-auto drop-shadow-xl"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST SECTION ─── */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Modern linear mesh grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

        {/* Soft glowing ambient center blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl opacity-80 pointer-events-none" />

        {/* Sparkles on sides */}
        <motion.div 
          className="absolute top-1/4 left-[8%] text-blue-300 w-8 h-8 hidden lg:block pointer-events-none"
          variants={floatAnimation}
          animate="animate"
        >
          <SparkleDoodle />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-1/4 right-[8%] text-indigo-300 w-8 h-8 hidden lg:block pointer-events-none"
          variants={floatDelayedAnimation}
          animate="animate"
        >
          <SparkleDoodle />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 max-w-2xl mx-auto leading-tight">
              Why do thousands trust <span className="text-blue-600">CreditSea</span> for their Personal Loan needs?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Users, title: '2M+ Users', desc: 'Trusted by 2M+ users & backed by top financial institutions.', art: TrustUsersArt },
              { icon: TrendingUp, title: 'Credit Builder Loan', desc: '80% of Credit Builder Loan users see a credit score boost in 30 days.', art: TrustCreditBuilderArt },
              { icon: ShieldCheck, title: 'Security Assurance', desc: 'Your data is 100% safe & encrypted. We never share it without consent.', art: TrustSecurityArt },
              { icon: BarChart3, title: 'Key Stats', desc: '95% approval rate for eligible users. ₹500 Cr+ loans disbursed.', art: TrustKeyStatsArt },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0, 102, 255, 0.12)' }}
                className="relative p-6 rounded-2xl bg-gradient-to-b from-white to-slate-50/80 border border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden group"
              >
                {/* Floating unique background doodle art */}
                <div className="absolute -right-3 -bottom-3 w-28 h-24 text-blue-500/5 group-hover:text-blue-500/10 group-hover:scale-105 transition-all duration-300 pointer-events-none z-0">
                  <item.art className="w-full h-full" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <item.icon className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CREDITSEA ─── */}
      <section id="why" className="relative py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        {/* Subtle dot mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40" />

        {/* Floating assets */}
        <motion.div 
          className="absolute top-12 right-[12%] text-indigo-300 w-10 h-10 hidden sm:block pointer-events-none"
          variants={floatAnimation}
          animate="animate"
        >
          <SparkleDoodle />
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 flex flex-col items-center">
              <span>Why Personal Loan with <span className="text-blue-600">CreditSea</span>?</span>
              <motion.div 
                className="w-32 h-3 mt-2 text-blue-500/80 opacity-70"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <SquiggleDoodle className="w-full h-full" />
              </motion.div>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed">
              At CreditSea, we make personal loans simple, digital, and transparent.
            </p>
            <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
              With minimal documentation, quick approvals, and flexible repayment options, you can access the funds you need straight into your bank account, without the wait or the worry.
            </p>
            <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
              And if you ever need support, we&apos;re always by your side, ready to respond to your queries promptly and reliably.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── WHAT WE OFFER ─── */}
      <section id="features" className="relative py-16 md:py-24 bg-slate-50/40 overflow-hidden border-y border-slate-100/80">
        {/* Grid lines and glowing auroras */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

        {/* Floating elements */}
        <motion.div 
          className="absolute top-12 left-[8%] text-blue-300 w-10 h-10 hidden lg:block pointer-events-none"
          variants={floatAnimation}
          animate="animate"
        >
          <SparkleDoodle />
        </motion.div>
        <motion.div 
          className="absolute bottom-12 right-[8%] text-indigo-300 w-12 h-12 hidden lg:block pointer-events-none"
          variants={floatDelayedAnimation}
          animate="animate"
        >
          <RupeeDoodle />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-14">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl font-bold text-slate-900"
            >
              What We Offer
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -12px rgba(0, 102, 255, 0.12)' }}
                className="group p-6 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-100 hover:border-blue-200 hover:bg-white transition-all duration-300 cursor-default shadow-sm relative overflow-hidden"
              >
                {/* Floating unique background doodle art */}
                <div className="absolute -right-2 -bottom-2 w-24 h-24 text-blue-500/5 group-hover:text-blue-500/10 group-hover:scale-105 transition-all duration-300 pointer-events-none z-0">
                  <f.art className="w-full h-full" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                    <f.icon className="w-7 h-7 text-blue-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3 EASY STEPS ─── */}
      <section id="steps" className="relative py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

        {/* Decorative Doodles */}
        <motion.div 
          className="absolute top-1/3 right-[45%] text-blue-300/80 w-16 h-16 hidden xl:block pointer-events-none rotate-12"
          variants={floatAnimation}
          animate="animate"
        >
          <CurlyArrowDoodle />
        </motion.div>
        
        <motion.div 
          className="absolute top-12 left-[10%] text-indigo-300 w-8 h-8 hidden sm:block pointer-events-none"
          variants={floatSlowerAnimation}
          animate="animate"
        >
          <SparkleDoodle />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl font-bold text-slate-900"
            >
              3 Easy Steps to Get a Loan
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
              className="mt-3 text-base text-slate-500"
            >
              Solve all your money-related problems
            </motion.p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Steps Timeline */}
            <div className="flex-1 relative pl-8 sm:pl-10 border-l border-dashed border-blue-300/80 ml-6 sm:ml-8 space-y-6 py-2">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-30px' }}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ x: 8 }}
                  className="relative p-5 rounded-2xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/30 transition-all duration-300 group"
                >
                  {/* Absolute positioned step number / icon */}
                  <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-200 border-4 border-white group-hover:scale-110 transition-transform duration-300 z-20">
                    <s.icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">Step {i + 1}</span>
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-tr from-blue-200/20 to-indigo-200/20 rounded-3xl blur-2xl" />
                <Image
                  src="/phone-mockup.png"
                  alt="CreditSea App"
                  width={400}
                  height={500}
                  className="relative z-10 w-full max-w-sm h-auto drop-shadow-2xl rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── OTHER LOAN PRODUCTS ─── */}
      <section className="relative py-16 md:py-20 bg-white overflow-hidden border-t border-slate-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-1.5 mb-10 text-left">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" /> Other Loan Products
            </h2>
            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xl">
              No matter what your requirement is, use CreditSea&apos;s loan products to fulfill all your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Travel Loan',
                desc: 'Plan holidays or business trips with instant funds',
                icon: Plane,
                color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
                art: SparkleDoodle,
              },
              {
                title: 'Laptop Loan',
                desc: 'Get the latest laptop with zero upfront cost',
                icon: Laptop,
                color: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100',
                art: SparkleDoodle,
              },
              {
                title: 'Business Loan',
                desc: 'Support your startup or expand operations quickly',
                icon: Briefcase,
                color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
                art: LoanGrowthArt,
              },
              {
                title: 'Home Loan',
                desc: 'Buy or renovate your home with affordable rates',
                icon: Home,
                color: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100',
                art: LoanGrowthArt,
              }
            ].map((prod) => (
              <motion.div
                key={prod.title}
                whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px -12px rgba(0, 102, 255, 0.08)' }}
                onClick={() => { setAuthTab('register'); setAuthModalOpen(true); }}
                className="bg-white p-5 rounded-2xl border border-slate-100/80 shadow-sm shadow-blue-100/5 hover:border-blue-200 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group"
              >
                {/* Floating neomorphic art background inside product card */}
                <div className="absolute -right-3 -bottom-3 w-24 h-20 text-blue-500/5 group-hover:text-blue-500/10 group-hover:scale-105 transition-all duration-300 pointer-events-none z-0">
                  <prod.art className="w-full h-full" />
                </div>

                <div className="relative z-10 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${prod.color}`}>
                      <prod.icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{prod.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{prod.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-blue-600 group-hover:translate-x-1.5 transition-transform duration-300 pt-1 self-start">
                    Explore Details <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EMI CALCULATOR ─── */}
      <EMICalculator setAuthTab={setAuthTab} setAuthModalOpen={setAuthModalOpen} />

      {/* ─── ELIGIBILITY CRITERIA ─── */}
      <section id="eligibility" className="relative py-16 md:py-24 bg-slate-50/40 overflow-hidden border-t border-slate-100/80">
        {/* Modern grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60" />

        {/* Floating Sparkles */}
        <motion.div 
          className="absolute top-12 right-[10%] text-blue-300 w-8 h-8 hidden sm:block pointer-events-none"
          variants={floatAnimation}
          animate="animate"
        >
          <SparkleDoodle />
        </motion.div>

        {/* Soft background aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-100/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
              className="text-3xl sm:text-4xl font-bold text-slate-900"
            >
              Eligibility Criteria
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {eligibility.map((e, i) => (
              <motion.div
                key={e.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-30px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px -12px rgba(0, 102, 255, 0.12)' }}
                className="relative overflow-hidden rounded-2xl bg-white p-6 border border-slate-100/80 shadow-sm shadow-blue-100/5 cursor-default group transition-all duration-300"
              >
                {/* Floating unique background doodle art */}
                <div className="absolute -right-3 -bottom-3 w-28 h-24 text-blue-500/5 group-hover:text-blue-500/10 group-hover:scale-105 transition-all duration-300 pointer-events-none z-0">
                  <e.art className="w-full h-full" />
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors text-blue-600">
                    <e.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{e.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        {/* Decorative background grid and ambient glows */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-45" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-800 p-8 md:p-10 text-white shadow-xl shadow-indigo-300/20"
          >
            {/* Ambient interior glows */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-400/30 rounded-full blur-3xl opacity-60 pointer-events-none" />

            {/* Premium tech mesh pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:3rem_3rem] opacity-60" />

            {/* Floating Sparkles in corners */}
            <motion.div 
              className="absolute top-6 left-6 text-cyan-200/30 w-8 h-8 hidden sm:block pointer-events-none"
              variants={floatAnimation}
              animate="animate"
            >
              <SparkleDoodle />
            </motion.div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left">
              {/* Left Content Column */}
              <div className="md:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-cyan-200 text-[11px] font-semibold backdrop-blur-md border border-white/10">
                  ✨ Easy Online Process
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Ready to Get Started?
                </h2>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed max-w-xl">
                  Join thousands of satisfied borrowers. Apply in under 5 minutes, get express digital approval, and receive funds promptly.
                </p>

                {/* Benefit tags row */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {[
                    { icon: Zap, label: 'Instant Approval' },
                    { icon: ShieldCheck, label: '100% Encrypted' },
                    { icon: Banknote, label: 'Zero Paperwork' },
                  ].map((tag) => (
                    <div key={tag.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-blue-100 backdrop-blur-sm">
                      <tag.icon className="w-3.5 h-3.5 text-cyan-300" strokeWidth={2.5} />
                      <span>{tag.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Action & Art Column */}
              <div className="md:col-span-4 flex flex-col items-center md:items-end justify-center space-y-5 relative">
                {/* Beautiful custom vector plant art */}
                <div className="w-36 h-24 text-cyan-300/35 hidden md:block pointer-events-none">
                  <LoanGrowthArt className="w-full h-full" />
                </div>

                {/* Vertical action buttons stack */}
                <div className="flex flex-col gap-2.5 w-full max-w-[220px] md:max-w-none">
                  <button
                    onClick={() => { setAuthTab('register'); setAuthModalOpen(true); }}
                    className="w-full text-center px-5 py-3 text-xs font-bold text-blue-600 bg-white rounded-xl hover:bg-blue-50 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    Apply Now — It&apos;s Free
                  </button>
                  <button
                    onClick={() => { setAuthTab('login'); setAuthModalOpen(true); }}
                    className="w-full text-center px-5 py-3 text-xs font-bold text-white border border-white/20 bg-white/5 rounded-xl hover:bg-white/10 hover:border-white/50 hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="CreditSea Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain rounded-md"
                />
                <span className="text-xl font-bold text-white">Credit<span className="text-blue-400">Sea</span></span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs">
                Making personal loans simple, digital, and transparent for every Indian.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
            © 2026 CreditSea. All rights reserved.
          </div>
        </div>
      </footer>

      {/* ─── AUTH DRAWER MODAL (HALF SCREEN) ─── */}
      <AnimatePresence>
        {authModalOpen && (
          <div className="fixed inset-0 z-50 flex justify-end font-sans">
            {/* Background Backdrop Blur (Left Side) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setAuthModalOpen(false); setError(''); }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md cursor-pointer"
            />

            {/* Side Drawer Container (Right Side) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative z-10 w-full md:w-1/2 lg:w-[42%] xl:w-[38%] h-full bg-white shadow-2xl flex flex-col overflow-hidden border-l border-slate-100"
            >
              {/* Premium Interior Ambient Aura Blobs & Doodles */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-100/30 rounded-full blur-3xl opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

              {/* Vector Artwork Background */}
              <div className="absolute -bottom-6 -right-6 w-48 h-40 text-blue-500/5 pointer-events-none">
                <LoanGrowthArt className="w-full h-full" />
              </div>
              <motion.div 
                className="absolute top-12 left-12 text-blue-300 w-8 h-8 pointer-events-none"
                variants={floatAnimation}
                animate="animate"
              >
                <SparkleDoodle />
              </motion.div>

              {/* Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 relative z-10">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/logo.png"
                    alt="CreditSea Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain rounded-md"
                  />
                  <span className="text-lg font-bold text-slate-900">Credit<span className="text-blue-600">Sea</span></span>
                </div>
                <button
                  onClick={() => { setAuthModalOpen(false); setError(''); }}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto px-8 py-10 relative z-10">
                {/* Slidable Toggle Segment Header */}
                <div className="flex p-1 mb-8 rounded-xl bg-slate-100/80 border border-slate-200/50 max-w-sm">
                  <button
                    onClick={() => { setAuthTab('login'); setError(''); }}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                      authTab === 'login' 
                        ? 'bg-white text-blue-600 shadow-md border-b border-slate-100' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setAuthTab('register'); setError(''); }}
                    className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                      authTab === 'register' 
                        ? 'bg-white text-blue-600 shadow-md border-b border-slate-100' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    New User
                  </button>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    {authTab === 'login' ? (
                      <>
                        <LogIn className="w-5 h-5 text-blue-600" /> Welcome Back
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5 text-blue-600" /> Create Account
                      </>
                    )}
                  </h2>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                    {authTab === 'login' 
                      ? 'Enter your credentials to access your secure dashboard.' 
                      : 'Fill in your details below to set up your personal account.'}
                  </p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleAuthSubmit}>
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

                  {authTab === 'register' && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                          type="text"
                          required
                          className="block w-full pl-11 pr-4 py-3 text-sm text-slate-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 placeholder-slate-400 transition-all shadow-sm"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="email"
                        required
                        className="block w-full pl-11 pr-4 py-3 text-sm text-slate-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 placeholder-slate-400 transition-all shadow-sm"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        type="password"
                        required
                        className="block w-full pl-11 pr-4 py-3 text-sm text-slate-900 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 placeholder-slate-400 transition-all shadow-sm"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full py-3.5 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:shadow-xl hover:shadow-blue-300/30 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : authTab === 'login' ? (
                      <>
                        <LogIn className="w-4 h-4" /> Sign In
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" /> Create Account
                      </>
                    )}
                  </button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                    <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-slate-400 font-medium">or</span></div>
                  </div>

                  <p className="text-sm text-center text-slate-500">
                    {authTab === 'login' ? (
                      <>
                        New to CreditSea?{' '}
                        <button
                          type="button"
                          onClick={() => { setAuthTab('register'); setError(''); }}
                          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          Create an account
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => { setAuthTab('login'); setError(''); }}
                          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                        >
                          Sign in here
                        </button>
                      </>
                    )}
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
