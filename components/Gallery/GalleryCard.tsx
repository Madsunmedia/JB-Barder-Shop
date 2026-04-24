"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  tag?: string;
}

export default function GalleryCard({ 
  image, 
  index, 
  onClick 
}: { 
  image: GalleryImage; 
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Perspective tilt based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? 50 : -50]);

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, y: yParallax }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.1 }}
      className={`relative group cursor-none overflow-hidden rounded-2xl ${
        index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
      }`}
      onClick={onClick}
    >
      {/* Asymmetric Masonry Simulation via classes */}
      <div className={`relative aspect-[4/5] ${index % 3 === 0 ? "md:aspect-[3/4]" : "md:aspect-[4/5]"}`}>
        <Image
          src={image.url}
          alt={image.tag || "JB Barbershop Work"}
          fill
          className={`object-cover transition-all duration-1000 ease-out grayscale-[0.2] sepia-[0.1] contrast-[1.1] group-hover:scale-110 group-hover:grayscale-0 group-hover:sepia-0 ${
            isLoaded ? "blur-0 scale-100" : "blur-2xl scale-110"
          }`}
          onLoadingComplete={() => setIsLoaded(true)}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
           <div className="flex flex-col items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-black shadow-[0_0_20px_rgba(201,168,76,0.5)]">
                 <Eye size={24} />
              </div>
              <span className="text-gold font-accent text-sm tracking-widest uppercase">View</span>
           </div>
        </div>

        {/* Gold Border on Hover */}
        <div className="absolute inset-0 border-0 group-hover:border-[1px] border-gold/50 transition-all duration-500 pointer-events-none" />
      </div>

      {image.tag && (
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-black/60 glass text-[10px] text-gold uppercase font-mono tracking-tighter">
            {image.tag}
          </span>
        </div>
      )}
    </motion.div>
  );
}
