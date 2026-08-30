import React, { useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, DollarSign, Target, ShoppingBag, Search, Users, Sparkles, Star, Zap } from 'lucide-react';

export default function Hero({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth mouse tracking for ambient cursor glow behind analytics panel
  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.04, y: y * 0.04 });
  };

  // Subtle scroll parallax for hero visual on desktop
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : -25]);

  // Avatars for social proof trust stack
  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80'
  ];

  // Page Load Stagger Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] },
    },
  };

  const panelVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.85, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.2 },
    },
  };

  // SVG Graph Path & Area Definitions
  const currentPathD = "M 20 135 C 70 120, 140 130, 190 115 C 240 100, 270 75, 310 75 C 350 75, 380 60, 410 55 C 440 50, 460 20, 480 20";
  const previousPathD = "M 20 155 Q 140 145, 260 135 T 480 115";
  const areaFillD = "M 20 135 C 70 120, 140 130, 190 115 C 240 100, 270 75, 310 75 C 350 75, 380 60, 410 55 C 440 50, 460 20, 480 20 L 480 170 L 20 170 Z";

  const dataPoints = [
    { x: 20, y: 135 },
    { x: 105, y: 122 },
    { x: 190, y: 115 },
    { x: 310, y: 75 },
    { x: 410, y: 55 },
    { x: 480, y: 20 },
  ];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-[#FAFCFB] hero-gradient-bg min-h-[calc(100vh-64px)] flex items-center justify-center"
    >
      {/* Background Mesh Blobs */}
      <div className="hero-mesh-blob-left pointer-events-none opacity-45"></div>
      <div className="hero-mesh-blob-right pointer-events-none opacity-45"></div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* MAIN 2-COLUMN / MOBILE STACKED LAYOUT */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
        >
          
          {/* LEFT COLUMN: Text Copy + Social Proof */}
          <div className="lg:col-span-5 space-y-5 text-left">
            
            {/* Pill Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50/90 border border-emerald-200/80 shadow-2xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-800 tracking-wider uppercase">
                  GOOGLE ADS • PPC • PERFORMANCE MARKETING
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[48px] xl:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.08]"
            >
              Turn Clicks Into <br className="hidden sm:inline" />
              <span className="animated-gradient-text underline decoration-emerald-300 decoration-wavy underline-offset-4">
                Profitable Growth.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-md"
            >
              Data-driven Google Ads campaigns designed to increase conversions, improve ROAS and scale your business profitably.
            </motion.p>

            {/* Client Avatars & Rating Stack */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
              <div className="flex -space-x-2 overflow-hidden">
                {avatars.map((imgUrl, i) => (
                  <img
                    key={i}
                    src={imgUrl}
                    alt="Client avatar"
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover shadow-2xs"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-extrabold text-slate-900 ml-1">4.9/5 Rating</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500">
                  Trusted by <strong className="text-emerald-700 font-bold">50+ E-Commerce Brands</strong>
                </p>
              </div>
            </motion.div>

            {/* Action CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <motion.button
                onClick={onBookCall}
                whileHover={shouldReduceMotion ? {} : { y: -2, boxShadow: '0 14px 28px -6px rgba(16, 185, 129, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                className="button-shine px-6 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold text-sm rounded-full transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer ring-4 ring-emerald-500/15"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.a
                href="#case-studies"
                whileHover={shouldReduceMotion ? {} : { y: -1 }}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm rounded-full border border-slate-200/90 shadow-2xs transition-all flex items-center justify-center hover:border-slate-300"
              >
                <span>View Case Studies</span>
              </motion.a>
            </motion.div>

            {/* Minimal Trust Indicator */}
            <motion.div variants={itemVariants} className="pt-1">
              <p className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Trusted by 50+ growing businesses worldwide</span>
              </p>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Ultra-Attractive Floating Dashboard Visual Panel */}
          <div className="lg:col-span-7 relative w-full">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 grid-dots-pattern opacity-30 pointer-events-none rounded-3xl"></div>
            
            {/* Cursor Ambient Glow */}
            <motion.div
              animate={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-emerald-600/10 rounded-3xl blur-3xl pointer-events-none"
            />

            {/* Floating Top-Right KPI Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -top-4 -right-2 sm:top-2 sm:right-2 z-30 bg-slate-900/95 text-white px-3 py-1.5 rounded-2xl shadow-xl border border-slate-700/80 backdrop-blur-md flex items-center gap-2 text-xs font-extrabold"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-[9px] text-slate-400 uppercase font-bold leading-none">Total Revenue</p>
                <p className="text-xs font-black text-emerald-400">$142.8K <span className="text-[9px] text-emerald-300 font-semibold">↑ 31.8%</span></p>
              </div>
            </motion.div>

            {/* Floating Bottom-Left KPI Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="hidden sm:flex absolute -bottom-4 -left-3 z-30 bg-white/95 text-slate-900 px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/90 backdrop-blur-md items-center gap-2.5"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-100/90 text-emerald-600 flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-bold leading-none">Acquisition CPA</p>
                <p className="text-xs font-black text-slate-900">$32.40 <span className="text-[10px] font-bold text-emerald-600">↓ 18.6%</span></p>
              </div>
            </motion.div>

            {/* MAIN FLOATING GOOGLE ADS PERFORMANCE ANALYTICS PANEL */}
            <motion.div
              variants={panelVariants}
              style={{ y: parallaxY }}
              animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl shadow-emerald-950/5 rounded-3xl p-5 sm:p-7 space-y-4 text-left z-10 overflow-hidden live-scanline"
            >
              
              {/* TOP HEADER: Live Pulse Indicator & Engine Badge */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-extrabold text-slate-800 tracking-wider uppercase">
                    LIVE CAMPAIGN PERFORMANCE
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>Google Ads AI Engine</span>
                </div>
              </div>

              {/* MAIN METRIC ROW */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    4.85× ROAS
                  </span>
                  <span className="ml-3 inline-flex items-center text-xs font-black text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                    ↑ 24.2% vs previous period
                  </span>
                </div>
              </div>

              {/* DUAL-LINE HIGH-IMPACT SVG GRAPH */}
              <div className="relative h-44 sm:h-52 w-full pt-2">
                
                {/* Floating Peak Tooltip */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="absolute top-0 right-[1%] z-20 bg-slate-900 text-white px-3 py-1.5 rounded-xl shadow-lg border border-slate-700 text-left"
                >
                  <p className="font-extrabold text-white text-xs leading-tight">4.85× ROAS</p>
                  <p className="text-[10px] font-bold text-emerald-400">↑ 24.2% YoY</p>
                </motion.div>

                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="emeraldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="emeraldTealGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="50%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                    <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#10B981" floodOpacity="0.45" />
                    </filter>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="20" y1="20" x2="480" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="20" y1="65" x2="480" y2="65" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="20" y1="115" x2="480" y2="115" stroke="#F1F5F9" strokeWidth="1" />
                  <line x1="20" y1="160" x2="480" y2="160" stroke="#F1F5F9" strokeWidth="1" />

                  {/* Previous Period Thin Dotted Line */}
                  <path
                    d={previousPathD}
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="1.8"
                    strokeDasharray="5 5"
                  />

                  {/* Gradient Area Fill */}
                  <motion.path
                    d={areaFillD}
                    fill="url(#emeraldAreaGrad)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />

                  {/* Dominant Multi-Gradient Curve with Glow */}
                  <motion.path
                    d={currentPathD}
                    fill="none"
                    stroke="url(#emeraldTealGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#glowEffect)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0.1 : 1.2, ease: "easeInOut" }}
                  />

                  {/* Data Point Nodes */}
                  {dataPoints.map((pt, i) => (
                    <g key={i}>
                      <motion.circle
                        cx={pt.x}
                        cy={pt.y}
                        r="3.5"
                        fill="#10B981"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.12, duration: 0.3 }}
                      />
                    </g>
                  ))}

                  {/* Peak Point Radar Ping */}
                  <motion.circle
                    cx="480"
                    cy="20"
                    r="8"
                    fill="#10B981"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  />
                  <circle cx="480" cy="20" r="4.5" fill="#059669" stroke="#FFFFFF" strokeWidth="2.5" />
                </svg>

              </div>

              {/* INTEGRATED CAMPAIGN CHANNELS BREAKDOWN BAR */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                
                <div className="flex items-center gap-2 p-1.5 bg-slate-50/80 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900">Shopping</p>
                    <p className="text-[10px] font-black text-emerald-600">45%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 bg-slate-50/80 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900">PMax AI</p>
                    <p className="text-[10px] font-black text-blue-600">25%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 bg-slate-50/80 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                    <Search className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900">Search</p>
                    <p className="text-[10px] font-black text-amber-600">20%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-1.5 bg-slate-50/80 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-900">Remarketing</p>
                    <p className="text-[10px] font-black text-purple-600">10%</p>
                  </div>
                </div>

              </div>

            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}




