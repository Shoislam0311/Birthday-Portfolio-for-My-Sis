import { useState, useEffect } from 'react';
import { Menu, X, ChevronUp, Crown } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Hero');
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'Hero';

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          const sectionNames = ['Hero', 'Timeline', 'Gallery', 'Quotes', 'Footer'];
          currentSection = sectionNames[index] || 'Hero';
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

  const scrollToSection = (sectionIndex: number) => {
    const sections = document.querySelectorAll('section');
    sections[sectionIndex]?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  if (!isMobile) return null;

  const sections = ['Hero', 'Timeline', 'Gallery', 'Quotes', 'Footer'];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-luxury-violet/90 backdrop-blur-sm text-luxury-grey px-6 py-3 rounded-full flex items-center gap-3 shadow-premium glow-violet hover:bg-luxury-violet transition-all font-bold uppercase text-xs tracking-wider"
          aria-label="Open navigation menu"
        >
          <Menu className="w-4 h-4" />
          <span className="font-bold text-xs tracking-wider">Menu</span>
        </button>
      ) : (
        <div className="w-72 bg-luxury-black/95 backdrop-blur-lg rounded-xl border border-luxury-violet/20 shadow-premium overflow-hidden">
          <div className="p-4 border-b border-luxury-violet/10">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full text-luxury-grey"
              aria-label="Close navigation menu"
            >
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-luxury-violet" />
                <span className="font-bold text-sm uppercase tracking-wider">Menu</span>
              </div>
              <X className="w-5 h-5 text-luxury-violet/60" />
            </button>
          </div>

          <div className="py-2">
            {sections.map((section, index) => {
              const isActive = activeSection === section;
              return (
                <button
                  key={section}
                  onClick={() => scrollToSection(index)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-left transition-all ${
                    isActive
                      ? 'bg-luxury-violet/10 text-luxury-violet font-bold'
                      : 'text-luxury-grey/70 hover:text-luxury-violet hover:bg-luxury-violet/5 font-medium'
                  }`}
                >
                  <span className="font-bold text-xs uppercase tracking-wider">{section}</span>
                  {isActive && (
                    <ChevronUp className="w-4 h-4 text-luxury-violet" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-luxury-violet/10">
            <p className="text-xs text-luxury-grey/50 text-center tracking-widest uppercase font-bold">
              Special Edition 2026
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavigation;