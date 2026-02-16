import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import BlurIn from '@/components/ui/blur-in';

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
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete,
        });
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
      className="fixed inset-0 z-[100] bg-electric-charcoal flex flex-col items-center justify-center"
    >
      {/* Content */}
      <div ref={textRef} className="text-center">
        <BlurIn
          word="Celebrating Bubu"
          className="font-serif-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-4 md:mb-6 text-gradient-premium-violet"
        />
        <p className="text-electric-violet/60 font-light tracking-[0.4em] uppercase text-xs md:text-sm">
          Please wait a moment
        </p>
      </div>

      {/* Simple Progress Bar */}
      <div className="mt-12 md:mt-16 w-64 md:w-80 h-1 bg-electric-violet/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full rounded-full bg-gradient-to-r from-electric-violet-dark via-electric-violet to-electric-violet-dark glow-violet"
          style={{
            width: '0%',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;