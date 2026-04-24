"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative w-[400px] h-64 glass p-8 rounded-2xl border border-gold/10 flex flex-col justify-between overflow-hidden group"
    >
      {/* Shimmer Overlay */}
      <div className="absolute inset-0 shimmer pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-4">
        <div className="flex gap-1 text-gold">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star size={16} fill={i < review.rating ? "currentColor" : "none"} />
            </motion.div>
          ))}
        </div>
        
        <p className="text-warm-white/80 font-heading italic text-lg leading-relaxed line-clamp-4">
          &quot;{review.comment}&quot;
        </p>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-accent">
          {review.name.charAt(0)}
        </div>
        <span className="text-gold font-accent uppercase tracking-widest text-sm">
          {review.name}
        </span>
      </div>
    </motion.div>
  );
}
