/**
 * Enhanced Device Detection and Optimization Hook
 * Provides device-specific optimizations for cross-device compatibility
 */

import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string;
    saveData: boolean;
    addEventListener?: (type: string, listener: EventListener) => void;
    removeEventListener?: (type: string, listener: EventListener) => void;
  };
}

interface DeviceConfig {
  type: DeviceType;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  supportsTouch: boolean;
  prefersReducedMotion: boolean;
  connection: {
    effectiveType?: string;
    saveData: boolean;
  };
}

interface OptimizedImageSize {
  width: number;
  height: number;
  quality: number;
  format: 'webp' | 'jpeg' | 'png';
}

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1024,
};

export function useDeviceOptimization() {
  const [deviceConfig, setDeviceConfig] = useState<DeviceConfig>({
    type: 'desktop',
    width: 1920,
    height: 1080,
    orientation: 'landscape',
    supportsTouch: false,
    prefersReducedMotion: false,
    connection: {
      saveData: false,
    },
  });

  useEffect(() => {
    const updateDeviceConfig = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Determine device type
      let type: DeviceType = 'desktop';
      if (width < BREAKPOINTS.mobile) {
        type = 'mobile';
      } else if (width < BREAKPOINTS.tablet) {
        type = 'tablet';
      }

      // Detect touch support
      const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Detect orientation
      const orientation = width > height ? 'landscape' : 'portrait';

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Get connection info (if available)
      const connection = ((navigator as NavigatorWithConnection).connection) || {
        saveData: false,
      };

      setDeviceConfig({
        type,
        width,
        height,
        orientation,
        supportsTouch,
        prefersReducedMotion,
        connection: {
          effectiveType: connection.effectiveType,
          saveData: connection.saveData,
        },
      });
    };

    // Initial check
    updateDeviceConfig();

    // Listen for resize events
    const resizeObserver = new ResizeObserver(updateDeviceConfig);
    resizeObserver.observe(document.documentElement);

    // Listen for connection changes
    const nav = navigator as NavigatorWithConnection;
    if (nav.connection) {
      nav.connection.addEventListener?.('change', updateDeviceConfig);
    }

    return () => {
      resizeObserver.disconnect();
      const nav = navigator as NavigatorWithConnection;
      if (nav.connection) {
        nav.connection.removeEventListener?.('change', updateDeviceConfig);
      }
    };
  }, []);

  /**
   * Get optimized image dimensions based on device
   */
  const getOptimizedImageSize = (
    baseWidth: number,
    baseHeight: number
  ): OptimizedImageSize => {
    const scaleFactor = {
      mobile: 0.5,
      tablet: 0.75,
      desktop: 1,
    }[deviceConfig.type];

    // Reduce quality on mobile or slow connections
    const quality = deviceConfig.connection.saveData ||
                   deviceConfig.connection.effectiveType === 'slow-2g' ||
                   deviceConfig.connection.effectiveType === '2g'
      ? 60
      : deviceConfig.type === 'mobile'
        ? 80
        : 90;

    // Use WebP format on supported browsers, fallback to JPEG
    const format = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
      ? 'webp'
      : 'jpeg';

    return {
      width: Math.round(baseWidth * scaleFactor),
      height: Math.round(baseHeight * scaleFactor),
      quality,
      format,
    };
  };

  /**
   * Check if should use reduced animations
   */
  const shouldReduceMotion = (): boolean => {
    return deviceConfig.prefersReducedMotion || deviceConfig.connection.saveData;
  };

  /**
   * Check if device supports touch interactions
   */
  const isTouchDevice = (): boolean => {
    return deviceConfig.supportsTouch;
  };

  /**
   * Get device-specific animation duration
   */
  const getAnimationDuration = (baseDuration: number): number => {
    if (shouldReduceMotion()) {
      return 0;
    }
    if (deviceConfig.type === 'mobile') {
      return baseDuration * 0.7; // Faster on mobile
    }
    return baseDuration;
  };

  /**
   * Check if lazy loading should be aggressive
   */
  const shouldUseAggressiveLazyLoading = (): boolean => {
    return deviceConfig.type === 'mobile' || deviceConfig.connection.saveData;
  };

  return {
    deviceConfig,
    getOptimizedImageSize,
    shouldReduceMotion,
    isTouchDevice,
    getAnimationDuration,
    shouldUseAggressiveLazyLoading,
    isMobile: deviceConfig.type === 'mobile',
    isTablet: deviceConfig.type === 'tablet',
    isDesktop: deviceConfig.type === 'desktop',
  };
}
