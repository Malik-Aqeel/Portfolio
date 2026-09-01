import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Star, ChevronLeft, ChevronRight, Quote, MessageCircle,
  Sparkles, ArrowRight, CheckCircle2
} from 'lucide-react';
import { testimonials } from '../data/portfolioData';

/* ─── Individual Testimonial Card ─── */
function TestimonialCard({ item, index, isActive, shouldReduceMotion }) {
  const tagColors = {
    'E-commerce Fashion': { bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-200/60' },
    'DTC Health & Beauty': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200/60' },
    'Home Decor': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200/60' },
    'Sports Apparel': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200/60' },
  };

  const colors = tagColors[item.tag] || { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200/60' };

  // Generate initials for avatar
  const initials = item.name.split(' ').map(n => n[0]).join('');
  const avatarColors = [
    'from-emerald-500 to-teal-600',
    'from-sky-500 to-blue-600',
    'from-violet-500 to-purple-600',
    'from-amber-500 to-orange-600',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.215, 0.61, 0.355, 1.0],
      }}
      whileHover={shouldReduceMotion ? {} : {
        y: -10,
        transition: { duration: 0.3 },
      }}
      className="group relative h-full"
    >
      {/* Hover glow */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-emerald-500/15 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative h-full rounded-3xl bg-white border border-slate-200/80 p-7 sm:p-8 overflow-hidden flex flex-col justify-between transition-all duration-300 group-hover:shadow-xl group-hover:border-emerald-200/60">

        {/* Decorative quote watermark */}
        <div className="absolute top-4 right-4 pointer-events-none select-none">
          <Quote className="w-20 h-20 text-slate-100 group-hover:text-emerald-100/60 transition-colors duration-700 rotate-180" />
        </div>

        {/* Content */}
        <div className="space-y-5 relative z-10">

          {/* Stars row */}
          <div className="flex items-center gap-1">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400 drop-shadow-sm" />
            ))}
            <span className="text-[10px] font-extrabold text-amber-600 ml-1.5 bg-amber-50 px-1.5 py-0.5 rounded-md">
              5.0
            </span>
          </div>

          {/* Quote text */}
          <p className="text-slate-700 text-[15px] leading-[1.75] font-medium">
            "{item.quote}"
          </p>
        </div>

        {/* Client info footer */}
        <div className="pt-6 mt-6 border-t border-slate-100 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              {/* Avatar */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center shadow-md shadow-emerald-500/10 shrink-0`}>
                <span className="text-sm font-extrabold text-white">{initials}</span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">{item.name}</h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {item.role} · <span className="font-bold text-slate-600">{item.company}</span>
                </p>
              </div>
            </div>

            {/* Industry tag */}
            <span className={`hidden sm:inline-flex px-2.5 py-1 ${colors.bg} ${colors.text} border ${colors.border} text-[10px] font-bold rounded-lg`}>
              {item.tag}
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

/* ─── Main Testimonials Section ─── */
export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Auto-rotate on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const mobileVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1.0] },
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.92,
      transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1.0] },
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)',
      }}
    >
      {/* ═══ Background Effects ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-10 -right-32 w-[600px] h-[600px] rounded-full opacity-35"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-10 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)' }}
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
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/20"
              style={{ left: `${10 + i * 20}%`, top: `${15 + (i % 3) * 30}%` }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.1, 0.35, 0.1],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 3.5 + i * 0.6,
                repeat: Infinity,
                delay: i * 0.7,
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
          className="text-center max-w-3xl mx-auto mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-emerald-200/60 shadow-sm mb-6">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
              Client Feedback
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight leading-[1.22] pb-1 mb-5">
            Real Results.{' '}
            <br className="hidden sm:block" />
            <span className="animated-gradient-text">
              Real Feedback.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Don't just take my word for it. Here's what e-commerce founders and marketing leaders say after scaling with data-driven Google Ads.
          </p>

          {/* Aggregate rating strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-3 mt-6 px-5 py-2.5 rounded-full bg-white border border-slate-200/70 shadow-sm"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="w-px h-4 bg-slate-200" />
            <span className="text-xs font-extrabold text-slate-800">4.9/5 Average</span>
            <div className="w-px h-4 bg-slate-200" />
            <span className="text-xs font-bold text-slate-500">50+ Brands</span>
          </motion.div>
        </motion.div>

        {/* ═══ DESKTOP: Premium 2-Row Staggered Layout ═══ */}
        <div className="hidden md:block">
          {/* Top row: 2 featured cards */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            {testimonials.slice(0, 2).map((item, idx) => (
              <TestimonialCard
                key={idx}
                item={item}
                index={idx}
                isActive={false}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>

          {/* Bottom row: 2 cards */}
          <div className="grid grid-cols-2 gap-6">
            {testimonials.slice(2, 4).map((item, idx) => (
              <TestimonialCard
                key={idx + 2}
                item={item}
                index={idx + 2}
                isActive={false}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>

        {/* ═══ MOBILE: Animated Carousel ═══ */}
        <div className="block md:hidden">
          <div className="relative overflow-hidden rounded-3xl min-h-[380px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={mobileVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <TestimonialCard
                  item={testimonials[currentIndex]}
                  index={currentIndex}
                  isActive={true}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-6 px-1">
            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setDirection(dotIdx > currentIndex ? 1 : -1);
                    setCurrentIndex(dotIdx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === dotIdx
                      ? 'w-8 bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Nav arrows */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={prevTestimonial}
                whileTap={{ scale: 0.92 }}
                className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-emerald-200 hover:text-emerald-600 shadow-sm transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                onClick={nextTestimonial}
                whileTap={{ scale: 0.92 }}
                className="p-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl text-white shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* ═══ BOTTOM CTA ═══ */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200/70 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="text-sm font-bold text-slate-700">
              Join <strong className="text-emerald-700">50+ brands</strong> already scaling profitably with Google Ads
            </span>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
