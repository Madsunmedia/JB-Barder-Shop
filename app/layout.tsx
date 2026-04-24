import type { Metadata } from "next";
import { Inter, Playfair_Display, Bebas_Neue } from "next/font/google";
import "./globals.css";
import MagneticCursor from "@/components/MagneticCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import BookNowCTA from "@/components/BookNowCTA";
import { Analytics } from "@vercel/analytics/react";
import SiteLoader from "@/components/SiteLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JB Barbershop | Premium Men's Grooming in Lethbridge, Alberta",
  description: "Top-rated barbershop in Lethbridge. Expert skin fades, beard trims, hot towel shaves & facials. Book online 24/7. ⭐ 5.0 rating.",
  keywords: "barbershop lethbridge, skin fade lethbridge, men's haircut alberta, beard trim lethbridge, JB barbershop, Lethbridge grooming",
  authors: [{ name: "JB Barbershop Team" }],
  openGraph: {
    title: "JB Barbershop | Lethbridge's Finest Grooming",
    description: "Look sharp with premium men's grooming services in the heart of Lethbridge.",
    url: "https://jbbarbershop.ca",
    siteName: "JB Barbershop",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JB Barbershop | Premium Men's Grooming",
    description: "Expert skin fades and beard sculpts in Lethbridge, AB.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "JB Barbershop",
    "image": "https://jbbarbershop.ca/logo.png",
    "@id": "https://jbbarbershop.ca",
    "url": "https://jbbarbershop.ca",
    "telephone": "+14039297321",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "410 13 Street North",
      "addressLocality": "Lethbridge",
      "addressRegion": "AB",
      "postalCode": "T1H 2S2",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 49.6956,
      "longitude": -112.8331
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "19"
    }
  };

  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${bebas.variable} font-body bg-black text-white selection:bg-gold selection:text-black overflow-x-hidden`}
      >
        <SiteLoader />
        <div id="skip-link">
           <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-gold focus:text-black focus:font-accent focus:uppercase focus:rounded-xl">Skip to Content</a>
        </div>
        <NoiseOverlay />
        <MagneticCursor />
        <main id="main-content">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <BookNowCTA />
        <Analytics />
      </body>
    </html>
  );
}
