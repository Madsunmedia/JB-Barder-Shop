import BookingWizard from "@/components/Booking/BookingWizard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment | JB Barbershop",
  description: "Secure your spot at Lethbridge's premier barbershop. Masterful skin fades, beard grooming, and luxury service at your convenience.",
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* 3D Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:60px_60px]"
          style={{ 
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
            transformOrigin: 'top'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40">
        <header className="mb-16 text-center lg:text-left space-y-4">
           <span className="text-gold font-accent text-xl tracking-[0.4em] uppercase">Experience</span>
           <h1 className="text-7xl md:text-9xl font-accent text-gold uppercase leading-tight">
             Reserve <br /> Your Seat
           </h1>
        </header>

        <BookingWizard />
      </div>

      <Footer />
    </div>
  );
}
