import { redirect } from 'next/navigation';

// Force static generation for export
export const dynamic = 'force-static';

export default function RootPage() {
  // For static export, we can't use server-side redirect
  if (process.env.STATIC_EXPORT === 'true') {
    return (
      <html>
        <head>
          <meta httpEquiv="refresh" content="0; url=/en/" />
          <script 
            dangerouslySetInnerHTML={{
              __html: `window.location.replace('/en/');`
            }} 
          />
        </head>
        <body>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <p>Redirecting to <a href="/en/">English version</a>...</p>
        </body>
      </html>
    );
  }
  
  redirect('/en');
}