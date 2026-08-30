import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ onBookCall }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-2 sm:top-3 inset-x-0 z-50 px-3 sm:px-6 transition-all duration-300 pointer-events-none">
      
      {/* Floating Glassmorphic Container */}
      <div
        className={`max-w-[1320px] mx-auto transition-all duration-300 pointer-events-auto rounded-full ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-lg shadow-slate-900/5 py-2 px-3 sm:px-5'
            : 'bg-white/90 backdrop-blur-xl border border-slate-200/70 shadow-md py-2.5 px-3 sm:px-5'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Brand Logo with Google Ads Icon */}
          <a href="#home" className="flex items-center gap-2.5 group text-left">
            <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center p-1.5 shadow-md group-hover:scale-105 transition-transform">
              {/* Google Ads 4-Color SVG Icon */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M4.5 16.5L12 3.5L19.5 16.5H4.5Z" fill="#F4B400" />
                <path d="M12 3.5L19.5 16.5L15 20.5L7.5 7.5" fill="#4285F4" />
                <circle cx="16.5" cy="17.5" r="3.5" fill="#0F9D58" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-none">
                  {personalInfo.name}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-[9px] font-extrabold text-emerald-700 tracking-wider uppercase block mt-0.5">
                Google Ads Growth Partner
              </span>
            </div>
          </a>

          {/* Desktop Floating Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold shadow-sm shadow-emerald-500/20 scale-[1.02]'
                      : 'text-slate-700 font-bold hover:text-slate-900 hover:bg-white/80'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Attention-Grabbing Glowing CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Live Client Status Pill */}
            <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-extrabold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Accepting Q3 Clients</span>
            </div>

            <button
              onClick={onBookCall}
              className="button-shine px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-extrabold rounded-full transition-all shadow-md hover:shadow-emerald-glow flex items-center gap-2 active:scale-95 group ring-4 ring-emerald-500/15"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Book Free Audit</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-slate-900 bg-slate-100 rounded-full transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-3xl shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-left">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Navigation Menu</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                ● Live Portfolio
              </span>
            </div>

            <nav className="grid grid-cols-2 gap-1.5 text-left">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                        : 'text-slate-700 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
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
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-full shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Book Free Audit Call</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}

