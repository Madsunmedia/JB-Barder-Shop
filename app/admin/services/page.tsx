"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Plus, 
  Scissors, 
  Clock, 
  DollarSign, 
  Save, 
  Trash2, 
  GripVertical,
  CheckCircle2,
  XCircle
} from "lucide-react";

export default function ServicesAdminPage() {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-3xl font-accent text-gold uppercase tracking-tighter">Manage Services</h2>
            <p className="text-warm-white/40 text-xs font-mono mt-2">Configure your menu, pricing, and timing.</p>
         </div>
         <button 
           onClick={() => setIsAdding(true)}
           className="bg-gold text-black px-8 py-4 rounded-xl font-accent text-xs uppercase tracking-widest hover:scale-[1.05] transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(201,168,76,0.3)]"
         >
            <Plus size={18} /> Add New Service
         </button>
      </div>

      {/* Add/Edit Modal (Simplified as inline for now) */}
      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass p-8 rounded-3xl border border-gold/20 bg-gold/[0.02]"
        >
           <h3 className="text-xl font-accent text-gold uppercase tracking-widest mb-8">New Service Details</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Service Name</label>
                 <input className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white outline-none focus:border-gold transition-colors" placeholder="e.g. Master Skin Fade" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Price ($)</label>
                 <div className="relative">
                    <DollarSign size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-white/20" />
                    <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-warm-white outline-none focus:border-gold transition-colors" placeholder="30" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Duration (min)</label>
                 <div className="relative">
                    <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-white/20" />
                    <input type="number" className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-warm-white outline-none focus:border-gold transition-colors" placeholder="45" />
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Category</label>
                 <select className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white outline-none focus:border-gold transition-colors appearance-none">
                    <option>Haircut</option>
                    <option>Beard</option>
                    <option>Grooming</option>
                    <option>Kids</option>
                 </select>
              </div>
           </div>
           <div className="flex justify-end gap-4 mt-8">
              <button onClick={() => setIsAdding(false)} className="px-8 py-4 font-accent text-xs uppercase tracking-widest text-warm-white/40 hover:text-warm-white">Cancel</button>
              <button className="bg-gold text-black px-12 py-4 rounded-xl font-accent text-xs uppercase tracking-widest hover:scale-105 transition-all">Save Service</button>
           </div>
        </motion.div>
      )}

      {/* Services Table */}
      <div className="glass rounded-3xl border border-white/5 overflow-hidden">
         <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] font-accent uppercase text-warm-white/40 tracking-[0.2em]">
               <tr>
                  <th className="px-8 py-4 w-12"></th>
                  <th className="px-8 py-4">Service</th>
                  <th className="px-8 py-4">Price</th>
                  <th className="px-8 py-4">Duration</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
               <ServiceRow name="Men's Skin Fade + Beard" price={45} duration={45} active={true} />
               <ServiceRow name="Men's Skin Fade" price={30} duration={30} active={true} />
               <ServiceRow name="Hot Towel Shave" price={25} duration={15} active={true} />
               <ServiceRow name="Facials" price={50} duration={30} active={false} />
            </tbody>
         </table>
      </div>

    </div>
  );
}

function ServiceRow({ name, price, duration, active }: any) {
  return (
    <tr className="hover:bg-white/[0.01] transition-colors group">
       <td className="px-8 py-6">
          <GripVertical size={16} className="text-warm-white/20 cursor-grab active:cursor-grabbing" />
       </td>
       <td className="px-8 py-6">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-lg bg-gold/5 border border-gold/10 flex items-center justify-center text-gold">
                <Scissors size={18} />
             </div>
             <input defaultValue={name} className="bg-transparent border-none text-sm font-accent text-warm-white uppercase tracking-wider focus:outline-none focus:text-gold transition-colors w-full" />
          </div>
       </td>
       <td className="px-8 py-6">
          <div className="flex items-center gap-1">
             <span className="text-gold font-accent">$</span>
             <input type="number" defaultValue={price} className="bg-transparent border-none text-sm font-accent text-warm-white/80 w-16 focus:outline-none focus:text-gold transition-colors" />
          </div>
       </td>
       <td className="px-8 py-6">
          <div className="flex items-center gap-2">
             <input type="number" defaultValue={duration} className="bg-transparent border-none text-xs font-mono text-warm-white/40 w-12 text-right focus:outline-none focus:text-gold transition-colors" />
             <span className="text-[10px] font-mono text-warm-white/20 uppercase">min</span>
          </div>
       </td>
       <td className="px-8 py-6">
          <button className={`flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-accent uppercase tracking-widest border transition-all ${active ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"}`}>
             {active ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
             {active ? "Active" : "Inactive"}
          </button>
       </td>
       <td className="px-8 py-6 text-right">
          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
             <button className="p-2 text-warm-white/40 hover:text-gold transition-colors"><Save size={18} /></button>
             <button className="p-2 text-warm-white/40 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
          </div>
       </td>
    </tr>
  );
}
