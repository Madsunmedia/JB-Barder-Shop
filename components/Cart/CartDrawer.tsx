"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Clock, Trash2, Plus, ArrowRight, Scissors } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, totalPrice, totalMins, isCartOpen, closeCart } =
    useCart();
  const router = useRouter();

  const handleBookNow = () => {
    closeCart();
    router.push("/book");
  };

  const handleAddMore = () => {
    closeCart();
    router.push("/services");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-[210] w-full sm:w-[420px] bg-[#0d0d0d] border-l border-gold/10 shadow-[-20px_0_60px_rgba(0,0,0,0.6)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <ShoppingCart size={20} className="text-gold" />
                <h2 className="text-xl font-accent text-gold uppercase tracking-widest">
                  Your Cart
                </h2>
                {cart.length > 0 && (
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold text-black text-xs font-bold">
                    {cart.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-warm-white/60 hover:text-gold hover:border-gold/40 transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart body */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center">
                    <Scissors size={32} className="text-gold/30" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-warm-white/60 font-accent uppercase tracking-widest text-sm">
                      Your cart is empty
                    </p>
                    <p className="text-warm-white/30 text-xs font-body">
                      Browse services and add them here before booking.
                    </p>
                  </div>
                  <button
                    onClick={handleAddMore}
                    className="flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 text-gold font-accent text-sm uppercase tracking-widest rounded-full hover:bg-gold hover:text-black transition-all active:scale-95"
                  >
                    <Plus size={16} /> Browse Services
                  </button>
                </div>
              ) : (
                /* Service list */
                <div className="px-6 py-5 space-y-3">
                  {cart.map((service) => (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-gold/20 transition-colors group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-accent text-warm-white uppercase tracking-wide truncate group-hover:text-gold transition-colors">
                          {service.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-mono text-warm-white/30 flex items-center gap-1">
                            <Clock size={10} /> {service.duration}
                          </span>
                        </div>
                      </div>
                      <span className="text-gold font-accent text-lg flex-shrink-0">
                        ${service.price}
                      </span>
                      <button
                        onClick={() => removeFromCart(service.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-warm-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all flex-shrink-0"
                        aria-label={`Remove ${service.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer — only shown when cart has items */}
            {cart.length > 0 && (
              <div className="flex-shrink-0 border-t border-white/5 px-6 py-6 space-y-4 bg-[#0d0d0d]">
                {/* Totals */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-mono text-warm-white/30 uppercase tracking-widest">
                    ~{totalMins} mins · {cart.length} service{cart.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-2xl font-accent text-gold">${totalPrice}</span>
                </div>

                {/* Add more services */}
                <button
                  onClick={handleAddMore}
                  className="w-full flex items-center justify-center gap-2 min-h-[44px] py-2.5 border border-white/10 text-warm-white/60 font-accent text-sm uppercase tracking-widest rounded-full hover:border-gold/40 hover:text-gold transition-all active:scale-95"
                >
                  <Plus size={15} /> Add More Services
                </button>

                {/* Book Now */}
                <button
                  onClick={handleBookNow}
                  className="w-full flex items-center justify-center gap-2 min-h-[52px] py-3 bg-gold text-black font-accent text-xl uppercase rounded-full shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_36px_rgba(201,168,76,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Book Now <ArrowRight size={18} />
                </button>

                {/* Clear cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-center text-[10px] font-mono text-warm-white/20 hover:text-red-400/60 uppercase tracking-widest transition-colors py-1"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
