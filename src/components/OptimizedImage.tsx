/**
 * Optimized Image Component
 * Handles responsive, lazy-loaded images with device-specific optimizations
 */

import { useState, useRef, useEffect } from 'react';
import { useDeviceOptimization } from '../hooks/useDeviceOptimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'original';
}

const OptimizedImage = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false,
  quality,
  sizes = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
  aspectRatio = 'original',
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const { getOptimizedImageSize, shouldUseAggressiveLazyLoading } = useDeviceOptimization();

  const optimizedSize = getOptimizedImageSize(width, height);
  const effectiveQuality = quality || optimizedSize.quality;
  const useAggressiveLazyLoading = shouldUseAggressiveLazyLoading();

  // Calculate aspect ratio classes
  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    original: '',
  }[aspectRatio];

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: useAggressiveLazyLoading ? '200px' : '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, useAggressiveLazyLoading]);

  // Generate optimized image URL (assuming Imgur or similar CDN)
  const generateOptimizedUrl = (originalUrl: string): string => {
    // For Imgur URLs
    if (originalUrl.includes('imgur.com')) {
      const ext = optimizedSize.format === 'webp' ? 'webp' : 'jpg';
      return originalUrl.replace(/\.(jpg|jpeg|png|gif)$/i, `.${ext}`);
    }

    // For generic URLs with query parameters support
    if (originalUrl.includes('?')) {
      return `${originalUrl}&w=${optimizedSize.width}&h=${optimizedSize.height}&q=${effectiveQuality}`;
    }

    return `${originalUrl}?w=${optimizedSize.width}&h=${optimizedSize.height}&q=${effectiveQuality}`;
  };

  const optimizedSrc = generateOptimizedUrl(src);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden bg-luxury-grey/10 ${aspectRatioClasses} ${className}`}
    >
      {/* Skeleton loader */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-luxury-grey/20 to-luxury-grey/10" />
      )}

      {isVisible && (
        <img
          src={optimizedSrc}
          alt={alt}
          width={optimizedSize.width}
          height={optimizedSize.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } w-full h-full object-cover`}
          sizes={sizes}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
