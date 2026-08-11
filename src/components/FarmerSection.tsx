import React from 'react';
import { ArrowRight, CheckCircle, TrendingUp, Globe, Sun } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

const features = [
  { icon: <CheckCircle size={20} />, label: 'कृषि जानकारी' },
  { icon: <TrendingUp size={20} />, label: 'बाजार और अवसर' },
  { icon: <Sun size={20} />, label: 'आधुनिक खेती' },
];

const FarmerSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.15);

  return (
    <section id="kisan" className="section-py relative overflow-hidden bg-white" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cream opacity-60" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-deep-green/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-800 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/farmer.png"
                alt="सूर्यपुरा का किसान — लहलहाते खेतों में"
                className="w-full h-80 sm:h-96 lg:h-[520px] object-cover"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/60 to-transparent" />

              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-forest-green rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-cream text-xl">🌾</span>
                  </div>
                  <div>
                    <p className="font-bold text-deep-green font-hindi text-base">किसान सशक्तिकरण</p>
                    <p className="text-muted-green text-sm font-hindi">बेहतर जानकारी • बेहतर भविष्य</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-warm-yellow/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-forest-green/10 rounded-full blur-2xl" />
          </div>

          {/* Right: Content */}
          <div
            className={`transition-all duration-800 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <span className="section-badge mb-4">किसान विकास</span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-hindi mt-4 mb-6 leading-tight">
              किसान मजबूत,{' '}
              <span className="text-forest-green">तो सूर्यपुरा</span>
              <br />
              मजबूत
            </h2>

            <p className="text-muted-green text-lg font-hindi leading-relaxed mb-8">
              हमारा लक्ष्य है कि गांव का हर किसान सही जानकारी, बेहतर अवसर और आधुनिक तकनीक से जुड़ सके। खेती सिर्फ जीविका नहीं — यह हमारी पहचान और हमारी ताकत है।
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-4 bg-soft-beige rounded-2xl transition-all duration-700 hover:bg-light-green cursor-default ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <div className="w-10 h-10 bg-forest-green/12 rounded-xl flex items-center justify-center flex-shrink-0 text-forest-green">
                    {f.icon}
                  </div>
                  <span className="font-semibold text-charcoal font-hindi text-lg">{f.label}</span>
                </div>
              ))}
            </div>

            <button
              className="btn-green"
              onClick={() => document.querySelector('#digital')?.scrollIntoView({ behavior: 'smooth' })}
              id="farmer-cta"
            >
              किसान सेवाएँ देखें
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FarmerSection;
