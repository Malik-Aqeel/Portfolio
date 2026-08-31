import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { processSteps } from '../data/portfolioData';
import {
  ArrowRight, PhoneCall, SearchCheck, Layers, TrendingUp,
  Sparkles, Rocket, CheckCircle2
} from 'lucide-react';

export default function Process({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const stepIcons = [PhoneCall, SearchCheck, Layers, TrendingUp];
  const stepColors = [
    {
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      glow: 'shadow-emerald-500/25',
      ring: 'ring-emerald-500/20',
      lineBg: 'from-emerald-500 to-teal-500',
      dotBg: 'bg-emerald-500',
      lightBg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
    },
    {
      iconBg: 'bg-gradient-to-br from-sky-500 to-blue-600',
      glow: 'shadow-sky-500/25',
      ring: 'ring-sky-500/20',
      lineBg: 'from-sky-500 to-blue-500',
      dotBg: 'bg-sky-500',
      lightBg: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-200',
    },
    {
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
      glow: 'shadow-violet-500/25',
      ring: 'ring-violet-500/20',
      lineBg: 'from-violet-500 to-purple-500',
      dotBg: 'bg-violet-500',
      lightBg: 'bg-violet-50',
      text: 'text-violet-700',
      border: 'border-violet-200',
    },
    {
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
      glow: 'shadow-amber-500/25',
      ring: 'ring-amber-500/20',
      lineBg: 'from-amber-500 to-orange-500',
      dotBg: 'bg-amber-500',
      lightBg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
    },
  ];

  return (
    <section
      id="process"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)',
      }}
    >
      {/* ═══ Background Effects ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] rounded-full opacity-35" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)' }} />
      </div>

      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/20"
              style={{ left: `${15 + i * 22}%`, top: `${20 + (i % 2) * 40}%` }}
              animate={{ y: [0, -25, 0], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, delay: i * 0.8, ease: 'easeInOut' }}
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
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/60 shadow-sm backdrop-blur-md mb-6">
            <Rocket className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
              Execution Plan
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight leading-[1.22] pb-1 mb-5">
            Simple Process.{' '}
            <br className="hidden sm:block" />
            <span className="animated-gradient-text">
              Serious Execution.
            </span>
          </h2>

          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From initial discovery to continuous scaling with a proven 4-phase system designed to turn your ad spend into predictable, profitable revenue.
          </p>
        </motion.div>

        {/* ═══ INTERACTIVE TIMELINE LAYOUT ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT: Step Selector / Timeline Nav */}
          <div className="lg:col-span-5">
            <div className="relative">

              {/* Vertical timeline line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-slate-200/80 rounded-full" />

              {/* Active progress fill */}
              <motion.div
                className="absolute left-[23px] top-0 w-[2px] rounded-full bg-gradient-to-b from-emerald-500 via-sky-500 to-violet-500"
                animate={{ height: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              />

              {/* Steps */}
              <div className="space-y-2">
                {processSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isPast = idx < activeStep;
                  const color = stepColors[idx];
                  const Icon = stepIcons[idx];

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                      className={`relative w-full flex items-start gap-5 p-4 rounded-2xl text-left transition-all duration-400 cursor-pointer group ${
                        isActive
                          ? 'bg-white/90 shadow-lg shadow-slate-900/[0.04] border border-slate-200/80'
                          : 'hover:bg-white/50 border border-transparent'
                      }`}
                    >
                      {/* Timeline dot / icon */}
                      <div className="relative z-10 shrink-0">
                        <motion.div
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                            isActive || isPast ? color.iconBg : 'bg-white border-2 border-slate-200'
                          } ${isActive ? color.glow : ''}`}
                        >
                          {isPast && !isActive ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <Icon className={`w-5 h-5 ${isActive || isPast ? 'text-white' : 'text-slate-400'}`} />
                          )}
                        </motion.div>
                      </div>

                      {/* Step text content */}
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-extrabold tracking-widest uppercase ${
                            isActive ? color.text : 'text-slate-400'
                          }`}>
                            Phase {step.step}
                          </span>
                          {isActive && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${color.lightBg} ${color.text} border ${color.border}`}
                            >
                              Active
                            </motion.span>
                          )}
                          {isPast && !isActive && (
                            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                              ✓ Done
                            </span>
                          )}
                        </div>

                        <h3 className={`text-base font-extrabold tracking-tight transition-colors ${
                          isActive ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-800'
                        }`}>
                          {step.title}
                        </h3>

                        {/* Expanded description for active step */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isActive ? 'auto' : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-slate-500 leading-relaxed mt-2 pr-2">
                            {step.desc}
                          </p>
                        </motion.div>
                      </div>

                      {/* Right arrow for active */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="hidden lg:flex w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 items-center justify-center mt-1 shrink-0"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: Large Visual Panel for Active Step */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="sticky top-28"
            >
              <AnimatedPanel
                step={processSteps[activeStep]}
                idx={activeStep}
                color={stepColors[activeStep]}
                Icon={stepIcons[activeStep]}
                shouldReduceMotion={shouldReduceMotion}
                onBookCall={onBookCall}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Large Right Panel ─── */
function AnimatedPanel({ step, idx, color, Icon, shouldReduceMotion, onBookCall }) {
  const milestones = [
    ['Deep discovery call', 'Margin & KPI target mapping', 'Growth opportunity audit', 'Custom roadmap delivery'],
    ['360° account architecture review', 'Feed health & error diagnosis', 'Conversion tracking audit', 'Waste identification report'],
    ['Campaign structure build', 'Server-side tracking setup', 'Product feed enrichment', 'Smart bid strategy config'],
    ['Controlled budget scaling', 'Weekly performance reviews', 'Keyword & audience expansion', 'Profit margin protection'],
  ];

  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative rounded-3xl overflow-hidden"
    >
      {/* Main panel */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-900/[0.04]">

        {/* Large watermark number */}
        <span className="absolute top-6 right-8 text-[120px] font-black text-slate-100/70 leading-none tracking-tighter pointer-events-none select-none">
          {step.step}
        </span>

        {/* Header */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className={`w-16 h-16 rounded-2xl ${color.iconBg} flex items-center justify-center shadow-lg ${color.glow}`}
            >
              <Icon className="w-7 h-7 text-white" />
            </motion.div>

            <div>
              <span className={`text-[10px] font-extrabold tracking-widest uppercase ${color.text} block mb-1`}>
                Phase {step.step}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {step.title}
              </h3>
            </div>
          </div>

          <p className="text-slate-500 text-base leading-relaxed max-w-lg">
            {step.desc}
          </p>
        </div>

        {/* Milestone checklist */}
        <div className="relative z-10 mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Key Deliverables</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {milestones[idx].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-emerald-200/60 hover:bg-emerald-50/40 transition-all group"
              >
                <div className={`w-6 h-6 rounded-lg ${color.iconBg} flex items-center justify-center shrink-0`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative z-10 pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-500">
                Currently accepting new clients for Q3 2026
              </span>
            </div>

            <motion.button
              onClick={onBookCall}
              whileHover={shouldReduceMotion ? {} : { y: -2, boxShadow: '0 16px 32px -8px rgba(5,150,105,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="button-shine px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-2.5 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Start Your Growth</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
