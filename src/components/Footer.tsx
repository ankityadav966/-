import React from 'react';
import { Globe, MessageSquare, Play, ArrowUp } from 'lucide-react';

const footerLinks = [
  { label: 'हमारा विकास', href: '#vikas' },
  { label: 'किसान', href: '#kisan' },
  { label: 'शिक्षा', href: '#shiksha' },
  { label: 'पंचायत', href: '#panchayat' },
  { label: 'डिजिटल सेवाएँ', href: '#digital' },
  { label: 'संपर्क', href: '#contact' },
];

const Footer: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      id="contact"
      className="relative"
      style={{ background: 'linear-gradient(135deg, #0a2018 0%, #164A35 100%)' }}
    >
      {/* Top wave */}
      <div className="h-1 bg-gradient-to-r from-deep-green via-warm-yellow to-forest-green" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-warm-yellow rounded-full flex items-center justify-center shadow-lg">
                <span className="text-deep-green font-black text-xl">सू</span>
              </div>
              <div>
                <p className="text-cream font-black text-xl font-hindi">सूर्यपुरा</p>
                <p className="text-warm-yellow/70 text-xs font-hindi">ग्राम विकास पोर्टल</p>
              </div>
            </div>
            <p className="text-cream/60 font-hindi text-sm leading-relaxed mb-6">
              गांव का विकास, हर परिवार के साथ
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: <Globe size={18} />, label: 'Instagram', id: 'footer-instagram' },
                { icon: <MessageSquare size={18} />, label: 'Facebook', id: 'footer-facebook' },
                { icon: <Play size={18} />, label: 'YouTube', id: 'footer-youtube' },
              ].map((s) => (
                <button
                  key={s.id}
                  id={s.id}
                  aria-label={s.label}
                  className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center text-cream/60 hover:text-warm-yellow hover:border-warm-yellow/40 transition-all duration-300 hover:bg-warm-yellow/10"
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cream font-bold text-base font-hindi mb-5">त्वरित लिंक</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-cream/60 hover:text-warm-yellow font-hindi text-sm transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-cream font-bold text-base font-hindi mb-5">जानकारी</h3>
            <div className="space-y-3 text-cream/60 text-sm font-hindi">
              <p>📍 सूर्यपुरा, ग्राम पंचायत</p>
              <p>📞 DEMO: +91 00000 00000</p>
              <p>📧 demo@suryapura.in</p>
            </div>

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center gap-2 text-warm-yellow/70 hover:text-warm-yellow text-sm font-hindi transition-colors duration-300 group"
              aria-label="ऊपर जाएँ"
              id="scroll-top"
            >
              <div className="w-8 h-8 border border-warm-yellow/30 rounded-lg flex items-center justify-center group-hover:bg-warm-yellow/15 transition-colors duration-300">
                <ArrowUp size={16} />
              </div>
              ऊपर जाएँ
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cream/40 text-xs font-inter text-center sm:text-left">
              © 2026 Suryapura Gram Vikas Portal — Fictional Demo Project
            </p>
            <p className="text-cream/30 text-xs font-hindi text-center sm:text-right max-w-xs">
              यह वेबसाइट एक fictional design/development demo है और किसी वास्तविक सरकारी संस्था का प्रतिनिधित्व नहीं करती।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
