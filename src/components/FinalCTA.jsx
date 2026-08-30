import React from 'react';
import { ArrowRight, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function FinalCTA({ onBookCall }) {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Radial Glow & Soft Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-emerald-50/70 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow-green pointer-events-none opacity-60"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 lg:p-16 border border-emerald-200/80 shadow-soft-lg text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Ready for Scale</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.25] pb-1 max-w-3xl mx-auto">
            Ready To Turn Google Ads Into A Growth Engine?
          </h2>

          {/* Supporting Text */}
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Let's look at your current advertising setup, identify opportunities, and build a custom strategy around your margin and growth goals.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-emerald-glow flex items-center justify-center gap-2"
            >
              <span>Book A Free Strategy Call</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-base rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-slate-600" />
              <span>Send Me A Message</span>
            </a>
          </div>

          {/* Guarantee Note */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>No hard sales push. 100% actionable performance feedback.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
