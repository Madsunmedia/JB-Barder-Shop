"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SiteLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
        >
          {/* SVG Scissors Drawing Animation */}
          <div className="relative w-32 h-32 mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-gold stroke-[0.5]">
              <motion.path
                d="M30 70 L50 50 L70 70 M30 30 L50 50 L70 30"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                  transition: { 
                    pathLength: { duration: 1.5, ease: "easeInOut" },
                    opacity: { duration: 0.2 }
                  }
                }}
              />
              <motion.circle
                cx="30" cy="70" r="5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              />
              <motion.circle
                cx="30" cy="30" r="5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              />
              {/* Scissors Pivot */}
              <motion.circle
                cx="50" cy="50" r="2"
                fill="#C9A84C"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
              />
            </svg>
            
            {/* Animated Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gold/20 rounded-full blur-2xl -z-10"
            />
          </div>

          <div className="overflow-hidden">
             <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="flex items-baseline gap-2"
             >
                <span className="text-4xl font-accent text-gold tracking-tighter">JB</span>
                <span className="text-xl font-heading text-warm-white uppercase tracking-widest">Barbershop</span>
             </motion.div>
          </div>

          <div className="mt-4 w-48 h-[1px] bg-white/5 relative overflow-hidden">
             <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gold to-transparent"
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
