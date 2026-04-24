"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface GalleryImage {
  id: string;
  url: string;
  tag?: string;
}

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (index === null) return null;

  const currentImage = images[index];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 md:p-10 overflow-hidden"
      >
        {/* Blurred Background */}
        <div className="absolute inset-0 opacity-30 blur-3xl pointer-events-none">
           <Image
             src={currentImage.url}
             alt="Background Blur"
             fill
             className="object-cover"
           />
        </div>

        <button
          onClick={onClose}
          className="absolute top-8 right-8 z-[1010] text-warm-white/50 hover:text-gold transition-colors"
        >
          <X size={40} />
        </button>

        {/* Controls */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-[1010] text-warm-white/50 hover:text-gold transition-colors"
        >
          <ChevronLeft size={60} strokeWidth={1} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-[1010] text-warm-white/50 hover:text-gold transition-colors"
        >
          <ChevronRight size={60} strokeWidth={1} />
        </button>

        {/* Main Image */}
        <motion.div
          key={currentImage.url}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full h-full max-w-5xl max-h-[80vh] z-[1005]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={currentImage.url}
            alt={currentImage.tag || "Gallery Image"}
            fill
            className="object-contain"
            priority
          />
          
          {currentImage.tag && (
            <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 text-center">
               <h3 className="text-gold font-accent text-2xl uppercase tracking-widest">{currentImage.tag}</h3>
            </div>
          )}
        </motion.div>

        {/* Swipe Hint for mobile */}
        <div className="absolute bottom-8 text-warm-white/20 font-mono text-xs md:hidden">
           SWIPE TO NAVIGATE
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
