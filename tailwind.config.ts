
import type {Config} from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Orbitron', 'Inter', 'sans-serif'],
        headline: ['Orbitron', 'sans-serif'],
        code: ['monospace'],
        digital: ['Digital-7 Mono', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        'team-primary': 'var(--team-primary)',
        'team-secondary': 'var(--team-secondary)',
        'team-accent': 'var(--team-accent)',
        'team-accent-primary': 'var(--team-accent-primary)',
        'team-accent-secondary': 'var(--team-accent-secondary)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      spacing: {
        'p-goalkeeper': '5%',
        'p-defender': '30%',
        'p-winger-y': '55%',
        'p-winger-lx': '10%',
        'p-winger-rx': '10%',
        'p-pivot-top': '80%',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'goal': {
            '0%': { transform: 'scale(0.9)', opacity: '0' },
            '20%': { transform: 'scale(1.05)', opacity: '1' },
            '80%': { transform: 'scale(1.05)', opacity: '1' },
            '100%': { transform: 'scale(1.1)', opacity: '0' },
        },
        'score-pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.2)' },
            '100%': { transform: 'scale(1)' },
        },
         'score-pulse-quick': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '10%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'event-pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
        },
        'event-text-fade': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '20%': { transform: 'scale(1.05)', opacity: '1' },
          '80%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1.1)', opacity: '0' },
        },
        'goal-style-b': {
            '0%': { opacity: '0', transform: 'scale(0.8)' },
            '10%': { opacity: '1', transform: 'scale(1)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'player-name-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'player-name-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-10px)' },
        },
        'celebration-in': {
          '0%': { transform: 'translateX(0)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'celebration-out': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(0)', opacity: '0' },
        },
         'celebration-in-right': {
          '0%': { transform: 'translateX(0)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'celebration-out-right': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '100%': { transform: 'translateX(0)', opacity: '0' },
        },
        'fullscreen-goal-in': {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fullscreen-goal-out': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
        'goal-new-in': {
          '0%': { transform: 'translate(-50%, 100%)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0)', opacity: '1' },
        },
        'goal-new-out': {
            '0%': { transform: 'translate(-50%, 0)', opacity: '1' },
            '100%': { transform: 'translate(-50%, 100%)', opacity: '0' },
        },
        'card-in': {
          '0%': { opacity: '0', transform: 'scale(0.9) rotate(-5deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
        'card-out': {
            '0%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
            '100%': { opacity: '0', transform: 'scale(0.9) rotate(5deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-out-left': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-20px)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'lineup-reveal': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-in-fwd': {
            '0%': {
                transform: 'translateZ(-1400px) translateX(1000px)',
                opacity: '0',
            },
            '100%': {
                transform: 'translateZ(0) translateX(0)',
                opacity: '1',
            },
        },
        'marquee-slow': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'color-pulse': {
          '0%, 100%': { 'background-color': 'hsl(var(--primary))' },
          '50%': { 'background-color': 'hsl(var(--primary) / 0.9)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'goal': 'goal 2s ease-out forwards',
        'score-pulse': 'score-pulse 0.3s ease-out',
        'score-pulse-quick': 'score-pulse-quick 0.5s ease-out',
        'event-pulse': 'event-pulse 0.7s ease-in-out',
        'event-text-fade': 'event-text-fade 2s ease-in-out forwards',
        'goal-style-b': 'goal-style-b 2.5s ease-in-out forwards',
        'player-name-in': 'player-name-in 0.5s ease-out forwards',
        'player-name-out': 'player-name-out 0.5s ease-in forwards',
        'celebration-in': 'celebration-in 0.5s ease-out forwards',
        'celebration-out': 'celebration-out 0.5s ease-in 4.5s forwards',
        'celebration-in-right': 'celebration-in-right 0.5s ease-out forwards',
        'celebration-out-right': 'celebration-out-right 0.5s ease-in 4.5s forwards',
        'fullscreen-goal-in': 'fullscreen-goal-in 0.5s ease-out forwards',
        'fullscreen-goal-out': 'fullscreen-goal-out 0.5s ease-in forwards',
        'goal-new-in': 'goal-new-in 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'goal-new-out': 'goal-new-out 0.7s cubic-bezier(0.5, 0, 0.75, 0) forwards',
        'card-in': 'card-in 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'card-out': 'card-out 0.5s cubic-bezier(0.5, 0, 0.75, 0) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-out': 'fade-out 0.5s ease-in forwards',
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.5s ease-out forwards',
        'fade-out-left': 'fade-out-left 0.5s ease-in forwards',
        'fade-in-right': 'fade-in-right 0.5s ease-out forwards',
        'lineup-reveal': 'lineup-reveal 0.5s ease-out forwards',
        'slide-in-fwd': 'slide-in-fwd 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'marquee-slow': 'marquee-slow 15s linear infinite',
        'color-pulse': 'color-pulse 4s infinite ease-in-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function({ addVariant }) {
      addVariant('landscape', '@media (orientation: landscape)');
      addVariant('portrait', '@media (orientation: portrait)');
    }),
  ],
} satisfies Config;