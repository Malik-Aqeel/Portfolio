import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { toolsPlatforms } from '../data/portfolioData';
import {
  Target, BarChart, Code2, Store, PieChart, Search,
  ShoppingBag, ShoppingCart, Cpu, Zap, CheckCircle2
} from 'lucide-react';

export default function ToolsPlatforms() {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const iconMap = {
    Target, BarChart, Code2, Store, PieChart, Search, ShoppingBag, ShoppingCart,
  };

  // Unique color themes per tool
  const toolThemes = [
    { bg: 'bg-blue-50', iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600', glow: 'rgba(59,130,246,0.2)', ring: 'ring-blue-500/20' },
    { bg: 'bg-amber-50', iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500', glow: 'rgba(245,158,11,0.2)', ring: 'ring-amber-500/20' },
    { bg: 'bg-indigo-50', iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-600', glow: 'rgba(99,102,241,0.2)', ring: 'ring-indigo-500/20' },
    { bg: 'bg-emerald-50', iconBg: 'bg-gradient-to-br from-emerald-500 to-green-600', glow: 'rgba(16,185,129,0.2)', ring: 'ring-emerald-500/20' },
    { bg: 'bg-sky-50', iconBg: 'bg-gradient-to-br from-sky-500 to-blue-500', glow: 'rgba(14,165,233,0.2)', ring: 'ring-sky-500/20' },
    { bg: 'bg-slate-100', iconBg: 'bg-gradient-to-br from-slate-600 to-slate-700', glow: 'rgba(71,85,105,0.15)', ring: 'ring-slate-500/20' },
    { bg: 'bg-green-50', iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600', glow: 'rgba(34,197,94,0.2)', ring: 'ring-green-500/20' },
    { bg: 'bg-purple-50', iconBg: 'bg-gradient-to-br from-purple-500 to-violet-600', glow: 'rgba(168,85,247,0.2)', ring: 'ring-purple-500/20' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.215, 0.61, 0.355, 1.0],
      },
    },
  };

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)',
      }}
    >
      {/* ═══ Background Effects ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full opacity-35"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-20 -left-40 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/15"
              style={{ left: `${20 + i * 20}%`, top: `${25 + (i % 2) * 35}%` }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3 + i * 0.8,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/60 shadow-sm backdrop-blur-md mb-6">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
              Tech Ecosystem
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5">
            Powered By The{' '}
            <br className="hidden sm:block" />
            <span className="animated-gradient-text">
              Best Tools.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            I work with the most powerful platforms in the Google ecosystem and leading e-commerce tools to deliver measurable performance.
          </p>
        </motion.div>

        {/* ═══ TOOL CARDS GRID ═══ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5"
        >
          {toolsPlatforms.map((tool, idx) => {
            const theme = toolThemes[idx] || toolThemes[0];
            const Icon = iconMap[tool.icon] || Target;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                whileHover={shouldReduceMotion ? {} : {
                  y: -10,
                  scale: 1.03,
                  transition: { duration: 0.3, ease: [0.215, 0.61, 0.355, 1] },
                }}
                className="group relative cursor-default"
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute -inset-px rounded-2xl pointer-events-none"
                  animate={{
                    boxShadow: isHovered
                      ? `0 0 30px 6px ${theme.glow}, 0 15px 40px -8px ${theme.glow}`
                      : '0 0 0px 0px transparent',
                  }}
                  transition={{ duration: 0.4 }}
                />

                <div className="relative h-full rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/80 p-5 sm:p-6 overflow-hidden transition-all duration-500 group-hover:bg-white group-hover:border-slate-300/80 group-hover:shadow-xl flex flex-col items-center text-center">

                  {/* Animated icon */}
                  <motion.div
                    animate={isHovered && !shouldReduceMotion ? {
                      rotate: [0, -8, 8, -4, 0],
                      scale: [1, 1.15, 1.15, 1.1, 1],
                    } : {}}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center shadow-lg mb-4 relative`}
                  >
                    <Icon className="w-6 h-6 text-white" />

                    {/* Pulse ring */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl ${theme.iconBg} opacity-0 group-hover:opacity-25`}
                      animate={isHovered ? { scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Tool name */}
                  <h3 className="font-extrabold text-slate-900 text-sm tracking-tight mb-1 group-hover:text-slate-900 transition-colors">
                    {tool.name}
                  </h3>

                  {/* Category badge */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold ${theme.bg} text-slate-600 border border-slate-100 group-hover:border-slate-200 transition-colors`}>
                    {tool.category}
                  </span>

                  {/* Connected indicator line */}
                  <div className="mt-4 pt-3 border-t border-slate-100 w-full">
                    <div className="flex items-center justify-center gap-1.5">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                        animate={isHovered ? { scale: [1, 1.4, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                        Connected
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${theme.glow.replace('0.2', '0.5')} 50%, transparent 100%)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══ BOTTOM INTEGRATION STRIP ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {[
            { icon: <Zap className="w-4 h-4 text-amber-500" />, text: 'Full Google Ecosystem' },
            { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: 'Server-Side Tracking' },
            { icon: <Cpu className="w-4 h-4 text-blue-500" />, text: 'AI-Powered Optimization' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 border border-slate-200/80 shadow-sm backdrop-blur-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300"
            >
              {item.icon}
              <span className="text-xs font-bold text-slate-700 tracking-wide">
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
