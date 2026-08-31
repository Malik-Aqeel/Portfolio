import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  X, Mail, User, Phone, Globe, Send, CheckCircle2,
  MessageCircle, AlertCircle, ShieldCheck
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function BookingModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleClose = () => {
    setErrors({});
    setErrorMessage('');
    onClose();
    setTimeout(() => {
      if (!isOpen) {
        setSubmitted(false);
      }
    }, 300);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone / WhatsApp number is required';
    }
    if (!formData.website.trim()) {
      errs.website = 'Website / Store URL is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const buildWhatsAppUrl = () => {
    const phoneClean = personalInfo.whatsapp.replace(/[^0-9]/g, '');
    const text = `Hi ${personalInfo.name}, I would like to book a Google Ads Growth Consultation:%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name.trim())}%0A` +
      `*Email:* ${encodeURIComponent(formData.email.trim())}%0A` +
      `*Phone/WhatsApp:* ${encodeURIComponent(formData.phone.trim())}%0A` +
      `*Website:* ${encodeURIComponent(formData.website.trim())}%0A` +
      (formData.message.trim() ? `*Notes:* ${encodeURIComponent(formData.message.trim())}%0A` : '');
    return `https://wa.me/${phoneClean}?text=${text}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const waUrl = buildWhatsAppUrl();
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Unable to open WhatsApp. You can reach out directly at ' + personalInfo.whatsapp);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Decorative Top Accent */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-20 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Send Your Information
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct message to <strong className="text-emerald-700">{personalInfo.name}</strong> &bull; Google Ads Specialist
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            /* ═══════════════════════════════════════════════════════════
               SUCCESS SCREEN (SIMPLE & CLEAN)
               ═══════════════════════════════════════════════════════════ */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Ready to Connect!
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto mt-2 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>! Your inquiry details are ready. Reach out via WhatsApp or direct email to schedule your strategy session.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-full shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`mailto:${personalInfo.email}?subject=Google Ads Growth Consultation - ${encodeURIComponent(formData.name)}&body=Hi Shehzad,%0D%0A%0D%0AMy Details:%0D%0AName: ${encodeURIComponent(formData.name)}%0D%0AWebsite: ${encodeURIComponent(formData.website)}%0D%0APhone: ${encodeURIComponent(formData.phone)}`}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-full transition-colors cursor-pointer text-center"
                >
                  Email Instead
                </a>
              </div>
            </div>
          ) : (
            /* ═══════════════════════════════════════════════════════════
               SIMPLE FORM (NAME, EMAIL, PHONE, WEBSITE, MESSAGE)
               ═══════════════════════════════════════════════════════════ */
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${
                      errors.name ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-[10px] text-rose-600 font-semibold mt-1">{errors.name}</p>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${
                      errors.email ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[10px] text-rose-600 font-semibold mt-1">{errors.email}</p>}
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone / WhatsApp <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${
                      errors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-rose-600 font-semibold mt-1">{errors.phone}</p>}
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Website / Store URL <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="url"
                    required
                    placeholder="https://yourstore.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${
                      errors.website ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.website && <p className="text-[10px] text-rose-600 font-semibold mt-1">{errors.website}</p>}
              </div>

              {/* Message / Goals (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Project Notes / Target Goals <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell me a bit about your current ad spend, challenges, or targets..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Consultation Request</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Confidential &bull; No obligation review</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
