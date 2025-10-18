/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'saru-teal': '#00A8A8',
        'saru-teal-dark': '#005F73',
        'saru-teal-light': '#4ECDC4',
        'saru-cyan': '#E0FBFC',
        'saru-slate': '#1B262C',
        'saru-slate-dark': '#2C3E50',
        'saru-black': '#000000',
        'saru-black-light': '#0B0C10',
        'primary': {
          300: '#E0FBFC',
          400: '#4ECDC4',
          500: '#00A8A8',
          600: '#005F73',
          700: '#003D4A',
          800: '#002A33',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'Montserrat', 'sans-serif'],
        'title': ['Lato', 'Open Sans', 'sans-serif'],
        'body': ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
