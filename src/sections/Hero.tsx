import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
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
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }
      );
    }
    
    // Subtitle entrance
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' },
        '-=0.8'
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
        const opacity = 1 - self.progress * 1.5;
        const scale = 1 + self.progress * 0.1;
        if (titleRef.current) {
          titleRef.current.style.opacity = String(Math.max(0, opacity));
          titleRef.current.style.transform = `scale(${scale})`;
        }
        if (subtitleRef.current) subtitleRef.current.style.opacity = String(Math.max(0, opacity));
        if (scrollIndicatorRef.current) scrollIndicatorRef.current.style.opacity = String(Math.max(0, opacity));
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-premium-black"
    >
      {/* Cinematic Lighting Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(108,60,240,0.15),transparent_70%)]" />
        <RetroGrid className="opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8 flex justify-center opacity-0 animate-fade-in">
          <div className="px-6 py-2 rounded-full border border-premium-violet/20 bg-premium-violet/5 flex items-center gap-3 text-premium-violet text-xs font-bold tracking-[0.2em] uppercase">
            <Sparkles className="w-3 h-3" />
            <span>Limited Edition Release</span>
            <Sparkles className="w-3 h-3" />
          </div>
        </div>

        {/* Main Title */}
        <div className="overflow-hidden mb-6">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl xl:text-[11rem] font-extrabold text-white leading-[0.9] tracking-tighter opacity-0 uppercase"
          >
            Bubu <br />
            <span className="text-gradient-premium">Special</span> <br />
            Edition 2026
          </h1>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-premium-grey/60 text-sm md:text-base lg:text-lg uppercase tracking-[0.4em] mb-12 md:mb-16 opacity-0 max-w-xl md:max-w-3xl mx-auto"
        >
          Celebrating the legacy of Zuyairia Islam. A lifetime of excellence and grace.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-fade-in [animation-delay:1.5s]">
          <ShimmerButton
            className="shadow-premium-lg glow-violet h-14 px-10"
            background="#6C3CF0"
            shimmerColor="#2A0E3F"
            onClick={() => {
              document.querySelector('#timeline')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10 text-white font-bold tracking-[0.1em] uppercase text-sm">View Timeline</span>
          </ShimmerButton>

          <button
            className="group px-10 h-14 flex items-center gap-3 text-white/70 font-bold tracking-[0.1em] uppercase text-sm hover:text-white transition-all border border-premium-violet/20 rounded-full hover:border-premium-violet/40 hover:bg-premium-violet/5 bg-transparent"
            onClick={() => {
              document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Explore Memories</span>
            <div className="w-1.5 h-1.5 rounded-full bg-premium-violet/40 group-hover:bg-premium-violet group-hover:shadow-[0_0_10px_#6C3CF0] transition-all" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-premium-violet to-transparent relative overflow-hidden">
          <div className="bounce-arrow absolute top-0 left-0 w-full h-1/2 bg-white/40" />
        </div>
        <span className="text-[10px] text-premium-grey/40 uppercase tracking-[0.5em] font-bold">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
