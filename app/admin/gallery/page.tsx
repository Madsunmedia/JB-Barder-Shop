"use client";

import { useState, useRef, useTransition, useEffect } from "react";
import Image from "next/image";
import {
  Upload, X, Pencil, Trash2, Check, Loader2,
  Link as LinkIcon, Image as ImageIcon, Plus
} from "lucide-react";
import { getAllMedia, createMediaItem, updateMediaItem, deleteMediaItem } from "@/app/actions/media";
import { SECTIONS } from "@/lib/media-sections";

export default function GalleryAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("gallery");
  const [isPending, startTransition] = useTransition();
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // URL paste mode state
  const [showUrlForm, setShowUrlForm] = useState(false);
  const [pastedUrl, setPastedUrl] = useState("");
  const [urlTitle, setUrlTitle] = useState("");
  const [urlAlt, setUrlAlt] = useState("");
  const [urlSection, setUrlSection] = useState("gallery");

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAlt, setEditAlt] = useState("");
  const [editSection, setEditSection] = useState("gallery");

  useEffect(() => {
    startTransition(async () => {
      const res = await getAllMedia();
      if (res.success) setItems(res.items || []);
    });
  }, []);

  const filteredItems = items.filter((item) => item.section === activeSection);

  // --- File Upload ---
  const handleFiles = async (files: FileList) => {
    setUploadError("");
    setUploading(true);
    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) {
        setUploadError(`${file.name} is not an image.`);
        continue;
      }
      const form = new FormData();
      form.append("file", file);
      form.append("section", activeSection);

      const res = await fetch("/api/media/upload", { method: "POST", body: form });
      const data = await res.json();

      if (res.ok && data.item) {
        setItems((prev) => [data.item, ...prev]);
      } else {
        setUploadError(data.error || "Upload failed.");
      }
    }
    setUploading(false);
  };

  // --- URL Paste Add ---
  const handleAddUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedUrl.trim()) return;
    startTransition(async () => {
      const res = await createMediaItem({
        url: pastedUrl.trim(),
        title: urlTitle,
        altText: urlAlt,
        section: urlSection,
      });
      if (res.success && res.item) {
        setItems((prev) => [res.item, ...prev]);
        setPastedUrl("");
        setUrlTitle("");
        setUrlAlt("");
        setShowUrlForm(false);
        setUrlSection(activeSection);
      }
    });
  };

  // --- Edit ---
  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditTitle(item.title || "");
    setEditAlt(item.altText || "");
    setEditSection(item.section);
  };

  const handleSaveEdit = (id: string) => {
    startTransition(async () => {
      const res = await updateMediaItem(id, {
        title: editTitle,
        altText: editAlt,
        section: editSection,
      });
      if (res.success && res.item) {
        setItems((prev) => prev.map((i) => (i.id === id ? res.item : i)));
        setEditingId(null);
      }
    });
  };

  // --- Delete ---
  const handleDelete = async (item: any) => {
    if (!confirm("Delete this image?")) return;
    const res = await fetch("/api/media/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, publicId: item.publicId }),
    });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }
  };

  const cloudinaryEnabled = true; // UI hint only — actual check is on server

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-accent text-gold uppercase tracking-widest">Media Library</h2>
          <p className="text-warm-white/40 text-xs font-mono mt-1">{items.length} images total</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setShowUrlForm(!showUrlForm); setUrlSection(activeSection); }}
            className="flex items-center gap-2 px-4 py-2.5 border border-white/10 text-warm-white/60 font-accent text-xs uppercase tracking-widest rounded-full hover:border-gold/40 hover:text-gold transition-all"
          >
            <LinkIcon size={14} /> Add by URL
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-accent text-xs uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-60"
          >
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            Upload Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </div>
      </div>

      {/* Cloudinary Notice */}
      {uploadError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-body flex items-start gap-2">
          <X size={14} className="shrink-0 mt-0.5" />
          {uploadError}
          {uploadError.includes("Cloudinary") && (
            <span className="ml-1">
              Until then, use <strong>Add by URL</strong> to manage images for free.
            </span>
          )}
        </div>
      )}

      {/* URL Form */}
      {showUrlForm && (
        <form onSubmit={handleAddUrl} className="glass p-6 rounded-2xl border border-gold/20 space-y-4">
          <h3 className="font-accent text-warm-white uppercase tracking-widest text-sm">Add Image by URL</h3>
          <input
            required
            type="url"
            placeholder="https://example.com/image.jpg"
            value={pastedUrl}
            onChange={(e) => setPastedUrl(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-5 text-warm-white text-sm outline-none focus:border-gold transition-colors min-h-[48px]"
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              placeholder="Title (optional)"
              value={urlTitle}
              onChange={(e) => setUrlTitle(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-warm-white text-sm outline-none focus:border-gold"
            />
            <input
              placeholder="Alt text (optional)"
              value={urlAlt}
              onChange={(e) => setUrlAlt(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-warm-white text-sm outline-none focus:border-gold"
            />
            <select
              value={urlSection}
              onChange={(e) => setUrlSection(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl py-3.5 px-5 text-warm-white text-sm outline-none focus:border-gold appearance-none min-h-[48px]"
            >
              {SECTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowUrlForm(false)} className="w-full sm:w-auto py-3 px-6 text-xs font-accent text-warm-white/40 uppercase tracking-widest hover:text-warm-white transition-colors">Cancel</button>
            <button type="submit" disabled={isPending} className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gold text-black font-accent text-xs uppercase tracking-widest rounded-xl sm:rounded-full hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 min-h-[48px]">
              {isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add Image
            </button>
          </div>
        </form>
      )}

      {/* Drop Zone */}
      <div
        className={`h-32 rounded-2xl border-2 border-dashed flex items-center justify-center gap-4 cursor-pointer transition-all ${
          isDragging ? "border-gold bg-gold/5" : "border-white/10 hover:border-gold/30"
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); e.dataTransfer.files && handleFiles(e.dataTransfer.files); }}
        onClick={() => fileInputRef.current?.click()}
      >
        {uploading ? (
          <><Loader2 size={24} className="text-gold animate-spin" /><p className="text-sm font-accent text-gold uppercase tracking-widest">Uploading...</p></>
        ) : (
          <><ImageIcon size={24} className="text-warm-white/20" /><p className="text-sm font-accent text-warm-white/40 uppercase tracking-widest">Drop images here or click to upload</p></>
        )}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap border-b border-white/5 pb-4">
        {SECTIONS.map((s) => {
          const count = items.filter((i) => i.section === s.value).length;
          return (
            <button
              key={s.value}
              onClick={() => setActiveSection(s.value)}
              className={`px-4 py-2 rounded-full text-xs font-accent uppercase tracking-widest border transition-all ${
                activeSection === s.value
                  ? "bg-gold text-black border-gold"
                  : "border-white/10 text-warm-white/40 hover:border-white/20 hover:text-warm-white/70"
              }`}
            >
              {s.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Image Grid */}
      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 glass rounded-3xl border border-white/5 border-dashed">
          <ImageIcon size={48} className="text-warm-white/10 mb-4" />
          <p className="font-accent text-warm-white/20 uppercase tracking-widest">No images in this section</p>
          <p className="text-xs text-warm-white/10 mt-1">Upload an image or add by URL to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-all">
              <Image
                src={item.url}
                alt={item.altText || item.title || "Media"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="w-8 h-8 rounded-lg bg-black/60 text-warm-white hover:text-gold hover:bg-black/80 flex items-center justify-center transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="w-8 h-8 rounded-lg bg-black/60 text-warm-white hover:text-red-500 hover:bg-black/80 flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div>
                  {item.title && <p className="text-xs font-accent text-gold uppercase tracking-wide truncate">{item.title}</p>}
                  {item.altText && <p className="text-[10px] text-warm-white/60 truncate">{item.altText}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingId(null)} />
          <div className="relative w-full max-w-md glass border border-gold/20 rounded-3xl p-5 md:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar-mobile">
            <div className="flex items-center justify-between">
              <h3 className="font-accent text-gold uppercase tracking-widest">Edit Image</h3>
              <button onClick={() => setEditingId(null)} className="text-warm-white/40 hover:text-white transition-colors"><X size={18} /></button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Title</label>
                <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-warm-white text-sm outline-none focus:border-gold" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Alt Text</label>
                <input value={editAlt} onChange={(e) => setEditAlt(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-warm-white text-sm outline-none focus:border-gold" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Section</label>
                <select value={editSection} onChange={(e) => setEditSection(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-warm-white text-sm outline-none focus:border-gold">
                  {SECTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setEditingId(null)} className="px-4 py-2 text-xs font-accent text-warm-white/40 uppercase tracking-widest">Cancel</button>
              <button
                disabled={isPending}
                onClick={() => handleSaveEdit(editingId)}
                className="flex items-center gap-2 px-6 py-2.5 bg-gold text-black font-accent text-xs uppercase tracking-widest rounded-full hover:scale-105 transition-all disabled:opacity-60"
              >
                {isPending ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />} Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
