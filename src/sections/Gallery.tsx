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
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer opacity-0 group"
    >
      <div className="relative overflow-hidden rounded-lg border-minimal bg-white transition-all duration-300 hover:shadow-minimal-lg hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
              <Camera className="w-6 h-6 text-neutral-400" />
            </div>
          )}
          <img
            src={photo.src}
            alt={photo.caption}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } group-hover:scale-105`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Simple Caption Overlay */}
          <div className="absolute inset-0 bg-black/60 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-medium">
              {photo.caption}
            </p>
          </div>
        </div>
      </div>
      
      {/* Simple Index Number */}
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-medium flex items-center justify-center shadow-minimal">
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
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
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
      className="relative w-full py-24 bg-neutral-50"
    >
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-neutral-300" />
            <Camera className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-medium uppercase tracking-wider text-neutral-500">Photo Gallery</span>
            <Camera className="w-5 h-5 text-neutral-600" />
            <div className="w-8 h-px bg-neutral-300" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
            Memories
          </h2>
          
          <p className="text-neutral-600 max-w-xl mx-auto text-lg">
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
            <div className="text-3xl font-bold text-teal-600">{photos.length}</div>
            <div className="text-sm text-neutral-500 uppercase tracking-wider mt-1">Photos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-600">∞</div>
            <div className="text-sm text-neutral-500 uppercase tracking-wider mt-1">Memories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-600">1</div>
            <div className="text-sm text-neutral-500 uppercase tracking-wider mt-1">Birthday Girl</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;