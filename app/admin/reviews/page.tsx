"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Star, 
  MessageSquare, 
  Search,
  Filter,
  Eye,
  EyeOff,
  Trash2
} from "lucide-react";

export default function ReviewsAdminPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-3xl font-accent text-gold uppercase tracking-tighter">Review Moderation</h2>
            <p className="text-warm-white/40 text-xs font-mono mt-2">Manage customer feedback and testimonials.</p>
         </div>
         <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-2 rounded-xl text-[10px] font-accent uppercase tracking-widest transition-all ${activeTab === "pending" ? "bg-gold text-black" : "text-warm-white/40 hover:text-gold"}`}
            >
              Pending (4)
            </button>
            <button 
              onClick={() => setActiveTab("approved")}
              className={`px-6 py-2 rounded-xl text-[10px] font-accent uppercase tracking-widest transition-all ${activeTab === "approved" ? "bg-gold text-black" : "text-warm-white/40 hover:text-gold"}`}
            >
              Approved (19)
            </button>
         </div>
      </div>

      {/* List */}
      <div className="space-y-6">
         {activeTab === "pending" ? (
           <>
             <ReviewModerationCard name="Ayush Verma" rating={5} comment="The guys are really good at their work as well as in communication. Very friendly and affordable prices!!" date="2 hours ago" />
             <ReviewModerationCard name="Kamaldeep Singh" rating={5} comment="They are best in Lethbridge so far whatever I have seen. Too good 👍🏻" date="5 hours ago" />
             <ReviewModerationCard name="Shelley Boreen" rating={4} comment="Masterful barbers, though the wait was a bit long even with an appointment." date="Yesterday" />
           </>
         ) : (
           <>
             <ReviewModerationCard approved name="Dilpreet Singh" rating={5} comment="Clean, welcoming, and professional work and appointments on time." date="3 days ago" />
             <ReviewModerationCard approved name="Robert Gilbertson" rating={5} comment="Took his time when asking me what I wanted and it turned out great." date="1 week ago" />
           </>
         )}
      </div>

    </div>
  );
}

function ReviewModerationCard({ name, rating, comment, date, approved }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-8 items-start hover:border-gold/20 transition-all group"
    >
       <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-accent text-xl uppercase border border-gold/20">
                   {name[0]}
                </div>
                <div>
                   <h4 className="text-lg font-accent text-warm-white uppercase tracking-wider">{name}</h4>
                   <p className="text-[10px] font-mono text-warm-white/20 uppercase">{date}</p>
                </div>
             </div>
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < rating ? "text-gold fill-gold" : "text-warm-white/10"} />
                ))}
             </div>
          </div>
          <p className="text-sm text-warm-white/60 font-body leading-relaxed italic">&quot;{comment}&quot;</p>
       </div>

       <div className="flex md:flex-col gap-3 justify-end shrink-0">
          {approved ? (
            <>
               <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 text-warm-white/60 hover:text-gold transition-all text-[10px] font-accent uppercase tracking-widest border border-white/10">
                  <EyeOff size={16} /> Hide
               </button>
               <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-red-500/5 text-red-500/60 hover:text-red-500 transition-all text-[10px] font-accent uppercase tracking-widest border border-red-500/10">
                  <Trash2 size={16} /> Delete
               </button>
            </>
          ) : (
            <>
               <button className="flex items-center gap-3 px-8 py-3 rounded-xl bg-green-500 text-black hover:scale-105 transition-all text-[10px] font-accent uppercase tracking-widest shadow-[0_10px_20px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 size={16} /> Approve
               </button>
               <button className="flex items-center gap-3 px-8 py-3 rounded-xl bg-black border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-all text-[10px] font-accent uppercase tracking-widest">
                  <XCircle size={16} /> Reject
               </button>
            </>
          )}
       </div>
    </motion.div>
  );
}
