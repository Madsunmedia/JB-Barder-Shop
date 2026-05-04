"use client";

import { motion } from "framer-motion";
import { SERVICES_DATA } from "@/lib/services-data";
import { Check, Clock } from "lucide-react";

export default function Step1_Services({ selected, onSelect, onNext }: any) {
  
  // Group and order services smartly
  const CATEGORY_GROUPS = [
    {
      title: "Hair + Beard Combos",
      items: SERVICES_DATA.filter(s => s.id === "skin-fade-beard" || s.id === "regular-cut-beard")
    },
    {
      title: "Haircuts",
      items: SERVICES_DATA.filter(s => s.id === "skin-fade" || s.id === "regular-cut" || s.id === "seniors-cut")
    },
    {
      title: "Beard & Shave",
      items: SERVICES_DATA.filter(s => s.category === "beard" || s.category === "shave")
    },
    {
      title: "Kids (12 & Under)",
      items: SERVICES_DATA.filter(s => s.category === "kids")
    },
    {
      title: "Grooming & Extras",
      items: SERVICES_DATA.filter(s => s.category === "grooming")
    }
  ];

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-4xl font-accent text-gold uppercase tracking-widest">Select Service</h2>
        <p className="text-warm-white/60">Choose a service category, then select your preferred style.</p>
      </div>

      <div className="max-h-[500px] overflow-y-auto pr-4 custom-scrollbar space-y-12">
        {CATEGORY_GROUPS.map((group, idx) => (
          group.items.length > 0 && (
            <div key={idx} className="space-y-6">
              <h3 className="text-2xl font-accent text-warm-white/80 uppercase tracking-widest border-b border-white/10 pb-2">
                {group.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => onSelect(service)}
                    className={`p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group ${
                      selected?.id === service.id 
                        ? "bg-gold/20 border-gold shadow-[0_0_20px_rgba(201,168,76,0.2)]" 
                        : "glass border-white/10 hover:border-gold/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-xl font-accent text-gold uppercase leading-tight pr-4">
                        {service.name.replace(" (12 & Under)", "").replace(" (65+)", "")}
                      </h4>
                      {selected?.id === service.id && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gold flex-shrink-0">
                          <Check size={24} />
                        </motion.div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-warm-white/60 font-mono text-sm">
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {service.duration}</span>
                      <span className="text-white/20">|</span>
                      <span className="text-warm-white font-accent text-base tracking-wider">${service.price}</span>
                    </div>
                    
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )
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
