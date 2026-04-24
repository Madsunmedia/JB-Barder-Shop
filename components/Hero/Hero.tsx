"use client";

import { motion } from "framer-motion";
import ThreeBackground from "./ThreeBackground";
import Ticker from "../Ticker";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Hero() {
  const headline = "LOOK SHARP.";
  const letters = headline.split("");

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <ThreeBackground />

      <div className="relative z-10 text-center px-6">
        {/* Headline with letter-by-letter animation */}
        <h1 className="text-7xl md:text-[14rem] font-accent text-gold flex justify-center overflow-hidden">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.05,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-xl md:text-3xl font-heading italic text-warm-white/80 mt-4 max-w-2xl mx-auto"
        >
          Premium Men&apos;s Grooming in Lethbridge, Alberta
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12"
        >
          <Link
            href="https://jbbarbershopdsoo.setmore.com/book"
            target="_blank"
            className="w-full md:w-auto px-10 py-4 bg-gold text-black font-accent text-xl rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(201,168,76,0.3)]"
          >
            BOOK APPOINTMENT
          </Link>
          <Link
            href="#services"
            className="w-full md:w-auto px-10 py-4 border border-gold text-gold font-accent text-xl rounded-full hover:bg-gold/10 transition-all duration-300"
          >
            EXPLORE SERVICES
          </Link>
        </motion.div>
      </div>

      {/* Star Rating Badge */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-32 right-10 z-20 hidden md:flex items-center gap-3 bg-charcoal/80 glass px-6 py-3 rounded-2xl border border-gold/30"
      >
        <div className="flex gap-1 text-gold">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
        <div className="text-warm-white font-body text-sm">
          <span className="font-bold">5.0</span> · 19 Reviews
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-gold"
        />
      </motion.div>

      <Ticker />
    </section>
  );
}
