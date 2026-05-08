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

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/book?serviceId=${service.id}`} aria-label={`Book ${service.name}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{
          y: -8,
          rotateX: 3,
          rotateY: -3,
          transition: { duration: 0.2 },
        }}
        className="group relative flex flex-col justify-between bg-white/[0.03] border border-white/10 hover:border-gold/40 rounded-2xl p-5 md:p-6 transition-all duration-300 overflow-hidden min-h-[200px] md:min-h-[220px] cursor-pointer"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background Image */}
        {service.image && (
          <>
            <motion.div
              className="absolute inset-0 bg-cover bg-center opacity-100 z-0"
              style={{ backgroundImage: `url(${service.image})`, translateZ: -10 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/10 z-0" />
          </>
        )}

        {/* Hover overlay — "Book This Service" */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px] rounded-2xl">
          <span className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-accent text-sm uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(201,168,76,0.5)]">
            Book This Service <ArrowRight size={14} />
          </span>
        </div>

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

          <div className="mt-auto pt-3 border-t border-white/10">
            <h3 className="text-sm font-accent text-warm-white uppercase leading-tight group-hover:text-gold transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-1">
              {service.name}
            </h3>
            <div className="flex items-baseline gap-0.5">
              <span className="text-gold text-xs font-accent drop-shadow-md">$</span>
              <span className="text-warm-white text-lg font-accent drop-shadow-md">
                {service.price}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
