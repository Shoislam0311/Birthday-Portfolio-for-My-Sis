import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 });
    
    // Title entrance
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
    }
    
    // Subtitle entrance
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
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

    // Subtle fade on scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '50% top',
      scrub: true,
      onUpdate: (self) => {
        const opacity = 1 - self.progress * 0.5;
        if (titleRef.current) titleRef.current.style.opacity = String(opacity);
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
      className="relative w-full h-screen flex items-center justify-center bg-white"
    >
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-900 mb-6 tracking-tight opacity-0"
        >
          {name}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl font-normal text-neutral-600 mb-12 opacity-0"
        >
          Happy Birthday
        </p>

        {/* Simple Decorative Line */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="w-12 h-px bg-neutral-300" />
          <div className="w-2 h-2 rounded-full bg-teal-600" />
          <div className="w-12 h-px bg-neutral-300" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors duration-200 shadow-minimal">
            Explore Wishes
          </button>
          <button className="px-8 py-3 border border-neutral-300 text-neutral-700 rounded-lg font-medium hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200">
            Send Your Wish
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-xs text-neutral-400 uppercase tracking-wider">Scroll to Explore</span>
        <div className="w-6 h-10 rounded-full border border-neutral-300 flex justify-center pt-2">
          <ChevronDown className="bounce-arrow w-3 h-3 text-neutral-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
