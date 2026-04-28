"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";

interface Barber {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
  quote?: string;
}

export default function BarberCard({ barber }: { barber: Barber }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative flex flex-col md:flex-row gap-0 rounded-3xl overflow-hidden border border-white/8 bg-white/[0.02] hover:border-gold/25 transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative w-full md:w-[300px] aspect-[4/3] md:aspect-auto md:min-h-[420px] flex-shrink-0 overflow-hidden">
        <Image
          src={barber.image}
          alt={`${barber.name} — ${barber.title}`}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 300px"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-7 md:p-10 gap-5">
        <div>
          <p className="text-gold text-xs font-mono uppercase tracking-[0.25em] mb-1">{barber.title}</p>
          <h3 className="text-4xl md:text-5xl font-accent text-warm-white uppercase">{barber.name}</h3>
        </div>

        <p className="text-warm-white/60 font-body text-sm leading-relaxed max-w-md">
          {barber.bio}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2">
          {barber.specialties.map((spec) => (
            <span
              key={spec}
              className="px-3 py-1 bg-gold/8 border border-gold/20 text-gold text-xs rounded-full font-mono uppercase tracking-wider"
            >
              {spec}
            </span>
          ))}
        </div>

        {barber.quote && (
          <blockquote className="border-l-2 border-gold/30 pl-4 text-warm-white/40 font-heading italic text-sm">
            &ldquo;{barber.quote}&rdquo;
          </blockquote>
        )}

        <Link
          href="/book"
          onClick={() => track("book_now_click", { location: "team_card" })}
          className="mt-2 self-start inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-gold text-black font-accent text-sm uppercase tracking-wider rounded-full hover:shadow-[0_0_20px_rgba(201,168,76,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Book with {barber.name}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
}
