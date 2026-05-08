"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_DATA } from "@/lib/services-data";
import { Check, Clock } from "lucide-react";
import { useState } from "react";

const CATEGORIES = [
  { id: "all", name: "All Services" },
  { id: "haircuts", name: "Haircuts" },
  { id: "combos", name: "Hair + Beard" },
  { id: "beard", name: "Beard Services" },
  { id: "grooming", name: "Grooming & Extras" },
];

function filterByCategory(categoryId: string) {
  switch (categoryId) {
    case "haircuts":
      return SERVICES_DATA.filter(
        (s) =>
          s.id === "skin-fade" ||
          s.id === "regular-cut" ||
          s.id === "seniors-cut" ||
          s.category === "kids"
      );
    case "combos":
      return SERVICES_DATA.filter(
        (s) => s.id === "skin-fade-beard" || s.id === "regular-cut-beard"
      );
    case "beard":
      return SERVICES_DATA.filter(
        (s) => s.category === "beard" || s.category === "shave"
      );
    case "grooming":
      return SERVICES_DATA.filter((s) => s.category === "grooming");
    default:
      return SERVICES_DATA;
  }
}

function countInCategory(categoryId: string, selected: any[]): number {
  if (!selected.length) return 0;
  const ids = new Set(filterByCategory(categoryId).map((s) => s.id));
  return selected.filter((s) => ids.has(s.id)).length;
}

export default function Step1_Services({
  selected,
  onSelect,
  onNext,
}: {
  selected: any[];
  onSelect: (s: any) => void;
  onNext: () => void;
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredServices = filterByCategory(activeCategory);
  const isSelected = (service: any) =>
    selected.some((s) => s.id === service.id);

  const totalPrice = selected.reduce((sum, s) => sum + (s.price ?? 0), 0);
  const totalMins = selected.reduce((sum, s) => {
    const n = parseInt(s.duration ?? "0");
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-1.5 md:space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-accent text-gold uppercase tracking-widest">
          Choose Your Services
        </h2>
        <p className="text-warm-white/60 text-sm md:text-base">
          Select as many as you like — mix and match across categories, then hit Next.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap overflow-x-auto scrollbar-none pb-1">
        {CATEGORIES.map((cat) => {
          const count =
            cat.id === "all"
              ? selected.length
              : countInCategory(cat.id, selected);
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full border transition-all duration-300 text-sm font-accent uppercase tracking-wider whitespace-nowrap ${
                isActive
                  ? "bg-gold text-black border-gold shadow-[0_0_15px_rgba(201,168,76,0.3)]"
                  : "bg-white/5 border-white/10 text-warm-white/60 hover:border-gold/50 hover:text-warm-white active:bg-gold/20"
              }`}
            >
              {cat.name}
              {count > 0 && (
                <span
                  className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold leading-none ${
                    isActive
                      ? "bg-black/30 text-black"
                      : "bg-gold text-black"
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Services grid */}
      <div className="md:max-h-[420px] md:overflow-y-auto md:pr-2">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const sel = isSelected(service);
              return (
                <motion.button
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  onClick={() => onSelect(service)}
                  className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 text-left relative overflow-hidden group min-h-[100px] active:scale-[0.98] ${
                    sel
                      ? "bg-gold/20 border-gold shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                      : "glass border-white/10 hover:border-gold/50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3 relative z-10">
                    <h4 className="text-lg md:text-xl font-accent text-gold uppercase leading-tight pr-3">
                      {service.name
                        .replace(" (12 & Under)", "")
                        .replace(" (65+)", "")}
                    </h4>
                    {/* Checkbox circle */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        sel
                          ? "bg-gold border-gold"
                          : "border-white/20 group-hover:border-gold/50"
                      }`}
                    >
                      {sel && <Check size={13} className="text-black" strokeWidth={3} />}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-warm-white/60 font-mono text-sm relative z-10">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} /> {service.duration}
                    </span>
                    <span className="text-white/20">|</span>
                    <span className="text-warm-white font-accent text-base tracking-wider">
                      ${service.price}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom bar: summary + Next */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 md:pt-4">
        {selected.length > 0 ? (
          <div className="space-y-0.5">
            <p className="text-sm text-warm-white/70 font-body">
              <span className="text-gold font-accent">{selected.length}</span>{" "}
              service{selected.length !== 1 ? "s" : ""} selected
            </p>
            <p className="text-xs text-warm-white/40 font-mono">
              ~{totalMins} mins &nbsp;·&nbsp;{" "}
              <span className="text-gold font-accent">${totalPrice}</span> total
            </p>
          </div>
        ) : (
          <p className="text-sm text-warm-white/30 font-body">
            Select at least one service to continue
          </p>
        )}
        <button
          disabled={selected.length === 0}
          onClick={onNext}
          className="w-full sm:w-auto px-10 md:px-12 py-4 bg-gold text-black font-accent text-lg md:text-xl rounded-full uppercase shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-transform min-h-[52px]"
        >
          Next: Choose Barber
        </button>
      </div>
    </div>
  );
}
