"use client";

import { useEffect, useState } from "react";
import { Check, X, Star, Clock, Filter } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState("PENDING");

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?status=${statusFilter}`);
    const data = await res.json();
    setReviews(data);
  };

  const handleUpdate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black-primary text-warm-white p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-accent text-gold uppercase">Review Moderation</h1>
            <p className="text-warm-white/60 font-body italic">Manage what clients are saying about JB Barbershop.</p>
          </div>

          <div className="flex items-center gap-4 bg-charcoal p-2 rounded-xl border border-white/10">
            {["PENDING", "APPROVED", "REJECTED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-6 py-2 rounded-lg font-accent text-sm tracking-widest transition-all ${
                  statusFilter === status ? "bg-gold text-black" : "text-warm-white/50 hover:text-warm-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.length === 0 ? (
            <div className="col-span-full py-20 text-center glass rounded-3xl border-dashed border-gold/20">
               <p className="text-gold font-accent text-2xl uppercase opacity-30">No {statusFilter.toLowerCase()} reviews found</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="glass p-8 rounded-2xl border border-gold/10 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-gold">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] text-warm-white/40 font-mono">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-warm-white/80 font-heading italic">&quot;{review.comment}&quot;</p>
                  <p className="text-gold font-accent uppercase text-sm tracking-widest">— {review.name}</p>
                </div>

                <div className="flex gap-4">
                  {review.status !== "APPROVED" && (
                    <button
                      onClick={() => handleUpdate(review.id, "APPROVED")}
                      className="flex-1 py-3 bg-green-900/40 text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Check size={16} /> Approve
                    </button>
                  )}
                  {review.status !== "REJECTED" && (
                    <button
                      onClick={() => handleUpdate(review.id, "REJECTED")}
                      className="flex-1 py-3 bg-red-900/40 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <X size={16} /> Reject
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
