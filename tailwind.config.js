/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abyss:    '#000E24',
        deep:     '#00070F',
        teal:     '#5BC0BE',
        ivory:    '#E8E4DD',
      },
      fontFamily: {
        sans:    ['Space Grotesk', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
        display: ['DM Serif Display', 'serif'],
      },
      fontSize: {
        'hero': 'clamp(3.5rem, 10vw, 10rem)',
        'hero-sm': 'clamp(2rem, 6vw, 5rem)',
        'massive': 'clamp(5rem, 14vw, 14rem)',
      },
      lineHeight: {
        'brutal': '0.88',
        'tight-brutal': '0.92',
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'wider-mono': '0.15em',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
