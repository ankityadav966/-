/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-green': '#164A35',
        'forest-green': '#1F6B45',
        'warm-yellow': '#F4B942',
        'earth-brown': '#8B5E3C',
        'cream': '#FFF9ED',
        'soft-beige': '#F5EFE3',
        'charcoal': '#17211B',
        'muted-green': '#647067',
        'light-green': '#E8F5E9',
        'gold': '#D4A017',
      },
      fontFamily: {
        'devanagari': ['Noto Sans Devanagari', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.7s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'green-gradient': 'linear-gradient(135deg, #164A35 0%, #1F6B45 100%)',
        'cream-gradient': 'linear-gradient(135deg, #FFF9ED 0%, #F5EFE3 100%)',
        'hero-gradient': 'linear-gradient(135deg, rgba(22,74,53,0.92) 0%, rgba(31,107,69,0.85) 60%, rgba(244,185,66,0.15) 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(22, 74, 53, 0.10)',
        'card-hover': '0 8px 40px rgba(22, 74, 53, 0.18)',
        'green': '0 4px 20px rgba(31, 107, 69, 0.3)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
}
