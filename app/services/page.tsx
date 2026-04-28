import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FullServicesMenu from "@/components/Services/FullServicesMenu";
import Link from "next/link";
import { ArrowRight, Scissors } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Pricing | JB Barbershop Lethbridge",
  description: "Explore our complete menu of premium grooming services: Skin Fades, Beard Sculpts, Hot Towel Shaves, and Luxury Facials.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      <Navbar />
      
      <main className="flex-grow pb-32">
        {/* Services Page Header */}
        <section className="relative pt-40 pb-20 px-5 md:px-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#C9A84C_0%,transparent_70%)] opacity-[0.05] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-mono uppercase tracking-[0.25em]">
              <Scissors size={12} className="rotate-45" />
              The Menu
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-accent text-warm-white uppercase leading-[0.9] tracking-tight">
              Craftsmanship <br className="hidden md:block" />
              <span className="text-gold">Defined</span>
            </h1>
            <p className="text-warm-white/50 font-body text-base md:text-lg max-w-2xl mx-auto">
              Every cut is a statement. Explore our full range of premium grooming services tailored for the modern gentleman. Walk-ins welcome, appointments preferred.
            </p>
          </div>
        </section>

        {/* The Full Menu */}
        <section className="px-5 md:px-10">
          <FullServicesMenu />
        </section>

        {/* Bottom CTA */}
        <section className="mt-32 px-5 md:px-10">
          <div className="max-w-4xl mx-auto p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <h2 className="text-4xl md:text-5xl font-accent text-warm-white uppercase">
              Ready to look your best?
            </h2>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3.5 bg-gold text-black font-accent text-lg rounded-full shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_36px_rgba(201,168,76,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Book Appointment <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
