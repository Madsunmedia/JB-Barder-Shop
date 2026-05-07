"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Phone, Star, MapPin, Clock, Zap, CheckCircle2 } from "lucide-react";
import { track } from "@vercel/analytics";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-center overflow-hidden bg-[#050505] pt-24 pb-20 lg:pt-32 lg:pb-24"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[80px] md:blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[70px] md:blur-[100px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-8 items-center">
        
        {/* ── Left Column: Content ── */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1">
          
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-5 md:mb-6 px-4 py-2 rounded-full border border-gold/25 bg-gold/5 text-gold text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Lethbridge&apos;s Premier Barbershop
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-heading-clamp text-[clamp(2.25rem,8vw,4rem)] font-accent text-warm-white uppercase tracking-tight leading-[1.05] mb-5 md:mb-6"
          >
            Premium Men&apos;s Haircuts in Lethbridge That <span className="text-gold">Actually Look Sharp</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-warm-white/70 font-body text-sm md:text-lg leading-relaxed max-w-xl mb-8 md:mb-10"
          >
            Skin fades, beard trims, hot towel shaves, and precision cuts — done right the first time.
          </motion.p>

          {/* CTA Buttons — inline on sm+, sticky bar on xs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden xs:flex sm:flex flex-col xs:flex-row sm:flex-row items-stretch xs:items-center gap-3 md:gap-4 mb-8 md:mb-10"
          >
            <Link
              href="/book"
              onClick={() => track("book_now_click", { location: "hero_primary" })}
              className="flex-1 sm:flex-none sm:w-auto px-8 py-4 bg-gold text-black font-accent text-lg uppercase tracking-widest rounded-xl shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center text-center"
            >
              Book Now
            </Link>
            <a
              href="tel:+14039425332"
              className="flex-1 sm:flex-none sm:w-auto px-8 py-4 border border-white/20 bg-black/50 backdrop-blur-md text-warm-white font-accent text-lg uppercase tracking-widest rounded-xl hover:bg-white/5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 text-center"
            >
              <Phone size={18} className="text-gold" aria-hidden="true" />
              Call Now
            </a>
          </motion.div>

          {/* Trust Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 p-4 md:p-5 rounded-2xl glass border border-white/5 bg-white/[0.02]"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" aria-hidden="true" />)}
              </div>
              <span className="text-xs font-body text-warm-white/80"><strong>5.0</strong> Rating</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <MapPin size={15} className="text-gold" aria-hidden="true" />
              <span className="text-xs font-body text-warm-white/80">Lethbridge, AB</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <Clock size={15} className="text-gold" aria-hidden="true" />
              <span className="text-xs font-body text-warm-white/80">Open Today</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <Zap size={15} className="text-gold fill-gold/20" aria-hidden="true" />
              <span className="text-[10px] font-accent uppercase tracking-wider text-warm-white/80 leading-tight">
                Same-Day<br/>Bookings
              </span>
            </div>
          </motion.div>

          {/* Micro Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-5 md:mt-6 flex items-center gap-2 text-xs text-warm-white/40 font-body"
          >
            <CheckCircle2 size={14} className="text-green-500" />
            Trusted by 500+ clients in Lethbridge
          </motion.div>

        </div>

        {/* ── Right Column: Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
          className="lg:col-span-6 relative w-full aspect-[4/3] sm:aspect-square lg:aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 group order-1 lg:order-2"
        >
          <Image
            src="/hero-haircut-sharp.jpg"
            alt="Barber performing a precision skin fade haircut in Lethbridge"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[8s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/0 to-black/0" />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
          
          {/* Floating badge */}
          <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 glass px-3 md:px-4 py-2 md:py-3 rounded-xl border border-white/10 flex items-center gap-2 md:gap-3 backdrop-blur-md">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gold animate-ping" />
            </div>
            <div>
              <p className="text-[9px] md:text-[10px] font-mono text-gold uppercase tracking-widest">Master Barbers</p>
              <p className="text-xs font-accent text-warm-white uppercase tracking-wider">Precision Cuts</p>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ── Sticky CTA bar — only on tiny phones (< 480px) ── */}
      <div className="hero-cta-mobile xs:hidden">
        <Link
          href="/book"
          onClick={() => track("book_now_click", { location: "hero_sticky" })}
          className="flex-1 flex items-center justify-center py-3.5 bg-gold text-black font-accent text-base uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(201,168,76,0.3)] active:scale-95 transition-all"
        >
          Book Now
        </Link>
        <a
          href="tel:+14039425332"
          className="flex items-center justify-center w-14 py-3.5 border border-white/20 bg-black/50 rounded-xl text-gold active:scale-95 transition-all"
          aria-label="Call us"
        >
          <Phone size={20} />
        </a>
      </div>

      {/* Spacer so content doesn't hide behind sticky bar on tiny phones */}
      <div className="hero-cta-spacer" aria-hidden="true" />
    </section>
  );
}
