import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { approachSteps } from '../data/portfolioData';
import {
  Search, Database, Layers, Rocket, Sliders, TrendingUp,
  ChevronRight, ChevronLeft, CheckCircle2, Sparkles
} from 'lucide-react';

/* ─── Step visual configs ─── */
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
    dotBg: 'bg-emerald-500',
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
    dotBg: 'bg-sky-500',
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
    dotBg: 'bg-violet-500',
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
    dotBg: 'bg-amber-500',
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
    dotBg: 'bg-rose-500',
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
    dotBg: 'bg-teal-500',
  },
];

export default function Approach() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = approachSteps.length;

  const currentStep = approachSteps[activeStep];
  const currentVisual = stepVisuals[activeStep];
  const CurrentIcon = currentVisual.icon;

  return (
    <section
      id="approach"
      className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ═══ SECTION HEADER ═══ */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold tracking-wide uppercase shadow-xs mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Strategic Framework</span>
          </div>

          <h2 className="text-section-heading font-extrabold text-slate-900 tracking-tight pb-1">
            A Systematic Approach to{' '}
            <span className="animated-gradient-text">Profitable Scaling</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mt-3">
            Every dollar is accounted for. Here is the step-by-step blueprint I use to turn Google Ads into a scalable, high-ROAS revenue generator for e-commerce brands.
          </p>
        </div>

        {/* ═══ INTERACTIVE FRAMEWORK CONTAINER ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">

          {/* ─── LEFT: Interactive Step Trackers ─── */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {approachSteps.map((step, idx) => {
                const visual = stepVisuals[idx];
                const StepIcon = visual.icon;
                const isActive = activeStep === idx;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`flex items-center gap-3.5 p-3 sm:p-3.5 rounded-2xl text-left transition-all cursor-pointer whitespace-nowrap lg:whitespace-normal shrink-0 border ${
                      isActive
                        ? `bg-white ${visual.borderColor} shadow-sm ring-2 ${visual.ringColor}`
                        : 'bg-white/60 border-slate-200/70 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                        isActive
                          ? `bg-gradient-to-br ${visual.gradient} text-white shadow-sm`
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${isActive ? visual.lightText : 'text-slate-400'}`}>
                          Step 0{idx + 1}
                        </span>
                      </div>
                      <p className={`text-xs sm:text-sm font-bold truncate ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                        {step.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── RIGHT: Active Step Detail Card ─── */}
          <div className="lg:col-span-8">
            <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-900/[0.04] overflow-hidden flex flex-col justify-between">
              {/* Accent top gradient */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${currentVisual.gradient} transition-all duration-300`} />

              <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between">
                <div>
                  {/* Step badge & icon */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${currentVisual.gradient} flex items-center justify-center shadow-md text-white`}
                      >
                        <CurrentIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-widest block">
                          Phase {currentStep.step} of 06
                        </span>
                        <span className={`text-xs sm:text-sm font-extrabold ${currentVisual.darkText}`}>
                          {currentStep.name}
                        </span>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-extrabold text-slate-600 tabular-nums">
                      {activeStep + 1} / {totalSteps}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                    {currentStep.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {currentStep.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Data-backed execution</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Rigorous conversion tracking</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Continuous weekly iterations</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct revenue & ROAS focus</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar + Next/Prev controls */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${currentVisual.gradient} transition-all duration-300`}
                      style={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                      disabled={activeStep === 0}
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                      aria-label="Previous step"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(prev => Math.min(totalSteps - 1, prev + 1))}
                      disabled={activeStep === totalSteps - 1}
                      className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                      aria-label="Next step"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
