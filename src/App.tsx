import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DevelopmentStats from './components/DevelopmentStats';
import DevelopmentCards from './components/DevelopmentCards';
import FarmerSection from './components/FarmerSection';
import EducationSection from './components/EducationSection';
import InfrastructureSection from './components/InfrastructureSection';
import PanchayatSection from './components/PanchayatSection';
import DigitalIdentitySection from './components/DigitalIdentitySection';
import CommunitySection from './components/CommunitySection';
import Timeline from './components/Timeline';
import SocialMediaPreview from './components/SocialMediaPreview';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { useScrollReveal } from './hooks/useAnimations';

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* Statistics */}
        <DevelopmentStats />

        {/* Development Cards */}
        <DevelopmentCards />

        {/* Farmer Section */}
        <FarmerSection />

        {/* Education Section */}
        <EducationSection />

        {/* Infrastructure Section */}
        <InfrastructureSection />

        {/* Panchayat Section */}
        <PanchayatSection />

        {/* Digital Identity Section */}
        <DigitalIdentitySection />

        {/* Community Section */}
        <CommunitySection />

        {/* Development Timeline */}
        <Timeline />

        {/* Social Media Preview */}
        <SocialMediaPreview />

        {/* Testimonials */}
        <Testimonials />

        {/* Final CTA */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
