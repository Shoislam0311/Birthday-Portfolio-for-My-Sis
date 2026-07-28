import { loadConfig, mergeConfig, type BirthdayConfig } from '@/config/birthday-config';

let configCache: BirthdayConfig | null = null;

export function getConfig(): BirthdayConfig {
  if (configCache) return configCache;
  configCache = loadConfig();
  return configCache;
}

export function setConfig(config: Partial<BirthdayConfig>): void {
  configCache = mergeConfig(config);
}

export type { BirthdayConfig };