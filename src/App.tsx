import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from 'sonner';

// Sections
import Hero from './sections/Hero';
import Gallery from './sections/Gallery';
import Timeline from './sections/Timeline';
import Quote from './sections/Quote';
import SendWish from './sections/SendWish';
import Footer from './sections/Footer';
import LoadingScreen from './sections/LoadingScreen';
import MusicPlayer from './components/MusicPlayer';
import CustomCursor from './components/CustomCursor';
import MobileNavigation from './components/MobileNavigation';
import Particles from './components/Particles';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setMusicEnabled(true), 500);
  };

  const navItems = [
    { name: 'Edition 2026', id: 'home' },
    { name: 'Legacy', id: 'timeline' },
    { name: 'Archives', id: 'gallery' },
    { name: 'Celebrate', id: 'celebrate' },
    { name: 'Transmission', id: 'send-wish' }
  ];

  return (
    <div className="relative bg-premium-black min-h-screen text-premium-grey overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Background Music Player */}
      <MusicPlayer enabled={musicEnabled} />

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-premium-black" />
        <Particles />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(108,60,240,0.05),transparent_70%)]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Quote />
        <Gallery />
        <SendWish />
        <Footer />
      </main>

      {/* Desktop Navigation */}
      <nav className="fixed right-12 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative flex items-center justify-end"
            aria-label={`Go to ${item.name}`}
          >
            <span className="absolute right-12 text-[10px] text-premium-violet/40 uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
              {item.name}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-premium-violet group-hover:scale-150 transition-all duration-300" />
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigation />

      <Analytics />
      <SpeedInsights />
      <Toaster position="bottom-center" theme="dark" expand={false} richColors />
    </div>
  );
}

export default App;
