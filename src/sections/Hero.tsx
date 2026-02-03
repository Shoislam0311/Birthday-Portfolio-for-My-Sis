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
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      <RetroGrid />
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6 flex justify-center opacity-0 animate-fade-in">
          <div className="px-3 py-1 rounded-full border border-teal-100 bg-teal-50/50 flex items-center gap-2 text-teal-700 text-xs font-medium">
            <Sparkles className="w-3 h-3" />
            <span>It's a special day</span>
          </div>
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-neutral-900 mb-6 tracking-tighter opacity-0"
        >
          {name}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl font-light text-neutral-500 mb-12 opacity-0 max-w-2xl mx-auto"
        >
          Happy Birthday to the most amazing person in the world!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center opacity-0 animate-fade-in [animation-delay:1.2s]">
          <ShimmerButton 
            className="shadow-2xl"
            background="#0f766e"
            shimmerColor="#14b8a6"
            onClick={() => {
              document.querySelector('#wish')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10 text-white font-semibold">Explore Wishes</span>
          </ShimmerButton>
          
          <button 
            className="group px-8 py-3 flex items-center gap-2 text-neutral-600 font-medium hover:text-neutral-900 transition-colors"
            onClick={() => {
              document.querySelector('#send-wish')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>Send Your Wish</span>
            <div className="w-2 h-2 rounded-full bg-neutral-300 group-hover:bg-teal-600 transition-colors" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-xs text-neutral-400 uppercase tracking-widest font-medium">Scroll to Explore</span>
        <div className="w-6 h-10 rounded-full border border-neutral-200 flex justify-center pt-2">
          <ChevronDown className="bounce-arrow w-3 h-3 text-neutral-300" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
