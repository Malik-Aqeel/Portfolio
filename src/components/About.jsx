import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import {
  ArrowRight, Award, TrendingUp, Sparkles,
  ShieldCheck, Zap, BarChart3, DollarSign, Target,
  Globe, Users, LineChart, Layers, ArrowUpRight, CheckCircle2,
  CheckCircle, Clock, Star, Flame, Cpu
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import profilePic from '../assets/profile_img2.jpeg';

/* ─── Animated counter hook ─── */
function useAnimatedCounter(target, duration = 2000, startOnView = false) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView && startOnView) return;
    if (!isInView) return;
    const numTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(numTarget)) return;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numTarget));
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(numTarget);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration, startOnView]);

  return { count, ref };
}

/* ─── Luxury Stat Counter Card with Built-in Sparkline ─── */
function StatCard({ stat, index, shouldReduceMotion }) {
  const { count, ref } = useAnimatedCounter(stat.value, 1800, true);
  const Icon = stat.icon;
  const suffix = stat.suffix !== undefined ? stat.suffix : stat.value.replace(/[0-9.]/g, '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.25 } }}
      className="group relative h-full"
    >
      <div className="relative h-full p-4 sm:p-5 rounded-2xl glass-card-luxury border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        {/* Ambient inner card glow on hover */}
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-emerald-500/10 filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div>
          {/* Top Row: Icon + Mini Tag */}
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-md ${stat.gradient} text-white group-hover:scale-105 transition-transform shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>

            <span className="text-[9.5px] font-extrabold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200/70">
              {stat.tag}
            </span>
          </div>

          {/* Counter Number */}
          <div className="flex items-baseline gap-0.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight tabular-nums">
              {stat.prefix || ''}{count}{suffix}
            </span>
          </div>

          {/* Label & Description */}
          <p className="text-xs sm:text-sm font-black text-slate-800 mt-1 leading-tight">{stat.label}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-tight">{stat.sub}</p>
        </div>

        {/* Dynamic Glowing Sparkline */}
        <div className="mt-3 pt-2 border-t border-slate-100/90">
          <svg viewBox="0 0 80 18" className="w-full h-4 overflow-visible">
            <path d={stat.spark} fill="none" stroke={stat.sparkColor} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function About({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();

  const aboutStats = [
    {
      label: 'Brands Scaled',
      value: '50+',
      icon: Users,
      sub: 'International DTC & E-com',
      gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      prefix: '',
      tag: '50+ Scaled',
      spark: 'M0,15 Q20,7 40,11 T60,5 T80,2',
      sparkColor: '#059669'
    },
    {
      label: 'Ad Spend Managed',
      value: '15M',
      icon: DollarSign,
      sub: 'Profitable Execution',
      gradient: 'bg-gradient-to-br from-teal-500 to-emerald-700',
      prefix: '$',
      suffix: 'M+',
      tag: '100% Scaled',
      spark: 'M0,16 Q20,10 40,6 T60,4 T80,1',
      sparkColor: '#0D9488'
    },
    {
      label: 'Avg ROAS Lift',
      value: '3.4',
      icon: TrendingUp,
      sub: 'Consistent & Documented',
      gradient: 'bg-gradient-to-br from-sky-500 to-blue-600',
      prefix: '',
      suffix: 'x',
      tag: '+312% Growth',
      spark: 'M0,16 Q20,12 40,8 T60,4 T80,2',
      sparkColor: '#0284C7'
    },
    {
      label: 'Global Markets',
      value: '12+',
      icon: Globe,
      sub: 'US, UK, EU, AU & Beyond',
      gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      prefix: '',
      tag: 'Tier-1 Regions',
      spark: 'M0,14 Q20,8 40,12 T60,5 T80,2',
      sparkColor: '#6366F1'
    },
  ];

  /* Specializations grouped with rich micro-details and impact tags */
  const specializations = [
    {
      icon: Target,
      iconBg: 'from-emerald-500 to-teal-600',
      label: 'Google Ads Strategy & Channel Architecture',
      desc: 'High-intent buyer capture with precision keyword sculpting & negative matrices.',
      tag: '+48% ROAS',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    },
    {
      icon: Layers,
      iconBg: 'from-teal-500 to-cyan-600',
      label: 'Performance Max & Smart Shopping Engine',
      desc: 'Multi-asset group structuring, asset-level scoring, and margin-tiered SKU segmentation.',
      tag: 'Scale Tier',
      tagColor: 'bg-teal-50 text-teal-800 border-teal-200/80',
    },
    {
      icon: BarChart3,
      iconBg: 'from-blue-500 to-indigo-600',
      label: 'Server-Side CAPI & Enhanced Conversions',
      desc: 'Zero attribution loss with first-party cookie data & 99.4% event match quality.',
      tag: '99.4% Match',
      tagColor: 'bg-blue-50 text-blue-800 border-blue-200/80',
    },
    {
      icon: LineChart,
      iconBg: 'from-indigo-500 to-violet-600',
      label: 'Feed Optimization & Custom Label Architecture',
      desc: 'Merchant Center feed enrichment, title optimization, and zombie product revival.',
      tag: '-34% Waste',
      tagColor: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    },
    {
      icon: Zap,
      iconBg: 'from-amber-500 to-orange-600',
      label: 'Profitable Budget Scaling & Bid Systems',
      desc: 'Target ROAS and tCPA algorithmic scaling without diminishing margin returns.',
      tag: '3.4x - 6.8x',
      tagColor: 'bg-amber-50 text-amber-800 border-amber-200/80',
    },
    {
      icon: Award,
      iconBg: 'from-sky-500 to-cyan-600',
      label: 'Continuous A/B Testing & Audience Matrix',
      desc: 'First-party customer cohort remarketing, cart abandonment recovery, and LTV scaling.',
      tag: 'Compounding',
      tagColor: 'bg-sky-50 text-sky-800 border-sky-200/80',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 lg:py-28 relative overflow-hidden select-none"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F6FAF8 30%, #EEF7F3 65%, #F8FAFB 100%)' }}
    >
      {/* ─── Decorative Ambient Meshes & Auroras ─── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute top-16 -left-32 w-[600px] h-[600px] rounded-full opacity-35 filter blur-[90px]"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(20,184,166,0.08) 50%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-16 -right-32 w-[650px] h-[650px] rounded-full opacity-30 filter blur-[95px]"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(99,102,241,0.08) 50%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 filter blur-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 65%)' }}
        />
      </div>

      {/* Subtle Dot Matrix Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #059669 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Luxury Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill-luxury border border-emerald-300/60 shadow-soft-sm mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-extrabold text-emerald-800 tracking-wider uppercase">
              Growth Architecture & Google Ads
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-black text-slate-900 tracking-tight leading-[1.18] pb-1 mb-4">
            More Than Running Ads.
            <br />
            <span className="relative inline-block mt-1">
              <span className="animated-growth-gradient font-black">
                I Engineer Growth.
              </span>
              {/* Hand-drawn Accent curve with vibrant gradient */}
              <svg
                className="absolute -bottom-2.5 left-0 w-full h-3.5 pointer-events-none overflow-visible"
                viewBox="0 0 260 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="aboutCurveWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="30%" stopColor="#10B981" />
                    <stop offset="70%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M3 9C65 2 195 2 257 8"
                  stroke="url(#aboutCurveWaveGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: 'easeOut' }}
                />
              </svg>
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto pt-2">
            Combining deep technical feed architecture, machine learning bid strategies, and bulletproof server-side tracking to turn ad spend into predictable, compounding revenue.
          </p>
        </motion.div>

        {/* ═══ BENTO GRID LAYOUT ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* ─── LEFT: Executive Bio Spotlight Card (Dark Luxury Glass) ─── */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 h-full"
          >
            <div className="relative h-full rounded-3xl dark-card-luxury overflow-hidden group p-6 sm:p-8 flex flex-col justify-between">
              {/* Internal ambient radial glow */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-emerald-500/20 filter blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-cyan-500/15 filter blur-3xl pointer-events-none" />

              <div>
                {/* Top Badges Row */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  {/* Google Certified Badge with 4 Colors */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-bold text-slate-200 tracking-wider uppercase">Google Certified</span>
                    <span className="flex gap-0.5 ml-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                  </div>

                  {/* Availability Beacon */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-300 tracking-wider uppercase">Available Q3</span>
                  </div>
                </div>

                {/* Profile Avatar & Info */}
                <div className="pt-6 pb-5 space-y-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar with Dual Orbital Rings & Halo */}
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 shrink-0">
                      <motion.div
                        animate={shouldReduceMotion ? {} : { rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-2 rounded-full border border-dashed border-emerald-400/30"
                      />
                      <motion.div
                        animate={shouldReduceMotion ? {} : { rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-1 rounded-full border border-teal-400/20"
                      />
                      <img
                        src={profilePic}
                        alt={personalInfo.name}
                        className="w-full h-full rounded-full object-cover ring-2 ring-emerald-400/50 shadow-xl"
                      />
                      {/* Active Online Indicator */}
                      <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-xs" />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                        {personalInfo.name}
                      </h3>
                      <p className="text-xs font-bold text-emerald-400 mt-0.5">
                        Google Ads & E-commerce Specialist
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-[11px] font-bold text-slate-300 ml-1">5.0 (50+ Brands)</span>
                      </div>
                    </div>
                  </div>

                  {/* Philosophy Statement */}
                  <div className="space-y-2 pt-2">
                    <p className="text-base font-extrabold text-emerald-300 tracking-tight leading-snug">
                      "I don't just manage campaigns. I build revenue systems that scale profitably."
                    </p>
                    <p className="text-slate-300/80 text-xs sm:text-sm leading-relaxed">
                      Traditional agencies chase vanity clicks. I focus entirely on lowering CPA, multiplying ROAS, and turning your product catalog into a high-intent cashflow engine.
                    </p>
                  </div>

                  {/* Specialist Skill Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-[10.5px] font-bold text-slate-200">
                      ✦ High-Intent Search
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-[10.5px] font-bold text-slate-200">
                      ✦ PMax Scaling
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-[10.5px] font-bold text-slate-200">
                      ✦ Server-Side CAPI
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-[10.5px] font-bold text-slate-200">
                      ✦ DTC Profit Focus
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Live Growth Telemetry Bar */}
              <div className="pt-4 mt-2 border-t border-slate-800 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {/* Gauge 1: Tracking Integrity */}
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Tracking Integrity</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '99.4%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                        />
                      </div>
                      <span className="text-xs font-black text-emerald-400">99.4%</span>
                    </div>
                  </div>

                  {/* Gauge 2: Avg ROAS */}
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                    <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Avg ROAS Lift</p>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span className="text-base font-black text-white">3.4x</span>
                      <span className="text-[9.5px] font-extrabold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-800">
                        ↑ Documented
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] font-semibold text-emerald-400/90 text-center tracking-wide">
                  ✓ Zero guesswork. 100% verified mathematics.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT: 4 Stat Cards + 6 Core Expertise Grid ─── */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">

            {/* ── Top Row: 4 Dynamic Stat Cards with Sparklines ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {aboutStats.map((stat, i) => (
                <StatCard key={i} stat={stat} index={i} shouldReduceMotion={shouldReduceMotion} />
              ))}
            </div>

            {/* ── Bottom: 6 Core Expertise Interactive Cards ── */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
              className="rounded-3xl glass-card-luxury border border-slate-200/80 p-5 sm:p-6 shadow-md"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xs">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 tracking-tight">Core Growth Architecture</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Proven specializations engineered for maximum return</p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-extrabold text-emerald-800">Field Tested</span>
                </div>
              </div>

              {/* Specialization Cards (2x3 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {specializations.map((spec, idx) => {
                  const SpecIcon = spec.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      whileHover={shouldReduceMotion ? {} : { y: -2, transition: { duration: 0.2 } }}
                      className="group p-3 rounded-2xl bg-white hover:bg-emerald-50/40 border border-slate-200/70 hover:border-emerald-300 shadow-xs hover:shadow-soft-sm transition-all duration-300 flex flex-col justify-between cursor-default"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${spec.iconBg} text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                          <SpecIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-xs font-black text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                              {spec.label}
                            </h5>
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border shrink-0 ${spec.tagColor}`}>
                              {spec.tag}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-tight mt-1 line-clamp-2">
                            {spec.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </div>

        {/* ═══ EXECUTIVE GROWTH INVITATION CTA STRIP ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 p-6 sm:p-7 rounded-3xl glass-card-luxury border border-emerald-200/80 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Subtle Ambient Backlight in CTA Card */}
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-emerald-500/10 filter blur-2xl pointer-events-none" />

          <div className="text-center lg:text-left space-y-1.5 relative z-10">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Ready to turn your ad spend into predictable, compounding revenue?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Book a complimentary 30-minute growth architecture audit. Zero sales pressure, 100% actionable revenue data.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 pt-1.5 text-[11px] font-bold text-slate-500">
              <span className="flex items-center gap-1 text-emerald-800">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Free 30-Min Audit
              </span>
              <span className="flex items-center gap-1 text-emerald-800">
                <Clock className="w-3.5 h-3.5 text-emerald-600" /> 48h Actionable Roadmap
              </span>
              <span className="flex items-center gap-1 text-emerald-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Direct 1-on-1 With Shehzad
              </span>
            </div>
          </div>

          <motion.button
            onClick={onBookCall}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="button-shine shrink-0 px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm rounded-full button-glow-emerald flex items-center gap-2.5 cursor-pointer relative overflow-hidden z-10 group"
          >
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>Claim Free Growth Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
