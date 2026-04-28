"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import ServicesSection from "@/components/Services/ServicesSection";
import TeamSection from "@/components/Team/TeamSection";
import ReviewsSection from "@/components/Reviews/ReviewsSection";
import ContactSection from "@/components/Contact/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative bg-black">
      <Navbar />
      <Hero />
      <ServicesSection />
      <TeamSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
