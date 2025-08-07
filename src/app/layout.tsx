import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Your Dream Aquascape - 3D Aquascaping Platform",
  description: "Plan before you plant. Save money, avoid mistakes. Join 2,500+ Bulgarian & Hungarian aquascapers using our 3D design tools.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-primary bg-background text-foreground overflow-x-hidden">
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
      </body>
    </html>
  );
}