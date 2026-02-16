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
      className="font-serif-body text-lg md:text-xl text-black leading-relaxed"
      style={{ lineHeight: 2 }}
    >
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse text-luxury-blue">|</span>
      )}
    </p>
  );
};

const Wish = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  const bengaliWish = `শুভ জন্মদিন, আমার ৫ ফুটের নিচে আটকে পড়া 'Pookie'! 🎂🦍🤏

"হ্যাপি বার্থডে, আমার ন্যানো-টেকনোলজি বুবু! তোরে উইশ করতে আসছি কারণ তুই বয়সে বড় (যদিও হাইটে নার্সারি বাচ্চার সমান), আর ট্রিট মিস করার রিস্ক নেওয়া যাবে না।
শোন, আল্লাহ তোরে বানানোর সময় হাইট দিতে ভুইলা গেছিল, তাই তুই Under 5 Feet-এ জাইত্যা পইড়া আছিস। তোরে পাশে নিয়া হাঁটলে মনে হয় পকেটে চাবির রিং নিয়া ঘুরতাছি। ২ ইঞ্চি ওপর থেকে দুনিয়াটা দেখতে কেমন লাগে রে? পিচ্চি মানুষ, অথচ মেজাজটা তো মাশাল্লাহ বুর্জ খলিফার টপ ফ্লোরে থাকে! 🤏🦍
তোর ক্যারেক্টার তো পুরাই সাসপেন্স থ্রিলার। সারাদিন হাড়িপাতিল লাড়াচাড়া করস, রান্না করস—কিন্তু খাস না! খাবারে কি বিষ মিশাস নাকি? আর ওইদিকে ট্রাস্ট ইস্যুর ঠেলায় কাউরে বিশ্বাস করস না, আবার নিজেই 'রোগী' সাইজা বইসা থাকস। তোর ইমোশন তো তোর হাইটের চেয়েও কম—একদম Emotionless Robot! সারাদিন ফোনের স্ক্রিন ঘষিস, গরিলাও তোরে দেখলে কনফিউজড হয়া যাবে যে, 'আমার প্রজাতি কি স্মার্টফোন ইউজ করা শিখলো কবে?' 🦍📱
আর হ্যাঁ, ন্যাশনাল ভার্সিটি (NU) তো ধন্য তোরে পাইয়া! খালেদা জিয়া NU বানাইছে আর এ.এন.এম. এহছানুল হক মিলন আইছে—মনে হয় তোরেই সাইজ করার লাইগা। তুই যে লেভেলের টেরা আর ঘাড়ত্ধ্যাড়া, NU-এর সিলেবাসেও তোর নাম থাকা উচিত 'The Shortest Terror' হিসেবে। 🎓🤣
দুলাভাইয়ের জন্য এখনই আমার ২ মিনিট নীরবতা পালন করতে ইচ্ছা করতেছে। বেচারা জানে না কোন আগুনের গোলায় হাত দিতেছে! তুই আমারে যা জ্বালাস, তার ডাবল জ্বালাবি ওরে। তখন বেচারা আমারে ফোন দিয়া কান্দবে আর আমি বলবো—'ভাই, এই ৫ ফুটের নিচের তুফান সামলান, আমার দ্বারা সম্ভব না!'
যাই হোক, তাড়াতাড়ি বিয়াটা কর। অনেকদিন বিয়ার দাওয়াত খাই না, পেটে তো চড়া পইড়া গেছে! তুই না থাকলে ঘরটা বড্ড বেশি শান্ত থাকে—যেটা আমি একদম সহ্য করতে পারি না। তোরে অনেক মিস করি (ভুল কইরা আরকি!), তুই ছাড়া ঝগড়া করার মানুষ নাই।
ভালো থাকিস, আমার ঝগড়াটে Pookie! তাড়াতাড়ি ট্রিট পাঠা, নাইলে তোর হাইট নিয়া ফেসবুকে পোস্ট দিমু।
শুভ জন্মদিন, বুবু! 🥳💖🦍🍖"`;

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
    <section id="wish"
      ref={sectionRef}
      className="relative w-full py-24 bg-luxury-white flex items-center"
    >
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-8 md:mb-12 opacity-0">
          <div className="inline-flex items-center gap-4 mb-6 md:mb-8">
            <div className="w-12 h-px bg-luxury-blue" />
            <Gift className="w-5 h-5 text-luxury-blue" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-luxury-blue">A Special Message</span>
            <Gift className="w-5 h-5 text-luxury-blue" />
            <div className="w-12 h-px bg-luxury-blue" />
          </div>

          <h2 className="font-serif-display text-3xl md:text-4xl lg:text-6xl font-semibold text-black mb-4 md:mb-6">
            A Wish For <span className="text-gradient-blue">You</span>
          </h2>
        </div>

        {/* Animated Blue Underline */}
        <div ref={heartRef} className="flex justify-center mb-16 opacity-0">
          <div className="relative w-32 h-1">
            <div className="absolute inset-0 bg-luxury-blue glow-blue" />
          </div>
        </div>

        {/* Wish Card */}
        <div ref={cardRef} className="relative opacity-0">
          <MagicCard
            className="p-10 md:p-14 card-premium bg-white/50 backdrop-blur-sm"
            gradientFrom="rgba(0, 102, 255, 0.05)"
            gradientTo="rgba(0, 102, 255, 0.02)"
            gradientSize={400}
          >
            {/* Bengali Wish */}
            <div className="mb-8">
              <TypewriterText text={bengaliWish} delay={300} />
            </div>

            {/* Simple Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-luxury-blue" />
              <div className="w-4 h-4 border-2 border-luxury-blue rounded-full" />
              <div className="flex-1 h-px bg-luxury-blue" />
            </div>

            {/* Signature */}
            <div className="text-right">
              <p className="text-xl font-semibold text-black tracking-tight">With Love,</p>
              <p className="text-luxury-blue font-medium mt-2">Your Brother</p>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
};

export default Wish;
