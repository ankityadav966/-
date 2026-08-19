import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft, Store, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TodoLayout() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-charcoal text-gray-900 dark:text-gray-100 transition-colors duration-200 font-devanagari">
      {/* Top E-Commerce Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#121B16]/95 backdrop-blur-md border-b border-warm-yellow/20 dark:border-forest-green/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Brand */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-soft-beige dark:bg-forest-green/20 text-deep-green dark:text-warm-yellow hover:bg-warm-yellow/20 text-xs sm:text-sm font-semibold transition-all"
                title="मुख्य पोर्टल पर वापस जाएँ"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">मुख्य पोर्टल</span>
              </Link>

              <Link to="/ankityadav" className="flex items-center gap-3 group">
                <div className="w-11 h-11 bg-green-gradient rounded-2xl flex items-center justify-center shadow-green group-hover:scale-105 transition-transform duration-300">
                  <Store className="w-6 h-6 text-warm-yellow" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl font-bold text-deep-green dark:text-warm-yellow tracking-tight">
                      सूर्यपुरा ग्राम हाट
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-warm-yellow text-charcoal px-2 py-0.5 rounded-full">
                      E-Commerce
                    </span>
                  </div>
                  <p className="text-xs text-muted-green dark:text-gray-400 hidden sm:block">
                    शुद्ध देसी उत्पाद • किसान व स्वयं सहायता समूह बाज़ार
                  </p>
                </div>
              </Link>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1.5 text-xs text-forest-green dark:text-emerald-400 bg-light-green dark:bg-forest-green/20 px-3 py-1.5 rounded-full border border-forest-green/20">
                <ShieldCheck className="w-4 h-4" />
                <span>100% शुद्ध एवं प्रमाणित उत्पाद</span>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-xl bg-soft-beige dark:bg-gray-800 text-charcoal dark:text-warm-yellow hover:bg-warm-yellow/20 transition-colors"
                title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
                aria-label="Theme toggle"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Outlet />
      </main>

      {/* Footer Note */}
      <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121B16] py-8 text-center text-xs text-muted-green dark:text-gray-400">
        <p className="font-medium">
          🌾 सूर्यपुरा ग्राम पंचायत ई-कॉमर्स पहल • किसानों एवं महिला उद्यमियों को सीधा बाज़ार
        </p>
        <p className="mt-1 text-[11px] opacity-75">
          CRUD & Live Inventory Powered by SQLite Layered Architecture & React
        </p>
      </footer>
    </div>
  );
}
