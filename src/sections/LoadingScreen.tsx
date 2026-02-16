import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import BlurIn from '@/components/ui/blur-in';
import { RainbowButton } from '@/components/ui/rainbow-button';

interface LoadingScreenProps {
  onComplete: () => void;
  onStarted: () => void;
}

const LoadingScreen = ({ onComplete, onStarted }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShowButton(true);
      },
    });

    // Text entrance
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    // Progress bar
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 2.5, ease: 'power2.inOut' },
      '-=0.4'
    );

    // Hold
    tl.to({}, { duration: 0.5 });
  }, []);

  useEffect(() => {
    if (showButton && buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
  }, [showButton]);

  const handleEnter = () => {
    onStarted();
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete,
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center"
    >
      {/* Content */}
      <div ref={textRef} className="text-center mb-12">
        <BlurIn
          word="Celebrating Bubu"
          className="font-serif-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-4 md:mb-6 text-gradient-premium"
        />
        <p className="text-luxury-blue/60 font-light tracking-[0.4em] uppercase text-xs md:text-sm">
          A Journey of Love & Joy
        </p>
      </div>

      {/* Progress Section */}
      {!showButton ? (
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
        <div ref={buttonRef} className="flex flex-col items-center gap-4">
          <RainbowButton
            onClick={handleEnter}
            className="px-12 py-6 text-lg font-bold tracking-widest uppercase rounded-full shadow-blue-glow hover:scale-105 transition-transform"
          >
            Enter Celebration
          </RainbowButton>
          <p className="text-luxury-blue/40 text-[10px] uppercase tracking-[0.3em] animate-pulse">
            Click to start experience
          </p>
        </div>
      )}
    </div>
  );
};

export default LoadingScreen;
