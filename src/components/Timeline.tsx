import React from 'react';
import { useIntersectionObserver } from '../hooks/useAnimations';

interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  icon: string;
  side: 'left' | 'right';
}

const events: TimelineEvent[] = [
  {
    year: '2024',
    title: 'डिजिटल सेवा पहल',
    desc: 'सूर्यपुरा में पहली बार डिजिटल सेवाओं की शुरुआत।',
    icon: '💻',
    side: 'right',
  },
  {
    year: '2025',
    title: 'सड़क सुधार अभियान',
    desc: 'मुख्य मार्ग और आंतरिक सड़कों का आधुनिकीकरण।',
    icon: '🛣️',
    side: 'left',
  },
  {
    year: '2025',
    title: 'स्कूल डिजिटल लर्निंग',
    desc: 'गांव के स्कूल में स्मार्ट क्लासरूम की स्थापना।',
    icon: '📚',
    side: 'right',
  },
  {
    year: '2026',
    title: 'किसान सहायता केंद्र',
    desc: 'किसानों के लिए आधुनिक कृषि जानकारी केंद्र।',
    icon: '🌾',
    side: 'left',
  },
  {
    year: '2026',
    title: 'स्मार्ट पंचायत पहल',
    desc: 'पंचायत कार्यों का डिजिटलीकरण और पारदर्शिता।',
    icon: '🏛️',
    side: 'right',
  },
];

const Timeline: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section id="timeline" className="section-py bg-soft-beige overflow-hidden" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-badge mb-4">विकास यात्रा</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-hindi mt-3 mb-3">
            सूर्यपुरा की विकास यात्रा
          </h2>
          <p className="text-muted-green text-sm font-hindi">* ये Fictional Demo milestones हैं</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-deep-green via-warm-yellow to-deep-green transform -translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {events.map((event, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row items-start md:items-center gap-4 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } ${event.side === 'left' ? 'md:flex-row-reverse' : ''}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Content Card */}
                <div className={`flex-1 ${event.side === 'left' ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="card p-5 md:p-6 inline-block w-full md:w-auto md:max-w-xs hover:shadow-card-hover">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{event.icon}</span>
                      <span className="text-warm-yellow font-bold text-sm font-inter">{event.year}</span>
                    </div>
                    <h3 className="font-bold text-charcoal font-hindi text-lg mb-1">{event.title}</h3>
                    <p className="text-muted-green text-sm font-hindi">{event.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-12 h-12 rounded-full border-4 border-warm-yellow bg-white shadow-lg flex-shrink-0 z-10 items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-deep-green" />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
