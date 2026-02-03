import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, Heart } from 'lucide-react';

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
            }, 30);
            
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
      className="text-base md:text-lg text-neutral-700 leading-relaxed"
      style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}
    >
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse text-teal-600">|</span>
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
      ref={sectionRef}
      className="relative w-full py-24 bg-white flex items-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-neutral-300" />
            <Gift className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">A Special Message</span>
            <Gift className="w-5 h-5 text-neutral-600" />
            <div className="w-8 h-px bg-neutral-300" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-4">
            A Wish For <span className="text-teal-600">You</span>
          </h2>
        </div>

        {/* Simple Heart Icon */}
        <div ref={heartRef} className="flex justify-center mb-12 opacity-0">
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <Heart className="w-full h-full text-teal-600 fill-teal-600" />
          </div>
        </div>

        {/* Wish Card */}
        <div ref={cardRef} className="relative opacity-0">
          <div className="relative bg-white rounded-lg border border-neutral-200 p-8 md:p-12 shadow-minimal">
            {/* Bengali Wish */}
            <div className="mb-8">
              <TypewriterText text={bengaliWish} delay={300} />
            </div>
            
            {/* Simple Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-neutral-200" />
              <Heart className="w-4 h-4 text-teal-600 fill-teal-600" />
              <div className="flex-1 h-px bg-neutral-200" />
            </div>
            
            {/* Signature */}
            <div className="text-right">
              <p className="text-lg font-medium text-neutral-900">With Love,</p>
              <p className="text-neutral-600 mt-1">Your Brother</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wish;