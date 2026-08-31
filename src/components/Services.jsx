import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  Target, ShoppingBag, TrendingUp, SearchCheck, BarChart3, Compass,
  CheckCircle2, ArrowRight, ArrowUpRight, Sparkles, ChevronRight
} from 'lucide-react';
import { services } from '../data/portfolioData';

/* ─── Service card accent colors per service ─── */
const serviceAccents = [
  { gradient: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', glow: 'rgba(16,185,129,0.15)' },
  { gradient: 'from-sky-500 to-blue-500', bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-600', glow: 'rgba(14,165,233,0.15)' },
  { gradient: 'from-violet-500 to-purple-500', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', glow: 'rgba(139,92,246,0.15)' },
  { gradient: 'from-amber-500 to-orange-500', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600', glow: 'rgba(245,158,11,0.15)' },
  { gradient: 'from-rose-500 to-pink-500', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-600', glow: 'rgba(244,63,94,0.15)' },
  { gradient: 'from-teal-500 to-cyan-500', bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-600', glow: 'rgba(20,184,166,0.15)' },
];

const iconMap = {
  Target, ShoppingBag, TrendingUp, SearchCheck, BarChart3, Compass,
};

export default function Services({ onBookCall }) {
  const shouldReduceMotion = useReducedMotion();
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <section id="services" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #F8FAFB 0%, #FFFFFF 40%, #F0F7F4 80%, #F8FAFB 100%)' }}>

      {/* ─── Background Decoration ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 -right-40 w-[600px] h-[600px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-32 -left-40 w-[500px] h-[500px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)' }} />
      </div>

      {/* Fine grid pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

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
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/60 shadow-sm backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
              Specialized Services
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight leading-[1.22] pb-1 mb-5">
            How I Can Help{' '}
            <span className="animated-gradient-text">Your Brand Grow</span>
          </h2>

          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From campaign architecture to profitable scaling with end-to-end Google Ads systems engineered around your business goals and margins.
          </p>
        </motion.div>

        {/* ═══ SERVICES GRID ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, idx) => {
            const accent = serviceAccents[idx] || serviceAccents[0];
            const IconComponent = iconMap[service.iconName] || Target;
            const isExpanded = expandedCard === idx;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="group relative"
              >
                {/* Hover glow behind card */}
                <div
                  className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: `radial-gradient(circle at 50% 100%, ${accent.glow} 0%, transparent 70%)` }}
                />

                {/* Card */}
                <div className="relative h-full rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200/70 shadow-sm hover:shadow-xl hover:border-slate-300/80 transition-all duration-500 overflow-hidden flex flex-col">

                  {/* Top accent bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${accent.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="p-6 sm:p-7 flex-1 flex flex-col">
                    {/* Header row: icon + number */}
                    <div className="flex items-start justify-between mb-5">
                      {/* Icon container */}
                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                        className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.gradient} flex items-center justify-center shadow-lg`}
                        style={{ boxShadow: `0 8px 24px -4px ${accent.glow}` }}
                      >
                        <IconComponent className="w-5.5 h-5.5 text-white" />
                      </motion.div>

                      {/* Service number */}
                      <span className="text-4xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none leading-none">
                        {service.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-slate-800 tracking-tight mb-2 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-grow-0">
                      {service.description}
                    </p>

                    {/* Features list - expandable */}
                    <div className="flex-1 flex flex-col justify-end">
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : idx)}
                        className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors mb-3 cursor-pointer group/toggle"
                      >
                        <motion.span
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </motion.span>
                        <span>{isExpanded ? 'Hide Details' : 'View Deliverables'}</span>
                        <span className={`w-5 h-5 rounded-full ${accent.bg} flex items-center justify-center text-[10px] font-black ${accent.text}`}>
                          {service.features.length}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-2 pb-4 border-t border-slate-100 pt-3">
                              {service.features.map((feature, fIdx) => (
                                <motion.div
                                  key={fIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: fIdx * 0.05 }}
                                  className="flex items-start gap-2.5"
                                >
                                  <CheckCircle2 className={`w-4 h-4 ${accent.text} shrink-0 mt-0.5`} />
                                  <span className="text-xs font-medium text-slate-600">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* CTA Button */}
                      <motion.button
                        onClick={onBookCall}
                        whileHover={shouldReduceMotion ? {} : { x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-3 px-4 rounded-xl border transition-all duration-300 flex items-center justify-between text-sm font-bold cursor-pointer
                          bg-slate-50/80 border-slate-200/80 text-slate-700
                          hover:bg-gradient-to-r hover:${accent.gradient} hover:text-white hover:border-transparent hover:shadow-lg group/btn`}
                        style={{ '--hover-shadow': accent.glow }}
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover/btn:opacity-100 transition-opacity text-amber-300" />
                          Discuss This Service
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ═══ BOTTOM CTA BANNER ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 relative rounded-3xl overflow-hidden"
        >
          {/* Dark gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(16,185,129,0.3) 0%, transparent 50%)' }} />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="relative z-10 py-10 px-8 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Not sure which service fits your brand?
              </h3>
              <p className="text-white/50 text-sm mt-1.5 max-w-lg">
                Book a free 30-minute strategy call. I'll audit your current setup and recommend exactly what will move the needle.
              </p>
            </div>

            <motion.button
              onClick={onBookCall}
              whileHover={shouldReduceMotion ? {} : { y: -2, boxShadow: '0 16px 40px -8px rgba(16,185,129,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="button-shine shrink-0 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm rounded-full transition-all shadow-xl shadow-emerald-500/25 flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Book Free Strategy Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
