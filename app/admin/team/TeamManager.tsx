"use client";

import { useState, useTransition } from "react";
import { 
  UserPlus, 
  Image as ImageIcon, 
  Briefcase, 
  Award, 
  AlignLeft, 
  Pencil, 
  Trash2, 
  X,
  Plus
} from "lucide-react";
import { addBarber, updateBarber, deleteBarber } from "@/app/actions/team";
import { motion, AnimatePresence } from "framer-motion";

interface Barber {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
}

export default function TeamManager({ initialTeam }: { initialTeam: Barber[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    image: "",
    specialties: "",
  });

  const resetForm = () => {
    setFormData({ name: "", title: "", bio: "", image: "", specialties: "" });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (barber: Barber) => {
    setFormData({
      name: barber.name,
      title: barber.title,
      bio: barber.bio,
      image: barber.image,
      specialties: barber.specialties.join(", "),
    });
    setEditingId(barber.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      specialties: formData.specialties.split(",").map(s => s.trim()).filter(s => s !== ""),
    };

    startTransition(async () => {
      let res;
      if (editingId) {
        res = await updateBarber(editingId, data);
      } else {
        res = await addBarber(data);
      }

      if (res.success) {
        resetForm();
      } else {
        alert("Operation failed: " + res.error);
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    startTransition(async () => {
      await deleteBarber(id);
    });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-accent text-gold uppercase tracking-tighter">Team Management</h2>
          <p className="text-warm-white/40 text-xs font-mono mt-2">Manage your barbers and their profiles.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gold text-black rounded-xl text-[10px] font-accent uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_20px_rgba(201,168,76,0.2)]"
        >
          <Plus size={16} /> Add Barber
        </button>
      </div>

      {/* Team Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity ${isPending ? "opacity-50" : ""}`}>
        {initialTeam.map((barber) => (
          <motion.div 
            key={barber.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl border border-white/5 overflow-hidden group hover:border-gold/30 transition-all flex flex-col"
          >
            <div className="aspect-[4/5] relative overflow-hidden bg-white/5">
               {barber.image ? (
                 <img src={barber.image} alt={barber.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center">
                    <UserPlus size={40} className="text-white/10" />
                 </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 gap-2">
                  <button 
                    onClick={() => handleEdit(barber)}
                    className="flex-1 bg-white text-black py-2.5 rounded-lg text-[10px] font-accent uppercase tracking-widest hover:bg-gold transition-colors flex items-center justify-center gap-2"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(barber.id)}
                    className="flex-1 bg-red-600 text-white py-2.5 rounded-lg text-[10px] font-accent uppercase tracking-widest hover:bg-red-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
               </div>
            </div>
            <div className="p-6 space-y-4">
               <div>
                  <h4 className="text-lg font-accent text-warm-white uppercase tracking-wider leading-tight">{barber.name}</h4>
                  <p className="text-[10px] font-mono text-gold uppercase tracking-widest mt-1">{barber.title}</p>
               </div>
               <p className="text-xs text-warm-white/40 line-clamp-2 leading-relaxed italic">&quot;{barber.bio}&quot;</p>
               <div className="flex flex-wrap gap-1.5">
                  {barber.specialties.map((s, i) => (
                    <span key={i} className="text-[8px] font-mono uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-warm-white/60">
                      {s}
                    </span>
                  ))}
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Form Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass p-8 md:p-12 rounded-[2rem] border border-gold/20 shadow-[0_0_50px_rgba(201,168,76,0.1)] overflow-y-auto max-h-full"
            >
              <button 
                onClick={resetForm}
                className="absolute top-6 right-6 text-warm-white/20 hover:text-gold transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                  {editingId ? <Pencil size={20} /> : <UserPlus size={20} />}
                </div>
                <div>
                  <h3 className="text-2xl font-accent text-gold uppercase tracking-tight">
                    {editingId ? "Edit Profile" : "Add Team Member"}
                  </h3>
                  <p className="text-xs text-warm-white/40 font-mono uppercase tracking-widest">
                    {editingId ? "Updating staff details" : "Building your dream team"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest flex items-center gap-2">
                      <UserPlus size={12} /> Full Name
                    </label>
                    <input
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-warm-white focus:border-gold outline-none transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={12} /> Professional Title
                    </label>
                    <input
                      required
                      placeholder="e.g. Master Barber"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-warm-white focus:border-gold outline-none transition-colors"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-accent text-gold uppercase tracking-widest flex items-center gap-2">
                    <ImageIcon size={12} /> Image URL
                  </label>
                  <input
                    required
                    placeholder="https://..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-warm-white focus:border-gold outline-none transition-colors"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-accent text-gold uppercase tracking-widest flex items-center gap-2">
                    <Award size={12} /> Specialties (comma separated)
                  </label>
                  <input
                    required
                    placeholder="Skin Fades, Beard Trims..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-warm-white focus:border-gold outline-none transition-colors"
                    value={formData.specialties}
                    onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-accent text-gold uppercase tracking-widest flex items-center gap-2">
                    <AlignLeft size={12} /> Biography
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-warm-white focus:border-gold outline-none transition-colors"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-4 bg-gold text-black font-accent text-xl uppercase rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {isPending ? "Processing..." : editingId ? "Save Changes" : "Add Barber to Team"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
