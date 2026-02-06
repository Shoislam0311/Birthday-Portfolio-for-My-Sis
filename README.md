# 🎉 Bubu's Birthday Celebration Website

<div align="center">

![Birthday Celebration](https://img.shields.io/badge/🎂-Birthday%20Celebration-blue?style=for-the-badge&logo=github)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css)
![Backend](https://img.shields.io/badge/Backend-API-Integrated-green?style=for-the-badge&logo=node.js)

**A modern, interactive birthday celebration microsite with complete backend integration, built with React 19, TypeScript, and GSAP animations**

[🚀 Live Demo](#-live-demo) • [✨ Features](#-features) • [🛠️ Tech Stack](#-tech-stack) • [🏃‍♂️ Getting Started](#-getting-started) • [🔧 Backend API](#-backend-api)

</div>

---

## 🎯 About

This is a beautiful, interactive birthday celebration website created specifically for Bubu. The site features stunning animations, interactive elements, and a seamless user experience that brings joy and celebration to the special day.

## ✨ Features

### 🎨 **Visual Experience**
- **Modern Glassmorphism Design** - Sleek, frosted glass effects throughout
- **21st.dev UI Patterns** - Modern mobile-first design with enhanced glassmorphism
- **GSAP Animations** - Smooth, professional animations powered by GSAP
- **Custom Cursor** - Interactive cursor that responds to user interactions (disabled on mobile)
- **Responsive Design** - Perfectly optimized for all devices and screen sizes
- **Luxury Color Scheme** - Premium black and blue aesthetic with glass effects
- **Mobile-First Approach** - Full touch support and mobile-optimized interactions

### 🔧 **Backend Integration** ✨ NEW
- **Contact Form API** - Serverless API for wish submissions with validation
- **Analytics Tracking** - Real-time user interaction analytics and device breakdown
- **Music Playlist API** - Dynamic playlist management with track metadata
- **User Preferences API** - Personalized settings with localStorage fallback
- **Type-Safe API Client** - Comprehensive TypeScript API integration
- **CORS Enabled** - Cross-origin request support for flexible deployment

### 🎭 **Interactive Sections**
- **Hero Section** - Animated welcome with floating particles and orbs (mobile-optimized)
- **Gallery** - Interactive photo cards with 3D tilt effects and lazy loading (touch-friendly)
- **Wish Message** - Bengali typewriter animation with crystal heart (responsive typography)
- **Cake Section** - Interactive candle-blowing game with confetti (touch-optimized)
- **Send Wish** - Beautiful form with backend integration (mobile-friendly inputs)

### 📊 **Analytics & Insights**
- **Page View Tracking** - Automatic page view analytics
- **Section View Tracking** - Track which sections users visit most
- **Interaction Analytics** - Log button clicks and user interactions
- **Music Playback Analytics** - Track play, pause, and skip events
- **Device Breakdown** - Mobile vs desktop usage statistics
- **Form Submission Tracking** - Track successful wish submissions

### 🎵 **Immersive Experience**
- **Background Music** - Ambient celebration soundtrack (mobile-compatible)
- **Dynamic Playlist** - Load tracks from API with 4 default tracks
- **Custom Loading Screen** - Branded loading animation with progress stages (optimized for mobile)
- **Confetti Celebrations** - Canvas-based particle effects (performance-optimized)
- **Scroll Triggers** - Advanced scroll-based animations (touch-friendly)
- **Mobile Navigation** - Bottom-fixed navigation menu with icons

### 🔒 **Security & Performance**
- **Input Sanitization** - Comprehensive security measures for user inputs
- **Email Validation** - Robust form validation with error handling
- **XSS Protection** - All inputs sanitized before processing
- **Reduced Motion Support** - Accessibility features for motion-sensitive users
- **Performance Optimized** - Lazy loading, code splitting, and optimized animations
- **Mobile Performance** - Optimized for smooth performance on mobile devices

### 📱 **Mobile Compatibility**
- **Full Touch Support** - All interactions work seamlessly on touch devices
- **Responsive Typography** - Font sizes adjust automatically for readability
- **Touch Feedback** - Visual feedback for all touch interactions
- **Mobile Navigation** - Easy-to-use bottom navigation menu with icons
- **Touch Targets** - WCAG-compliant touch target sizes (48x48px minimum)
- **Cross-Device Testing** - Tested on iOS and Android devices
- **Device-Specific Optimizations** - Tailored experience for mobile, tablet, and desktop

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
- **Custom Analytics API** - Built-in analytics tracking and insights

### **Backend Infrastructure**
- **Vercel Serverless Functions** - Node.js API routes
- **TypeScript API** - Fully typed backend with type safety
- **CORS Configuration** - Cross-origin request support
- **Input Validation** - Server-side validation and sanitization

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

### Backend Integration

The website now includes a **complete backend API** for enhanced functionality:

- **Primary Method**: Backend API at `/api/contact-form`
- **Fallback Method**: FormSubmit.co (if API unavailable)
- **Features**: Server-side validation, analytics tracking, error handling
- **Benefits**: Better security, analytics integration, offline support

## 🔧 Backend API

### Overview

The website includes a complete backend infrastructure built with Vercel Serverless Functions, providing APIs for contact forms, analytics, music playlists, and user preferences.

### API Endpoints

#### 1. Contact Form API
- **Endpoint**: `/api/contact-form`
- **Method**: `POST`
- **Features**: Input validation, sanitization, XSS protection
- **Documentation**: See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)

#### 2. Analytics API
- **Endpoint**: `/api/analytics`
- **Methods**: `GET`, `POST`
- **Features**: Real-time tracking, device breakdown, section analytics
- **Documentation**: See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)

#### 3. Music Playlist API
- **Endpoint**: `/api/music-playlist`
- **Methods**: `GET`, `POST`
- **Features**: Dynamic playlist, add/remove tracks, reordering
- **Documentation**: See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)

#### 4. Preferences API
- **Endpoint**: `/api/preferences`
- **Methods**: `GET`, `PUT`, `DELETE`
- **Features**: User settings, device detection, localStorage fallback
- **Documentation**: See [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md)

### Testing API Routes

```bash
# Test analytics
curl http://localhost:5173/api/analytics

# Test contact form
curl -X POST http://localhost:5173/api/contact-form \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'

# Test music playlist
curl http://localhost:5173/api/music-playlist

# Test preferences
curl http://localhost:5173/api/preferences
```

### Detailed Documentation

For comprehensive API documentation, implementation details, and deployment guide, see:
- [BACKEND_INTEGRATION.md](BACKEND_INTEGRATION.md) - Full backend documentation
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Implementation details

## 🎯 Project Structure

```
project/
├── api/                    # Backend API routes (Vercel Serverless Functions)
│   ├── contact-form.ts      # Contact form submission API
│   ├── analytics.ts         # Analytics tracking API
│   ├── music-playlist.ts    # Music playlist management API
│   └── preferences.ts       # User preferences API
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn-inspired UI primitives
│   │   ├── CustomCursor.tsx
│   │   ├── MusicPlayer.tsx # Enhanced with API integration
│   │   ├── MobileNavigation.tsx # Enhanced with 21st.dev patterns
│   │   └── OptimizedImage.tsx  # New: Device-optimized images
│   ├── sections/           # Main page sections
│   │   ├── Hero.tsx       # Welcome section with animations
│   │   ├── Gallery.tsx    # Photo gallery with tilt effects
│   │   ├── Wish.tsx       # Bengali typewriter message
│   │   ├── Cake.tsx       # Interactive cake section
│   │   ├── SendWish.tsx   # Email form with backend integration
│   │   └── LoadingScreen.tsx # Enhanced loading screen
│   ├── hooks/             # Custom React hooks
│   │   ├── useIsMobile.ts
│   │   ├── use-touch.ts
│   │   ├── useTouchFeedback.ts
│   │   ├── useDeviceOptimization.ts  # New: Device detection & optimization
│   │   ├── useAnalytics.ts           # New: Analytics tracking
│   │   └── usePreferences.ts          # New: User preferences management
│   ├── lib/               # Utility functions
│   │   ├── utils.ts
│   │   └── api.ts        # New: Type-safe API client
│   └── App.tsx           # Main application component
├── vercel.json           # Vercel configuration for API routes
├── .env.example         # Environment variable template
├── BACKEND_INTEGRATION.md  # Backend API documentation
└── IMPLEMENTATION_SUMMARY.md # Implementation details
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