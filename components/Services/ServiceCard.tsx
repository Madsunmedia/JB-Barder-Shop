"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  image?: string;
}

export default function ServiceCard({ service }: { service: Service }) {
  const { addToCart, removeFromCart, isInCart, openCart } = useCart();
  const inCart = isInCart(service.id);
  const [flash, setFlash] = useState(false);

  const handleCartToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCart) {
      removeFromCart(service.id);
    } else {
      addToCart(service as any);
      setFlash(true);
      setTimeout(() => setFlash(false), 1200);
      openCart();
    }
  };

  return (
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
      className="group relative flex flex-col justify-between bg-white/[0.03] border border-white/10 hover:border-gold/40 rounded-2xl p-5 md:p-6 transition-all duration-300 overflow-hidden min-h-[200px] md:min-h-[220px]"
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
          <div className="flex items-end justify-between pt-3 border-t border-white/10 gap-2">
            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="text-sm font-accent text-warm-white uppercase leading-tight group-hover:text-gold transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {service.name}
              </h3>
              <div className="flex items-baseline gap-0.5">
                <span className="text-gold text-xs font-accent drop-shadow-md">$</span>
                <span className="text-warm-white text-lg font-accent drop-shadow-md">
                  {service.price}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Add to Cart */}
              <motion.button
                onClick={handleCartToggle}
                whileTap={{ scale: 0.9 }}
                className={`flex items-center gap-1 min-h-[38px] px-3 py-1.5 rounded-full border text-[9px] font-accent uppercase tracking-widest transition-all duration-300 ${
                  inCart
                    ? "bg-gold border-gold text-black"
                    : flash
                    ? "bg-gold/80 border-gold text-black"
                    : "bg-black/40 backdrop-blur-md border-gold/30 text-gold hover:bg-gold hover:text-black"
                }`}
                aria-label={inCart ? `Remove ${service.name} from cart` : `Add ${service.name} to cart`}
              >
                {inCart ? (
                  <Check size={12} strokeWidth={3} />
                ) : (
                  <ShoppingCart size={12} />
                )}
                <span className="hidden sm:inline">{inCart ? "Added" : "Cart"}</span>
              </motion.button>

              {/* Book Now → 4-step wizard */}
              <Link
                href={`/book?serviceId=${service.id}`}
                className="flex items-center gap-1.5 min-h-[38px] px-3 py-1.5 bg-gold/10 backdrop-blur-md border border-gold/30 text-gold text-[9px] font-accent uppercase tracking-widest rounded-full hover:bg-gold hover:text-black active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(201,168,76,0.15)]"
                aria-label={`Book ${service.name}`}
              >
                Book
                <ArrowRight size={10} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
