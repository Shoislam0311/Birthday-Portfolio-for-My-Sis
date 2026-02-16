import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Star, Award, Target, Zap, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Achievement {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  color: string;
}

const achievements: Achievement[] = [
  {
    year: '2020',
    title: 'THE BEGINNING',
    description: 'Started the journey with a vision to create something extraordinary. First steps towards greatness.',
    icon: <Star className="w-6 h-6" />,
    category: 'Genesis',
    color: 'violet'
  },
  {
    year: '2021',
    title: 'BREAKTHROUGH',
    description: 'Achieved the first major milestone that changed everything. Innovation met determination.',
    icon: <Zap className="w-6 h-6" />,
    category: 'Innovation',
    color: 'teal'
  },
  {
    year: '2022',
    title: 'EXCELLENCE',
    description: 'Recognized for outstanding performance and exceptional contributions to the field.',
    icon: <Trophy className="w-6 h-6" />,
    category: 'Achievement',
    color: 'violet'
  },
  {
    year: '2023',
    title: 'MASTERY',
    description: 'Reached the pinnacle of expertise. Mastery achieved through dedication and relentless pursuit.',
    icon: <Crown className="w-6 h-6" />,
    category: 'Mastery',
    color: 'teal'
  },
  {
    year: '2024',
    title: 'LEGACY',
    description: 'Established a lasting legacy that continues to inspire and influence future generations.',
    icon: <Award className="w-6 h-6" />,
    category: 'Legacy',
    color: 'violet'
  },
  {
    year: '2026',
    title: 'TRANSFORMATION',
    description: 'The ultimate evolution. A complete transformation into something beyond imagination.',
    icon: <Target className="w-6 h-6" />,
    category: 'Future',
    color: 'teal'
  }
];

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      const timelineLine = timelineRef.current?.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.fromTo(timelineLine, 
          { scaleY: 0 },
          { 
            scaleY: 1, 
            duration: 2, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
              end: 'bottom 20%',
              scrub: true
            }
          }
        );
      }

      // Animate achievement cards
      const cards = timelineRef.current?.querySelectorAll('.achievement-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(card,
            { 
              opacity: 0, 
              y: 50,
              scale: 0.9 
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              delay: index * 0.2,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }

      // Animate timeline dots
      const dots = timelineRef.current?.querySelectorAll('.timeline-dot');
      if (dots) {
        dots.forEach((dot, index) => {
          gsap.fromTo(dot,
            { 
              scale: 0,
              opacity: 0 
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(1.7)',
              delay: index * 0.3 + 0.5,
              scrollTrigger: {
                trigger: dot,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getColorClasses = (color: string, index: number) => {
    const isEven = index % 2 === 0;
    if (color === 'violet') {
      return {
        card: `glass-premium border-luxury-violet/20 ${isEven ? 'ml-0 mr-8' : 'ml-8 mr-0'} hover:border-luxury-violet/40`,
        icon: 'text-luxury-violet bg-luxury-violet/10 border-luxury-violet/20',
        accent: 'bg-luxury-violet'
      };
    } else {
      return {
        card: `glass-premium border-luxury-teal/20 ${isEven ? 'ml-0 mr-8' : 'ml-8 mr-0'} hover:border-luxury-teal/40`,
        icon: 'text-luxury-teal bg-luxury-teal/10 border-luxury-teal/20',
        accent: 'bg-luxury-teal'
      };
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-luxury-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-luxury-violet/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-luxury-teal/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-luxury-grey mb-6 tracking-tight uppercase text-gradient-premium">
            TIMELINE OF EXCELLENCE
          </h2>
          <p className="text-lg md:text-xl text-luxury-grey/70 max-w-3xl mx-auto font-medium">
            A journey through the most significant milestones and achievements that define excellence
          </p>
          <div className="divider-premium-thick mt-8 max-w-md mx-auto" />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-luxury-violet via-luxury-teal to-luxury-violet transform -translate-x-1/2 origin-top timeline-line" />

          {/* Timeline Items */}
          <div className="space-y-24">
            {achievements.map((achievement, index) => {
              const colors = getColorClasses(achievement.color, index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`achievement-card relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-20">
                    <div className={`w-16 h-16 rounded-full ${colors.icon} border-2 flex items-center justify-center backdrop-blur-sm glow-violet-soft timeline-dot animate-pulse-glow`}>
                      {achievement.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full max-w-md ${isEven ? 'pr-16' : 'pl-16'} group`}>
                    <div className={`glass-premium rounded-2xl p-8 hover-premium-lift transition-all duration-500 ${colors.card} relative overflow-hidden`}>
                      {/* Accent Line */}
                      <div className={`absolute top-0 left-0 w-full h-1 ${colors.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-sm font-bold text-luxury-violet tracking-widest uppercase bg-luxury-violet/10 px-3 py-1 rounded-full">
                            {achievement.year}
                          </span>
                          <span className="text-xs font-semibold text-luxury-grey-dark tracking-wider uppercase">
                            {achievement.category}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-luxury-grey mb-4 group-hover:text-gradient-premium transition-all duration-300">
                          {achievement.title}
                        </h3>
                        
                        <p className="text-luxury-grey/70 leading-relaxed font-medium">
                          {achievement.description}
                        </p>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className={`absolute inset-0 bg-gradient-to-br from-luxury-violet/5 to-luxury-teal/5 rounded-2xl`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;