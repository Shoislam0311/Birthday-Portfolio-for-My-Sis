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
      className="relative flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
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
              className="w-4 h-8 rounded-full bg-gradient-to-t from-gold-600 to-gold-300 glow-gold"
            />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-white opacity-80" />
          </div>
        </div>
      )}
      
      <div className="w-3 h-12 rounded-sm overflow-hidden relative z-0">
        <div className="w-full h-full bg-gradient-to-t from-charcoal-400 to-charcoal-200">
          <div className="h-full w-full flex flex-col justify-evenly">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full h-0.5 bg-gold-500/40" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-1 h-2 bg-charcoal-800 -mt-12 mb-12" />
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

        // Premium confetti
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#D4AF37', '#E1C68D', '#C0C0C0'],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#D4AF37', '#E1C68D', '#C0C0C0'],
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
          <span className="font-serif-display text-3xl md:text-4xl font-semibold text-gradient-gold">
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

      {/* Cake */}
      <div className="relative">
        <div
          className="relative w-48 h-32 md:w-60 md:h-40 rounded-t-full overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #9C7B27 0%, #80611F 50%, #644717 100%)',
            boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
          }}
        >
          {/* Frosting */}
          <div
            className="absolute top-0 left-0 right-0 h-12 rounded-t-full"
            style={{
              background: 'linear-gradient(180deg, #F5ECD7 0%, #EBD9B2 100%)',
            }}
          />

          {/* Simple decoration */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500/80 glow-gold" />
        </div>

        {/* Simple Plate */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-56 h-6 rounded-full bg-platinum-200 border border-gold-500/20"
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        />
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center">
        {!allCandlesBlown ? (
          <p className="text-platinum-300 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-gold-400 rounded-full glow-gold"></span>
            Click the candles to blow them out
          </p>
        ) : (
          <div className="mt-4">
            <RainbowButton
              onClick={resetCake}
              className="flex items-center gap-2 mx-auto shadow-premium glow-gold"
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

    // Initial subtle confetti
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E1C68D', '#C0C0C0', '#F5ECD7'],
      });
    }, 1000);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-charcoal-100 flex items-center justify-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div ref={headerRef} className="mb-16 opacity-0">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-12 h-px divider-premium" />
            <Sparkles className="w-5 h-5 text-gold-400" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-gold-400">The Finale</span>
            <Sparkles className="w-5 h-5 text-gold-400" />
            <div className="w-12 h-px divider-premium" />
          </div>

          <h2 className="font-serif-display text-4xl md:text-6xl font-semibold text-white mb-6">
            Make a <span className="text-gradient-gold">Wish</span>
          </h2>

          <p className="font-serif-body text-platinum-300 max-w-xl mx-auto text-lg leading-relaxed">
            It&apos;s time to celebrate! Blow out the candles and make your birthday wish come true.
          </p>
        </div>

        {/* Cake */}
        <BirthdayCake />

        {/* Message */}
        <div ref={messageRef} className="mt-20 opacity-0">
          <div className="card-premium p-10 max-w-lg mx-auto">
            <CakeIcon className="w-10 h-10 text-gold-400 mx-auto mb-4 glow-gold" />
            <p className="text-platinum-100 text-lg mb-3 font-serif-body">
              Wishing you a day filled with love, laughter, and lots of cake!
            </p>
            <p className="text-gradient-gold font-medium text-2xl font-serif-display">
              Happy Birthday, Bubu!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cake;