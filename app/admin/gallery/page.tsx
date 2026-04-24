"use client";

import { useState } from "react";
import { Upload, Image as ImageIcon, Tag, Hash } from "lucide-react";

export default function AdminGalleryPage() {
  const [formData, setFormData] = useState({
    url: "",
    tag: "",
    order: "0",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          order: parseInt(formData.order),
        }),
      });
      if (res.ok) {
        alert("Image added to gallery!");
        setFormData({ url: "", tag: "", order: "0" });
      }
    } catch (error) {
      console.error("Error adding to gallery:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black-primary text-warm-white p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex items-center gap-4">
          <ImageIcon className="text-gold" size={40} />
          <h1 className="text-5xl font-accent text-gold uppercase">Gallery Management</h1>
        </div>

        <form onSubmit={handleSubmit} className="glass p-10 rounded-2xl border border-gold/20 space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
              <Upload size={14} /> Image URL
            </label>
            <input
              required
              placeholder="https://images.setmore.com/..."
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
                <Tag size={14} /> Tag / Service Type
              </label>
              <input
                placeholder="e.g. Skin Fade"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
                <Hash size={14} /> Display Order
              </label>
              <input
                type="number"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-gold text-black font-accent text-2xl uppercase rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Add to Gallery
          </button>
        </form>
      </div>
    </div>
  );
}
