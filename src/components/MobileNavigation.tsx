import { useState, useEffect } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const sections = [
  { name: 'Hero', id: 'hero' },
  { name: 'Gallery', id: 'gallery' },
  { name: 'Music', id: 'music' },
  { name: 'Wish', id: 'wish' },
  { name: 'Cake', id: 'cake' },
  { name: 'Send Wish', id: 'send-wish' }
];

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Hero');
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      let currentSection = 'Hero';

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section.name;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-luxury-blue/90 backdrop-blur-sm text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-premium glow-blue hover:bg-luxury-blue transition-all"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
          <span className="font-medium text-sm tracking-wide">Navigate</span>
        </button>
      ) : (
        <div className="w-64 bg-luxury-black/95 backdrop-blur-lg rounded-xl border border-luxury-blue/20 shadow-premium overflow-hidden">
          <div className="p-4 border-b border-luxury-blue/10">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full text-white"
              aria-label="Close navigation menu"
            >
              <span className="font-serif-display text-lg">Navigation</span>
              <X className="w-5 h-5 text-luxury-blue/60" />
            </button>
          </div>

          <div className="py-2">
            {sections.map((section) => {
              const isActive = activeSection === section.name;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-left transition-all ${
                    isActive
                      ? 'bg-luxury-blue/10 text-luxury-blue font-medium'
                      : 'text-white/70 hover:text-luxury-blue hover:bg-luxury-blue/5'
                  }`}
                >
                  <span className="font-serif-body">{section.name}</span>
                  {isActive && (
                    <ChevronUp className="w-4 h-4 text-luxury-blue" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-luxury-blue/10">
            <p className="text-xs text-white/50 text-center tracking-wide uppercase">
              Scroll or tap to navigate
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavigation;
