# 🎉 Bubu's Birthday Celebration Website

<div align="center">

![Birthday Celebration](https://img.shields.io/badge/🎂-Birthday%20Celebration-blue?style=for-the-badge&logo=github)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.19-38B2AC?style=for-the-badge&logo=tailwind-css)

**A modern, interactive birthday celebration microsite built with React 19, TypeScript, and GSAP animations**

[🚀 Live Demo](#-live-demo) • [✨ Features](#-features) • [🛠️ Tech Stack](#-tech-stack) • [🏃‍♂️ Getting Started](#-getting-started) • [📧 Email Service](#-email-service)

</div>

---

## 🎯 About

This is a beautiful, interactive birthday celebration website created specifically for Bubu. The site features stunning animations, interactive elements, and a seamless user experience that brings joy and celebration to the special day.

## ✨ Features

### 🎨 **Visual Experience**
- **Modern Glassmorphism Design** - Sleek, frosted glass effects throughout
- **GSAP Animations** - Smooth, professional animations powered by GSAP
- **Custom Cursor** - Interactive cursor that responds to user interactions
- **Responsive Design** - Perfectly optimized for all devices and screen sizes
- **Luxury Color Scheme** - Premium black and blue aesthetic with glass effects

### 🎭 **Interactive Sections**
- **Hero Section** - Animated welcome with floating particles and orbs
- **Gallery** - Interactive photo cards with 3D tilt effects and lazy loading
- **Wish Message** - Bengali typewriter animation with crystal heart
- **Cake Section** - Interactive candle-blowing game with confetti
- **Send Wish** - Beautiful form to send personalized birthday messages

### 🎵 **Immersive Experience**
- **Background Music** - Ambient celebration soundtrack
- **Custom Loading Screen** - Branded loading animation
- **Confetti Celebrations** - Canvas-based particle effects
- **Scroll Triggers** - Advanced scroll-based animations

### 🔒 **Security & Performance**
- **Input Sanitization** - Comprehensive security measures for user inputs
- **Email Validation** - Robust form validation with error handling
- **Reduced Motion Support** - Accessibility features for motion-sensitive users
- **Performance Optimized** - Lazy loading and optimized animations

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
├── components/          # Reusable UI components
│   ├── ui/             # shadcn-inspired UI primitives
│   ├── CustomCursor.tsx
│   └── MusicPlayer.tsx
├── sections/           # Main page sections
│   ├── Hero.tsx        # Welcome section with animations
│   ├── Gallery.tsx     # Photo gallery with tilt effects
│   ├── Wish.tsx        # Bengali typewriter message
│   ├── Cake.tsx        # Interactive cake section
│   ├── SendWish.tsx    # Email form with validation
│   └── LoadingScreen.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx            # Main application component
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