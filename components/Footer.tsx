"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setIsSubscribed(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter error:", error);
    }
  };

  return (
    <footer className="relative bg-[#050505] pt-40 pb-12 overflow-hidden">
      {/* 3D Perspective Shelf Effect Container */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent" />
      
      {/* Giant Watermark Logo */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <h2 className="text-[10rem] md:text-[20rem] font-accent text-warm-white opacity-[0.05] leading-none uppercase whitespace-nowrap">
          JB BARBERSHOP
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand & Social */}
          <div className="space-y-8">
            <Link href="/" className="flex items-baseline gap-1 group">
              <span className="text-4xl font-accent text-gold tracking-tighter">JB</span>
              <span className="text-2xl font-heading text-warm-white">Barbershop</span>
            </Link>
            <p className="text-warm-white/40 font-body text-sm leading-relaxed">
              Premium men&apos;s grooming in Lethbridge. Masterful cuts, clean fades, and a dedication to the craft.
            </p>
            <div className="flex gap-4">
               <SocialIcon icon={<InstagramIcon />} href="https://instagram.com/ijbbarbershop" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-gold font-accent uppercase tracking-widest text-lg">Quick Links</h4>
            <ul className="space-y-4">
              <FooterLink href="/#services">Services</FooterLink>
              <FooterLink href="/gallery">Gallery</FooterLink>
              <FooterLink href="/book">Book Now</FooterLink>
              <FooterLink href="/#team">Our Team</FooterLink>
              <FooterLink href="/#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Shop Info */}
          <div className="space-y-8">
            <h4 className="text-gold font-accent uppercase tracking-widest text-lg">Visit Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-warm-white/60 text-sm">
                <MapPin size={18} className="text-gold shrink-0" />
                <span>410 13 Street North, Lethbridge, Alberta T1H 2S2</span>
              </li>
              <li className="flex items-center gap-4 text-warm-white/60 text-sm">
                <Phone size={18} className="text-gold shrink-0" />
                <span>+1 403 929 7321</span>
              </li>
              <li className="flex items-center gap-4 text-warm-white/60 text-sm">
                <Mail size={18} className="text-gold shrink-0" />
                <span>ijbbarbershop@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-gold font-accent uppercase tracking-widest text-lg">Newsletter</h4>
            <p className="text-warm-white/40 font-body text-sm">Get grooming tips & promos delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="space-y-4">
               <div className="relative">
                  <input 
                    required
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl py-4 px-6 text-warm-white focus:border-gold outline-none transition-colors"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold text-black rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
                     <Send size={18} />
                  </button>
               </div>
               {isSubscribed && <p className="text-gold text-xs font-mono uppercase animate-pulse">Welcome to the inner circle!</p>}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-warm-white/20 uppercase tracking-[0.2em]">
           <p>© 2026 JB Barbershop · All Rights Reserved</p>
           <p>Built with ❤️ in Lethbridge</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: any) {
  return (
    <a 
      href={href} 
      target="_blank" 
      className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-black hover:scale-110 transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FooterLink({ href, children }: any) {
  return (
    <li>
      <Link href={href} className="text-warm-white/40 hover:text-gold transition-colors text-sm font-body">
        {children}
      </Link>
    </li>
  );
}
