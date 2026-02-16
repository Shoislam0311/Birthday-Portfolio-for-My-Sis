import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from 'sonner';

// Sections
import Hero from './sections/PremiumHero';
import Gallery from './sections/Gallery';
import Timeline from './sections/Timeline';
import QuoteSection from './sections/QuoteSection';
import Wish from './sections/Wish';
import Cake from './sections/Cake';
import SendWish from './sections/SendWish';
import PremiumFooter from './sections/PremiumFooter';
import LoadingScreen from './sections/LoadingScreen';
import MusicPlayer from './components/MusicPlayer';
import CustomCursor from './components/CustomCursor';
import MobileNavigation from './components/MobileNavigation';
import ParticleBackground from './components/ui/particle-background';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setMusicEnabled(true), 500);
  };

  return (
    <div className="relative bg-electric-charcoal min-h-screen text-electric-soft-grey overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Background Music Player */}
      <MusicPlayer enabled={musicEnabled} />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Cinematic Background Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-charcoal via-electric-deep-plum/20 to-electric-charcoal" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-electric-violet/8 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Gallery />
        <Timeline />
        <QuoteSection />
        <Wish />
        <Cake />
        <SendWish />
        <PremiumFooter />
      </main>

      {/* Desktop Navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
        {['Hero', 'Gallery', 'Timeline', 'Wish', 'Cake'].map((section, index) => (
          <button
            key={section}
            onClick={() => {
              const sections = document.querySelectorAll('section');
              sections[index]?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${section}`}
          >
            <span className="absolute right-10 text-xs text-electric-violet/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium tracking-wide">
              {section}
            </span>
            <div className="w-2 h-2 rounded-full bg-electric-soft-grey/40 group-hover:bg-electric-violet group-hover:w-4 transition-all duration-200" />
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