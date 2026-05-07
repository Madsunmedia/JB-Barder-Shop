"use client";

import { motion } from "framer-motion";
import { useState, useTransition } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Star, 
  EyeOff,
  Trash2
} from "lucide-react";
import { updateReviewStatus, deleteReview } from "@/app/actions/reviews";
import { formatDistanceToNow } from "date-fns";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  status: string;
  createdAt: Date;
}

interface ReviewsClientProps {
  initialData: {
    pending: Review[];
    approved: Review[];
    rejected: Review[];
  };
}

export default function ReviewsClient({ initialData }: ReviewsClientProps) {
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [isPendingAction, startTransition] = useTransition();

  const currentReviews = initialData[activeTab];

  const handleStatusUpdate = async (id: string, status: any) => {
    startTransition(async () => {
      await updateReviewStatus(id, status);
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this review?")) return;
    startTransition(async () => {
      await deleteReview(id);
    });
  };

  return (
    <div className="space-y-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div>
            <h2 className="text-3xl font-accent text-gold uppercase tracking-tighter">Review Moderation</h2>
            <p className="text-warm-white/40 text-xs font-mono mt-2">Manage customer feedback and testimonials.</p>
         </div>
         <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5 overflow-x-auto max-w-full">
            <button 
              onClick={() => setActiveTab("pending")}
              className={`px-6 py-2 rounded-xl text-[10px] font-accent uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "pending" ? "bg-gold text-black" : "text-warm-white/40 hover:text-gold"}`}
            >
              Pending ({initialData.pending.length})
            </button>
            <button 
              onClick={() => setActiveTab("approved")}
              className={`px-6 py-2 rounded-xl text-[10px] font-accent uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "approved" ? "bg-gold text-black" : "text-warm-white/40 hover:text-gold"}`}
            >
              Approved ({initialData.approved.length})
            </button>
            <button 
              onClick={() => setActiveTab("rejected")}
              className={`px-6 py-2 rounded-xl text-[10px] font-accent uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "rejected" ? "bg-gold text-black" : "text-warm-white/40 hover:text-gold"}`}
            >
              Rejected ({initialData.rejected.length})
            </button>
         </div>
      </div>

      {/* List */}
      <div className={`space-y-6 transition-opacity ${isPendingAction ? "opacity-50 pointer-events-none" : ""}`}>
         {currentReviews.length === 0 ? (
           <div className="glass p-20 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
              <Star size={40} className="text-warm-white/10 mb-4" />
              <p className="text-warm-white/20 font-accent uppercase tracking-widest">No reviews in this category</p>
           </div>
         ) : (
           currentReviews.map((review) => (
             <ReviewModerationCard 
               key={review.id} 
               review={review}
               onApprove={() => handleStatusUpdate(review.id, "APPROVED")}
               onReject={() => handleStatusUpdate(review.id, "REJECTED")}
               onHide={() => handleStatusUpdate(review.id, "PENDING")}
               onDelete={() => handleDelete(review.id)}
             />
           ))
         )}
      </div>

    </div>
  );
}

function ReviewModerationCard({ review, onApprove, onReject, onHide, onDelete }: any) {
  const dateStr = formatDistanceToNow(new Date(review.createdAt), { addSuffix: true });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 md:p-8 rounded-3xl border border-white/5 flex flex-col lg:flex-row gap-8 items-start hover:border-gold/20 transition-all group"
    >
       <div className="flex-1 space-y-4 w-full">
          <div className="flex items-center justify-between gap-4">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-accent text-xl uppercase border border-gold/20">
                   {review.name[0]}
                </div>
                <div>
                   <h4 className="text-lg font-accent text-warm-white uppercase tracking-wider">{review.name}</h4>
                   <p className="text-[10px] font-mono text-warm-white/20 uppercase">{dateStr}</p>
                </div>
             </div>
             <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < review.rating ? "text-gold fill-gold" : "text-warm-white/10"} />
                ))}
             </div>
          </div>
          <p className="text-sm text-warm-white/60 font-body leading-relaxed italic">&quot;{review.comment}&quot;</p>
       </div>

       <div className="flex flex-row lg:flex-col gap-3 justify-end shrink-0 w-full lg:w-auto">
          {review.status === "APPROVED" ? (
            <>
               <button 
                 onClick={onHide}
                 className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/5 text-warm-white/60 hover:text-gold transition-all text-[10px] font-accent uppercase tracking-widest border border-white/10"
               >
                  <EyeOff size={16} /> Hide
               </button>
               <button 
                 onClick={onDelete}
                 className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-red-500/5 text-red-500/60 hover:text-red-500 transition-all text-[10px] font-accent uppercase tracking-widest border border-red-500/10"
               >
                  <Trash2 size={16} /> Delete
               </button>
            </>
          ) : review.status === "REJECTED" ? (
            <>
               <button 
                 onClick={onApprove}
                 className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-green-500 text-black hover:scale-105 transition-all text-[10px] font-accent uppercase tracking-widest"
               >
                  <CheckCircle2 size={16} /> Restore & Approve
               </button>
               <button 
                 onClick={onDelete}
                 className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-red-500/5 text-red-500/60 hover:text-red-500 transition-all text-[10px] font-accent uppercase tracking-widest border border-red-500/10"
               >
                  <Trash2 size={16} /> Delete
               </button>
            </>
          ) : (
            <>
               <button 
                 onClick={onApprove}
                 className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-xl bg-green-500 text-black hover:scale-105 transition-all text-[10px] font-accent uppercase tracking-widest shadow-[0_10px_20px_rgba(34,197,94,0.2)]"
               >
                  <CheckCircle2 size={16} /> Approve
               </button>
               <button 
                 onClick={onReject}
                 className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-xl bg-black border border-red-500/20 text-red-500 hover:bg-red-500/5 transition-all text-[10px] font-accent uppercase tracking-widest"
               >
                  <XCircle size={16} /> Reject
               </button>
            </>
          )}
       </div>
    </motion.div>
  );
}
