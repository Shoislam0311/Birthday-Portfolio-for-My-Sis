import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Title entrance
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 80, filter: 'blur(20px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }
      );
    }
    
    // Subtitle entrance
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 40, filter: 'blur(15px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' },
        '-=0.8'
      );
    }
    
    // Scroll indicator
    if (scrollIndicatorRef.current) {
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.5'
      );
    }

    // Scroll indicator bounce
    const bounceArrow = scrollIndicatorRef.current?.querySelector('.bounce-arrow');
    if (bounceArrow) {
      gsap.to(bounceArrow, {
        y: 8,
        duration: 2,
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
        const opacity = 1 - self.progress * 0.8;
        const scale = 1 + self.progress * 0.15;
        if (titleRef.current) {
          titleRef.current.style.opacity = String(opacity);
          titleRef.current.style.transform = `scale(${scale})`;
        }
        if (subtitleRef.current) subtitleRef.current.style.opacity = String(opacity);
        if (scrollIndicatorRef.current) scrollIndicatorRef.current.style.opacity = String(opacity);
      },
    });

    // Particle animation
    if (particleRef.current) {
      const particles = particleRef.current.children;
      Array.from(particles).forEach((particle) => {
        const delay = Math.random() * 2;
        gsap.to(particle, {
          y: -100,
          x: () => Math.random() * 100 - 50,
          opacity: 0,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          delay,
          ease: 'none',
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Generate particle data once with useMemo
  const particleData = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.3) % 100}%`,
      top: `${(i * 7.1) % 100}%`,
      delay: `${(i * 0.4) % 8}s`,
    }));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-luxury-black hero-section"
    >
      {/* Animated Particle Background */}
      <div 
        ref={particleRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(108, 60, 240, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(42, 14, 63, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(15, 61, 62, 0.08) 0%, transparent 50%)
          `
        }}
      >
        {/* Subtle floating particles */}
        {particleData.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-luxury-violet rounded-full opacity-20"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Cinematic Lighting Overlay */}
      <div className="absolute inset-0 cinematic-light pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Premium Badge */}
        <div className="mb-8 flex justify-center opacity-0 animate-fade-in">
          <div className="px-6 py-3 rounded-full border border-luxury-violet/30 bg-luxury-violet/10 backdrop-blur-sm flex items-center gap-3 text-luxury-violet text-sm font-bold tracking-[0.2em] uppercase glow-violet-soft">
            <Crown className="w-4 h-4 text-luxury-violet" />
            <span>Special Birthday Edition 2026</span>
            <Crown className="w-4 h-4 text-luxury-violet" />
          </div>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-bold text-4xl md:text-6xl lg:text-8xl xl:text-[9rem] text-luxury-grey mb-8 tracking-tight opacity-0 text-gradient-premium uppercase"
        >
          LIMITED EDITION
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-luxury-grey/80 mb-12 opacity-0 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          A celebration of excellence, achievement, and the extraordinary journey of success
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-fade-in [animation-delay:1.5s]">
          <button className="group relative px-8 py-4 bg-violet-gradient text-luxury-grey font-bold text-sm tracking-wider uppercase rounded-lg hover-premium-lift btn-neon-glow">
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              EXPLORE ACHIEVEMENTS
              <Sparkles className="w-4 h-4" />
            </span>
          </button>

          <button className="group px-8 py-4 flex items-center gap-3 text-luxury-violet font-bold text-sm tracking-wider uppercase rounded-lg border border-luxury-violet/30 hover:border-luxury-violet hover:bg-luxury-violet/10 transition-all duration-300 hover-premium-lift glow-violet-soft">
            <span>VIEW COLLECTION</span>
            <div className="w-2 h-2 rounded-full bg-luxury-violet/30 group-hover:bg-luxury-violet group-hover:scale-125 transition-all duration-300" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-0"
      >
        <span className="text-xs text-luxury-violet/60 uppercase tracking-[0.3em] font-bold">DISCOVER</span>
        <div className="w-8 h-12 rounded-full border-2 border-luxury-violet/30 flex justify-center pt-3 bg-luxury-violet/5 hover:bg-luxury-violet/10 transition-all duration-300 hover:border-luxury-violet/60">
          <ChevronDown className="bounce-arrow w-4 h-4 text-luxury-violet" />
        </div>
      </div>
    </section>
  );
};

export default Hero;