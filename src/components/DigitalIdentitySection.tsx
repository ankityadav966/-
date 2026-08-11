import React from 'react';
import { User, FileText, ClipboardList, Bell, Building2, Smartphone, Shield } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useAnimations';

const services = [
  { icon: <User size={20} />, label: 'परिवार प्रोफाइल', id: 'svc-profile' },
  { icon: <FileText size={20} />, label: 'डिजिटल दस्तावेज', id: 'svc-docs' },
  { icon: <ClipboardList size={20} />, label: 'योजना जानकारी', id: 'svc-yojana' },
  { icon: <Bell size={20} />, label: 'आवेदन स्थिति', id: 'svc-status' },
  { icon: <Building2 size={20} />, label: 'पंचायत सेवाएँ', id: 'svc-panchayat' },
];

const DigitalIdentitySection: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver(0.12);

  return (
    <section id="digital" className="section-py bg-soft-beige overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="section-badge mb-4">डिजिटल सेवाएँ</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-charcoal font-hindi mt-3 mb-4">
            डिजिटल पहचान,{' '}
            <span className="text-forest-green">आसान सेवाएँ</span>
          </h2>
          <p className="text-muted-green text-lg font-hindi max-w-xl mx-auto">
            जरूरी जानकारी और डिजिटल सेवाओं को एक ही जगह से आसान तरीके से access करें।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Services */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <h3 className="text-xl font-bold text-charcoal font-hindi mb-6">उपलब्ध सेवाएँ</h3>
            <div className="space-y-4">
              {services.map((svc, i) => (
                <div
                  key={i}
                  className={`card flex items-center gap-4 p-5 cursor-pointer group transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
                  style={{ transitionDelay: `${200 + i * 80}ms` }}
                  id={svc.id}
                  tabIndex={0}
                >
                  <div className="w-12 h-12 bg-forest-green/10 rounded-xl flex items-center justify-center text-forest-green flex-shrink-0 group-hover:bg-forest-green group-hover:text-cream transition-all duration-300">
                    {svc.icon}
                  </div>
                  <span className="font-semibold text-charcoal font-hindi text-lg group-hover:text-forest-green transition-colors duration-300">
                    {svc.label}
                  </span>
                  <div className="ml-auto w-8 h-8 rounded-full border border-forest-green/20 flex items-center justify-center text-forest-green/40 group-hover:border-forest-green group-hover:text-forest-green transition-all duration-300">
                    →
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: ID Card */}
          <div
            className={`flex flex-col gap-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-xl font-bold text-charcoal font-hindi">डिजिटल पहचान पत्र</h3>

            {/* Demo ID Card */}
            <div className="id-card p-6 text-cream shadow-2xl" role="img" aria-label="Demo Digital Identity Card">
              {/* Card header */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div>
                  <p className="text-warm-yellow font-bold text-lg font-hindi">सूर्यपुरा</p>
                  <p className="text-cream/70 text-xs font-hindi">ग्राम विकास पोर्टल</p>
                </div>
                <div className="w-12 h-12 bg-warm-yellow/20 rounded-full flex items-center justify-center">
                  <Smartphone size={22} className="text-warm-yellow" />
                </div>
              </div>

              {/* Card body */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-16 h-16 bg-warm-yellow/20 rounded-full flex items-center justify-center border-2 border-warm-yellow/40">
                  <User size={28} className="text-warm-yellow" />
                </div>
                <div>
                  <p className="font-bold text-xl font-hindi">रामलाल शर्मा</p>
                  <p className="text-cream/70 text-sm font-hindi">ग्राम: सूर्यपुरा</p>
                  <p className="text-warm-yellow text-sm font-inter font-bold tracking-wider mt-1">SP-DEMO-2045</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/15 my-4 relative z-10" />

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div>
                  <p className="text-cream/50 text-xs font-hindi mb-1">परिवार ID</p>
                  <p className="text-cream font-bold text-sm font-inter">SP-FAM-001</p>
                </div>
                <div>
                  <p className="text-cream/50 text-xs font-hindi mb-1">वर्ष</p>
                  <p className="text-cream font-bold text-sm font-inter">2026</p>
                </div>
              </div>

              {/* Shield icon */}
              <div className="flex items-center gap-2 mt-4 relative z-10">
                <Shield size={14} className="text-warm-yellow" />
                <span className="text-warm-yellow/80 text-xs font-hindi">डिजिटल सत्यापित</span>
              </div>
            </div>

            {/* DEMO disclaimer */}
            <div className="bg-warm-yellow/10 border border-warm-yellow/30 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-warm-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield size={16} className="text-earth-brown" />
                </div>
                <div>
                  <p className="font-bold text-earth-brown font-hindi text-sm">DEMO ID — NOT A REAL GOVERNMENT ID</p>
                  <p className="text-muted-green text-xs font-hindi mt-1">
                    यह केवल एक fictional demo पहचान पत्र है। कोई वास्तविक सरकारी जानकारी नहीं है।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalIdentitySection;
