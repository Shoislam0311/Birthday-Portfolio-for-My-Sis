import { supabase, isSupabaseConfigured, PHOTOS_BUCKET } from '@/lib/supabase';
import type { WishInsert, WishRow, PhotoRow, SiteSettingRow } from '@/types/database.types';

// ─── Wishes ──────────────────────────────────────────────────────────────────

export async function submitWish(wish: WishInsert): Promise<void> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please add environment variables.');
  }

  const { error } = await supabase.from('wishes').insert(wish as Record<string, unknown>);

  if (error) {
    throw new Error(error.message);
  }
}

export async function fetchWishes(): Promise<WishRow[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as WishRow[];
}

export async function markWishRead(id: string, is_read: boolean) {
  if (!isSupabaseConfigured || !supabase) return;

  const { error } = await supabase
    .from('wishes')
    .update({ is_read } as Record<string, unknown>)
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteWish(id: string) {
  if (!isSupabaseConfigured || !supabase) return;

  const { error } = await supabase.from('wishes').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ─── Photos ──────────────────────────────────────────────────────────────────

export async function fetchPhotos(): Promise<PhotoRow[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from('photos')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as PhotoRow[];
}

export async function uploadPhoto(
  file: File,
  caption: string,
  orderIndex: number
): Promise<PhotoRow> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.');
  }

  const ext = file.name.split('.').pop();
  const storagePath = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(PHOTOS_BUCKET)
    .upload(storagePath, file, { upsert: false });

  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage
    .from(PHOTOS_BUCKET)
    .getPublicUrl(storagePath);

  const { data, error: insertError } = await supabase
    .from('photos')
    .insert({
      url: urlData.publicUrl,
      caption,
      order_index: orderIndex,
      storage_path: storagePath,
    } as Record<string, unknown>)
    .select()
    .single();

  if (insertError) throw new Error(insertError.message);
  return data as PhotoRow;
}

export async function updatePhoto(id: string, updates: { caption?: string; order_index?: number }) {
  if (!isSupabaseConfigured || !supabase) return;

  const { error } = await supabase
    .from('photos')
    .update(updates as Record<string, unknown>)
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deletePhoto(id: string, storagePath: string | null) {
  if (!isSupabaseConfigured || !supabase) return;

  if (storagePath) {
    await supabase.storage.from(PHOTOS_BUCKET).remove([storagePath]);
  }

  const { error } = await supabase.from('photos').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ─── Site Settings ────────────────────────────────────────────────────────────

export async function fetchSettings(): Promise<Record<string, string>> {
  if (!isSupabaseConfigured || !supabase) return {};

  const { data, error } = await supabase.from('site_settings').select('*');
  if (error) throw new Error(error.message);

  return ((data ?? []) as SiteSettingRow[]).reduce<Record<string, string>>((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
}

export async function upsertSetting(key: string, value: string) {
  if (!isSupabaseConfigured || !supabase) return;

  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value } as Record<string, unknown>, { onConflict: 'key' });

  if (error) throw new Error(error.message);
}

export async function fetchSetting(key: string): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', key)
    .maybeSingle();

  if (error) return null;
  return (data as { value: string } | null)?.value ?? null;
}
