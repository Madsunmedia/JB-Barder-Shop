"use client";

import { useState } from "react";
import { UserPlus, Image as ImageIcon, Briefcase, Award, AlignLeft } from "lucide-react";

export default function AdminTeamPage() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    image: "",
    specialties: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/barbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          specialties: formData.specialties.split(",").map(s => s.trim()),
        }),
      });
      if (res.ok) {
        alert("Barber added successfully!");
        setFormData({ name: "", title: "", bio: "", image: "", specialties: "" });
      }
    } catch (error) {
      console.error("Error adding barber:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black-primary text-warm-white p-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex items-center gap-4">
          <UserPlus className="text-gold" size={40} />
          <h1 className="text-5xl font-accent text-gold uppercase">Add Team Member</h1>
        </div>

        <form onSubmit={handleSubmit} className="glass p-10 rounded-2xl border border-gold/20 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
                <UserPlus size={14} /> Full Name
              </label>
              <input
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
                <Briefcase size={14} /> Professional Title
              </label>
              <input
                required
                placeholder="e.g. Senior Barber"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
              <ImageIcon size={14} /> Image URL
            </label>
            <input
              required
              placeholder="https://..."
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
              <Award size={14} /> Specialties (comma separated)
            </label>
            <input
              required
              placeholder="Skin Fades, Beard Trims, Facials"
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
              value={formData.specialties}
              onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
              <AlignLeft size={14} /> Biography
            </label>
            <textarea
              required
              rows={4}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-gold text-black font-accent text-2xl uppercase rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Add Barber to Team
          </button>
        </form>
      </div>
    </div>
  );
}
