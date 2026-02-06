import { useEffect } from 'react';

/**
 * Hook to add touch feedback effects to elements for better mobile UX
 * @param ref - React ref to the element
 * @param options - Configuration options
 */
export function useTouchFeedback(
  ref: React.RefObject<HTMLElement>,
  options: {
    activeScale?: number;
    transitionDuration?: number;
    disabled?: boolean;
  } = {}
) {
  const {
    activeScale = 0.98,
    transitionDuration = 0.1,
    disabled = false,
  } = options;

  useEffect(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;
    
    const handleTouchStart = () => {
      element.style.transition = `transform ${transitionDuration}s ease`;
      element.style.transform = `scale(${activeScale})`;
    };

    const handleTouchEnd = () => {
      element.style.transform = 'scale(1)';
    };

    const handleTouchCancel = () => {
      element.style.transform = 'scale(1)';
    };

    // Add touch event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);
    };
  }, [ref, activeScale, transitionDuration, disabled]);
}