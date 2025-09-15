/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'saru-teal': '#00A8A8',
        'saru-teal-dark': '#005F73',
        'saru-cyan': '#E0FBFC',
        'saru-slate': '#1B262C',
        'saru-slate-dark': '#2C3E50',
        'saru-black': '#000000',
        'saru-black-light': '#0B0C10',
      },
      fontFamily: {
        'sans': ['Inter', 'Poppins', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
