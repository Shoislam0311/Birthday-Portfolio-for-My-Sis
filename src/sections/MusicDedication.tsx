import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Sparkles } from 'lucide-react';
import { MagicCard } from '@/components/ui/magic-card';

gsap.registerPlugin(ScrollTrigger);

const MusicDedication = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
      cardRef.current,
      { opacity: 0, scale: 0.95, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section
      id="music"
      ref={sectionRef}
      className="relative w-full py-24 bg-luxury-black flex items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16 opacity-0">
          <div className="inline-flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-12 h-px bg-luxury-blue" />
            <Music className="w-5 h-5 text-luxury-blue" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-luxury-blue">A Special Dedication</span>
            <Music className="w-5 h-5 text-luxury-blue" />
            <div className="w-12 h-px bg-luxury-blue" />
          </div>

          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-6xl font-semibold text-white mb-4 md:mb-6">
            A Song For <span className="text-gradient-blue">You</span>
          </h2>

          <p className="font-serif-body text-white/70 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Music speaks when words fail. This special melody was chosen just for you to celebrate this beautiful day.
          </p>
        </div>

        {/* Music Card */}
        <div ref={cardRef} className="relative opacity-0 max-w-2xl mx-auto">
          <MagicCard
            className="p-8 md:p-12 card-premium bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center gap-8"
            gradientFrom="rgba(0, 102, 255, 0.1)"
            gradientTo="rgba(0, 102, 255, 0.05)"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-luxury-blue/20 blur-xl rounded-full animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-luxury-blue flex items-center justify-center shadow-premium glow-blue mb-2">
                <Music className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="text-center mb-4">
              <h3 className="font-serif-display text-2xl font-semibold text-white mb-2">Sob Kanar Hat Bazar</h3>
              <p className="text-luxury-blue/60 text-sm uppercase tracking-widest font-bold">Special Birthday Theme</p>
            </div>

            {/* Vocaroo Embed */}
            <div className="w-full flex flex-col items-center gap-4 bg-black/40 p-6 rounded-2xl border border-white/5">
              <div className="overflow-hidden rounded-lg shadow-2xl">
                <iframe
                  width="300"
                  height="60"
                  src="https://vocaroo.com/embed/17keJbAY9slH?autoplay=0"
                  frameBorder="0"
                  allow="autoplay"
                  title="Vocaroo Music Player"
                ></iframe>
              </div>
              <a
                href="https://voca.ro/17keJbAY9slH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-luxury-blue/60 hover:text-luxury-blue transition-colors uppercase tracking-widest font-bold"
              >
                <span>View on Vocaroo</span>
                <Sparkles className="w-3 h-3" />
              </a>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
};

export default MusicDedication;
