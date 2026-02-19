import { useState, useEffect } from 'react';
import { fetchPhotos } from '@/lib/api';
import { isSupabaseConfigured } from '@/lib/supabase';
import { siteConfig } from '@/config/site.config';
import type { PhotoRow } from '@/types/database.types';

export interface FallbackPhoto {
  id: number;
  src: string;
  caption: string;
  order_index: number;
}

export type GalleryPhoto = PhotoRow | FallbackPhoto;

interface UsePhotosReturn {
  photos: GalleryPhoto[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function getFallbacks(): FallbackPhoto[] {
  return siteConfig.fallbackPhotos.map((p) => ({ ...p }));
}

export function usePhotos(): UsePhotosReturn {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured) {
        if (!cancelled) {
          setPhotos(getFallbacks());
          setLoading(false);
        }
        return;
      }

      try {
        const data = await fetchPhotos();
        if (!cancelled) {
          setPhotos(data.length > 0 ? data : getFallbacks());
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load photos');
          setPhotos(getFallbacks());
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  return {
    photos,
    loading,
    error,
    refetch: () => setTick((t) => t + 1),
  };
}
