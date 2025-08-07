import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const isProd = process.env.NODE_ENV === 'production';
const isStaticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  // Only use static export for GitHub Pages, not for Vercel
  ...(isStaticExport && {
    output: 'export',
    basePath: isProd ? '/aquascene-waitlist' : '',
    assetPrefix: isProd ? '/aquascene-waitlist/' : '',
    trailingSlash: true,
  }),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    mdxRs: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);