import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Calendar, Clock, CheckCircle2, ArrowRight, Sparkles,
  User, Mail, Globe, DollarSign, Video, ShieldCheck, Target,
  TrendingUp, Zap, MessageCircle, PhoneCall, Check, Award
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedAdSpend, setSelectedAdSpend] = useState('$15K - $50K / mo');
  const [selectedGoal, setSelectedGoal] = useState('Scale Existing Campaigns');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('03:00 PM PKT');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const resetModal = () => {
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  const adSpendOptions = [
    { label: 'Under $5K / mo', tier: 'Starter Brand' },
    { label: '$5K - $15K / mo', tier: 'Growth Stage' },
    { label: '$15K - $50K / mo', tier: 'Scale Stage', popular: true },
    { label: '$50K+ / mo', tier: 'Enterprise' }
  ];

  const goalOptions = [
    {
      id: 'scale',
      title: 'Scale Existing Campaigns',
      desc: 'Increase profitable ad spend while maintaining high ROAS',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    {
      id: 'cpa',
      title: 'Lower CPA & Eliminate Waste',
      desc: 'Prune bleeding search terms, cut bad SKUs & fix CPA',
      icon: Target,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-200'
    },
    {
      id: 'new_setup',
      title: 'New Campaign Architecture',
      desc: 'Fresh Performance Max, Search & Shopping setup',
      icon: Zap,
      color: 'text-sky-600',
      bg: 'bg-sky-50',
      border: 'border-sky-200'
    },
    {
      id: 'audit',
      title: 'Full Account & Feed Audit',
      desc: 'Fix conversion tracking, GMC feed health & profit leaks',
      icon: ShieldCheck,
      color: 'text-violet-600',
      bg: 'bg-violet-50',
      border: 'border-violet-200'
    }
  ];

  const dateOptions = [
    { label: 'Today', desc: 'Urgent Strategy' },
    { label: 'Tomorrow', desc: 'Recommended' },
    { label: 'In 2 Days', desc: 'Standard Slot' },
    { label: 'Next Monday', desc: 'Next Week' }
  ];

  // Pakistan Standard Time (PKT • UTC+5) Consultation Slots
  const timeOptions = [
    { time: '11:00 AM PKT', period: 'Morning Slot' },
    { time: '03:00 PM PKT', period: 'Afternoon Slot' },
    { time: '06:30 PM PKT', period: 'Evening Slot' },
    { time: '09:30 PM PKT', period: 'Night Slot' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-emerald-950/20 border border-slate-200/90 overflow-hidden my-auto max-h-[92dvh] flex flex-col z-10">
        
        {/* Top vibrant accent stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 shrink-0" />

        {/* ═══ Header ═══ */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50/60 via-teal-50/30 to-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/25 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight leading-none">
                  Book a Free Strategy Call
                </h3>
                <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Available
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium flex items-center gap-1.5">
                <span>1-on-1 Growth Consultation with <strong className="text-slate-800">{personalInfo.name}</strong></span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="hidden sm:inline text-emerald-700 font-semibold">Google Ads Specialist</span>
              </p>
            </div>
          </div>

          <button
            onClick={resetModal}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ═══ Modal Body ═══ */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {isSubmitted ? (
            /* ─── Success Confirmation Screen ─── */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="py-4 sm:py-6 text-center space-y-5"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/15 border border-emerald-200/80">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Booking Confirmed
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                  Strategy Call Scheduled!
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto mt-1 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{formData.name || 'Founder'}</strong>. Your personalized Google Ads scaling strategy session is locked in.
                </p>
              </div>

              {/* VIP Strategy Invite Card */}
              <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 p-5 max-w-md mx-auto text-left shadow-soft-sm space-y-3.5">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-700">Date & Time</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-xs">
                    {selectedDate} • {selectedTime}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-2 font-medium">
                    <Clock className="w-4 h-4 text-teal-600" /> Timezone:
                  </span>
                  <span className="font-bold text-slate-900">
                    🇵🇰 Pakistan Standard Time (PKT)
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-2 font-medium">
                    <Video className="w-4 h-4 text-sky-600" /> Meeting Format:
                  </span>
                  <span className="font-bold text-slate-900">
                    1-on-1 Google Meet / Zoom
                  </span>
                </div>

                <div className="flex items-between justify-between text-xs text-slate-600 border-t border-emerald-100 pt-3">
                  <span className="font-medium text-slate-500">Primary Objective:</span>
                  <span className="font-bold text-emerald-900 text-right">{selectedGoal}</span>
                </div>

                {formData.website && (
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="font-medium text-slate-500">Store Website:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[180px]">{formData.website}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20Shehzad,%20I%20just%20booked%20a%20strategy%20call%20for%20${encodeURIComponent(selectedDate)}%20at%20${encodeURIComponent(selectedTime)}.%20Looking%20forward%20to%20connecting!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Confirm on WhatsApp</span>
                </a>

                <button
                  onClick={resetModal}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-all cursor-pointer"
                >
                  Close & Return
                </button>
              </div>
            </motion.div>
          ) : (
            /* ─── Interactive Multi-Step Flow ─── */
            <div>
              {/* Stepper indicator with pill tabs */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    step === 1
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {step > 1 ? <Check className="w-4 h-4" /> : '1'}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">Step 1</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">Goals & Spend</span>
                  </div>
                </div>

                <div className="h-0.5 flex-1 max-w-[60px] sm:max-w-[100px] mx-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className={`h-full bg-emerald-500 transition-all duration-300 ${step === 2 ? 'w-full' : 'w-0'}`} />
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    step === 2
                      ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    2
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">Step 2</span>
                    <span className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">Time & Contact</span>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  /* ─── STEP 1: Objectives & Monthly Spend ─── */
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    {/* Value Badge */}
                    <div className="p-3 bg-emerald-50/80 border border-emerald-200/70 rounded-2xl flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-emerald-900 font-semibold leading-tight">
                        Complimentary 30-min deep-dive: We will analyze your ROAS bottlenecks and outline a profitable growth roadmap.
                      </p>
                    </div>

                    {/* Spend options */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        1. Current Monthly Google Ads Spend
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                        {adSpendOptions.map((option) => {
                          const isSelected = selectedAdSpend === option.label;
                          return (
                            <button
                              key={option.label}
                              type="button"
                              onClick={() => setSelectedAdSpend(option.label)}
                              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                                isSelected
                                  ? 'border-emerald-500 bg-gradient-to-b from-emerald-50 to-white text-emerald-950 ring-2 ring-emerald-500/25 shadow-md'
                                  : 'border-slate-200/80 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                              }`}
                            >
                              {option.popular && (
                                <span className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded-md text-[8.5px] font-black uppercase tracking-wide bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs">
                                  Scale
                                </span>
                              )}
                              <span className="text-xs sm:text-sm font-black block">{option.label}</span>
                              <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{option.tier}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Primary Growth Goal */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        2. What is your primary objective?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {goalOptions.map((goal) => {
                          const Icon = goal.icon;
                          const isSelected = selectedGoal === goal.title;
                          return (
                            <button
                              key={goal.id}
                              type="button"
                              onClick={() => setSelectedGoal(goal.title)}
                              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 relative ${
                                isSelected
                                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 ring-2 ring-emerald-500/25 shadow-md'
                                  : 'border-slate-200/80 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                              }`}
                            >
                              <div className={`w-9 h-9 rounded-xl ${goal.bg} ${goal.color} border ${goal.border} flex items-center justify-center shrink-0 mt-0.5`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0 pr-4">
                                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug">
                                  {goal.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                                  {goal.desc}
                                </p>
                              </div>
                              <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 bg-white'
                              }`}>
                                {isSelected && <Check className="w-3 h-3" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 1 Footer CTA */}
                    <div className="pt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer button-shine"
                      >
                        <span>Choose Time & Schedule</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ─── STEP 2: Pakistani Time Slot & Contact Details ─── */
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    {/* Pakistan Time Zone Banner */}
                    <div className="p-3 bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 text-white rounded-2xl shadow-md flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🇵🇰</span>
                        <div>
                          <p className="text-xs font-black tracking-wide leading-tight flex items-center gap-1.5">
                            <span>Pakistan Standard Time (PKT • UTC+5)</span>
                          </p>
                          <p className="text-[10px] text-emerald-200 mt-0.5 leading-tight">
                            Live 1-on-1 Consultation via Google Meet / Zoom
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-emerald-100 border border-white/20">
                        Direct Expert Call
                      </span>
                    </div>

                    {/* Schedule Date & Time Selectors */}
                    <div className="space-y-3 pt-1">
                      {/* Date Select */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                          <span>Select Preferred Day</span>
                          <span className="text-[10px] text-slate-400 font-normal">Fast 24-48 hr slots</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {dateOptions.map((d) => {
                            const isSelected = selectedDate === d.label;
                            return (
                              <button
                                key={d.label}
                                type="button"
                                onClick={() => setSelectedDate(d.label)}
                                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs'
                                    : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-white'
                                }`}
                              >
                                <span className="text-xs font-extrabold block">{d.label}</span>
                                <span className="text-[9.5px] text-slate-400 block mt-0.5">{d.desc}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Select with Pakistani Time Labels */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                          <span>Select Time Slot (Pakistani Time)</span>
                          <span className="text-[10px] text-emerald-600 font-bold">PKT • UTC+5</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {timeOptions.map((t) => {
                            const isSelected = selectedTime === t.time;
                            return (
                              <button
                                key={t.time}
                                type="button"
                                onClick={() => setSelectedTime(t.time)}
                                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-emerald-600 border-emerald-600 text-white font-extrabold shadow-md shadow-emerald-600/20 ring-2 ring-emerald-500/30'
                                    : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-white'
                                }`}
                              >
                                <span className="text-xs font-extrabold block">{t.time}</span>
                                <span className={`text-[9.5px] block mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                                  {t.period}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Contact Inputs (with 16px font-size to prevent iOS Safari auto-zoom) */}
                    <div className="pt-2 border-t border-slate-100 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                            <input
                              type="text"
                              required
                              placeholder="Your Name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                            <input
                              type="email"
                              required
                              placeholder="name@brand.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Store / Website URL *</label>
                        <div className="relative">
                          <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="url"
                            required
                            placeholder="https://yourbrand.com"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 text-base sm:text-sm bg-slate-50/80 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 2 Bottom Controls */}
                    <div className="flex items-center justify-between pt-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer px-3 py-2 rounded-lg hover:bg-slate-100"
                      >
                        ← Back to Goals
                      </button>

                      <button
                        type="submit"
                        className="px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all flex items-center gap-2 cursor-pointer button-shine"
                      >
                        <span>Confirm Strategy Call</span>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
