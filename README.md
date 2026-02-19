# 🎉 Bubu's Birthday Celebration Website

<div align="center">

![Birthday Celebration](https://img.shields.io/badge/🎂-Birthday%20Celebration-blue?style=for-the-badge&logo=github)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, interactive birthday celebration microsite built with React 19, TypeScript, and GSAP animations**

[🚀 Live Demo](#-live-demo) • [✨ Features](#-features) • [🛠️ Tech Stack](#-tech-stack) • [🏃‍♂️ Getting Started](#-getting-started) • [🗄️ Supabase Backend](#️-supabase-backend) • [📧 Email Service](#-email-service)

</div>

---

## 🎯 About

This is a beautiful, interactive birthday celebration website created specifically for Bubu. The site features stunning animations, interactive elements, and a seamless user experience that brings joy and celebration to the special day.

## ✨ Features

### 🎨 **Visual Experience**
- **Modern Glassmorphism Design** - Sleek, frosted glass effects throughout
- **GSAP Animations** - Smooth, professional animations powered by GSAP
- **Custom Cursor** - Interactive cursor that responds to user interactions (disabled on mobile)
- **Responsive Design** - Perfectly optimized for all devices and screen sizes
- **Luxury Color Scheme** - Premium black and blue aesthetic with glass effects
- **Mobile-First Approach** - Full touch support and mobile-optimized interactions

### 🎭 **Interactive Sections**
- **Hero Section** - Animated welcome with floating particles and orbs (mobile-optimized)
- **Gallery** - Interactive photo cards with 3D tilt effects and lazy loading (touch-friendly)
- **Wish Message** - Bengali typewriter animation with crystal heart (responsive typography)
- **Cake Section** - Interactive candle-blowing game with confetti (touch-optimized)
- **Send Wish** - Beautiful form to send personalized birthday messages (mobile-friendly inputs)

### 🎵 **Immersive Experience**
- **Background Music** - Ambient celebration soundtrack (mobile-compatible)
- **Custom Loading Screen** - Branded loading animation (optimized for mobile)
- **Confetti Celebrations** - Canvas-based particle effects (performance-optimized)
- **Scroll Triggers** - Advanced scroll-based animations (touch-friendly)
- **Mobile Navigation** - Bottom-fixed navigation menu for easy access

### 🔒 **Security & Performance**
- **Input Sanitization** - Comprehensive security measures for user inputs
- **Email Validation** - Robust form validation with error handling
- **Reduced Motion Support** - Accessibility features for motion-sensitive users
- **Performance Optimized** - Lazy loading and optimized animations
- **Mobile Performance** - Optimized for smooth performance on mobile devices

### 📱 **Mobile Compatibility**
- **Full Touch Support** - All interactions work seamlessly on touch devices
- **Responsive Typography** - Font sizes adjust automatically for readability
- **Touch Feedback** - Visual feedback for all touch interactions
- **Mobile Navigation** - Easy-to-use bottom navigation menu
- **Touch Targets** - WCAG-compliant touch target sizes (48x48px minimum)
- **Cross-Device Testing** - Tested on iOS and Android devices

## 🛠️ Tech Stack

### **Frontend Framework**
- **[React 19.2.0](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite 7.2.4](https://vitejs.dev/)** - Lightning-fast build tool

### **Styling & UI**
- **[Tailwind CSS 3.4.19](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Custom Design System](https://ui.shadcn.com/)** - shadcn-inspired components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives

### **Animations & Effects**
- **[GSAP 3.14.2](https://greensock.com/gsap/)** - Professional animation library
- **[Canvas Confetti 1.9.4](https://www.npmjs.com/package/canvas-confetti)** - Celebration effects
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### **Form Handling**
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### **Analytics & Monitoring**
- **[Vercel Analytics](https://vercel.com/analytics)** - Web analytics
- **[Vercel Speed Insights](https://vercel.com/speed-insights)** - Performance monitoring

## 🏃‍♂️ Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bubu-birthday-celebration
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 🗄️ Supabase Backend

The site includes an optional Supabase backend that adds:

- **Dynamic Gallery** — Manage photos via Supabase Storage instead of hardcoded Imgur URLs.
- **Wish Submissions** — Birthday wishes are stored in a Supabase database table.
- **Hidden Admin Panel** — Access `/admin` to view wishes, manage photos, and configure settings.
- **Graceful Fallback** — If Supabase is not configured, the site works identically to the original using hardcoded fallback data.

### Quick Setup

```bash
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
```

Run `supabase/schema.sql` in your Supabase SQL Editor, then start the dev server.

📖 **Full guide:** [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

### Admin Panel

Navigate to `/admin` on your deployed site. The default password is `admin123` — **change it immediately** via the Settings tab or in your Supabase `site_settings` table.

### Rebrand Config

Edit `src/config/site.config.ts` to change the birthday person's name, notification email, fallback photos, and more — all in one place.

---

## 📧 Email Service

### FormSubmit.co Integration

The website includes a fully functional **automatic email sender** that sends birthday wishes directly to Bubu's email:

- **Service**: [FormSubmit.co](https://formsubmit.co/) - Free form-to-email service
- **Recipient**: zuyairiaislam5@gmail.com
- **Features**:
  - Automatic email delivery without backend
  - Form validation and sanitization
  - Success/error notifications
  - Anti-spam protection
  - JSON API responses

### How It Works

1. User fills out the "Send Wish" form
2. Form data is sanitized and validated
3. Request sent to FormSubmit.co API
4. Email automatically delivered to Bubu's inbox
5. User receives success confirmation with confetti celebration

## 🎯 Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn-inspired UI primitives
│   ├── admin/                 # Admin panel components
│   │   ├── LoginForm.tsx
│   │   ├── WishesManager.tsx
│   │   ├── PhotosManager.tsx
│   │   └── SettingsManager.tsx
│   ├── CustomCursor.tsx
│   └── MusicPlayer.tsx
├── config/
│   └── site.config.ts         # ← Rebrand everything here
├── hooks/
│   ├── usePhotos.ts           # Gallery photo fetching
│   ├── useWishes.ts           # Wish CRUD
│   ├── useSiteSettings.ts     # Site settings
│   └── useAdminAuth.ts        # Admin session auth
├── lib/
│   ├── api.ts                 # Supabase API helpers
│   ├── supabase.ts            # Supabase client
│   └── utils.ts               # cn() utility
├── pages/
│   └── Admin.tsx              # Hidden admin page (/admin)
├── sections/
│   ├── Hero.tsx
│   ├── Gallery.tsx            # Now fetches from Supabase
│   ├── Wish.tsx
│   ├── Cake.tsx
│   ├── SendWish.tsx           # Now saves to Supabase
│   └── LoadingScreen.tsx
├── types/
│   └── database.types.ts      # Supabase table types
└── App.tsx                    # React Router + public site

supabase/
└── schema.sql                 # Run this in Supabase SQL Editor
```

## 🌟 Key Features in Detail

### Animation System
- **GSAP Timelines** - Coordinated animation sequences
- **Scroll Triggers** - Scroll-based animation triggers
- **Custom Easings** - Smooth, natural motion curves
- **Performance Optimized** - GPU-accelerated animations

### Security Features
- **Input Sanitization** - XSS prevention
- **Email Validation** - Robust email format checking
- **Length Limits** - Prevents form abuse
- **Security Headers** - Proper API request headers

### User Experience
- **Loading States** - Visual feedback during form submission
- **Error Handling** - Graceful error management
- **Success Celebrations** - Confetti and animations
- **Mobile Optimized** - Touch-friendly interactions

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
```javascript
luxury: {
  black: '#000000',
  blue: '#0066ff',
  grey: '#6b7280',
  white: '#ffffff'
}
```

### Animations
GSAP animations can be modified in individual component files. The main timeline is configured in `App.tsx`.

### Email Settings
To change the recipient email, update the endpoint in `src/sections/SendWish.tsx`:
```typescript
const response = await fetch("https://formsubmit.co/ajax/YOUR_EMAIL@gmail.com", {
```

## 🚀 Deployment

This project is optimized for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 📝 License

This project is created for Bubu's birthday celebration. All rights reserved.

## 💝 Made with Love

This website was crafted with modern web technologies and lots of love to make Bubu's birthday truly special! 🎂✨

---

<div align="center">

**Happy Birthday, Bubu! 🎉🎂🎈**

[⬆ Back to Top](#-bubus-birthday-celebration-website)

</div>