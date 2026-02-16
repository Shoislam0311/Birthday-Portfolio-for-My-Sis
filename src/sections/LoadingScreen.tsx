import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import BlurIn from '@/components/ui/blur-in';
import { Music, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const handleStart = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete,
    });
  };

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsReady(true);
      },
    });

    // Text entrance
    tl.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.1 }
    );

    // Progress bar
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 1.5, ease: 'power2.inOut' },
      '-=0.2'
    );

    // Hold
    tl.to({}, { duration: 0.3 });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center"
    >
      {/* Content */}
      <div ref={textRef} className="text-center">
        <BlurIn
          word="Celebrating Bubu"
          className="font-serif-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-4 md:mb-6 text-gradient-premium"
        />
        <p className="text-luxury-blue/60 font-light tracking-[0.4em] uppercase text-xs md:text-sm">
          Please wait a moment
        </p>
      </div>

      {/* Progress & Interaction Area */}
      <div className="mt-12 md:mt-16 flex flex-col items-center">
        {!isReady ? (
          <div className="w-64 md:w-80 h-1 bg-luxury-blue/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full bg-gradient-to-r from-luxury-blue-dark via-luxury-blue to-luxury-blue-dark glow-blue"
              style={{
                width: '0%',
              }}
            />
          </div>
        ) : (
          <button
            onClick={handleStart}
            className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full border border-luxury-blue transition-all duration-500 hover:scale-110 active:scale-95 glow-blue"
          >
            {/* Background Animation */}
            <div className="absolute inset-0 bg-luxury-blue/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

            <div className="relative flex items-center gap-3">
              <div className="flex -space-x-1">
                <Music className="w-5 h-5 text-luxury-blue animate-bounce" />
                <Sparkles className="w-5 h-5 text-luxury-blue animate-pulse delay-75" />
              </div>
              <span className="font-serif-display text-xl md:text-2xl text-white tracking-widest uppercase">
                Start Celebration
              </span>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-luxury-blue opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-luxury-blue opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;