"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  image?: string;
}

export default function ServiceCard({
  service,
  onBook,
}: {
  service: Service;
  onBook: (s: Service) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      /* Only apply 3D tilt on devices that support hover (not touch) */
      whileHover={{ 
        y: -8,
        rotateX: 3,
        rotateY: -3,
        transition: { duration: 0.2 }
      }}
      className="group relative flex flex-col justify-between bg-white/[0.03] border border-white/10 hover:border-gold/40 rounded-2xl p-5 md:p-6 transition-all duration-300 overflow-hidden min-h-[200px] md:min-h-[220px]"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Background Image with Light Overlay */}
      {service.image && (
        <>
          <motion.div 
            className="absolute inset-0 bg-cover bg-center opacity-100 z-0"
            style={{ 
              backgroundImage: `url(${service.image})`,
              translateZ: -10
            }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/10 z-0" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md border border-gold/30 rounded-full text-gold text-[10px] font-mono uppercase tracking-wider shadow-xl">
            <Clock size={10} aria-hidden="true" />
            {service.duration}
          </span>
          <span className="text-warm-white/60 text-[10px] font-mono uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
            {service.category}
          </span>
        </div>

        <div className="mt-auto">
          <div className="flex items-end justify-between pt-3 border-t border-white/10 gap-3">
            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="text-sm font-accent text-warm-white uppercase leading-tight group-hover:text-gold transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {service.name}
              </h3>
              <div className="flex items-baseline gap-0.5">
                <span className="text-gold text-xs font-accent drop-shadow-md">$</span>
                <span className="text-warm-white text-lg font-accent drop-shadow-md">{service.price}</span>
              </div>
            </div>
            {/* Larger touch target on mobile */}
            <button
              onClick={() => onBook(service)}
              className="flex items-center gap-1.5 min-h-[44px] px-4 py-2 bg-gold/10 backdrop-blur-md border border-gold/30 text-gold text-[9px] font-accent uppercase tracking-widest rounded-full hover:bg-gold hover:text-black active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.15)] flex-shrink-0"
              aria-label={`Book ${service.name}`}
            >
              Book
              <ArrowRight size={10} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
