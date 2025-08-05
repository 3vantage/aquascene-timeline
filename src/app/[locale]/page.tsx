import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WaitlistSection from '@/components/sections/WaitlistSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BubbleSystem from '@/components/animations/BubbleSystem';

interface PageProps {
  params: { locale: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'bg': '/bg',
        'hu': '/hu',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}`,
      siteName: '3vantage Aquascaping',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/twitter-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function HomePage({ params: { locale } }: PageProps) {
  return (
    <main className="relative">
      {/* Underwater background effects */}
      <BubbleSystem />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Waitlist Section */}
      <WaitlistSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: '3vantage Aquascaping',
            applicationCategory: 'DesignApplication',
            operatingSystem: 'Web',
            description: 'Professional aquascaping design and calculation tools for creating stunning underwater landscapes.',
            url: `https://3vantage.com/${locale}`,
            author: {
              '@type': 'Organization',
              name: '3vantage',
              url: 'https://3vantage.com'
            },
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/PreOrder'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              reviewCount: '3'
            }
          })
        }}
      />
    </main>
  );
}