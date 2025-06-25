/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Purple-gray background system (from #625B71)
        background: {
          'primary': '#4A3D5C',     // Deeper purple-gray for better contrast
          'secondary': '#5C4F6E',   // Medium purple-gray
          'tertiary': '#6E6280',    // Lighter purple-gray for elevated surfaces
          'subtle': '#7A6F84',      // Light purple-gray for overlays
        },
        
        // Surface colors for cards and elevated content
        surface: {
          'elevated': '#5C4F6E',    // Cards and elevated content
          'hover': '#6E6280',      // Hover states
          'active': '#7A6F84',     // Active states
          'border': '#8A7F94',     // Borders and dividers
        },

        // High contrast text system - optimized for purple background
        text: {
          'primary': '#FFFFFF',     // Pure white for maximum contrast
          'secondary': '#F8F8F8',   // Near white for body text
          'tertiary': '#E8E8E8',    // Light gray for supporting text
          'quaternary': '#D0D0D0',  // Medium gray for subtle text
          'muted': '#B8B8B8',       // Muted text
          'disabled': '#A0A0A0',    // Disabled state
        },

        // Bold experimental accent system - optimized versions
        experimental: {
          // Electric yellow/lime (main CTA) - optimized from #EEFF00
          'electric': '#F0FF00',
          'electric-hover': '#E6F500',
          'electric-light': '#F5FF66',
          'electric-subtle': '#F9FF99',
          
          // Bright pink (headings/accents) - optimized from #FF94EB
          'pink': '#FF8AE8',
          'pink-hover': '#FF7FE6',
          'pink-light': '#FFA3ED',
          'pink-subtle': '#FFCCF5',
          
          // Deep purple (supporting accent)
          'purple': '#6E6280',
          'purple-hover': '#7A6F84',
          'purple-light': '#8A7F94',
          'purple-subtle': '#9A8FA3',
        },

        // Keep accent structure for compatibility
        accent: {
          // Primary electric yellow (main call-to-action)
          'primary': '#F0FF00',
          'primary-hover': '#E6F500',
          'primary-light': '#F5FF66',
          'primary-subtle': '#F9FF99',
          
          // Secondary bright pink (headings/accents)
          'secondary': '#FF8AE8',
          'secondary-hover': '#FF7FE6',
          'secondary-light': '#FFA3ED',
          'secondary-subtle': '#FFCCF5',
          
          // Tertiary deep purple (supporting)
          'tertiary': '#6E6280',
          'tertiary-hover': '#7A6F84',
          'tertiary-light': '#8A7F94',
          'tertiary-subtle': '#9A8FA3',
        },

        // Refined semantic colors that work with pink theme
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2', 
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },

        // Legacy compatibility (gradually migrate away from these)
        gruvbox: {
          // Updated to work with pink theme
          'dark-hard': '#E85FD7',
          'dark': '#F070E0',
          'dark-soft': '#F885E8',
          
          // Light backgrounds (for modals, etc)
          'light-hard': '#ffffff',
          'light': '#f8f8f8',
          'light-soft': '#f0f0f0',
          
          // Updated grays
          'gray-244': '#7A6F84',
          'gray-245': '#9B8FA3',
          
          // Bold experimental colors
          'red': '#ff4757',
          'red-bright': '#ff6b7a',
          'green': '#2ed573',
          'green-bright': '#7bed9f',
          'yellow': '#D4FF00',      // Electric yellow
          'yellow-bright': '#E8FF66',
          'blue': '#3742fa',
          'blue-bright': '#5352ed',
          'purple': '#4A3D5C',      // Deep purple
          'purple-bright': '#625B71',
          'aqua': '#26d0ce',
          'aqua-bright': '#7efff5',
          'orange': '#FF6BE6',      // Bright pink
          'orange-bright': '#FF5AE3',
          
          // High contrast foregrounds
          'fg0': '#1A0E17',
          'fg1': '#2D1B28',
          'fg2': '#4A3145',
          'fg3': '#625B71',
          'fg4': '#7A6F84',
        },

        // Updated primary scale
        primary: {
          50: '#FFE6FC',
          100: '#FFB3F1',
          200: '#FF94EB',
          300: '#FF6BE6',
          400: '#F885E8',
          500: '#F070E0',
          600: '#E85FD7',
          700: '#D84EC8',
          800: '#C73DB9',
          900: '#B62CAA',
          950: '#A51B9B',
        },
      },
      fontFamily: {
        sans: [
          'Inter', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'Helvetica Neue', 
          'Arial', 
          'sans-serif'
        ],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        display: [
          'Inter', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'sans-serif'
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }], 
        'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.015em' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.035em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.045em' }],
        '8xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.05em' }],
        '9xl': ['8rem', { lineHeight: '1', letterSpacing: '-0.055em' }],
      },
      fontWeight: {
        'thin': '100',
        'extralight': '200', 
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.1',
        'snug': '1.3', 
        'normal': '1.5',
        'relaxed': '1.6',
        'loose': '1.8',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
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
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 255, 0, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 255, 0, 0.6)' },
        },
      },
      boxShadow: {
        'elegant': '0 1px 3px 0 rgba(26, 14, 23, 0.3), 0 1px 2px 0 rgba(26, 14, 23, 0.18)',
        'elegant-lg': '0 10px 15px -3px rgba(26, 14, 23, 0.3), 0 4px 6px -2px rgba(26, 14, 23, 0.18)',
        'elegant-xl': '0 20px 25px -5px rgba(26, 14, 23, 0.35), 0 10px 10px -5px rgba(26, 14, 23, 0.2)',
        'neon-electric': '0 0 20px rgba(212, 255, 0, 0.4), 0 0 40px rgba(212, 255, 0, 0.2)',
        'neon-purple': '0 0 20px rgba(74, 61, 92, 0.4), 0 0 40px rgba(74, 61, 92, 0.2)',
        'neon-pink': '0 0 20px rgba(255, 107, 230, 0.4), 0 0 40px rgba(255, 107, 230, 0.2)',
      },
    },
  },
  plugins: [],
}