import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, Heart, Sparkles } from 'lucide-react';

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
            }, 20);
            
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
      className="text-lg md:text-xl text-white/80 leading-relaxed"
      style={{ fontFamily: "'Noto Sans Bengali', 'Inter', sans-serif", lineHeight: 2.2 }}
    >
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse text-purple-400">|</span>
      )}
    </p>
  );
};

const Wish = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  const bengaliWish = `বুবু, শুভ জন্মদিন। তুই আমার জীবনের ওই মানুষটা, যে বেশি কথা বলেন, কিন্তু না থাকলেই সব ঠিকঠাক লাগে। তোর বকা দেওয়ায় আছে রাগ, নাই যত্ন; তোর হাসিতে irritated লাগে বুকটা। আমি দুষ্ট হলেও, তুই হলি নিম নিম্যা শয়তান — এই দুইটাই মিলেই ব্যালান্স। আজ তোর দিন, তাই বেশি কিছু না—শুধু এটা জান, তুই না থাকলে আমার জীবনটা একটু বেশি শক্ত, একটু বেশি ঠিকঠাক হয়। ভালো থাকিস, হাসিখুশি থাকিস। আর তারতারি বিয়া করলে ভালোই হয় অনেক দিন খাই না। শুভ জন্মদিন, বুবু।`;

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      heartRef.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: heartRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.to(heartRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1.5,
    });

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
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
      className="relative w-full min-h-screen py-24 overflow-hidden flex items-center"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-heart"
            style={{
              left: `${5 + i * 10}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + Math.random() * 3}s`,
            }}
          >
            <Heart 
              className="text-purple-500/20 fill-purple-500/20" 
              size={20 + Math.random() * 30}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0">
          <div className="inline-flex items-center gap-3 mb-6">
            <Gift className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-space tracking-[0.3em] uppercase text-white/50">A Special Message</span>
            <Gift className="w-5 h-5 text-pink-400" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-4">
            A Wish For <span className="text-gradient">You</span>
          </h2>
        </div>

        {/* Crystal Heart */}
        <div ref={heartRef} className="flex justify-center mb-12 opacity-0">
          <div className="relative w-28 h-28 md:w-36 md:h-36">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-2xl"
            >
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b026ff" />
                  <stop offset="50%" stopColor="#ff2d95" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <path
                d="M50 85 C50 85 20 60 20 40 C20 25 30 15 42 15 C47 15 50 20 50 20 C50 20 53 15 58 15 C70 15 80 25 80 40 C80 60 50 85 50 85Z"
                fill="url(#heartGradient)"
                filter="url(#glow)"
              />
              
              <path
                d="M35 30 Q40 25 45 35"
                fill="none"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            
            <div className="absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '4s' }}>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Wish Card */}
        <div ref={cardRef} className="relative opacity-0">
          <div className="relative glass-card rounded-3xl p-8 md:p-12">
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-purple-500/40" />
            <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-pink-500/40" />
            <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-cyan-500/40" />
            <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-purple-500/40" />
            
            {/* Bengali Wish */}
            <div className="mb-8">
              <TypewriterText text={bengaliWish} delay={500} />
            </div>
            
            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent" />
            </div>
            
            {/* Signature */}
            <div className="text-right">
              <p className="font-script text-2xl text-gradient">With Love,</p>
              <p className="text-white/60 mt-1 font-space">Your Brother</p>
            </div>
          </div>
          
          {/* Sparkles */}
          <div className="absolute -top-4 -right-4 animate-spin" style={{ animationDuration: '5s' }}>
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-heart {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }
        .animate-float-heart {
          animation: float-heart linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Wish;