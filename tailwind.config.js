/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        envelope: {
          light: '#DCE6DD',
          DEFAULT: '#C8D6CA',
          dark: '#B0C0B3',
          shadow: '#8C9E90',
          pocket: '#BCCBC0',
          inner: '#A7B9AB'
        },
        onion: {
          light: '#EAD1D4',
          DEFAULT: '#D8A1A8',
          dark: '#B87E86'
        },
        gold: {
          light: '#EAD9AF',
          DEFAULT: '#C5A059',
          deep: '#A37E36',
          dark: '#7A5B20',
          accent: '#9E7B3C'
        },
        cream: {
          light: '#FFFFFF',
          DEFAULT: '#FAF6F0',
          dark: '#F3ECE0'
        },
        charcoal: {
          DEFAULT: '#2C2A29',
          muted: '#524F4D'
        }
      },
      fontFamily: {
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      boxShadow: {
        'envelope-pocket': '0 -8px 24px -4px rgba(70, 85, 73, 0.25), 0 -2px 6px rgba(70, 85, 73, 0.15)',
        'card-elevated': '0 20px 45px -10px rgba(44, 42, 41, 0.3), 0 8px 16px -6px rgba(44, 42, 41, 0.2)',
        'seal': '0 8px 20px rgba(122, 91, 32, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -3px 6px rgba(60, 40, 10, 0.5)',
      }
    },
  },
  plugins: [],
}
