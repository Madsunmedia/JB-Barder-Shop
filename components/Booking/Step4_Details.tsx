"use client";

import { useState } from "react";
import { User, Phone, Mail, FileText, ShieldCheck, Loader2 } from "lucide-react";

export default function Step4_Details({ data, onChange, onConfirm, onBack }: any) {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setErrorMsg("Please agree to the cancellation policy.");
      return;
    }
    
    setErrorMsg("");
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
      } else {
        setErrorMsg("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setErrorMsg("A network error occurred. Please call us to book.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 md:space-y-10">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-3xl sm:text-4xl font-accent text-gold uppercase tracking-widest">Your Details</h2>
        <p className="text-warm-white/60 text-sm sm:text-base">Almost there. We just need a few details to finalize your spot.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-accent text-warm-white/60 uppercase tracking-widest flex items-center gap-2 pl-1">
              <User size={14} className="text-gold" /> Full Name <span className="text-gold">*</span>
            </label>
            <input
              required
              placeholder="John Doe"
              className="w-full min-h-[52px] bg-black/40 border border-white/10 rounded-xl px-5 text-warm-white placeholder:text-white/20 focus:border-gold focus:bg-white/[0.02] outline-none transition-all"
              value={data.details.name}
              onChange={(e) => onChange({ ...data.details, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-accent text-warm-white/60 uppercase tracking-widest flex items-center gap-2 pl-1">
              <Phone size={14} className="text-gold" /> Phone Number <span className="text-gold">*</span>
            </label>
            <input
              required
              type="tel"
              placeholder="(403) 929-7321"
              className="w-full min-h-[52px] bg-black/40 border border-white/10 rounded-xl px-5 text-warm-white placeholder:text-white/20 focus:border-gold focus:bg-white/[0.02] outline-none transition-all"
              value={data.details.phone}
              onChange={(e) => onChange({ ...data.details, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-accent text-warm-white/60 uppercase tracking-widest flex items-center gap-2 pl-1">
            <Mail size={14} className="text-gold" /> Email Address <span className="text-gold">*</span>
          </label>
          <input
            required
            type="email"
            placeholder="john@example.com"
            className="w-full min-h-[52px] bg-black/40 border border-white/10 rounded-xl px-5 text-warm-white placeholder:text-white/20 focus:border-gold focus:bg-white/[0.02] outline-none transition-all"
            value={data.details.email}
            onChange={(e) => onChange({ ...data.details, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-accent text-warm-white/60 uppercase tracking-widest flex items-center gap-2 pl-1">
            <FileText size={14} className="text-gold" /> Special Requests (Optional)
          </label>
          <textarea
            rows={3}
            placeholder="Any specific requests for your barber?"
            className="w-full min-h-[100px] bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-warm-white placeholder:text-white/20 focus:border-gold focus:bg-white/[0.02] outline-none transition-all resize-y"
            value={data.details.notes}
            onChange={(e) => onChange({ ...data.details, notes: e.target.value })}
          />
        </div>

        <div 
          className="flex items-start gap-4 p-5 sm:p-6 bg-white/[0.02] rounded-2xl border border-white/10 group cursor-pointer hover:border-gold/30 transition-all" 
          onClick={() => {
            setAgreed(!agreed);
            if (errorMsg === "Please agree to the cancellation policy.") setErrorMsg("");
          }}
        >
          <div className={`mt-0.5 shrink-0 w-6 h-6 rounded border transition-all flex items-center justify-center ${agreed ? "bg-gold border-gold" : "border-white/30 group-hover:border-gold/50"}`}>
            {agreed && <ShieldCheck size={16} className="text-black" />}
          </div>
          <p className="text-sm text-warm-white/70 leading-relaxed select-none">
            I agree to the <span className="text-gold underline">cancellation policy</span>. I understand that appointments must be cancelled at least 24 hours in advance.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 pt-6 sm:pt-8">
          <button 
            type="button" 
            onClick={onBack} 
            className="w-full sm:w-auto min-h-[56px] px-8 py-3 border border-white/10 text-warm-white/70 font-accent text-lg uppercase rounded-full hover:border-gold/50 hover:text-gold transition-all"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!agreed || isSubmitting}
            className="w-full sm:w-auto min-h-[56px] px-10 py-3 bg-gold text-black font-accent text-xl uppercase rounded-full shadow-[0_4px_20px_rgba(201,168,76,0.15)] disabled:opacity-50 disabled:pointer-events-none hover:shadow-[0_4px_30px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <><Loader2 size={20} className="animate-spin" /> Finalizing...</>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
