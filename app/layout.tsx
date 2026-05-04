import type { Metadata } from "next";
import { Inter, Playfair_Display, Bebas_Neue } from "next/font/google";
import "./globals.css";
import MagneticCursor from "@/components/MagneticCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { Analytics } from "@vercel/analytics/react";
import SiteLoader from "@/components/SiteLoader";
import Providers from "@/components/Providers";

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
  metadataBase: new URL("https://jbbarbershop.ca"),
  title: "Men’s Haircuts & Beard Trims in Lethbridge | JB Barbershop",
  description: "Premium men’s grooming in Lethbridge, Alberta. Book skin fades, regular cuts, beard trims, and hot towel shaves at JB Barbershop.",
  keywords: "mens haircuts in Lethbridge, barbershop near me, mens barber near me, beard trim near me, skin fade Lethbridge, best barbershop near me, haircut for men, nearest barber shop, JB barbershop",
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
    "telephone": "+14039425332",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "714 4 Ave S",
      "addressLocality": "Lethbridge",
      "addressRegion": "AB",
      "postalCode": "T1J 0N8",
      "addressCountry": "CA"
    },
    "areaServed": "Lethbridge",
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
<<<<<<< HEAD
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
        <Analytics />
=======
        <Providers>
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
        </Providers>
>>>>>>> b4c582a8fc8aa2bdf4c84b0b8df4748f5a71f09c
      </body>
    </html>
  );
}
