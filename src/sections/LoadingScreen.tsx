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
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete,
        });
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 2, ease: 'expo.inOut' },
      '-=0.5'
    );
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-premium-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-premium-violet/10 rounded-full blur-[120px]" />

      <div ref={textRef} className="text-center relative z-10">
        <BlurIn
          word="EDITION 2026"
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-[0.2em]"
        />
        <p className="text-premium-violet font-bold tracking-[0.6em] uppercase text-[10px] md:text-xs">
          Initializing Premium Content
        </p>
      </div>

      <div className="mt-16 w-48 md:w-64 h-[2px] bg-white/5 relative overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-premium-violet glow-violet shadow-[0_0_15px_#6C3CF0]"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
