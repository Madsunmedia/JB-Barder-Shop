"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Save,
  Calendar,
  AlertCircle,
  Plus,
  X
} from "lucide-react";

export default function SettingsAdminPage() {
  const [blockedDates, setBlockedDates] = useState(["2025-12-25", "2026-01-01"]);

  return (
    <div className="max-w-4xl space-y-12">
      
      {/* Business Identity */}
      <section className="space-y-8">
         <div className="flex items-center gap-4 text-gold">
            <ShieldCheck size={24} />
            <h3 className="text-xl font-accent uppercase tracking-widest">Business Identity</h3>
         </div>
         <div className="glass p-8 rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
               <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Barbershop Name</label>
               <input defaultValue="JB Barbershop" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white outline-none focus:border-gold transition-colors" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Public Phone</label>
               <input defaultValue="+1 403 929 7321" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white outline-none focus:border-gold transition-colors" />
            </div>
            <div className="space-y-2 md:col-span-2">
               <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Shop Address</label>
               <input defaultValue="410 13 Street North, Lethbridge, Alberta T1H 2S2" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white outline-none focus:border-gold transition-colors" />
            </div>
         </div>
      </section>

      {/* Business Hours */}
      <section className="space-y-8">
         <div className="flex items-center gap-4 text-gold">
            <Clock size={24} />
            <h3 className="text-xl font-accent uppercase tracking-widest">Shop Hours</h3>
         </div>
         <div className="glass p-8 rounded-3xl border border-white/5 space-y-4">
            <HoursRow day="Monday" open="09:00" close="20:00" />
            <HoursRow day="Tuesday" open="09:00" close="20:00" />
            <HoursRow day="Wednesday" open="09:00" close="20:00" />
            <HoursRow day="Thursday" open="09:00" close="20:00" />
            <HoursRow day="Friday" open="09:00" close="20:00" />
            <HoursRow day="Saturday" open="09:00" close="20:00" />
            <HoursRow day="Sunday" open="09:00" close="19:00" />
         </div>
      </section>

      {/* Booking Rules */}
      <section className="space-y-8">
         <div className="flex items-center gap-4 text-gold">
            <Calendar size={24} />
            <h3 className="text-xl font-accent uppercase tracking-widest">Booking Logic</h3>
         </div>
         <div className="glass p-8 rounded-3xl border border-white/5 space-y-8">
            <div className="flex items-center justify-between gap-12">
               <div className="flex-1">
                  <h4 className="text-sm font-accent text-warm-white uppercase tracking-wider mb-1">Minimum Notice</h4>
                  <p className="text-[10px] font-body text-warm-white/20 uppercase tracking-widest">How many hours in advance can customers book?</p>
               </div>
               <div className="flex items-center gap-3">
                  <input type="number" defaultValue={2} className="w-20 bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-center text-gold font-accent outline-none focus:border-gold transition-colors" />
                  <span className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Hours</span>
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="text-sm font-accent text-warm-white uppercase tracking-wider">Blocked Dates (Closures)</h4>
               <div className="flex flex-wrap gap-3">
                  {blockedDates.map(date => (
                    <div key={date} className="flex items-center gap-3 px-4 py-2 bg-gold/10 border border-gold/20 rounded-xl text-gold text-[10px] font-mono">
                       {date}
                       <button onClick={() => setBlockedDates(blockedDates.filter(d => d !== date))} className="hover:text-white transition-colors"><X size={14} /></button>
                    </div>
                  ))}
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-warm-white/40 text-[10px] font-accent uppercase tracking-widest hover:text-gold hover:border-gold/40 transition-all">
                     <Plus size={14} /> Add Date
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Save Button Floating */}
      <div className="flex justify-end pt-10">
         <button className="bg-gold text-black px-12 py-5 rounded-2xl font-accent text-lg uppercase tracking-widest shadow-[0_20px_50px_rgba(201,168,76,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
            <Save size={24} /> Save Global Changes
         </button>
      </div>

    </div>
  );
}

function HoursRow({ day, open, close }: any) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 group">
       <div className="w-32 text-xs font-accent text-warm-white uppercase tracking-widest group-hover:text-gold transition-colors">{day}</div>
       <div className="flex items-center gap-4">
          <input type="time" defaultValue={open} className="bg-transparent border-none text-[10px] font-mono text-warm-white/40 focus:text-gold outline-none" />
          <span className="text-[10px] font-mono text-warm-white/20">—</span>
          <input type="time" defaultValue={close} className="bg-transparent border-none text-[10px] font-mono text-warm-white/40 focus:text-gold outline-none" />
       </div>
       <div className="flex items-center gap-3">
          <span className="text-[8px] font-accent text-green-500 uppercase tracking-widest">Open</span>
          <div className="w-10 h-5 bg-gold/20 rounded-full relative p-1 cursor-pointer">
             <div className="absolute right-1 top-1 bottom-1 w-3 h-3 bg-gold rounded-full" />
          </div>
       </div>
    </div>
  );
}
