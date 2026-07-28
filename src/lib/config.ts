import type { BirthdayConfig } from '@/config/birthday-config';

let configCache: BirthdayConfig | null = null;

export function getConfig(): BirthdayConfig {
  if (configCache) return configCache;

  if (typeof window !== 'undefined' && (window as Window & { BIRTHDAY_CONFIG?: Partial<BirthdayConfig> }).BIRTHDAY_CONFIG) {
    configCache = mergeWithDefaults((window as Window & { BIRTHDAY_CONFIG?: Partial<BirthdayConfig> }).BIRTHDAY_CONFIG!);
    return configCache;
  }

  configCache = getDefaultConfig();
  return configCache;
}

export function setConfig(config: Partial<BirthdayConfig>): void {
  configCache = mergeWithDefaults(config);
}

function getDefaultConfig(): BirthdayConfig {
  return {
    site: {
      name: "Birthday Celebration",
      title: "A Special Birthday Celebration",
      description: "An interactive birthday celebration website with animations, gallery, and wishes",
      url: "https://birthday-celebration.vercel.app",
      ogImage: "/og-image.jpg",
    },
    birthdayPerson: {
      name: "Bubu",
      nickname: "Pookie",
    },
    email: {
      recipient: "your-email@example.com",
      subjectPrefix: "Birthday Wish",
    },
    form: {
      maxNameLength: 50,
      maxEmailLength: 100,
      maxWishLength: 500,
    },
    colors: {
      primary: "#0066ff",
      primaryDark: "#003d99",
      primaryLight: "#e6f2ff",
      background: "#000000",
      surface: "#ffffff",
      text: "#ffffff",
      textMuted: "#d4d4d4",
    },
    social: {},
    analytics: {
      vercelAnalytics: true,
    },
    features: {
      music: true,
      customCursor: true,
      loadingScreen: true,
      confetti: true,
      typewriter: true,
      galleryMarquee: true,
    },
    seo: {
      keywords: ["birthday", "celebration", "wishes", "interactive", "animation"],
      author: "Birthday Celebration Team",
      language: "en",
    },
  };
}

function mergeWithDefaults(partial: Partial<BirthdayConfig>): BirthdayConfig {
  const defaults = getDefaultConfig();
  return deepMerge(defaults, partial);
}

function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key of Object.keys(source) as (keyof T)[]) {
    const sourceValue = source[key];
    const targetValue = target[key];

    if (
      sourceValue &&
      typeof sourceValue === 'object' &&
      !Array.isArray(sourceValue) &&
      targetValue &&
      typeof targetValue === 'object' &&
      !Array.isArray(targetValue)
    ) {
      (result as Record<string, unknown>)[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>
      ) as T[keyof T];
    } else if (sourceValue !== undefined) {
      (result as Record<string, unknown>)[key] = sourceValue;
    }
  }

  return result;
}