import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useDeviceOptimization } from '../hooks/useDeviceOptimization';
import BlurIn from '@/components/ui/blur-in';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLDivElement>(null);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const { deviceConfig, shouldReduceMotion } = useDeviceOptimization();

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: shouldReduceMotion() ? 0.3 : 0.5,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    // Text entrance
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );

    // Progress bar animation
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      {
        width: '100%',
        duration: shouldReduceMotion() ? 0.5 : 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          const progress = gsap.getProperty(progressRef.current, 'width') as number;
          if (typeof progress === 'number' && progress >= 100) {
            setLoadingText('Ready!');
          }
        },
      },
      '-=0.1'
    );

    // Simulate loading stages
    const loadingStages = [
      'Initializing...',
      'Loading assets...',
      'Preparing experience...',
      'Almost there...',
      'Ready!'
    ];

    const stageInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingStages.indexOf(prev);
        if (currentIndex < loadingStages.length - 1) {
          return loadingStages[currentIndex + 1];
        }
        return prev;
      });
    }, shouldReduceMotion() ? 200 : 400);

    // Hold before complete
    tl.to({}, { duration: 0.2 });

    return () => {
      clearInterval(stageInterval);
    };
  }, [onComplete, shouldReduceMotion]);

  const isMobile = deviceConfig.type === 'mobile';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-luxury-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-luxury-blue/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-luxury-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div ref={textRef} className="text-center relative z-10 px-4">
        <BlurIn
          word="Celebrating Bubu"
          className="font-serif-display text-3xl md:text-5xl lg:text-7xl font-semibold text-white mb-4 md:mb-6 text-gradient-premium"
        />
        <div ref={loadingTextRef} className="min-h-[24px]">
          <p className="text-luxury-blue/60 font-light tracking-[0.4em] uppercase text-xs md:text-sm">
            {loadingText}
          </p>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="mt-12 md:mt-16 w-64 md:w-80 max-w-[90vw] relative">
        {/* Progress Track */}
        <div className="w-full h-1 bg-luxury-blue/10 rounded-full overflow-hidden">
          {/* Progress Fill */}
          <div
            ref={progressRef}
            className="h-full rounded-full bg-gradient-to-r from-luxury-blue-dark via-luxury-blue to-luxury-blue-dark glow-blue relative"
            style={{
              width: '0%',
            }}
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="mt-4 flex justify-between items-center text-xs text-white/40 font-mono">
          <span>LOADING</span>
          <span className="animate-pulse">●</span>
          <span>{isMobile ? 'MOBILE' : 'DESKTOP'}</span>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className={`mt-8 ${shouldReduceMotion() ? '' : 'animate-[spin_3s_linear_infinite]'}`}>
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-luxury-blue/20 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-luxury-blue/30 border-t-luxury-blue" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;