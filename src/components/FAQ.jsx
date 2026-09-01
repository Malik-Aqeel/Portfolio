import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Sparkles, MessageCircleQuestion } from 'lucide-react';
import { faqs } from '../data/portfolioData';

/* ── Accent Colors per FAQ (light theme) ── */
const accentMap = [
  { ring: 'ring-emerald-300/60', text: 'text-emerald-600', numBg: 'bg-emerald-50', numText: 'text-emerald-600', border: 'border-emerald-200/60', glow: 'rgba(16, 185, 129, 0.10)' },
  { ring: 'ring-sky-300/60', text: 'text-sky-600', numBg: 'bg-sky-50', numText: 'text-sky-600', border: 'border-sky-200/60', glow: 'rgba(14, 165, 233, 0.10)' },
  { ring: 'ring-violet-300/60', text: 'text-violet-600', numBg: 'bg-violet-50', numText: 'text-violet-600', border: 'border-violet-200/60', glow: 'rgba(139, 92, 246, 0.10)' },
  { ring: 'ring-amber-300/60', text: 'text-amber-600', numBg: 'bg-amber-50', numText: 'text-amber-600', border: 'border-amber-200/60', glow: 'rgba(245, 158, 11, 0.10)' },
  { ring: 'ring-rose-300/60', text: 'text-rose-600', numBg: 'bg-rose-50', numText: 'text-rose-600', border: 'border-rose-200/60', glow: 'rgba(244, 63, 94, 0.10)' },
  { ring: 'ring-teal-300/60', text: 'text-teal-600', numBg: 'bg-teal-50', numText: 'text-teal-600', border: 'border-teal-200/60', glow: 'rgba(20, 184, 166, 0.10)' },
  { ring: 'ring-indigo-300/60', text: 'text-indigo-600', numBg: 'bg-indigo-50', numText: 'text-indigo-600', border: 'border-indigo-200/60', glow: 'rgba(99, 102, 241, 0.10)' },
];

/* ── Animation Variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const answerVariants = {
  hidden: { opacity: 0, height: 0, marginTop: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    marginTop: 8,
    transition: {
      height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.25, delay: 0.1 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    marginTop: 0,
    transition: {
      height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.15 },
    },
  },
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)',
      }}
    >
      {/* ── Decorative Background Effects ── */}

      {/* Mesh gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-20 -left-40 w-[600px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-20 -right-40 w-[550px] h-[550px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)' }}
        />
      </div>

      {/* Dot grid overlay */}
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
              style={{ left: `${12 + i * 20}%`, top: `${18 + (i % 3) * 25}%` }}
              animate={{ y: [0, -22, 0], opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 3.5 + i * 0.7, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* ── Section Header ── */}
        <motion.div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20" variants={headerVariants}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-emerald-200/60 shadow-sm mb-6">
            <MessageCircleQuestion className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
              Clear Answers
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-section-heading font-extrabold text-slate-900 tracking-tight">
            Frequently Asked{' '}
            <span className="animated-gradient-text">Questions</span>
          </h2>

          {/* Subheading */}
          <p className="text-subheading text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about working together and scaling Google Ads.
          </p>

          {/* Animated divider */}
          {!shouldReduceMotion && (
            <motion.div
              className="mx-auto mt-8 h-px w-24 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #10B981, transparent)',
              }}
              animate={{ width: [60, 120, 60], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>

        {/* ── Accordion List ── */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const accent = accentMap[index % accentMap.length];

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative rounded-2xl overflow-hidden transition-all duration-300
                  ${isOpen
                    ? `ring-1 ${accent.ring} shadow-soft-md`
                    : 'ring-1 ring-slate-200/80 hover:ring-slate-300 shadow-soft-sm hover:shadow-soft-md'
                  }`}
                style={{
                  background: isOpen
                    ? `linear-gradient(135deg, #FFFFFF 0%, rgba(255,255,255,0.95) 100%)`
                    : '#FFFFFF',
                  boxShadow: isOpen
                    ? `0 8px 32px -8px ${accent.glow}, 0 0 0 1px rgba(0,0,0,0.03)`
                    : undefined,
                }}
                whileHover={
                  !isOpen && !shouldReduceMotion
                    ? { y: -2, transition: { duration: 0.2 } }
                    : {}
                }
              >
                {/* Active accent bar */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="absolute top-0 left-0 w-1 h-full rounded-r-full"
                      style={{
                        background: `linear-gradient(180deg, ${accent.glow.replace('0.10', '0.9')}, ${accent.glow.replace('0.10', '0.2')})`,
                      }}
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors"
                  aria-expanded={isOpen}
                  id={`faq-button-${index}`}
                >
                  <span className="flex items-center gap-4">
                    {/* Number badge */}
                    <span
                      className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-xl text-xs font-bold transition-all duration-300
                        ${isOpen
                          ? `${accent.numBg} ${accent.numText}`
                          : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-500'
                        }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Question text */}
                    <span
                      className={`font-semibold text-base sm:text-lg transition-colors duration-200
                        ${isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}
                    >
                      {faq.q}
                    </span>
                  </span>

                  {/* Chevron */}
                  <motion.div
                    className="shrink-0"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ChevronDown
                      className={`w-5 h-5 transition-colors duration-200
                        ${isOpen ? accent.text : 'text-slate-400 group-hover:text-slate-500'}`}
                    />
                  </motion.div>
                </button>

                {/* Answer content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      variants={answerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 pl-[4.25rem] sm:pl-[4.75rem]">
                        <div className="border-t border-slate-100 pt-4">
                          <p className="text-slate-600 text-sm sm:text-[0.95rem] leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom CTA Strip ── */}
        <motion.div
          variants={headerVariants}
          className="mt-16 text-center"
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white
                        border border-emerald-200/50 shadow-soft-sm"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-50">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-sm text-slate-600">
              Still have questions?{' '}
              <a
                href="#contact"
                className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors underline decoration-emerald-300/50 underline-offset-2 hover:decoration-emerald-400/60"
              >
                Let's talk →
              </a>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
