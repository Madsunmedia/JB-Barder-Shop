"use client";

import { motion } from "framer-motion";

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterTabs({ categories, activeCategory, onCategoryChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`relative px-4 py-2 text-sm md:text-base font-accent uppercase tracking-[0.2em] transition-colors duration-300 ${
            activeCategory === category ? "text-gold" : "text-warm-white/50 hover:text-warm-white"
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
  );
}
