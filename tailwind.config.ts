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
        'wave': 'wave 3s ease-in-out infinite',
        'ripple': 'ripple 0.6s ease-out',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'fish-swim': 'fishSwim 8s linear infinite',
        'plant-sway': 'plantSway 4s ease-in-out infinite',
        'light-caustics': 'lightCaustics 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        bubble: {
          '0%': { transform: 'translateY(100vh) scale(0)' },
          '10%': { transform: 'translateY(90vh) scale(1)' },
          '90%': { transform: 'translateY(10vh) scale(1)' },
          '100%': { transform: 'translateY(0vh) scale(0)' }
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