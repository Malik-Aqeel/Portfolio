import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, DollarSign, Target, BarChart2, ShieldCheck, Layers, Filter } from 'lucide-react';
import { personalInfo, sampleDashboardData } from '../data/portfolioData';

export default function Hero({ onBookCall }) {
  const [activeTimeframe, setActiveTimeframe] = useState('7D');
  const currentData = sampleDashboardData.timeframes[activeTimeframe];

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-white light-grid-pattern">
      {/* Background Radial Lights */}
      <div className="absolute top-10 left-1/4 w-96 h-96 radial-glow-green pointer-events-none -z-10 opacity-70"></div>
      <div className="absolute top-40 right-10 w-96 h-96 radial-glow-blue pointer-events-none -z-10 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Content Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-800 tracking-wide uppercase">
                Google Ads • E-commerce Growth • Performance Marketing
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-hero font-extrabold text-slate-900 tracking-tight">
              Scale Your E-commerce Brand With{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent underline decoration-emerald-200 decoration-wavy underline-offset-8">
                Google Ads
              </span>{' '}
              That Actually Perform.
            </h1>

            {/* Supporting Text */}
            <p className="text-subheading text-slate-600 font-normal leading-relaxed max-w-xl">
              I help e-commerce brands turn Google Ads into a predictable growth channel through data-driven strategy, profitable campaigns, and continuous optimization.
            </p>

            {/* Trust Line */}
            <div className="flex items-center gap-2 pt-1 text-sm font-semibold text-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{personalInfo.credibility}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onBookCall}
                className="px-7 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-emerald-glow flex items-center justify-center gap-2.5 active:scale-98"
              >
                <span>Book a Free Strategy Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#case-studies"
                className="px-7 py-4 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 hover:border-slate-300"
              >
                <span>View Case Studies</span>
              </a>
            </div>

            {/* Under-buttons Feature List */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Strategy</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Execution</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Optimization</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Scaling</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Google Ads Performance Dashboard Visual */}
          <div className="lg:col-span-6 w-full">
            <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-soft-lg p-4 sm:p-6 space-y-4">
              
              {/* Dashboard Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                    Google Ads Performance Dashboard
                  </h3>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded">
                    SAMPLE DATA
                  </span>
                </div>

                {/* Timeframe Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  {['7D', '30D', '90D'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setActiveTimeframe(tf)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                        activeTimeframe === tf
                          ? 'bg-white text-emerald-700 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <p className="text-[11px] font-semibold text-slate-500">ROAS</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-emerald-700 mt-0.5">{currentData.roas}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    {currentData.roasGrowth}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500">Revenue</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">{currentData.revenue}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600">
                    {currentData.revenueGrowth}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500">Ad Spend</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">{currentData.adSpend}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-slate-500">
                    {currentData.clicks} clicks
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[11px] font-semibold text-slate-500">CPA</p>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">{currentData.cpa}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600">
                    {currentData.cpaChange}
                  </span>
                </div>
              </div>

              {/* Interactive Performance Graph */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <BarChart2 className="w-3.5 h-3.5 text-emerald-600" /> Revenue & ROAS Scaling Trend
                  </span>
                  <span>Conversions: <strong className="text-slate-800">{currentData.conversions}</strong> ({currentData.convRate} CVR)</span>
                </div>

                {/* SVG Revenue Line Chart */}
                <div className="h-40 w-full bg-slate-50/50 rounded-xl p-3 border border-slate-100 relative flex items-end justify-between gap-2">
                  <svg className="absolute inset-0 w-full h-full p-3 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 32 L 16 26 L 33 18 L 50 21 L 66 14 L 83 10 L 100 16 L 100 40 L 0 40 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M 0 32 L 16 26 L 33 18 L 50 21 L 66 14 L 83 10 L 100 16"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Chart Data Bars Overlay */}
                  {currentData.chartData.map((item, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center flex-1 group">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[10px] py-1 px-2 rounded font-semibold whitespace-nowrap pointer-events-none shadow-md">
                        ${(item.revenue / 1000).toFixed(1)}k ({item.roas}x)
                      </div>
                      <div
                        className="w-full max-w-[20px] bg-emerald-600/20 group-hover:bg-emerald-500 rounded-t transition-all"
                        style={{ height: `${(item.revenue / 25000) * 100}%` }}
                      ></div>
                      <span className="text-[10px] text-slate-400 font-medium mt-1">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Breakdown Table */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Top Performing Campaigns</span>
                  <span className="text-[11px] text-emerald-700 font-bold">Optimized Structure</span>
                </div>
                
                <div className="space-y-1.5">
                  {currentData.campaigns.slice(0, 3).map((camp, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100/80 rounded-lg text-xs transition-colors border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <div>
                          <p className="font-bold text-slate-800">{camp.name}</p>
                          <p className="text-[10px] text-slate-500">{camp.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-extrabold text-emerald-700">{camp.roas} ROAS</span>
                        <p className="text-[10px] text-slate-500">{camp.revenue} rev</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              <p className="text-[10px] text-slate-400 text-center pt-1 border-t border-slate-100">
                Sample performance visual reflecting verified optimization structures.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
