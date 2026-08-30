import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, TrendingUp, TrendingDown, Target, Rocket,
  LineChart, Home, Grid, Users, Settings, Calendar,
  Star, ChevronDown, CheckCircle2, ShieldCheck, Zap,
  Activity, ArrowUpRight
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('home');

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
        {/* Primary Emerald Glow behind dashboard */}
        <div
          className="absolute top-10 right-1/4 w-[650px] h-[650px] rounded-full opacity-35 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(20, 184, 166, 0.08) 60%, transparent 80%)' }}
        />
        {/* Soft Sky Blue / Cyan Glow */}
        <div
          className="absolute bottom-4 right-10 w-[450px] h-[450px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, transparent 70%)' }}
        />
        {/* Ambient Top Left Glow */}
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
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
                  Maximum Growth.
                </span>
                {/* Hand-drawn Emerald accent curve */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 text-emerald-500/85 pointer-events-none"
                  viewBox="0 0 260 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 9C65 2 195 2 257 8"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
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
              {/* Pillar 1 */}
              <div className="flex items-start gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Target Right</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">High-intent buyers</p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform shadow-xs">
                  <LineChart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Lower Cost</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">Reduce CPA & waste</p>
                </div>
              </div>

              {/* Pillar 3 */}
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

            {/* ─── Floating 3D Google Ads Logo at Top-Left ─── */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatBadge}
                animate="animate"
                className="absolute -top-6 left-6 sm:left-12 z-30 pointer-events-none drop-shadow-2xl"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
                    {/* Blue pill */}
                    <rect x="18" y="24" width="22" height="52" rx="11" transform="rotate(-35 29 50)" fill="#4285F4" />
                    {/* Green pill */}
                    <rect x="52" y="32" width="22" height="42" rx="11" transform="rotate(35 63 53)" fill="#34A853" />
                    {/* Yellow circle */}
                    <circle cx="34" cy="68" r="14" fill="#FBBC04" />
                  </svg>
                </div>
              </motion.div>
            )}

            {/* ─── Floating 3D Target Dartboard at Bottom-Right (Emerald/Teal Theme) ─── */}
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
                    {/* Outer 3D Ring */}
                    <ellipse cx="60" cy="60" rx="52" ry="46" fill="url(#targetGradEmerald1)" opacity="0.95" />
                    <ellipse cx="60" cy="58" rx="46" ry="40" fill="url(#targetGradWhite)" />
                    <ellipse cx="60" cy="58" rx="34" ry="30" fill="url(#targetGradEmerald1)" />
                    <ellipse cx="60" cy="58" rx="22" ry="19" fill="url(#targetGradWhite)" />
                    <ellipse cx="60" cy="58" rx="12" ry="10" fill="#065F46" />
                    {/* Dart Arrow pointing into center */}
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
              className="relative w-full max-w-[660px] rounded-3xl bg-white shadow-2xl shadow-emerald-950/10 border border-slate-200/90 overflow-hidden flex transform lg:rotate-[-2deg] lg:hover:rotate-0 transition-transform duration-500"
            >

              {/* ── Dark Left Sidebar (Deep Navy Slate with Emerald Active Highlights) ── */}
              <div className="w-14 sm:w-16 bg-[#0B132B] text-slate-400 flex flex-col items-center py-5 justify-between shrink-0">
                {/* Logo top */}
                <div className="space-y-6 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-inner">
                    <svg viewBox="0 0 40 40" className="w-6 h-6">
                      <rect x="8" y="10" width="8" height="20" rx="4" transform="rotate(-35 12 20)" fill="#4285F4" />
                      <rect x="22" y="12" width="8" height="18" rx="4" transform="rotate(35 26 21)" fill="#34A853" />
                      <circle cx="14" cy="27" r="5" fill="#FBBC04" />
                    </svg>
                  </div>

                  {/* Sidebar Nav Icons */}
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

                {/* Settings Bottom */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer">
                  <Settings className="w-4 h-4" />
                </div>
              </div>

              {/* ── Main Dashboard Body ── */}
              <div className="flex-1 p-4 sm:p-6 bg-white space-y-4 min-w-0">

                {/* Top Header Row */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight">
                      Google Ads Performance
                    </h3>
                  </div>
                  {/* Date Picker Pill */}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-[11px] font-semibold text-slate-600">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>May 1 – May 31, 2024</span>
                    <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
                  </div>
                </div>

                {/* 4 Metric Cards Grid (Side-by-side with sparklines) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Card 1: Clicks */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <LineChart className="w-3 h-3 text-emerald-600" />
                      <span>Clicks</span>
                    </div>
                    <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">12.6K</p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">↑ 28.5%</p>
                    {/* Emerald sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d="M0,14 Q10,4 20,11 T40,6 T60,2" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 2: Conversions */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-50/50 to-white border border-teal-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <TrendingUp className="w-3 h-3 text-teal-600" />
                      <span>Conversions</span>
                    </div>
                    <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">1.46K</p>
                    <p className="text-[10px] font-bold text-teal-600 mt-0.5">↑ 32.1%</p>
                    {/* Teal sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d="M0,15 Q15,6 28,12 T45,7 T60,3" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 3: Cost / Conv. */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <LineChart className="w-3 h-3 text-amber-500" />
                      <span>Cost / Conv.</span>
                    </div>
                    <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">$6.23</p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">↓ 14.3%</p>
                    {/* Orange sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d="M0,5 Q15,14 30,8 T45,13 T60,16" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 4: Conv. Value */}
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-teal-50/40 border border-emerald-200/60 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-800">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      <span>Conv. Value</span>
                    </div>
                    <p className="text-lg sm:text-xl font-black text-emerald-800 mt-0.5">$45.2K</p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">↑ 35.7%</p>
                    {/* Green sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d="M0,16 Q12,8 25,12 T48,6 T60,1" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* ── Main Dual-Line Graph Area ── */}
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
                    <span className="font-semibold text-emerald-700 text-[10.5px]">Live Telemetry</span>
                  </div>

                  {/* SVG Chart with Dual Lines and Grid Lines */}
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

                      {/* Teal Conversions Area Fill */}
                      <polygon
                        points="0,85 20,80 45,86 70,72 95,78 120,65 150,68 180,52 210,56 240,42 270,45 295,30 320,38 320,100 0,100"
                        fill="url(#tealHeroFill)"
                      />
                      {/* Teal Conversions Line */}
                      <path
                        d="M0,85 Q20,80 45,86 T95,78 T150,68 T210,56 T270,45 T320,38"
                        fill="none"
                        stroke="#0D9488"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      {/* Emerald Clicks Area Fill */}
                      <polygon
                        points="0,65 20,62 45,50 70,55 95,38 120,44 150,32 180,36 210,24 240,28 270,16 295,20 320,8 320,100 0,100"
                        fill="url(#emeraldHeroFill)"
                      />
                      {/* Emerald Clicks Line */}
                      <path
                        d="M0,65 Q20,62 45,50 T95,38 T150,32 T210,24 T270,16 T320,8"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Peak Interactive Radar Ping */}
                      <circle cx="270" cy="16" r="3.5" fill="#059669" />
                      <circle cx="270" cy="16" r="7" fill="#10B981" opacity="0.4" className="animate-ping" />
                    </svg>

                    {/* Date labels bottom */}
                    <div className="pl-6 pt-1 flex items-center justify-between text-[9px] font-semibold text-slate-400">
                      <span>May 1</span>
                      <span>May 8</span>
                      <span>May 15</span>
                      <span>May 21</span>
                      <span>May 31</span>
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
                  {/* Avatar circles */}
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

            {/* ─── Floating Card 2: Campaigns Performance Donut (Bottom-Right) ─── */}
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
                    {/* SVG Donut Chart */}
                    <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                        {/* Emerald Search 55% */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#059669" strokeWidth="4"
                          strokeDasharray="55 100"
                          strokeDashoffset="0"
                        />
                        {/* Teal Display 25% */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#0D9488" strokeWidth="4"
                          strokeDasharray="25 100"
                          strokeDashoffset="-55"
                        />
                        {/* Amber Shopping 20% */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#F59E0B" strokeWidth="4"
                          strokeDasharray="20 100"
                          strokeDashoffset="-80"
                        />
                      </svg>
                    </div>

                    {/* Donut Legend */}
                    <div className="space-y-1 text-[10px] font-bold text-slate-700">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Search
                        </span>
                        <span className="text-slate-900 font-extrabold">55%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" /> PMax
                        </span>
                        <span className="text-slate-900 font-extrabold">25%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Shopping
                        </span>
                        <span className="text-slate-900 font-extrabold">20%</span>
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
