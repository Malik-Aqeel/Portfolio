import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  const cleanPhone = personalInfo.whatsapp.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(
    "Hi Shehzad, I visited your portfolio and would like to discuss Google Ads growth for my e-commerce brand."
  );
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center justify-end">
      {/* Floating Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 mr-3 px-3.5 py-2 rounded-2xl bg-slate-900/95 text-white shadow-xl border border-slate-700/60 backdrop-blur-md pointer-events-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <div className="text-left">
              <p className="text-xs font-bold leading-none text-white">Chat on WhatsApp</p>
              <p className="text-[10px] text-emerald-400 font-medium mt-0.5">Quick response guaranteed</p>
            </div>
            {/* Tooltip arrow */}
            <div className="w-2 h-2 bg-slate-900 rotate-45 -mr-1.5 border-r border-t border-slate-700/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Shehzad on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-lg shadow-emerald-600/35 ring-4 ring-white flex items-center justify-center cursor-pointer transition-all duration-300"
      >
        {/* Pulsing Aura Ping */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-40 duration-1000" />

        {/* Ambient Glow */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] blur-md opacity-60 group-hover:opacity-90 transition-opacity" />

        {/* Official WhatsApp SVG Icon */}
        <svg
          className="relative z-10 w-7 h-7 fill-white drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>

        {/* Small Online Badge Dot */}
        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-xs" />
      </motion.a>
    </div>
  );
}
