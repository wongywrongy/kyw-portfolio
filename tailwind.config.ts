import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family)', 'Montserrat', 'Inter', 'Noto Sans KR', 'Noto Sans SC', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
        korean: ['Noto Sans KR', 'Montserrat', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        chinese: ['Noto Sans SC', 'Montserrat', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Font options for experimentation
        'space-grotesk': ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'dm-sans': ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'manrope': ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'montserrat': ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Global font scale: Uses CSS variable --font-scale for easy customization
        // Change --font-scale in src/index.css :root to adjust all font sizes sitewide
        'base': ['calc(15px * var(--font-scale))', { lineHeight: '1.6' }],
        // Consistent typography scale (all scaled by --font-scale)
        'xs': ['calc(12px * var(--font-scale))', { lineHeight: '1.5' }],
        'sm': ['calc(13px * var(--font-scale))', { lineHeight: '1.5' }],
        'md': ['calc(15px * var(--font-scale))', { lineHeight: '1.6' }],
        'lg': ['calc(16px * var(--font-scale))', { lineHeight: '1.6' }],
        'xl': ['calc(18px * var(--font-scale))', { lineHeight: '1.6' }],
        '2xl': ['calc(20px * var(--font-scale))', { lineHeight: '1.5' }],
        '3xl': ['calc(24px * var(--font-scale))', { lineHeight: '1.4' }],
        '4xl': ['calc(30px * var(--font-scale))', { lineHeight: '1.3' }],
        '5xl': ['calc(36px * var(--font-scale))', { lineHeight: '1.2' }],
        '6xl': ['calc(48px * var(--font-scale))', { lineHeight: '1.1' }],
        '7xl': ['calc(60px * var(--font-scale))', { lineHeight: '1.1' }],
        '8xl': ['calc(72px * var(--font-scale))', { lineHeight: '1.1' }],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        'glass': '0 10px 30px -10px rgb(0 0 0 / 0.3)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
      },
      colors: {
        'bg-1': 'hsl(var(--bg-1))',
        'fg-1': 'hsl(var(--fg-1))',
        'c1': 'hsl(var(--c1))',
        'c2': 'hsl(var(--c2))',
        'c3': 'hsl(var(--c3))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(135deg, hsl(var(--bg-1)) 0%, hsl(var(--bg-1) / 0.8) 50%, hsl(var(--c1) / 0.1) 100%)',
      },
      animation: {
        'move1': 'move1 40s ease-in-out infinite alternate',
        'move2': 'move2 53s ease-in-out infinite alternate',
        'spin': 'spin 60s linear infinite',
        'drift1': 'drift1 70s ease-in-out infinite alternate',
        'drift2': 'drift2 55s ease-in-out infinite alternate',
        'drift3': 'drift3 80s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        move1: {
          '0%': { '--x1': '20%', '--y1': '30%' },
          '100%': { '--x1': '80%', '--y1': '70%' },
        },
        move2: {
          '0%': { '--x2': '80%', '--y2': '70%' },
          '100%': { '--x2': '20%', '--y2': '30%' },
        },
        spin: {
          'to': { '--a': '360deg' },
        },
        drift1: {
          '0%': { transform: 'translate3d(-2%, -1%, 0)' },
          '100%': { transform: 'translate3d(2%, 1%, 0)' },
        },
        drift2: {
          '0%': { transform: 'translate3d(1%, -2%, 0)' },
          '100%': { transform: 'translate3d(-1%, 2%, 0)' },
        },
        drift3: {
          '0%': { transform: 'translate3d(1%, 1%, 0)' },
          '100%': { transform: 'translate3d(-1%, -1%, 0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
