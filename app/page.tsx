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

      {/* Contact Section Placeholder */}
      <section id="contact" className="py-20 text-center bg-black">
         <p className="text-warm-white/40 font-mono">© 2026 JB BARBERSHOP · LETHBRIDGE, ALBERTA</p>
      </section>
    </div>
  );
}

function Star({ size, fill }: { size: number, fill: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={fill} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
