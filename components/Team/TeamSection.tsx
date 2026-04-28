"use client";

import { motion } from "framer-motion";
import BarberCard from "./BarberCard";

const TEAM = [
  {
    name: "Jeet",
    title: "Head Barber · Fade Specialist",
    bio: "Jeet brings years of precision craftsmanship to every cut. Praised by clients across Lethbridge for his flawless skin fades and immaculate beard work — his attention to detail is second to none.",
    image: "https://images.unsplash.com/photo-1621605815841-aa33c5cc70a9?q=80&w=2070&auto=format&fit=crop",
    specialties: ["Skin Fades", "Beard Sculpting", "Facials", "Hot Towel Shave"],
    quote: "Every client deserves to leave looking and feeling their best.",
  },
];

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

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gold font-accent text-sm tracking-[0.3em] uppercase"
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
            Meet the <span className="text-gold">Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-warm-white/40 text-sm md:text-base font-body max-w-lg"
          >
            Skilled barbers who take pride in every cut, fade, and finish. Your look is personal — we treat it that way.
          </motion.p>
        </div>

        {/* Team Cards */}
        <div className="space-y-8">
          {TEAM.map((barber) => (
            <BarberCard key={barber.name} barber={barber} />
          ))}
        </div>
      </div>
    </section>
  );
}
