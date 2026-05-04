"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { REVIEWS_DATA } from "@/lib/reviews-data";
import { useState } from "react";

export default function ReviewsSection() {
  const [displayCount, setDisplayCount] = useState(6);
  const reviews = REVIEWS_DATA;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -45 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
  };

  return (
    <section id="reviews" className="relative py-20 md:py-32 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold font-accent text-sm tracking-[0.3em] uppercase"
            >
              What Clients Say
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-accent text-warm-white uppercase leading-tight"
            >
              5.0 ★ on <span className="text-gold">Google</span>
            </motion.h2>
          </div>

          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02]"
          >
            <div>
              <p className="text-3xl font-accent text-gold leading-none">5.0</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star size={12} fill="currentColor" className="text-gold" aria-hidden="true" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-warm-white font-accent text-xl leading-none">89</p>
              <p className="text-warm-white/40 text-xs font-mono mt-1 uppercase tracking-wider">Reviews</p>
            </div>
          </motion.div>
        </div>

        {/* Review Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {reviews.slice(0, displayCount).map((review, i) => (
              <motion.div
                key={review.id}
                variants={cardVariants}
                layout
                className="flex flex-col gap-4 p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-gold/20 transition-colors duration-300 group"
              >
                {/* Stars with Sequential Animation */}
                <div className="flex gap-0.5 text-gold">
                  {[...Array(review.rating)].map((_, si) => (
                    <motion.div
                      key={si}
                      custom={si}
                      variants={starVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Star size={14} fill="currentColor" aria-hidden="true" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <div className="relative flex-1">
                  <Quote
                    size={20}
                    className="text-gold/20 absolute -top-1 -left-1"
                    aria-hidden="true"
                  />
                  <p className="text-warm-white/70 font-body text-sm leading-relaxed pl-4">
                    {review.comment}
                  </p>
                </div>

                {/* Reviewer */}
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div
                    className="w-9 h-9 rounded-full bg-gold/15 border border-gold/20 flex items-center justify-center text-gold font-accent text-sm flex-shrink-0 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-warm-white text-sm font-accent uppercase tracking-wider leading-none">
                      {review.name}
                    </p>
                    <p className="text-warm-white/30 text-[10px] font-mono uppercase tracking-wider mt-0.5">
                      Google Review
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Actions */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {displayCount < reviews.length && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setDisplayCount(prev => Math.min(prev + 12, reviews.length))}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-warm-white font-accent text-sm uppercase tracking-widest rounded-full transition-all"
            >
              Show More Reviews
            </motion.button>
          )}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="https://g.page/r/jbbarbershop/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 border border-gold/30 text-gold font-accent text-sm uppercase tracking-wider rounded-full hover:bg-gold hover:text-black active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.1)]"
            >
              Leave a Review on Google
              <Star size={12} fill="currentColor" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
