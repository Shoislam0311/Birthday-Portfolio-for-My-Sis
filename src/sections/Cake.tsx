import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Cake as CakeIcon, Sparkles, RotateCcw } from 'lucide-react';
import { RainbowButton } from '@/components/ui/rainbow-button';

gsap.registerPlugin(ScrollTrigger);

const Candle = ({ lit, onClick }: { lit: boolean; onClick: () => void }) => {
  const flameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flameRef.current || !lit) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(flameRef.current, {
      scaleY: 1.1,
      scaleX: 0.95,
      duration: 0.6,
      ease: 'power1.inOut',
    }).to(flameRef.current, {
      scaleY: 0.95,
      scaleX: 1.05,
      duration: 0.6,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [lit]);

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
      onClick={onClick}
    >
      {lit && (
        <div
          ref={flameRef}
          className="absolute -top-8 z-10"
          style={{ transformOrigin: 'center bottom' }}
        >
          <div className="relative">
            <div
              className="w-4 h-8 rounded-full bg-gradient-to-t from-luxury-blue-dark to-luxury-blue glow-blue"
            />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-white opacity-80" />
          </div>
        </div>
      )}

      <div className="w-3 h-12 rounded-sm overflow-hidden relative z-0">
        <div className="w-full h-full bg-gradient-to-t from-black to-gray-900">
          <div className="h-full w-full flex flex-col justify-evenly">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full h-0.5 bg-luxury-blue/40" />
            ))}
          </div>
        </div>
      </div>

      <div className="w-1 h-2 bg-black -mt-12 mb-12" />
    </div>
  );
};

const BirthdayCake = () => {
  const [candlesLit, setCandlesLit] = useState([true, true, true]);
  const [allCandlesBlown, setAllCandlesBlown] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      cakeRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cakeRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const blowCandle = useCallback((index: number) => {
    setCandlesLit(prev => {
      const newState = [...prev];
      newState[index] = false;

      if (newState.every(c => !c)) {
        setAllCandlesBlown(true);

        // Blue and white confetti only - refined burst
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#0066ff', '#003d99', '#ffffff'],
            decay: 0.95,
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#0066ff', '#003d99', '#ffffff'],
            decay: 0.95,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        frame();
      }

      return newState;
    });
  }, []);

  const resetCake = () => {
    setCandlesLit([true, true, true]);
    setAllCandlesBlown(false);
  };

  return (
    <div ref={cakeRef} className="relative flex flex-col items-center opacity-0">
      {allCandlesBlown && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="font-serif-display text-3xl md:text-4xl font-semibold text-gradient-blue">
            Make a Wish!
          </span>
        </div>
      )}

      {/* Candles */}
      <div className="flex gap-8 mb-6 z-10">
        {candlesLit.map((lit, i) => (
          <Candle key={i} lit={lit} onClick={() => blowCandle(i)} />
        ))}
      </div>

      {/* Cake - Minimalist Geometric Design */}
      <div className="relative">
        <div
          className="relative w-40 h-28 md:w-48 md:h-32 lg:w-60 lg:h-40 rounded-t-full overflow-hidden border-2 border-black bg-white"
          style={{
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Minimalist Blue Frosting Line */}
          <div
            className="absolute top-0 left-0 right-0 h-6 md:h-8 rounded-t-full bg-luxury-blue-light border-b-2 border-luxury-blue"
          />

          {/* Minimalist Blue Decoration */}
          <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-luxury-blue glow-blue" />
        </div>

        {/* Minimalist Plate */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 md:w-56 h-5 md:h-6 rounded-full bg-white border-2 border-black"
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        />
      </div>

      {/* Instructions */}
      <div className="mt-6 md:mt-8 text-center">
        {!allCandlesBlown ? (
          <p className="text-white/80 text-sm md:text-base flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-luxury-blue rounded-full glow-blue"></span>
            Tap the candles to blow them out
          </p>
        ) : (
          <div className="mt-4">
            <RainbowButton
              onClick={resetCake}
              className="flex items-center gap-2 mx-auto shadow-premium glow-blue text-sm md:text-base py-2 px-4"
            >
              <RotateCcw className="w-4 h-4" />
              Light Candles Again
            </RainbowButton>
          </div>
        )}
      </div>
    </div>
  );
};

const Cake = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      messageRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: messageRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Initial refined confetti - blue and white only
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0066ff', '#003d99', '#ffffff'],
        decay: 0.95,
      });
    }, 1000);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-luxury-black flex items-center justify-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16 opacity-0">
          <div className="inline-flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-12 h-px bg-luxury-blue" />
            <Sparkles className="w-5 h-5 text-luxury-blue" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-luxury-blue">The Finale</span>
            <Sparkles className="w-5 h-5 text-luxury-blue" />
            <div className="w-12 h-px bg-luxury-blue" />
          </div>

          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-6xl font-semibold text-white mb-4 md:mb-6">
            Make a <span className="text-gradient-blue">Wish</span>
          </h2>

          <p className="font-serif-body text-white/80 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            It&apos;s time to celebrate! Blow out the candles and make your birthday wish come true.
          </p>
        </div>

        {/* Cake */}
        <BirthdayCake />

        {/* Message */}
        <div ref={messageRef} className="mt-20 opacity-0">
          <div className="card-premium p-10 max-w-lg mx-auto">
            <CakeIcon className="w-10 h-10 text-luxury-blue mx-auto mb-4 glow-blue" />
            <p className="text-white/80 text-lg mb-3 font-serif-body">
              Wishing you a day filled with love, laughter, and lots of cake!
            </p>
            <p className="text-gradient-blue font-medium text-2xl font-serif-display">
              Happy Birthday, Bubu!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cake;