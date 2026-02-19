/**
 * ============================================================
 * SITE CONFIGURATION - Rebrand this file to customize your site
 * ============================================================
 * All buyer-facing customization lives here.
 * Edit these values to personalize the birthday site.
 */

export const siteConfig = {
  /**
   * The name of the birthday person (used in headings, meta tags, etc.)
   */
  birthdayPersonName: 'Zuyairia',

  /**
   * The email address where birthday wishes will be delivered.
   * This is stored in Supabase and used for notifications.
   */
  notificationEmail: 'zuyairiaislam5@gmail.com',

  /**
   * Site title shown in the browser tab
   */
  siteTitle: "Zuyairia's Birthday Celebration 🎂",

  /**
   * Short description for SEO meta tags
   */
  siteDescription:
    'A luxurious birthday celebration microsite with gallery, wishes, and memories.',

  /**
   * Primary accent color (must match tailwind luxury-blue)
   * Update tailwind.config.js luxury.blue value to match.
   */
  accentColor: '#0066ff',

  /**
   * Admin panel password.
   * IMPORTANT: Change this before deploying!
   * Store the actual value in your Supabase site_settings table
   * under the key "admin_password" — this default is only used as
   * a fallback when the Supabase table is unavailable.
   */
  defaultAdminPassword: 'admin123',

  /**
   * Gallery fallback photos used when Supabase is not configured.
   * Replace with your own image URLs.
   */
  fallbackPhotos: [
    { id: 1, src: 'https://i.imgur.com/2gB45PS.jpeg', caption: 'The Happiness', order_index: 1 },
    { id: 2, src: 'https://i.imgur.com/pBcYNMF.jpeg', caption: 'First Time Pookie', order_index: 2 },
    { id: 3, src: 'https://i.imgur.com/Zl4lUN8.jpeg', caption: 'Lambu and Bauni', order_index: 3 },
    { id: 4, src: 'https://i.imgur.com/d7B511v.jpeg', caption: 'Trying to be Pookie', order_index: 4 },
    { id: 5, src: 'https://i.imgur.com/DpuwGmG.jpeg', caption: 'Near Pookie', order_index: 5 },
    { id: 6, src: 'https://i.imgur.com/SfuegEC.jpeg', caption: 'Trying to Avoid the Sun', order_index: 6 },
    { id: 7, src: 'https://i.imgur.com/oMtK9UQ.jpeg', caption: 'Still Struggling with Sun', order_index: 7 },
    { id: 8, src: 'https://i.imgur.com/Oysxqe3.jpeg', caption: 'Almost Pookie', order_index: 8 },
    { id: 9, src: 'https://i.imgur.com/6j1w5sD.jpeg', caption: 'Before Entering Pookie', order_index: 9 },
    { id: 10, src: 'https://i.imgur.com/np4x5eP.jpeg', caption: 'Innocent রূপে শয়তান', order_index: 10 },
    { id: 11, src: 'https://i.imgur.com/KIeToWt.jpeg', caption: 'Three Certified Mathematician', order_index: 11 },
    { id: 12, src: 'https://i.imgur.com/iVsb2f8.jpeg', caption: 'Twoo Pokies', order_index: 12 },
    { id: 13, src: 'https://i.imgur.com/qTYVYzG.jpeg', caption: 'Big Father, Queen Mother, Bauni Sister', order_index: 13 },
    { id: 14, src: 'https://i.imgur.com/CNsUPMb.jpeg', caption: 'হতাশ বিয়ে না হওয়ায়', order_index: 14 },
    { id: 15, src: 'https://i.imgur.com/MiKkRKi.jpeg', caption: 'Elephant and ant', order_index: 15 },
    { id: 16, src: 'https://i.imgur.com/a0prz59.jpeg', caption: 'Two ghost in one frame', order_index: 16 },
    { id: 17, src: 'https://i.imgur.com/cm497bY.jpeg', caption: 'Good Moment', order_index: 17 },
    { id: 18, src: 'https://i.imgur.com/EvpJbQ8.png', caption: 'Birthday Girl', order_index: 18 },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
