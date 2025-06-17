/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gruvbox color palette
        gruvbox: {
          // Dark backgrounds
          'dark-hard': '#1d2021',
          'dark': '#282828',
          'dark-soft': '#32302f',
          
          // Light backgrounds
          'light-hard': '#f9f5d7',
          'light': '#fbf1c7',
          'light-soft': '#f2e5bc',
          
          // Grays
          'gray-244': '#928374',
          'gray-245': '#928374',
          
          // Colors
          'red': '#cc241d',
          'red-bright': '#fb4934',
          'green': '#98971a',
          'green-bright': '#b8bb26',
          'yellow': '#d79921',
          'yellow-bright': '#fabd2f',
          'blue': '#458588',
          'blue-bright': '#83a598',
          'purple': '#b16286',
          'purple-bright': '#d3869b',
          'aqua': '#689d6a',
          'aqua-bright': '#8ec07c',
          'orange': '#d65d0e',
          'orange-bright': '#fe8019',
          
          // Foregrounds
          'fg0': '#fbf1c7',
          'fg1': '#ebdbb2',
          'fg2': '#d5c4a1',
          'fg3': '#bdae93',
          'fg4': '#a89984',
        },
        primary: {
          50: '#f2e5bc',
          100: '#ebdbb2',
          200: '#d5c4a1',
          300: '#bdae93',
          400: '#a89984',
          500: '#928374',
          600: '#689d6a',
          700: '#458588',
          800: '#282828',
          900: '#1d2021',
          950: '#1d2021',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}