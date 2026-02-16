import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from 'sonner';

// Sections
import Hero from './sections/Hero';
import Gallery from './sections/Gallery';
import MusicDedication from './sections/MusicDedication';
import Wish from './sections/Wish';
import Cake from './sections/Cake';
import SendWish from './sections/SendWish';
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
  };

  const handleStarted = () => {
    setMusicEnabled(true);
  };

  return (
    <div className="relative bg-luxury-black min-h-screen text-white overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && (
        <LoadingScreen
          onComplete={handleLoadingComplete}
          onStarted={handleStarted}
        />
      )}

      {/* Background Music Player */}
      <MusicPlayer enabled={musicEnabled} />

      {/* Subtle Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-luxury-blue/5 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Gallery />
        <MusicDedication />
        <Wish />
        <Cake />
        <SendWish />
      </main>

      {/* Desktop Navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6">
        {['Hero', 'Gallery', 'Song', 'Wish', 'Cake', 'Send Wish'].map((section, index) => (
          <button
            key={section}
            onClick={() => {
              const sections = document.querySelectorAll('section');
              sections[index]?.scrollIntoView({ behavior: 'smooth' });
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

      <Analytics />
      <SpeedInsights />
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
}

export default App;
