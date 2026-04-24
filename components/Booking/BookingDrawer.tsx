"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, Mail } from "lucide-react";
import { useState } from "react";

interface Service {
  id: string;
  name: string;
  price: number;
}

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export default function BookingDrawer({ isOpen, onClose, service }: BookingDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceId: service?.id,
          clientName: formData.name,
        }),
      });
      
      if (res.ok) {
        alert("Appointment requested successfully!");
        onClose();
        // Redirect to Setmore if needed
        // window.open("https://jbbarbershopdsoo.setmore.com/book", "_blank");
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-charcoal z-[210] p-8 md:p-12 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] border-l border-gold/10"
          >
            <button
              onClick={onClose}
              className="absolute top-8 right-8 text-warm-white hover:text-gold transition-colors"
            >
              <X size={32} />
            </button>

            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-accent text-gold uppercase mb-2">Book Service</h2>
                <p className="text-warm-white/60 font-body">Complete the details below to request your spot.</p>
              </div>

              {service && (
                <div className="p-6 glass rounded-2xl border border-gold/20">
                  <h3 className="text-xl font-accent text-gold uppercase">{service.name}</h3>
                  <p className="text-2xl font-accent text-warm-white mt-1">${service.price}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                    <input
                      required
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-warm-white focus:border-gold outline-none transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-warm-white focus:border-gold outline-none transition-colors"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-warm-white focus:border-gold outline-none transition-colors"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                      <input
                        required
                        type="date"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-warm-white focus:border-gold outline-none transition-colors [color-scheme:dark]"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                      <input
                        required
                        type="time"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-warm-white focus:border-gold outline-none transition-colors [color-scheme:dark]"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-gold text-black font-accent text-2xl uppercase rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
