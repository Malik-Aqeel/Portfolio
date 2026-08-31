import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageSquare, ShieldCheck, Clock, Video, CheckCircle2, Award, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function FinalCTA({ onBookCall }) {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Radial Glow & Soft Mesh Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/40 to-slate-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-35 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(20, 184, 166, 0.1) 60%, transparent 80%)' }}
      />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Glow behind card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-sky-500/20 rounded-[2.5rem] blur-xl opacity-70 transition-all duration-500 pointer-events-none" />

          <div className="relative bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 lg:p-16 border border-emerald-200/90 shadow-2xl shadow-emerald-950/10 text-center space-y-7 overflow-hidden">
            
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500" />

            {/* Availability Badge */}
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-soft-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-extrabold text-emerald-900 tracking-wide">
                🇵🇰 Quick Response: Inquiries Reviewed Within 24 Hours
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2] pb-1 max-w-3xl mx-auto">
              Ready To Turn Google Ads Into A{' '}
              <span className="animated-growth-gradient">
                Predictable Growth Engine?
              </span>
            </h2>

            {/* Supporting Text */}
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              Send your store details for a complimentary growth audit with <strong className="text-slate-900 font-bold">{personalInfo.name}</strong>. I'll audit your current ad account, uncover wasted spend, and email you a tailored scaling plan.
            </p>

            {/* 3 Micro Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Fast 24-Hour Review</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
                <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Actionable Audit Breakdown</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-center gap-2 text-xs font-bold text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero Sales Pressure</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.button
                onClick={onBookCall}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-base rounded-full shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 flex items-center justify-center gap-2.5 cursor-pointer button-shine transition-all"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Get Free Growth Audit</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-base rounded-full border border-slate-200/90 shadow-soft-sm hover:border-emerald-300 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-slate-600" />
                <span>Send Me A Message</span>
              </a>
            </div>

            {/* Guarantee Note */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% actionable performance feedback tailored to your store's margins.</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
