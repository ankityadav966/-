import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'अब जरूरी जानकारी के लिए हमें बार-बार अलग-अलग जगह जाने की जरूरत नहीं पड़ती। सूर्यपुरा पोर्टल से सब कुछ आसान हो गया है।',
    name: 'सीमा देवी',
    role: 'सूर्यपुरा निवासी',
    avatar: '👩',
    stars: 5,
  },
  {
    id: 'test-2',
    quote: 'कृषि की नई जानकारी से हमें अपनी खेती को बेहतर तरीके से समझने में मदद मिली। अब हम आधुनिक तरीके से खेती कर पा रहे हैं।',
    name: 'मोहनलाल',
    role: 'किसान, सूर्यपुरा',
    avatar: '👨‍🌾',
    stars: 5,
  },
  {
    id: 'test-3',
    quote: 'बच्चों को डिजिटल शिक्षा मिल रही है। स्कूल में नई तकनीक आने से पढ़ाई में बहुत सुधार हुआ है।',
    name: 'रमेश कुमार',
    role: 'अभिभावक, सूर्यपुरा',
    avatar: '👨',
    stars: 5,
  },
];

const Testimonials: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.12);

  return (
    <section id="testimonials" className="section-py bg-soft-beige" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-badge mb-4">प्रतिक्रिया</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-hindi mt-3 mb-3">
            गांव की <span className="text-forest-green">आवाज़</span>
          </h2>
          <p className="text-muted-green text-sm font-hindi">* ये fictional demo प्रतिक्रियाएँ हैं</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              id={t.id}
              className={`card p-6 relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 130}ms` }}
            >
              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-forest-green/10">
                <Quote size={48} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={16} className="text-warm-yellow fill-warm-yellow" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-charcoal/80 font-hindi text-base leading-relaxed mb-6 relative z-10">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="w-12 h-12 bg-gradient-to-br from-deep-green to-forest-green rounded-full flex items-center justify-center text-2xl">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-charcoal font-hindi">{t.name}</p>
                  <p className="text-muted-green text-sm font-hindi">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
