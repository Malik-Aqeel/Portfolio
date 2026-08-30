import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import About from './components/About';
import Services from './components/Services';
import Metrics from './components/Metrics';
import CaseStudies from './components/CaseStudies';
import Approach from './components/Approach';
import WhyChooseMe from './components/WhyChooseMe';
import Testimonials from './components/Testimonials';
import ToolsPlatforms from './components/ToolsPlatforms';
import Process from './components/Process';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import MobileStickyCTA from './components/MobileStickyCTA';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-clip font-sans">
      {/* Navbar */}
      <Navbar onBookCall={handleOpenBooking} />

      {/* Main Sections */}
      <main>
        <Hero onBookCall={handleOpenBooking} />
        <TrustStrip />
        <About onBookCall={handleOpenBooking} />
        <Services onBookCall={handleOpenBooking} />
        <Metrics />
        <CaseStudies onBookCall={handleOpenBooking} />
        <Approach />
        <WhyChooseMe />
        <Testimonials />
        <ToolsPlatforms />
        <Process onBookCall={handleOpenBooking} />
        <FAQ />
        <FinalCTA onBookCall={handleOpenBooking} />
        <Contact onBookCall={handleOpenBooking} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />

      {/* Mobile Fixed Sticky Conversion CTA */}
      <MobileStickyCTA onBookCall={handleOpenBooking} />
    </div>
  );
}
