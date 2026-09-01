import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Search, ChevronDown, MessageCircleQuestion,
  Sparkles, MessageCircle, ArrowRight, ShieldCheck
} from 'lucide-react';
import { faqs, personalInfo } from '../data/portfolioData';

export default function FAQModal({ isOpen, onClose, onBookCall }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered FAQs based on search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    const q = searchQuery.toLowerCase().trim();
    return faqs.filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col z-10"
            role="dialog"
            aria-modal="true"
            aria-labelledby="faq-modal-title"
          >
            {/* Top Accent Gradient Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 shrink-0" />

            {/* Sticky Header */}
            <div className="p-5 sm:p-7 border-b border-slate-100 bg-white/95 backdrop-blur-sm sticky top-0 z-20 shrink-0 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 mb-2">
                    <MessageCircleQuestion className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      Frequently Asked Questions
                    </span>
                  </div>
                  <h3
                    id="faq-modal-title"
                    className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
                  >
                    Clear Answers To Common Questions
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Everything you need to know about partnering on Google Ads growth.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0 border border-slate-200/60"
                  aria-label="Close FAQ modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions (e.g., budget, ROAS, tracking, audit)..."
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 text-xs rounded-full cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable FAQ Accordion List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-3 divide-y divide-slate-100">
              {filteredFaqs.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <p className="text-slate-700 font-semibold text-sm">
                    No matching questions found for "{searchQuery}"
                  </p>
                  <p className="text-slate-400 text-xs max-w-sm mx-auto">
                    Have a specific question? Feel free to reach out directly via WhatsApp or book a free strategy call.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    View all {faqs.length} questions
                  </button>
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isOpenItem = openIndex === idx;
                  const numFormatted = String(idx + 1).padStart(2, '0');

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl transition-all duration-200 border ${
                        isOpenItem
                          ? 'bg-emerald-50/40 border-emerald-200/80 shadow-xs'
                          : 'bg-white border-slate-200/70 hover:border-slate-300'
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left cursor-pointer"
                        aria-expanded={isOpenItem}
                      >
                        <div className="flex items-start gap-3.5">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isOpenItem
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {numFormatted}
                          </span>
                          <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                            {faq.q}
                          </span>
                        </div>

                        <div
                          className={`p-1 rounded-lg text-slate-400 transition-transform duration-200 shrink-0 ${
                            isOpenItem ? 'rotate-180 text-emerald-600 bg-emerald-100/60' : ''
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpenItem && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 pl-13 sm:pl-14 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-emerald-100/60 mt-1">
                              <p className="pt-3">{faq.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>

            {/* Sticky Footer Action Bar */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 backdrop-blur-sm shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500 text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Need tailored answers for your store?</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Shehzad,%20I%20have%20a%20question%20regarding%20Google%20Ads%20growth.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ask on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    if (onBookCall) onBookCall();
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                  <span>Book Free Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
