import React from 'react';
import { useIntersectionObserver, useCountUp } from '../hooks/useAnimations';
import { TrendingUp, Users, GraduationCap, Wifi } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: StatItem[] = [
  {
    icon: <TrendingUp size={28} />,
    value: 12,
    suffix: '+',
    label: 'विकास परियोजनाएँ',
    color: 'text-warm-yellow',
  },
  {
    icon: <Users size={28} />,
    value: 850,
    suffix: '+',
    label: 'किसान परिवार',
    color: 'text-warm-yellow',
  },
  {
    icon: <GraduationCap size={28} />,
    value: 420,
    suffix: '+',
    label: 'विद्यार्थी',
    color: 'text-warm-yellow',
  },
  {
    icon: <Wifi size={28} />,
    value: 95,
    suffix: '%',
    label: 'डिजिटल सेवा पहुँच',
    color: 'text-warm-yellow',
  },
];

interface StatCardProps {
  stat: StatItem;
  isVisible: boolean;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, isVisible, delay }) => {
  const count = useCountUp(stat.value, 2000, isVisible);
  return (
    <div
      className={`text-center p-6 md:p-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`flex justify-center mb-3 ${stat.color}`}>{stat.icon}</div>
      <div className="flex items-end justify-center gap-0.5">
        <span className="text-4xl md:text-5xl font-black text-deep-green font-inter">
          {isVisible ? count : 0}
        </span>
        <span className="text-2xl md:text-3xl font-black text-warm-yellow font-inter mb-1">
          {stat.suffix}
        </span>
      </div>
      <p className="text-muted-green font-hindi font-medium mt-2 text-base">{stat.label}</p>
    </div>
  );
};

const DevelopmentStats: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.2);

  return (
    <section id="stats" className="relative bg-white py-4 sm:py-0" ref={ref}>
      {/* Top curved divider */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-deep-green rounded-b-none" style={{
        clipPath: 'ellipse(60% 100% at 50% 0%)'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-cream-gradient rounded-3xl shadow-card border border-warm-yellow/10 overflow-hidden">
          {/* Top accent */}
          <div className="h-1 bg-gradient-to-r from-deep-green via-warm-yellow to-forest-green" />

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x-0 sm:divide-x divide-y sm:divide-y-0 divide-warm-yellow/20">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} isVisible={isVisible} delay={i * 120} />
            ))}
          </div>

          {/* Demo disclaimer */}
          <div className="text-center pb-4">
            <span className="text-xs text-muted-green/60 font-hindi">
              * ये आंकड़े Fictional Demo Project के लिए हैं
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentStats;
