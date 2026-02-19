-- ============================================================
-- Birthday Microsite — Supabase Schema
-- Run this entire file in the Supabase SQL Editor.
-- ============================================================

-- ─── Wishes table ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS wishes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL CHECK (char_length(name) <= 50),
  email       text NOT NULL CHECK (char_length(email) <= 100),
  message     text NOT NULL CHECK (char_length(message) <= 500),
  is_read     boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ─── Photos table ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS photos (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url           text NOT NULL,
  caption       text NOT NULL DEFAULT '',
  order_index   integer NOT NULL DEFAULT 0,
  storage_path  text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ─── Site settings table ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  key         text PRIMARY KEY,
  value       text NOT NULL DEFAULT '',
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- ─── Default site settings ────────────────────────────────────────────────────
-- IMPORTANT: Update admin_password to a strong password before deploying!
INSERT INTO site_settings (key, value) VALUES
  ('admin_password',       'admin123'),
  ('birthday_person_name', 'Zuyairia'),
  ('notification_email',   'zuyairiaislam5@gmail.com'),
  ('site_title',           'Zuyairia''s Birthday Celebration 🎂')
ON CONFLICT (key) DO NOTHING;

-- ─── Row-level security ────────────────────────────────────────────────────────
ALTER TABLE wishes        ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos        ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Wishes: anyone can INSERT (public form), only service_role can SELECT/UPDATE/DELETE
CREATE POLICY "wishes_insert_public" ON wishes
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "wishes_select_service" ON wishes
  FOR SELECT TO service_role USING (true);

CREATE POLICY "wishes_update_service" ON wishes
  FOR UPDATE TO service_role USING (true);

CREATE POLICY "wishes_delete_service" ON wishes
  FOR DELETE TO service_role USING (true);

-- Photos: anyone can read, only service_role can write
CREATE POLICY "photos_select_public" ON photos
  FOR SELECT TO anon USING (true);

CREATE POLICY "photos_insert_service" ON photos
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "photos_update_service" ON photos
  FOR UPDATE TO service_role USING (true);

CREATE POLICY "photos_delete_service" ON photos
  FOR DELETE TO service_role USING (true);

-- Site settings: anyone can read (for password check), only service_role can write
CREATE POLICY "settings_select_public" ON site_settings
  FOR SELECT TO anon USING (true);

CREATE POLICY "settings_insert_service" ON site_settings
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "settings_update_service" ON site_settings
  FOR UPDATE TO service_role USING (true);

-- ─── Storage bucket ──────────────────────────────────────────────────────────
-- Run this separately if it fails (bucket creation requires specific permissions):
INSERT INTO storage.buckets (id, name, public)
  VALUES ('gallery-photos', 'gallery-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "storage_select_public" ON storage.objects
  FOR SELECT TO anon USING (bucket_id = 'gallery-photos');

CREATE POLICY "storage_insert_service" ON storage.objects
  FOR INSERT TO service_role WITH CHECK (bucket_id = 'gallery-photos');

CREATE POLICY "storage_delete_service" ON storage.objects
  FOR DELETE TO service_role USING (bucket_id = 'gallery-photos');
