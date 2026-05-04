"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import ServicesSection from "@/components/Services/ServicesSection";
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
        <ServicesSection />
        <SEOServices />
        <TeamSection />
        <ReviewsSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
