import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Music as MusicIcon, ExternalLink } from 'lucide-react';
import { MagicCard } from '@/components/ui/magic-card';

const Music = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

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
      playerRef.current,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: playerRef.current,
          start: 'top 80%',
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
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-luxury-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 opacity-0">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-luxury-blue" />
            <MusicIcon className="w-5 h-5 text-luxury-blue" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-luxury-blue">
              A Special Melody
            </span>
            <MusicIcon className="w-5 h-5 text-luxury-blue" />
            <div className="w-12 h-px bg-luxury-blue" />
          </div>

          <h2 className="font-serif-display text-4xl md:text-6xl font-semibold text-white mb-6">
            Melodies for <span className="text-gradient-blue">Bubu</span>
          </h2>
          <p className="text-white/60 font-serif-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Every celebration needs a soundtrack. Here are some songs chosen specifically for you.
          </p>
        </div>

        {/* Players Grid */}
        <div ref={playerRef} className="grid md:grid-cols-2 gap-8 opacity-0">
          {/* Vocaroo Player */}
          <MagicCard
            className="p-8 card-premium bg-black/40 backdrop-blur-xl border border-luxury-blue/20"
            gradientFrom="rgba(0, 102, 255, 0.1)"
            gradientTo="rgba(0, 102, 255, 0.02)"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-luxury-blue/10 flex items-center justify-center border border-luxury-blue/20">
                <MusicIcon className="w-6 h-6 text-luxury-blue" />
              </div>

              <div className="w-full bg-black/60 p-4 rounded-xl border border-luxury-blue/10 shadow-inner glow-blue">
                <iframe
                  width="100%"
                  height="60"
                  src="https://vocaroo.com/embed/17keJbAY9slH?autoplay=0"
                  frameBorder="0"
                  allow="autoplay"
                  className="rounded-lg"
                ></iframe>
              </div>

              <div className="text-center">
                <p className="text-white font-medium mb-2 tracking-wide uppercase text-xs">
                  Sob Kanar Hat Bazar
                </p>
                <a
                  href="https://voca.ro/17keJbAY9slH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-luxury-blue/60 hover:text-luxury-blue transition-all text-[10px] uppercase tracking-[0.2em] font-semibold group"
                >
                  View on Vocaroo
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </MagicCard>

          {/* Birthday Vibes Player */}
          <MagicCard
            className="p-8 card-premium bg-black/40 backdrop-blur-xl border border-luxury-blue/20"
            gradientFrom="rgba(0, 102, 255, 0.1)"
            gradientTo="rgba(0, 102, 255, 0.02)"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-luxury-blue/10 flex items-center justify-center border border-luxury-blue/20">
                <MusicIcon className="w-6 h-6 text-luxury-blue" />
              </div>

              <div className="w-full bg-black/60 p-4 rounded-xl border border-luxury-blue/10 shadow-inner">
                <audio
                  controls
                  className="w-full h-10 accent-luxury-blue"
                  src="https://cdn.pixabay.com/download/audio/2026/02/06/audio_998d779763.mp3?filename=u_0b2jhroke8-a-wish-you-happy-happy-birthday-480228.mp3"
                >
                  Your browser does not support the audio element.
                </audio>
              </div>

              <div className="text-center">
                <p className="text-white font-medium mb-2 tracking-wide uppercase text-xs">
                  Birthday Vibes
                </p>
                <span className="text-luxury-blue/60 text-[10px] uppercase tracking-[0.2em] font-semibold">
                  Pixabay Audio
                </span>
              </div>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
};

export default Music;
