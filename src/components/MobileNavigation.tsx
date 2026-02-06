import { useState, useEffect } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';
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
          const sectionNames = ['Hero', 'Gallery', 'Wish', 'Cake', 'Send Wish'];
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

  const sections = ['Hero', 'Gallery', 'Wish', 'Cake', 'Send Wish'];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-luxury-blue/90 backdrop-blur-sm text-white p-3.5 rounded-full flex items-center justify-center shadow-premium glow-blue hover:bg-luxury-blue transition-all"
          aria-label="Open navigation menu"
        >
          <Menu className="w-6 h-6" />
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
            {sections.map((section, index) => {
              const isActive = activeSection === section;
              return (
                <button
                  key={section}
                  onClick={() => scrollToSection(index)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-left transition-all ${
                    isActive
                      ? 'bg-luxury-blue/10 text-luxury-blue font-medium'
                      : 'text-white/70 hover:text-luxury-blue hover:bg-luxury-blue/5'
                  }`}
                >
                  <span className="font-serif-body">{section}</span>
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