export const locales = ['en', 'bg', 'hu'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  bg: 'Български',
  hu: 'Magyar'
};