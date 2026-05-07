"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Quote, Loader2 } from "lucide-react";
import { getPublicReviews } from "@/app/actions/reviews";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const INITIAL_COUNT = 10;
const BATCH_SIZE = 10;

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ReviewsSection() {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [displayCount, setDisplayCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(true);
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch all reviews once on mount
  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      try {
        setLoading(true);
        const data = await getPublicReviews();
        if (!cancelled) {
          // Ensure we always have a valid array
          setAllReviews(Array.isArray(data) ? data : []);
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setAllReviews([]);
          setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReviews();
    return () => { cancelled = true; };
  }, []);

  // The slice of reviews currently visible
  const visibleReviews = allReviews.slice(0, displayCount);
  const hasMore = displayCount < allReviews.length;

  // Show More — increases count by BATCH_SIZE with a brief loading tick
  // so React has a frame to flush the new DOM nodes before painting
  function handleShowMore() {
    setShowMoreLoading(true);
    // requestAnimationFrame gives React time to render the spinner
    // before doing the heavy state update
    requestAnimationFrame(() => {
      setTimeout(() => {
        setDisplayCount((prev) => Math.min(prev + BATCH_SIZE, allReviews.length));
        setShowMoreLoading(false);
      }, 120);
    });
  }

  return (
    <section id="reviews" className="relative py-16 md:py-32 bg-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">

        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10 md:mb-16">
          <div className="space-y-2 md:space-y-3">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold font-accent text-sm tracking-[0.3em] uppercase"
            >
              What Clients Say
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[clamp(2rem,9vw,4rem)] font-accent text-warm-white uppercase leading-tight"
            >
              5.0 ★ on <span className="text-gold">Google</span>
            </motion.h2>
          </div>

          {/* Rating summary badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 p-4 rounded-2xl border border-white/8 bg-white/[0.02] self-start md:self-auto"
          >
            <div>
              <p className="text-3xl font-accent text-gold leading-none">5.0</p>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Star size={12} fill="currentColor" className="text-gold" aria-hidden="true" />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <p className="text-warm-white font-accent text-xl leading-none">
                {loading ? "—" : allReviews.length}
              </p>
              <p className="text-warm-white/40 text-xs font-mono mt-1 uppercase tracking-wider">Reviews</p>
            </div>
          </motion.div>
        </div>

        {/* ── Review Cards Grid ── */}
        {loading ? (
          /* Loading skeleton */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-2xl border border-white/5 bg-white/[0.02] animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          /* Error fallback — section never goes blank */
          <div className="py-16 text-center text-warm-white/30 font-mono text-sm uppercase tracking-widest">
            Unable to load reviews at this time. Please refresh the page.
          </div>
        ) : allReviews.length === 0 ? (
          <div className="py-16 text-center text-warm-white/30 font-mono text-sm uppercase tracking-widest">
            No reviews yet — be the first!
          </div>
        ) : (
          /*
           * KEY FIX: We use a plain `div` grid (not `motion.div` with whileInView)
           * as the container, so adding more items never triggers a re-animation
           * of the whole container. Each individual new card gets its own
           * entry animation via AnimatedCard.
           */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {visibleReviews.map((review, index) => (
              <AnimatedCard
                key={review.id}
                review={review}
                /* Only animate cards beyond the initial batch;
                   the first 10 animate on scroll via whileInView */
                animateImmediately={index >= INITIAL_COUNT}
              />
            ))}
          </div>
        )}

        {/* ── Bottom Actions ── */}
        <div className="mt-10 md:mt-12 flex flex-col items-center gap-5 md:gap-6">

          {/* Show More button */}
          {!loading && hasMore && (
            <button
              onClick={handleShowMore}
              disabled={showMoreLoading}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-warm-white font-accent text-sm uppercase tracking-widest rounded-full transition-all flex items-center gap-2 group min-h-[48px] disabled:opacity-60 disabled:cursor-wait"
            >
              {showMoreLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Show More Reviews
                  <Star size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                </>
              )}
            </button>
          )}

          {/* Leave a Review CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="https://g.page/r/jbbarbershop/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 border border-gold/30 text-gold font-accent text-sm uppercase tracking-wider rounded-full hover:bg-gold hover:text-black active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(201,168,76,0.1)]"
            >
              Leave a Review on Google
              <Star size={12} fill="currentColor" aria-hidden="true" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── AnimatedCard ─────────────────────────────────────────────────────────────
/*
 * Each card manages its own animation independently.
 * - Cards in the first batch (index < INITIAL_COUNT) use whileInView so they
 *   animate as the user scrolls down on first load.
 * - Cards revealed by "Show More" (animateImmediately=true) start hidden and
 *   animate in immediately when mounted — because they're already in the
 *   viewport by the time they appear.
 */
function AnimatedCard({
  review,
  animateImmediately,
}: {
  review: Review;
  animateImmediately: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  if (animateImmediately) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <ReviewCard review={review} />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
    >
      <ReviewCard review={review} />
    </motion.div>
  );
}

// ─── ReviewCard ───────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: Review }) {
  // Guard: never crash if a field is unexpectedly missing
  if (!review?.id || !review?.name) return null;

  const rating = Math.min(5, Math.max(1, review.rating ?? 5));

  return (
    <div className="flex flex-col gap-4 p-5 md:p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-gold/20 transition-colors duration-300 group h-full">
      {/* Stars */}
      <div className="flex gap-0.5 text-gold">
        {[...Array(rating)].map((_, si) => (
          <Star key={si} size={13} fill="currentColor" aria-hidden="true" />
        ))}
      </div>

      {/* Quote */}
      <div className="relative flex-1">
        <Quote
          size={18}
          className="text-gold/20 absolute -top-1 -left-1"
          aria-hidden="true"
        />
        <p className="text-warm-white/70 font-body text-sm leading-relaxed pl-4">
          {review.comment ?? ""}
        </p>
      </div>

      {/* Reviewer */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/5">
        <div
          className="w-9 h-9 rounded-full bg-gold/15 border border-gold/20 flex items-center justify-center text-gold font-accent text-sm flex-shrink-0 group-hover:scale-110 transition-transform"
          aria-hidden="true"
        >
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-warm-white text-sm font-accent uppercase tracking-wider leading-none">
            {review.name}
          </p>
          <p className="text-warm-white/30 text-[10px] font-mono uppercase tracking-wider mt-0.5">
            Google Review
          </p>
        </div>
      </div>
    </div>
  );
}
