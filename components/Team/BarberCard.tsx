"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface Barber {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
  quote?: string;
}

export default function BarberCard({ barber }: { barber: Barber }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full h-[500px] cursor-pointer perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full transform-style-3d shadow-xl rounded-2xl overflow-hidden animate-float"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <Image
            src={barber.image}
            alt={barber.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-4xl font-accent text-gold uppercase">{barber.name}</h3>
            <p className="text-warm-white/70 font-heading italic">{barber.title}</p>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-charcoal p-10 flex flex-col justify-center gap-6 border border-gold/20">
          <div className="space-y-4">
            <h3 className="text-3xl font-accent text-gold uppercase">{barber.name}</h3>
            <p className="text-warm-white/80 font-body leading-relaxed">{barber.bio}</p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-accent text-gold/50 uppercase tracking-widest">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {barber.specialties.map((spec) => (
                <span key={spec} className="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full border border-gold/20 uppercase font-mono">
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {barber.quote && (
            <div className="mt-4 pt-4 border-t border-white/10 italic text-warm-white/60 font-heading text-sm">
              &quot;{barber.quote}&quot;
            </div>
          )}

          <button className="mt-4 w-full py-3 bg-gold text-black font-accent text-lg uppercase rounded-lg hover:scale-105 transition-transform">
            Book with {barber.name}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
