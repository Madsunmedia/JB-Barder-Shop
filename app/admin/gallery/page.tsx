"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Trash2, 
  Tag, 
  Search,
  Filter
} from "lucide-react";
import Image from "next/image";

export default function GalleryAdminPage() {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-3xl font-accent text-gold uppercase tracking-tighter">Gallery Management</h2>
            <p className="text-warm-white/40 text-xs font-mono mt-2">Upload and organize your best work.</p>
         </div>
      </div>

      {/* Upload Zone */}
      <div 
        className={`relative h-64 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 group cursor-pointer ${dragActive ? "border-gold bg-gold/5" : "border-white/10 hover:border-gold/40 hover:bg-white/[0.02]"}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
      >
         <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
            <Upload size={28} />
         </div>
         <div className="text-center">
            <p className="text-sm font-accent text-warm-white uppercase tracking-[0.2em] mb-1">Drag & Drop Images</p>
            <p className="text-[10px] font-mono text-warm-white/20 uppercase tracking-widest">or click to browse (Max 5MB)</p>
         </div>
         <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" />
      </div>

      {/* Grid Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-4 border-y border-white/5">
         <div className="flex items-center gap-8">
            <button className="text-[10px] font-accent text-gold uppercase tracking-widest border-b border-gold pb-1">All Work (24)</button>
            <button className="text-[10px] font-accent text-warm-white/20 hover:text-warm-white/60 uppercase tracking-widest transition-colors pb-1">Haircuts</button>
            <button className="text-[10px] font-accent text-warm-white/20 hover:text-warm-white/60 uppercase tracking-widest transition-colors pb-1">Beard</button>
            <button className="text-[10px] font-accent text-warm-white/20 hover:text-warm-white/60 uppercase tracking-widest transition-colors pb-1">Grooming</button>
         </div>
         <div className="flex items-center gap-4">
            <div className="relative">
               <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-white/20" />
               <input placeholder="SEARCH TAGS..." className="bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-[8px] font-accent uppercase tracking-widest outline-none focus:border-gold transition-all" />
            </div>
            <button className="p-2 text-warm-white/20 hover:text-gold"><Filter size={18} /></button>
         </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         <GalleryItem url="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800" tag="Skin Fade" />
         <GalleryItem url="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800" tag="Beard Trim" />
         <GalleryItem url="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800" tag="Regular Cut" />
         <GalleryItem url="https://images.unsplash.com/photo-1512690196252-71868a18329b?w=800" tag="Facial" />
         <GalleryItem url="https://images.unsplash.com/photo-1593702295094-ada74bc4a169?w=800" tag="Classic Cut" />
         <GalleryItem url="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800" tag="Skin Fade" />
      </div>

    </div>
  );
}

function GalleryItem({ url, tag }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02]"
    >
       <Image 
         src={url} 
         alt="Gallery" 
         fill
         className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
       />
       
       {/* Overlays */}
       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
       
       <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md text-white hover:bg-red-500 transition-colors flex items-center justify-center">
             <Trash2 size={14} />
          </button>
       </div>

       <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
             <Tag size={10} className="text-gold" />
             <span className="text-[8px] font-accent text-gold uppercase tracking-[0.2em]">{tag}</span>
          </div>
          <button className="w-full py-2 bg-white/10 backdrop-blur-md text-[8px] font-accent uppercase tracking-widest text-white border border-white/10 hover:bg-gold hover:text-black transition-all">
             Edit Tags
          </button>
       </div>
    </motion.div>
  );
}
