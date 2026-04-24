"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES_DATA, CATEGORIES } from "@/lib/services-data";
import FilterTabs from "./FilterTabs";
import ServiceCard from "./ServiceCard";
import BookingDrawer from "../Booking/BookingDrawer";

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
    <section id="services" className="relative py-40 bg-black overflow-hidden">
      {/* Background Text Effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <h2 className="text-[15rem] md:text-[25rem] font-accent text-warm-white opacity-[0.03] leading-none uppercase whitespace-nowrap">
          OUR SERVICES OUR SERVICES
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold font-accent text-xl tracking-[0.3em] uppercase"
          >
            Menu
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-accent text-gold uppercase"
          >
            Craftsmanship
          </motion.h2>
        </div>

        <FilterTabs
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Desktop Grid / Mobile Carousel */}
        <div className="relative">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ServiceCard service={service} onBook={handleBook} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <BookingDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        service={selectedService}
      />
    </section>
  );
}
