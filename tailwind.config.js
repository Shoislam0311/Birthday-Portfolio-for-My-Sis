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
        // Premium Dark Birthday Color Palette
        luxury: {
          black: '#0F0F14',
          violet: '#6C3CF0',
          teal: '#0F3D3E',
          grey: '#E6E8EC',
          plum: '#2A0E3F',
          'violet-light': '#8B6CF0',
          'teal-light': '#1A5A5B',
          'grey-dark': '#A0A4A8',
          white: '#ffffff',
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
        premium: "0 4px 20px rgba(108, 60, 240, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15)",
        "premium-lg": "0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(108, 60, 240, 0.15)",
        "violet-glow": "0 0 30px rgba(108, 60, 240, 0.4), 0 0 60px rgba(108, 60, 240, 0.15)",
        "violet-glow-soft": "0 0 16px rgba(108, 60, 240, 0.3)",
        "teal-glow": "0 0 30px rgba(15, 61, 62, 0.4), 0 0 60px rgba(15, 61, 62, 0.15)",
        "dark-soft": "0 4px 12px rgba(0, 0, 0, 0.2)",
        "dark-deep": "0 12px 32px rgba(0, 0, 0, 0.35)",
        elegant: "0 2px 10px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.08)",
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
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            opacity: 0.4,
            transform: "scale(1)"
          },
          "50%": { 
            opacity: 0.8,
            transform: "scale(1.1)"
          },
        },
        "particle-float": {
          "0%": { 
            transform: "translateY(0) translateX(0)",
            opacity: 0
          },
          "10%": { 
            opacity: 1
          },
          "90%": { 
            opacity: 1
          },
          "100%": { 
            transform: "translateY(-100vh) translateX(20px)",
            opacity: 0
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
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "particle-float": "particle-float 10s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}