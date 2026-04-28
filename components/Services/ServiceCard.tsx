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
      className="group relative flex flex-col justify-between bg-white/[0.03] border border-white/8 hover:border-gold/30 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05]"
    >
      {/* Top row: duration badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-[10px] font-mono uppercase tracking-wider">
          <Clock size={10} aria-hidden="true" />
          {service.duration}
        </span>
        <span className="text-warm-white/20 text-xs font-mono uppercase tracking-wider">
          {service.category}
        </span>
      </div>

      {/* Service name */}
      <h3 className="text-xl font-accent text-warm-white uppercase leading-snug group-hover:text-gold transition-colors duration-300 mb-4">
        {service.name}
      </h3>

      {/* Price + CTA row */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex items-baseline gap-0.5">
          <span className="text-gold text-lg font-accent">$</span>
          <span className="text-warm-white text-2xl font-accent">{service.price}</span>
        </div>
        <button
          onClick={() => onBook(service)}
          className="flex items-center gap-1.5 min-h-[36px] px-4 py-1.5 bg-gold/10 border border-gold/20 text-gold text-xs font-accent uppercase tracking-wider rounded-full hover:bg-gold hover:text-black active:scale-95 transition-all duration-300"
        >
          Book
          <ArrowRight size={12} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}
