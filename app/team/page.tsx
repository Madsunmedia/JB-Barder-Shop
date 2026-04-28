import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TeamStory from "@/components/Team/TeamStory";

export const metadata: Metadata = {
  title: "Our Story & Team | JB Barbershop Lethbridge",
  description: "Learn about our roots in Lethbridge and meet the master barbers dedicated to premium men's grooming.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32">
        <TeamStory />
      </main>

      <Footer />
    </div>
  );
}
