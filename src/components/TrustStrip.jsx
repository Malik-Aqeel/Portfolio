import React from 'react';
import { Users, Globe, ShieldCheck, TrendingUp } from 'lucide-react';

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
    { icon: <Users className="w-5 h-5 text-[#00B67A]" />, value: "50+", label: "E-commerce Brands" },
    { icon: <Globe className="w-5 h-5 text-[#00B67A]" />, value: "Multiple", label: "Markets" },
    { icon: <ShieldCheck className="w-5 h-5 text-[#00B67A]" />, value: "Data-Driven", label: "Optimization" },
    { icon: <TrendingUp className="w-5 h-5 text-[#00B67A]" />, value: "Performance", label: "Focused" }
  ];

  const companyLogos = [
    { src: logoPetSupplies, alt: 'Pet Supplies' },
    { src: logoAG, alt: 'AG' },
    { src: logoAO, alt: 'Arabian Oud' },
    { src: logoAT, alt: 'AutoTEC' },
    { src: logoHI, alt: 'Lillo Machinery' },
    { src: logoTH, alt: 'Thrive' },
    { src: logoSellMyClassic, alt: 'Sell My Classic' },
    { src: logoMumCare, alt: 'MumCare' },
    { src: logoDubkart, alt: 'Dubkart' },
  ];

  return (
    <section className="py-10 bg-white border-b border-slate-200/60 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <h2 className="text-center font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight mb-8">
          Helping E-commerce Brands Grow With Performance Marketing
        </h2>

        {/* 4 Stats Cards Row with Circular Green Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-slate-50/70 rounded-2xl border border-slate-200/70 flex items-center gap-3.5 hover:border-emerald-300 transition-all group"
            >
              <div className="w-11 h-11 rounded-full bg-emerald-100/70 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <div className="text-left">
                <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                  {item.value}
                </p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trusted By Label */}
        <div className="pt-6 border-t border-slate-100">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            Trusted By Leading Brands
          </p>
        </div>

      </div>

      {/* Infinite Horizontal Scrolling Logo Marquee — full width */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, #FFFFFF 0%, transparent 100%)' }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(270deg, #FFFFFF 0%, transparent 100%)' }} />

        <div className="logo-marquee-track flex items-center gap-12 sm:gap-16 py-4">
          {/* First set */}
          {companyLogos.map((logo, i) => (
            <div
              key={`a-${i}`}
              className="shrink-0 flex items-center justify-center h-14 sm:h-16 w-28 sm:w-36 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {companyLogos.map((logo, i) => (
            <div
              key={`b-${i}`}
              className="shrink-0 flex items-center justify-center h-14 sm:h-16 w-28 sm:w-36 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
