"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, User } from "lucide-react";

const BARBERS = [
  { id: "jeet", name: "Jeet", title: "Senior Barber", image: "https://images.unsplash.com/photo-1621605815841-aa33c5cc70a9?q=80&w=2070&auto=format&fit=crop" },
  { id: "any", name: "No Preference", title: "Any Available Barber", image: null }
];

export default function Step2_Barbers({ selected, onSelect, onNext, onBack }: any) {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-4xl font-accent text-gold uppercase tracking-widest">Select Barber</h2>
        <p className="text-warm-white/60">Choose your favorite stylist or go with the first available.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BARBERS.map((barber) => (
          <button
            key={barber.id}
            onClick={() => onSelect(barber)}
            className={`group relative p-8 rounded-3xl border transition-all duration-300 overflow-hidden ${
              selected?.id === barber.id 
                ? "bg-gold/20 border-gold shadow-[0_0_30px_rgba(201,168,76,0.2)]" 
                : "glass border-white/10 hover:border-gold/50"
            }`}
          >
            <div className="flex items-center gap-6 relative z-10">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-charcoal flex items-center justify-center border border-white/10 group-hover:border-gold/50 transition-colors">
                {barber.image ? (
                  <Image src={barber.image} alt={barber.name} fill className="object-cover" />
                ) : (
                  <User size={32} className="text-gold/50" />
                )}
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-accent text-gold uppercase">{barber.name}</h3>
                <p className="text-warm-white/50 text-sm font-heading italic">{barber.title}</p>
              </div>
              {selected?.id === barber.id && (
                <div className="ml-auto text-gold">
                  <Check size={28} />
                </div>
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <div className="flex justify-between pt-8">
        <button onClick={onBack} className="px-8 py-4 border border-white/10 text-warm-white/50 font-accent uppercase rounded-full hover:text-gold hover:border-gold transition-all">
          Back
        </button>
        <button
          disabled={!selected}
          onClick={onNext}
          className="px-12 py-4 bg-gold text-black font-accent text-xl rounded-full uppercase shadow-lg disabled:opacity-30 hover:scale-105 transition-transform"
        >
          Next: Schedule
        </button>
      </div>
    </div>
  );
}
