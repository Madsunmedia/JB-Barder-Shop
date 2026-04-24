"use client";

import { motion } from "framer-motion";

const SERVICES = [
  "SKIN FADE",
  "BEARD TRIM",
  "HOT TOWEL SHAVE",
  "FACIALS",
  "WAX",
  "HAIR COLOR",
  "KIDS CUT",
];

export default function Ticker() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-gold/10 border-t border-gold/20 py-4 select-none">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="flex whitespace-nowrap gap-12"
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-12 items-center">
            {SERVICES.map((service) => (
              <span
                key={service}
                className="text-gold font-accent text-2xl md:text-3xl tracking-widest opacity-80"
              >
                {service} ·
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
