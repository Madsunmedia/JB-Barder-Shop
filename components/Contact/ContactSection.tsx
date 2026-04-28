"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const mtTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Edmonton",
        hour: "numeric",
        hour12: false,
        day: "numeric",
      }).formatToParts(now);
      
      const hour = parseInt(mtTime.find(p => p.type === "hour")?.value || "0");
      const day = now.getDay();

      if (day === 0) {
        setIsOpen(hour >= 9 && hour < 19);
      } else {
        setIsOpen(hour >= 9 && hour < 20);
      }
    };
    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      }
    } catch (error) {
      console.error("Contact error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-40 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Panel - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-12 rounded-3xl border border-gold/20 shadow-2xl relative z-10 translate-z-10"
            style={{ transform: "perspective(1000px) rotateY(5deg)" }}
          >
            <h2 className="text-5xl font-accent text-gold uppercase mb-8">Get In Touch</h2>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20 space-y-4"
              >
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto text-gold">
                   <Send size={40} />
                </div>
                <h3 className="text-3xl font-accent text-gold uppercase">Message Sent!</h3>
                <p className="text-warm-white/60">We&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setIsSuccess(false)} className="text-gold underline font-mono text-sm uppercase mt-8">Send another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Full Name</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Email Address</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Service Interested In</label>
                  <select className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors appearance-none cursor-pointer">
                    <option>Select a service</option>
                    <option>Skin Fade</option>
                    <option>Beard Sculpting</option>
                    <option>Full Grooming</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-accent text-gold uppercase tracking-widest">Your Message</label>
                  <textarea rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors resize-none" />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full py-5 bg-gold text-black font-accent text-2xl uppercase rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right Panel - Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard 
                icon={<MapPin size={20} />} 
                title="Address" 
                value="410 13 Street North, Lethbridge" 
                href="https://maps.google.com/?q=410+13+Street+North+Lethbridge"
              />
              <InfoCard 
                icon={<Phone size={20} />} 
                title="Phone" 
                value="+1 403 929 7321" 
                href="tel:+14039297321"
              />
              <InfoCard 
                icon={<Mail size={20} />} 
                title="Email" 
                value="ijbbarbershop@gmail.com" 
                href="mailto:ijbbarbershop@gmail.com"
              />
              <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div className="flex items-center gap-4 text-gold mb-2">
                  <Clock size={20} />
                  <span className="text-[10px] font-accent uppercase tracking-widest">Shop Hours</span>
                </div>
                <div className="flex justify-between items-center">
                   <div className="text-warm-white/60 text-xs font-mono">Mon–Sat: 9AM–8PM <br /> Sun: 9AM–7PM</div>
                   <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-accent ${isOpen ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
                      {isOpen ? "OPEN NOW" : "CLOSED"}
                   </div>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2551.488334464875!2d-112.82528732342981!3d51.2687103717585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x536e61f887550f21%3A0x6b4f7a2b9c8d5e4!2s410%2013%20St%20N%2C%20Lethbridge%2C%20AB%20T1H%202S2%2C%20Canada!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 pointer-events-none border border-gold/10 rounded-3xl" />
              {/* Pulsing Pin Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                 <div className="relative">
                    <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-75" />
                    <div className="relative w-4 h-4 bg-gold rounded-full border-2 border-black" />
                 </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, value, href }: any) {
  return (
    <a 
      href={href} 
      target="_blank" 
      className="glass p-6 rounded-2xl border border-white/10 hover:border-gold/40 transition-all group block"
    >
      <div className="flex items-center gap-4 text-gold mb-2 group-hover:scale-110 transition-transform origin-left">
        {icon}
        <span className="text-[10px] font-accent uppercase tracking-widest">{title}</span>
      </div>
      <p className="text-warm-white/80 font-body text-sm leading-tight">{value}</p>
    </a>
  );
}
