import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIsMobile } from '../hooks/useIsMobile';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Don't initialize on mobile devices
    if (isMobile) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.02,
        ease: 'none',
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.2,
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.2,
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isMobile]);

  // Don't render on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 -ml-3 -mt-3 rounded-full border border-luxury-blue/50 pointer-events-none z-[9999] opacity-0 hidden md:block"
        style={{ willChange: 'transform', boxShadow: '0 0 20px rgba(0, 102, 255, 0.2)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-white pointer-events-none z-[9999] opacity-0 hidden md:block"
        style={{ willChange: 'transform', boxShadow: '0 0 10px rgba(0, 102, 255, 0.5)' }}
      />
    </>
  );
};

export default CustomCursor;