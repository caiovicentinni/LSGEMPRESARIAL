/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas:  '#F4F2ED',   /* cream main background */
        surface: '#FFFFFF',   /* white card surface */
        border:  '#E5E1D8',   /* subtle borders */
        dark:    '#111318',   /* dark sections */
        darker:  '#0D1018',   /* footer deep */
        teal:    '#00C49A',   /* accent */
        ink:     '#111318',   /* primary text */
        muted:   '#6B7072',   /* secondary text */
        ivory:   '#EEEAE3',   /* text on dark */
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        display: ['Playfair Display', 'serif'],
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
