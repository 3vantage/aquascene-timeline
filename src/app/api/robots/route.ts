import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://3vantage.com'}/sitemap.xml

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /.*

# Allow specific paths
Allow: /en
Allow: /bg  
Allow: /hu
Allow: /en/blog
Allow: /bg/blog
Allow: /hu/blog`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}