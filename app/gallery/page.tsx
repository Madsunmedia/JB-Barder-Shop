import GalleryGrid from "@/components/Gallery/GalleryGrid";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Background Text Effect */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
        <h1 className="text-[15rem] md:text-[30rem] font-accent text-warm-white opacity-[0.04] uppercase leading-none whitespace-nowrap">
          THE WORK THE WORK
        </h1>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 pt-32 pb-40">
        <header className="mb-20 space-y-4">
          <span className="text-gold font-accent text-xl tracking-[0.4em] uppercase">Portfolio</span>
          <h2 className="text-7xl md:text-9xl font-accent text-gold uppercase leading-tight">
            Excellence <br /> Defined
          </h2>
        </header>

        <GalleryGrid images={INITIAL_IMAGES} />
      </div>

      <Footer />
    </div>
  );
}
