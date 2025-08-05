import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import "../globals.css";

// Generate metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: 'aquascaping, aquarium design, 3D aquascape, underwater landscape, aquatic plants, fish tank design, professional aquascaping',
    authors: [{ name: '3vantage' }],
    creator: '3vantage',
    publisher: '3vantage',
    robots: 'index, follow',
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      siteName: '3vantage Aquascaping',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    viewport: 'width=device-width, initial-scale=1',
  };
}

// Generate static params for all supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as 'en' | 'bg' | 'hu')) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased font-primary bg-background text-foreground overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          {/* Underwater background effects */}
          <div className="fixed inset-0 -z-50">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-light/20 via-primary/10 to-secondary-dark/30" />
            <div className="light-refraction absolute inset-0 opacity-30" />
          </div>
          
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
          
          {/* Bubble effects */}
          <div className="fixed inset-0 pointer-events-none -z-40">
            {/* Animated bubbles will be added via JavaScript */}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}