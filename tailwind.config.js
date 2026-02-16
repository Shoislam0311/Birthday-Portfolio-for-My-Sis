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
        // Luxury Black-White-Blue Color Palette
        luxury: {
          black: '#000000',
          white: '#ffffff',
          blue: '#0066ff',
          'blue-dark': '#003d99',
          'blue-light': '#e6f2ff',
          grey: '#d4d4d4',
        },
        // Premium Electric Violet Theme
        electric: {
          'charcoal': '#0F0F14',
          'violet': '#6C3CF0',
          'violet-light': '#8B5CF6',
          'violet-dark': '#4C1D95',
          'muted-teal': '#0F3D3E',
          'soft-grey': '#E6E8EC',
          'deep-plum': '#2A0E3F',
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
        premium: "0 4px 20px rgba(0, 102, 255, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)",
        "premium-lg": "0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 102, 255, 0.1)",
        "blue-glow": "0 0 30px rgba(0, 102, 255, 0.3), 0 0 60px rgba(0, 102, 255, 0.1)",
        "blue-glow-soft": "0 0 16px rgba(0, 102, 255, 0.2)",
        "dark-soft": "0 4px 12px rgba(0, 0, 0, 0.15)",
        "dark-deep": "0 12px 32px rgba(0, 0, 0, 0.3)",
        elegant: "0 2px 10px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.05)",
        // Neon Glow Effects
        "neon-violet": "0 0 20px rgba(108, 60, 240, 0.5), 0 0 40px rgba(108, 60, 240, 0.3), 0 0 60px rgba(108, 60, 240, 0.1)",
        "neon-violet-intense": "0 0 30px rgba(108, 60, 240, 0.7), 0 0 60px rgba(108, 60, 240, 0.5), 0 0 90px rgba(108, 60, 240, 0.3)",
        "neon-violet-soft": "0 0 15px rgba(108, 60, 240, 0.3), 0 0 30px rgba(108, 60, 240, 0.15)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
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
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 20px rgba(108, 60, 240, 0.5)" },
          "50%": { opacity: "0.8", boxShadow: "0 0 40px rgba(108, 60, 240, 0.8)" },
        },
        "spotlight-move": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
        "particle-rise": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(100px) scale(0)"
          },
          "50%": { 
            opacity: "1"
          },
          "100%": { 
            opacity: "0", 
            transform: "translateY(-100px) scale(1)"
          },
        },
        "neon-pulse": {
          "0%, 100%": { 
            textShadow: "0 0 10px rgba(108, 60, 240, 0.8), 0 0 20px rgba(108, 60, 240, 0.6), 0 0 30px rgba(108, 60, 240, 0.4)"
          },
          "50%": { 
            textShadow: "0 0 20px rgba(108, 60, 240, 1), 0 0 40px rgba(108, 60, 240, 0.8), 0 0 60px rgba(108, 60, 240, 0.6)"
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
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-medium": "float-medium 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spotlight-move": "spotlight-move 20s linear infinite",
        "particle-rise": "particle-rise 8s ease-in-out infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}