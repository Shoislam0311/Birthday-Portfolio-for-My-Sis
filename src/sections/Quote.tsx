import { motion } from 'framer-motion';
import { Quote as QuoteIcon, Heart } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

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
      className="text-xl md:text-3xl font-medium text-white/90 leading-relaxed italic"
    >
      {displayText}
      {started && displayText.length < text.length && (
        <span className="animate-pulse text-premium-violet">|</span>
      )}
    </p>
  );
};

const Quote = () => {
  const bengaliWish = `বুবু,শুভ জন্মদিন। তুই আমার জীবনের ওই মানুষটা,যে একচের প্যানা পোডে কিন্তু না থাকলেই সব ঠিকঠাক লাগে। তোর বকা দেওয়ায় আছে রাগ,নাই যত্ন;তুই হাসলে গরিলা এর মত দেখায় তাই irritated লাগে বুকটা। আমি যদি দুষ্ট হই,হালে তুই হলি নিম নিম্যা শয়তান—এই দুইটাই মিলেই ব্যালান্স। আজ তোর দিন,তাই বেশি কিছু বললাম না যদি রাগ হইয়া ট্রিট টা না দাও—শুধু এটা জান,তুই না থাকলে আমার জীবনটা একটু বেশি শক্ত,একটু বেশি ঠিকঠাক হয়। ভালো থাকিস,যেইরকম আছো সেইরকম থাকিস,দুলাভাইরে বিয়ার পর আমার চে বেশি জ্বালাবি,হাসিখুশি থাকিস। আর তারতারি বিয়া করলে ভালোই হয় অনেক দিন কোনো বিয়া খাই না। সর্বশেষ শুভ জন্মদিন,বুবু।`;

  return (
    <section id="celebrate" className="py-40 bg-premium-black relative overflow-hidden flex items-center justify-center">
      {/* Dramatic Lighting */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-premium-violet/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-premium-teal/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block p-4 rounded-full bg-premium-violet/10 border border-premium-violet/20 mb-12"
        >
          <QuoteIcon className="w-8 h-8 text-premium-violet" fill="currentColor" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12">
            <TypewriterText text={bengaliWish} delay={500} />
          </div>

          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-premium-violet" />
              <Heart className="w-5 h-5 text-premium-violet animate-pulse" />
              <div className="h-[1px] w-12 bg-premium-violet" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white tracking-tight">With Love,</p>
              <p className="text-premium-violet font-bold mt-1 uppercase tracking-widest text-sm">Your Brother</p>
            </div>
          </motion.footer>
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;
