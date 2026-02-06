/**
 * User Preferences Hook
 * Manages user preferences with API integration and local storage fallback
 */

import { useState, useEffect, useCallback } from 'react';
import { preferencesApi, UserPreferences } from '../lib/api';
import { useDeviceOptimization } from './useDeviceOptimization';

const STORAGE_KEY = 'bubu_birthday_preferences';

interface UsePreferencesReturn {
  preferences: UserPreferences | null;
  loading: boolean;
  updatePreferences: (updates: Partial<UserPreferences>) => Promise<void>;
  resetPreferences: () => Promise<void>;
  refreshPreferences: () => Promise<void>;
}

export function usePreferences(): UsePreferencesReturn {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const { deviceConfig, isMobile } = useDeviceOptimization();

  /**
   * Load preferences from API or localStorage
   */
  const loadPreferences = useCallback(async () => {
    setLoading(true);
    try {
      // Try to load from API
      const response = await preferencesApi.getPreferences();
      if (response.success && response.data) {
        setPreferences(response.data);
        // Cache in localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      }
    } catch (error) {
      console.error('Failed to load preferences from API, using localStorage:', error);
      // Fallback to localStorage
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        setPreferences(JSON.parse(cached));
      } else {
        // Use defaults based on device
        const defaults: UserPreferences = {
          musicEnabled: !isMobile, // Default to false on mobile
          autoPlay: false,
          volume: isMobile ? 50 : 70,
          theme: 'luxury-dark',
          reducedMotion: deviceConfig.prefersReducedMotion,
          highContrast: false,
          deviceType: isMobile ? 'mobile' : 'desktop',
        };
        setPreferences(defaults);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      }
    } finally {
      setLoading(false);
    }
  }, [isMobile, deviceConfig.prefersReducedMotion]);

  /**
   * Update preferences
   */
  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    setLoading(true);
    try {
      const response = await preferencesApi.updatePreferences(updates);
      if (response.success && preferences) {
        const updated = { ...preferences, ...updates };
        setPreferences(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Failed to update preferences:', error);
      // Update locally even if API fails
      if (preferences) {
        const updated = { ...preferences, ...updates };
        setPreferences(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } finally {
      setLoading(false);
    }
  }, [preferences]);

  /**
   * Reset preferences to defaults
   */
  const resetPreferences = useCallback(async () => {
    setLoading(true);
    try {
      const response = await preferencesApi.resetPreferences();
      if (response.success) {
        const defaults: UserPreferences = {
          musicEnabled: !isMobile,
          autoPlay: false,
          volume: isMobile ? 50 : 70,
          theme: 'luxury-dark',
          reducedMotion: deviceConfig.prefersReducedMotion,
          highContrast: false,
          deviceType: isMobile ? 'mobile' : 'desktop',
        };
        setPreferences(defaults);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      }
    } catch (error) {
      console.error('Failed to reset preferences:', error);
    } finally {
      setLoading(false);
    }
  }, [isMobile, deviceConfig.prefersReducedMotion]);

  /**
   * Refresh preferences from server
   */
  const refreshPreferences = useCallback(async () => {
    await loadPreferences();
  }, [loadPreferences]);

  // Load preferences on mount
  useEffect(() => {
    loadPreferences();
  }, [loadPreferences]);

  return {
    preferences,
    loading,
    updatePreferences,
    resetPreferences,
    refreshPreferences,
  };
}
