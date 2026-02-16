import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from 'sonner';

// Sections
import Hero from './sections/Hero';
import Timeline from './sections/Timeline';
import Gallery from './sections/Gallery';
import QuoteSection from './sections/QuoteSection';
import Footer from './sections/Footer';
import LoadingScreen from './sections/LoadingScreen';
import MusicPlayer from './components/MusicPlayer';
import CustomCursor from './components/CustomCursor';
import MobileNavigation from './components/MobileNavigation';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setMusicEnabled(true), 500);
  };

  return (
    <div className="relative bg-luxury-black min-h-screen text-luxury-grey overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Background Music Player */}
      <MusicPlayer enabled={musicEnabled} />

      {/* Premium Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-luxury-gradient" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-luxury-violet/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-luxury-teal/5 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Gallery />
        <QuoteSection />
        <Footer />
      </main>

      {/* Desktop Navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
        {['Hero', 'Timeline', 'Gallery', 'Quotes', 'Contact'].map((section, index) => (
          <button
            key={section}
            onClick={() => {
              const sections = document.querySelectorAll('section');
              sections[index]?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${section}`}
          >
            <span className="absolute right-10 text-xs text-luxury-violet/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold tracking-wide uppercase">
              {section}
            </span>
            <div className="w-3 h-3 rounded-full bg-luxury-violet/30 group-hover:bg-luxury-violet group-hover:w-5 transition-all duration-300 glow-violet-soft" />
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigation />

      <Analytics />
      <SpeedInsights />
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
}

export default App;