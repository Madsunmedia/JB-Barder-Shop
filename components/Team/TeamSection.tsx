"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function TeamSection() {
  return (
    <section id="team" className="relative py-20 md:py-32 bg-[#050505] overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* Left: Image Teaser */}
        <div className="w-full md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] w-full max-w-md mx-auto md:mx-0 rounded-3xl overflow-hidden border border-white/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1621605815841-aa33c5cc70a9?q=80&w=2070&auto=format&fit=crop"
              alt="Jeet - Master Barber"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-gold font-accent text-xl uppercase">Jeet</p>
              <p className="text-warm-white/60 font-mono text-xs uppercase tracking-widest">Head Barber</p>
            </div>
          </motion.div>
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold font-accent text-sm tracking-[0.3em] uppercase"
          >
            The Craft
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-accent text-warm-white uppercase leading-tight"
          >
            Masters of <br />
            <span className="text-gold">Grooming</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-warm-white/50 text-base md:text-lg font-body max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
            We blend the timeless traditions of classic barbering with modern techniques to deliver flawless results every single time. Your look is personal — we treat it that way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <Link
              href="/team"
              className="inline-flex items-center gap-2 min-h-[44px] px-8 py-3 bg-white/5 border border-white/10 text-warm-white font-accent text-sm uppercase tracking-wider rounded-full hover:bg-gold hover:border-gold hover:text-black active:scale-95 transition-all duration-300"
            >
              Read Our Story & Meet the Team <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
