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
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-1.5 md:space-y-2">
        <h2 className="text-3xl md:text-4xl font-accent text-gold uppercase tracking-widest">Select Service</h2>
        <p className="text-warm-white/60 text-sm md:text-base">Select a category to view available services.</p>
      </div>

      {/* Category Tabs — horizontally scrollable on mobile */}
      <div className="booking-cat-tabs flex gap-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-5 py-2.5 min-h-[44px] rounded-full border transition-all duration-300 text-sm font-accent uppercase tracking-wider whitespace-nowrap ${
              activeCategory === cat.id
                ? "bg-gold text-black border-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                : "bg-white/5 border-white/10 text-warm-white/60 hover:border-gold/50 hover:text-warm-white active:bg-gold/20"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Services list — no fixed height on mobile, auto scroll via page */}
      <div className="md:max-h-[420px] md:overflow-y-auto md:pr-2">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.button
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                onClick={() => onSelect(service)}
                className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group min-h-[100px] active:scale-[0.98] ${
                  selected?.id === service.id 
                    ? "bg-gold/20 border-gold shadow-[0_0_20px_rgba(201,168,76,0.2)]" 
                    : "glass border-white/10 hover:border-gold/50"
                }`}
              >
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <h4 className="text-lg md:text-xl font-accent text-gold uppercase leading-tight pr-4">
                    {service.name.replace(" (12 & Under)", "").replace(" (65+)", "")}
                  </h4>
                  {selected?.id === service.id && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gold flex-shrink-0">
                      <Check size={22} />
                    </motion.div>
                  )}
                </div>
                <div className="flex items-center gap-3 text-warm-white/60 font-mono text-sm relative z-10">
                  <span className="flex items-center gap-1.5"><Clock size={13} /> {service.duration}</span>
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

      <div className="flex justify-end pt-2 md:pt-4">
        <button
          disabled={!selected}
          onClick={onNext}
          className="w-full sm:w-auto px-10 md:px-12 py-4 bg-gold text-black font-accent text-lg md:text-xl rounded-full uppercase shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform min-h-[52px]"
        >
          Next: Choose Barber
        </button>
      </div>
    </div>
  );
}
