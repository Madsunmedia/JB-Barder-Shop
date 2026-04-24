"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import ReviewMarquee from "./ReviewMarquee";
import { REVIEWS_DATA } from "@/lib/reviews-data";
import ReviewModal from "./ReviewModal";

export default function ReviewsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  // Animated Counter for Stats
  const ratingValue = useMotionValue(0);
  const clientsValue = useMotionValue(0);
  const springRating = useSpring(ratingValue, { stiffness: 100, damping: 30 });
  const springClients = useSpring(clientsValue, { stiffness: 100, damping: 30 });

  const [displayRating, setDisplayRating] = useState("0.0");
  const [displayClients, setDisplayClients] = useState(0);

  useEffect(() => {
    springRating.on("change", (latest) => setDisplayRating(latest.toFixed(1)));
    springClients.on("change", (latest) => setDisplayClients(Math.floor(latest)));
  }, [springRating, springClients]);

  const handleInView = () => {
    ratingValue.set(5.0);
    clientsValue.set(19);
  };

  return (
    <section id="reviews" className="relative py-40 bg-black overflow-hidden" ref={containerRef}>
      {/* Star Background Overlay */}
      <div className="absolute inset-0 stars-bg pointer-events-none" />

      <div className="relative z-10 space-y-32">
        {/* Stats Header */}
        <motion.div 
          onViewportEnter={handleInView}
          className="max-w-7xl mx-auto px-6 text-center space-y-6"
        >
          <div className="flex justify-center gap-2 text-gold mb-4">
             {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
          </div>
          <h2 className="text-6xl md:text-8xl font-accent text-gold uppercase tracking-widest">
            {displayRating} ★ RATING
          </h2>
          <p className="text-2xl md:text-4xl font-heading italic text-warm-white/60">
            from {displayClients} Happy Clients in Lethbridge
          </p>
        </motion.div>

        {/* Marquees */}
        <div className="space-y-12">
          <ReviewMarquee reviews={REVIEWS_DATA.slice(0, 3)} />
          <ReviewMarquee reviews={REVIEWS_DATA.slice(3, 6)} reverse />
        </div>

        {/* CTA */}
        <div className="text-center px-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-4 px-12 py-6 bg-gold text-black font-accent text-2xl uppercase rounded-full shadow-[0_20px_50px_rgba(201,168,76,0.3)] transition-all overflow-hidden"
          >
            <div className="absolute inset-0 shimmer opacity-20" />
            <MessageSquarePlus size={24} />
            Share Your Experience
          </motion.button>
        </div>
      </div>

      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
