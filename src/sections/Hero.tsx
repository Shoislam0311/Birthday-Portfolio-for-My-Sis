import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 });
    
    // Badge entrance
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
      );
    }
    
    // Title entrance with character animation
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { opacity: 0, y: 100, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.05,
          ease: 'back.out(1.7)' 
        },
        '-=0.4'
      );
    }
    
    // Subtitle entrance
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
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
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    // Fade out on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '40% top',
      scrub: true,
      onUpdate: (self) => {
        const opacity = 1 - self.progress;
        if (titleRef.current) titleRef.current.style.opacity = String(opacity);
        if (subtitleRef.current) subtitleRef.current.style.opacity = String(opacity);
        if (badgeRef.current) badgeRef.current.style.opacity = String(opacity);
        if (scrollIndicatorRef.current) scrollIndicatorRef.current.style.opacity = String(opacity);
      },
    });

    // Create particles
    createParticles();

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const createParticles = () => {
    const container = particlesRef.current;
    if (!container) return;

    const colors = ['#b026ff', '#ff2d95', '#00d4ff', '#ffd700', '#ffffff'];

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 2 + Math.random() * 6;
      
      particle.className = 'absolute rounded-full';
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${0.3 + Math.random() * 0.5};
        box-shadow: 0 0 ${size * 2}px ${color};
      `;
      
      container.appendChild(particle);

      gsap.to(particle, {
        y: `${-300 - Math.random() * 400}`,
        x: `${(Math.random() - 0.5) * 200}`,
        opacity: 0,
        duration: 10 + Math.random() * 15,
        repeat: -1,
        ease: 'none',
        delay: Math.random() * 10,
      });
    }
  };

  const name = 'ZUYAIRIA';

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Particle Container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute orb-float"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div 
              className="w-20 h-20 md:w-32 md:h-32 rounded-full opacity-30"
              style={{
                background: `radial-gradient(circle, ${['#b026ff', '#ff2d95', '#00d4ff', '#ffd700', '#b026ff'][i]} 0%, transparent 70%)`,
                filter: 'blur(20px)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8 opacity-0"
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-space tracking-widest uppercase text-white/70">February 17, 2025</span>
          <Sparkles className="w-4 h-4 text-pink-400" />
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl lg:text-[12rem] font-playfair font-bold mb-6 opacity-0 perspective-1000"
        >
          {name.split('').map((char, i) => (
            <span 
              key={i} 
              className="char inline-block text-gradient"
              style={{ 
                textShadow: '0 0 40px rgba(176, 38, 255, 0.3)',
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-3xl font-space font-light tracking-[0.3em] uppercase text-white/60 opacity-0"
        >
          Happy Birthday
        </p>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse" />
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-xs font-space tracking-widest uppercase text-white/40">Scroll to Explore</span>
        <div className="w-8 h-12 rounded-full border border-white/20 flex justify-center pt-2">
          <ChevronDown className="bounce-arrow w-4 h-4 text-purple-400" />
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-purple-500/20" />
      <div className="absolute top-8 right-8 w-20 h-20 border-r border-t border-pink-500/20" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-l border-b border-cyan-500/20" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-purple-500/20" />

      <style>{`
        @keyframes orb-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-10px, -50px) scale(0.9);
          }
          75% {
            transform: translate(-20px, -20px) scale(1.05);
          }
        }
        .orb-float {
          animation: orb-float 8s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Hero;