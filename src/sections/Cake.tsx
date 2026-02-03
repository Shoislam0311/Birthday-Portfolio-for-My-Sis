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
              className="w-4 h-8 rounded-full bg-gradient-to-t from-orange-400 to-yellow-300"
            />
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-white opacity-80" />
          </div>
        </div>
      )}
      
      <div className="w-3 h-12 rounded-sm overflow-hidden relative z-0">
        <div className="w-full h-full bg-gradient-to-t from-neutral-400 to-neutral-200">
          <div className="h-full w-full flex flex-col justify-evenly">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full h-0.5 bg-white/60" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-1 h-2 bg-neutral-800 -mt-12 mb-12" />
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
        
        // Simple confetti
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#0f766e', '#14b8a6'],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#0f766e', '#14b8a6'],
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
          <span className="text-3xl md:text-4xl font-bold text-teal-600">
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
            background: 'linear-gradient(180deg, #fecaca 0%, #fda4af 50%, #fb7185 100%)',
            boxShadow: '0 8px 24px rgba(251, 113, 133, 0.3)',
          }}
        >
          {/* Frosting */}
          <div 
            className="absolute top-0 left-0 right-0 h-12 rounded-t-full"
            style={{
              background: 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)',
            }}
          />
          
          {/* Simple decoration */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/80" />
        </div>

        {/* Simple Plate */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-56 h-6 rounded-full bg-neutral-200"
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      </div>

      {/* Instructions */}
      <div className="mt-8 text-center">
        {!allCandlesBlown ? (
          <p className="text-neutral-600 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
            Click the candles to blow them out
          </p>
        ) : (
          <div className="mt-4">
            <RainbowButton
              onClick={resetCake}
              className="flex items-center gap-2 mx-auto"
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
        colors: ['#0f766e', '#14b8a6'],
      });
    }, 1000);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 bg-neutral-50 flex items-center justify-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div ref={headerRef} className="mb-12 opacity-0">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-neutral-300" />
            <Sparkles className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">The Finale</span>
            <Sparkles className="w-5 h-5 text-neutral-600" />
            <div className="w-8 h-px bg-neutral-300" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-4">
            Make a <span className="text-teal-600">Wish</span>
          </h2>
          
          <p className="text-neutral-600 max-w-xl mx-auto">
            It&apos;s time to celebrate! Blow out the candles and make your birthday wish come true.
          </p>
        </div>

        {/* Cake */}
        <BirthdayCake />

        {/* Message */}
        <div ref={messageRef} className="mt-16 opacity-0">
          <div className="bg-white rounded-lg border border-neutral-200 p-8 max-w-lg mx-auto shadow-minimal">
            <CakeIcon className="w-10 h-10 text-teal-600 mx-auto mb-4" />
            <p className="text-neutral-800 text-lg mb-2">
              Wishing you a day filled with love, laughter, and lots of cake!
            </p>
            <p className="text-teal-600 font-medium text-xl">
              Happy Birthday, Bubu!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cake;