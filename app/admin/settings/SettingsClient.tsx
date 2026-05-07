"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Clock,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Save,
  Plus,
  X,
  CheckCircle2,
} from "lucide-react";
import { saveSettings } from "@/app/actions/settings";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DAY_LABELS: Record<string, string> = {
  monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday",
  thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday",
};

const defaultHours = DAYS.reduce((acc, d) => {
  acc[d] = { open: "09:00", close: "20:00", closed: d === "sunday" };
  return acc;
}, {} as Record<string, { open: string; close: string; closed: boolean }>);

interface SettingsData {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  minAdvanceHours: number;
  hours: Record<string, { open: string; close: string; closed: boolean }>;
  blockedDates: string[];
}

export default function SettingsClient({ initialSettings }: { initialSettings: SettingsData | null }) {
  const existingHours = initialSettings?.hours as any ?? defaultHours;
  const [businessName, setBusinessName] = useState(initialSettings?.businessName ?? "JB Barbershop");
  const [phone, setPhone] = useState(initialSettings?.phone ?? "+1 403 929 7321");
  const [email, setEmail] = useState(initialSettings?.email ?? "ijbbarbershop@gmail.com");
  const [address, setAddress] = useState(initialSettings?.address ?? "410 13 Street North, Lethbridge, Alberta T1H 2S2");
  const [minAdvanceHours, setMinAdvanceHours] = useState(initialSettings?.minAdvanceHours ?? 2);
  const [hours, setHours] = useState<Record<string, { open: string; close: string; closed: boolean }>>(existingHours);
  const [blockedDates, setBlockedDates] = useState<string[]>(initialSettings?.blockedDates as any ?? []);
  const [newDate, setNewDate] = useState("");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    startTransition(async () => {
      const res = await saveSettings({ businessName, phone, email, address, minAdvanceHours, hours, blockedDates });
      if (res.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    });
  };

  const updateHour = (day: string, field: "open" | "close" | "closed", value: any) => {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const addBlockedDate = () => {
    if (newDate && !blockedDates.includes(newDate)) {
      setBlockedDates([...blockedDates, newDate].sort());
      setNewDate("");
    }
  };

  return (
    <div className="max-w-4xl space-y-10">
      {/* Saved Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[200] flex items-center gap-3 px-6 py-3 glass border border-green-500/30 text-green-400 font-accent text-sm uppercase tracking-widest rounded-2xl shadow-lg"
          >
            <CheckCircle2 size={16} /> Settings Saved!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-accent text-gold uppercase tracking-tighter">Global Settings</h2>
        <p className="text-warm-white/40 text-xs font-mono mt-2">Business identity, hours &amp; booking rules</p>
      </div>

      {/* Business Identity */}
      <section className="space-y-5">
        <div className="flex items-center gap-3 text-gold">
          <ShieldCheck size={20} />
          <h3 className="text-sm font-accent uppercase tracking-widest">Business Identity</h3>
        </div>
        <div className="glass p-5 md:p-8 rounded-[1.5rem] md:rounded-3xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={10} /> Shop Name</label>
            <input value={businessName} onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-warm-white focus:border-gold outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest flex items-center gap-1.5"><Phone size={10} /> Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-warm-white focus:border-gold outline-none transition-colors" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest flex items-center gap-1.5"><Mail size={10} /> Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-warm-white focus:border-gold outline-none transition-colors" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest flex items-center gap-1.5"><MapPin size={10} /> Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-5 text-sm text-warm-white focus:border-gold outline-none transition-colors" />
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="space-y-5">
        <div className="flex items-center gap-3 text-gold">
          <Clock size={20} />
          <h3 className="text-sm font-accent uppercase tracking-widest">Shop Hours</h3>
        </div>
        <div className="glass p-5 md:p-8 rounded-[1.5rem] md:rounded-3xl border border-white/5 space-y-3">
          {DAYS.map((day) => (
            <div key={day} className="flex flex-col xs:flex-row xs:items-center justify-between py-4 xs:py-3 border-b border-white/5 last:border-0 gap-3 xs:gap-4">
              <div className="w-full xs:w-28 text-xs font-accent text-warm-white uppercase tracking-wider">{DAY_LABELS[day]}</div>
              <div className="flex items-center gap-2 xs:gap-4 flex-1">
                <input type="time" value={hours[day]?.open ?? "09:00"} disabled={hours[day]?.closed}
                  onChange={(e) => updateHour(day, "open", e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-lg py-1.5 px-3 text-[11px] font-mono text-warm-white focus:border-gold outline-none transition-colors disabled:opacity-30" />
                <span className="text-warm-white/20 text-xs">—</span>
                <input type="time" value={hours[day]?.close ?? "20:00"} disabled={hours[day]?.closed}
                  onChange={(e) => updateHour(day, "close", e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-lg py-1.5 px-3 text-[11px] font-mono text-warm-white focus:border-gold outline-none transition-colors disabled:opacity-30" />
              </div>
              <button
                onClick={() => updateHour(day, "closed", !hours[day]?.closed)}
                className={`w-full xs:w-auto px-4 xs:px-3 py-2 xs:py-1 mt-2 xs:mt-0 rounded-xl xs:rounded-full text-[10px] xs:text-[9px] font-accent uppercase tracking-widest border transition-all flex items-center justify-center ${
                  hours[day]?.closed
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : "bg-green-500/10 text-green-400 border-green-500/20"
                }`}
              >
                {hours[day]?.closed ? "Closed" : "Open"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Rules */}
      <section className="space-y-5">
        <div className="flex items-center gap-3 text-gold">
          <Calendar size={20} />
          <h3 className="text-sm font-accent uppercase tracking-widest">Booking Logic</h3>
        </div>
        <div className="glass p-5 md:p-8 rounded-[1.5rem] md:rounded-3xl border border-white/5 space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8">
            <div>
              <h4 className="text-sm font-accent text-warm-white uppercase tracking-wider mb-1">Minimum Advance Notice</h4>
              <p className="text-[10px] text-warm-white/20 font-mono uppercase tracking-wider">Hours before a slot that customers can book</p>
            </div>
            <div className="flex items-center gap-3">
              <input type="number" min={0} value={minAdvanceHours} onChange={(e) => setMinAdvanceHours(Number(e.target.value))}
                className="w-full sm:w-20 bg-black/40 border border-white/10 rounded-xl py-3 sm:py-2 px-3 text-center text-gold font-accent text-lg outline-none focus:border-gold transition-colors" />
              <span className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest flex-shrink-0">hrs</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-accent text-warm-white uppercase tracking-wider">Blocked Dates (Closures)</h4>
            <div className="flex flex-wrap gap-3">
              {blockedDates.map((date) => (
                <div key={date} className="flex items-center gap-2 px-3 py-2 sm:py-1.5 bg-gold/10 border border-gold/20 rounded-xl text-gold text-[10px] font-mono whitespace-nowrap">
                  {date}
                  <button onClick={() => setBlockedDates(blockedDates.filter((d) => d !== date))}
                    className="hover:text-red-400 transition-colors ml-1 p-1"><X size={12} /></button>
                </div>
              ))}
              <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}
                  className="flex-1 sm:flex-none bg-black/40 border border-white/10 rounded-xl py-2.5 sm:py-1.5 px-3 text-[11px] font-mono text-warm-white focus:border-gold outline-none transition-colors min-w-[140px]" />
                <button onClick={addBlockedDate}
                  className="flex items-center justify-center gap-1 px-4 py-2.5 sm:py-1.5 bg-white/5 border border-white/10 rounded-xl text-warm-white/40 text-[10px] font-accent uppercase tracking-widest hover:text-gold hover:border-gold/40 transition-all flex-shrink-0 min-w-[80px]">
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end pt-2 pb-6">
        <button onClick={handleSave} disabled={isPending}
          className="w-full md:w-auto flex items-center justify-center gap-3 bg-gold text-black px-10 py-4 rounded-xl md:rounded-2xl font-accent text-base uppercase tracking-widest shadow-[0_20px_50px_rgba(201,168,76,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 min-h-[56px]">
          <Save size={20} /> {isPending ? "Saving..." : "Save Global Changes"}
        </button>
      </div>
    </div>
  );
}
