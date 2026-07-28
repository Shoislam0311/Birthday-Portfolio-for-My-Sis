import type { ApiResponse, WishSubmission, Config } from '../types';
import { CONFIG } from '../config';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = 10000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function submitWish(data: WishSubmission): Promise<ApiResponse> {
  try {
    const response = await fetchWithTimeout(CONFIG.formSubmitEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || 'Failed to send wish',
        response.status,
        errorData.code
      );
    }

    const result = await response.json();
    return {
      success: true,
      data: result,
      message: 'Wish sent successfully!',
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timeout. Please try again.', 408, 'TIMEOUT');
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Network error. Please check your connection.',
      0,
      'NETWORK_ERROR'
    );
  }
}

export function validateEmail(email: string): boolean {
  return CONFIG.emailRegex.test(email);
}

export function sanitizeInput(input: string, allowNewlines = false): string {
  if (!input) return '';

  let sanitized = input
    .replace(/<[^>]*>?/gm, '')
    .replace(/[<>]/g, '');

  if (!allowNewlines) {
    sanitized = sanitized.replace(/[\r\n]/g, ' ');
  }

  if (!allowNewlines) {
    return sanitized.trim().replace(/\s+/g, ' ');
  }
  return sanitized.trim();
}

export function validateFormData(data: {
  name: string;
  email: string;
  wish: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const sanitizedName = sanitizeInput(data.name);
  if (!sanitizedName) {
    errors.name = 'Name is required';
  } else if (sanitizedName.length > CONFIG.maxNameLength) {
    errors.name = `Name must be ${CONFIG.maxNameLength} characters or less`;
  } else if (!/^[\p{L}\p{M}\s'-]+$/u.test(sanitizedName)) {
    errors.name = 'Name contains invalid characters';
  }

  const sanitizedEmail = sanitizeInput(data.email).toLowerCase();
  if (!sanitizedEmail) {
    errors.email = 'Email is required';
  } else if (sanitizedEmail.length > CONFIG.maxEmailLength) {
    errors.email = `Email must be ${CONFIG.maxEmailLength} characters or less`;
  } else if (!validateEmail(sanitizedEmail)) {
    errors.email = 'Please enter a valid email address';
  }

  const sanitizedWish = sanitizeInput(data.wish, true);
  if (!sanitizedWish) {
    errors.wish = 'Please write a birthday wish';
  } else if (sanitizedWish.length > CONFIG.maxWishLength) {
    errors.wish = `Wish must be ${CONFIG.maxWishLength} characters or less`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createWishSubmission(
  name: string,
  email: string,
  wish: string
): WishSubmission {
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email).toLowerCase();
  const sanitizedWish = sanitizeInput(wish, true);
  const subject = `A Birthday Wish For ${CONFIG.birthdayPerson} from ${sanitizedName}`;

  return {
    name: sanitizedName,
    email: sanitizedEmail,
    message: sanitizedWish,
    _subject: subject,
    _captcha: 'false',
    _template: 'table',
  };
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(
      'https://formsubmit.co/api/health',
      { method: 'GET' },
      5000
    );
    return response.ok;
  } catch {
    return false;
  }
}