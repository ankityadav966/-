import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

const CTA: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.2);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="cta"
      className="relative py-24 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d3022 0%, #164A35 50%, #1F6B45 100%)' }}
      ref={ref}
    >
      {/* Village silhouette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120'%3E%3Cpath fill='%23FFF9ED' d='M0,80 L40,80 L40,40 L60,40 L60,20 L80,20 L80,40 L100,40 L100,80 L140,80 L140,50 L160,30 L180,50 L180,80 L240,80 L240,60 L260,40 L280,60 L280,80 L320,80 L320,45 L340,25 L360,45 L360,80 L400,80 L400,55 L420,35 L430,25 L440,35 L460,55 L460,80 L520,80 L520,60 L540,40 L560,60 L560,80 L600,80 L600,50 L620,30 L640,50 L640,80 L700,80 L700,45 L720,25 L740,45 L740,80 L800,80 L800,60 L820,40 L840,60 L840,80 L880,80 L880,50 L900,30 L920,50 L920,80 L980,80 L980,45 L1000,25 L1020,45 L1020,80 L1080,80 L1080,60 L1100,40 L1120,60 L1120,80 L1160,80 L1160,50 L1180,30 L1200,50 L1200,80 L1260,80 L1260,45 L1280,25 L1300,45 L1300,80 L1360,80 L1360,60 L1380,40 L1400,60 L1440,80 L1440,120 L0,120 Z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      />

      {/* Decorations */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-warm-yellow/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-warm-yellow/15 border border-warm-yellow/30 text-warm-yellow px-4 py-2 rounded-full text-sm font-hindi font-medium mb-8">
            <TrendingUp size={16} />
            मिलकर आगे बढ़ें
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-cream font-hindi mb-6 leading-tight">
            आइए, मिलकर सूर्यपुरा को{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #F4B942, #D4A017)' }}
            >
              आगे बढ़ाएं
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-cream/75 text-xl font-hindi max-w-2xl mx-auto mb-10 leading-relaxed">
            विकास तब सार्थक होता है जब उसका लाभ हर घर तक पहुंचे।
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo('#vikas')}
              className="btn-primary text-lg px-8 py-4"
              id="cta-vikas"
            >
              विकास कार्य देखें
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollTo('#digital')}
              className="btn-secondary text-lg px-8 py-4"
              id="cta-digital"
            >
              डिजिटल सेवाएँ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
