import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { metricsData } from '../data/portfolioData';
import { Activity, ShieldCheck, TrendingUp, Zap, BarChart3, Users, Clock, Target, ArrowUpRight } from 'lucide-react';

/* ─── Animated counter ─── */
function AnimatedValue({ value, suffix = '', prefix = '', duration = 2200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!isInView) return;
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) { setDisplay(value); return; }
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(eased * numericValue));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplay(numericValue);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const isNumeric = !isNaN(parseFloat(value.replace(/[^0-9.]/g, '')));

  return (
    <span ref={ref}>
      {isNumeric ? `${prefix}${display}${suffix}` : value}
    </span>
  );
}

/* ─── Metric configs with unique visuals ─── */
const metricConfigs = [
  {
    icon: Users,
    gradient: 'from-emerald-500 via-emerald-400 to-teal-500',
    glowColor: 'rgba(16,185,129,0.2)',
    bgGradient: 'from-emerald-500/10 to-teal-500/5',
    ringColor: 'ring-emerald-500/20',
    numericValue: 50, suffix: '+', prefix: '',
  },
  {
    icon: BarChart3,
    gradient: 'from-sky-500 via-blue-400 to-indigo-500',
    glowColor: 'rgba(14,165,233,0.2)',
    bgGradient: 'from-sky-500/10 to-indigo-500/5',
    ringColor: 'ring-sky-500/20',
    numericValue: 100, suffix: '%', prefix: '',
  },
  {
    icon: Clock,
    gradient: 'from-violet-500 via-purple-400 to-fuchsia-500',
    glowColor: 'rgba(139,92,246,0.2)',
    bgGradient: 'from-violet-500/10 to-fuchsia-500/5',
    ringColor: 'ring-violet-500/20',
    numericValue: null, suffix: '', prefix: '', displayValue: '24/7',
  },
  {
    icon: Target,
    gradient: 'from-amber-500 via-orange-400 to-rose-500',
    glowColor: 'rgba(245,158,11,0.2)',
    bgGradient: 'from-amber-500/10 to-rose-500/5',
    ringColor: 'ring-amber-500/20',
    numericValue: null, suffix: '', prefix: '', displayValue: 'Growth',
  },
];

export default function Metrics() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">

      {/* ─── Full-section dark gradient background ─── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950" />

      {/* Ambient mesh blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 65%)' }} />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 65%)' }} />
      </div>

      {/* Dot grid pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Horizontal decorative lines */}
      <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[11px] font-bold text-emerald-300 tracking-widest uppercase">
              Performance First
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-white tracking-tight leading-[1.22] pb-1 mb-5">
            Performance Is{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Measured In Results.
            </span>
          </h2>

          <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Every campaign decision is grounded in unit economics, revenue expansion, and profitable ROAS goals, not vanity metrics.
          </p>
        </motion.div>

        {/* ═══ 4 METRIC CARDS ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {metricsData.map((item, idx) => {
            const config = metricConfigs[idx] || metricConfigs[0];
            const Icon = config.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Hover glow */}
                <div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: config.glowColor }}
                />

                {/* Card body */}
                <div className="relative h-full rounded-3xl bg-slate-900/90 border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 overflow-hidden p-7 sm:p-8 text-center">

                  {/* Background subtle gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${config.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  {/* Scanline sweep */}
                  <div className="absolute inset-0 live-scanline opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.gradient} mx-auto flex items-center justify-center shadow-xl mb-6 ring-4 ${config.ringColor}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>

                    {/* Value */}
                    <p className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-none mb-3 tabular-nums">
                      {config.numericValue !== null ? (
                        <AnimatedValue
                          value={item.value}
                          suffix={config.suffix}
                          prefix={config.prefix}
                        />
                      ) : (
                        <span>{config.displayValue || item.value}</span>
                      )}
                    </p>

                    {/* Label */}
                    <p className="text-sm font-bold text-white/70 mb-1.5">{item.label}</p>

                    {/* Description */}
                    <p className="text-xs text-white/30 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Corner decorative dot */}
                  <div className={`absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r ${config.gradient} opacity-40 group-hover:opacity-100 transition-opacity`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ═══ BOTTOM ACCOUNTABILITY STRIP ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 lg:mt-16"
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Glass background */}
            <div className="absolute inset-0 bg-slate-900/90 border border-white/[0.08]" />
            {/* Emerald accent line on left */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full" />

            <div className="relative z-10 py-5 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm tracking-tight">Accountability & Verified Measurement</h4>
                  <p className="text-xs text-white/35 mt-0.5">Campaign scaling milestones measured directly against client gross margins and net revenue targets.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300">Zero Vanity Metrics</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20">
                  <TrendingUp className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-bold text-sky-300">Revenue Focused</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
