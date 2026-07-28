# Birthday Portfolio — Modern Interactive Celebration Website

A modern, production-ready, interactive birthday celebration microsite built with React 19, TypeScript, GSAP animations, and Tailwind CSS. Designed to be deployable anywhere and fully configurable.

## ✨ Features

- **Luxury Black-White-Blue Design** — Premium aesthetic with custom color palette
- **GSAP Animations** — Smooth, professional scroll-triggered animations
- **PWA Support** — Installable on any device with manifest and service worker
- **SEO Optimized** — Full Open Graph, Twitter Cards, and meta tags
- **Error Boundaries** — Graceful error recovery UI
- **Lazy Loading** — Code-split sections with React.lazy and Suspense
- **Input Sanitization** — XSS prevention on all form fields
- **Cache Layer** — In-memory cache manager with TTL support
- **Mobile Optimized** — WCAG-compliant touch targets, reduced motion support

## 🛠️ Tech Stack

React 19 + TypeScript 5 + Vite 7 + Tailwind CSS 3 + GSAP 3 + Canvas Confetti + Radix UI + Lucide React + Sonner

## ⚙️ Configuration

The website is fully configurable via `src/config/birthday-config.ts`. Change the following to customize:

```typescript
const config: BirthdayConfig = {
  site: { name: "Your Celebration", url: "https://yoursite.vercel.app" },
  birthdayPerson: { name: "Your Name", nickname: "Your Nick" },
  email: { recipient: "your@email.com" },
  form: { maxNameLength: 50, maxEmailLength: 100, maxWishLength: 500 },
  colors: { primary: "#0066ff" },
  features: { music: true, customCursor: true, loadingScreen: true },
};
```

## 🏃 Getting Started

```bash
pnpm install
pnpm dev        # Development at localhost:5173
pnpm build      # Production build
pnpm preview    # Preview build
```

## 🚀 Deployment

Optimized for Vercel, Netlify, GitHub Pages, or any static host.

## 📄 License

MIT License. Feel free to use, modify, and distribute for personal or commercial purposes.
