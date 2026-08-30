import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Mail, Linkedin, MessageCircle, Send, CheckCircle2,
  DollarSign, Globe, Building2, User, Sparkles, ArrowRight,
  Zap, Phone
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

/* ── Animation Variants ── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const cardSlideVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const formSlideVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.215, 0.61, 0.355, 1] },
  },
};

const successVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] },
  },
};

/* ── Contact Channel Data ── */
const contactChannels = [
  {
    icon: Mail,
    label: 'Direct Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-300',
    hoverText: 'group-hover:text-emerald-700',
    external: false,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn Profile',
    value: 'Connect on LinkedIn',
    href: personalInfo.linkedin,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    hoverBorder: 'hover:border-sky-300',
    hoverText: 'group-hover:text-sky-600',
    external: true,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp Chat',
    value: personalInfo.whatsapp,
    href: `https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, '')}`,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-300',
    hoverText: 'group-hover:text-emerald-700',
    external: true,
  },
];

export default function Contact({ onBookCall }) {
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    adSpend: '$15k - $50k / mo',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFB 30%, #F0F7F4 60%, #F8FAFB 100%)',
      }}
    >
      {/* ── Decorative Background ── */}
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
              style={{ left: `${10 + i * 18}%`, top: `${15 + (i % 3) * 28}%` }}
              animate={{ y: [0, -22, 0], opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 3.5 + i * 0.7, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* ── Section Header ── */}
        <motion.div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20" variants={fadeUpVariants}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-emerald-200/60 shadow-sm backdrop-blur-md mb-6">
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] font-bold text-emerald-700 tracking-widest uppercase">
              Get In Touch
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-section-heading font-extrabold text-slate-900 tracking-tight">
            Let's Talk About Your{' '}
            <span className="animated-gradient-text">Growth</span>
          </h2>

          {/* Subheading */}
          <p className="text-subheading text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Ready to scale your e-commerce business with data-driven Google Ads? Let's build your growth roadmap together.
          </p>

          {/* Animated divider */}
          {!shouldReduceMotion && (
            <motion.div
              className="mx-auto mt-8 h-px w-24 rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #10B981, transparent)' }}
              animate={{ width: [60, 120, 60], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.div>

        {/* ── Two-Column Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* LEFT: Info & Direct Channels */}
          <motion.div className="lg:col-span-5 space-y-6" variants={cardSlideVariants}>

            {/* Intro card */}
            <motion.div
              className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-soft-sm"
              whileHover={!shouldReduceMotion ? { y: -2, transition: { duration: 0.2 } } : {}}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Have an e-commerce brand?</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Want to explore what's possible with Google Ads, lower your acquisition cost, or audit your existing campaigns? Reach out directly or fill in the strategy call request form.
              </p>
            </motion.div>

            {/* Contact Channel Cards */}
            <div className="space-y-3">
              {contactChannels.map((channel, idx) => {
                const Icon = channel.icon;
                return (
                  <motion.a
                    key={idx}
                    href={channel.href}
                    target={channel.external ? '_blank' : undefined}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    className={`group flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-soft-sm ${channel.hoverBorder} transition-all duration-300`}
                    whileHover={!shouldReduceMotion ? { x: 6, transition: { duration: 0.2 } } : {}}
                  >
                    <div className={`w-12 h-12 rounded-xl ${channel.iconBg} ${channel.iconColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{channel.label}</p>
                      <p className={`text-sm font-bold text-slate-900 ${channel.hoverText} transition-colors truncate`}>
                        {channel.value}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-all duration-300 group-hover:translate-x-1" />
                  </motion.a>
                );
              })}
            </div>

            {/* Response time badge */}
            <motion.div
              className="p-5 rounded-2xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 backdrop-blur-sm"
              whileHover={!shouldReduceMotion ? { y: -2, transition: { duration: 0.2 } } : {}}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-900">Response Time Commitment</p>
                  <p className="text-xs text-emerald-700/80 mt-1 leading-relaxed">
                    I personally respond to all e-commerce growth inquiries within 1 business day.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div
            className="lg:col-span-7"
            variants={formSlideVariants}
          >
            <div
              className="rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-soft-md bg-white/80 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Subtle gradient accent at top of form card */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{
                  background: 'linear-gradient(90deg, #10B981, #06B6D4, #6366F1)',
                }}
              />

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── Success State ── */
                  <motion.div
                    key="success"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="py-16 text-center space-y-5"
                  >
                    <motion.div
                      className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200/60"
                      animate={!shouldReduceMotion ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </motion.div>
                    <h4 className="text-2xl font-extrabold text-slate-900">Strategy Request Received!</h4>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Thank you{formData.name ? ', ' : ''}
                      {formData.name && <span className="font-bold text-slate-900">{formData.name}</span>}
                      . I have received your message and store link. I will review your request and get back to you shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* ── Form ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={fieldVariants} className="mb-7">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-extrabold text-slate-900">
                          Request Your Free Strategy Audit
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500">
                        Fill in the details below and I'll review your store for growth opportunities.
                      </p>
                    </motion.div>

                    {/* Row 1: Name + Email */}
                    <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                        <div className="relative group">
                          <User className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors duration-200 ${focusedField === 'name' ? 'text-emerald-500' : 'text-slate-400'}`} />
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={formData.name}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                        <div className="relative group">
                          <Mail className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors duration-200 ${focusedField === 'email' ? 'text-emerald-500' : 'text-slate-400'}`} />
                          <input
                            type="email"
                            required
                            placeholder="Your Email"
                            value={formData.email}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all duration-200"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Row 2: Company + Website */}
                    <motion.div variants={fieldVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Company Name</label>
                        <div className="relative group">
                          <Building2 className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors duration-200 ${focusedField === 'company' ? 'text-emerald-500' : 'text-slate-400'}`} />
                          <input
                            type="text"
                            placeholder="Your Company"
                            value={formData.company}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Website URL *</label>
                        <div className="relative group">
                          <Globe className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors duration-200 ${focusedField === 'website' ? 'text-emerald-500' : 'text-slate-400'}`} />
                          <input
                            type="url"
                            required
                            placeholder="Your Website"
                            value={formData.website}
                            onFocus={() => setFocusedField('website')}
                            onBlur={() => setFocusedField(null)}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all duration-200"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Ad Spend Select */}
                    <motion.div variants={fieldVariants} className="mb-4">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Monthly Google Ads Spend *</label>
                      <div className="relative">
                        <DollarSign className={`w-4 h-4 absolute left-3.5 top-3.5 transition-colors duration-200 ${focusedField === 'adSpend' ? 'text-emerald-500' : 'text-slate-400'}`} />
                        <select
                          value={formData.adSpend}
                          onFocus={() => setFocusedField('adSpend')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all duration-200 appearance-none cursor-pointer"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 14px center',
                          }}
                        >
                          <option value="Under $5k / mo">Under $5,000 / month</option>
                          <option value="$5k - $15k / mo">$5,000 - $15,000 / month</option>
                          <option value="$15k - $50k / mo">$15,000 - $50,000 / month</option>
                          <option value="$50k+ / mo">$50,000+ / month</option>
                        </select>
                      </div>
                    </motion.div>

                    {/* Message Textarea */}
                    <motion.div variants={fieldVariants} className="mb-6">
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Tell Me About Your Growth Goals</label>
                      <textarea
                        rows={4}
                        placeholder="Share your current ad spend, main product margin, or ROAS challenge..."
                        value={formData.message}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full p-4 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all duration-200 resize-none"
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={fieldVariants}>
                      <motion.button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 relative overflow-hidden button-shine"
                        whileHover={!shouldReduceMotion ? { scale: 1.01, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.25)' } : {}}
                        whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                      >
                        <span>Book My Strategy Call</span>
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </motion.div>

                    {/* Trust note */}
                    <motion.p variants={fieldVariants} className="text-center text-[11px] text-slate-400 mt-4">
                      🔒 Your information is kept confidential and never shared.
                    </motion.p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
