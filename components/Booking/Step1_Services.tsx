"use client";

import { motion } from "framer-motion";
import { SERVICES_DATA } from "@/lib/services-data";
import { Check, Clock } from "lucide-react";

export default function Step1_Services({ selected, onSelect, onNext }: any) {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-4xl font-accent text-gold uppercase tracking-widest">Select Service</h2>
        <p className="text-warm-white/60">Choose the treatment you&apos;d like to receive.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {SERVICES_DATA.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className={`p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
              selected?.id === service.id 
                ? "bg-gold/20 border-gold shadow-[0_0_20px_rgba(201,168,76,0.2)]" 
                : "glass border-white/10 hover:border-gold/50"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-accent text-gold uppercase">{service.name}</h3>
              {selected?.id === service.id && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gold">
                  <Check size={24} />
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-4 text-warm-white/60 font-mono text-sm">
              <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
              <span className="text-gold font-accent text-lg">${service.price}</span>
            </div>
            
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      <div className="flex justify-end pt-8">
        <button
          disabled={!selected}
          onClick={onNext}
          className="px-12 py-4 bg-gold text-black font-accent text-xl rounded-full uppercase shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 transition-transform"
        >
          Next: Choose Barber
        </button>
      </div>
    </div>
  );
}
