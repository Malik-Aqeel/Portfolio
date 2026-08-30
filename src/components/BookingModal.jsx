import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ArrowRight, Sparkles, User, Mail, Globe, DollarSign } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedAdSpend, setSelectedAdSpend] = useState('$15k - $50k / mo');
  const [selectedGoal, setSelectedGoal] = useState('Scale Existing Campaigns');
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('02:00 PM EST');
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
    'Under $5k / mo',
    '$5k - $15k / mo',
    '$15k - $50k / mo',
    '$50k+ / mo'
  ];

  const goalOptions = [
    'Scale Existing Campaigns',
    'Lower CPA & Increase ROAS',
    'New Google Ads Setup / Launch',
    'Account Audit & Fixes'
  ];

  const dateOptions = ['Today', 'Tomorrow', 'In 2 Days', 'Next Monday'];
  const timeOptions = ['10:00 AM EST', '02:00 PM EST', '04:30 PM EST', '07:00 PM EST'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-emerald-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              GA
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Book a Free Strategy Call</h3>
              <p className="text-xs text-slate-500">1-on-1 Growth Consultation with {personalInfo.name}</p>
            </div>
          </div>
          <button
            onClick={resetModal}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Strategy Call Confirmed!</h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you, <span className="font-semibold text-slate-900">{formData.name || 'there'}</span>. A calendar invitation and video link have been prepared for <span className="font-semibold text-emerald-700">{selectedDate} at {selectedTime}</span>.
              </p>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <p className="font-semibold text-slate-800">Call Details Summary:</p>
                <div className="flex justify-between text-slate-600">
                  <span>Monthly Spend:</span>
                  <span className="font-medium text-slate-900">{selectedAdSpend}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Primary Goal:</span>
                  <span className="font-medium text-slate-900">{selectedGoal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Website:</span>
                  <span className="font-medium text-slate-900">{formData.website || 'Not specified'}</span>
                </div>
              </div>
              <button
                onClick={resetModal}
                className="mt-4 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md"
              >
                Back to Portfolio
              </button>
            </div>
          ) : (
            <div>
              {/* Stepper indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
                    1
                  </span>
                  <span className="text-xs font-medium text-slate-700">Growth Objectives</span>
                </div>
                <div className="h-0.5 w-12 bg-slate-200"></div>
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    2
                  </span>
                  <span className="text-xs font-medium text-slate-700">Schedule & Contact</span>
                </div>
              </div>

              {step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      1. What is your current monthly ad spend on Google Ads?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {adSpendOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSelectedAdSpend(option)}
                          className={`p-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                            selectedAdSpend === option
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      2. What is your primary growth goal?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {goalOptions.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => setSelectedGoal(goal)}
                          className={`p-3 text-xs font-semibold rounded-xl border text-left transition-all flex items-center justify-between ${
                            selectedGoal === goal
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <span>{goal}</span>
                          {selectedGoal === goal && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                    >
                      Continue to Schedule <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="john@brand.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">E-commerce Website URL *</label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="url"
                        required
                        placeholder="https://yourstore.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Select Date</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {dateOptions.map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => setSelectedDate(d)}
                            className={`py-2 px-1 text-center text-xs font-medium rounded-lg border ${
                              selectedDate === d ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Select Time Slot</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {timeOptions.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setSelectedTime(t)}
                            className={`py-2 px-1 text-center text-xs font-medium rounded-lg border ${
                              selectedTime === t ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold' : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      Confirm Strategy Call <Sparkles className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
