import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Locale configuration
export const locales = ['en', 'bg', 'hu'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  bg: 'Български', 
  hu: 'Magyar'
};
 
export default getRequestConfig(async ({requestLocale}) => {
  // This function runs for each request
  const locale = await requestLocale;
  
  // Validate locale
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }
 
  try {
    return {
      locale,
      messages: (await import(`./messages/${locale}.json`)).default
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }
});