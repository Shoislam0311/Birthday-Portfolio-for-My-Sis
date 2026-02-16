import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import GlowButton from '../components/ui/glow-button';
import NeonText from '../components/ui/neon-text';
import ParticleBackground from '../components/ui/particle-background';

gsap.registerPlugin(ScrollTrigger);

export default function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: 'power3.out',
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden cinematic-bg"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-charcoal/20 to-electric-charcoal/80 pointer-events-none" />

      {/* Decorative Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-violet/20 rounded-full blur-3xl animate-float-slow"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-electric-violet-dark/30 rounded-full blur-3xl animate-float-medium"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="inline-block mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric-violet/30 bg-electric-violet/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-electric-violet animate-pulse" />
            <span className="text-sm font-medium text-electric-violet-light tracking-widest uppercase">
              Special Edition 2026
            </span>
          </span>
        </motion.div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-serif-display text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight"
        >
          <NeonText variant="gradient">HAPPY</NeonText>
          <br />
          <span className="text-white">BIRTHDAY</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-electric-soft-grey/80 mb-12 font-serif-body max-w-2xl mx-auto"
        >
          A celebration of life, love, and unforgettable moments. Welcome to the
          premium edition.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <GlowButton
            variant="default"
            onClick={() => {
              const gallery = document.getElementById('gallery');
              gallery?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Gallery
          </GlowButton>
          <GlowButton
            variant="outline"
            onClick={() => {
              const wish = document.getElementById('wish');
              wish?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Send Your Wish
          </GlowButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-electric-soft-grey/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-sm tracking-widest uppercase">Scroll Down</span>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
