"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_DATA, CATEGORIES } from "@/lib/services-data";
import FilterTabs from "./FilterTabs";
import ServiceCard from "./ServiceCard";
import BookingDrawer from "../Booking/BookingDrawer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredServices = useMemo(() => {
    if (activeCategory === "all") return SERVICES_DATA;
    return SERVICES_DATA.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const handleBook = (service: any) => {
    setSelectedService(service);
    setIsDrawerOpen(true);
  };

  return (
    <section id="services" className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Subtle background grain and 3D glows */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] pointer-events-none" />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-gold/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.15, 0.05],
          x: [0, -40, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[0%] -right-[10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[150px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="space-y-3">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold font-accent text-sm tracking-[0.3em] uppercase"
            >
              Our Menu
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-accent text-warm-white uppercase leading-tight"
            >
              Services &amp; <span className="text-gold">Pricing</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/book"
              className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 border border-gold/30 text-gold font-accent text-sm uppercase tracking-wider rounded-full hover:bg-gold hover:text-black active:scale-95 transition-all duration-300"
            >
              Book Now <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <FilterTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Services Grid with 3D Perspective */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          style={{ perspective: '1200px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceCard service={service} onBook={handleBook} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-warm-white/30 text-xs font-mono mt-10 uppercase tracking-widest"
        >
          All prices are in CAD · Walk-ins welcome
        </motion.p>
      </div>

      <BookingDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        service={selectedService}
      />
    </section>
  );
}
