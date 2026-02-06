import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Heart } from 'lucide-react';
import Marquee from '@/components/ui/marquee';

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

const PhotoCard = ({ photo }: { photo: typeof photos[0] }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-48 md:w-64 lg:w-80 flex-shrink-0 cursor-pointer group">
      <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-luxury-blue/20 bg-black transition-all duration-300 group-hover:shadow-blue-glow group-hover:-translate-y-2 group-hover:scale-102">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-black animate-pulse flex items-center justify-center">
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-luxury-blue/30" />
            </div>
          )}
          <img
            src={photo.src}
            alt={photo.caption}
            className={`w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
            } group-hover:scale-105`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-4 md:translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-white text-sm md:text-lg font-semibold tracking-tight font-serif-display">
              {photo.caption}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-px w-6 md:w-8 bg-luxury-blue" />
              <span className="text-luxury-blue text-xs font-bold uppercase tracking-widest">Memory</span>
            </div>
          </div>
        </div>
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
        ease: 'expo.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  const firstRow = photos.slice(0, photos.length / 2);
  const secondRow = photos.slice(photos.length / 2);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative w-full py-32 bg-luxury-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-blue/5 rounded-full blur-3xl opacity-60 -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-blue/5 rounded-full blur-3xl opacity-60 translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-24 px-4 opacity-0">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-luxury-blue to-transparent" />
            <Camera className="w-6 h-6 text-luxury-blue" />
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-luxury-blue">Visual Journey</span>
            <Camera className="w-6 h-6 text-luxury-blue" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-luxury-blue to-transparent" />
          </div>

          <h2 className="font-serif-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-6 md:mb-8 tracking-tight">
            Our Precious <span className="text-gradient-blue">Moments</span>
          </h2>

          <p className="font-serif-body text-white/80 max-w-xl md:max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed">
            Every picture tells a story of laughter, growth, and the beautiful bond we share.
            Scroll to see the highlights of our journey together.
          </p>
        </div>

        {/* Photo Marquees */}
        <div className="relative flex flex-col gap-12 md:gap-16">
          <Marquee pauseOnHover className="[--duration:60s]">
            {firstRow.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:60s]">
            {secondRow.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </Marquee>

          {/* Fading Edges Overlay */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-luxury-black" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-luxury-black" />
        </div>

        {/* Stats & Interactive element */}
        <div className="mt-32 flex flex-col items-center gap-12 px-4">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="text-center group">
              <div className="font-serif-display text-5xl md:text-7xl font-semibold text-white group-hover:text-luxury-blue transition-colors duration-300">
                {photos.length}
              </div>
              <div className="text-xs font-bold text-luxury-blue/60 uppercase tracking-[0.4em] mt-3">Frames</div>
            </div>
            <div className="text-center group">
              <div className="font-serif-display text-5xl md:text-7xl font-semibold text-white group-hover:text-luxury-blue transition-colors duration-300 italic">
                ∞
              </div>
              <div className="text-xs font-bold text-luxury-blue/60 uppercase tracking-[0.4em] mt-3">Laughter</div>
            </div>
            <div className="text-center group">
              <div className="font-serif-display text-5xl md:text-7xl font-semibold text-white group-hover:text-luxury-blue transition-colors duration-300">
                1
              </div>
              <div className="text-xs font-bold text-luxury-blue/60 uppercase tracking-[0.4em] mt-3">Queen</div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-6 py-3 card-premium rounded-full text-sm font-medium">
            <Heart className="w-4 h-4 text-luxury-blue fill-luxury-blue" />
            <span className="text-white/80">Keep scrolling, there's more!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
