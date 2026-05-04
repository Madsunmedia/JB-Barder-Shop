"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchAvailability } from "@/app/actions/availability";
import { createBooking } from "@/app/actions/booking";
import { Loader2, CheckCircle2 } from "lucide-react";

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

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (formData.date) {
      fetchAvailability(formData.date).then(res => {
        if (res.success && res.availableSlots) setAvailableSlots(res.availableSlots);
        else setAvailableSlots([]);
      });
      // Reset time when date changes
      setFormData(prev => ({ ...prev, time: "" }));
    }
  }, [formData.date]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await createBooking({
        fullName: formData.name,
        phoneNumber: formData.phone,
        serviceSelected: service?.name || "General Booking",
        dateSelected: formData.date,
        timeSelected: formData.time,
        customerNotes: formData.email ? `Email: ${formData.email}` : undefined,
        source: "Drawer",
      });
      
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
          setFormData({ name: "", phone: "", email: "", date: "", time: "" });
        }, 3000);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("A network error occurred.");
    } finally {
      setIsSubmitting(false);
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

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-gold">
                    <CheckCircle2 size={80} />
                  </motion.div>
                  <h2 className="text-3xl font-accent text-gold uppercase">Request Sent!</h2>
                  <p className="text-warm-white/70">We will confirm your appointment shortly.</p>
                </div>
              ) : (
                <>
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
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-warm-white focus:border-gold outline-none transition-colors [color-scheme:dark]"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" size={18} />
                      <select
                        required
                        disabled={!formData.date || availableSlots.length === 0}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-warm-white focus:border-gold outline-none transition-colors appearance-none disabled:opacity-50"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      >
                        <option value="" disabled>
                          {!formData.date ? "Select Date First" : availableSlots.length === 0 ? "No Slots" : "Select Time"}
                        </option>
                        {availableSlots.map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 flex items-center justify-center gap-2 bg-gold text-black font-accent text-2xl uppercase rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : "Confirm Booking"}
                </button>
              </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
