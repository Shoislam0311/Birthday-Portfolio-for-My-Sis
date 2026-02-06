import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';
import RetroGrid from '@/components/ui/retro-grid';
import ShimmerButton from '@/components/ui/shimmer-button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Title entrance
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' }
      );
    }
    
    // Subtitle entrance
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'expo.out' },
        '-=0.6'
      );
    }
    
    // Scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      );
    }

    // Scroll indicator bounce
    const bounceArrow = scrollIndicatorRef.current?.querySelector('.bounce-arrow');
    if (bounceArrow) {
      gsap.to(bounceArrow, {
        y: 6,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const opacity = 1 - self.progress;
        const scale = 1 + self.progress * 0.1;
        if (titleRef.current) {
          titleRef.current.style.opacity = String(opacity);
          titleRef.current.style.transform = `scale(${scale})`;
        }
        if (subtitleRef.current) subtitleRef.current.style.opacity = String(opacity);
        if (scrollIndicatorRef.current) scrollIndicatorRef.current.style.opacity = String(opacity);
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const name = 'Bubu';

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-luxury-black"
    >
      <RetroGrid />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-8 flex justify-center opacity-0 animate-fade-in">
          <div className="px-5 py-2 rounded-full border border-luxury-blue/20 bg-luxury-blue/5 flex items-center gap-3 text-luxury-blue/80 text-xs font-medium tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-luxury-blue" />
            <span>A Celebration of Excellence</span>
            <Sparkles className="w-3 h-3 text-luxury-blue" />
          </div>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-serif-display text-7xl md:text-9xl lg:text-[10rem] font-semibold text-white mb-8 tracking-tight opacity-0 text-gradient-premium"
        >
          {name}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-serif-body text-xl md:text-2xl text-white/80 mb-16 opacity-0 max-w-2xl mx-auto leading-relaxed"
        >
          Happy Birthday to an extraordinary soul who illuminates every moment with grace and brilliance
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-fade-in [animation-delay:1.2s]">
          <ShimmerButton
            className="shadow-premium-lg glow-blue"
            background="#0066ff"
            shimmerColor="#003d99"
            onClick={() => {
              document.querySelector('#wish')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10 text-white font-semibold tracking-wide">Explore Wishes</span>
          </ShimmerButton>

          <button
            className="group px-8 py-3 flex items-center gap-3 text-white/80 font-medium hover:text-luxury-blue transition-colors border border-luxury-blue/20 rounded-lg hover:border-luxury-blue/40 hover:bg-luxury-blue/5"
            onClick={() => {
              document.querySelector('#send-wish')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Send Your Wish</span>
            <div className="w-1.5 h-1.5 rounded-full bg-luxury-blue/30 group-hover:bg-luxury-blue group-hover:glow-blue transition-all" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0"
      >
        <span className="text-xs text-luxury-blue/50 uppercase tracking-[0.3em] font-medium">Scroll to Explore</span>
        <div className="w-6 h-10 rounded-full border border-luxury-blue/30 flex justify-center pt-2 bg-luxury-blue/5">
          <ChevronDown className="bounce-arrow w-3 h-3 text-luxury-blue" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
