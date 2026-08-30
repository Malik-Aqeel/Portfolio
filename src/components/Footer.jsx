import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, Linkedin, Mail, MessageCircle, Heart, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const socials = [
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personalInfo.linkedin,
      hoverBg: 'hover:bg-sky-50 hover:border-sky-200',
      hoverText: 'hover:text-sky-600',
      external: true,
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${personalInfo.email}`,
      hoverBg: 'hover:bg-emerald-50 hover:border-emerald-200',
      hoverText: 'hover:text-emerald-600',
      external: false,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: `https://wa.me/${personalInfo.whatsapp.replace(/[^0-9]/g, '')}`,
      hoverBg: 'hover:bg-emerald-50 hover:border-emerald-200',
      hoverText: 'hover:text-emerald-600',
      external: true,
    },
  ];

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F0F7F4 0%, #E8F3EE 50%, #F0F7F4 100%)',
      }}
    >
      {/* Subtle top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), rgba(14, 165, 233, 0.2), transparent)',
        }}
      />

      {/* Decorative ambient mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-10 -right-32 w-[350px] h-[350px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)' }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-14 lg:py-16">

        {/* Main Footer Content */}
        <motion.div
          className="flex flex-col items-center text-center space-y-8"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {/* Logo & Name */}
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={!shouldReduceMotion ? { y: -2 } : {}}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg tracking-tight">
                {personalInfo.name}
              </h3>
              <p className="text-xs font-medium text-slate-500 mt-0.5">
                {personalInfo.title}
              </p>
            </div>
          </motion.div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  className={`group p-3 bg-white/70 backdrop-blur-sm text-slate-500 rounded-xl border border-slate-200/60 ${social.hoverBg} ${social.hoverText} transition-all duration-300 shadow-soft-sm`}
                  aria-label={social.label}
                  whileHover={!shouldReduceMotion ? { y: -3, scale: 1.05 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
                >
                  <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                </motion.a>
              );
            })}
          </div>

          {/* Divider */}
          <div
            className="w-32 h-px rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.35), transparent)',
            }}
          />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500">
            <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300" />
            <p className="flex items-center gap-1.5">
              Made with <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> for growth
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
