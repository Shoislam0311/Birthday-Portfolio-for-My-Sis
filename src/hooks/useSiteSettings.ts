import { useState, useEffect } from 'react';
import { fetchSettings, upsertSetting } from '@/lib/api';

interface UseSiteSettingsReturn {
  settings: Record<string, string>;
  loading: boolean;
  error: string | null;
  save: (key: string, value: string) => Promise<void>;
  refetch: () => void;
}

export function useSiteSettings(): UseSiteSettingsReturn {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSettings();
        if (!cancelled) setSettings(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load settings');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [tick]);

  async function save(key: string, value: string) {
    await upsertSetting(key, value);
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  return {
    settings,
    loading,
    error,
    save,
    refetch: () => setTick((t) => t + 1),
  };
}
