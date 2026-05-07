"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterTabs({ categories, activeCategory, onCategoryChange }: FilterTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    /* Outer: full bleed on mobile for edge-to-edge scroll feel */
    <div className="-mx-5 md:mx-0 mb-12 md:mb-16">
      <div
        ref={scrollRef}
        className="scroll-tabs px-5 md:px-0 md:flex md:flex-wrap md:justify-center md:gap-8"
        role="tablist"
        aria-label="Service categories"
      >
        {categories.map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => onCategoryChange(category)}
            className={`relative px-4 py-3 md:py-2 min-h-[44px] text-sm md:text-base font-accent uppercase tracking-[0.2em] transition-colors duration-300 whitespace-nowrap ${
              activeCategory === category ? "text-gold" : "text-warm-white/50 hover:text-warm-white active:text-gold"
            }`}
          >
            {category}
            {activeCategory === category && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
