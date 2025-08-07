import { Resend } from 'resend';

// Environment validation
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

if (!process.env.RESEND_FROM_EMAIL) {
  throw new Error('RESEND_FROM_EMAIL environment variable is not set');
}

// Initialize Resend client with API key
export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration constants
export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL,
  adminEmail: process.env.RESEND_TO_EMAIL || process.env.RESEND_FROM_EMAIL,
} as const;

// Email validation helper
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting helpers
export const RATE_LIMITS = {
  waitlist: {
    requests: parseInt(process.env.RATE_LIMIT_REQUESTS || '5'),
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES || '60') * 60 * 1000,
  },
} as const;