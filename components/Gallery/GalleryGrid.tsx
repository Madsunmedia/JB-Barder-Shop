"use client";

import { useState } from "react";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";

interface GalleryImage {
  id: string;
  url: string;
  tag?: string;
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
        {images.map((image, i) => (
          <GalleryCard 
            key={image.id} 
            image={image} 
            index={i} 
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      <Lightbox 
        images={images} 
        index={lightboxIndex} 
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
