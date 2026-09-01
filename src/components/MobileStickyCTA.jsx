import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function MobileStickyCTA({ onBookCall }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let isNearContact = false;

    const contactSection = document.getElementById('contact');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isNearContact = entry.isIntersecting;
          const shouldShow = window.scrollY > 400 && !isNearContact;
          setIsVisible(shouldShow);
        });
      },
      { rootMargin: '200px 0px 0px 0px', threshold: 0 }
    );

    if (contactSection) {
      observer.observe(contactSection);
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400 && !isNearContact;
          setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-safe inset-x-3 sm:inset-x-4 z-30 animate-in slide-in-from-bottom duration-300 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-emerald-200/90 shadow-xl shadow-emerald-950/15">
        <button
          onClick={onBookCall}
          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-98 transition-all button-shine cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-200" />
          <span>Book a Free Strategy Call</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
