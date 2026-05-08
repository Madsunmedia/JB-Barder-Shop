"use client";

import { motion } from "framer-motion";
import { Scissors, User, Calendar, Clock, MapPin } from "lucide-react";

export default function BookingSummary({ data, step }: any) {
  const services: any[] = data.services ?? [];
  const totalPrice = services.reduce((sum: number, s: any) => sum + (s.price ?? 0), 0);
  const totalMins = services.reduce((sum: number, s: any) => {
    const n = parseInt(s.duration ?? "0");
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  return (
    <div className="glass p-6 md:p-8 rounded-3xl border border-gold/20 space-y-6 md:space-y-8 shadow-2xl">
      <h3 className="text-xl md:text-2xl font-accent text-gold uppercase border-b border-gold/10 pb-4 tracking-widest">
        Booking Summary
      </h3>

      <div className="space-y-5 md:space-y-6">
        {/* Services list */}
        <div className={`flex items-start gap-4 transition-opacity duration-500 ${step >= 0 && services.length > 0 ? "opacity-100" : "opacity-20"}`}>
          <div className="mt-1 text-gold flex-shrink-0">
            <Scissors size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-accent text-gold/50 uppercase tracking-widest mb-1">
              {services.length > 1 ? `Services (${services.length})` : "Service"}
            </p>
            {services.length === 0 ? (
              <p className="text-warm-white font-body text-base">—</p>
            ) : (
              <ul className="space-y-1">
                {services.map((s: any) => (
                  <li key={s.id} className="flex items-center justify-between gap-2">
                    <span className="text-warm-white font-body text-sm leading-snug truncate">{s.name}</span>
                    <span className="text-gold/70 font-mono text-xs flex-shrink-0">${s.price}</span>
                  </li>
                ))}
              </ul>
            )}
            {services.length > 0 && (
              <p className="text-[10px] text-warm-white/30 font-mono mt-1.5">~{totalMins} mins total</p>
            )}
          </div>
        </div>

        <SummaryItem
          icon={<User size={18} />}
          label="Barber"
          value={data.barber?.name}
          active={step >= 1 && !!data.barber}
        />
        <SummaryItem
          icon={<Calendar size={18} />}
          label="Date"
          value={data.date?.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
          active={step >= 2 && !!data.date}
        />
        <SummaryItem
          icon={<Clock size={18} />}
          label="Time"
          value={data.time}
          active={step >= 2 && !!data.time}
        />
      </div>

      <div className="pt-4 md:pt-6 border-t border-gold/10 space-y-3 md:space-y-4">
        <div className="flex items-center gap-3 text-warm-white/40">
          <MapPin size={16} />
          <span className="text-xs font-mono uppercase">Lethbridge, Alberta</span>
        </div>

        {services.length > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-warm-white/60 font-body text-sm">Total Amount</span>
            <span className="text-2xl md:text-3xl font-accent text-gold">${totalPrice}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryItem({ icon, label, value, active }: any) {
  return (
    <div
      className={`flex items-start gap-4 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-20"}`}
    >
      <div className="mt-1 text-gold">{icon}</div>
      <div>
        <p className="text-[10px] font-accent text-gold/50 uppercase tracking-widest">{label}</p>
        <p className="text-warm-white font-body text-lg">{value || "—"}</p>
      </div>
    </div>
  );
}
