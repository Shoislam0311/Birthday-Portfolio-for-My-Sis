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
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
    >
      {/* Content */}
      <div ref={textRef} className="text-center">
        <BlurIn
          word="Celebrating Bubu"
          className="text-4xl md:text-6xl font-black text-neutral-900 mb-4"
        />
        <p className="text-teal-600 font-medium tracking-[0.3em] uppercase text-xs">
          Please wait a moment
        </p>
      </div>

      {/* Simple Progress Bar */}
      <div className="mt-12 w-64 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
          style={{
            width: '0%',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;