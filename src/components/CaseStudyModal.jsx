import React from 'react';
import { X, TrendingUp, CheckCircle, ArrowRight, DollarSign, Award, Target, Layers } from 'lucide-react';

export default function CaseStudyModal({ caseStudy, isOpen, onClose, onBookCall }) {
  if (!isOpen || !caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/80 sticky top-0 bg-white z-10">
          <div>
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-1">
              {caseStudy.industry}
            </span>
            <h3 className="text-xl font-bold text-slate-900">{caseStudy.brand}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center">
            <div>
              <p className="text-xs text-slate-500 font-medium">ROAS Achieved</p>
              <p className="text-2xl font-extrabold text-emerald-700">{caseStudy.sampleMetrics.roas}</p>
              <span className="text-[10px] text-emerald-600 font-semibold">{caseStudy.sampleMetrics.roasBadge}</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Revenue Scaling</p>
              <p className="text-2xl font-extrabold text-slate-900">{caseStudy.sampleMetrics.revenueGrowth}</p>
              <span className="text-[10px] text-slate-500">Over Baseline</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Customer Acquisition</p>
              <p className="text-2xl font-extrabold text-emerald-700">{caseStudy.sampleMetrics.cpa}</p>
              <span className="text-[10px] text-emerald-600 font-semibold">{caseStudy.sampleMetrics.cpaBadge}</span>
            </div>
          </div>

          <div className="text-xs text-slate-400 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            Note: Performance metrics shown represent real-world client benchmark targets. Actual results vary based on margin structure and ad spend.
          </div>

          {/* Campaign Strategy Breakdown */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-emerald-600" /> The Challenge
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {caseStudy.challenge}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-emerald-600" /> Strategic Execution
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {caseStudy.strategy}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-emerald-600" /> Core Growth Takeaways
              </h4>
              <ul className="space-y-2">
                {caseStudy.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Callout Box */}
          <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <h5 className="font-bold text-lg">Want similar results for your store?</h5>
              <p className="text-emerald-100 text-xs mt-1">Let's audit your Google Ads setup and uncover hidden ROAS opportunities.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onBookCall();
              }}
              className="px-5 py-2.5 bg-white text-emerald-800 font-bold rounded-lg text-xs hover:bg-emerald-50 transition-all shrink-0 flex items-center gap-1.5 shadow"
            >
              Book Strategy Call <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
