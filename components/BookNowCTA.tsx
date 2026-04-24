"use client";

import { motion } from "framer-motion";

export default function BookNowCTA() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-10 right-10 z-[9997] bg-gold text-black font-accent text-xl px-8 py-3 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_40px_rgba(201,168,76,0.6)] transition-shadow duration-300"
    >
      BOOK NOW
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-gold -z-10"
      />
    </motion.button>
  );
}
