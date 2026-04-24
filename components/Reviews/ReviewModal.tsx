"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Send } from "lucide-react";
import { useState } from "react";

export default function ReviewModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({ name: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rating }),
      });
      if (res.ok) {
        alert("Thank you! Your review is pending approval.");
        onClose();
        setFormData({ name: "", comment: "" });
        setRating(5);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[500]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg glass p-10 rounded-3xl border border-gold/20 z-[510]"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-warm-white/50 hover:text-gold transition-colors">
              <X size={24} />
            </button>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-4xl font-accent text-gold uppercase">Your Experience</h2>
                <p className="text-warm-white/60">How was your visit to JB Barbershop?</p>
              </div>

              {/* Star Selector */}
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    type="button"
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="text-gold"
                  >
                    <Star
                      size={40}
                      fill={(hover || rating) >= star ? "currentColor" : "none"}
                      strokeWidth={1.5}
                    />
                  </motion.button>
                ))}
              </div>

              <div className="space-y-4">
                <input
                  required
                  placeholder="Your Name"
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <textarea
                  required
                  placeholder="Write your review here..."
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors resize-none"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                />
              </div>

              <button
                disabled={isSubmitting}
                className="w-full py-5 bg-gold text-black font-accent text-2xl uppercase rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : (
                  <>
                    <Send size={20} />
                    Submit Review
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
