"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Scissors,
  Clock,
  DollarSign,
  Trash2,
  Pencil,
  X,
  Tag,
} from "lucide-react";
import { addService, updateService, deleteService } from "@/app/actions/services";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  image: string | null;
}

const CATEGORIES = ["haircut", "beard", "shave", "kids", "grooming"];

const categoryColors: Record<string, string> = {
  haircut: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  beard: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  shave: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  kids: "text-green-400 bg-green-400/10 border-green-400/20",
  grooming: "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

const emptyForm = { name: "", description: "", price: "", duration: "", category: "haircut", image: "" };

export default function ServicesManager({ initialServices }: { initialServices: Service[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCat, setFilterCat] = useState("all");
  const [formData, setFormData] = useState(emptyForm);
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (s: Service) => {
    setFormData({
      name: s.name,
      description: s.description,
      price: String(s.price),
      duration: String(s.duration),
      category: s.category,
      image: s.image ?? "",
    });
    setEditingId(s.id);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      category: formData.category,
      image: formData.image || null,
    };
    startTransition(async () => {
      const res = editingId ? await updateService(editingId, data as any) : await addService(data as any);
      if (res.success) {
        showToast(editingId ? "Service updated!" : "Service added!");
        resetForm();
      } else {
        showToast("Error: " + res.error);
      }
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const res = await deleteService(id);
      if (res.success) showToast("Service deleted.");
    });
  };

  const visibleServices = filterCat === "all"
    ? initialServices
    : initialServices.filter((s) => s.category === filterCat);

  return (
    <div className="space-y-8">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[200] px-6 py-3 glass border border-gold/30 text-gold font-accent text-sm uppercase tracking-widest rounded-2xl shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-accent text-gold uppercase tracking-tighter">Manage Services</h2>
          <p className="text-warm-white/40 text-[10px] md:text-xs font-mono mt-1 md:mt-2">
            {initialServices.length} services · Configure menu, pricing &amp; timing
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 md:py-3 bg-gold text-black rounded-xl text-[11px] md:text-[10px] font-accent uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_20px_rgba(201,168,76,0.2)]"
        >
          <Plus size={16} /> Add New Service
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-2 -mx-2 px-2 custom-scrollbar-mobile">
        {["all", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            className={`flex-shrink-0 px-4 py-2 md:py-1.5 rounded-full text-[10px] font-accent uppercase tracking-widest border transition-all ${
              filterCat === cat
                ? "bg-gold text-black border-gold"
                : "bg-white/5 border-white/10 text-warm-white/50 hover:border-gold/30 hover:text-gold active:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Table */}
      <div className={`glass rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden transition-opacity ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
        <div className="w-full overflow-x-auto scrollbar-none custom-scrollbar-mobile">
          <div className="min-w-[600px]">
            <table className="w-full text-left">
              <thead className="bg-white/[0.02] text-[9px] md:text-[10px] font-accent uppercase text-warm-white/40 tracking-[0.2em]">
                <tr>
                  <th className="px-5 py-3 md:px-6 md:py-4 whitespace-nowrap">Service</th>
                  <th className="px-5 py-3 md:px-6 md:py-4 whitespace-nowrap">Category</th>
                  <th className="px-5 py-3 md:px-6 md:py-4 whitespace-nowrap">Price</th>
                  <th className="px-5 py-3 md:px-6 md:py-4 whitespace-nowrap">Duration</th>
                  <th className="px-5 py-3 md:px-6 md:py-4 whitespace-nowrap text-right pr-5 md:pr-8">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {visibleServices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 md:py-16 text-center text-warm-white/20 font-accent uppercase tracking-widest text-xs">
                      No services in this category
                    </td>
                  </tr>
              ) : (
                visibleServices.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.015] transition-colors group">
                    <td className="px-5 py-4 md:px-6 md:py-5">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gold/5 border border-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                          <Scissors size={14} className="md:w-4 md:h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs md:text-sm font-accent text-warm-white uppercase tracking-wider truncate">{s.name}</p>
                          <p className="text-[9px] md:text-[10px] text-warm-white/30 font-body mt-0.5 max-w-[200px] md:max-w-xs truncate">{s.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 md:px-6 md:py-5 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[8px] md:text-[9px] font-mono uppercase border ${categoryColors[s.category] ?? "text-warm-white/40 bg-white/5 border-white/10"}`}>
                        {s.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 md:px-6 md:py-5 whitespace-nowrap">
                      <span className="text-gold font-accent text-sm">${s.price.toFixed(2)}</span>
                    </td>
                    <td className="px-5 py-4 md:px-6 md:py-5 whitespace-nowrap">
                      <span className="text-[9px] md:text-[10px] font-mono text-warm-white/40">{s.duration} min</span>
                    </td>
                    <td className="px-5 py-4 md:px-6 md:py-5 text-right pr-5 md:pr-8 whitespace-nowrap">
                      {/* Actions visible on mobile by default (md:opacity-0 group-hover:opacity-100 for desktop) */}
                      <div className="flex justify-end gap-1 md:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(s)}
                          className="p-2 md:p-2 rounded-lg text-warm-white/40 hover:text-gold hover:bg-gold/10 active:bg-gold/20 transition-all"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.name)}
                          className="p-2 md:p-2 rounded-lg text-warm-white/40 hover:text-red-400 hover:bg-red-500/10 active:bg-red-500/20 transition-all"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
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
              className="relative w-full max-w-2xl glass p-6 md:p-10 rounded-3xl md:rounded-[2rem] border border-gold/20 overflow-y-auto max-h-[90vh]"
            >
              <button onClick={resetForm} className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-warm-white/40 hover:text-gold hover:bg-white/10 transition-colors">
                <X size={18} />
              </button>

              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 pr-10">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl md:rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20 flex-shrink-0">
                  {editingId ? <Pencil size={16} /> : <Plus size={16} />}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xl md:text-2xl font-accent text-gold uppercase tracking-tight truncate">
                    {editingId ? "Edit Service" : "Add Service"}
                  </h3>
                  <p className="text-[9px] md:text-[10px] text-warm-white/30 font-mono uppercase tracking-widest mt-0.5 truncate">
                    {editingId ? "Update details below" : "Fill in service details"}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest flex items-center gap-1.5"><Scissors size={11} /> Service Name</label>
                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-warm-white focus:border-gold outline-none transition-colors" placeholder="e.g. Classic Skin Fade" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest flex items-center gap-1.5"><DollarSign size={11} /> Price ($)</label>
                    <input required type="number" min="0" step="0.01" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-warm-white focus:border-gold outline-none transition-colors" placeholder="30" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest flex items-center gap-1.5"><Clock size={11} /> Duration (minutes)</label>
                    <input required type="number" min="5" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-warm-white focus:border-gold outline-none transition-colors" placeholder="30" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest flex items-center gap-1.5"><Tag size={11} /> Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-warm-white focus:border-gold outline-none transition-colors appearance-none">
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Image URL (optional)</label>
                    <input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-warm-white focus:border-gold outline-none transition-colors" placeholder="https://..." />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Description</label>
                    <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm text-warm-white focus:border-gold outline-none transition-colors" placeholder="Short service description..." />
                  </div>
                </div>

                <button type="submit" disabled={isPending}
                  className="w-full py-4 bg-gold text-black font-accent text-base uppercase rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50">
                  {isPending ? "Saving..." : editingId ? "Save Changes" : "Add Service"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
