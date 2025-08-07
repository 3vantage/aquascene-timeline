import {locales} from '../../i18n';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: '3vantage Aquascaping - Join the Revolution',
  description: 'Get early access to professional aquascaping tools that will transform your underwater landscapes.',
  icons: {
    icon: '/favicon.ico',
  },
};

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}