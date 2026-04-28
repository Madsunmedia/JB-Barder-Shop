import BookingWizard from "@/components/Booking/BookingWizard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { CalendarCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Book Appointment | JB Barbershop",
  description: "Secure your spot at Lethbridge's premier barbershop. Masterful skin fades, beard grooming, and luxury service at your convenience.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col overflow-hidden">
      <Navbar />
      
      {/* Background Effect */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:48px_48px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#050505_0%,transparent_100%)]" />
      </div>

      <main className="flex-grow relative z-10 w-full pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          
          <header className="mb-12 md:mb-16 text-center md:text-left space-y-4">
             <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-mono uppercase tracking-[0.25em] mx-auto md:mx-0">
               <CalendarCheck size={12} />
               Experience
             </span>
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-accent text-warm-white uppercase leading-[0.9] tracking-tight">
               Reserve <br className="hidden md:block" />
               <span className="text-gold">Your Seat</span>
             </h1>
          </header>

          <BookingWizard />
        </div>
      </main>

      <Footer />
    </div>
  );
}
