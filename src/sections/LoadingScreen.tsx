import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        });
      },
    });

    // Glow pulse
    gsap.to(glowRef.current, {
      scale: 1.2,
      opacity: 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Text entrance
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Progress bar
    tl.fromTo(
      progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 2, ease: 'power2.inOut' },
      '-=0.4'
    );

    // Hold
    tl.to({}, { duration: 0.5 });
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#0a0a0f] flex flex-col items-center justify-center"
    >
      {/* Background Glow */}
      <div 
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(176, 38, 255, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div ref={textRef} className="relative z-10 text-center opacity-0">
        {/* Logo */}
        <div className="mb-8">
          <h2 
            className="text-5xl md:text-7xl font-playfair font-bold"
            style={{
              background: 'linear-gradient(135deg, #b026ff 0%, #ff2d95 50%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Z
          </h2>
        </div>

        <p className="text-white/50 text-sm font-space tracking-[0.3em] uppercase mb-2">
          Loading Experience
        </p>
        <p className="text-white/30 text-xs">
          For Zuyairia
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mt-10 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full rounded-full"
          style={{
            width: '0%',
            background: 'linear-gradient(90deg, #b026ff, #ff2d95, #00d4ff)',
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: ['#b026ff', '#ff2d95', '#00d4ff'][i % 3],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;