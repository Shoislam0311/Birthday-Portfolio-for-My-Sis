import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useIsMobile } from '../hooks/useIsMobile';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power3.out',
      });
      
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'none',
      });
    };

    const onMouseEnter = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 1,
        duration: 0.3,
      });
    };

    const onMouseLeave = () => {
      gsap.to([cursor, cursorDot], {
        opacity: 0,
        duration: 0.3,
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

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-premium-violet/40 pointer-events-none z-[9999] opacity-0 hidden lg:block"
        style={{ willChange: 'transform', boxShadow: '0 0 15px rgba(108, 60, 240, 0.2)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-0.75 -mt-0.75 rounded-full bg-premium-violet pointer-events-none z-[9999] opacity-0 hidden lg:block shadow-[0_0_10px_#6C3CF0]"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
