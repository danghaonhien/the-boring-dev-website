/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        boring: {
          main: '#00010D',
          gray: '#626973',
          slate: '#79818C',
          offwhite: '#F2F2F0',
          dark: '#0D0D0D',
        },
      },
    },
  },
  plugins: [],
} 