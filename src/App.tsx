import { useState, useCallback, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ErrorBoundary } from './components/ErrorBoundary';
import LoadingScreen from './sections/LoadingScreen';
import MusicPlayer from './components/MusicPlayer';
import CustomCursor from './components/CustomCursor';
import MobileNavigation from './components/MobileNavigation';
import { CONFIG } from './config';
import { trackPageView } from './lib/analytics';
import '../src/index.css';

gsap.registerPlugin(ScrollTrigger);

// Lazy-loaded sections for performance
const Hero = lazy(() => import('./sections/Hero'));
const Gallery = lazy(() => import('./sections/Gallery'));
const Wish = lazy(() => import('./sections/Wish'));
const Cake = lazy(() => import('./sections/Cake'));
const SendWish = lazy(() => import('./sections/SendWish'));

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleStarted = useCallback(() => {
    setMusicEnabled(true);
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative bg-luxury-black min-h-screen text-white overflow-x-hidden">
        <CustomCursor />

        {isLoading && (
          <LoadingScreen
            onComplete={handleLoadingComplete}
            onStarted={handleStarted}
          />
        )}

        <MusicPlayer enabled={musicEnabled} />

        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-luxury-blue/5 via-transparent to-transparent" />
        </div>

        <main className="relative z-10">
          <Suspense fallback={<div className="h-screen flex items-center justify-center bg-luxury-black"><div className="w-8 h-8 border-2 border-luxury-blue border-t-transparent rounded-full animate-spin" /></div>}>
            <Hero />
          </Suspense>
          <Suspense fallback={<div className="h-96 flex items-center justify-center bg-luxury-black"><div className="w-8 h-8 border-2 border-luxury-blue border-t-transparent rounded-full animate-spin" /></div>}>
            <Gallery />
          </Suspense>
          <Suspense fallback={<div className="h-96 flex items-center justify-center bg-luxury-white"><div className="w-8 h-8 border-2 border-luxury-blue border-t-transparent rounded-full animate-spin" /></div>}>
            <Wish />
          </Suspense>
          <Suspense fallback={<div className="h-96 flex items-center justify-center bg-luxury-black"><div className="w-8 h-8 border-2 border-luxury-blue border-t-transparent rounded-full animate-spin" /></div>}>
            <Cake />
          </Suspense>
          <Suspense fallback={<div className="h-[600px] flex items-center justify-center bg-luxury-white"><div className="w-8 h-8 border-2 border-luxury-blue border-t-transparent rounded-full animate-spin" /></div>}>
            <SendWish />
          </Suspense>
        </main>

        <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6" aria-label="Section navigation">
          {[
            { id: 'hero', label: 'Hero' },
            { id: 'gallery', label: 'Gallery' },
            { id: 'wish', label: 'Wish' },
            { id: 'cake', label: 'Cake' },
            { id: 'send-wish', label: 'Send Wish' },
          ].map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                const target = document.getElementById(section.id);
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative flex items-center justify-end"
              aria-label={`Go to ${section.label}`}
            >
              <span className="absolute right-10 text-xs text-luxury-blue/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium tracking-wide">
                {section.label}
              </span>
              <div className="w-2 h-2 rounded-full bg-luxury-grey group-hover:bg-luxury-blue group-hover:w-4 transition-all duration-200" />
            </button>
          ))}
        </nav>

        <MobileNavigation />

        <script
          type="application/json"
          id="site-config"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CONFIG) }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;