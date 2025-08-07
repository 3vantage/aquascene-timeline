'use client';

import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WaitlistSection from '@/components/sections/WaitlistSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-deep-ocean via-primary to-accent-emerald">
      <HeroSection />
      <FeaturesSection />
      <WaitlistSection />
      <TestimonialsSection />
    </main>
  );
}

HomePage.displayName = 'HomePage';