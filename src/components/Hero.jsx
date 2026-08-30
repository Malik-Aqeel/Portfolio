import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, TrendingUp, Sparkles, DollarSign, Target, BarChart3,
  ShieldCheck, CheckCircle2, Award, Zap, Activity, ChevronRight,
  Star, Flame, Layers
} from 'lucide-react';
import { personalInfo, sampleDashboardData, heroStats } from '../data/portfolioData';

export default function Hero({ onBookCall }) {
  const [activeTimeframe, setActiveTimeframe] = useState('7D');
  const shouldReduceMotion = useReducedMotion();
  const currentData = sampleDashboardData.timeframes[activeTimeframe];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  const floatCardVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const floatCardDelayedVariants = {
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 1.5,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 40%, #F0F7F4 80%, #FFFFFF 100%)',
      }}
    >
      {/* ─── Ambient Decorative Lights ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top left emerald glow */}
        <div
          className="absolute -top-24 -left-28 w-[650px] h-[650px] rounded-full pointer-events-none opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.14) 0%, transparent 70%)' }}
        />
        {/* Right cyan/blue glow */}
        <div
          className="absolute top-20 -right-28 w-[600px] h-[600px] rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)' }}
        />
        {/* Center subtle violet glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, transparent 65%)' }}
        />
      </div>

      {/* Subtle Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating Animated Particles */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/25"
              style={{
                left: `${10 + i * 16}%`,
                top: `${15 + (i % 3) * 26}%`,
              }}
              animate={{ y: [0, -22, 0], opacity: [0.15, 0.45, 0.15] }}
              transition={{
                duration: 3.5 + i * 0.7,
                repeat: Infinity,
                delay: i * 0.7,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* ══════════════════════════════════════════════════
              LEFT COLUMN: High-Converting Hero Pitch
          ══════════════════════════════════════════════════ */}
          <motion.div
            className="lg:col-span-6 space-y-6 text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Live Availability Badge */}
            <motion.div variants={itemVariants} className="inline-block">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/70 shadow-soft-sm backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-emerald-800 tracking-wide uppercase">
                  Available For Q3/Q4 Scaling • Google Ads Growth
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.1]"
            >
              Scale Your E-commerce Brand With{' '}
              <span className="animated-gradient-text">Google Ads</span>{' '}
              That Actually Deliver Profit.
            </motion.h1>

            {/* Subtitle / Hook */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl"
            >
              I help 7 & 8-figure DTC brands turn Google Ads into a predictable customer acquisition engine through high-converting Performance Max, granular Search query filtering, and intelligent bid scaling.
            </motion.p>

            {/* Credibility & Verified Stats Strip */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 sm:gap-6 py-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">5.0 Client Rating</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Flame className="w-4 h-4 text-emerald-600" />
                <span>$15M+ Spend Managed</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>50+ Brands Scaled</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <motion.button
                onClick={onBookCall}
                whileHover={!shouldReduceMotion ? { scale: 1.02, boxShadow: '0 12px 28px -6px rgba(16, 185, 129, 0.35)' } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2.5 relative overflow-hidden button-shine"
              >
                <span>Book Free Strategy Audit</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                href="#case-studies"
                whileHover={!shouldReduceMotion ? { y: -2 } : {}}
                className="px-7 py-4 bg-white/90 hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base rounded-xl border border-slate-200 shadow-soft-sm transition-all flex items-center justify-center gap-2 hover:border-slate-300"
              >
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>View Real Case Studies</span>
              </motion.a>
            </motion.div>

            {/* Feature Value Pills */}
            <motion.div
              variants={itemVariants}
              className="pt-4 border-t border-slate-200/70 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-600"
            >
              {[
                'Zero Guesswork Execution',
                'Server-Side GA4 Tracking',
                'Custom Margin Feed Tiers',
                'Weekly ROAS Scaling'
              ].map((pill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 border border-slate-200/70 shadow-xs text-slate-700 text-[11px]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{pill}</span>
                </span>
              ))}
            </motion.div>

          </motion.div>

          {/* ══════════════════════════════════════════════════
              RIGHT COLUMN: Interactive Google Ads Live Hub
          ══════════════════════════════════════════════════ */}
          <motion.div
            className="lg:col-span-6 w-full relative"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Floating Live Badge (Top-Right) */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatCardVariants}
                animate="animate"
                className="absolute -top-6 -right-2 sm:-right-4 z-20 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 border border-emerald-200/80 shadow-soft-lg backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-700 font-extrabold text-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verified Result</p>
                  <p className="text-xs font-black text-slate-900">+184% Scaled ROAS</p>
                </div>
              </motion.div>
            )}

            {/* Floating Live Indicator (Bottom-Left) */}
            {!shouldReduceMotion && (
              <motion.div
                variants={floatCardDelayedVariants}
                animate="animate"
                className="absolute -bottom-6 -left-2 sm:-left-4 z-20 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 border border-slate-200 shadow-soft-lg backdrop-blur-md"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Active Campaign Monitoring</p>
                  <p className="text-[10px] font-semibold text-emerald-700">0% Budget Waste Guardrails</p>
                </div>
              </motion.div>
            )}

            {/* Main Interactive Glass Card */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 shadow-soft-lg p-5 sm:p-7 space-y-5 overflow-hidden">

              {/* Card Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight flex items-center gap-2">
                      Google Ads Growth Dashboard
                    </h3>
                    <p className="text-[10px] font-semibold text-slate-400">Live E-commerce Account Telemetry</p>
                  </div>
                </div>

                {/* Interactive Timeframe Pill Switcher */}
                <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/60">
                  {['7D', '30D', '90D'].map((tf) => {
                    const isActive = activeTimeframe === tf;
                    return (
                      <button
                        key={tf}
                        onClick={() => setActiveTimeframe(tf)}
                        className={`relative px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                          isActive ? 'text-emerald-800' : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="heroTimeframePill"
                            className="absolute inset-0 bg-white rounded-lg shadow-soft-sm border border-slate-200/50"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          />
                        )}
                        <span className="relative z-10">{tf}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4 Dynamic Metric Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* ROAS Tile */}
                <div className="p-3.5 bg-gradient-to-br from-emerald-50 to-teal-50/60 rounded-2xl border border-emerald-200/60">
                  <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">ROAS</p>
                  <motion.p
                    key={`roas-${activeTimeframe}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-2xl font-black text-emerald-700 mt-0.5 tracking-tight"
                  >
                    {currentData.roas}
                  </motion.p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    {currentData.roasGrowth}
                  </span>
                </div>

                {/* Revenue Tile */}
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Revenue</p>
                  <motion.p
                    key={`rev-${activeTimeframe}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 tracking-tight"
                  >
                    {currentData.revenue}
                  </motion.p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600">
                    {currentData.revenueGrowth}
                  </span>
                </div>

                {/* Ad Spend Tile */}
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ad Spend</p>
                  <motion.p
                    key={`spend-${activeTimeframe}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 tracking-tight"
                  >
                    {currentData.adSpend}
                  </motion.p>
                  <span className="inline-block mt-1 text-[10px] font-medium text-slate-500">
                    {currentData.clicks} clicks
                  </span>
                </div>

                {/* CPA Tile */}
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/60">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CPA</p>
                  <motion.p
                    key={`cpa-${activeTimeframe}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 tracking-tight"
                  >
                    {currentData.cpa}
                  </motion.p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600">
                    {currentData.cpaChange}
                  </span>
                </div>
              </div>

              {/* Interactive Performance Graph */}
              <div className="pt-1">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" /> Revenue & ROAS Scaling Curve
                  </span>
                  <span className="text-[11px]">
                    Conversions: <strong className="text-slate-900 font-bold">{currentData.conversions}</strong> ({currentData.convRate} CVR)
                  </span>
                </div>

                {/* SVG Revenue Chart */}
                <div className="h-44 w-full bg-slate-50/70 rounded-2xl p-4 border border-slate-200/60 relative flex items-end justify-between gap-2 overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                    <defs>
                      <linearGradient id="heroChartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M 0 32 L 16 26 L 33 18 L 50 21 L 66 14 L 83 10 L 100 16 L 100 40 L 0 40 Z"
                      fill="url(#heroChartGradient)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                    />
                    <motion.path
                      d="M 0 32 L 16 26 L 33 18 L 50 21 L 66 14 L 83 10 L 100 16"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                    {/* Pulsing peak dot */}
                    <circle cx="83" cy="10" r="3" fill="#059669" />
                    <circle cx="83" cy="10" r="6" fill="#10B981" opacity="0.3" className="animate-ping" />
                  </svg>

                  {/* Day Columns with Interactive Tooltips */}
                  {currentData.chartData.map((item, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center flex-1 group cursor-pointer">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-9 bg-slate-900 text-white text-[10px] py-1 px-2.5 rounded-lg font-bold whitespace-nowrap pointer-events-none shadow-lg z-30">
                        ${(item.revenue / 1000).toFixed(1)}k • {item.roas}x ROAS
                      </div>
                      <div
                        className="w-full max-w-[22px] bg-emerald-500/20 group-hover:bg-emerald-600 rounded-t-md transition-all duration-300"
                        style={{ height: `${(item.revenue / 25000) * 100}%` }}
                      />
                      <span className="text-[10px] text-slate-400 font-bold mt-1.5">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Breakdown Rows */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Top Performing Campaigns</span>
                  <span className="text-[11px] text-emerald-700 font-bold">Optimized Structure</span>
                </div>

                <div className="space-y-1.5">
                  {currentData.campaigns.slice(0, 3).map((camp, i) => (
                    <motion.div
                      key={i}
                      whileHover={!shouldReduceMotion ? { x: 3 } : {}}
                      className="flex items-center justify-between p-2.5 bg-slate-50/90 hover:bg-emerald-50/40 rounded-xl text-xs transition-all border border-slate-200/60 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">{camp.name}</p>
                          <p className="text-[10px] text-slate-500">{camp.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-emerald-700">{camp.roas} ROAS</span>
                        <p className="text-[10px] font-semibold text-slate-500">{camp.revenue} rev</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Security / Trust Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Google Ads & GA4 Attribution
                </span>
                <span className="font-bold text-emerald-700">99.8% Data Accuracy</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
