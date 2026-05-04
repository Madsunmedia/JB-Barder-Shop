"use client";

import { useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { Scissors } from "lucide-react";

const CATEGORIES = [
  "Skin Fades",
  "Classic Cuts",
  "Beard Trims",
  "Hot Towel Shaves",
  "Kids Haircuts",
  "Line-Ups",
  "Precision Grooming",
  "Hair Styling"
];

// Combine the array twice to create an infinite loop track
const TRACK_ITEMS = [...CATEGORIES, ...CATEGORIES];

const Card = ({ text }: { text: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [opacity, setOpacity] = useState(0);
  const [zIndex, setZIndex] = useState(0);

  useAnimationFrame(() => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const center = window.innerWidth / 2;
    const cardCenter = rect.left + rect.width / 2;
    
    const distance = Math.abs(center - cardCenter);
    const maxDist = window.innerWidth / 2.5; // Tighter flash window
    
    const normalizedDist = Math.min(distance / maxDist, 1);
    
    // Flash effect: item is only visible and scaled when very close to center
    // If normalizedDist is 0 (exact center), opacity is 1, scale is 1.15
    // If normalizedDist is > 0.6, opacity hits 0 quickly (shown and gone)
    const newScale = 0.8 + (0.35 * (1 - normalizedDist));
    
    let newOpacity = 0;
    if (normalizedDist < 0.7) {
      newOpacity = 1 - (normalizedDist * 1.4);
    }
    
    setScale(newScale);
    setOpacity(Math.max(0, newOpacity));
    setZIndex(normalizedDist < 0.2 ? 10 : 0);
  });

  return (
    <div 
      ref={cardRef} 
      className="flex-shrink-0 w-[220px] md:w-[300px] h-[90px] md:h-[120px] mx-6 md:mx-12 flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-[#050505] transition-shadow will-change-transform"
      style={{ 
        transform: `scale(${scale})`, 
        opacity: opacity,
        zIndex: zIndex,
        boxShadow: opacity > 0.8 ? '0 0 40px rgba(201,168,76,0.2)' : 'none',
        borderColor: opacity > 0.8 ? 'rgba(201,168,76,0.6)' : 'rgba(255,255,255,0.05)'
      }}
    >
       <Scissors size={20} className="text-gold mb-2" aria-hidden="true" style={{ opacity: opacity > 0.8 ? 1 : 0.2 }} />
       <span className="text-warm-white font-accent text-lg md:text-2xl uppercase tracking-[0.15em] text-center px-4 leading-tight">
         {text}
       </span>
    </div>
  );
};

export default function CategoryMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);

  useAnimationFrame(() => {
    if (!trackRef.current) return;
    
    // Adjust speed here (higher = faster)
    const speed = window.innerWidth < 768 ? 1.0 : 1.5; 
    x.current -= speed; 
    
    // Reset loop seamlessly when halfway through the doubled array
    if (x.current <= -(trackRef.current.scrollWidth / 2)) {
      x.current = 0;
    }
    
    trackRef.current.style.transform = `translateX(${x.current}px)`;
  });

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#050505] overflow-hidden">
      
      {/* Edge Gradients for smooth fading */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none" />
      
      <div className="text-center mb-12 relative z-30">
        <span className="text-gold font-accent text-sm tracking-[0.3em] uppercase">Signature Services</span>
      </div>

      <div className="relative flex items-center justify-center">
        {/* The scrolling track */}
        <div ref={trackRef} className="flex whitespace-nowrap will-change-transform items-center min-w-max">
          {TRACK_ITEMS.map((item, i) => (
            <Card key={`${item}-${i}`} text={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
