import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sections
import Hero from './sections/Hero';
import Gallery from './sections/Gallery';
import Wish from './sections/Wish';
import Cake from './sections/Cake';
import SendWish from './sections/SendWish';
import LoadingScreen from './sections/LoadingScreen';
import MusicPlayer from './components/MusicPlayer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setMusicEnabled(true), 500);
  };

  return (
    <div className="relative bg-[#0a0a0f] min-h-screen text-white overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Background Music Player */}
      <MusicPlayer enabled={musicEnabled} />
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 gradient-mesh" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
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
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
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
            <span className="absolute right-8 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {section}
            </span>
            <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-purple-500 group-hover:scale-150 transition-all duration-300" />
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;