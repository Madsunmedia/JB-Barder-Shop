"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

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
      className="group relative flex flex-col justify-between bg-white/[0.03] border border-white/10 hover:border-gold/40 rounded-2xl p-6 transition-all duration-500 overflow-hidden min-h-[220px]"
    >
      {/* Background Image with Light Blur & Dark Overlay */}
      {service.image && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ease-out z-0"
            style={{ backgroundImage: `url(${service.image})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40 backdrop-blur-[1px] z-0" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md border border-gold/30 rounded-full text-gold text-[10px] font-mono uppercase tracking-wider shadow-xl">
            <Clock size={10} aria-hidden="true" />
            {service.duration}
          </span>
          <span className="text-warm-white/40 text-[10px] font-mono uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
            {service.category}
          </span>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-accent text-warm-white uppercase leading-snug group-hover:text-gold transition-colors duration-300 mb-2 drop-shadow-md">
            {service.name}
          </h3>
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            <div className="flex items-baseline gap-0.5">
              <span className="text-gold text-base font-accent drop-shadow-md">$</span>
              <span className="text-warm-white text-xl font-accent drop-shadow-md">{service.price}</span>
            </div>
            <button
              onClick={() => onBook(service)}
              className="flex items-center gap-1.5 min-h-[32px] px-4 py-1.5 bg-gold/10 backdrop-blur-md border border-gold/30 text-gold text-[10px] font-accent uppercase tracking-widest rounded-full hover:bg-gold hover:text-black active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.15)] group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]"
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
