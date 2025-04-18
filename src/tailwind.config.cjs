/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'fhd': '1920px', // Add this line
        // ... other custom screens or keep empty if none
      },
      colors: {
        boring: {
          main: '#00010D',
          gray: '#626973',
          slate: '#79818C',
          offwhite: '#F2F2F0',
          dark: '#0D0D0D',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.85 },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { 
            transform: 'translateY(0) scale(1)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' 
          },
          '50%': { 
            transform: 'translateY(-6px) scale(1.05)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' 
          },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'wave': {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-5px)' },
          '75%': { transform: 'translateY(5px)' },
        },
        'magnetic-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'scale-fade-out': {
          '0%': { transform: 'scale(0)', opacity: '0.7' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'slide-out-left': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(-10px)', opacity: '0' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(10px)', opacity: '0' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-subtle': 'float-subtle 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-x-slow': 'gradient-x 6s ease infinite',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'wave': 'wave 2s ease-in-out infinite',
        'magnetic-pulse': 'magnetic-pulse 3s ease-in-out infinite',
        'scale-fade-out': 'scale-fade-out 0.6s ease-out forwards',
        'slide-out-left': 'slide-out-left 0.3s ease-out forwards',
        'slide-out-right': 'slide-out-right 0.3s ease-out forwards',
      },
      backgroundSize: {
        'gradient-animate': '200% 200%',
      },
      backgroundImage: {
        'gradient-radial-white': 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
        'gradient-radial-dark': 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
        'gradient-conic': 'conic-gradient(from 0deg, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform',
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }
    },
  },
  plugins: [],
} 