import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services/ServicesSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services | JB Barbershop Lethbridge",
  description: "Explore our premium grooming services: Skin Fades, Beard Sculpts, Hot Towel Shaves, and Luxury Facials. masterfully crafted in Lethbridge.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-32">
        <Services />
      </div>
      <Footer />
    </main>
  );
}
