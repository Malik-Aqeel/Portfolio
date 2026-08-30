import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, TrendingUp, CheckCircle2, Zap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ onBookCall }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Approach', href: '#approach' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 30);

          const scrollPos = window.scrollY + 180;
          for (let i = navLinks.length - 1; i >= 0; i--) {
            const id = navLinks[i].href.substring(1);
            const el = document.getElementById(id);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection(id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
        isScrolled
          ? 'top-2.5 sm:top-3 px-3 sm:px-6'
          : 'top-0 px-0'
      }`}
    >
      {/* ── Dynamic Morphing Navbar Container ── */}
      <div
        className={`mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'max-w-[980px] rounded-full bg-white/92 backdrop-blur-2xl border border-slate-200/85 shadow-lg shadow-slate-900/5 py-1.5 px-3.5 sm:px-5'
            : 'w-full max-w-full rounded-none bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-xs py-3 px-4 sm:px-8 lg:px-12'
        }`}
      >
        <div className="flex items-center justify-between">

          {/* ── Brand Logo ── */}
          <a
            href="#home"
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            {/* Google Ads Iconic Icon Container */}
            <div
              className={`transition-all duration-300 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-1.5 shadow-sm shrink-0 ${
                isScrolled ? 'w-7.5 h-7.5' : 'w-9 h-9'
              }`}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="18" y="24" width="22" height="52" rx="11" transform="rotate(-35 29 50)" fill="#4285F4" />
                <rect x="52" y="32" width="22" height="42" rx="11" transform="rotate(35 63 53)" fill="#34A853" />
                <circle cx="34" cy="68" r="14" fill="#FBBC04" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-black text-slate-900 tracking-tight leading-none group-hover:text-emerald-700 transition-colors ${
                  isScrolled ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'
                }`}>
                  {personalInfo.name}
                </span>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
              </div>
              <span className={`font-bold text-emerald-700 tracking-wider uppercase block ${
                isScrolled ? 'text-[8px] mt-0.2' : 'text-[9px] mt-0.5'
              }`}>
                Google Ads Specialist
              </span>
            </div>
          </a>

          {/* ── Desktop Navigation Link Pills with Smooth Sliding Highlight ── */}
          <nav className={`hidden lg:flex items-center gap-0.5 rounded-full border border-slate-200/60 shadow-inner backdrop-blur-sm transition-all duration-300 ${
            isScrolled ? 'bg-slate-100/60 p-0.5' : 'bg-slate-100/80 p-1'
          }`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative font-bold transition-colors duration-200 rounded-full select-none ${
                    isScrolled ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs'
                  } ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {/* Sliding active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavHighlight"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* ── Desktop Action CTA Buttons ── */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Live Client Status Pill (only when unscrolled for ultra-clean slim look) */}
            {!isScrolled && (
              <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-emerald-50/70 px-2.5 py-1 rounded-full border border-emerald-200/60 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-emerald-800">Q3 Open for Scaling</span>
              </div>
            )}

            <motion.button
              onClick={onBookCall}
              whileHover={!shouldReduceMotion ? { scale: 1.03, boxShadow: '0 8px 20px -4px rgba(16, 185, 129, 0.35)' } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.97 } : {}}
              className={`button-shine bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-full transition-all shadow-sm flex items-center gap-1.5 cursor-pointer relative overflow-hidden group ${
                isScrolled ? 'px-3.5 py-1.5 text-[11px]' : 'px-4.5 py-2 text-xs'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
              <span>Get Free Audit</span>
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>

          {/* ── Mobile Hamburger Toggle ── */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ── Mobile Drawer Menu ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-3 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl shadow-2xl p-5 space-y-4 text-left"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Navigation Menu</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  ● Ready to Scale
                </span>
              </div>

              <nav className="grid grid-cols-2 gap-1.5">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold shadow-sm'
                          : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </a>
                  );
                })}
              </nav>

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookCall();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer button-shine"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Book Free Strategy Call</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
