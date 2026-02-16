import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Sparkles, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    text: "EXCELLENCE IS NOT A DESTINATION BUT A CONTINUOUS JOURNEY OF BECOMING",
    author: "THE LEGACY",
    year: "2026"
  },
  {
    text: "SUCCESS IS WHERE PREPARMEDITATION AND OPPORTUNITY MEET",
    author: "THE ACHIEVER",
    year: "2026"
  },
  {
    text: "GREATNESS IS BUILT IN THE SILENT HOURS OF DEDICATION",
    author: "THE MASTER",
    year: "2026"
  }
];

const QuoteSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate decorative elements
      gsap.fromTo('.quote-decor',
        { 
          scale: 0, 
          rotation: -180 
        },
        { 
          scale: 1, 
          rotation: 0,
          duration: 1.5, 
          ease: 'power3.out',
          stagger: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate quotes
      quoteRefs.current.forEach((quote, index) => {
        if (quote) {
          gsap.fromTo(quote.querySelector('.quote-line'),
            { scaleX: 0 },
            { 
              scaleX: 1, 
              duration: 1, 
              ease: 'power2.out',
              scrollTrigger: {
                trigger: quote,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );

          gsap.fromTo(quote,
            { 
              opacity: 0, 
              y: 60,
              scale: 0.95
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: 'power2.out',
              delay: index * 0.2,
              scrollTrigger: {
                trigger: quote,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

      // Animate floating elements
      const floatElements = sectionRef.current?.querySelectorAll('.quote-float');
      if (floatElements) {
        floatElements.forEach((el, index) => {
          gsap.to(el, {
            y: -30,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: index * 0.5
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-40 bg-luxury-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-plum/10 to-luxury-black" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(108, 60, 240, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108, 60, 240, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />

        {/* Decorative orbs */}
        <div className="quote-decor absolute top-20 left-10 w-64 h-64 bg-luxury-violet/10 rounded-full blur-3xl" />
        <div className="quote-decor absolute bottom-20 right-10 w-64 h-64 bg-luxury-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="w-5 h-5 text-luxury-violet" />
            <span className="text-sm font-bold text-luxury-violet tracking-[0.3em] uppercase">
              Words of Wisdom
            </span>
            <Star className="w-5 h-5 text-luxury-violet" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-luxury-grey tracking-tight uppercase text-gradient-premium">
            THE LEGACY QUOTES
          </h2>
          <div className="divider-premium-thick mt-8 max-w-md mx-auto" />
        </div>

        {/* Quotes */}
        <div className="space-y-16">
          {quotes.map((quote, index) => (
            <div
              key={index}
              ref={(el) => { quoteRefs.current[index] = el }}
              className="relative"
            >
              {/* Quote Card */}
              <div className="relative glass-premium rounded-3xl p-8 md:p-16 text-center group hover-premium-lift transition-all duration-500 border border-luxury-violet/20 hover:border-luxury-violet/40">
                {/* Accent Line */}
                <div className="quote-line absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-luxury-violet to-transparent transform scale-x-0 origin-center" />

                {/* Quote Icon */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-luxury-black border-2 border-luxury-violet/30 flex items-center justify-center">
                    <Quote className="w-5 h-5 text-luxury-violet" />
                  </div>
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Sparkles className="absolute -top-8 -left-8 w-6 h-6 text-luxury-violet/30 quote-float" />
                  
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-luxury-grey leading-relaxed tracking-wide uppercase group-hover:text-gradient-premium transition-all duration-500">
                    {quote.text}
                  </h3>
                  
                  <Sparkles className="absolute -bottom-8 -right-8 w-6 h-6 text-luxury-teal/30 quote-float" style={{ animationDelay: '1s' }} />
                </div>

                {/* Author & Year */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12 pt-8 border-t border-luxury-grey/10">
                  <span className="text-sm font-bold text-luxury-violet tracking-[0.2em] uppercase">
                    — {quote.author}
                  </span>
                  <div className="hidden md:block w-1 h-1 rounded-full bg-luxury-grey/30" />
                  <span className="text-sm font-semibold text-luxury-grey-dark tracking-wider">
                    {quote.year}
                  </span>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-luxury-violet/5 via-transparent to-luxury-teal/5 rounded-3xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decor */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-luxury-violet" />
            <Star className="w-6 h-6 text-luxury-violet animate-pulse" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-luxury-violet" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;