"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scissors } from "lucide-react";
import BarberCard from "@/components/Team/BarberCard";

const TEAM = [
  {
    name: "Jeet",
    title: "Head Barber · Fade Specialist",
    bio: "With years of precision craftsmanship under his belt, Jeet brings an uncompromising standard to every cut. Known across Lethbridge for his flawless skin fades and immaculate beard work, his attention to detail is second to none.",
    image: "https://images.unsplash.com/photo-1621605815841-aa33c5cc70a9?q=80&w=2070&auto=format&fit=crop",
    specialties: ["Skin Fades", "Beard Sculpting", "Facials", "Hot Towel Shave"],
    quote: "Every client deserves to leave looking and feeling their absolute best.",
  },
];

export default function TeamStory() {
  return (
    <div className="w-full">
      {/* ─── Story Section ─── */}
      <section className="relative pt-12 pb-24 px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#C9A84C_0%,transparent_70%)] opacity-[0.03] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-mono uppercase tracking-[0.25em]">
            <Scissors size={12} className="rotate-45" />
            Our Roots
          </span>
          <h1 className="text-5xl md:text-7xl font-accent text-warm-white uppercase leading-[0.9] tracking-tight">
            More than just <br className="hidden md:block" />
            <span className="text-gold">a haircut.</span>
          </h1>
          <div className="space-y-6 text-warm-white/60 font-body text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            <p>
              Located in the heart of Lethbridge, JB Barbershop was founded on a simple principle: men’s grooming should be an experience, not a chore. We blend the timeless traditions of classic barbering with modern techniques to deliver flawless results every single time.
            </p>
            <p>
              Whether you are coming in for a sharp skin fade, a meticulous beard sculpt, or a relaxing hot towel shave, our chair is a place to unwind, reset, and walk out with absolute confidence.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Image Break ─── */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto mb-24">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop"
            alt="Inside JB Barbershop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </section>

      {/* ─── Team Section ─── */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto mb-32">
        <div className="mb-12 md:mb-16 space-y-3">
          <span className="text-gold font-accent text-sm tracking-[0.3em] uppercase">
            The Masters
          </span>
          <h2 className="text-4xl md:text-6xl font-accent text-warm-white uppercase leading-tight">
            Meet the <span className="text-gold">Team</span>
          </h2>
          <p className="text-warm-white/40 text-sm md:text-base font-body max-w-lg">
            Skilled professionals who take immense pride in their craft. Your look is personal — we treat it that way.
          </p>
        </div>

        <div className="space-y-8">
          {TEAM.map((barber) => (
            <BarberCard key={barber.name} barber={barber} />
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="px-5 md:px-10 mb-20">
        <div className="max-w-4xl mx-auto p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <h2 className="text-4xl md:text-5xl font-accent text-warm-white uppercase">
            Experience the standard.
          </h2>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3.5 bg-gold text-black font-accent text-lg rounded-full shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_36px_rgba(201,168,76,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Book Your Seat <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
