/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#b026ff',
          blue: '#00ffff',
          pink: '#ff007f',
          dark: '#0a0a0a',
          cyan: '#08f7fe',
          green: '#09fbd3',
          yellow: '#fe53bb',
          purpleDark: '#7122fa',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 1.5s infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(176, 38, 255, 0.8))' },
          '50%': { filter: 'drop-shadow(0 0 5px rgba(176, 38, 255, 0.4))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #08f7fe, 0 0 80px #08f7fe, 0 0 90px #08f7fe, 0 0 100px #08f7fe, 0 0 150px #08f7fe', color: '#fff' },
          '20%, 24%, 55%': { textShadow: 'none', color: '#08f7fe' }
        }
      }
    },
  },
  plugins: [],
}
