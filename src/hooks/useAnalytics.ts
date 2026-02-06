/**
 * Analytics Hook
 * Tracks user interactions and sends them to the analytics API
 */

import { useCallback } from 'react';
import { useDeviceOptimization } from './useDeviceOptimization';
import { analyticsApi } from '../lib/api';

export function useAnalytics() {
  const { deviceConfig, isMobile } = useDeviceOptimization();
  const deviceType: 'mobile' | 'desktop' = isMobile ? 'mobile' : 'desktop';

  /**
   * Track a page view
   */
  const trackPageView = useCallback(async () => {
    try {
      await analyticsApi.track('page_view', deviceType);
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }, [deviceType]);

  /**
   * Track section view
   */
  const trackSectionView = useCallback(async (section: string) => {
    try {
      await analyticsApi.track('section_view', deviceType, section);
    } catch (error) {
      console.error('Failed to track section view:', error);
    }
  }, [deviceType]);

  /**
   * Track interaction (button clicks, etc.)
   */
  const trackInteraction = useCallback(async (action: string, context?: string) => {
    try {
      await analyticsApi.track('interaction', deviceType, context);
      console.log('Interaction tracked:', action, context);
    } catch (error) {
      console.error('Failed to track interaction:', error);
    }
  }, [deviceType]);

  /**
   * Track music playback
   */
  const trackMusicPlayback = useCallback(async (action: 'play' | 'pause' | 'skip', trackName?: string) => {
    try {
      await analyticsApi.track(`music_${action}`, deviceType, trackName);
    } catch (error) {
      console.error('Failed to track music playback:', error);
    }
  }, [deviceType]);

  /**
   * Track form submission
   */
  const trackFormSubmission = useCallback(async (formType: string, success: boolean) => {
    try {
      await analyticsApi.track('form_submission', deviceType, `${formType}_${success ? 'success' : 'error'}`);
    } catch (error) {
      console.error('Failed to track form submission:', error);
    }
  }, [deviceType]);

  /**
   * Track time spent on page
   */
  const trackTimeSpent = useCallback(async (duration: number) => {
    try {
      await analyticsApi.track('time_spent', deviceType, `${Math.round(duration / 1000)}s`);
    } catch (error) {
      console.error('Failed to track time spent:', error);
    }
  }, [deviceType]);

  return {
    trackPageView,
    trackSectionView,
    trackInteraction,
    trackMusicPlayback,
    trackFormSubmission,
    trackTimeSpent,
    deviceType,
    deviceConfig,
  };
}
