"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
}

export default function ServiceCard({ service, onBook }: { service: Service, onBook: (s: Service) => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Price Counter Animation
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = service.price;
    const duration = 1000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [service.price]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative h-64 w-full glass border-t-4 border-gold p-8 rounded-2xl flex flex-col justify-between group overflow-hidden cursor-pointer"
    >
      <div style={{ transform: "translateZ(50px)" }} className="space-y-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-gold/10 rounded-full w-fit">
          <Clock size={14} className="text-gold" />
          <span className="text-xs font-mono text-gold uppercase">{service.duration}</span>
        </div>
        <h3 className="text-2xl font-accent text-warm-white leading-tight uppercase group-hover:text-gold transition-colors">
          {service.name}
        </h3>
      </div>

      <div style={{ transform: "translateZ(75px)" }} className="flex items-baseline gap-1">
        <span className="text-gold font-accent text-4xl">$</span>
        <span className="text-warm-white font-accent text-5xl">{count}</span>
      </div>

      {/* Hover Slide-up Button */}
      <motion.button
        onClick={() => onBook(service)}
        initial={{ y: 100 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: 0 }}
        className="absolute inset-x-0 bottom-0 py-4 bg-gold text-black font-accent text-xl uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0"
      >
        Book This
      </motion.button>
    </motion.div>
  );
}
