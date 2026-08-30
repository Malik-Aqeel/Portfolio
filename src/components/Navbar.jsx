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
          ? 'top-3 sm:top-4 px-3 sm:px-6'
          : 'top-0 px-0'
      }`}
    >
      {/* ── Dynamic Morphing Navbar Container ── */}
      <div
        className={`mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'max-w-[1140px] rounded-full bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-xl shadow-slate-900/5 py-2 px-4 sm:px-6'
            : 'w-full max-w-full rounded-none bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-xs py-3.5 px-4 sm:px-8 lg:px-12'
        }`}
      >
        <div className="flex items-center justify-between">

          {/* ── Brand Logo ── */}
          <a
            href="#home"
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            {/* Google Ads Iconic Icon Container */}
            <motion.div
              whileHover={!shouldReduceMotion ? { scale: 1.08, rotate: 3 } : {}}
              transition={{ duration: 0.2 }}
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center p-2 shadow-md shadow-slate-900/10 shrink-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="18" y="24" width="22" height="52" rx="11" transform="rotate(-35 29 50)" fill="#4285F4" />
                <rect x="52" y="32" width="22" height="42" rx="11" transform="rotate(35 63 53)" fill="#34A853" />
                <circle cx="34" cy="68" r="14" fill="#FBBC04" />
              </svg>
            </motion.div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-900 text-sm sm:text-base tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                  {personalInfo.name}
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <span className="text-[9.5px] font-extrabold text-emerald-700 tracking-wider uppercase block mt-0.5">
                Google Ads Specialist
              </span>
            </div>
          </a>

          {/* ── Desktop Navigation Link Pills with Smooth Sliding Highlight ── */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/60 shadow-inner backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-bold transition-colors duration-200 rounded-full select-none ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {/* Sliding active pill background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavHighlight"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full shadow-md shadow-emerald-500/25"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* ── Desktop Action CTA Buttons ── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Client Status Pill */}
            <div className="hidden xl:flex items-center gap-1.5 text-[10.5px] font-bold text-slate-600 bg-emerald-50/70 px-3 py-1.5 rounded-full border border-emerald-200/60 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-emerald-800">Q3 Open for Scaling</span>
            </div>

            <motion.button
              onClick={onBookCall}
              whileHover={!shouldReduceMotion ? { scale: 1.03, boxShadow: '0 10px 25px -4px rgba(16, 185, 129, 0.35)' } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.97 } : {}}
              className="button-shine px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-extrabold rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer relative overflow-hidden group"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Get Free Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
