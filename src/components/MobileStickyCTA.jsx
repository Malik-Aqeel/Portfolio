import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MobileStickyCTA({ onBookCall }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactSection = document.getElementById('contact');
      
      let isNearContact = false;
      if (contactSection) {
        const contactTop = contactSection.offsetTop - 400;
        if (scrollY >= contactTop) {
          isNearContact = true;
        }
      }

      // Show after scrolling past hero (e.g. > 400px) and hide if near contact section
      if (scrollY > 400 && !isNearContact) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 z-30 animate-in slide-in-from-bottom duration-300">
      <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-emerald-200 shadow-xl">
        <button
          onClick={onBookCall}
          className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>Book a Free Strategy Call</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
