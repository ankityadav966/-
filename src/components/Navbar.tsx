import React, { useState, useEffect } from 'react';


const navLinks = [
  { label: 'होम', href: '#home' },
  { label: 'हमारा विकास', href: '#vikas' },
  { label: 'किसान', href: '#kisan' },
  { label: 'शिक्षा', href: '#shiksha' },
  { label: 'सड़क एवं सुविधाएँ', href: '#infrastructure' },
  { label: 'पंचायत', href: '#panchayat' },
  { label: 'डिजिटल सेवाएँ', href: '#digital' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md shadow-black/5'
          : 'bg-transparent'
      }`}
      aria-label="मुख्य नेविगेशन"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-2 group"
            aria-label="सूर्यपुरा ग्राम विकास पोर्टल - होम"
          >
            <div className="w-10 h-10 bg-warm-yellow rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
              <span className="text-deep-green font-bold text-lg leading-none">सू</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`font-bold text-base md:text-lg font-hindi transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-cream'}`}>सूर्यपुरा</span>
              <span className={`text-xs font-hindi hidden sm:block transition-colors duration-300 ${isScrolled ? 'text-forest-green' : 'text-warm-yellow/90'}`}>ग्राम विकास पोर्टल</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`px-3 py-2 font-hindi text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                  isScrolled 
                    ? 'text-gray-800 hover:text-forest-green hover:bg-black/5' 
                    : 'text-cream/90 hover:text-warm-yellow hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#digital"
              onClick={(e) => { e.preventDefault(); handleNavClick('#digital'); }}
              className="btn-primary text-sm px-5 py-2.5"
            >
              डिजिटल सेवा शुरू करें
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-gray-900 hover:bg-black/5' : 'text-cream hover:bg-white/10'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'मेनू बंद करें' : 'मेनू खोलें'}
            aria-expanded={menuOpen}
          >
            <div className={`hamburger ${menuOpen ? 'open' : ''} flex flex-col gap-1.5 w-6`}>
              <span className={`hamburger-line line1 ${menuOpen ? 'rotate-45 translate-x-0 translate-y-2' : ''}`} />
              <span className={`hamburger-line line2 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`hamburger-line line3 ${menuOpen ? '-rotate-45 translate-x-0 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-400 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white/98 border-t border-black/5 px-4 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="px-4 py-3 text-gray-800 hover:text-forest-green hover:bg-black/5 font-hindi text-base font-medium rounded-xl transition-all duration-300 block"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 pt-3 border-t border-black/5">
            <a
              href="#digital"
              onClick={(e) => { e.preventDefault(); handleNavClick('#digital'); }}
              className="btn-primary w-full justify-center"
            >
              डिजिटल सेवा शुरू करें
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
