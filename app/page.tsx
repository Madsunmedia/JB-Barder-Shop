"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import ServicesSection from "@/components/Services/ServicesSection";
import CategoryMarquee from "@/components/Services/CategoryMarquee";
import SEOServices from "@/components/Services/SEOServices";
import TeamSection from "@/components/Team/TeamSection";
import ReviewsSection from "@/components/Reviews/ReviewsSection";
import FAQSection from "@/components/FAQ/FAQSection";
import ContactSection from "@/components/Contact/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative bg-[#050505] flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategoryMarquee />
        <ServicesSection />
        <ReviewsSection />
        <SEOServices />
        <TeamSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
