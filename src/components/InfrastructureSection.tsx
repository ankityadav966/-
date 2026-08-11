import React from 'react';
import { MapPin, Sun, Droplets, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

const infraCards = [
  {
    icon: <MapPin size={22} />,
    title: 'नई सड़क परियोजना',
    desc: 'मुख्य मार्ग से गांव के प्रमुख क्षेत्रों तक बेहतर connectivity।',
    color: '#164A35',
    emoji: '🛣️',
  },
  {
    icon: <Sun size={22} />,
    title: 'सौर ऊर्जा पहल',
    desc: 'ऊर्जा-कुशल रोशनी के साथ सुरक्षित और उज्ज्वल रास्ते।',
    color: '#F4B942',
    emoji: '☀️',
  },
  {
    icon: <Droplets size={22} />,
    title: 'स्वच्छ गांव',
    desc: 'साफ-सुथरे सार्वजनिक स्थान और बेहतर community facilities।',
    color: '#1F6B45',
    emoji: '💧',
  },
];

const InfrastructureSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.12);

  return (
    <section id="infrastructure" className="section-py bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-badge mb-4">बुनियादी सुविधाएँ</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-hindi mt-3 mb-4">
            बेहतर रास्ते,{' '}
            <span className="text-forest-green">बेहतर अवसर</span>
          </h2>
          <p className="text-muted-green text-lg font-hindi max-w-xl mx-auto">
            गांव की बुनियादी सुविधाएँ उसकी उन्नति की नींव हैं।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-800 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="/infrastructure.png"
                alt="सूर्यपुरा में नई सड़क और सौर ऊर्जा"
                className="w-full h-72 sm:h-96 lg:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-warm-yellow text-deep-green px-4 py-2 rounded-full text-sm font-bold font-hindi shadow">
                  🏗️ विकास जारी है
                </span>
              </div>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="space-y-5">
            {infraCards.map((card, i) => (
              <div
                key={i}
                className={`card p-6 flex gap-5 group hover:border-l-4 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
                style={{
                  transitionDelay: `${200 + i * 120}ms`,
                  borderLeft: `4px solid ${card.color}`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${card.color}15` }}
                >
                  {card.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-charcoal font-hindi text-lg mb-1">{card.title}</h3>
                  <p className="text-muted-green text-sm font-hindi leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}

            <button
              className="btn-green mt-4"
              onClick={() => document.querySelector('#panchayat')?.scrollIntoView({ behavior: 'smooth' })}
              id="infra-cta"
            >
              और जानें <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
