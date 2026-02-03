/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Luxury Color Palette
        gold: {
          50: '#F9F4E8',
          100: '#F5ECD7',
          200: '#EBD9B2',
          300: '#E1C68D',
          400: '#D7B368',
          500: '#D4AF37',
          600: '#B8952F',
          700: '#9C7B27',
          800: '#80611F',
          900: '#644717',
        },
        platinum: {
          50: '#F5F5F5',
          100: '#EBEBEB',
          200: '#D7D7D7',
          300: '#C3C3C3',
          400: '#AFAFAF',
          500: '#9B9B9B',
          600: '#C0C0C0',
          700: '#8C8C8C',
          800: '#787878',
          900: '#646464',
        },
        charcoal: {
          50: '#1A1A1A',
          100: '#0D0D0D',
          200: '#0A0A0A',
          300: '#080808',
          400: '#060606',
          500: '#050505',
          600: '#040404',
          700: '#030303',
          800: '#020202',
          900: '#010101',
        },
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E8E8E8',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        minimal: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "minimal-lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        premium: "0 4px 20px rgba(212, 175, 55, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)",
        "premium-lg": "0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(212, 175, 55, 0.1)",
        "gold-glow": "0 0 30px rgba(212, 175, 55, 0.3), 0 0 60px rgba(212, 175, 55, 0.1)",
        elegant: "0 2px 10px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "shimmer-btn-shimmer-slide": {
          to: {
            transform: "translate(calc(100cqw - 100%))",
          },
        },
        "shimmer-btn-spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "40%, 60%": {
            transform: "translateZ(0) rotate(180deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "90%, 100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "fade-in": {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)"
          },
        },
        "slide-in-left": {
          "0%": { 
            opacity: "0",
            transform: "translateX(-30px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateX(0)"
          },
        },
        "slide-in-right": {
          "0%": { 
            opacity: "0",
            transform: "translateX(30px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateX(0)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        grid: "grid 15s linear infinite",
        "shimmer-btn-shimmer-slide": "shimmer-btn-shimmer-slide var(--speed) ease-in-out infinite alternate",
        "shimmer-btn-spin-around": "shimmer-btn-spin-around calc(var(--speed) * 2) infinite linear",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        rainbow: "rainbow 2s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-in-left": "slide-in-left 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}