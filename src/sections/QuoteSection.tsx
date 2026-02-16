import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import NeonText from '../components/ui/neon-text';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-electric-charcoal via-electric-deep-plum/20 to-electric-charcoal"
    >
      {/* Cinematic Spotlight Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-violet/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(108, 60, 240, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108, 60, 240, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Decorative Quote Mark */}
        <motion.div
          className="text-electric-violet/20 text-9xl md:text-[200px] leading-none font-serif-display mb-[-60px] md:mb-[-100px]"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          "
        </motion.div>

        {/* Main Quote */}
        <h2 className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
          <span className="block mb-6">
            <NeonText variant="gradient">LIFE IS A</NeonText>
          </span>
          <span className="block text-white mb-6">CELEBRATION</span>
          <span className="block text-electric-soft-grey/80">
            OF EVERY MOMENT
          </span>
        </h2>

        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-4 my-12">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-electric-violet/50" />
          <div className="w-3 h-3 rounded-full bg-electric-violet glow-violet-soft" />
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-electric-violet/50" />
        </div>

        {/* Subtext */}
        <p className="text-xl md:text-2xl text-electric-soft-grey/70 max-w-3xl mx-auto font-serif-body leading-relaxed">
          Every birthday is a new chapter, a fresh page in the beautiful story
          of life. May this year bring you endless joy, boundless happiness, and
          unforgettable memories.
        </p>

        {/* Signature */}
        <div className="mt-12">
          <motion.div
            className="inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-electric-violet-light font-serif-display text-2xl italic">
              — With Love & Best Wishes
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-electric-charcoal to-transparent" />
    </section>
  );
}
