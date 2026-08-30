import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence, useScroll } from 'framer-motion';
import { approachSteps } from '../data/portfolioData';
import {
  Search, Database, Layers, Rocket, Sliders, TrendingUp,
  ArrowDown, CheckCircle2, ArrowRight
} from 'lucide-react';

/* ─── Step visual configs (light theme matching website) ─── */
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
  const lastProgressRef = useRef(0);
  const prevStepRef = useRef(0);
  const totalSteps = approachSteps.length;

  /* ─── Scroll-linked step progression ─── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      // Robust directional tracking
      const isDown = v >= lastProgressRef.current;
      lastProgressRef.current = v;
      setIsScrollingDown(isDown);

      // Steps 0-5 map between 0.0 and 0.82.
      // Above 0.82, it stays locked on the final step (Step 6)
      // so continuing to scroll smoothly releases down into the next section!
      const progressNormalized = Math.max(0, Math.min(1, v / 0.82));
      const step = Math.min(totalSteps - 1, Math.floor(progressNormalized * totalSteps));

      if (step !== prevStepRef.current) {
        prevStepRef.current = step;
        setActiveStep(step);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, totalSteps]);

  const currentStep = approachSteps[activeStep];
  const currentVisual = stepVisuals[activeStep];
  const CurrentIcon = currentVisual.icon;

  // Animation variants: ONLY animate when scrolling downward!
  // When scrolling upward, zero animation (instant switch, no lag/glitch).
  const cardAnimationProps = isScrollingDown && !shouldReduceMotion
    ? {
        initial: { opacity: 0, y: 18, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -14, scale: 0.985 },
        transition: { duration: 0.32, ease: [0.215, 0.61, 0.355, 1] }
      }
    : {
        initial: false,
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0 }
      };

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative"
      style={{ height: '360vh' }}
    >
      {/* ─── Sticky Container (Fixed position while in viewport) ─── */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)',
        }}
      >
        {/* ── Decorative Background Glows ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-35 transition-colors duration-700"
            style={{ background: `radial-gradient(circle, ${currentVisual.glow} 0%, transparent 65%)` }}
          />
          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 65%)' }}
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

        {/* ─── Stable, Non-Jumping Inner Layout Container ─── */}
        <div className="relative z-10 h-full flex flex-col justify-start pt-20 sm:pt-24 lg:pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ═══ SECTION HEADER (Fixed Position, Never Jumps) ═══ */}
          <div className="text-center mb-8 lg:mb-12 shrink-0">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/60 shadow-sm backdrop-blur-md mb-4">
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
              <span className="animated-growth-gradient">Google Ads</span>
            </h2>
          </div>

          {/* ═══ MAIN: Left Timeline + Right Card ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start flex-1">

            {/* ─── LEFT: Stable Vertical step indicator ─── */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative space-y-1">
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
                          className="absolute left-5 top-11 w-0.5 h-8 rounded-full transition-colors duration-300"
                          style={{
                            background: isPast
                              ? 'linear-gradient(to bottom, #10B981, #059669)'
                              : '#E2E8F0',
                          }}
                        />
                      )}

                      {/* Step circle */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-br ${visual.gradient} shadow-md ring-4 ${visual.ringColor} scale-110`
                            : isPast
                              ? `bg-gradient-to-br ${visual.gradient} opacity-60`
                              : 'bg-white border border-slate-200 shadow-2xs'
                        }`}
                      >
                        <StepIcon className={`w-4 h-4 ${isActive || isPast ? 'text-white' : 'text-slate-400'}`} />
                      </div>

                      {/* Step label */}
                      <div className="pt-0.5 pb-4">
                        <p className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                          isActive ? visual.lightText : isPast ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          Step {step.step}
                        </p>
                        <p className={`text-xs sm:text-sm font-bold transition-colors duration-300 ${
                          isActive ? 'text-slate-900' : isPast ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          {step.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── RIGHT: Stable Active Step Card (Fixed Height, No Jumps) ─── */}
            <div className="lg:col-span-8 relative min-h-[380px] sm:min-h-[400px]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeStep}
                  {...cardAnimationProps}
                  className="w-full relative"
                >
                  {/* Card Glow Background */}
                  <div
                    className="absolute -inset-2 rounded-3xl opacity-30 blur-xl pointer-events-none transition-all duration-500"
                    style={{ background: `radial-gradient(circle at 30% 50%, ${currentVisual.glow} 0%, transparent 70%)` }}
                  />

                  {/* Card Body */}
                  <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-soft-lg overflow-hidden flex flex-col justify-between min-h-[350px] sm:min-h-[380px]">
                    {/* Top gradient accent bar */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${currentVisual.gradient}`} />

                    <div className="p-7 sm:p-9 lg:p-10 flex-1 flex flex-col justify-between">

                      {/* Step number + name row */}
                      <div>
                        <div className="flex items-center gap-3.5 mb-5">
                          <div
                            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentVisual.gradient} flex items-center justify-center shadow-md text-white`}
                          >
                            <CurrentIcon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest">
                              Step {currentStep.step} of 06
                            </p>
                            <p className={`text-sm font-extrabold ${currentVisual.darkText}`}>
                              {currentStep.name}
                            </p>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                          {currentStep.title}
                        </h3>

                        {/* Description */}
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                          {currentStep.desc}
                        </p>
                      </div>

                      {/* Progress Bar & Counter at Bottom */}
                      <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-4">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${currentVisual.gradient} transition-all duration-300`}
                            style={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-extrabold text-slate-400 tabular-nums">
                          {activeStep + 1} / {totalSteps}
                        </span>
                      </div>

                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Mobile Step Dots */}
              <div className="flex lg:hidden items-center justify-center gap-2 mt-5">
                {approachSteps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeStep
                        ? `w-8 bg-gradient-to-r ${stepVisuals[idx].gradient}`
                        : idx < activeStep
                          ? 'w-3 bg-slate-400/50'
                          : 'w-3 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* ─── Scroll Hint (Clean Footer inside sticky) ─── */}
          <div className="pb-6 pt-4 text-center shrink-0">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span>{activeStep < totalSteps - 1 ? 'Scroll down for next step' : 'Continue scrolling for next section'}</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
