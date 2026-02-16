import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Heart, Share2, Download, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  category: string;
  year: string;
  mood: 'elegant' | 'powerful' | 'luxurious';
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    title: 'ELITE PERFORMANCE',
    description: 'Capturing moments of pure excellence and extraordinary achievement',
    category: 'Success',
    year: '2026',
    mood: 'powerful'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    title: 'LUXURY COLLECTION',
    description: 'Curated experiences that define premium living and sophistication',
    category: 'Lifestyle',
    year: '2026',
    mood: 'luxurious'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    title: 'MASTERPIECE MOMENTS',
    description: 'Every frame tells a story of dedication, passion, and uncompromising quality',
    category: 'Artistry',
    year: '2026',
    mood: 'elegant'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2338&q=80',
    title: 'SIGNATURE STYLE',
    description: 'Where innovation meets elegance in perfect harmony',
    category: 'Design',
    year: '2026',
    mood: 'powerful'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    title: 'EXCEPTIONAL VISION',
    description: 'Crafting the extraordinary from the everyday, transforming possibilities into reality',
    category: 'Vision',
    year: '2026',
    mood: 'luxurious'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    title: 'ICONIC LEGACY',
    description: 'Building timeless pieces that will be remembered for generations to come',
    category: 'Legacy',
    year: '2026',
    mood: 'elegant'
  }
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate gallery items on scroll
      const items = sectionRef.current?.querySelectorAll('.gallery-item');
      if (items) {
        items.forEach((item, index) => {
          gsap.fromTo(item,
            { 
              opacity: 0, 
              y: 60,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              delay: index * 0.15,
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }

      // Parallax effect for background elements
      gsap.to('.gallery-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getMoodColors = (mood: string) => {
    switch (mood) {
      case 'elegant':
        return {
          gradient: 'from-luxury-violet/20 to-luxury-teal/20',
          glow: 'shadow-violet-glow',
          border: 'border-luxury-violet/30',
          text: 'text-luxury-violet'
        };
      case 'powerful':
        return {
          gradient: 'from-luxury-teal/20 to-luxury-plum/20',
          glow: 'shadow-teal-glow',
          border: 'border-luxury-teal/30',
          text: 'text-luxury-teal'
        };
      case 'luxurious':
        return {
          gradient: 'from-luxury-plum/20 to-luxury-violet/20',
          glow: 'shadow-premium',
          border: 'border-luxury-plum/30',
          text: 'text-luxury-plum'
        };
      default:
        return {
          gradient: 'from-luxury-violet/20 to-luxury-teal/20',
          glow: 'shadow-violet-glow',
          border: 'border-luxury-violet/30',
          text: 'text-luxury-violet'
        };
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full py-32 bg-luxury-black overflow-hidden">
      {/* Background Elements */}
      <div className="gallery-bg absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-violet/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-teal/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-3/4 left-1/2 w-96 h-96 bg-luxury-plum/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-luxury-violet animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-bold text-luxury-grey tracking-tight uppercase text-gradient-premium">
              MEMORY GALLERY
            </h2>
            <Sparkles className="w-6 h-6 text-luxury-teal animate-pulse" />
          </div>
          <p className="text-lg md:text-xl text-luxury-grey/70 max-w-3xl mx-auto font-medium">
            A curated collection of extraordinary moments, each one telling a story of excellence and achievement
          </p>
          <div className="divider-premium-thick mt-8 max-w-md mx-auto" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => {
            const moodColors = getMoodColors(item.mood);
            const isActive = activeItem === item.id;
            const isHovered = hoveredItem === item.id;

            return (
              <div
                key={item.id}
                className="gallery-item group relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className={`relative overflow-hidden rounded-2xl glass-premium hover-premium-lift transition-all duration-500 ${moodColors.border} hover:border-opacity-60 ${moodColors.glow} ${
                  isActive ? 'scale-105' : ''
                }`}>
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${moodColors.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6`}>
                      <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <p className="text-sm font-semibold mb-1">{item.category}</p>
                        <p className="text-xs opacity-80">{item.year}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-luxury-violet/20 hover:border-luxury-violet/40 transition-all duration-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-luxury-violet/20 hover:border-luxury-violet/40 transition-all duration-300">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-luxury-violet/20 hover:border-luxury-violet/40 transition-all duration-300">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${moodColors.text} bg-black/50 backdrop-blur-sm border border-current/20 tracking-wider uppercase`}>
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-luxury-grey group-hover:text-gradient-premium transition-all duration-300">
                        {item.title}
                      </h3>
                      <span className="text-sm font-bold text-luxury-grey-dark tracking-wider">
                        {item.year}
                      </span>
                    </div>
                    
                    <p className="text-luxury-grey/70 leading-relaxed font-medium">
                      {item.description}
                    </p>

                    {/* Action Row */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-luxury-grey/10">
                      <div className="flex items-center gap-4">
                        <button 
                          className="flex items-center gap-2 text-sm font-semibold text-luxury-grey hover:text-luxury-violet transition-colors duration-300"
                          onClick={() => setActiveItem(isActive ? null : item.id)}
                        >
                          <Eye className="w-4 h-4" />
                          VIEW
                        </button>
                        <button className="flex items-center gap-2 text-sm font-semibold text-luxury-grey hover:text-luxury-teal transition-colors duration-300">
                          <Download className="w-4 h-4" />
                          SAVE
                        </button>
                      </div>
                      <button className="w-8 h-8 rounded-full border border-luxury-violet/30 hover:border-luxury-violet hover:bg-luxury-violet/10 transition-all duration-300 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-luxury-violet hover:fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    isHovered ? `bg-gradient-to-br ${moodColors.gradient}` : ''
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;