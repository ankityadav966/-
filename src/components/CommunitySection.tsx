import React from 'react';
import { Users } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

const highlights = [
  {
    emoji: '👩',
    title: 'महिला सशक्तिकरण',
    desc: 'स्थानीय महिलाओं के लिए नए अवसर और digital awareness।',
    color: '#F4B942',
  },
  {
    emoji: '💪',
    title: 'युवा शक्ति',
    desc: 'युवाओं को skills और नए career opportunities से जोड़ना।',
    color: '#1F6B45',
  },
  {
    emoji: '🤝',
    title: 'सामुदायिक भागीदारी',
    desc: 'गांव के विकास में हर नागरिक की भागीदारी।',
    color: '#164A35',
  },
];

const CommunitySection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.12);

  return (
    <section id="community" className="section-py bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-badge mb-4">समुदाय</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-hindi mt-3 mb-4">
            सूर्यपुरा की असली ताकत —{' '}
            <span className="text-forest-green">हमारी एकजुटता</span>
          </h2>
          <p className="text-muted-green text-lg font-hindi max-w-2xl mx-auto">
            गांव की असली पहचान उसके लोग हैं — किसान, महिलाएँ, विद्यार्थी, बुजुर्ग और युवा।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/community.png"
                alt="सूर्यपुरा का एकजुट समुदाय"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/40 to-transparent rounded-3xl" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white shadow-xl rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-deep-green rounded-full flex items-center justify-center">
                <Users size={18} className="text-warm-yellow" />
              </div>
              <div>
                <p className="font-bold text-charcoal text-sm font-hindi">मजबूत समुदाय</p>
                <p className="text-muted-green text-xs font-hindi">एक साथ, आगे</p>
              </div>
            </div>
          </div>

          {/* Right: Highlights */}
          <div
            className={`space-y-5 transition-all duration-800 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {highlights.map((h, i) => (
              <div
                key={i}
                className={`card p-6 flex gap-5 group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${h.color}12` }}
                >
                  {h.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-charcoal font-hindi text-xl mb-2">{h.title}</h3>
                  <p className="text-muted-green font-hindi text-base leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
