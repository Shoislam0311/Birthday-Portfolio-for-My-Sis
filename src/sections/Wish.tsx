import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift } from 'lucide-react';
import { MagicCard } from '@/components/ui/magic-card';

gsap.registerPlugin(ScrollTrigger);

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          let index = 0;

          const timer = setTimeout(() => {
            const interval = setInterval(() => {
              if (index <= text.length) {
                setDisplayText(text.slice(0, index));
                index++;
              } else {
                clearInterval(interval);
              }
            }, 50); // Slower typewriter speed (50ms)

            return () => clearInterval(interval);
          }, delay);

          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [text, delay, started]);

  return (
    <p
      ref={containerRef}
      className="font-serif-body text-lg md:text-xl text-electric-soft-grey leading-relaxed"
      style={{ lineHeight: 2 }}
    >
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse text-electric-violet">|</span>
      )}
    </p>
  );
};

const Wish = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  const bengaliWish = `বুবু,শুভ জন্মদিন। তুই আমার জীবনের ওই মানুষটা,যে একচের প্যানা পোডে কিন্তু না থাকলেই সব ঠিকঠাক লাগে। তোর বকা দেওয়ায় আছে রাগ,নাই যত্ন;তুই হাসলে গরিলা এর মত দেখায় তাই irritated লাগে বুকটা। আমি যদি দুষ্ট হই,হালে তুই হলি নিম নিম্যা শয়তান—এই দুইটাই মিলেই ব্যালান্স। আজ তোর দিন,তাই বেশি কিছু বললাম না যদি রাগ হইয়া ট্রিট টা না দাও—শুধু এটা জান,তুই না থাকলে আমার জীবনটা একটু বেশি শক্ত,একটু বেশি ঠিকঠাক হয়। ভালো থাকিস,যেইরকম আছো সেইরকম থাকিস,দুলাভাইরে বিয়ার পর আমার চে বেশি জ্বালাবি,হাসিখুশি থাকিস। আর তারতারি বিয়া করলে ভালোই হয় অনেক দিন কোনো বিয়া খাই না। সর্বশেষ শুভ জন্মদিন,বুবু।`;

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
      heartRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: heartRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
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
      id="wish"
      ref={sectionRef}
      className="relative w-full py-24 bg-electric-charcoal flex items-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-12 opacity-0">
          <div className="inline-flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-12 h-px bg-electric-violet" />
            <Gift className="w-5 h-5 text-electric-violet" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-electric-violet">A Special Message</span>
            <Gift className="w-5 h-5 text-electric-violet" />
            <div className="w-12 h-px bg-electric-violet" />
          </div>

          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-6xl font-semibold text-white mb-4 md:mb-6">
            A Wish For <span className="text-gradient-violet">You</span>
          </h2>
        </div>

        {/* Animated Violet Underline */}
        <div ref={heartRef} className="flex justify-center mb-16 opacity-0">
          <div className="relative w-32 h-1">
            <div className="absolute inset-0 bg-electric-violet glow-violet" />
          </div>
        </div>

        {/* Wish Card */}
        <div ref={cardRef} className="relative opacity-0">
          <MagicCard
            className="p-10 md:p-14 card-violet bg-electric-deep-plum/30 backdrop-blur-sm"
            gradientFrom="rgba(108, 60, 240, 0.1)"
            gradientTo="rgba(76, 29, 149, 0.05)"
            gradientSize={400}
          >
            {/* Bengali Wish */}
            <div className="mb-8">
              <TypewriterText text={bengaliWish} delay={300} />
            </div>

            {/* Simple Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-electric-violet" />
              <div className="w-4 h-4 border-2 border-electric-violet rounded-full" />
              <div className="flex-1 h-px bg-electric-violet" />
            </div>

            {/* Signature */}
            <div className="text-right">
              <p className="text-xl font-semibold text-electric-soft-grey tracking-tight">With Love,</p>
              <p className="text-electric-violet font-medium mt-2">Your Brother</p>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
};

export default Wish;