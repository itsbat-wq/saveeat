import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          dark: '#0f172a',
          darker: '#020817',
          primary: '#10b981',
          'primary-light': '#34d399',
          'primary-dark': '#059669',
          accent: '#f97316',
          'accent-light': '#fb923c',
          'accent-dark': '#ea580c',
          success: '#22c55e',
          danger: '#ef4444',
          warning: '#f59e0b',
          white: '#ffffff',
          muted: '#94a3b8',
          slate: '#1e293b',
          'slate-light': '#334155',
          'slate-lighter': '#475569',
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.7)',
          border: 'rgba(0, 0, 0, 0.05)',
          hover: 'rgba(255, 255, 255, 0.9)',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-green': 'radial-gradient(at 40% 20%, hsla(160,80%,90%,0.8) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,80%,90%,0.8) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(160,60%,95%,0.6) 0px, transparent 50%)',
        'mesh-dark': 'radial-gradient(at 20% 30%, hsla(210,40%,96%,1) 0px, transparent 50%), radial-gradient(at 80% 70%, hsla(210,40%,90%,1) 0px, transparent 50%)',
        'hero-gradient': 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
        'green-glow': 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
        'orange-glow': 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.3)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.1)',
        'glow-green-lg': '0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.2)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.4), 0 0 40px rgba(249, 115, 22, 0.1)',
        'glow-orange-lg': '0 0 30px rgba(249, 115, 22, 0.6), 0 0 60px rgba(249, 115, 22, 0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
        'inner-glass': 'inset 0 1px 0 rgba(255,255,255,0.1)',
        'neon-green': '0 0 5px #10b981, 0 0 10px #10b981, 0 0 20px #10b981',
        'neon-orange': '0 0 5px #f97316, 0 0 10px #f97316, 0 0 20px #f97316',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '16px',
        'glass-lg': '24px',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'pulse-orange': 'pulseOrange 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'countdown': 'countdown 1s ease-in-out infinite',
        'particle': 'particle 6s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'ripple': 'ripple 1.5s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(16, 185, 129, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(16, 185, 129, 0)' },
        },
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(249, 115, 22, 0)' },
        },
        glow: {
          '0%': { textShadow: '0 0 10px rgba(16, 185, 129, 0.5)' },
          '100%': { textShadow: '0 0 20px rgba(16, 185, 129, 0.9), 0 0 30px rgba(16, 185, 129, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        countdown: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        particle: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
          '50%': { transform: 'translateY(-30px) scale(0.8)', opacity: '0.4' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '0.8' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '96': '24rem',
        '104': '26rem',
        '112': '28rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        'xs': '375px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

export default config
