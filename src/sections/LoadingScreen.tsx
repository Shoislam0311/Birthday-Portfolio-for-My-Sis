import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Crown, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    // Text entrance
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }
    );

    // Progress bar
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 2, ease: 'power2.inOut' },
      '-=0.5'
    );

    // Hold
    tl.to({}, { duration: 0.5 });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-luxury-gradient" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-violet/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-teal/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Crown className="w-8 h-8 text-luxury-violet animate-pulse" />
          <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl text-luxury-grey tracking-tight uppercase text-gradient-premium">
            SPECIAL EDITION
          </h1>
          <Crown className="w-8 h-8 text-luxury-teal animate-pulse" />
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-luxury-violet" />
          <p className="text-sm font-bold text-luxury-violet/80 tracking-[0.3em] uppercase">
            Loading Premium Experience
          </p>
          <Sparkles className="w-5 h-5 text-luxury-violet" />
        </div>

        <p className="text-luxury-grey/60 font-medium tracking-wider text-sm uppercase">
          Please wait a moment
        </p>
      </div>

      {/* Premium Progress Bar */}
      <div className="mt-12 md:mt-16 w-80 md:w-96 h-1 bg-luxury-black/50 rounded-full overflow-hidden border border-luxury-violet/20">
        <div
          ref={progressRef}
          className="h-full rounded-full bg-violet-gradient glow-violet relative overflow-hidden"
          style={{
            width: '0%',
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      {/* Version */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <span className="text-xs font-bold text-luxury-grey-dark tracking-wider uppercase">
          Edition 2026
        </span>
      </div>
    </div>
  );
};

export default LoadingScreen;