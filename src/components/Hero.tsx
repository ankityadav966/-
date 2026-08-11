import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown, Users, GraduationCap, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0d3022 0%, #164A35 40%, #1F6B45 100%)',
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero_village.png)' }}
      >
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(13,48,34,0.88) 0%, rgba(22,74,53,0.82) 45%, rgba(31,107,69,0.75) 100%)'
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-warm-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-forest-green/20 rounded-full blur-3xl pointer-events-none" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-warm-yellow/30 rounded-full animate-float pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-warm-yellow/15 border border-warm-yellow/30 text-warm-yellow px-4 py-2 rounded-full text-sm font-hindi font-medium mb-6">
              <div className="w-2 h-2 bg-warm-yellow rounded-full animate-pulse" />
              साथ मिलकर बनाएँ बेहतर सूर्यपुरा
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-cream leading-tight mb-6 font-hindi">
              सूर्यपुरा का{' '}
              <span className="text-transparent bg-clip-text" style={{
                backgroundImage: 'linear-gradient(135deg, #F4B942, #D4A017)'
              }}>
                विकास,
              </span>
              <br />
              हर परिवार के साथ
            </h1>

            {/* Subheading */}
            <p className="text-cream/80 text-lg sm:text-xl mb-8 font-hindi leading-relaxed max-w-lg">
              शिक्षा, किसान, सड़क, पंचायत और डिजिटल सेवाओं के माध्यम से एक मजबूत और आत्मनिर्भर गांव की ओर।
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => scrollToSection('#vikas')}
                className="btn-primary"
                id="hero-cta-primary"
              >
                हमारे विकास कार्य देखें
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('#digital')}
                className="btn-secondary"
                id="hero-cta-secondary"
              >
                डिजिटल सेवाएँ
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <Users size={16} />, text: '850+ किसान परिवार' },
                { icon: <GraduationCap size={16} />, text: '420+ विद्यार्थी' },
                { icon: <Shield size={16} />, text: 'पारदर्शी पंचायत' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-cream/70 text-sm font-hindi">
                  <span className="text-warm-yellow">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Character Image */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
              loaded ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-3xl bg-warm-yellow/10 blur-2xl scale-110" />

              {/* Image container */}
              <div className="relative w-80 sm:w-96 lg:w-[420px] rounded-3xl overflow-hidden border border-warm-yellow/20 shadow-2xl">
                <img
                  src="/gram_doot.png"
                  alt="ग्रामीण विकास दूत — सूर्यपुरा"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Overlay card */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-deep-green/95 to-transparent p-6">
                  <p className="text-warm-yellow font-bold text-lg font-hindi">ग्रामीण विकास दूत</p>
                  <p className="text-cream/80 text-sm font-hindi">सूर्यपुरा की प्रगति का संदेशवाहक</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-warm-yellow" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-warm-yellow text-deep-green px-3 py-1.5 rounded-xl font-bold text-xs font-hindi shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                🌾 आत्मनिर्भर गांव
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => scrollToSection('#stats')}
            className="flex flex-col items-center gap-2 text-cream/50 hover:text-warm-yellow transition-colors group"
            aria-label="नीचे स्क्रॉल करें"
          >
            <span className="text-xs font-hindi">और देखें</span>
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
