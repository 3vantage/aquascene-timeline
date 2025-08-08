import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Aquascaping Timeline - From Empty Tank to Thriving Ecosystem',
  description: 'Follow the complete aquascaping journey with interactive animations. Learn each step from tank setup to mature aquascape with expert guidance.',
  keywords: 'aquascaping, aquarium, plants, fish tank, timeline, tutorial, guide',
  authors: [{ name: 'Aquascene' }],
  creator: 'Aquascene',
  publisher: 'Aquascene',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://timeline.aquascene.com'),
  openGraph: {
    title: 'Aquascaping Timeline - Interactive Journey',
    description: 'Experience the complete aquascaping process with stunning animations and expert guidance.',
    url: 'https://timeline.aquascene.com',
    siteName: 'Aquascene Timeline',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aquascaping Timeline Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aquascaping Timeline - Interactive Journey',
    description: 'Experience the complete aquascaping process with stunning animations.',
    images: ['/twitter-image.jpg'],
    creator: '@aquascene',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}