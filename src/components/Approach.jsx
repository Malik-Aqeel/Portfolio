import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { approachSteps } from '../data/portfolioData';
import {
  Search, Database, Layers, Rocket, Sliders, TrendingUp,
  ArrowDown, CheckCircle2, ArrowRight
} from 'lucide-react';

/* ─── Step visual configs (light theme) ─── */
const stepVisuals = [
  {
    icon: Search,
    gradient: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    lightText: 'text-emerald-600',
    darkText: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    ringColor: 'ring-emerald-500/20',
    glow: 'rgba(16, 185, 129, 0.15)',
    numBg: 'bg-emerald-50',
    numText: 'text-emerald-600',
    dotBg: 'bg-emerald-500',
    pillBg: 'bg-emerald-100',
    pillText: 'text-emerald-700',
  },
  {
    icon: Database,
    gradient: 'from-sky-500 to-blue-600',
    lightBg: 'bg-sky-50',
    lightText: 'text-sky-600',
    darkText: 'text-sky-700',
    borderColor: 'border-sky-200',
    ringColor: 'ring-sky-500/20',
    glow: 'rgba(14, 165, 233, 0.15)',
    numBg: 'bg-sky-50',
    numText: 'text-sky-600',
    dotBg: 'bg-sky-500',
    pillBg: 'bg-sky-100',
    pillText: 'text-sky-700',
  },
  {
    icon: Layers,
    gradient: 'from-violet-500 to-purple-600',
    lightBg: 'bg-violet-50',
    lightText: 'text-violet-600',
    darkText: 'text-violet-700',
    borderColor: 'border-violet-200',
    ringColor: 'ring-violet-500/20',
    glow: 'rgba(139, 92, 246, 0.15)',
    numBg: 'bg-violet-50',
    numText: 'text-violet-600',
    dotBg: 'bg-violet-500',
    pillBg: 'bg-violet-100',
    pillText: 'text-violet-700',
  },
  {
    icon: Rocket,
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-600',
    darkText: 'text-amber-700',
    borderColor: 'border-amber-200',
    ringColor: 'ring-amber-500/20',
    glow: 'rgba(245, 158, 11, 0.15)',
    numBg: 'bg-amber-50',
    numText: 'text-amber-600',
    dotBg: 'bg-amber-500',
    pillBg: 'bg-amber-100',
    pillText: 'text-amber-700',
  },
  {
    icon: Sliders,
    gradient: 'from-rose-500 to-pink-600',
    lightBg: 'bg-rose-50',
    lightText: 'text-rose-600',
    darkText: 'text-rose-700',
    borderColor: 'border-rose-200',
    ringColor: 'ring-rose-500/20',
    glow: 'rgba(244, 63, 94, 0.15)',
    numBg: 'bg-rose-50',
    numText: 'text-rose-600',
    dotBg: 'bg-rose-500',
    pillBg: 'bg-rose-100',
    pillText: 'text-rose-700',
  },
  {
    icon: TrendingUp,
    gradient: 'from-teal-500 to-cyan-600',
    lightBg: 'bg-teal-50',
    lightText: 'text-teal-600',
    darkText: 'text-teal-700',
    borderColor: 'border-teal-200',
    ringColor: 'ring-teal-500/20',
    glow: 'rgba(20, 184, 166, 0.15)',
    numBg: 'bg-teal-50',
    numText: 'text-teal-600',
    dotBg: 'bg-teal-500',
    pillBg: 'bg-teal-100',
    pillText: 'text-teal-700',
  },
];

export default function Approach() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const prevStepRef = useRef(0);
  const totalSteps = approachSteps.length;

  /* ─── Scroll-linked step progression ─── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const normalized = Math.max(0, Math.min(1, (v - 0.05) / 0.90));
      const step = Math.min(totalSteps - 1, Math.floor(normalized * totalSteps));
      if (step !== prevStepRef.current) {
        setIsScrollingDown(step > prevStepRef.current);
        prevStepRef.current = step;
        setActiveStep(step);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, totalSteps]);

  const currentStep = approachSteps[activeStep];
  const currentVisual = stepVisuals[activeStep];
  const CurrentIcon = currentVisual.icon;

  /* Animation only when scrolling down */
  const cardInitial = isScrollingDown && !shouldReduceMotion
    ? { opacity: 0, y: 20, scale: 0.98 }
    : { opacity: 1, y: 0, scale: 1 };
  const cardExit = isScrollingDown && !shouldReduceMotion
    ? { opacity: 0, y: -15, scale: 0.98 }
    : { opacity: 1, y: 0, scale: 1 };
  const cardTransition = isScrollingDown
    ? { duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }
    : { duration: 0.1 };

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative"
      style={{ height: '320vh' }}
    >
      {/* ─── Sticky container ─── */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)',
        }}
      >
        {/* ── Decorative Background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            key={`blob-main-${activeStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: `radial-gradient(circle, ${currentVisual.glow} 0%, transparent 65%)` }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 65%)' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)' }}
          />
        </div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
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
                style={{ left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 28}%` }}
                animate={{ y: [0, -22, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3.5 + i * 0.7, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
              />
            ))}
          </div>
        )}

        {/* Subtle horizontal lines */}
        <div className="absolute top-16 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.1), transparent)' }} />
        <div className="absolute bottom-16 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.1), transparent)' }} />

        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ═══ HEADER ═══ */}
          <div className="text-center mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/60 shadow-sm backdrop-blur-md mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
                6-Step Methodology
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              My Approach To{' '}
              <span className="animated-gradient-text">Google Ads</span>
            </h2>
          </div>

          {/* ═══ MAIN: Left Timeline + Right Card ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 max-h-[500px]">

            {/* ─── LEFT: Vertical step indicator ─── */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative space-y-0">
                {approachSteps.map((step, idx) => {
                  const visual = stepVisuals[idx];
                  const StepIcon = visual.icon;
                  const isActive = idx === activeStep;
                  const isPast = idx < activeStep;

                  return (
                    <div key={idx} className="relative flex items-start gap-4">
                      {/* Vertical connecting line */}
                      {idx < totalSteps - 1 && (
                        <div
                          className="absolute left-6 top-12 w-0.5 h-10 rounded-full transition-all duration-500"
                          style={{
                            background: isPast
                              ? `linear-gradient(to bottom, ${visual.glow.replace('0.15', '0.6')}, ${stepVisuals[idx + 1]?.glow.replace('0.15', '0.6') || visual.glow})`
                              : 'rgba(0,0,0,0.06)',
                          }}
                        />
                      )}

                      {/* Step circle */}
                      <motion.div
                        animate={isActive ? { scale: 1.15 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                          isActive
                            ? `bg-gradient-to-br ${visual.gradient} shadow-lg ring-4 ${visual.ringColor}`
                            : isPast
                              ? `bg-gradient-to-br ${visual.gradient} opacity-50`
                              : 'bg-white border border-slate-200 shadow-soft-sm'
                        }`}
                        style={isActive ? { boxShadow: `0 8px 24px -4px ${visual.glow.replace('0.15', '0.4')}` } : {}}
                      >
                        <StepIcon className={`w-5 h-5 ${isActive || isPast ? 'text-white' : 'text-slate-400'}`} />
                      </motion.div>

                      {/* Step label */}
                      <div className="pt-1 pb-6">
                        <p className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-500 ${
                          isActive ? visual.lightText : isPast ? 'text-slate-400' : 'text-slate-300'
                        }`}>
                          Step {step.step}
                        </p>
                        <p className={`text-sm font-bold transition-colors duration-500 ${
                          isActive ? 'text-slate-900' : isPast ? 'text-slate-500' : 'text-slate-300'
                        }`}>
                          {step.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── RIGHT: Active step card ─── */}
            <div className="lg:col-span-8">
              <AnimatePresence>
                <motion.div
                  key={activeStep}
                  initial={cardInitial}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={cardExit}
                  transition={cardTransition}
                  className="relative"
                >
                  {/* Card glow behind */}
                  <div
                    className="absolute -inset-3 rounded-3xl opacity-40 blur-2xl transition-all duration-700"
                    style={{ background: `radial-gradient(circle at 30% 50%, ${currentVisual.glow} 0%, transparent 70%)` }}
                  />

                  {/* Card */}
                  <div
                    className="relative rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200/80 overflow-hidden shadow-soft-md"
                  >
                    {/* Top gradient accent */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${currentVisual.gradient}`} />

                    <div className="p-8 sm:p-10 lg:p-12">

                      {/* Step number + name row */}
                      <div className="flex items-center gap-4 mb-6">
                        <motion.div
                          key={`icon-${activeStep}`}
                          initial={isScrollingDown && !shouldReduceMotion ? { scale: 0.8, rotate: -10 } : { scale: 1, rotate: 0 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={isScrollingDown ? { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } : { duration: 0.1 }}
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentVisual.gradient} flex items-center justify-center shadow-xl`}
                          style={{ boxShadow: `0 12px 28px -6px ${currentVisual.glow.replace('0.15', '0.35')}` }}
                        >
                          <CurrentIcon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Step {currentStep.step} of 06
                          </p>
                          <p className={`text-sm font-extrabold ${currentVisual.darkText}`}>
                            {currentStep.name}
                          </p>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5">
                        {currentStep.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
                        {currentStep.desc}
                      </p>

                      {/* Progress bar */}
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${currentVisual.gradient}`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-400 tabular-nums">
                          {activeStep + 1}/{totalSteps}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile step dots */}
              <div className="flex lg:hidden items-center justify-center gap-2 mt-6">
                {approachSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === activeStep
                        ? `w-8 bg-gradient-to-r ${stepVisuals[idx].gradient}`
                        : idx < activeStep
                          ? 'w-3 bg-slate-400/40'
                          : 'w-3 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─── Scroll hint ─── */}
          <motion.div
            animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {activeStep < totalSteps - 1 ? 'Scroll to explore' : 'Continue scrolling'}
            </span>
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
