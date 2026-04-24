"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import ServicesSection from "@/components/Services/ServicesSection";
import TeamSection from "@/components/Team/TeamSection";

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

      {/* Reviews Preview Section */}
      <section id="reviews" className="py-40 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-5xl font-accent text-gold mb-20 uppercase tracking-widest">Client Testimonials</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="space-y-6">
                   <div className="flex justify-center gap-1 text-gold">
                      {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                   </div>
                   <p className="text-lg italic text-warm-white/80">
                      &quot;Best barbershop in Lethbridge! The attention to detail is unmatched.&quot;
                   </p>
                   <p className="text-gold font-accent tracking-widest">— Alex M.</p>
                </div>
              ))}
           </div>
        </div>
      </section>

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
