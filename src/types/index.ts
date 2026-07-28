export interface Photo {
  id: number;
  src: string;
  caption: string;
  alt?: string;
}

export interface Section {
  id: string;
  name: string;
  element?: HTMLElement | null;
}

export interface FormData {
  name: string;
  email: string;
  wish: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  wish?: string;
}

export interface WishSubmission {
  name: string;
  email: string;
  message: string;
  _subject: string;
  _captcha: 'false';
  _template: 'table';
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp: number;
}

export interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export interface Config {
  siteName: string;
  birthdayPerson: string;
  emailRecipient: string;
  formSubmitEndpoint: string;
  maxNameLength: number;
  maxEmailLength: number;
  maxWishLength: number;
  emailRegex: RegExp;
}