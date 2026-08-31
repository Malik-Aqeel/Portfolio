import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { whyChooseMe } from '../data/portfolioData';
import {
  BarChart4, ShoppingBag, RefreshCw, Layers, MessageSquare, Zap,
  ArrowUpRight, Sparkles, CheckCircle2, Trophy
} from 'lucide-react';

export default function WhyChooseMe() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const iconMap = {
    BarChart4: BarChart4,
    ShoppingBag: ShoppingBag,
    RefreshCw: RefreshCw,
    Layers: Layers,
    MessageSquare: MessageSquare,
    Zap: Zap,
  };

  // Unique gradient combos per card (light theme)
  const cardThemes = [
    {
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      glowColor: 'rgba(16, 185, 129, 0.18)',
      accentBorder: 'hover:border-emerald-300',
      tagColor: 'text-emerald-600',
      number: '01',
    },
    {
      iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600',
      glowColor: 'rgba(14, 165, 233, 0.18)',
      accentBorder: 'hover:border-sky-300',
      tagColor: 'text-sky-600',
      number: '02',
    },
    {
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
      glowColor: 'rgba(139, 92, 246, 0.18)',
      accentBorder: 'hover:border-violet-300',
      tagColor: 'text-violet-600',
      number: '03',
    },
    {
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
      glowColor: 'rgba(245, 158, 11, 0.18)',
      accentBorder: 'hover:border-amber-300',
      tagColor: 'text-amber-600',
      number: '04',
    },
    {
      iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600',
      glowColor: 'rgba(244, 63, 94, 0.18)',
      accentBorder: 'hover:border-rose-300',
      tagColor: 'text-rose-600',
      number: '05',
    },
    {
      iconBg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
      glowColor: 'rgba(20, 184, 166, 0.18)',
      accentBorder: 'hover:border-teal-300',
      tagColor: 'text-teal-600',
      number: '06',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1.0] },
    },
  };

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)',
      }}
    >
      {/* ═══ Ambient Background Effects ═══ */}

      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 -left-40 w-[700px] h-[700px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-20 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)' }}
        />
      </div>

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Animated floating particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.15, 0.4, 0.15],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/60 shadow-sm backdrop-blur-md mb-6">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
              Competitive Advantage
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight leading-[1.22] pb-1 mb-5">
            Why Brands Choose{' '}
            <br className="hidden sm:block" />
            <span className="animated-gradient-text">
              To Work With Me.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Specialized performance expertise with standard-setting accountability, transparent communication, and an obsession with your bottom-line results.
          </p>
        </motion.div>

        {/* ═══ PREMIUM BENTO CARDS GRID ═══ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {whyChooseMe.map((item, idx) => {
            const theme = cardThemes[idx] || cardThemes[0];
            const Icon = iconMap[item.iconName] || Zap;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={shouldReduceMotion ? {} : {
                  y: -8,
                  transition: { duration: 0.3, ease: [0.215, 0.61, 0.355, 1] },
                }}
                className={`group relative rounded-3xl cursor-default ${theme.accentBorder}`}
              >
                {/* Dynamic glow on hover */}
                <motion.div
                  className="absolute -inset-px rounded-3xl pointer-events-none"
                  animate={{
                    boxShadow: isHovered
                      ? `0 0 40px 8px ${theme.glowColor}, 0 20px 50px -10px ${theme.glowColor}`
                      : '0 0 0px 0px transparent',
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Card background */}
                <div className="relative h-full rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 p-7 sm:p-8 overflow-hidden transition-all duration-500 group-hover:bg-white group-hover:border-slate-300/80 group-hover:shadow-xl">

                  {/* Corner number watermark */}
                  <span className="absolute top-5 right-6 text-[80px] font-black text-slate-100 leading-none tracking-tighter pointer-events-none select-none group-hover:text-slate-200/80 transition-all duration-700">
                    {theme.number}
                  </span>

                  {/* Top row: Icon + Arrow */}
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    {/* Animated icon container */}
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center shadow-lg relative`}
                    >
                      <Icon className="w-6 h-6 text-white" />

                      {/* Icon subtle pulse ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl ${theme.iconBg} opacity-0 group-hover:opacity-30`}
                        animate={isHovered ? { scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Arrow indicator */}
                    <motion.div
                      className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                      animate={isHovered ? { x: [0, 3, 0], y: [0, -3, 0] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-slate-500" />
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight leading-snug group-hover:text-slate-900 transition-colors relative z-10">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors relative z-10">
                    {item.desc}
                  </p>

                  {/* Bottom divider line with verified tag */}
                  <div className="mt-6 pt-5 border-t border-slate-100 relative z-10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-[11px] font-bold text-emerald-600 tracking-wide uppercase">
                        Proven & Documented
                      </span>
                    </div>
                  </div>

                  {/* Decorative gradient line at bottom edge */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${theme.glowColor.replace('0.18', '0.6')} 50%, transparent 100%)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══ BOTTOM TRUST BAR ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {[
            { icon: <Sparkles className="w-4 h-4 text-amber-500" />, text: 'No Long-Term Contracts' },
            { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: '100% Transparent Reporting' },
            { icon: <Zap className="w-4 h-4 text-sky-500" />, text: 'Results Within 30 Days' },
          ].map((trust, i) => (
            <motion.div
              key={i}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300"
            >
              {trust.icon}
              <span className="text-xs font-bold text-slate-700 tracking-wide">
                {trust.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
