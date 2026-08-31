import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, TrendingUp, ArrowUpRight,
  Eye, BarChart3, Target, Zap, ChevronRight
} from 'lucide-react';
import { caseStudies } from '../data/portfolioData';
import CaseStudyModal from './CaseStudyModal';

/* ─── Brand logo imports ─── */
import logoIndustrialLynx from '../assets/case_study_img1.jpeg';
import logoArabianOud from '../assets/ao.jpeg';
import logoPetSupplies from '../assets/Logo Petsupplies.jpeg';

const logoMap = {
  industrialLynx: logoIndustrialLynx,
  arabianOud: logoArabianOud,
  petSupplies: logoPetSupplies,
};

/* ─── Per-case-study visual config ─── */
const caseStudyVisuals = [
  {
    gradient: 'from-emerald-500 to-teal-600',
    accentLight: 'bg-emerald-500/10',
    accentText: 'text-emerald-600',
    glowColor: 'rgba(16, 185, 129, 0.15)',
    roasColor: 'text-emerald-600',
    cpaColor: 'text-emerald-600',
    tagBg: 'bg-emerald-50 border-emerald-200/60 text-emerald-700',
    metricBg: 'bg-gradient-to-br from-emerald-50 to-teal-50/50',
    metricBorder: 'border-emerald-100',
    ringHover: 'hover:ring-emerald-300/50',
    btnBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
    btnShadow: 'rgba(16, 185, 129, 0.25)',
  },
  {
    gradient: 'from-sky-500 to-blue-600',
    accentLight: 'bg-sky-500/10',
    accentText: 'text-sky-600',
    glowColor: 'rgba(14, 165, 233, 0.15)',
    roasColor: 'text-sky-600',
    cpaColor: 'text-emerald-600',
    tagBg: 'bg-sky-50 border-sky-200/60 text-sky-700',
    metricBg: 'bg-gradient-to-br from-sky-50 to-blue-50/50',
    metricBorder: 'border-sky-100',
    ringHover: 'hover:ring-sky-300/50',
    btnBg: 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700',
    btnShadow: 'rgba(14, 165, 233, 0.25)',
  },
  {
    gradient: 'from-violet-500 to-purple-600',
    accentLight: 'bg-violet-500/10',
    accentText: 'text-violet-600',
    glowColor: 'rgba(139, 92, 246, 0.15)',
    roasColor: 'text-violet-600',
    cpaColor: 'text-emerald-600',
    tagBg: 'bg-violet-50 border-violet-200/60 text-violet-700',
    metricBg: 'bg-gradient-to-br from-violet-50 to-purple-50/50',
    metricBorder: 'border-violet-100',
    ringHover: 'hover:ring-violet-300/50',
    btnBg: 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700',
    btnShadow: 'rgba(139, 92, 246, 0.25)',
  },
];

/* ─── Mini SVG growth chart ─── */
function MiniChart({ index, accentText }) {
  const paths = [
    'M0,40 C15,38 25,35 40,28 C55,21 65,25 80,18 C95,11 105,14 120,8 C135,3 145,5 160,2',
    'M0,42 C20,38 30,32 50,26 C70,20 80,22 100,14 C120,6 140,10 160,4',
    'M0,38 C18,36 35,30 55,24 C75,18 85,20 110,12 C130,5 145,8 160,3',
  ];
  return (
    <svg viewBox="0 0 160 48" className="w-full h-10 mt-2" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`chartGrad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d={`${paths[index] || paths[0]} L160,48 L0,48 Z`}
        fill={`url(#chartGrad-${index})`}
        className="opacity-40"
      />
      <motion.path
        d={paths[index] || paths[0]}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.3 + index * 0.2, ease: 'easeOut' }}
      />
      <motion.circle
        cx="160" cy={paths[index] ? (index === 0 ? 2 : index === 1 ? 4 : 3) : 2}
        r="3" fill="currentColor"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 2 + index * 0.2 }}
      />
    </svg>
  );
}

/* ─── Animation variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

export default function CaseStudies({ onBookCall }) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="case-studies"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)',
      }}
    >
      {/* ── Decorative Background ── */}
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

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Floating particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/20"
              style={{ left: `${12 + i * 18}%`, top: `${15 + (i % 3) * 28}%` }}
              animate={{ y: [0, -22, 0], opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 3.5 + i * 0.7, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/60 shadow-sm backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
              Selected Work
            </span>
          </div>

          <h2 className="text-section-heading font-extrabold text-slate-900 tracking-tight mb-5">
            Real Campaigns.{' '}
            <span className="animated-gradient-text">Real Growth.</span>
          </h2>

          <p className="text-subheading text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Explore how strategic optimization and intelligent scaling transforms e-commerce advertising into profitable growth engines.
          </p>

          {/* Animated divider */}
          {!shouldReduceMotion && (
            <motion.div
              className="mx-auto mt-8 h-px w-24 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #10B981, transparent)' }}
              animate={{ width: [60, 120, 60], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>

        {/* ═══ CASE STUDY CARDS ═══ */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {caseStudies.map((study, idx) => {
            const visual = caseStudyVisuals[idx] || caseStudyVisuals[0];
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={study.id}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative"
                whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.3, ease: [0.215, 0.61, 0.355, 1] } }}
              >
                {/* Hover glow */}
                <div
                  className="absolute -inset-3 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 60%, ${visual.glowColor} 0%, transparent 70%)` }}
                />

                {/* Card */}
                <div
                  className={`relative h-full rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-500
                    ${isHovered ? 'shadow-soft-lg ring-1 ' + visual.ringHover.replace('hover:', '') : 'shadow-soft-sm'}`}
                >
                  {/* Top gradient accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${visual.gradient} transition-all duration-300 ${isHovered ? 'h-1.5' : ''}`} />

                  <div className="p-5 sm:p-7 flex-1 flex flex-col">

                    {/* Header: Brand Logo + Industry + Campaign Type */}
                    <div className="flex items-start justify-between mb-5">
                      {/* Logo */}
                      <motion.div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center shadow-soft-sm overflow-hidden p-1.5 shrink-0"
                        animate={isHovered && !shouldReduceMotion ? { scale: 1.08 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {study.logo && logoMap[study.logo] ? (
                          <img
                            src={logoMap[study.logo]}
                            alt={study.brand}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <div className={`w-full h-full rounded-xl bg-gradient-to-br ${visual.gradient} flex items-center justify-center`}>
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </motion.div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border ${visual.tagBg}`}>
                          {study.industry}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                          <Zap className="w-2.5 h-2.5" />
                          {study.campaignType}
                        </span>
                      </div>
                    </div>

                    {/* Brand name */}
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2 leading-snug">
                      {study.brand}
                    </h3>

                    {/* Timeframe summary badge if available */}
                    {study.timeframe && (
                      <div className="mb-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-[10.5px] font-bold text-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>{study.timeframe}: Spend {study.spend} &bull; Revenue {study.revenue}</span>
                      </div>
                    )}

                    {/* Challenge snippet */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-5 line-clamp-2 flex-1">
                      <span className="font-bold text-slate-700">Challenge: </span>
                      {study.challenge}
                    </p>

                    {/* ─── Metrics dashboard ─── */}
                    <div className={`rounded-xl ${visual.metricBg} border ${visual.metricBorder} p-3 sm:p-4 mb-5`}>
                      {study.sampleMetrics.metricsList ? (
                        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                          {study.sampleMetrics.metricsList.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="bg-white/85 backdrop-blur-xs rounded-xl p-2.5 sm:p-3 text-center border border-white/60 shadow-2xs"
                            >
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight mb-1 truncate" title={m.label}>
                                {m.label}
                              </p>
                              <motion.p
                                className={`text-base sm:text-lg font-black ${m.highlight ? visual.roasColor : 'text-slate-900'} tracking-tight leading-none`}
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: 0.2 + mIdx * 0.08 }}
                              >
                                {m.value}
                              </motion.p>
                              {m.badge && (
                                <span className={`inline-block mt-1 px-1.5 py-0.5 text-[8px] font-bold rounded-md ${m.highlight ? visual.accentLight + ' ' + visual.accentText : 'bg-slate-100 text-slate-600'}`}>
                                  {m.badge}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          {/* ROAS */}
                          <div className="text-center">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              {study.sampleMetrics.roasLabel || 'ROAS'}
                            </p>
                            <motion.p
                              className={`text-lg sm:text-xl font-black ${visual.roasColor} tracking-tight leading-none`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                            >
                              {study.sampleMetrics.roas}
                            </motion.p>
                            <span className={`inline-block mt-1.5 px-2 py-0.5 text-[8px] font-bold rounded-md ${visual.accentLight} ${visual.accentText}`}>
                              {study.sampleMetrics.roasBadge}
                            </span>
                          </div>

                          {/* Revenue */}
                          <div className="text-center border-x border-slate-200/40">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              {study.sampleMetrics.revenueLabel || 'Revenue'}
                            </p>
                            <motion.p
                              className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                            >
                              {study.sampleMetrics.revenueShort || study.sampleMetrics.revenueGrowth}
                            </motion.p>
                            <span className="inline-block mt-1.5 px-2 py-0.5 text-[8px] font-bold rounded-md bg-emerald-50 text-emerald-600">
                              {study.sampleMetrics.revenueBadge || '↑ Growth'}
                            </span>
                          </div>

                          {/* Spend / CPA */}
                          <div className="text-center">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              {study.sampleMetrics.metric3Label || 'CPA'}
                            </p>
                            <motion.p
                              className={`text-lg sm:text-xl font-black ${visual.cpaColor} tracking-tight leading-none`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                            >
                              {study.sampleMetrics.spendShort || study.sampleMetrics.cpa}
                            </motion.p>
                            <span className="inline-block mt-1.5 px-2 py-0.5 text-[8px] font-bold rounded-md bg-emerald-50 text-emerald-600">
                              {study.sampleMetrics.cpaBadge}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Mini chart */}
                      <div className={visual.accentText}>
                        <MiniChart index={idx} accentText={visual.accentText} />
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      onClick={() => setSelectedCaseStudy(study)}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02, boxShadow: `0 12px 28px -6px ${visual.btnShadow}` }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 px-5 rounded-xl ${visual.btnBg} text-white font-bold text-sm shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer button-shine relative overflow-hidden`}
                      style={{ boxShadow: `0 6px 20px -6px ${visual.btnShadow}` }}
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Full Case Study</span>
                      <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══ BOTTOM TRUST LINE ═══ */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-soft-sm">
            <p className="text-sm text-slate-500 font-medium">
              All case studies represent documented, real-world campaign results.
            </p>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60">
                <BarChart3 className="w-3 h-3 text-emerald-600" />
                <span className="text-[10px] font-bold text-emerald-700">Data Verified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <Target className="w-3 h-3 text-slate-600" />
                <span className="text-[10px] font-bold text-slate-600">NDA Protected</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        logoSrc={selectedCaseStudy && logoMap[selectedCaseStudy.logo] ? logoMap[selectedCaseStudy.logo] : null}
        isOpen={!!selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onBookCall={onBookCall}
      />
    </section>
  );
}
