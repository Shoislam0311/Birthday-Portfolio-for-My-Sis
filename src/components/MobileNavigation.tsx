import { useState, useEffect, useMemo } from 'react';
import { Menu, X, ChevronUp } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const isMobile = useIsMobile();

  const navItems = useMemo(() => [
    { name: 'Edition 2026', id: 'home' },
    { name: 'Legacy', id: 'timeline' },
    { name: 'Archives', id: 'gallery' },
    { name: 'Transmission', id: 'send-wish' }
  ], []);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'Home';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          const id = section.getAttribute('id');
          const item = navItems.find(n => n.id === id);
          if (item) currentSection = item.name;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, navItems]);

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
          className="bg-premium-violet/90 backdrop-blur-md text-white px-8 py-3 rounded-full flex items-center gap-3 shadow-premium glow-violet border border-white/20"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
          <span className="font-bold text-xs tracking-[0.2em] uppercase">Navigate</span>
        </button>
      ) : (
        <div className="w-72 bg-premium-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-premium-lg overflow-hidden">
          <div className="p-5 border-b border-white/5">
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full text-white"
              aria-label="Close navigation menu"
            >
              <span className="font-bold text-xs tracking-widest uppercase">Select Archive</span>
              <X className="w-5 h-5 text-premium-violet" />
            </button>
          </div>

          <div className="py-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.name;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all ${
                    isActive
                      ? 'bg-premium-violet/10 text-premium-violet font-bold'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-sm font-bold tracking-widest uppercase">{item.name}</span>
                  {isActive && (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-5 border-t border-white/5 bg-premium-violet/5">
            <p className="text-[10px] text-white/30 text-center tracking-[0.3em] uppercase">
              Limited Edition 2026
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavigation;
