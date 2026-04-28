import GalleryGrid from "@/components/Gallery/GalleryGrid";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Gallery | JB Barbershop",
  description: "A showcase of premium men's grooming, flawless skin fades, and master beard sculpts at JB Barbershop Lethbridge.",
};

const INITIAL_IMAGES = [
  { id: "1", url: "https://images.setmore.com/files/img/fHojFxrwtQlT/a052e4b5-2857-401c-8c59-7fc5ffede608.jpeg", tag: "SKIN FADE" },
  { id: "2", url: "https://images.setmore.com/files/img/fegewePUKX8i/eee1f638-e365-45c4-9b9f-1a28aa71d850.jpeg", tag: "BEARD SCULPT" },
  { id: "3", url: "https://images.setmore.com/files/img/fQFMVUpN2dse/e6f60101-6beb-4155-bbca-8fb578d98aca.jpeg", tag: "PRECISION CUT" },
  { id: "4", url: "https://images.setmore.com/files/img/fQn5HfL88IzB/381efa2e-cdf8-4db4-84f2-c97795f4e009.jpeg", tag: "LUXURY SHAVE" },
  { id: "5", url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop", tag: "CLASSIC" },
  { id: "6", url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2070&auto=format&fit=crop", tag: "BEARD TRIM" },
  { id: "7", url: "https://images.unsplash.com/photo-1621605815841-aa33c5cc70a9?q=80&w=2070&auto=format&fit=crop", tag: "FADE" },
  { id: "8", url: "https://images.unsplash.com/photo-1512690196252-75aa30164965?q=80&w=2070&auto=format&fit=crop", tag: "STYLE" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col overflow-hidden">
      <Navbar />

      {/* Background Text Effect */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[10rem] md:text-[20rem] font-accent text-warm-white opacity-[0.03] uppercase leading-none whitespace-nowrap">
          THE WORK THE WORK
        </h1>
      </div>

      <main className="flex-grow relative z-10 w-full pt-32 pb-20">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto px-5 md:px-10 mb-12 md:mb-20 text-center md:text-left space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-mono uppercase tracking-[0.25em] mx-auto md:mx-0">
            <ImageIcon size={12} />
            Portfolio
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-accent text-warm-white uppercase leading-[0.9] tracking-tight">
            Excellence <br className="hidden md:block" />
            <span className="text-gold">Defined</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="max-w-[1600px] mx-auto px-5 md:px-10">
          <GalleryGrid images={INITIAL_IMAGES} />
        </div>

        {/* Bottom CTA */}
        <section className="mt-32 max-w-4xl mx-auto px-5 md:px-10">
          <div className="p-10 md:p-16 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <h2 className="text-4xl md:text-5xl font-accent text-warm-white uppercase">
              See a style you like?
            </h2>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3.5 bg-gold text-black font-accent text-lg rounded-full shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_36px_rgba(201,168,76,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Book Your Cut <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
