import {getRequestConfig} from 'next-intl/server';
import {locales} from '../i18n';
 
export default getRequestConfig(async ({requestLocale}) => {
  // Validate that the incoming `locale` parameter is valid
  const locale = await requestLocale;
  if (!locale || !locales.includes(locale as 'en' | 'bg' | 'hu')) {
    return {
      locale: 'en',
      messages: (await import(`../../messages/en.json`)).default
    };
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});