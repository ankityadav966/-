import React, { useState, useEffect, useRef } from 'react';
import { Building2, FileText, Bell, MessageSquare, TrendingUp } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

const actionButtons = [
  { icon: <TrendingUp size={20} />, label: 'विकास कार्य', id: 'pan-vikas' },
  { icon: <FileText size={20} />, label: 'सरकारी योजनाएँ', id: 'pan-yojana' },
  { icon: <Bell size={20} />, label: 'पंचायत सूचना', id: 'pan-suchna' },
  { icon: <MessageSquare size={20} />, label: 'शिकायत / सुझाव', id: 'pan-shikayat' },
];

interface Progress {
  label: string;
  value: number;
}

const progressItems: Progress[] = [
  { label: 'Road Improvement', value: 75 },
  { label: 'School Upgrade', value: 60 },
  { label: 'Solar Lights', value: 90 },
];

interface ProgressBarProps {
  item: Progress;
  isVisible: boolean;
  delay: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ item, isVisible, delay }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setWidth(item.value), delay);
      return () => clearTimeout(timer);
    }
  }, [isVisible, item.value, delay]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-cream/90 text-sm font-hindi">{item.label}</span>
        <span className="text-warm-yellow text-sm font-bold font-inter">{item.value}%</span>
      </div>
      <div className="h-2.5 bg-white/15 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1500 ease-out"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #F4B942, #D4A017)',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
};

const PanchayatSection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.15);

  return (
    <section
      id="panchayat"
      className="section-py relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d3022 0%, #164A35 60%, #1F6B45 100%)' }}
      ref={ref}
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-warm-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-warm-yellow/15 border border-warm-yellow/30 text-warm-yellow px-4 py-2 rounded-full text-sm font-hindi font-medium mb-6">
            <Building2 size={16} />
            पंचायत
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-cream font-hindi mb-4">
            पंचायत — आपके गांव की आवाज़
          </h2>
          <p className="text-cream/70 text-lg font-hindi max-w-2xl mx-auto leading-relaxed">
            सूर्यपुरा की पंचायत का उद्देश्य है कि जरूरी जानकारी, योजनाएँ और विकास कार्य हर नागरिक तक आसानी से पहुंचें।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Action Buttons */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="text-xl font-bold text-cream font-hindi mb-6">त्वरित सेवाएँ</h3>
            <div className="grid grid-cols-2 gap-4">
              {actionButtons.map((btn, i) => (
                <button
                  key={i}
                  id={btn.id}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/15 bg-white/8 hover:bg-white/15 hover:border-warm-yellow/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-warm-yellow/15 rounded-xl flex items-center justify-center text-warm-yellow group-hover:bg-warm-yellow group-hover:text-deep-green transition-all duration-300">
                    {btn.icon}
                  </div>
                  <span className="text-cream/90 font-hindi text-sm font-semibold text-center leading-tight">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Panel */}
          <div
            className={`bg-white/8 border border-white/12 rounded-3xl p-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-xl font-bold text-cream font-hindi mb-2">चल रहे विकास कार्य</h3>
            <p className="text-cream/50 text-xs font-hindi mb-6">* ये आंकड़े केवल demonstration के लिए हैं</p>

            <div className="space-y-6">
              {progressItems.map((item, i) => (
                <ProgressBar key={i} item={item} isVisible={isVisible} delay={400 + i * 200} />
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-warm-yellow/10 border border-warm-yellow/20 rounded-xl">
              <p className="text-warm-yellow/80 text-xs font-hindi leading-relaxed">
                <strong>नोट:</strong> यह एक fictional demo project है; इसमें प्रदर्शित योजनाएँ और आंकड़े केवल demonstration के लिए हैं।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PanchayatSection;
