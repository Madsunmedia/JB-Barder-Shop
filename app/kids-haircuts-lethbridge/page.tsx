import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Stylish Kids Haircuts in Lethbridge | JB Barbershop",
  description: "Looking for a patient, skilled barber for your child? We offer the best kids haircuts in Lethbridge in a fun, family-friendly environment.",
};

export default function KidsHaircutsPage() {
  const faqs = [
    { q: "At what age do you start cutting kids' hair?", a: "We provide haircuts for children of all ages, provided they are able to sit safely in the barber chair." },
    { q: "How do you handle kids who are scared of haircuts?", a: "Our barbers are highly patient and experienced with children. We take our time, explain the tools to them, and ensure the environment is calm and welcoming." },
    { q: "Can my child get a fade or a design?", a: "Yes! We specialize in modern styles, including skin fades, hard parts, and trendy crops for kids. We can make them look just as stylish as dad." }
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
              Stylish Kids Haircuts in <span className="text-gold">Lethbridge</span>
            </h1>
            <Image
              src="/kids-haircuts-lethbridge.jpg"
              alt="Child getting a fresh haircut at JB Barbershop in Lethbridge"
              width={800}
              height={500}
              className="w-full h-[400px] object-cover rounded-3xl mb-10 border border-white/5"
            />
          </div>

          <article className="prose prose-invert prose-lg max-w-none font-body text-warm-white/70 mb-16">
            <p>
              Finding a barber who is both highly skilled and great with children can be a challenge. At JB Barbershop, we pride ourselves on offering the best <strong>kids haircuts in Lethbridge</strong>. We understand that a barbershop can be intimidating for young children, which is why we go out of our way to create a welcoming, fun, and completely stress-free environment for both parents and kids.
            </p>
            <h2>Patience, Care, and Style</h2>
            <p>
              A child's haircut requires an extra level of patience and care. Our Lethbridge barbers are experienced in dealing with squirmy toddlers and kids who might be nervous about the clippers. We take the time to build rapport with your child, ensuring they feel safe and comfortable before we begin cutting.
            </p>
            <p>
              But just because they're kids doesn't mean they shouldn't look sharp! Gone are the days of the standard "bowl cut." Today's kids want style, and we deliver. From classic, easy-to-manage styles for school to trendy skin fades, hard parts, and textured crops, we execute kids' haircuts with the same precision and detail as our adult services.
            </p>
            <h2>A Family-Friendly Barbershop in Lethbridge</h2>
            <p>
              JB Barbershop is built on community and family values. We love seeing fathers and sons come in together for their regular grooming routines. It's a great bonding experience and introduces young men to the tradition of the barbershop early on. 
            </p>
            <p>
              We maintain a clean, respectful, and family-appropriate atmosphere at all times. You can rest assured knowing your child is in good hands and in a great environment.
            </p>
            <h2>Book Your Child's Haircut Today</h2>
            <p>
              Make haircut day something your child actually looks forward to. If you need a stylish, high-quality kids haircut in Lethbridge, book an appointment with our patient and talented barbers today. We guarantee they'll leave the chair smiling and looking fantastic.
            </p>
          </article>

          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl mb-16 text-center">
            <h3 className="text-2xl font-accent text-gold uppercase mb-4">Book For Your Little Man</h3>
            <p className="text-warm-white/60 mb-6 max-w-lg mx-auto">
              Secure a spot for your child today and experience a stress-free, stylish kids haircut.
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
