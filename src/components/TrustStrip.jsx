import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

// Import company logos
import logoPetSupplies from '../assets/Logo Petsupplies.jpeg';
import logoAG from '../assets/ag.jpeg';
import logoAO from '../assets/ao.jpeg';
import logoAT from '../assets/at.jpeg';
import logoHI from '../assets/hi.jpeg';
import logoTH from '../assets/th.jpeg';
import logoSellMyClassic from '../assets/WhatsApp Image 2026-08-30 at 1.18.16 PM.jpeg';
import logoMumCare from '../assets/WhatsApp Image 2026-08-30 at 1.19.05 PM.jpeg';
import logoDubkart from '../assets/img.png';

export default function TrustStrip() {
  const stats = [
    { icon: <Users className="w-5 h-5 text-emerald-600" />, value: "50+", label: "E-commerce Brands" },
    { icon: <Globe className="w-5 h-5 text-emerald-600" />, value: "Multiple", label: "Global Markets" },
    { icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />, value: "Data-Driven", label: "Optimization" },
    { icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, value: "Performance", label: "Profit Focused" }
  ];

  const companyLogos = [
    { src: logoDubkart, alt: 'Dubkart' },
    { src: logoAO, alt: 'Arabian Oud' },
    { src: logoPetSupplies, alt: 'Pet Supplies' },
    { src: logoSellMyClassic, alt: 'Sell My Classic' },
    { src: logoAG, alt: 'AG Fashion' },
    { src: logoAT, alt: 'AutoTEC' },
    { src: logoMumCare, alt: 'MumCare' },
    { src: logoTH, alt: 'Thrive' },
    { src: logoHI, alt: 'Lillo Machinery' },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200/70 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Gradient Accent */}
        <div className="text-center mb-8">
          <h2 className="text-center font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight pb-1">
            Helping E-commerce Brands Grow With{' '}
            <span className="animated-growth-gradient">Performance Marketing</span>
          </h2>
        </div>

        {/* 4 Stats Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-gradient-to-b from-slate-50/90 to-slate-100/60 rounded-2xl border border-slate-200/80 flex items-center gap-3.5 hover:border-emerald-300 hover:shadow-soft-md transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-100/80 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-emerald-200/80 transition-all shadow-xs">
                {item.icon}
              </div>
              <div className="text-left">
                <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  {item.value}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted By Badge Header */}
        <div className="pt-2 pb-6 border-t border-slate-100/90 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <p className="text-center text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Featured Partner Brands & Stores Scaled
          </p>
        </div>

      </div>

      {/* Infinite Horizontal Scrolling Logo Marquee — full width, 100% Original Colors */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Soft edge blur masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 100%)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 z-10 pointer-events-none" style={{ background: 'linear-gradient(270deg, #FFFFFF 0%, transparent 100%)' }} />

        <div className="logo-marquee-track flex items-center gap-6 sm:gap-8 py-3">
          {/* First set of logos in full proper colors with interactive badge cards */}
          {companyLogos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="shrink-0 h-16 sm:h-20 w-36 sm:w-44 px-4 py-2.5 bg-white rounded-2xl border border-slate-200/85 shadow-sm hover:shadow-md hover:border-emerald-400 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer group"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain filter-none transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}

          {/* Duplicate set for seamless infinite loop */}
          {companyLogos.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="shrink-0 h-16 sm:h-20 w-36 sm:w-44 px-4 py-2.5 bg-white rounded-2xl border border-slate-200/85 shadow-sm hover:shadow-md hover:border-emerald-400 hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer group"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain filter-none transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
