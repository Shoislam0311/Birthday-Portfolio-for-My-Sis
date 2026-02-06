import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from 'sonner';

// Sections
import Hero from './sections/Hero';
import Gallery from './sections/Gallery';
import Wish from './sections/Wish';
import Cake from './sections/Cake';
import SendWish from './sections/SendWish';
import LoadingScreen from './sections/LoadingScreen';
import MusicPlayer from './components/MusicPlayer';
import CustomCursor from './components/CustomCursor';
import MobileNavigation from './components/MobileNavigation';

// Hooks
import { useAnalytics } from './hooks/useAnalytics';
import { usePreferences } from './hooks/usePreferences';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const { trackPageView, trackSectionView } = useAnalytics();
  const { preferences, loading: preferencesLoading } = usePreferences();

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Enable music based on preferences after loading
    setTimeout(() => {
      if (preferences?.musicEnabled) {
        setMusicEnabled(true);
      }
    }, 500);
  };

  // Track page view on mount
  useEffect(() => {
    if (!isLoading) {
      trackPageView();
    }
  }, [isLoading, trackPageView]);

  // Track section views on scroll
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const sectionNames = ['Hero', 'Gallery', 'Wish', 'Cake', 'Send Wish'];

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          const sectionName = sectionNames[index];
          if (sectionName) {
            trackSectionView(sectionName);
          }
        }
      });
    };

    const timeoutId = setTimeout(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, trackSectionView]);

  return (
    <div className="relative bg-luxury-black min-h-screen text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Background Music Player - controlled by preferences */}
      <MusicPlayer
        enabled={musicEnabled}
        autoPlay={preferences?.autoPlay || false}
      />

      {/* Subtle Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-luxury-blue/5 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Gallery />
        <Wish />
        <Cake />
        <SendWish />
      </main>

      {/* Desktop Navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
        {['Hero', 'Gallery', 'Wish', 'Cake', 'Send Wish'].map((section, index) => (
          <button
            key={section}
            onClick={() => {
              const sections = document.querySelectorAll('section');
              sections[index]?.scrollIntoView({ behavior: 'smooth' });
              trackSectionView(section);
            }}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${section}`}
          >
            <span className="absolute right-10 text-xs text-luxury-blue/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium tracking-wide">
              {section}
            </span>
            <div className="w-2 h-2 rounded-full bg-luxury-grey group-hover:bg-luxury-blue group-hover:w-4 transition-all duration-200" />
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* Vercel Analytics */}
      <Analytics />
      <SpeedInsights />
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
}

export default App;