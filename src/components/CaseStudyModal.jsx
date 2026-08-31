import React from 'react';
import { X, TrendingUp, CheckCircle, ArrowRight, DollarSign, Award, Target, Layers } from 'lucide-react';

export default function CaseStudyModal({ caseStudy, logoSrc, isOpen, onClose, onBookCall }) {
  if (!isOpen || !caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92dvh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-white sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-3">
            {logoSrc && (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-xs">
                <img src={logoSrc} alt={caseStudy.brand} className="w-full h-full object-contain rounded-lg" />
              </div>
            )}
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-bold rounded-full mb-1">
                {caseStudy.industry}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">{caseStudy.brand}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
          
          {/* Key Metrics Banner */}
          {caseStudy.sampleMetrics.metricsList ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3.5 sm:p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center">
              {caseStudy.sampleMetrics.metricsList.map((m, mIdx) => (
                <div key={mIdx} className="p-2 rounded-lg bg-white/70 border border-emerald-100/60">
                  <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate" title={m.label}>
                    {m.label}
                  </p>
                  <p className={`text-base sm:text-2xl font-extrabold ${m.highlight ? 'text-emerald-700' : 'text-slate-900'} mt-0.5`}>
                    {m.value}
                  </p>
                  {m.badge && (
                    <span className="inline-block mt-0.5 text-[9px] sm:text-[10px] text-emerald-600 font-semibold">{m.badge}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center">
              <div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                  {caseStudy.sampleMetrics.roasLabel || 'ROAS'}
                </p>
                <p className="text-lg sm:text-2xl font-extrabold text-emerald-700">{caseStudy.sampleMetrics.roas}</p>
                <span className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold">{caseStudy.sampleMetrics.roasBadge}</span>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                  {caseStudy.sampleMetrics.revenueLabel || 'Revenue'}
                </p>
                <p className="text-sm sm:text-xl font-extrabold text-slate-900 truncate" title={caseStudy.sampleMetrics.revenueGrowth}>
                  {caseStudy.sampleMetrics.revenueGrowth}
                </p>
                <span className="text-[9px] sm:text-[10px] text-slate-500">
                  {caseStudy.sampleMetrics.revenueBadge || 'Growth'}
                </span>
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                  {caseStudy.sampleMetrics.metric3Label || 'Acquisition CPA'}
                </p>
                <p className="text-sm sm:text-xl font-extrabold text-emerald-700 truncate" title={caseStudy.sampleMetrics.spend || caseStudy.sampleMetrics.cpa}>
                  {caseStudy.sampleMetrics.spend || caseStudy.sampleMetrics.cpa}
                </p>
                <span className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold">{caseStudy.sampleMetrics.cpaBadge}</span>
              </div>
            </div>
          )}

          <div className="text-xs text-slate-400 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            Note: Performance metrics shown represent real-world client benchmark targets. Actual results vary based on margin structure and ad spend.
          </div>

          {/* Campaign Strategy Breakdown */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-emerald-600" /> The Challenge
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-100">
                {caseStudy.challenge}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-emerald-600" /> Strategic Execution
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-100">
                {caseStudy.strategy}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-emerald-600" /> Core Growth Takeaways
              </h4>
              <ul className="space-y-2">
                {caseStudy.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Callout Box */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="text-center sm:text-left">
              <h5 className="font-bold text-base sm:text-lg">Want similar results for your store?</h5>
              <p className="text-emerald-100 text-xs mt-1">Let's audit your Google Ads setup and uncover hidden ROAS opportunities.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookCall();
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-white text-emerald-800 font-bold rounded-lg text-xs hover:bg-emerald-50 transition-all shrink-0 flex items-center justify-center gap-1.5 shadow cursor-pointer"
            >
              Book Strategy Call <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
