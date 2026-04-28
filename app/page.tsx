"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import ServicesSection from "@/components/Services/ServicesSection";
import TeamSection from "@/components/Team/TeamSection";
import ReviewsSection from "@/components/Reviews/ReviewsSection";
import ContactSection from "@/components/Contact/ContactSection";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger for pinning the Hero
    const hero = heroRef.current;
    
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: true,
      scrub: true,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Framer Motion transforms for scroll effects
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div ref={mainRef} className="relative bg-black">
      <Navbar />
      
      {/* Pinned Hero Section */}
      <motion.div 
        ref={heroRef} 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="w-full"
      >
        <Hero />
      </motion.div>

      {/* Services Section */}
      <ServicesSection />

      {/* Team Section */}
      <TeamSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

