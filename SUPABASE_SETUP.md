# Supabase Setup Guide

This guide walks you through connecting your birthday microsite to Supabase for dynamic gallery photos, wish submissions, and the hidden admin panel.

---

## Table of Contents

1. [Create a Supabase project](#1-create-a-supabase-project)
2. [Run the database schema](#2-run-the-database-schema)
3. [Configure environment variables](#3-configure-environment-variables)
4. [Enable admin photo uploads (optional)](#4-enable-admin-photo-uploads-optional)
5. [Access the admin panel](#5-access-the-admin-panel)
6. [Change the admin password](#6-change-the-admin-password)
7. [Customizing the site (rebrand guide)](#7-customizing-the-site-rebrand-guide)
8. [Deploy to Vercel / Netlify](#8-deploy-to-vercel--netlify)
9. [FAQ & Troubleshooting](#9-faq--troubleshooting)

---

## 1. Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign up (free tier is enough).
2. Click **New project**, give it a name (e.g. `birthday-site`), and choose a region near you.
3. Wait for the project to provision (~1 min).

---

## 2. Run the database schema

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open `supabase/schema.sql` from this project and paste the entire contents into the editor.
4. Click **Run**.

This creates three tables (`wishes`, `photos`, `site_settings`), sets up Row Level Security policies, and inserts default settings.

> **Note:** If the storage bucket INSERT at the bottom of the SQL fails with a permissions error, create the bucket manually:
> - Go to **Storage** → **New bucket**
> - Name: `gallery-photos`
> - Toggle **Public bucket** ON
> - Click **Create bucket**

---

## 3. Configure environment variables

1. In your Supabase dashboard, go to **Project Settings → API**.
2. Copy the **Project URL** and **anon/public** key.
3. In the project root, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Fill in your values:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
5. Restart the dev server:
   ```bash
   pnpm dev
   ```

> **Important:** Never commit `.env` to version control. It is already listed in `.gitignore`.

---

## 4. Enable admin photo uploads (optional)

Photo uploads from the admin panel use the **service role key**, which should never be exposed in the browser. For the current implementation, photos can be uploaded via:

**Option A — Direct Supabase Dashboard upload (recommended for most buyers):**
1. Go to **Storage → gallery-photos** in your Supabase dashboard.
2. Upload images directly.
3. Copy the public URL of each photo.
4. Go to **Table Editor → photos** and insert rows manually with the URL, caption, and `order_index`.

**Option B — Admin panel upload (requires bypassing RLS for the anon key):**
Update the storage policy in the SQL editor to allow anon inserts:
```sql
DROP POLICY IF EXISTS "storage_insert_service" ON storage.objects;
CREATE POLICY "storage_insert_anon" ON storage.objects
  FOR INSERT TO anon WITH CHECK (bucket_id = 'gallery-photos');
```
> Only do this if you trust the environment (e.g. admin panel URL is not public).

---

## 5. Access the admin panel

The admin panel is intentionally hidden from the public site navigation. Access it at:

```
https://your-site.com/admin
```

Enter the admin password (default: `admin123` — **change this immediately**).

The panel has three tabs:
- **Wishes** — View, mark as read/unread, and delete submitted wishes.
- **Photos** — Upload new photos, edit captions, delete photos.
- **Settings** — Update site name, notification email, admin password, and browser title.

---

## 6. Change the admin password

**Via the admin panel:**
1. Go to `/admin` and sign in with the default password `admin123`.
2. Click **Settings** tab.
3. Update the **Admin Password** field and click **Save**.

**Via Supabase SQL Editor:**
```sql
UPDATE site_settings SET value = 'your_new_password' WHERE key = 'admin_password';
```

---

## 7. Customizing the site (rebrand guide)

### Quick text/name changes

Edit `src/config/site.config.ts`:

```ts
export const siteConfig = {
  birthdayPersonName: 'Emma',           // ← Change name everywhere
  notificationEmail: 'emma@example.com',
  siteTitle: "Emma's 25th Birthday 🎂",
  // ...
};
```

### Update the hardcoded name references in public sections

Search for `Zuyairia` across the codebase and replace with the new name:
- `src/sections/SendWish.tsx` — paragraph text and success message
- `src/sections/Wish.tsx` — Bengali/custom message text
- `src/sections/Hero.tsx` — hero heading

### Replace gallery photos

**Without Supabase (quickest):**
Edit `src/config/site.config.ts` → `fallbackPhotos` array with your Imgur or CDN URLs.

**With Supabase:**
Upload photos via the admin panel or Supabase dashboard and add rows to the `photos` table.

### Change colors

Edit `tailwind.config.js` → `luxury.blue` value to change the primary accent color.
Update the corresponding CSS variables in `src/index.css`.

---

## 8. Deploy to Vercel / Netlify

### Vercel

1. Push to GitHub.
2. Import the repo in [vercel.com](https://vercel.com).
3. Add environment variables in **Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy.

### Netlify

1. Push to GitHub.
2. Import the repo in [netlify.com](https://netlify.com).
3. Add environment variables in **Site settings → Environment variables**.
4. Set build command: `pnpm build`
5. Set publish directory: `dist`
6. Deploy.

> **SPA routing note:** For the `/admin` route to work on Netlify, add a `_redirects` file to the `public/` folder:
> ```
> /* /index.html 200
> ```

---

## 9. FAQ & Troubleshooting

**Q: The gallery still shows the original Imgur photos after setting up Supabase.**  
A: Make sure your `photos` table has rows. If it's empty, the site falls back to the photos in `siteConfig.fallbackPhotos`.

**Q: Wish submissions fail with a network error.**  
A: Check that your Supabase URL and anon key are correct and the `wishes` table exists with the RLS policy `wishes_insert_public`.

**Q: The admin panel shows "Supabase is not configured".**  
A: Your `.env` file is missing or the environment variables aren't loaded. Restart the dev server after editing `.env`.

**Q: Photo uploads in the admin panel fail.**  
A: By default, uploads require the `service_role` key. See [Option B in Step 4](#4-enable-admin-photo-uploads-optional) to allow anon uploads, or upload directly via the Supabase dashboard.

**Q: The `/admin` route returns a blank page when deployed.**  
A: Your host needs to serve `index.html` for all routes (SPA fallback). See the Netlify `_redirects` note above. On Vercel this is automatic.

**Q: How do I receive email notifications for new wishes?**  
A: Supabase doesn't send emails by default. Options:
- **Recommended:** Set up a [Supabase Database Webhook](https://supabase.com/docs/guides/database/webhooks) pointing to a service like [Resend](https://resend.com) or [SendGrid](https://sendgrid.com).
- **Simple:** Check the admin panel regularly — new wishes are highlighted as "New".
- **Advanced:** Deploy a Supabase Edge Function triggered by `INSERT` on the `wishes` table.
