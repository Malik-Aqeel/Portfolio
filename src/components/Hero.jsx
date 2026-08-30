import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, TrendingUp, TrendingDown, Target, Rocket,
  LineChart, Home, Grid, Users, Settings, Calendar,
  Star, ChevronDown, Check, CheckCircle2, ShieldCheck, Zap,
  Activity, ArrowUpRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

// Interactive Date Ranges Dataset
const dateRanges = [
  {
    id: '7D',
    label: 'Last 7 Days',
    badge: '+18.4% ROAS',
    clicks: '12.6K',
    clicksGrowth: '↑ 28.5%',
    conversions: '1.46K',
    conversionsGrowth: '↑ 32.1%',
    cpa: '$6.23',
    cpaGrowth: '↓ 14.3%',
    convValue: '$45.2K',
    convValueGrowth: '↑ 35.7%',
    clicksLine: 'M0,65 Q20,62 45,50 T95,38 T150,32 T210,24 T270,16 T320,8',
    clicksArea: '0,65 20,62 45,50 70,55 95,38 120,44 150,32 180,36 210,24 240,28 270,16 295,20 320,8 320,100 0,100',
    convLine: 'M0,85 Q20,80 45,86 T95,78 T150,68 T210,56 T270,45 T320,38',
    convArea: '0,85 20,80 45,86 70,72 95,78 120,65 150,68 180,52 210,56 240,42 270,45 295,30 320,38 320,100 0,100',
    peakX: 320,
    peakY: 8,
    dates: ['Day 1', 'Day 2', 'Day 4', 'Day 6', 'Day 7'],
    sparkClicks: 'M0,14 Q10,4 20,11 T40,6 T60,2',
    sparkConv: 'M0,15 Q15,6 28,12 T45,7 T60,3',
    sparkCpa: 'M0,5 Q15,14 30,8 T45,13 T60,16',
    sparkVal: 'M0,16 Q12,8 25,12 T48,6 T60,1',
    donut: { search: 55, pmax: 25, shopping: 20 },
  },
  {
    id: '30D',
    label: 'Last 30 Days',
    badge: '+21.5% ROAS',
    clicks: '48.2K',
    clicksGrowth: '↑ 34.2%',
    conversions: '5.82K',
    conversionsGrowth: '↑ 39.4%',
    cpa: '$5.80',
    cpaGrowth: '↓ 18.2%',
    convValue: '$184.6K',
    convValueGrowth: '↑ 42.1%',
    clicksLine: 'M0,75 Q25,60 55,42 T110,48 T165,30 T220,35 T275,18 T320,12',
    clicksArea: '0,75 25,60 55,42 85,52 110,48 140,36 165,30 195,38 220,35 250,22 275,18 300,16 320,12 320,100 0,100',
    convLine: 'M0,90 Q25,82 55,70 T110,72 T165,55 T220,58 T275,40 T320,32',
    convArea: '0,90 25,82 55,70 85,76 110,72 140,62 165,55 195,62 220,58 250,46 275,40 300,38 320,32 320,100 0,100',
    peakX: 320,
    peakY: 12,
    dates: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
    sparkClicks: 'M0,16 Q15,8 30,12 T45,5 T60,2',
    sparkConv: 'M0,17 Q15,10 32,8 T48,4 T60,2',
    sparkCpa: 'M0,4 Q15,10 30,12 T48,15 T60,17',
    sparkVal: 'M0,17 Q14,9 28,10 T46,4 T60,1',
    donut: { search: 58, pmax: 28, shopping: 14 },
  },
  {
    id: '90D',
    label: 'Last 90 Days',
    badge: '+28.7% ROAS',
    clicks: '154K',
    clicksGrowth: '↑ 48.6%',
    conversions: '18.4K',
    conversionsGrowth: '↑ 52.8%',
    cpa: '$5.15',
    cpaGrowth: '↓ 24.5%',
    convValue: '$592K',
    convValueGrowth: '↑ 64.2%',
    clicksLine: 'M0,82 Q30,70 65,55 T130,45 T195,28 T260,18 T320,6',
    clicksArea: '0,82 30,70 65,55 95,60 130,45 160,35 195,28 230,24 260,18 290,12 320,6 320,100 0,100',
    convLine: 'M0,95 Q30,85 65,75 T130,65 T195,48 T260,36 T320,24',
    convArea: '0,95 30,85 65,75 95,80 130,65 160,56 195,48 230,42 260,36 290,28 320,24 320,100 0,100',
    peakX: 320,
    peakY: 6,
    dates: ['Month 1', 'Month 2', 'Month 3', 'Current'],
    sparkClicks: 'M0,17 Q15,12 30,9 T45,4 T60,1',
    sparkConv: 'M0,18 Q16,12 32,8 T48,3 T60,1',
    sparkCpa: 'M0,3 Q16,8 32,12 T48,15 T60,18',
    sparkVal: 'M0,18 Q15,10 30,7 T48,3 T60,1',
    donut: { search: 62, pmax: 26, shopping: 12 },
  },
  {
    id: 'Year',
    label: 'Year',
    badge: '+34.2% ROAS',
    clicks: '272K',
    clicksGrowth: '↑ 61.2%',
    conversions: '32.6K',
    conversionsGrowth: '↑ 68.9%',
    cpa: '$4.80',
    cpaGrowth: '↓ 29.8%',
    convValue: '$1.08M',
    convValueGrowth: '↑ 84.5%',
    clicksLine: 'M0,88 Q35,74 70,60 T140,38 T210,22 T280,10 T320,4',
    clicksArea: '0,88 35,74 70,60 105,50 140,38 175,28 210,22 245,15 280,10 300,6 320,4 320,100 0,100',
    convLine: 'M0,96 Q35,88 70,78 T140,56 T210,40 T280,26 T320,16',
    convArea: '0,96 35,88 70,78 105,68 140,56 175,46 210,40 245,32 280,26 300,20 320,16 320,100 0,100',
    peakX: 320,
    peakY: 4,
    dates: ['Q1', 'Q2', 'Q3', 'Q4', 'Current'],
    sparkClicks: 'M0,18 Q16,14 32,9 T48,4 T60,1',
    sparkConv: 'M0,18 Q16,13 32,7 T48,3 T60,1',
    sparkCpa: 'M0,2 Q16,8 32,13 T48,16 T60,18',
    sparkVal: 'M0,18 Q15,9 30,6 T48,2 T60,1',
    donut: { search: 65, pmax: 24, shopping: 11 },
  }
];

export default function Hero({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRangeIndex, setSelectedRangeIndex] = useState(1); // Default to Last 30 Days
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const activeData = dateRanges[selectedRangeIndex];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDateDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Floating micro-animations
  const floatSlow = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  const floatReverse = {
    animate: {
      y: [0, 9, 0],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
    }
  };

  const floatBadge = {
    animate: {
      y: [0, -8, 0],
      rotate: [-1.5, 1.5, -1.5],
      transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-8 lg:pt-28 lg:pb-12 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFB] to-[#F0F7F4] min-h-[calc(100vh-20px)] flex flex-col justify-center"
    >
      {/* ─── Ambient Glow Meshes (Matching Website Theme) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-10 right-1/4 w-[650px] h-[650px] rounded-full opacity-35 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(20, 184, 166, 0.08) 60%, transparent 80%)' }}
        />
        <div
          className="absolute bottom-4 right-10 w-[450px] h-[450px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -top-16 left-12 w-[450px] h-[450px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, transparent 70%)' }}
        />
      </div>

      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ═════════════════════════════════════════════════════
              LEFT COLUMN: High-Converting Headline & Trust Elements
          ═════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-5 text-left">

            {/* Small Top Badge with Pulsing Emerald Radar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/80 shadow-soft-sm backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-emerald-800 tracking-wide uppercase">
                Driving Results • Delivering Growth
              </span>
            </motion.div>

            {/* Main Bold Headline with Website Emerald Theme & Hand-drawn Curve */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[3.35rem] font-black text-slate-900 tracking-tight leading-[1.12]"
            >
              More Clicks.
              <br />
              Better Conversions.
              <br />
              <span className="relative inline-block">
                <span className="animated-growth-gradient font-black">
                  Maximum Growth.
                </span>
                {/* Hand-drawn Accent curve with vibrant gradient */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 pointer-events-none overflow-visible"
                  viewBox="0 0 260 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="curveWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="30%" stopColor="#10B981" />
                      <stop offset="70%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M3 9C65 2 195 2 257 8"
                    stroke="url(#curveWaveGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md"
            >
              I help e-commerce and DTC businesses scale profitably with data-driven Google Ads strategies that lower CPA and maximize ROAS.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <button
                onClick={onBookCall}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center gap-2 cursor-pointer active:scale-98 button-shine relative overflow-hidden"
              >
                <span>Get Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#case-studies"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200/90 shadow-soft-sm hover:border-emerald-300 transition-all flex items-center gap-2"
              >
                <LineChart className="w-4 h-4 text-emerald-600" />
                <span>View Case Studies</span>
              </a>
            </motion.div>

            {/* 3 Pillars / Feature Row at Bottom (Themed) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-3 border-t border-slate-200/70"
            >
              <div className="flex items-start gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Target Right</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">High-intent buyers</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
                  <LineChart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Lower Cost</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">Reduce CPA & waste</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Higher ROI</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">Scale revenue profitably</p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* ═════════════════════════════════════════════════════
              RIGHT COLUMN: Perspective 3D Google Ads Dashboard
          ═════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 relative flex items-center justify-center">

            {/* Floating 3D Google Ads Logo at Top-Left */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatBadge}
                animate="animate"
                className="absolute -top-6 left-6 sm:left-12 z-30 pointer-events-none drop-shadow-2xl"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
                    <rect x="18" y="24" width="22" height="52" rx="11" transform="rotate(-35 29 50)" fill="#4285F4" />
                    <rect x="52" y="32" width="22" height="42" rx="11" transform="rotate(35 63 53)" fill="#34A853" />
                    <circle cx="34" cy="68" r="14" fill="#FBBC04" />
                  </svg>
                </div>
              </motion.div>
            )}

            {/* Floating 3D Target Dartboard at Bottom-Right */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatReverse}
                animate="animate"
                className="absolute -bottom-8 -right-4 sm:-right-8 z-30 pointer-events-none hidden sm:block"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 relative filter drop-shadow-2xl">
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <defs>
                      <radialGradient id="targetGradEmerald1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#047857" />
                      </radialGradient>
                      <radialGradient id="targetGradWhite" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#ECFDF5" />
                      </radialGradient>
                    </defs>
                    <ellipse cx="60" cy="60" rx="52" ry="46" fill="url(#targetGradEmerald1)" opacity="0.95" />
                    <ellipse cx="60" cy="58" rx="46" ry="40" fill="url(#targetGradWhite)" />
                    <ellipse cx="60" cy="58" rx="34" ry="30" fill="url(#targetGradEmerald1)" />
                    <ellipse cx="60" cy="58" rx="22" ry="19" fill="url(#targetGradWhite)" />
                    <ellipse cx="60" cy="58" rx="12" ry="10" fill="#065F46" />
                    <g transform="translate(68, 30) rotate(-35)">
                      <rect x="0" y="0" width="6" height="34" rx="2" fill="#059669" />
                      <polygon points="-4,34 10,34 3,46" fill="#047857" />
                      <polygon points="-6,0 12,0 3,-10" fill="#34D399" />
                    </g>
                  </svg>
                </div>
              </motion.div>
            )}

            {/* ─── Main Perspective Angled Tablet Dashboard ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-[660px] rounded-3xl bg-white shadow-2xl shadow-emerald-950/10 border border-slate-200/90 overflow-visible flex transform lg:rotate-[-2deg] lg:hover:rotate-0 transition-transform duration-500"
            >

              {/* ── Dark Left Sidebar (Deep Navy Slate with Emerald Active Highlights) ── */}
              <div className="w-14 sm:w-16 bg-[#0B132B] text-slate-400 flex flex-col items-center py-5 justify-between shrink-0 rounded-l-3xl">
                <div className="space-y-6 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-inner">
                    <svg viewBox="0 0 40 40" className="w-6 h-6">
                      <rect x="8" y="10" width="8" height="20" rx="4" transform="rotate(-35 12 20)" fill="#4285F4" />
                      <rect x="22" y="12" width="8" height="18" rx="4" transform="rotate(35 26 21)" fill="#34A853" />
                      <circle cx="14" cy="27" r="5" fill="#FBBC04" />
                    </svg>
                  </div>

                  <div className="space-y-4 flex flex-col items-center">
                    <button
                      onClick={() => setActiveTab('home')}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        activeTab === 'home'
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/40'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <Home className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        activeTab === 'analytics'
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                      }`}
                    >
                      <LineChart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('campaigns')}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('target')}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
                    >
                      <Target className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('users')}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
                    >
                      <Users className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer">
                  <Settings className="w-4 h-4" />
                </div>
              </div>

              {/* ── Main Dashboard Body ── */}
              <div className="flex-1 p-4 sm:p-6 bg-white space-y-4 min-w-0 rounded-r-3xl relative">

                {/* Top Header Row with Interactive Date Dropdown Picker */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 relative z-30">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
                      Google Ads Performance
                    </h3>
                  </div>

                  {/* ── Interactive Date Picker Pill & Dropdown ── */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-300 text-[11px] font-bold text-slate-700 hover:text-emerald-700 transition-all shadow-xs cursor-pointer select-none"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{activeData.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDateDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                    </button>

                    {/* Animated Dropdown Menu */}
                    <AnimatePresence>
                      {isDateDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl p-1.5 z-50 text-left"
                        >
                          <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Select Timeframe
                          </div>
                          <div className="py-1 space-y-0.5">
                            {dateRanges.map((range, idx) => {
                              const isSelected = selectedRangeIndex === idx;
                              return (
                                <button
                                  key={range.id}
                                  onClick={() => {
                                    setSelectedRangeIndex(idx);
                                    setIsDateDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                                    isSelected
                                      ? 'bg-emerald-50 text-emerald-900 font-bold'
                                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                                  }`}
                                >
                                  <span className="leading-tight">{range.label}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-md">
                                      {range.badge}
                                    </span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* 4 Metric Cards Grid (Dynamic values based on Selected Date) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Card 1: Clicks */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <LineChart className="w-3 h-3 text-emerald-600" />
                      <span>Clicks</span>
                    </div>
                    <motion.p
                      key={`clicks-${activeData.id}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 tracking-tight"
                    >
                      {activeData.clicks}
                    </motion.p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">{activeData.clicksGrowth}</p>
                    {/* Dynamic Sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d={activeData.sparkClicks} fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 2: Conversions */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-50/50 to-white border border-teal-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <TrendingUp className="w-3 h-3 text-teal-600" />
                      <span>Conversions</span>
                    </div>
                    <motion.p
                      key={`conv-${activeData.id}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 tracking-tight"
                    >
                      {activeData.conversions}
                    </motion.p>
                    <p className="text-[10px] font-bold text-teal-600 mt-0.5">{activeData.conversionsGrowth}</p>
                    {/* Dynamic Sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d={activeData.sparkConv} fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 3: Cost / Conv. */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <LineChart className="w-3 h-3 text-amber-500" />
                      <span>Cost / Conv.</span>
                    </div>
                    <motion.p
                      key={`cpa-${activeData.id}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg sm:text-xl font-black text-slate-900 mt-0.5 tracking-tight"
                    >
                      {activeData.cpa}
                    </motion.p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">{activeData.cpaGrowth}</p>
                    {/* Dynamic Sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d={activeData.sparkCpa} fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 4: Conv. Value */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-teal-50/40 border border-emerald-200/60 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      <span>Conv. Value</span>
                    </div>
                    <motion.p
                      key={`val-${activeData.id}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg sm:text-xl font-black text-emerald-800 mt-0.5 tracking-tight"
                    >
                      {activeData.convValue}
                    </motion.p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">{activeData.convValueGrowth}</p>
                    {/* Dynamic Sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d={activeData.sparkVal} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* ── Main Dual-Line Graph Area (Changes dynamically on date selection) ── */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                        <span className="font-bold text-slate-800">Clicks Trend</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                        <span className="font-bold text-slate-800">Conversions</span>
                      </div>
                    </div>
                    <span className="font-semibold text-emerald-700 text-[10.5px]">
                      {activeData.label} Telemetry
                    </span>
                  </div>

                  {/* Dynamic SVG Chart */}
                  <div className="h-32 sm:h-36 w-full relative">
                    {/* Y-axis markers */}
                    <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-[9px] font-semibold text-slate-400 pointer-events-none pr-2">
                      <span>1.5K</span>
                      <span>1K</span>
                      <span>500</span>
                      <span>0</span>
                    </div>

                    <svg className="w-full h-full pl-6 overflow-visible" viewBox="0 0 320 100" preserveAspectRatio="none">
                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="10" x2="320" y2="10" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                      <line x1="0" y1="40" x2="320" y2="40" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                      <line x1="0" y1="70" x2="320" y2="70" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />
                      <line x1="0" y1="98" x2="320" y2="98" stroke="#CBD5E1" strokeWidth="1" />

                      <defs>
                        <linearGradient id="emeraldHeroFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#059669" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="tealHeroFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0D9488" stopOpacity="0.16" />
                          <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Conversions Area Fill (Teal) */}
                      <motion.polygon
                        key={`convArea-${activeData.id}`}
                        points={activeData.convArea}
                        fill="url(#tealHeroFill)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Conversions Line (Teal) */}
                      <motion.path
                        key={`convLine-${activeData.id}`}
                        d={activeData.convLine}
                        fill="none"
                        stroke="#0D9488"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />

                      {/* Clicks Area Fill (Emerald) */}
                      <motion.polygon
                        key={`clicksArea-${activeData.id}`}
                        points={activeData.clicksArea}
                        fill="url(#emeraldHeroFill)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Clicks Line (Emerald) */}
                      <motion.path
                        key={`clicksLine-${activeData.id}`}
                        d={activeData.clicksLine}
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />

                      {/* Peak Interactive Radar Ping */}
                      <circle cx={activeData.peakX} cy={activeData.peakY} r="3.5" fill="#059669" />
                      <circle cx={activeData.peakX} cy={activeData.peakY} r="7" fill="#10B981" opacity="0.4" className="animate-ping" />
                    </svg>

                    {/* Dynamic Date labels along bottom */}
                    <div className="pl-6 pt-1 flex items-center justify-between text-[9px] font-semibold text-slate-400">
                      {activeData.dates.map((d, i) => (
                        <span key={i}>{d}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* ─── Floating Card 1: 100+ Happy Clients (Bottom-Left) ─── */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatSlow}
                animate="animate"
                className="absolute -bottom-5 -left-4 sm:left-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-3.5 shadow-xl border border-slate-200/80 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 shrink-0">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <div className="flex items-center -space-x-1.5 mb-1">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[8px] font-black text-white">S</div>
                    <div className="w-5 h-5 rounded-full bg-teal-500 border border-white flex items-center justify-center text-[8px] font-black text-white">A</div>
                    <div className="w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center text-[8px] font-black text-white">M</div>
                    <div className="w-5 h-5 rounded-full bg-amber-500 border border-white flex items-center justify-center text-[8px] font-black text-white">Z</div>
                  </div>
                  <p className="text-xs font-black text-slate-900 leading-tight">100+ Happy Clients</p>
                  <p className="text-[10px] font-semibold text-slate-400">Across the Globe</p>
                </div>
              </motion.div>
            )}

            {/* ─── Floating Card 2: Campaigns Performance Donut (Dynamic based on selected date) ─── */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatBadge}
                animate="animate"
                className="absolute -bottom-8 right-2 sm:right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200/80 hidden sm:flex items-center gap-4"
              >
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Campaigns Performance
                  </p>
                  <div className="flex items-center gap-3">
                    {/* Dynamic SVG Donut Chart */}
                    <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                        {/* Search % */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#059669" strokeWidth="4"
                          strokeDasharray={`${activeData.donut.search} 100`}
                          strokeDashoffset="0"
                        />
                        {/* PMax % */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#0D9488" strokeWidth="4"
                          strokeDasharray={`${activeData.donut.pmax} 100`}
                          strokeDashoffset={`-${activeData.donut.search}`}
                        />
                        {/* Shopping % */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#F59E0B" strokeWidth="4"
                          strokeDasharray={`${activeData.donut.shopping} 100`}
                          strokeDashoffset={`-${activeData.donut.search + activeData.donut.pmax}`}
                        />
                      </svg>
                    </div>

                    {/* Dynamic Donut Legend */}
                    <div className="space-y-1 text-[10px] font-bold text-slate-700">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Search
                        </span>
                        <span className="text-slate-900 font-extrabold">{activeData.donut.search}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" /> PMax
                        </span>
                        <span className="text-slate-900 font-extrabold">{activeData.donut.pmax}%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Shopping
                        </span>
                        <span className="text-slate-900 font-extrabold">{activeData.donut.shopping}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
