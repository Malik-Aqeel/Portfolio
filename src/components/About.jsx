import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import {
  CheckCircle2, ArrowRight, Award, TrendingUp, Sparkles,
  ShieldCheck, Zap, BarChart3, DollarSign, Target,
  Globe, Users, LineChart, Layers, ArrowUpRight
} from 'lucide-react';
import { personalInfo, aboutChecklist } from '../data/portfolioData';
import profilePic from '../assets/profile_pic.jpeg';

/* ─── Animated counter hook ─── */
function useAnimatedCounter(target, duration = 2000, startOnView = false) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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

/* ─── Stat counter card ─── */
function StatCard({ stat, index, shouldReduceMotion }) {
  const { count, ref } = useAnimatedCounter(stat.value, 1800, true);
  const Icon = stat.icon;
  const suffix = stat.value.replace(/[0-9.]/g, '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.25 } }}
      className="group relative"
    >
      {/* Hover glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-emerald-500/20 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative h-full p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-emerald-300/60 transition-all duration-500">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm ${stat.gradient}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-0.5">
          <span className="text-3xl font-black text-slate-900 tracking-tight tabular-nums">
            {stat.prefix || ''}{count}{suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-sm font-bold text-slate-700 mt-1">{stat.label}</p>
        <p className="text-xs text-slate-400 font-medium mt-0.5">{stat.sub}</p>

        {/* Decorative corner accent */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
        </div>
      </div>
    </motion.div>
  );
}

export default function About({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();

  const aboutStats = [
    { label: 'Brands Scaled', value: '50+', icon: Users, sub: 'International DTC & E-com', gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600', prefix: '' },
    { label: 'Ad Spend Managed', value: '15', icon: DollarSign, sub: 'Profitable Execution', gradient: 'bg-gradient-to-br from-teal-500 to-teal-600', prefix: '$', suffix: 'M+' },
    { label: 'Avg ROAS Lift', value: '3.4', icon: TrendingUp, sub: 'Consistent & Documented', gradient: 'bg-gradient-to-br from-sky-500 to-sky-600', prefix: '' },
    { label: 'Global Markets', value: '12+', icon: Globe, sub: 'US, UK, EU, AU & Beyond', gradient: 'bg-gradient-to-br from-indigo-500 to-indigo-600', prefix: '' },
  ];

  /* Specializations grouped */
  const specializations = [
    { icon: Target, label: 'Google Ads Strategy & Architecture', tag: 'Core' },
    { icon: Layers, label: 'Performance Max & Shopping Campaigns', tag: 'Core' },
    { icon: BarChart3, label: 'Server-Side Tracking & Enhanced Conversions', tag: 'Technical' },
    { icon: LineChart, label: 'Feed Optimization & Custom Labeling', tag: 'Technical' },
    { icon: Zap, label: 'Profitable Scaling & ROAS Optimization', tag: 'Growth' },
    { icon: Award, label: 'A/B Testing & Audience Analysis', tag: 'Growth' },
  ];

  const tagColors = {
    Core: 'bg-emerald-100 text-emerald-700',
    Technical: 'bg-sky-100 text-sky-700',
    Growth: 'bg-amber-100 text-amber-700',
  };

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)' }}>

      {/* ─── Decorative ambient meshes ─── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-32 w-[500px] h-[500px] rounded-full opacity-40" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 -right-32 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 60%)' }} />
      </div>

      {/* Fine dot grid overlay */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/60 shadow-sm backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
              About My Work
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight leading-[1.22] pb-1 mb-5">
            More Than Running Ads.{' '}
            <br className="hidden sm:block" />
            <span className="animated-gradient-text">
              I Engineer Growth.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Combining deep technical feed architecture, machine learning bid strategy, and bulletproof server-side tracking to turn ad spend into predictable, profitable revenue.
          </p>
        </motion.div>

        {/* ═══ BENTO GRID LAYOUT ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">

          {/* ─── LEFT: Philosophy card (spans 5 cols) ─── */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 lg:row-span-2"
          >
            <div className="relative h-full rounded-3xl overflow-hidden group">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900" />

              {/* Mesh overlay */}
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(16,185,129,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(14,165,233,0.2) 0%, transparent 50%)' }} />

              {/* Subtle grid dots */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

              <div className="relative z-10 p-7 sm:p-9 flex flex-col h-full min-h-[520px] justify-between">
                {/* Top badges row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] font-bold tracking-wider uppercase">Google Certified</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-300 tracking-wider uppercase">Available</span>
                  </div>
                </div>

                {/* Center content */}
                <div className="space-y-6 py-8">
                  {/* Profile Picture */}
                  <div className="relative w-24 h-24">
                    {/* Orbital ring */}
                    <motion.div
                      animate={shouldReduceMotion ? {} : { rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-2 rounded-full border border-dashed border-emerald-500/30"
                    />
                    {/* Inner ring */}
                    <motion.div
                      animate={shouldReduceMotion ? {} : { rotate: -360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                      className="absolute -inset-1 rounded-full border border-emerald-400/20"
                    />
                    {/* Profile image */}
                    <img
                      src={profilePic}
                      alt={personalInfo.name}
                      className="w-24 h-24 rounded-full object-cover ring-3 ring-emerald-500/40 shadow-lg shadow-emerald-500/20"
                    />
                    {/* Online dot */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-slate-900 shadow-sm" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                        {personalInfo.name}
                      </h3>
                      <p className="text-sm font-bold text-emerald-400/80 mt-1 tracking-wide">
                        Google Ads & E-commerce Growth Specialist
                      </p>
                    </div>
                    <p className="text-lg font-bold text-emerald-400 tracking-tight">
                      I Build Predictable Revenue Systems.
                    </p>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                    Traditional agencies chase vanity metrics. I focus entirely on lowering CPA, multiplying ROAS, and turning your product catalog into a high-intent cashflow engine.
                  </p>
                </div>

                {/* Bottom metric strip */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Tracking Integrity</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '99.4%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                        />
                      </div>
                      <span className="text-xs font-black text-emerald-400">99.4%</span>
                    </div>
                  </div>
                  <div className="flex-1 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Avg ROAS</p>
                    <p className="text-xl font-black text-white mt-0.5">3.4×<span className="text-xs text-emerald-400 font-bold ml-1.5">↑ Lift</span></p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT TOP: 4 Stat counter cards (spans 7 cols) ─── */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {aboutStats.map((stat, i) => (
              <StatCard key={i} stat={stat} index={i} shouldReduceMotion={shouldReduceMotion} />
            ))}
          </div>

          {/* ─── RIGHT BOTTOM: Specializations grid (spans 7 cols) ─── */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7"
          >
            <div className="rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-200/70 shadow-sm p-6 sm:p-7">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-sm">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 tracking-tight">Core Expertise</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Proven specializations & execution</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-700">Verified</span>
                </div>
              </div>

              {/* Specialization items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {specializations.map((spec, idx) => {
                  const SpecIcon = spec.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.06 }}
                      whileHover={shouldReduceMotion ? {} : { x: 4, transition: { duration: 0.2 } }}
                      className="group flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 hover:bg-emerald-50/60 border border-transparent hover:border-emerald-200/60 transition-all duration-300 cursor-default"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-emerald-200 transition-colors">
                        <SpecIcon className="w-4 h-4 text-slate-500 group-hover:text-emerald-600 transition-colors" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors flex-1">{spec.label}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${tagColors[spec.tag]} opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline-block`}>
                        {spec.tag}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══ CTA STRIP ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm"
        >
          <div className="text-center sm:text-left">
            <p className="text-lg font-extrabold text-slate-900 tracking-tight">
              Ready to turn your ad spend into scalable revenue?
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Book a free strategy call — no commitment, just actionable insights.
            </p>
          </div>

          <motion.button
            onClick={onBookCall}
            whileHover={shouldReduceMotion ? {} : { y: -2, boxShadow: '0 16px 32px -8px rgba(5,150,105,0.35)' }}
            whileTap={{ scale: 0.97 }}
            className="button-shine shrink-0 px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-full transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Let's Talk Growth</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
