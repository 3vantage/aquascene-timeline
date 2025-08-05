import {getRequestConfig} from 'next-intl/server';
import {locales} from '../i18n';
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as 'en' | 'bg' | 'hu')) {
    return {
      messages: (await import(`../../messages/en.json`)).default
    };
  }
 
  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});