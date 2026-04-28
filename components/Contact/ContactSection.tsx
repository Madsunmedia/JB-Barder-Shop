"use client";

import { motion } from "framer-motion";
import { useEffect, useState, FormEvent } from "react";
import { MapPin, Phone, Mail, Clock, Send, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { track } from "@vercel/analytics";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Mountain Time business hours check
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const mtTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Edmonton",
        hour: "numeric",
        hour12: false,
        day: "numeric",
      }).formatToParts(now);
      
      const hour = parseInt(mtTime.find((p) => p.type === "hour")?.value || "0");
      const day = now.getDay();

      if (day === 0) {
        setIsOpen(hour >= 9 && hour < 19); // Sun 9-7
      } else {
        setIsOpen(hour >= 9 && hour < 20); // Mon-Sat 9-8
      }
    };
    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        track("contact_form_submit");
      } else {
        const data = await res.json();
        setErrorMsg(data.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact error:", error);
      setErrorMsg("A network error occurred. Please try calling us instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-[#050505] overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,#C9A84C_0%,transparent_50%)] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        
        <div className="mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block text-gold font-accent text-sm tracking-[0.3em] uppercase mb-2"
          >
            Reach Out
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-accent text-warm-white uppercase leading-tight"
          >
            Get in <span className="text-gold">Touch</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* ─── Left Panel: Contact Form ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white/[0.02] p-6 sm:p-10 rounded-3xl border border-white/5 relative"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-24 space-y-6 flex flex-col items-center justify-center min-h-[500px]"
              >
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold border border-gold/20">
                   <Send size={32} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-3xl font-accent text-gold uppercase mb-2">Message Sent</h3>
                  <p className="text-warm-white/60 font-body">We&apos;ll get back to you within 24 hours.</p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-6 py-2 border border-white/10 rounded-full text-warm-white/60 text-sm hover:text-white hover:border-white/30 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMsg && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-body flex items-start gap-3">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <p>{errorMsg}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-accent text-warm-white/60 uppercase tracking-widest pl-1">
                      Full Name <span className="text-gold">*</span>
                    </label>
                    <input
                      id="name"
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full min-h-[52px] bg-black/40 border border-white/10 rounded-xl px-5 text-warm-white placeholder:text-white/20 focus:border-gold focus:bg-white/[0.02] outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-xs font-accent text-warm-white/60 uppercase tracking-widest pl-1">
                      Phone Number <span className="text-gold">*</span>
                    </label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      placeholder="(403) 929-7321"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full min-h-[52px] bg-black/40 border border-white/10 rounded-xl px-5 text-warm-white placeholder:text-white/20 focus:border-gold focus:bg-white/[0.02] outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-accent text-warm-white/60 uppercase tracking-widest pl-1">
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <input
                      id="email"
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full min-h-[52px] bg-black/40 border border-white/10 rounded-xl px-5 text-warm-white placeholder:text-white/20 focus:border-gold focus:bg-white/[0.02] outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Service */}
                  <div className="space-y-2">
                    <label htmlFor="service" className="block text-xs font-accent text-warm-white/60 uppercase tracking-widest pl-1">
                      Service Interested In
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full min-h-[52px] bg-black/40 border border-white/10 rounded-xl px-5 text-warm-white focus:border-gold focus:bg-white/[0.02] outline-none transition-all duration-300 appearance-none cursor-pointer"
                      >
                        <option value="">General Inquiry</option>
                        <option value="skin-fade">Skin Fade</option>
                        <option value="beard">Beard Grooming</option>
                        <option value="shave">Hot Towel Shave</option>
                        <option value="kids">Kids Cut</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-accent text-warm-white/60 uppercase tracking-widest pl-1">
                    Your Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-5 text-warm-white placeholder:text-white/20 focus:border-gold focus:bg-white/[0.02] outline-none transition-all duration-300 resize-y min-h-[120px]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[56px] bg-gold text-black font-accent text-xl uppercase rounded-xl shadow-[0_4px_20px_rgba(201,168,76,0.15)] hover:shadow-[0_4px_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                    </>
                  )}
                </button>
                <p className="text-center text-warm-white/30 text-[10px] font-mono uppercase tracking-widest pt-2">
                  Prefer to book? <Link href="/book" className="text-gold hover:underline">Book online here</Link>.
                </p>
              </form>
            )}
          </motion.div>

          {/* ─── Right Panel: Info & Map ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard 
                icon={<MapPin size={18} />} 
                title="Location" 
                value={<>410 13 Street North<br />Lethbridge, AB T1H 2S2</>} 
                href="https://maps.google.com/?q=410+13+Street+North+Lethbridge"
                ariaLabel="Open in Google Maps"
              />
              <InfoCard 
                icon={<Phone size={18} />} 
                title="Call Us" 
                value="+1 403 929 7321" 
                href="tel:+14039297321"
                ariaLabel="Call JB Barbershop"
              />
              <InfoCard 
                icon={<Mail size={18} />} 
                title="Email Us" 
                value="ijbbarbershop@gmail.com" 
                href="mailto:ijbbarbershop@gmail.com"
                ariaLabel="Email JB Barbershop"
                className="sm:col-span-2 lg:col-span-1 xl:col-span-2"
              />
            </div>

            {/* Hours Card */}
            <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gold">
                  <Clock size={18} aria-hidden="true" />
                  <span className="text-xs font-accent uppercase tracking-widest">Shop Hours</span>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-accent tracking-widest border ${isOpen ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"}`} aria-hidden="true" />
                  {isOpen ? "OPEN NOW" : "CLOSED"}
                </div>
              </div>
              <ul className="text-warm-white/60 text-sm font-mono space-y-1">
                <li className="flex justify-between"><span>Mon – Sat:</span> <span className="text-warm-white/90">9:00 AM – 8:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday:</span> <span className="text-warm-white/90">9:00 AM – 7:00 PM</span></li>
              </ul>
            </div>

            {/* Map */}
            <div className="relative w-full h-[250px] sm:h-[300px] rounded-2xl overflow-hidden border border-white/5 bg-white/5">
              <iframe
                title="JB Barbershop Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.488334464875!2d-112.82528732342981!3d51.2687103717585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x536e61f887550f21%3A0x6b4f7a2b9c8d5e4!2s410%2013%20St%20N%2C%20Lethbridge%2C%20AB%20T1H%202S2%2C%20Canada!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.1) opacity(0.8)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none border border-gold/10 rounded-2xl" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, value, href, ariaLabel, className = "" }: any) {
  return (
    <a 
      href={href} 
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={`bg-white/[0.02] p-5 rounded-2xl border border-white/5 hover:border-gold/30 hover:bg-white/[0.04] transition-all group block ${className}`}
    >
      <div className="flex items-center gap-3 text-gold mb-3">
        <div className="p-2 rounded-full bg-gold/10 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className="text-xs font-accent uppercase tracking-widest">{title}</span>
      </div>
      <p className="text-warm-white/80 font-body text-sm leading-relaxed">{value}</p>
    </a>
  );
}
