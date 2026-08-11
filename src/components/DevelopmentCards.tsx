import React from 'react';
import { Leaf, GraduationCap, Building2, Smartphone, ArrowRight, MapPin } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

interface Card {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  accent: string;
}

const cards: Card[] = [
  {
    id: 'card-kisan',
    icon: <Leaf size={24} />,
    title: 'किसान विकास',
    desc: 'बेहतर कृषि जानकारी, बाजार तक पहुंच और आधुनिक खेती के अवसर।',
    href: '#kisan',
    accent: '#1F6B45',
  },
  {
    id: 'card-shiksha',
    icon: <GraduationCap size={24} />,
    title: 'शिक्षा',
    desc: 'हर बच्चे तक गुणवत्तापूर्ण शिक्षा और डिजिटल learning की पहुंच।',
    href: '#shiksha',
    accent: '#8B5E3C',
  },
  {
    id: 'card-infra',
    icon: <MapPin size={24} />,
    title: 'सड़क एवं सुविधाएँ',
    desc: 'बेहतर सड़कें, रोशनी और गांव की मजबूत connectivity।',
    href: '#infrastructure',
    accent: '#164A35',
  },
  {
    id: 'card-panchayat',
    icon: <Building2 size={24} />,
    title: 'पंचायत',
    desc: 'पारदर्शी जानकारी, योजनाएँ और community participation।',
    href: '#panchayat',
    accent: '#1F6B45',
  },
  {
    id: 'card-digital',
    icon: <Smartphone size={24} />,
    title: 'डिजिटल पहचान',
    desc: 'जरूरी डिजिटल सेवाओं तक आसान और सुरक्षित पहुंच।',
    href: '#digital',
    accent: '#F4B942',
  },
];

interface DevCardProps {
  card: Card;
  isVisible: boolean;
  delay: number;
}

const DevCard: React.FC<DevCardProps> = ({ card, isVisible, delay }) => {
  const scrollTo = () => {
    const el = document.querySelector(card.href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`card p-6 group cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={scrollTo}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && scrollTo()}
      role="button"
      aria-label={card.title}
      id={card.id}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${card.accent}18`, color: card.accent }}
      >
        {card.icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-charcoal font-hindi mb-2">{card.title}</h3>
      <p className="text-muted-green text-sm font-hindi leading-relaxed mb-4">{card.desc}</p>

      {/* CTA */}
      <div className="flex items-center gap-1 text-sm font-hindi font-semibold transition-all duration-300 group-hover:gap-2" style={{ color: card.accent }}>
        जानें अधिक
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>

      {/* Bottom accent line */}
      <div
        className="h-0.5 mt-4 rounded-full transition-all duration-500 group-hover:w-full"
        style={{ background: card.accent, width: '2rem' }}
      />
    </div>
  );
};

const DevelopmentCards: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.1);

  return (
    <section id="vikas" className="section-py bg-soft-beige" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-badge mb-4">हमारा विकास</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-hindi mt-3 mb-4">
            विकास जो हर घर तक पहुँचे
          </h2>
          <p className="text-muted-green text-lg font-hindi max-w-2xl mx-auto leading-relaxed">
            सूर्यपुरा में विकास का मतलब सिर्फ नई सुविधाएँ नहीं, बल्कि हर परिवार के लिए बेहतर अवसर, बेहतर शिक्षा और बेहतर भविष्य है।
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cards.map((card, i) => (
            <DevCard key={card.id} card={card} isVisible={isVisible} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevelopmentCards;
