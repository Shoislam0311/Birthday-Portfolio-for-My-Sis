import { useState, useEffect } from 'react';
import { Menu, X, ChevronUp, Home, Images, Heart, Cake as CakeIcon, Send } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';
import { useTouchFeedback } from '../hooks/useTouchFeedback';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Hero');
  const [isCompact, setIsCompact] = useState(false);
  const isMobile = useIsMobile();
  const { addTouchFeedback } = useTouchFeedback();

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
    addTouchFeedback();
    const sections = document.querySelectorAll('section');
    sections[sectionIndex]?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  if (!isMobile) return null;

  const sections = [
    { name: 'Hero', icon: Home },
    { name: 'Gallery', icon: Images },
    { name: 'Wish', icon: Heart },
    { name: 'Cake', icon: CakeIcon },
    { name: 'Send Wish', icon: Send },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
      {!isOpen ? (
        <button
          onClick={() => {
            setIsOpen(true);
            addTouchFeedback();
          }}
          className="bg-black/80 backdrop-blur-xl text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_30px_rgba(0,198,255,0.2)] border border-luxury-blue/20 hover:bg-luxury-blue/20 hover:shadow-[0_0_40px_rgba(0,198,255,0.3)] transition-all duration-300 active:scale-95"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
          <span className="font-medium text-sm tracking-wide">Navigate</span>
        </button>
      ) : (
        <div className="w-72 bg-black/90 backdrop-blur-xl rounded-2xl border border-luxury-blue/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-5 border-b border-luxury-blue/10">
            <button
              onClick={() => {
                setIsOpen(false);
                addTouchFeedback();
              }}
              className="flex items-center justify-between w-full text-white"
              aria-label="Close navigation menu"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-luxury-blue animate-pulse" />
                <span className="font-serif-display text-lg tracking-wide">Navigation</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-luxury-blue/10 flex items-center justify-center hover:bg-luxury-blue/20 transition-colors">
                <X className="w-4 h-4 text-luxury-blue" />
              </div>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="p-2 space-y-1">
            {sections.map((section, index) => {
              const isActive = activeSection === section.name;
              const Icon = section.icon;
              return (
                <button
                  key={section.name}
                  onClick={() => scrollToSection(index)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-luxury-blue/10 text-luxury-blue shadow-[0_0_20px_rgba(0,102,255,0.1)]'
                      : 'text-white/70 hover:text-luxury-blue hover:bg-luxury-blue/5 active:scale-[0.98]'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-luxury-blue/20' : 'bg-luxury-blue/5'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium font-serif-body text-sm tracking-wide">
                    {section.name}
                  </span>
                  {isActive && (
                    <div className="ml-auto">
                      <div className="w-1.5 h-1.5 rounded-full bg-luxury-blue animate-pulse" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-luxury-blue/10 bg-luxury-blue/5">
            <div className="flex items-center justify-center gap-2">
              <div className="w-1 h-1 rounded-full bg-luxury-blue/60" />
              <p className="text-xs text-white/50 text-center tracking-wide uppercase font-medium">
                Scroll or tap to navigate
              </p>
              <div className="w-1 h-1 rounded-full bg-luxury-blue/60" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavigation;