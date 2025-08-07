import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WaitlistSection from '@/components/sections/WaitlistSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BubbleSystem from '@/components/animations/BubbleSystem';

// Force static generation for export
export const dynamic = 'force-static';

// Generate metadata for SEO
export const metadata: Metadata = {
  title: 'Design Your Dream Aquascape - 3D Aquascaping Platform',
  description: 'Plan before you plant. Save money, avoid mistakes. Join 2,500+ Bulgarian & Hungarian aquascapers using our 3D design tools.',
  keywords: 'aquascaping, aquarium design, 3D aquascape, underwater landscape, aquatic plants, fish tank design, professional aquascaping',
  authors: [{ name: '3vantage' }],
  creator: '3vantage',
  publisher: '3vantage',
  robots: 'index, follow',
  openGraph: {
    title: 'Design Your Dream Aquascape - 3D Aquascaping Platform',
    description: 'Plan before you plant. Save money, avoid mistakes. Join 2,500+ Bulgarian & Hungarian aquascapers using our 3D design tools.',
    type: 'website',
    siteName: '3vantage Aquascaping',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Design Your Dream Aquascape - 3D Aquascaping Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Your Dream Aquascape - 3D Aquascaping Platform',
    description: 'Plan before you plant. Save money, avoid mistakes. Join 2,500+ Bulgarian & Hungarian aquascapers using our 3D design tools.',
    images: ['/twitter-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function HomePage() {
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
            url: 'https://3vantage.com/',
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