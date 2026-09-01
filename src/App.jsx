import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import About from './components/About';
import Services from './components/Services';
import CaseStudies from './components/CaseStudies';
import Approach from './components/Approach';
import Testimonials from './components/Testimonials';
import ToolsPlatforms from './components/ToolsPlatforms';
import Process from './components/Process';
import FAQModal from './components/FAQModal';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import MobileStickyCTA from './components/MobileStickyCTA';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  const handleOpenFaq = () => {
    setIsFaqOpen(true);
  };

  const handleCloseFaq = () => {
    setIsFaqOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-clip font-sans">
      {/* Navbar */}
      <Navbar onBookCall={handleOpenBooking} onOpenFaq={handleOpenFaq} />

      {/* Main Sections */}
      <main>
        <Hero onBookCall={handleOpenBooking} />
        <TrustStrip />
        <About onBookCall={handleOpenBooking} />
        <CaseStudies onBookCall={handleOpenBooking} />
        <Process onBookCall={handleOpenBooking} />
        <Services onBookCall={handleOpenBooking} />
        <Approach />
        <Testimonials />
        <ToolsPlatforms />
        <Contact onBookCall={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />

      {/* Interactive FAQ Popup Modal */}
      <FAQModal isOpen={isFaqOpen} onClose={handleCloseFaq} onBookCall={handleOpenBooking} />

      {/* Mobile Fixed Sticky Conversion CTA */}
      <MobileStickyCTA onBookCall={handleOpenBooking} />

      {/* Persistent Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}
