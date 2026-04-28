"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Phone, Star, ChevronDown } from "lucide-react";
import { track } from "@vercel/analytics";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

const TICKER_ITEMS = [
  "SKIN FADES", "BEARD SCULPTS", "HOT TOWEL SHAVES",
  "FACIALS", "KIDS CUTS", "SENIOR CUTS", "EAR WAX",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <ThreeBackground />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 md:px-10 text-center pt-24 pb-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-gold/25 bg-gold/5 text-gold text-xs font-mono uppercase tracking-[0.25em]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Lethbridge&apos;s Premier Barbershop
        </motion.div>

        {/* Main Headline */}
        <h1 className="font-accent uppercase leading-[0.9] tracking-tight mb-6">
          {["LOOK", "SHARP."].map((word, wi) => (
            <span key={wi} className="block overflow-hidden">
              {word.split("").map((letter, li) => (
                <motion.span
                  key={li}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.35 + wi * 0.15 + li * 0.04,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  className="inline-block text-[clamp(4rem,15vw,10rem)] text-gold"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-warm-white/60 font-body text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
        >
          Expert skin fades, beard sculpts &amp; luxury grooming — crafted with precision at
          410 13 St N, Lethbridge.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/book"
            onClick={() => track("book_now_click", { location: "hero_primary" })}
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 bg-gold text-black font-accent text-lg rounded-full shadow-[0_0_20px_rgba(201,168,76,0.35)] hover:shadow-[0_0_36px_rgba(201,168,76,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
          >
            Book Appointment
          </Link>
          <a
            href="tel:+14039297321"
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 border border-gold/40 text-gold font-accent text-lg rounded-full hover:bg-gold/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Phone size={16} aria-hidden="true" />
            +1 403 929 7321
          </a>
        </motion.div>

        {/* Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-12 inline-flex items-center gap-3 px-5 py-3 glass rounded-2xl border border-gold/15"
        >
          <div className="flex gap-0.5 text-gold">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          <span className="text-warm-white/70 text-sm font-body">
            <strong className="text-warm-white">5.0</strong> · 19 Google Reviews
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
        </motion.div>
      </div>

      {/* ── Scroll Cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-warm-white/30"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={16} aria-hidden="true" />
        </motion.div>
      </motion.div>

      {/* ── Ticker Strip ── */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden bg-gold/8 border-t border-gold/15 py-3 select-none"
        aria-hidden="true"
      >
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          className="flex whitespace-nowrap gap-10"
        >
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-10 items-center">
              {TICKER_ITEMS.map((item) => (
                <span key={item} className="text-gold/70 font-accent text-sm md:text-base tracking-[0.2em]">
                  {item} <span className="text-gold/30">·</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
