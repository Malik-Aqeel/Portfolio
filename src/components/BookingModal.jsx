import React, { useState, useEffect } from 'react';
import {
  X, Mail, User, Phone, Globe, Send, CheckCircle2,
  AlertCircle, ShieldCheck, Copy, Check, ExternalLink,
  MessageCircle, RotateCcw, ArrowRight
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
  const [copied, setCopied] = useState(false);

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

  // Reset modal state whenever modal is closed
  useEffect(() => {
    if (!isOpen) {
      setErrors({});
      setErrorMessage('');
      setSubmitted(false);
      setCopied(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setErrors({});
    setErrorMessage('');
    setSubmitted(false);
    setCopied(false);
    onClose();
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      website: '',
      message: ''
    });
    setErrors({});
    setErrorMessage('');
    setSubmitted(false);
    setCopied(false);
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

  const getSubject = () => {
    return `Google Ads Growth Consultation - ${formData.name.trim()} (${formData.website.trim() || 'Store'})`;
  };

  const getBodyText = () => {
    return (
      `Hi Shehzad,\n\n` +
      `I would like to request a Google Ads strategy consultation for my e-commerce business.\n\n` +
      `📋 Client Details:\n` +
      `• Full Name: ${formData.name.trim()}\n` +
      `• Email Address: ${formData.email.trim()}\n` +
      `• Phone / WhatsApp: ${formData.phone.trim()}\n` +
      `• Website / Store URL: ${formData.website.trim()}\n` +
      (formData.message.trim() ? `• Project Notes & Goals:\n${formData.message.trim()}\n\n` : '\n') +
      `Looking forward to discussing our growth strategy.\n\n` +
      `Best regards,\n` +
      `${formData.name.trim()}`
    );
  };

  // 1. Native Mailto URL
  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(getBodyText());
    return `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  // 2. Direct Web Gmail Compose URL (Works 100% reliably on Mac/Windows in browser)
  const buildGmailUrl = () => {
    const subject = encodeURIComponent(getSubject());
    const body = encodeURIComponent(getBodyText());
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${subject}&body=${body}`;
  };

  // 3. Direct WhatsApp URL (Ideal for Mac, iOS & Android)
  const buildWhatsAppUrl = () => {
    const body = encodeURIComponent(getBodyText());
    const cleanPhone = personalInfo.whatsapp.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${body}`;
  };

  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(getBodyText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy details:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Attempt default mail dispatch via safe hidden anchor click (immune to Mac Safari blocking)
    try {
      const mailtoUrl = buildMailtoUrl();
      const link = document.createElement('a');
      link.href = mailtoUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.warn('Mail client dispatch notice:', err);
    }

    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">

        {/* Decorative Top Accent Gradient */}
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
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60 shadow-xs">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {submitted ? 'Send Your Consultation Request' : 'Get Free Strategy Audit'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Direct to <strong className="text-emerald-700">{personalInfo.email}</strong> &bull; Google Ads Specialist
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            /* ═══════════════════════════════════════════════════════════
               SUCCESS SCREEN / MULTI-CHANNEL DISPATCH HUB (100% MAC SAFE)
               ═══════════════════════════════════════════════════════════ */
            <div className="space-y-4 text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Ready to Send, {formData.name.split(' ')[0]}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-1 leading-relaxed">
                  Choose your preferred option below to dispatch your details to <strong className="text-emerald-700">{personalInfo.email}</strong>:
                </p>
              </div>

              {/* Multi-Channel Options (Mac & All Browsers Friendly) */}
              <div className="space-y-2.5 pt-1 text-left">
                {/* 1. Gmail Web (100% Reliable on Mac) */}
                <a
                  href={buildGmailUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="leading-tight">Send via Gmail Web</p>
                      <p className="text-[10.5px] text-emerald-100/90 font-normal">Opens in browser &bull; Recommended for Mac & PC</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </a>

                {/* 2. Direct WhatsApp Delivery */}
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 font-bold text-sm flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="leading-tight text-emerald-950 font-black">Send via WhatsApp</p>
                      <p className="text-[10.5px] text-emerald-700 font-medium">{personalInfo.whatsapp} &bull; Instant Response</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* 3. Default Mail Client (Apple Mail / Outlook) */}
                <a
                  href={buildMailtoUrl()}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-800 font-semibold text-xs flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>Open in Default Mail App (Apple Mail / Outlook)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* 4. One-Click Copy All Information */}
                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Details Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Full Consultation Notes</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Actions: Reset/Edit Form or Close */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-700 font-bold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Fill New Request / Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* ═══════════════════════════════════════════════════════════
               FORM (NAME, EMAIL, PHONE, WEBSITE, MESSAGE)
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
                    placeholder="e.g. John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${errors.name ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
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
                    placeholder="john@yourstore.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${errors.email ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
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
                    placeholder="+1 (555) 000-0000 or WhatsApp"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${errors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
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
                    type="text"
                    required
                    placeholder="e.g. yourstore.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all ${errors.website ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200'
                      }`}
                  />
                </div>
                {errors.website && <p className="text-[10px] text-rose-600 font-semibold mt-1">{errors.website}</p>}
              </div>

              {/* Message / Goals (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Current Monthly Ad Spend or Target Goal <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Scaling PMax from $10k/mo to $50k/mo, lowering CPA..."
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
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Consultation Request</span>
                </button>
              </div>

              {/* Trust Badge */}
              <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Confidential &bull; Sent directly to {personalInfo.email}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
