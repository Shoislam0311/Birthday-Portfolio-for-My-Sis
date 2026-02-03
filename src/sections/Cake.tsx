import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { Cake as CakeIcon, Sparkles, PartyPopper, RotateCcw, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Candle = ({ lit, onClick }: { lit: boolean; onClick: () => void }) => {
  const flameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flameRef.current || !lit) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(flameRef.current, {
      scaleY: 1.2,
      scaleX: 0.9,
      duration: 0.08,
      ease: 'power1.inOut',
    }).to(flameRef.current, {
      scaleY: 0.95,
      scaleX: 1.05,
      duration: 0.08,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, [lit]);

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
      onClick={onClick}
    >
      {lit && (
        <div
          ref={flameRef}
          className="absolute -top-12 z-10"
          style={{ transformOrigin: 'center bottom' }}
        >
          <div className="relative">
            <div 
              className="w-6 h-12 rounded-full"
              style={{
                background: 'linear-gradient(to top, #ff6b35 0%, #ffd93d 50%, #fff 100%)',
                filter: 'blur(1px)',
                boxShadow: '0 0 20px #ff6b35, 0 0 40px #ffd93d',
              }}
            />
            <div 
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-6 rounded-full bg-white"
              style={{ filter: 'blur(2px)' }}
            />
          </div>
        </div>
      )}
      
      <div className="w-4 h-16 rounded-sm overflow-hidden relative z-0">
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(90deg, #ff9a9e 0%, #fecfef 50%, #ff9a9e 100%)',
          }}
        >
          <div className="h-full w-full flex flex-col justify-evenly">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-0.5 bg-white/60" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-1 h-3 bg-gray-800 -mt-20 mb-16" />
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
      { opacity: 0, scale: 0.5, y: 100 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
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
        
        // Massive confetti explosion
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#b026ff', '#ff2d95', '#00d4ff', '#ffd700'],
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#b026ff', '#ff2d95', '#00d4ff', '#ffd700'],
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
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce-in">
          <span className="text-5xl md:text-7xl font-playfair font-bold text-gradient">
            Make a Wish!
          </span>
        </div>
      )}

      {/* Candles */}
      <div className="flex gap-12 mb-6 z-10">
        {candlesLit.map((lit, i) => (
          <Candle key={i} lit={lit} onClick={() => blowCandle(i)} />
        ))}
      </div>

      {/* Cake */}
      <div className="relative">
        <div 
          className="relative w-64 h-44 md:w-80 md:h-52 rounded-t-full overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #ff9a9e 0%, #fecfef 30%, #ff6b9d 100%)',
            boxShadow: '0 20px 60px rgba(255, 107, 157, 0.3)',
          }}
        >
          {/* Frosting */}
          <div 
            className="absolute top-0 left-0 right-0 h-16 rounded-t-full"
            style={{
              background: 'linear-gradient(180deg, #fff5f5 0%, #ffe0e0 100%)',
            }}
          />
          
          {/* Decorative dots */}
          <div className="absolute top-20 left-8 w-5 h-5 rounded-full bg-white/80" />
          <div className="absolute top-24 right-12 w-4 h-4 rounded-full bg-white/60" />
          <div className="absolute top-28 left-1/2 w-6 h-6 rounded-full bg-white/70" />
          <div className="absolute top-32 left-16 w-3 h-3 rounded-full bg-white/50" />
          <div className="absolute top-20 right-20 w-4 h-4 rounded-full bg-white/70" />
        </div>

        {/* Plate */}
        <div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-80 h-10 rounded-full"
          style={{
            background: 'linear-gradient(180deg, #e0e0e0 0%, #c0c0c0 100%)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          }}
        />
      </div>

      {/* Instructions */}
      <div className="mt-10 text-center">
        {!allCandlesBlown ? (
          <p className="text-white/50 text-sm font-space tracking-wider animate-pulse flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            Click the candles to blow them out
          </p>
        ) : (
          <div className="animate-fade-in">
            <button
              onClick={resetCake}
              className="flex items-center gap-2 mx-auto px-6 py-3 rounded-full font-space text-sm tracking-wider transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #b026ff 0%, #ff2d95 100%)',
                boxShadow: '0 0 30px rgba(176, 38, 255, 0.4)',
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Light Candles Again
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateX(-50%) scale(0.3); }
          50% { transform: translateX(-50%) scale(1.1); }
          70% { transform: translateX(-50%) scale(0.95); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
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
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      messageRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: messageRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#b026ff', '#ff2d95', '#00d4ff', '#ffd700'],
      });
    }, 1500);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Sparkles className="text-purple-500/30" size={16 + Math.random() * 20} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div ref={headerRef} className="mb-12 opacity-0">
          <div className="inline-flex items-center gap-3 mb-6">
            <PartyPopper className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-space tracking-[0.3em] uppercase text-white/50">The Finale</span>
            <PartyPopper className="w-5 h-5 text-pink-400" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-4">
            Make a <span className="text-gradient">Wish</span>
          </h2>
          
          <p className="text-white/50 max-w-xl mx-auto">
            It&apos;s time to celebrate! Blow out the candles and make your birthday wish come true.
          </p>
        </div>

        {/* Cake */}
        <BirthdayCake />

        {/* Message */}
        <div ref={messageRef} className="mt-16 opacity-0">
          <div className="glass-card rounded-2xl p-8 max-w-lg mx-auto">
            <CakeIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <p className="font-script text-2xl text-white/80 mb-2">
              Wishing you a day filled with love, laughter, and lots of cake!
            </p>
            <p className="text-gradient font-playfair text-xl">
              Happy Birthday, Zuyairia!
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-sparkle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float-sparkle {
          animation: float-sparkle ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Cake;