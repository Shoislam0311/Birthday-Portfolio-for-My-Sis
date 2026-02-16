import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { MagicCard } from '@/components/ui/magic-card';

const images = [
  {
    url: 'https://i.ibb.co/X7R0S0T/1.jpg',
    title: 'Our Precious Moments',
    category: 'Archive 01',
  },
  {
    url: 'https://i.ibb.co/X7R0S0T/1.jpg',
    title: 'Our Precious Moments',
    category: 'Archive 02',
  },
  {
    url: 'https://i.ibb.co/X7R0S0T/1.jpg',
    title: 'Our Precious Moments',
    category: 'Archive 03',
  },
  {
    url: 'https://i.ibb.co/X7R0S0T/1.jpg',
    title: 'Our Precious Moments',
    category: 'Archive 04',
  },
  {
    url: 'https://i.ibb.co/X7R0S0T/1.jpg',
    title: 'Our Precious Moments',
    category: 'Archive 05',
  },
  {
    url: 'https://i.ibb.co/X7R0S0T/1.jpg',
    title: 'Our Precious Moments',
    category: 'Archive 06',
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="py-32 bg-premium-black relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 text-premium-violet mb-4"
            >
              <Camera className="w-5 h-5" />
              <span className="uppercase tracking-[0.3em] text-sm font-bold">Archives</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-extrabold tracking-tighter"
            >
              MEMORY <span className="text-gradient-violet">GALLERY</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-premium-grey/50 max-w-sm text-sm uppercase tracking-widest leading-relaxed"
          >
            A curated collection of moments that define a lifetime of excellence.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <MagicCard
                className="group relative h-[450px] overflow-hidden rounded-2xl border-white/5"
                gradientColor="rgba(108, 60, 240, 0.1)"
              >
                <div className="absolute inset-0">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0 opacity-60 group-hover:opacity-100"
                  />
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-premium-black via-transparent to-transparent opacity-80" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-premium-violet font-bold text-xs uppercase tracking-[0.3em] mb-2 block">
                    {img.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-4">
                    {img.title}
                  </h3>
                  <div className="w-0 group-hover:w-full h-[2px] bg-premium-violet transition-all duration-700" />
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-premium-violet/20 transition-colors duration-500 rounded-2xl pointer-events-none" />
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
