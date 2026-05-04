"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_DATA } from "@/lib/services-data";
import { Check, Clock } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { id: "haircuts", name: "Haircuts" },
  { id: "combos", name: "Hair + Beard" },
  { id: "beard", name: "Beard Services" },
  { id: "grooming", name: "Grooming & Extras" }
];

export default function Step1_Services({ selected, onSelect, onNext }: any) {
  const [activeCategory, setActiveCategory] = useState("haircuts");

  const filteredServices = SERVICES_DATA.filter(service => {
    switch (activeCategory) {
      case "haircuts":
        return service.id === "skin-fade" || service.id === "regular-cut" || service.id === "seniors-cut" || service.category === "kids";
      case "combos":
        return service.id === "skin-fade-beard" || service.id === "regular-cut-beard";
      case "beard":
        return service.category === "beard" || service.category === "shave";
      case "grooming":
        return service.category === "grooming";
      default:
        return true;
    }
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-4xl font-accent text-gold uppercase tracking-widest">Select Service</h2>
        <p className="text-warm-white/60">Select a category to view available services.</p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2 rounded-full border transition-all duration-300 text-sm font-accent uppercase tracking-wider ${
              activeCategory === cat.id
                ? "bg-gold text-black border-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                : "bg-white/5 border-white/10 text-warm-white/60 hover:border-gold/50 hover:text-warm-white"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.button
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => onSelect(service)}
                className={`p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                  selected?.id === service.id 
                    ? "bg-gold/20 border-gold shadow-[0_0_20px_rgba(201,168,76,0.2)]" 
                    : "glass border-white/10 hover:border-gold/50"
                }`}
              >
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <h4 className="text-xl font-accent text-gold uppercase leading-tight pr-4">
                    {service.name.replace(" (12 & Under)", "").replace(" (65+)", "")}
                  </h4>
                  {selected?.id === service.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gold flex-shrink-0">
                      <Check size={24} />
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-3 text-warm-white/60 font-mono text-sm relative z-10">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {service.duration}</span>
                  <span className="text-white/20">|</span>
                  <span className="text-warm-white font-accent text-base tracking-wider">${service.price}</span>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex justify-end pt-4">
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
