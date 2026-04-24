import type { Metadata } from "next";
import { Inter, Playfair_Display, Bebas_Neue } from "next/font/google";
import "./globals.css";
import MagneticCursor from "@/components/MagneticCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import BookNowCTA from "@/components/BookNowCTA";

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
  title: "JB Barbershop | Luxury Grooming Experience",
  description: "Elite barbershop services with a premium touch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${inter.variable} ${playfair.variable} ${bebas.variable} font-body bg-black text-white selection:bg-gold selection:text-black overflow-x-hidden`}
      >
        <NoiseOverlay />
        <MagneticCursor />
        <PageTransition>
          {children}
        </PageTransition>
        <BookNowCTA />
      </body>
    </html>
  );
}
