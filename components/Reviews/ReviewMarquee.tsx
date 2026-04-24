"use client";

import { motion } from "framer-motion";
import ReviewCard from "./ReviewCard";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

export default function ReviewMarquee({ reviews, reverse = false }: { reviews: Review[], reverse?: boolean }) {
  // Triple the reviews to ensure seamless looping
  const tripleReviews = [...reviews, ...reviews, ...reviews];

  return (
    <div className="flex overflow-hidden group select-none">
      <motion.div
        animate={{
          x: reverse ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        className="flex gap-8 py-4 whitespace-nowrap"
      >
        {tripleReviews.map((review, i) => (
          <ReviewCard key={`${review.id}-${i}`} review={review} />
        ))}
      </motion.div>
    </div>
  );
}
