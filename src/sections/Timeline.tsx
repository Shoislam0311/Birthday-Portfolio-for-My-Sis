import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from '../components/ui/glass-card';
import Spotlight from '../components/ui/spotlight';
import NeonText from '../components/ui/neon-text';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

const milestones: Milestone[] = [
  {
    year: '2018',
    title: 'The Beginning',
    description: 'Started the journey with dreams in my eyes and passion in my heart.',
  },
  {
    year: '2020',
    title: 'First Achievement',
    description: 'A milestone that marked the first step towards greatness.',
  },
  {
    year: '2022',
    title: 'Breaking Barriers',
    description: 'Overcame challenges and reached new heights of success.',
    highlight: true,
  },
  {
    year: '2024',
    title: 'Legacy Building',
    description: 'Creating a lasting impact and inspiring others.',
  },
  {
    year: '2026',
    title: 'Future Vision',
    description: 'Looking ahead with hope, ambition, and endless possibilities.',
    highlight: true,
  },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="relative py-24 md:py-32 overflow-hidden bg-electric-charcoal">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electric-deep-plum/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-electric-violet/30 to-transparent" />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16 px-4">
        <h2 className="font-serif-display text-5xl md:text-7xl font-bold mb-4">
          <NeonText variant="gradient">JOURNEY</NeonText>
        </h2>
        <p className="text-xl text-electric-soft-grey/70 max-w-2xl mx-auto font-serif-body">
          A timeline of achievements and unforgettable moments
        </p>
      </div>

      {/* Timeline Content */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 bg-electric-charcoal ${
                  milestone.highlight
                    ? 'border-electric-violet glow-violet-soft'
                    : 'border-electric-soft-grey/30'
                }`}
              />

              {/* Milestone Card */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'
                }`}
              >
                <Spotlight>
                  <GlassCard hover={!milestone.highlight}>
                    {/* Year Badge */}
                    <div className="inline-block mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold tracking-wider ${
                          milestone.highlight
                            ? 'bg-electric-violet text-white'
                            : 'bg-electric-violet/10 text-electric-violet-light'
                        }`}
                      >
                        {milestone.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-display text-2xl md:text-3xl font-bold mb-3 text-white">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-electric-soft-grey/70 text-lg font-serif-body leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Highlight Indicator */}
                    {milestone.highlight && (
                      <div className="mt-4 flex items-center gap-2 text-electric-violet-light text-sm">
                        <span className="w-2 h-2 rounded-full bg-electric-violet animate-pulse" />
                        <span className="font-medium">Featured Milestone</span>
                      </div>
                    )}
                  </GlassCard>
                </Spotlight>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-electric-charcoal to-transparent" />
    </section>
  );
}
