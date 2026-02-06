/**
 * API Client for backend integration
 * Handles all communication with Vercel API routes
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface Track {
  name: string;
  url: string;
  artist?: string;
  duration?: number;
}

export interface UserPreferences {
  musicEnabled: boolean;
  autoPlay: boolean;
  volume: number;
  theme: string;
  reducedMotion: boolean;
  highContrast: boolean;
  deviceType: 'mobile' | 'desktop';
}

export interface AnalyticsData {
  totalVisitors: number;
  mostViewedSection: string;
  mobileUsers: string;
  desktopUsers: string;
  totalInteractions?: number;
  breakdown?: {
    mobile: number;
    desktop: number;
  };
}

/**
 * Generic API fetch wrapper with error handling
 */
async function fetchApi<T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Contact Form API
 */
export const contactFormApi = {
  submit: async (data: { name: string; email: string; message: string }) => {
    return fetchApi('/contact-form', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

/**
 * Analytics API
 */
export const analyticsApi = {
  track: async (event: string, device: 'mobile' | 'desktop', section?: string) => {
    return fetchApi('/analytics', {
      method: 'POST',
      body: JSON.stringify({
        event,
        device,
        timestamp: new Date().toISOString(),
        section,
      }),
    });
  },

  getSummary: async () => {
    return fetchApi<AnalyticsData>('/analytics');
  },
};

/**
 * Music Playlist API
 */
export const musicPlaylistApi = {
  getPlaylist: async () => {
    return fetchApi<{ tracks: Track[]; totalTracks: number }>('/music-playlist');
  },

  addTrack: async (track: Omit<Track, 'duration'>) => {
    return fetchApi('/music-playlist', {
      method: 'POST',
      body: JSON.stringify({
        action: 'add',
        track,
      }),
    });
  },

  removeTrack: async (trackName: string) => {
    return fetchApi('/music-playlist', {
      method: 'POST',
      body: JSON.stringify({
        action: 'remove',
        trackName,
      }),
    });
  },

  reorderPlaylist: async (orderedTrackNames: string[]) => {
    return fetchApi('/music-playlist', {
      method: 'POST',
      body: JSON.stringify({
        action: 'reorder',
        orderedTrackNames,
      }),
    });
  },
};

/**
 * Preferences API
 */
export const preferencesApi = {
  getPreferences: async () => {
    return fetchApi<UserPreferences>('/preferences');
  },

  updatePreferences: async (preferences: Partial<UserPreferences>) => {
    return fetchApi('/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  },

  resetPreferences: async () => {
    return fetchApi('/preferences', {
      method: 'DELETE',
    });
  },
};
