import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Precision Skin Fades in Lethbridge | JB Barbershop",
  description: "Get the sharpest, cleanest skin fade in Lethbridge. Our expert barbers specialize in high, mid, low, and drop fades with seamless blending.",
};

export default function SkinFadesPage() {
  const faqs = [
    { q: "What is a skin fade?", a: "A skin fade is a haircut technique where the hair is cut progressively shorter as it goes down the sides and back, eventually blending smoothly into the bare skin." },
    { q: "How long does a skin fade take?", a: "A high-quality skin fade requires precision and time, usually taking around 45 minutes to an hour to ensure a flawless blend." },
    { q: "How often should I get my skin fade touched up?", a: "To maintain that crisp, clean look, we recommend getting a touch-up every 1 to 2 weeks." }
  ];

  return (
    <div className="relative bg-[#050505] flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="mb-8">
            <Link href="/" className="text-gold hover:underline text-sm font-accent tracking-widest uppercase mb-4 inline-block">
              &larr; Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-accent text-warm-white uppercase leading-tight mb-6">
              Precision Skin Fades in <span className="text-gold">Lethbridge</span>
            </h1>
            <Image
              src="/skin-fade-lethbridge.jpg"
              alt="Detailed skin fade haircut in Lethbridge barbershop"
              width={800}
              height={500}
              className="w-full h-[400px] object-cover rounded-3xl mb-10 border border-white/5"
            />
          </div>

          <article className="prose prose-invert prose-lg max-w-none font-body text-warm-white/70 mb-16">
            <p>
              If you're searching for the sharpest, most flawless <strong>skin fade in Lethbridge</strong>, you've found the right place. A skin fade—also known as a bald fade—is one of the most requested and highly technical haircuts in modern barbering. It requires a steady hand, meticulous attention to detail, and a deep understanding of hair blending techniques. At JB Barbershop, our barbers have mastered the art of the fade.
            </p>
            <h2>The Art of the Seamless Blend</h2>
            <p>
              A true skin fade is defined by its seamless transition. There should be no visible lines or harsh steps where the hair length changes. Our Lethbridge barbers use premium clippers, foils, and straight razors to achieve a buttery-smooth gradient that transitions perfectly from bare skin to your desired length on top.
            </p>
            <p>
              We specialize in all variations of fades to suit your face shape and personal style:
            </p>
            <ul>
              <li><strong>High Fade:</strong> Starts high up on the head, creating a strong contrast and a bold, sharp look.</li>
              <li><strong>Mid Fade:</strong> The gold standard. Starts around the temples and dips slightly around the back for a balanced, classic appearance.</li>
              <li><strong>Low Fade:</strong> Starts low above the ears and neck, offering a more conservative but impeccably clean finish.</li>
              <li><strong>Drop Fade:</strong> The fade arc drops behind the ear, creating a stylish, modern silhouette.</li>
            </ul>
            <h2>Why Choose JB Barbershop for Your Fade?</h2>
            <p>
              Not every barber can execute a perfect skin fade. It is a highly specialized skill that requires ongoing training and immense patience. When you visit our Lethbridge barbershop, you are sitting in the chair of a professional who treats fading as an art form. We take our time to ensure both sides are perfectly symmetrical and the transition is flawless under all lighting.
            </p>
            <p>
              Beyond the fade itself, we pay equal attention to the top of your hair. Whether you pair your skin fade with a textured crop, a slick back, a pompadour, or a buzz cut, we ensure the entire haircut works in harmony to elevate your look.
            </p>
            <h2>Book Your Skin Fade in Lethbridge</h2>
            <p>
              Experience the confidence that comes with a truly pristine haircut. If you want a skin fade in Lethbridge that turns heads and commands respect, book an appointment at JB Barbershop today. Walk out feeling fresh, sharp, and ready to take on the world.
            </p>
          </article>

          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl mb-16 text-center">
            <h3 className="text-2xl font-accent text-gold uppercase mb-4">Get the Sharpest Fade</h3>
            <p className="text-warm-white/60 mb-6 max-w-lg mx-auto">
              Our schedules fill fast. Book your skin fade today and experience Lethbridge's finest barbering.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-accent text-lg uppercase tracking-wider rounded-full hover:scale-105 transition-transform"
            >
              Book Now <ArrowRight size={18} />
            </Link>
          </div>

          <div>
            <h3 className="text-3xl font-accent text-warm-white uppercase mb-8">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                  <h4 className="font-accent text-gold text-lg tracking-wide mb-2">{faq.q}</h4>
                  <p className="text-warm-white/70 font-body text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
