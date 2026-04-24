"use client";

import { motion } from "framer-motion";
import { Scissors, User, Calendar, Clock, MapPin } from "lucide-react";

export default function BookingSummary({ data, step }: any) {
  return (
    <div className="glass p-8 rounded-3xl border border-gold/20 space-y-8 shadow-2xl">
      <h3 className="text-2xl font-accent text-gold uppercase border-b border-gold/10 pb-4 tracking-widest">
        Booking Summary
      </h3>

      <div className="space-y-6">
        <SummaryItem 
          icon={<Scissors size={18} />} 
          label="Service" 
          value={data.service?.name} 
          active={step >= 0 && !!data.service}
        />
        <SummaryItem 
          icon={<User size={18} />} 
          label="Barber" 
          value={data.barber?.name} 
          active={step >= 1 && !!data.barber}
        />
        <SummaryItem 
          icon={<Calendar size={18} />} 
          label="Date" 
          value={data.date?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} 
          active={step >= 2 && !!data.date}
        />
        <SummaryItem 
          icon={<Clock size={18} />} 
          label="Time" 
          value={data.time} 
          active={step >= 2 && !!data.time}
        />
      </div>

      <div className="pt-6 border-t border-gold/10 space-y-4">
        <div className="flex items-center gap-3 text-warm-white/40">
           <MapPin size={16} />
           <span className="text-xs font-mono uppercase">Lethbridge, Alberta</span>
        </div>
        
        {data.service && (
          <div className="flex justify-between items-center">
            <span className="text-warm-white/60 font-body">Total Amount</span>
            <span className="text-3xl font-accent text-gold">${data.service.price}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryItem({ icon, label, value, active }: any) {
  return (
    <div className={`flex items-start gap-4 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-20"}`}>
      <div className="mt-1 text-gold">{icon}</div>
      <div>
        <p className="text-[10px] font-accent text-gold/50 uppercase tracking-widest">{label}</p>
        <p className="text-warm-white font-body text-lg">{value || "—"}</p>
      </div>
    </div>
  );
}
