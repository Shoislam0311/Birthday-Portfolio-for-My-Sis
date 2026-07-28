import type { Config } from '../types';

export const CONFIG: Config = {
  siteName: "Bubu's Birthday Celebration",
  birthdayPerson: 'Bubu',
  emailRecipient: 'zuyairiaislam5@gmail.com',
  formSubmitEndpoint: 'https://formsubmit.co/ajax/zuyairiaislam5@gmail.com',
  maxNameLength: 50,
  maxEmailLength: 100,
  maxWishLength: 500,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

export const PHOTOS = [
  { id: 1, src: 'https://i.imgur.com/2gB45PS.jpeg', caption: 'The Happiness' },
  { id: 2, src: 'https://i.imgur.com/pBcYNMF.jpeg', caption: 'First Time Pookie' },
  { id: 3, src: 'https://i.imgur.com/Zl4lUN8.jpeg', caption: 'Lambu and Bauni' },
  { id: 4, src: 'https://i.imgur.com/d7B511v.jpeg', caption: 'Trying to be Pookie' },
  { id: 5, src: 'https://i.imgur.com/DpuwGmG.jpeg', caption: 'Near Pookie' },
  { id: 6, src: 'https://i.imgur.com/SfuegEC.jpeg', caption: 'Trying to Avoid the Sun' },
  { id: 7, src: 'https://i.imgur.com/oMtK9UQ.jpeg', caption: 'Still Struggling with Sun' },
  { id: 8, src: 'https://i.imgur.com/Oysxqe3.jpeg', caption: 'Almost Pookie' },
  { id: 9, src: 'https://i.imgur.com/6j1w5sD.jpeg', caption: 'Before Entering Pookie' },
  { id: 10, src: 'https://i.imgur.com/np4x5eP.jpeg', caption: 'Innocent রূপে শয়তান' },
  { id: 11, src: 'https://i.imgur.com/KIeToWt.jpeg', caption: 'Three Certified Mathematician' },
  { id: 12, src: 'https://i.imgur.com/iVsb2f8.jpeg', caption: 'Twoo Pokies' },
  { id: 13, src: 'https://i.imgur.com/qTYVYzG.jpeg', caption: 'Big Father, Queen Mother, Bauni Sister' },
  { id: 14, src: 'https://i.imgur.com/CNsUPMb.jpeg', caption: 'হতাশ বিয়ে না হওয়ায়' },
  { id: 15, src: 'https://i.imgur.com/MiKkRKi.jpeg', caption: 'Elephant and ant' },
  { id: 16, src: 'https://i.imgur.com/a0prz59.jpeg', caption: 'Two ghost in one frame' },
  { id: 17, src: 'https://i.imgur.com/cm497bY.jpeg', caption: 'Good Moment' },
  { id: 18, src: 'https://i.imgur.com/EvpJbQ8.png', caption: 'Birthday Girl' },
] as const;

export const SECTIONS = [
  { id: 'hero', name: 'Hero' },
  { id: 'gallery', name: 'Gallery' },
  { id: 'wish', name: 'Wish' },
  { id: 'cake', name: 'Cake' },
  { id: 'send-wish', name: 'Send Wish' },
] as const;

export const AUDIO_TRACKS = [
  {
    name: 'Sob Kanar Hat Bazar',
    url: 'https://cdn.pixabay.com/download/audio/2026/02/16/audio_fb5fb37a3b.mp3?filename=u_0b2jhroke8-e-sob-dekhi-kana-hat-bazar-485876.mp3',
  },
  {
    name: 'Birthday Vibes',
    url: 'https://cdn.pixabay.com/download/audio/2026/02/06/audio_998d779763.mp3?filename=u_0b2jhroke8-a-wish-you-happy-happy-birthday-480228.mp3',
  },
] as const;

export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 60 * 60 * 1000, // 1 hour
  LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.0,
  VERY_SLOW: 1.5,
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;