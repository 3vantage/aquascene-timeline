import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add standard Tailwind colors
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        yellow: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Primary Aquascaping Colors
        primary: {
          DEFAULT: '#2D5A3D', // Deep Forest Green
          light: '#4A7C59',   // Sage Green
          dark: '#1A3A2E',    // Dark Forest
        },
        secondary: {
          DEFAULT: '#4A90A4', // Clear Water Blue
          light: '#87CEEB',   // Light Aqua
          dark: '#1E3A5F',    // Ocean Depth
        },
        accent: {
          DEFAULT: '#6B9B7C', // Soft Eucalyptus
          light: '#A8C9B0',   // Mint Whisper
          coral: '#FF6B6B',   // Living Coral
          emerald: '#1A8B42', // Vibrant Emerald
        },
        // Neutral Foundation
        neutral: {
          50: '#FAFAFA',      // Off-White
          100: '#F8F9FA',     // Light Gray
          200: '#F5F1E8',     // Sand Beige
          300: '#E5E7EB',     // Subtle dividers
          400: '#9CA3AF',     // Medium Gray
          500: '#6C757D',     // Secondary text
          600: '#4B5563',     // Dark secondary
          700: '#374151',     // Primary text
          800: '#1F2937',     // Dark text
          900: '#111827',     // Charcoal
        },
        // Status Colors
        success: '#28A745',
        warning: '#FFC107',
        error: '#DC3545',
        info: '#17A2B8',
        // Glass morphism effects
        glass: {
          white: 'rgba(255, 255, 255, 0.1)',
          blue: 'rgba(74, 144, 164, 0.1)',
          dark: 'rgba(45, 90, 61, 0.1)',
        }
      },
      fontFamily: {
        primary: ['Inter', 'system-ui', 'sans-serif'],
        secondary: ['Source Sans Pro', 'system-ui', 'sans-serif'],
        accent: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.4' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.6' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        'hero': ['clamp(2.5rem, 4vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 0 10px rgba(255, 255, 255, 0.1)',
        'underwater': '0 25px 50px -12px rgba(45, 90, 61, 0.25)',
        'coral': '0 4px 15px rgba(255, 107, 107, 0.3)',
        'emerald': '0 4px 15px rgba(26, 139, 66, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bubble': 'bubble 8s ease-in-out infinite',
        'bubble-rise': 'bubble-rise 4s linear infinite',
        'particle-drift': 'particle-drift 6s ease-in-out infinite',
        'wave': 'wave 3s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'fish-swim': 'fishSwim 8s linear infinite',
        'plant-sway': 'plantSway 4s ease-in-out infinite',
        'light-caustics': 'lightCaustics 8s linear infinite',
        'water-flow': 'water-flow 8s ease-in-out infinite',
        'underwater-glow': 'underwater-glow 4s ease-in-out infinite',
        'light-rays': 'light-rays 6s linear infinite',
        'gentle-float': 'gentle-float 6s ease-in-out infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        bubble: {
          '0%': { transform: 'translateY(100vh) scale(0)' },
          '10%': { transform: 'translateY(90vh) scale(1)' },
          '90%': { transform: 'translateY(10vh) scale(1)' },
          '100%': { transform: 'translateY(0vh) scale(0)' }
        },
        'bubble-rise': {
          '0%': { transform: 'translateY(100vh) scale(0) rotate(0deg)', opacity: '0' },
          '10%': { transform: 'translateY(90vh) scale(0.8) rotate(45deg)', opacity: '0.4' },
          '50%': { transform: 'translateY(50vh) scale(1) rotate(180deg)', opacity: '0.8' },
          '90%': { transform: 'translateY(10vh) scale(1.2) rotate(315deg)', opacity: '0.4' },
          '100%': { transform: 'translateY(-10vh) scale(0) rotate(360deg)', opacity: '0' }
        },
        'particle-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(0.5) rotate(0deg)', opacity: '0.3' },
          '25%': { transform: 'translate(20px, -10px) scale(0.8) rotate(90deg)', opacity: '0.7' },
          '50%': { transform: 'translate(-10px, -20px) scale(1) rotate(180deg)', opacity: '1' },
          '75%': { transform: 'translate(-20px, -5px) scale(0.8) rotate(270deg)', opacity: '0.7' }
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(10px) rotate(1deg)' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        fishSwim: {
          '0%': { transform: 'translateX(-100px) translateY(0px)' },
          '25%': { transform: 'translateX(25vw) translateY(-20px)' },
          '50%': { transform: 'translateX(50vw) translateY(20px)' },
          '75%': { transform: 'translateX(75vw) translateY(-10px)' },
          '100%': { transform: 'translateX(100vw) translateY(0px)' }
        },
        plantSway: {
          '0%, 100%': { transform: 'rotate(0deg) skewX(0deg)' },
          '25%': { transform: 'rotate(2deg) skewX(1deg)' },
          '50%': { transform: 'rotate(0deg) skewX(0deg)' },
          '75%': { transform: 'rotate(-2deg) skewX(-1deg)' }
        },
        lightCaustics: {
          '0%': { transform: 'translateX(-100px) translateY(-100px) rotate(0deg)' },
          '100%': { transform: 'translateX(100px) translateY(100px) rotate(360deg)' }
        }
      },
      // Custom CSS variables for dynamic theming
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}

export default config