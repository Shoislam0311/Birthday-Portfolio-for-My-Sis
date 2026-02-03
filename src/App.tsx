import { useState } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setMusicEnabled(true), 500);
  };

  return (
    <div className="relative bg-white min-h-screen text-neutral-900 overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Background Music Player */}
      <MusicPlayer enabled={musicEnabled} />
      
      {/* Subtle Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 to-white" />
      </div>
      
      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Gallery />
        <Wish />
        <Cake />
        <SendWish />
      </main>
      
      {/* Fixed Navigation */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
        {['Hero', 'Gallery', 'Wish', 'Cake', 'Send Wish'].map((section, index) => (
          <button
            key={section}
            onClick={() => {
              const sections = document.querySelectorAll('section');
              sections[index]?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${section}`}
          >
            <span className="absolute right-8 text-xs text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {section}
            </span>
            <div className="w-2 h-2 rounded-full bg-neutral-300 group-hover:bg-teal-600 group-hover:scale-150 transition-all duration-300" />
          </button>
        ))}
      </nav>
      <Analytics />
      <SpeedInsights />
      <Toaster position="bottom-center" theme="light" />
    </div>
  );
}

export default App;