import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Real photos from Imgur with custom captions
const photos = [
  { id: 1, src: 'https://i.imgur.com/2gB45PS.jpeg', caption: 'The Happiness' },
  { id: 2, src: 'https://i.imgur.com/pBcYNMF.jpeg', caption: 'First Time Pookie' },
  { id: 3, src: 'https://i.imgur.com/Zl4lUN8.jpeg', caption: 'Lambu and Bauni' },
  { id: 4, src: 'https://i.imgur.com/d7B511v.jpeg', caption: 'Trying to be Pookie' },
  { id: 5, src: 'https://i.imgur.com/DpuwGmG.jpeg', caption: 'Near Pookie' },
  { id: 6, src: 'https://i.imgur.com/SfuegEC.jpeg', caption: 'Trying to Avoid the Sun' },
  { id: 7, src: 'https://i.imgur.com/oMtK9UQ.jpeg', caption: 'Still Struggling with Sun' },
  { id: 8, src: 'https://i.imgur.com/Oysxqe3.jpeg', caption: 'Almost Pookie' },
  { id: 9, src: 'https://i.imgur.com/6j1w5sD.jpeg', caption: 'Before Entering Pookie' },
  { id: 10, src: 'https://i.imgur.com/np4x5eP.jpeg', caption: 'Innocent রূপে শয়তান' },
  { id: 11, src: 'https://i.imgur.com/KIeToWt.jpeg', caption: 'Three Certified Mathematician' },
  { id: 12, src: 'https://i.imgur.com/iVsb2f8.jpeg', caption: 'Twoo Pokies' },
  { id: 13, src: 'https://i.imgur.com/qTYVYzG.jpeg', caption: 'Big Father, Queen Mother, Bauni Sister' },
  { id: 14, src: 'https://i.imgur.com/CNsUPMb.jpeg', caption: 'হতাশ বিয়ে না হওয়ায়' },
  { id: 15, src: 'https://i.imgur.com/MiKkRKi.jpeg', caption: 'Elephant and ant' },
  { id: 16, src: 'https://i.imgur.com/a0prz59.jpeg', caption: 'Two ghost in one frame' },
  { id: 17, src: 'https://i.imgur.com/cm497bY.jpeg', caption: 'Good Moment' },
  { id: 18, src: 'https://i.imgur.com/EvpJbQ8.png', caption: 'Birthday Girl' },
];

const PhotoCard = ({ photo, index }: { photo: typeof photos[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    
    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer opacity-0 group"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative overflow-hidden rounded-2xl glass-card transition-all duration-500 group-hover:neon-border"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center">
              <Camera className="w-8 h-8 text-white/20" />
            </div>
          )}
          <img
            src={photo.src}
            alt={photo.caption}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-60'
            }`}
          />
          
          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className={`font-script text-xl text-white transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'
            }`}>
              {photo.caption}
            </p>
          </div>
          
          {/* Glow Effect on Hover */}
          <div 
            className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(176, 38, 255, 0.2) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>
      
      {/* Index Number */}
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold shadow-lg">
        {index + 1}
      </div>
    </div>
  );
};

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500" />
            <Camera className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-space tracking-[0.3em] uppercase text-white/50">Photo Gallery</span>
            <Camera className="w-5 h-5 text-pink-400" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-500" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-6">
            <span className="text-gradient">Memories</span>
          </h2>
          
          <p className="text-white/50 max-w-xl mx-auto text-lg font-light">
            A collection of moments that tell your story. Each photo holds a memory, each memory holds a feeling.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <PhotoCard key={photo.id} photo={photo} index={index} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 flex justify-center gap-12">
          <div className="text-center">
            <div className="text-4xl font-playfair font-bold text-gradient">{photos.length}</div>
            <div className="text-sm text-white/40 font-space uppercase tracking-wider mt-1">Photos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-playfair font-bold text-gradient-gold">∞</div>
            <div className="text-sm text-white/40 font-space uppercase tracking-wider mt-1">Memories</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-playfair font-bold text-pink-400">1</div>
            <div className="text-sm text-white/40 font-space uppercase tracking-wider mt-1">Birthday Girl</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;