export interface BirthdayConfig {
  site: {
    name: string;
    title: string;
    description: string;
    url: string;
    ogImage: string;
    twitterHandle?: string;
  };
  birthdayPerson: {
    name: string;
    nickname?: string;
    birthDate?: string;
    age?: number;
  };
  email: {
    recipient: string;
    subjectPrefix: string;
  };
  form: {
    maxNameLength: number;
    maxEmailLength: number;
    maxWishLength: number;
  };
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
  };
  social: {
    instagram?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  analytics: {
    vercelAnalytics?: boolean;
    googleAnalyticsId?: string;
    plausibleDomain?: string;
  };
  features: {
    music: boolean;
    customCursor: boolean;
    loadingScreen: boolean;
    confetti: boolean;
    typewriter: boolean;
    galleryMarquee: boolean;
  };
  seo: {
    keywords: string[];
    author: string;
    language: string;
  };
}

export const defaultConfig: BirthdayConfig = {
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

export function mergeConfig(userConfig: Partial<BirthdayConfig>): BirthdayConfig {
  return deepMerge(defaultConfig, userConfig);
}

function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>
): T {
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

declare global {
  interface Window {
    BIRTHDAY_CONFIG?: Partial<BirthdayConfig>;
  }
}

export function loadConfig(): BirthdayConfig {
  if (typeof window !== 'undefined' && window.BIRTHDAY_CONFIG) {
    return mergeConfig(window.BIRTHDAY_CONFIG);
  }
  return defaultConfig;
}