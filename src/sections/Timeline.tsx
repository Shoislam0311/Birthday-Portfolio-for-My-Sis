import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Trophy, Star, Target, Zap, Award } from 'lucide-react';

const achievements = [
  {
    year: '2022',
    title: 'The Foundation',
    description: 'Setting the vision and embarking on a journey of continuous growth and excellence.',
    icon: <Target className="w-5 h-5" />,
  },
  {
    year: '2023',
    title: 'Breaking Barriers',
    description: 'Achieving significant milestones and pushing the boundaries of what was thought possible.',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    year: '2024',
    title: 'Peak Performance',
    description: 'Mastering the craft and being recognized for outstanding contributions and dedication.',
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    year: '2025',
    title: 'New Horizons',
    description: 'Expanding influence and leading with innovative ideas and a powerful vision for the future.',
    icon: <Star className="w-5 h-5" />,
  },
  {
    year: '2026',
    title: 'Elite Status',
    description: 'Reaching a level of excellence that defines a new standard of luxury and power.',
    icon: <Award className="w-5 h-5" />,
  },
];

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section id="timeline" ref={containerRef} className="relative py-32 bg-premium-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-premium-violet/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter"
          >
            A LEGACY OF <span className="text-gradient-violet">ACHIEVEMENT</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-premium-grey/50 uppercase tracking-[0.3em] text-sm"
          >
            The Journey to Excellence
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block" />
          <motion.div
            style={{ scaleY: pathLength, originY: 0 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-premium-violet hidden md:block"
          />

          <div className="space-y-24">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="glass-premium p-8 rounded-2xl border-white/5 hover:border-premium-violet/30 transition-all duration-500 group">
                    <span className="text-premium-violet font-bold text-lg mb-2 block">{item.year}</span>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-premium-grey/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Dot/Icon */}
                <div className="relative z-20 flex items-center justify-center w-12 h-12 rounded-full bg-premium-black border border-premium-violet/50 shadow-[0_0_20px_rgba(108,60,240,0.3)]">
                  <div className="text-premium-violet">
                    {item.icon}
                  </div>
                </div>

                {/* Spacer for layout symmetry */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
