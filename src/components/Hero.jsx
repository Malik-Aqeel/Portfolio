import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, TrendingUp, TrendingDown, Target, Rocket,
  LineChart, Home, Grid, Users, Settings, Calendar,
  Star, ChevronDown, CheckCircle2, ShieldCheck, Zap
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('home');

  // Floating animation variants
  const floatSlow = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  const floatReverse = {
    animate: {
      y: [0, 10, 0],
      transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }
    }
  };

  const floatBadge = {
    animate: {
      y: [0, -7, 0],
      rotate: [-1, 1, -1],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-8 lg:pt-28 lg:pb-12 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-blue-50/30 min-h-[calc(100vh-20px)] flex flex-col justify-center"
    >
      {/* ─── Ambient Glow Orbs ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft blue glow on top right behind dashboard */}
        <div
          className="absolute top-10 right-1/4 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.22) 0%, rgba(147, 197, 253, 0.08) 60%, transparent 80%)' }}
        />
        {/* Subtle indigo glow bottom right */}
        <div
          className="absolute bottom-4 right-10 w-[450px] h-[450px] rounded-full opacity-35 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)' }}
        />
        {/* Subtle cyan glow top left */}
        <div
          className="absolute -top-10 left-10 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

          {/* ═════════════════════════════════════════════════════
              LEFT COLUMN: Compelling Value Pitch
          ═════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 space-y-5 text-left">

            {/* Small Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-100 shadow-xs backdrop-blur-sm"
            >
              <span className="text-sm">📈</span>
              <span className="text-xs font-bold text-blue-700 tracking-wide">
                Driving Results. Delivering Growth.
              </span>
            </motion.div>

            {/* Main Bold Headline with Custom Curved Underline */}
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
              <span className="relative inline-block text-blue-600">
                Maximum Growth.
                {/* Hand-drawn accent curve */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-blue-500/85 pointer-events-none"
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
              I help businesses grow with data-driven Google Ads strategies that deliver more traffic, quality leads, and higher ROI.
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
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/45 transition-all flex items-center gap-2 cursor-pointer active:scale-98 button-shine relative overflow-hidden"
              >
                <span>Get Free Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#case-studies"
                className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-200/90 shadow-soft-sm hover:border-slate-300 transition-all flex items-center gap-2"
              >
                <LineChart className="w-4 h-4 text-blue-600" />
                <span>View Case Studies</span>
              </a>
            </motion.div>

            {/* 3 Pillars / Feature Row at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-2.5 sm:gap-4 pt-3 border-t border-slate-100"
            >
              {/* Pillar 1 */}
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Target Right</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">Reach the right audience</p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                  <LineChart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Lower Cost</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">Reduce CPC & get more</p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Rocket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 leading-tight">Higher ROI</h4>
                  <p className="text-[10.5px] text-slate-500 leading-tight mt-0.5">Maximize conversions</p>
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
                className="absolute -top-6 left-6 sm:left-12 z-30 pointer-events-none drop-shadow-xl"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 relative">
                  {/* Google Ads 3D Emblem */}
                  <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-lg">
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

            {/* ─── Floating 3D Target Dartboard at Bottom-Right ─── */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatReverse}
                animate="animate"
                className="absolute -bottom-8 -right-4 sm:-right-8 z-30 pointer-events-none hidden sm:block"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 relative filter drop-shadow-2xl">
                  <svg viewBox="0 0 120 120" className="w-full h-full">
                    <defs>
                      <radialGradient id="targetGrad1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#818CF8" />
                        <stop offset="100%" stopColor="#4F46E5" />
                      </radialGradient>
                      <radialGradient id="targetGrad2" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#E0E7FF" />
                      </radialGradient>
                    </defs>
                    {/* Outer 3D Ring */}
                    <ellipse cx="60" cy="60" rx="52" ry="46" fill="url(#targetGrad1)" opacity="0.9" />
                    <ellipse cx="60" cy="58" rx="46" ry="40" fill="url(#targetGrad2)" />
                    <ellipse cx="60" cy="58" rx="34" ry="30" fill="url(#targetGrad1)" />
                    <ellipse cx="60" cy="58" rx="22" ry="19" fill="url(#targetGrad2)" />
                    <ellipse cx="60" cy="58" rx="12" ry="10" fill="#4338CA" />
                    {/* Dart Arrow pointing into center */}
                    <g transform="translate(68, 30) rotate(-35)">
                      <rect x="0" y="0" width="6" height="34" rx="2" fill="#3B82F6" />
                      <polygon points="-4,34 10,34 3,46" fill="#1D4ED8" />
                      <polygon points="-6,0 12,0 3,-10" fill="#60A5FA" />
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
              className="relative w-full max-w-[660px] rounded-3xl bg-white shadow-2xl shadow-blue-500/10 border border-slate-200/90 overflow-hidden flex transform lg:rotate-[-2deg] lg:hover:rotate-0 transition-transform duration-500"
            >

              {/* ── Dark Left Sidebar ── */}
              <div className="w-14 sm:w-16 bg-[#0F172A] text-slate-400 flex flex-col items-center py-5 justify-between shrink-0">
                {/* Logo top */}
                <div className="space-y-6 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center p-1.5">
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
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Home className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        activeTab === 'analytics'
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <LineChart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('campaigns')}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('target')}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    >
                      <Target className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab('users')}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                    >
                      <Users className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Settings Bottom */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-all">
                  <Settings className="w-4 h-4" />
                </div>
              </div>

              {/* ── Main Dashboard Body ── */}
              <div className="flex-1 p-4 sm:p-6 bg-white space-y-4 min-w-0">

                {/* Top Header Row */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
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
                  <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <LineChart className="w-3 h-3 text-blue-500" />
                      <span>Clicks</span>
                    </div>
                    <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">12.6K</p>
                    <p className="text-[10px] font-bold text-blue-600 mt-0.5">↑ 28.5%</p>
                    {/* Blue sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d="M0,14 Q10,4 20,11 T40,6 T60,2" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 2: Conversions */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                      <span>Conversions</span>
                    </div>
                    <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">1.46K</p>
                    <p className="text-[10px] font-bold text-emerald-600 mt-0.5">↑ 32.1%</p>
                    {/* Green sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d="M0,15 Q15,6 28,12 T45,7 T60,3" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 3: Cost / Conv. */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <LineChart className="w-3 h-3 text-amber-500" />
                      <span>Cost / Conv.</span>
                    </div>
                    <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">$6.23</p>
                    <p className="text-[10px] font-bold text-amber-600 mt-0.5">↓ 14.3%</p>
                    {/* Orange sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d="M0,5 Q15,14 30,8 T45,13 T60,16" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Card 4: Conv. Value */}
                  <div className="p-3 rounded-2xl bg-white border border-slate-100 shadow-soft-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                      <Zap className="w-3 h-3 text-purple-500" />
                      <span>Conv. Value</span>
                    </div>
                    <p className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">$45.2K</p>
                    <p className="text-[10px] font-bold text-purple-600 mt-0.5">↑ 35.7%</p>
                    {/* Purple sparkline */}
                    <svg viewBox="0 0 60 18" className="w-full h-4 mt-1.5 overflow-visible">
                      <path d="M0,16 Q12,8 25,12 T48,6 T60,1" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* ── Main Dual-Line Graph Area ── */}
                <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <span className="font-bold text-slate-700">Clicks Trend</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="font-bold text-slate-700">Conversions</span>
                      </div>
                    </div>
                    <span className="font-semibold text-slate-400">Daily Updates</span>
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

                      {/* Conversions Area Fill (Green) */}
                      <defs>
                        <linearGradient id="greenFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <polygon
                        points="0,85 20,80 45,86 70,72 95,78 120,65 150,68 180,52 210,56 240,42 270,45 295,30 320,38 320,100 0,100"
                        fill="url(#greenFill)"
                      />
                      {/* Green Conversions Line */}
                      <path
                        d="M0,85 Q20,80 45,86 T95,78 T150,68 T210,56 T270,45 T320,38"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />

                      <polygon
                        points="0,65 20,62 45,50 70,55 95,38 120,44 150,32 180,36 210,24 240,28 270,16 295,20 320,8 320,100 0,100"
                        fill="url(#blueFill)"
                      />
                      {/* Blue Clicks Line */}
                      <path
                        d="M0,65 Q20,62 45,50 T95,38 T150,32 T210,24 T270,16 T320,8"
                        fill="none"
                        stroke="#2563EB"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Peak Interactive Ping */}
                      <circle cx="270" cy="16" r="3.5" fill="#2563EB" />
                      <circle cx="270" cy="16" r="7" fill="#3B82F6" opacity="0.3" className="animate-ping" />
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
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div>
                  {/* Small avatar overlaps */}
                  <div className="flex items-center -space-x-1.5 mb-1">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 border border-white flex items-center justify-center text-[8px] font-black text-white">A</div>
                    <div className="w-5 h-5 rounded-full bg-blue-500 border border-white flex items-center justify-center text-[8px] font-black text-white">S</div>
                    <div className="w-5 h-5 rounded-full bg-purple-500 border border-white flex items-center justify-center text-[8px] font-black text-white">M</div>
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
                        {/* Background circle */}
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                        {/* Blue Search 55% */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#2563EB" strokeWidth="4"
                          strokeDasharray="55 100"
                          strokeDashoffset="0"
                        />
                        {/* Green Display 25% */}
                        <circle
                          cx="18" cy="18" r="14" fill="transparent"
                          stroke="#10B981" strokeWidth="4"
                          strokeDasharray="25 100"
                          strokeDashoffset="-55"
                        />
                        {/* Orange Shopping 20% */}
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
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Search
                        </span>
                        <span className="text-slate-900 font-extrabold">55%</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Display
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
