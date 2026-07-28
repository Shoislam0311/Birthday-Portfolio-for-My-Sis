import type { AnalyticsEvent } from '../types';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

class AnalyticsService {
  private enabled: boolean;
  private queue: AnalyticsEvent[] = [];
  private flushInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (this.enabled) {
      this.flushInterval = setInterval(() => this.flush(), 5000);
    }
  }

  track(event: string, properties?: Record<string, unknown>): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
    };

    this.queue.push(analyticsEvent);

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties);
    }
  }

  trackPageView(path: string): void {
    this.track('page_view', { path });
  }

  trackAction(action: string, section: string): void {
    this.track('action', { action, section });
  }

  trackFormSubmit(section: string): void {
    this.track('form_submit', { section });
  }

  trackError(error: string, details?: Record<string, unknown>): void {
    this.track('error', { error, ...details });
  }

  private flush(): void {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    if (typeof window !== 'undefined' && window.gtag) {
      events.forEach((e) => {
        window.gtag?.('event', e.event, e.properties);
      });
    }
  }

  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
  }
}

export const analytics = new AnalyticsService(false);

export function trackEvent(event: string, properties?: Record<string, unknown>): void {
  analytics.track(event, properties);
}

export function trackPageView(path: string): void {
  analytics.trackPageView(path);
}

export function trackAction(action: string, section: string): void {
  analytics.trackAction(action, section);
}