import { useEffect, useRef } from 'react';
import gsap from 'gsap';

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
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
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
      <div ref={textRef} className="text-center opacity-0">
        {/* Simple Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full bg-teal-600 flex items-center justify-center mx-auto">
            <span className="text-2xl font-bold text-white">B</span>
          </div>
        </div>

        <p className="text-neutral-600 text-sm font-medium mb-2">
          Loading Experience
        </p>
        <p className="text-neutral-400 text-xs">
          For Bubu
        </p>
      </div>

      {/* Simple Progress Bar */}
      <div className="mt-8 w-48 h-1 bg-neutral-200 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full rounded-full bg-teal-600"
          style={{
            width: '0%',
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;