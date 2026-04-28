"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SERVICES_DATA } from "@/lib/services-data";
import BookingDrawer from "../Booking/BookingDrawer";
import { Clock, ArrowRight } from "lucide-react";

// Group services by category for the full menu
const CATEGORY_GROUPS = [
  {
    id: "haircut",
    title: "Haircuts & Styling",
    description: "Precision cuts tailored to your head shape and lifestyle.",
  },
  {
    id: "beard",
    title: "Beard Grooming",
    description: "Expert shaping, lining, and conditioning for a sharp finish.",
  },
  {
    id: "shave",
    title: "Classic Shaves",
    description: "Traditional straight razor services with hot towels.",
  },
  {
    id: "kids",
    title: "Young Gentlemen",
    description: "Sharp styles for the next generation (12 & Under).",
  },
  {
    id: "grooming",
    title: "Extras & Details",
    description: "The finishing touches for a complete premium look.",
  },
];

export default function FullServicesMenu() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleBook = (service: any) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-24">
      {CATEGORY_GROUPS.map((group, groupIndex) => {
        const groupServices = SERVICES_DATA.filter((s) => s.category === group.id);
        if (groupServices.length === 0) return null;

        return (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="scroll-mt-32"
          >
            {/* Group Header */}
            <div className="mb-10 pb-4 border-b border-gold/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-accent text-gold uppercase tracking-wide">
                  {group.title}
                </h2>
                <p className="text-warm-white/50 font-body text-sm mt-2">
                  {group.description}
                </p>
              </div>
            </div>

            {/* Service Items List */}
            <div className="space-y-4">
              {groupServices.map((service, index) => (
                <div
                  key={service.id}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  {/* Left: Info */}
                  <div className="flex-1 space-y-2 pr-0 sm:pr-8">
                    <div className="flex items-start justify-between sm:justify-start sm:items-center gap-4">
                      <h3 className="text-xl font-accent text-warm-white uppercase tracking-wide group-hover:text-gold transition-colors duration-300">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-[10px] font-mono uppercase tracking-widest shrink-0 mt-1 sm:mt-0">
                        <Clock size={10} aria-hidden="true" />
                        {service.duration}
                      </div>
                    </div>
                    <p className="text-warm-white/50 text-sm font-body leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>

                  {/* Right: Price & CTA */}
                  <div className="flex sm:flex-col items-center justify-between sm:items-end gap-4 sm:gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-gold text-sm font-accent">$</span>
                      <span className="text-warm-white text-3xl font-accent">
                        {service.price}
                      </span>
                    </div>
                    <button
                      onClick={() => handleBook(service)}
                      className="flex items-center gap-2 min-h-[40px] px-5 py-2 bg-gold/10 border border-gold/30 text-gold text-xs font-accent uppercase tracking-widest rounded-full hover:bg-gold hover:text-black active:scale-95 transition-all duration-300"
                    >
                      Book <ArrowRight size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}

      <BookingDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        service={selectedService}
      />
    </div>
  );
}
