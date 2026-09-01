import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import googleAdsImg from '../assets/google_ads_img.jpeg';

export default function Navbar({ onBookCall, onOpenFaq }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const shouldReduceMotion = useReducedMotion();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Process', href: '#process' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Asynchronous IntersectionObserver for active section tracking without layout thrashing
    const sectionIds = navLinks.map((l) => l.href.substring(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#faq') {
      if (onOpenFaq) onOpenFaq();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none ${
        isScrolled
          ? 'top-3 sm:top-4 px-3 sm:px-6'
          : 'top-0 px-0'
      }`}
    >
      {/* ── Dynamic Navbar Container ── */}
      <div
        className={`mx-auto pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
          isScrolled
            ? 'w-[96%] sm:w-[94%] max-w-[1240px] rounded-full bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg shadow-emerald-950/5 py-2 sm:py-2.5 px-3.5 sm:px-8'
            : 'w-full max-w-full rounded-none bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-none py-2.5 sm:py-3.5 px-4 sm:px-10 lg:px-14'
        }`}
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">

          {/* ── Left: Clean Brand Logo ── */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 sm:gap-2.5 group text-left cursor-pointer shrink-0 whitespace-nowrap"
          >
            {/* Google Ads Icon */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white shadow-xs border border-slate-200/70 flex items-center justify-center p-1 sm:p-1.5 shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src={googleAdsImg}
                alt="Google Ads"
                className="w-full h-full object-contain"
                decoding="async"
              />
            </div>

            <div className="whitespace-nowrap">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-xs sm:text-base tracking-tight leading-none group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                  {personalInfo.name}
                </span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 tracking-wide block mt-0.5 whitespace-nowrap">
                Google Ads Expert
              </span>
            </div>
          </a>

          {/* ── Center: Clean, Airy Desktop Navigation Links (Never Wrap) ── */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5.5 shrink-0 whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 text-xs xl:text-[13px] font-semibold transition-colors duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-700 font-bold'
                      : 'text-slate-600 hover:text-emerald-600'
                  }`}
                >
                  <span className="whitespace-nowrap">{link.name}</span>
                  {/* Subtle underline indicator on active link */}
                  {isActive && (
                    <motion.span
                      layoutId="navActiveLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Right: Sleek Action CTA Button (Visible on tablet & desktop) ── */}
          <div className="hidden sm:flex items-center gap-3 shrink-0 whitespace-nowrap">
            <div className="relative group">
              {/* Ambient Glow Aura on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-sm opacity-0 group-hover:opacity-75 transition-all duration-300 pointer-events-none" />

              <motion.button
                onClick={onBookCall}
                whileHover={!shouldReduceMotion ? { 
                  y: -3, 
                  scale: 1.05, 
                  boxShadow: '0 12px 26px -4px rgba(16, 185, 129, 0.45), 0 0 16px rgba(20, 184, 166, 0.35)' 
                } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.96, y: 0 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="relative px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-[11px] sm:text-xs font-bold shadow-md shadow-emerald-500/25 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer button-shine overflow-hidden shrink-0 whitespace-nowrap group"
              >
                {/* Dynamic light sheen sweep on hover */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

                <span className="relative z-10 whitespace-nowrap transition-transform duration-200 group-hover:-translate-x-0.5">
                  Get Free Audit
                </span>
                <ArrowRight className="relative z-10 w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:scale-110" />
              </motion.button>
            </div>
          </div>

          {/* ── Mobile Menu Hamburger ── */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-emerald-700 bg-white/60 hover:bg-white/90 rounded-full transition-colors cursor-pointer border border-slate-200/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* ── Mobile Dropdown Menu (Transparent Glassmorphic) ── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-3 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-xl p-5 space-y-4 text-left"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100/80">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Navigation Menu</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                  ● Ready to Scale
                </span>
              </div>

              <nav className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-emerald-600 text-white font-bold shadow-xs'
                          : 'text-slate-700 bg-white/70 hover:bg-white border border-slate-100'
                      }`}
                    >
                      <span>{link.name}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </a>
                  );
                })}
              </nav>

              <div className="pt-2 border-t border-slate-100/80">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookCall();
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer button-shine"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Book Free Strategy Call</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}
