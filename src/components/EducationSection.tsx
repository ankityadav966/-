import React from 'react';
import { CheckCircle, BookOpen, Monitor, Heart, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

const features = [
  { icon: <Monitor size={18} />, label: 'Digital Learning' },
  { icon: <BookOpen size={18} />, label: 'Smart Classroom' },
  { icon: <Heart size={18} />, label: 'Student Support' },
];

const EducationSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.15);

  return (
    <section id="shiksha" className="section-py bg-soft-beige overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div
            className={`order-2 lg:order-1 transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="section-badge-gold mb-4">शिक्षा</span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-hindi mt-4 mb-6 leading-tight">
              हर बच्चे का सपना,{' '}
              <br />
              <span className="text-forest-green">सूर्यपुरा की</span>
              <br />
              जिम्मेदारी
            </h2>

            <p className="text-muted-green text-lg font-hindi leading-relaxed mb-8">
              शिक्षा गांव के भविष्य की सबसे मजबूत नींव है। हमारा प्रयास है कि हर बच्चे को सीखने, बढ़ने और आगे बढ़ने के समान अवसर मिलें।
            </p>

            {/* Feature list */}
            <div className="space-y-3 mb-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <div className="w-8 h-8 bg-forest-green/10 rounded-lg flex items-center justify-center text-forest-green flex-shrink-0">
                    {f.icon}
                  </div>
                  <span className="font-semibold text-charcoal font-hindi">{f.label}</span>
                  <CheckCircle size={16} className="text-forest-green ml-auto" />
                </div>
              ))}
            </div>

            <button
              className="btn-green"
              onClick={() => document.querySelector('#digital')?.scrollIntoView({ behavior: 'smooth' })}
              id="edu-cta"
            >
              शिक्षा पहल देखें
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Right: Image */}
          <div
            className={`order-1 lg:order-2 relative transition-all duration-800 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/education.png"
                alt="सूर्यपुरा के बच्चे डिजिटल शिक्षा ग्रहण करते हुए"
                className="w-full h-80 sm:h-96 lg:h-[500px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/50 to-transparent" />

              {/* Stats overlay */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <p className="text-3xl font-black text-deep-green font-inter">420+</p>
                <p className="text-muted-green text-sm font-hindi">विद्यार्थी</p>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-warm-yellow/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
