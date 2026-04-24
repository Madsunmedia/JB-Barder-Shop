"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  useEffect(() => {
    // GSAP ScrollTrigger for section reveals
    const sections = gsap.utils.toArray(".reveal-section");
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-[300vh]">
      {/* Sticky Hero Section */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, rotate }}
          className="relative z-10 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-8xl md:text-[12rem] font-accent leading-none text-gold uppercase"
          >
            JB BARBER
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-2xl md:text-3xl font-heading italic text-warm-white/70 mt-4"
          >
            Where Tradition Meets Luxury
          </motion.p>
        </motion.div>

        {/* Cinematic Background Placeholder */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-charcoal)_0%,_black_100%)] z-0" />
        
        {/* Animated Lines */}
        <div className="absolute inset-0 z-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="absolute h-full w-[1px] bg-gold"
              style={{ left: `${20 * i}%`, opacity: 0.1 }}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-20 px-10 py-40 bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div className="reveal-section space-y-8">
            <h2 className="text-6xl font-accent text-gold">THE ART OF GROOMING</h2>
            <p className="text-lg text-warm-white/60 leading-relaxed">
              We provide more than just a haircut. We provide a tailored experience designed for the modern gentleman who values precision and style.
            </p>
            <div className="h-[400px] bg-charcoal border border-gold/20 glass rounded-2xl overflow-hidden group">
              <div className="w-full h-full bg-gold/5 group-hover:bg-gold/10 transition-colors duration-500 flex items-center justify-center">
                 <span className="text-gold/20 font-accent text-4xl uppercase tracking-widest">Master Craft</span>
              </div>
            </div>
          </div>
          
          <div className="reveal-section space-y-8 md:mt-40">
            <div className="h-[400px] bg-charcoal border border-gold/20 glass rounded-2xl overflow-hidden group">
               <div className="w-full h-full bg-gold/5 group-hover:bg-gold/10 transition-colors duration-500 flex items-center justify-center">
                 <span className="text-gold/20 font-accent text-4xl uppercase tracking-widest">Luxury Shave</span>
              </div>
            </div>
            <h2 className="text-6xl font-accent text-gold">PRECISION DEFINED</h2>
            <p className="text-lg text-warm-white/60 leading-relaxed">
              From classic pompadours to modern fades, our master barbers ensure every detail is perfect.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Contact Reveal */}
      <section className="h-screen flex items-center justify-center bg-charcoal">
         <div className="text-center reveal-section">
            <h3 className="text-4xl font-accent text-gold mb-8">LOCATED IN THE HEART OF THE CITY</h3>
            <p className="text-warm-white/50">123 Luxury Lane, Downtown Metro</p>
            <p className="text-warm-white/50">Mon - Sat: 10am - 8pm</p>
         </div>
      </section>
    </main>
  );
}
