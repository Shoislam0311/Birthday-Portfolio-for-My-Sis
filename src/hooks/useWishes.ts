import { useState, useEffect } from 'react';
import { fetchWishes, markWishRead, deleteWish } from '@/lib/api';
import type { WishRow } from '@/types/database.types';

interface UseWishesReturn {
  wishes: WishRow[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  toggleRead: (id: string, is_read: boolean) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

export function useWishes(): UseWishesReturn {
  const [wishes, setWishes] = useState<WishRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWishes();
        if (!cancelled) setWishes(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load wishes');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  async function toggleRead(id: string, is_read: boolean) {
    await markWishRead(id, is_read);
    setWishes((prev) => prev.map((w) => (w.id === id ? { ...w, is_read } : w)));
  }

  async function remove(id: string) {
    await deleteWish(id);
    setWishes((prev) => prev.filter((w) => w.id !== id));
  }

  return {
    wishes,
    loading,
    error,
    refetch: () => setTick((t) => t + 1),
    toggleRead,
    remove,
  };
}
