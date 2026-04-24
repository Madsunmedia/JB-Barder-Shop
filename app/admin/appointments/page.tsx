"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Download,
  Search,
  MoreVertical,
  Clock,
  User,
  Scissors
} from "lucide-react";
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";

export default function AppointmentsPage() {
  const [view, setView] = useState<"calendar" | "list">("list");
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="space-y-8">
      
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex items-center gap-4 bg-black/40 p-1 rounded-2xl border border-white/5 self-start">
          <button 
            onClick={() => setView("list")}
            className={`px-6 py-2 rounded-xl text-[10px] font-accent uppercase tracking-[0.2em] transition-all ${view === "list" ? "bg-gold text-black shadow-lg" : "text-warm-white/40 hover:text-gold"}`}
          >
            List View
          </button>
          <button 
            onClick={() => setView("calendar")}
            className={`px-6 py-2 rounded-xl text-[10px] font-accent uppercase tracking-[0.2em] transition-all ${view === "calendar" ? "bg-gold text-black shadow-lg" : "text-warm-white/40 hover:text-gold"}`}
          >
            Calendar
          </button>
        </div>

        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-white/20 group-hover:text-gold transition-colors" size={16} />
              <input 
                placeholder="SEARCH CLIENTS..." 
                className="bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-[10px] font-accent uppercase tracking-widest outline-none focus:border-gold transition-all w-64"
              />
           </div>
           <button className="glass p-3 rounded-xl border border-white/5 text-gold hover:scale-110 transition-transform">
              <Filter size={20} />
           </button>
           <button className="bg-gold text-black px-6 py-3 rounded-xl font-accent text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center gap-2">
              <Download size={16} /> Export CSV
           </button>
        </div>
      </div>

      {view === "list" ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-3xl border border-white/5 overflow-hidden"
        >
           <table className="w-full text-left">
              <thead className="bg-white/[0.02] text-[10px] font-accent uppercase text-warm-white/40 tracking-[0.2em]">
                 <tr>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4">Time & Date</th>
                    <th className="px-8 py-4">Client</th>
                    <th className="px-8 py-4">Service</th>
                    <th className="px-8 py-4">Barber</th>
                    <th className="px-8 py-4">Price</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                 <AppointmentListItem status="confirmed" time="10:00 AM" date="Today" name="Ayush Verma" service="Skin Fade" barber="Jeet" price="$30" />
                 <AppointmentListItem status="pending" time="11:30 AM" date="Today" name="Robert G." service="Full Groom" barber="Any" price="$65" />
                 <AppointmentListItem status="completed" time="09:00 AM" date="Today" name="John Doe" service="Beard Trim" barber="Jeet" price="$25" />
                 <AppointmentListItem status="cancelled" time="02:00 PM" date="Apr 26" name="Shelley B." service="Kids Cut" barber="Jeet" price="$20" />
                 <AppointmentListItem status="confirmed" time="04:30 PM" date="Apr 26" name="Kamaldeep S." service="Regular Cut" barber="Jeet" price="$25" />
              </tbody>
           </table>
        </motion.div>
      ) : (
        <CalendarView />
      )}

    </div>
  );
}

function AppointmentListItem({ status, time, date, name, service, barber, price }: any) {
  const statusColors: any = {
    confirmed: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-gold/10 text-gold border-gold/20",
    completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20"
  };

  return (
    <tr className="hover:bg-white/[0.01] transition-colors group">
       <td className="px-8 py-6">
          <span className={`px-3 py-1 rounded-full text-[8px] font-accent uppercase border tracking-[0.2em] ${statusColors[status]}`}>
             {status}
          </span>
       </td>
       <td className="px-8 py-6">
          <div className="flex items-center gap-3">
             <Clock size={14} className="text-gold" />
             <div className="text-xs font-accent uppercase tracking-widest text-warm-white/80">{time}</div>
             <div className="text-[10px] font-mono text-warm-white/20 uppercase">{date}</div>
          </div>
       </td>
       <td className="px-8 py-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-gold uppercase font-accent">
                {name[0]}
             </div>
             <div className="text-sm font-accent text-warm-white uppercase tracking-wider">{name}</div>
          </div>
       </td>
       <td className="px-8 py-6">
          <div className="text-xs text-warm-white/40">{service}</div>
       </td>
       <td className="px-8 py-6">
          <div className="text-xs text-warm-white/40">{barber}</div>
       </td>
       <td className="px-8 py-6">
          <div className="text-xs font-accent text-gold">{price}</div>
       </td>
       <td className="px-8 py-6 text-right">
          <button className="text-warm-white/20 hover:text-gold transition-colors">
             <MoreVertical size={20} />
          </button>
       </td>
    </tr>
  );
}

function CalendarView() {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-3xl border border-white/5 flex flex-col h-[700px]"
    >
       <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div className="flex items-center gap-6">
             <h3 className="text-2xl font-accent text-gold uppercase tracking-widest">
               {format(currentWeek, "MMMM yyyy")}
             </h3>
             <div className="flex items-center gap-2 bg-black/40 rounded-xl border border-white/10 p-1">
                <button onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))} className="p-2 text-warm-white/40 hover:text-gold"><ChevronLeft size={18} /></button>
                <button onClick={() => setCurrentWeek(new Date())} className="px-4 py-1 text-[8px] font-accent uppercase text-gold hover:underline tracking-widest">Today</button>
                <button onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))} className="p-2 text-warm-white/40 hover:text-gold"><ChevronRight size={18} /></button>
             </div>
          </div>
          <div className="flex gap-4">
             {['Confirmed', 'Pending', 'Cancelled'].map(s => (
               <div key={s} className="flex items-center gap-2 text-[8px] font-accent uppercase tracking-widest text-warm-white/40">
                  <div className={`w-2 h-2 rounded-full ${s === 'Confirmed' ? 'bg-green-500' : s === 'Pending' ? 'bg-gold' : 'bg-red-500'}`} />
                  {s}
               </div>
             ))}
          </div>
       </div>

       <div className="flex-1 flex divide-x divide-white/5 overflow-hidden">
          {days.map(day => (
            <div key={day.toString()} className="flex-1 flex flex-col">
               <div className="p-4 text-center border-b border-white/5 bg-white/[0.01]">
                  <p className="text-[10px] font-accent text-gold uppercase tracking-widest mb-1">{format(day, "EEE")}</p>
                  <p className={`text-xl font-accent ${format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') ? 'text-gold' : 'text-warm-white/60'}`}>
                    {format(day, "d")}
                  </p>
               </div>
               <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar">
                  {/* Mock Appointments for the day */}
                  {day.getDay() === 1 && (
                    <>
                      <CalendarEvent time="09:00" title="Ayush Verma" service="Skin Fade" status="confirmed" />
                      <CalendarEvent time="11:30" title="Robert G." service="Full Groom" status="pending" />
                    </>
                  )}
                  {day.getDay() === 3 && (
                    <CalendarEvent time="14:00" title="Shelley B." service="Kids Cut" status="cancelled" />
                  )}
               </div>
            </div>
          ))}
       </div>
    </motion.div>
  );
}

function CalendarEvent({ time, title, service, status }: any) {
  const colors: any = {
    confirmed: "bg-green-500/10 border-green-500/20 text-green-500",
    pending: "bg-gold/10 border-gold/20 text-gold",
    cancelled: "bg-red-500/10 border-red-500/20 text-red-500"
  };

  return (
    <div className={`p-3 rounded-xl border ${colors[status]} cursor-pointer hover:scale-[1.02] transition-transform`}>
       <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-mono opacity-60 uppercase">{time}</span>
          <div className={`w-1.5 h-1.5 rounded-full ${status === 'confirmed' ? 'bg-green-500' : status === 'pending' ? 'bg-gold' : 'bg-red-500'}`} />
       </div>
       <p className="text-[10px] font-accent uppercase tracking-wider truncate mb-1">{title}</p>
       <p className="text-[8px] font-body opacity-40 uppercase tracking-tighter truncate">{service}</p>
    </div>
  );
}
