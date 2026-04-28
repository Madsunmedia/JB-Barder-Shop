"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { useState } from "react";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Team", href: "/#team" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
  { label: "Book Appointment", href: "/book" },
];

const HOURS = [
  { days: "Monday – Saturday", time: "9:00 AM – 8:00 PM" },
  { days: "Sunday", time: "9:00 AM – 7:00 PM" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="relative bg-[#080808] border-t border-white/5 overflow-hidden">
      {/* Subtle top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Watermark */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full text-center"
      >
        <p className="text-[clamp(4rem,18vw,14rem)] font-accent text-white/[0.025] leading-none uppercase whitespace-nowrap translate-y-[20%]">
          JB BARBERSHOP
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 pt-16 md:pt-20 pb-10">

        {/* ── Top Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-14">

          {/* Col 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link href="/" className="inline-flex items-baseline gap-1 group" aria-label="JB Barbershop Home">
              <span className="text-3xl font-accent text-gold tracking-tighter">JB</span>
              <span className="text-xl font-heading text-warm-white group-hover:text-gold transition-colors duration-300">
                Barbershop
              </span>
            </Link>
            <p className="text-warm-white/40 text-sm leading-relaxed max-w-[260px]">
              Premium men&apos;s grooming in Lethbridge. Expert fades, clean lines, and a dedication to the craft since day one.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/ijbbarbershop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JB Barbershop on Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-warm-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300 hover:scale-110"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="space-y-5">
            <h3 className="text-gold font-accent uppercase tracking-[0.2em] text-sm">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-warm-white/50 hover:text-gold text-sm font-body transition-colors duration-200"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-gold"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Visit Us */}
          <div className="space-y-5">
            <h3 className="text-gold font-accent uppercase tracking-[0.2em] text-sm">
              Visit Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://maps.google.com/?q=410+13+Street+North+Lethbridge+Alberta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-warm-white/50 hover:text-gold transition-colors text-sm group"
                  aria-label="Open address in Google Maps"
                >
                  <MapPin
                    size={15}
                    className="text-gold/70 shrink-0 mt-0.5 group-hover:text-gold transition-colors"
                    aria-hidden="true"
                  />
                  <span className="leading-relaxed">
                    410 13 Street North<br />
                    Lethbridge, Alberta T1H 2S2
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+14039297321"
                  className="flex items-center gap-3 text-warm-white/50 hover:text-gold transition-colors text-sm group"
                  aria-label="Call +1 403 929 7321"
                >
                  <Phone size={15} className="text-gold/70 shrink-0 group-hover:text-gold transition-colors" aria-hidden="true" />
                  <span className="font-mono">+1 403 929 7321</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ijbbarbershop@gmail.com"
                  className="flex items-center gap-3 text-warm-white/50 hover:text-gold transition-colors text-sm group"
                  aria-label="Email ijbbarbershop@gmail.com"
                >
                  <Mail size={15} className="text-gold/70 shrink-0 group-hover:text-gold transition-colors" aria-hidden="true" />
                  <span className="break-all">ijbbarbershop@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 — Hours + Newsletter */}
          <div className="space-y-5">
            <h3 className="text-gold font-accent uppercase tracking-[0.2em] text-sm">
              Hours
            </h3>
            <ul className="space-y-3">
              {HOURS.map(({ days, time }) => (
                <li key={days} className="flex items-start gap-2.5">
                  <Clock size={14} className="text-gold/60 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-warm-white/70 text-xs font-mono uppercase tracking-wider leading-snug">{days}</p>
                    <p className="text-warm-white/40 text-xs font-mono">{time}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div className="pt-2 space-y-3">
              <p className="text-warm-white/30 text-xs leading-relaxed">
                Get grooming tips &amp; promos in your inbox.
              </p>
              {isSubscribed ? (
                <p className="text-gold text-xs font-mono uppercase tracking-widest animate-pulse">
                  ✓ You&apos;re on the list!
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    aria-label="Email address for newsletter"
                    className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-warm-white text-sm placeholder:text-white/20 focus:border-gold focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    aria-label="Subscribe to newsletter"
                    className="flex-shrink-0 w-10 h-10 bg-gold text-black rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
                  >
                    <Send size={14} aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="border-t border-white/5" />

        {/* ── Bottom Bar ── */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-warm-white/20 uppercase tracking-[0.15em]">
          <p>© {new Date().getFullYear()} JB Barbershop · All Rights Reserved</p>
          <p className="hidden sm:block">Built with ♥ in Lethbridge, Alberta</p>
          <Link
            href="/book"
            className="text-gold/50 hover:text-gold transition-colors"
          >
            Book Now →
          </Link>
        </div>
      </div>
    </footer>
  );
}
