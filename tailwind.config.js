/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          secondary: '#F7F9F8',
          soft: '#F3F7F5',
          dark: '#101828',
          muted: '#667085',
          border: '#E5E7EB',
          // Primary Growth Green
          green: {
            DEFAULT: '#059669',
            light: '#10B981',
            dark: '#047857',
            soft: '#ECFDF5',
            border: '#A7F3D0'
          },
          // Subtle Google Blue
          blue: {
            DEFAULT: '#1A73E8',
            light: '#3B82F6',
            soft: '#E8F0FE',
            border: '#BFDBFE'
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(16, 24, 40, 0.05), 0 1px 4px -1px rgba(16, 24, 40, 0.03)',
        'soft-md': '0 8px 24px -4px rgba(16, 24, 40, 0.08), 0 4px 12px -2px rgba(16, 24, 40, 0.04)',
        'soft-lg': '0 16px 36px -6px rgba(16, 24, 40, 0.1), 0 8px 20px -4px rgba(16, 24, 40, 0.04)',
        'green-glow': '0 10px 25px -5px rgba(16, 185, 129, 0.18)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      },
      animation: {
        'pulse-slow': 'pulseSlow 4s ease-in-out infinite',
        'float': 'float 5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
