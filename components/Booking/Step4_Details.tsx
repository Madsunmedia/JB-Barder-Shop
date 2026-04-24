"use client";

import { useState } from "react";
import { User, Phone, Mail, FileText, ShieldCheck } from "lucide-react";

export default function Step4_Details({ data, onChange, onConfirm, onBack }: any) {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: data.service.id,
          clientName: data.details.name,
          phone: data.details.phone,
          email: data.details.email,
          date: data.date.toISOString().split("T")[0],
          time: data.time,
        }),
      });
      if (res.ok) {
        onConfirm();
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-4xl font-accent text-gold uppercase tracking-widest">Your Details</h2>
        <p className="text-warm-white/60">Almost there. We just need a few details to finalize your spot.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
              <User size={14} /> Full Name
            </label>
            <input
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
              value={data.details.name}
              onChange={(e) => onChange({ ...data.details, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
              <Phone size={14} /> Phone Number
            </label>
            <input
              required
              placeholder="+1 (403) 000-0000"
              className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
              value={data.details.phone}
              onChange={(e) => onChange({ ...data.details, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
            <Mail size={14} /> Email Address
          </label>
          <input
            required
            type="email"
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
            value={data.details.email}
            onChange={(e) => onChange({ ...data.details, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-accent text-gold uppercase tracking-widest flex items-center gap-2">
            <FileText size={14} /> Special Requests (Optional)
          </label>
          <textarea
            rows={3}
            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors resize-none"
            value={data.details.notes}
            onChange={(e) => onChange({ ...data.details, notes: e.target.value })}
          />
        </div>

        <div className="flex items-start gap-4 p-6 glass rounded-2xl border border-white/10 group cursor-pointer" onClick={() => setAgreed(!agreed)}>
          <div className={`mt-1 w-6 h-6 rounded border transition-all flex items-center justify-center ${agreed ? "bg-gold border-gold" : "border-white/20 group-hover:border-gold/50"}`}>
            {agreed && <ShieldCheck size={16} className="text-black" />}
          </div>
          <p className="text-sm text-warm-white/60 leading-relaxed select-none">
            I agree to the <span className="text-gold underline">cancellation policy</span>. I understand that appointments must be cancelled at least 24 hours in advance.
          </p>
        </div>

        <div className="flex justify-between pt-8">
          <button type="button" onClick={onBack} className="px-8 py-4 border border-white/10 text-warm-white/50 font-accent uppercase rounded-full hover:text-gold transition-all">
            Back
          </button>
          <button
            disabled={!agreed || isSubmitting}
            className="px-16 py-5 bg-gold text-black font-accent text-2xl uppercase rounded-full shadow-[0_10px_30px_rgba(201,168,76,0.3)] disabled:opacity-30 hover:scale-105 transition-transform flex items-center gap-3"
          >
            {isSubmitting ? "Finalizing..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}
