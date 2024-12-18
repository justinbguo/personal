/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'instrument': ['Instrument Serif', 'serif'],
        'satoshi': ['Satoshi', 'sans-serif'],
        'garamond': ['EB Garamond', 'serif'],
      },
      colors: {
        forest: {
          deep: '#051510',
          mid: '#0B291E',
          light: '#0F3C2D',
        },
      },
      backgroundImage: {
        'forest-gradient': 'radial-gradient(circle at 50% 50%, var(--forest-light) 0%, var(--forest-mid) 35%, var(--forest-deep) 100%)',
      },
    },
  },
  plugins: [],
}

