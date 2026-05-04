import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Classic Hot Towel Shave in Lethbridge | JB Barbershop",
  description: "Experience the ultimate grooming luxury with a traditional hot towel straight razor shave in Lethbridge at JB Barbershop.",
};

export default function HotTowelShavePage() {
  const faqs = [
    { q: "What are the benefits of a hot towel shave?", a: "The hot towel opens up your pores and softens the hair follicles, resulting in a much closer, smoother shave with significantly less irritation than shaving at home." },
    { q: "How long does a hot towel shave take?", a: "A full traditional hot towel shave takes about 30 to 45 minutes. It is designed to be a relaxing, unhurried experience." },
    { q: "Will a straight razor shave cut me?", a: "Our barbers are highly trained professionals. When performed by an expert, a straight razor shave is incredibly safe and smooth." }
  ];

  return (
    <div className="relative bg-[#050505] flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="mb-8">
            <Link href="/" className="text-gold hover:underline text-sm font-accent tracking-widest uppercase mb-4 inline-block">
              &larr; Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-accent text-warm-white uppercase leading-tight mb-6">
              Classic Hot Towel Shave in <span className="text-gold">Lethbridge</span>
            </h1>
            <Image
              src="/hot-towel-shave-lethbridge.jpg"
              alt="Relaxing hot towel straight razor shave in Lethbridge"
              width={800}
              height={500}
              className="w-full h-[400px] object-cover rounded-3xl mb-10 border border-white/5"
            />
          </div>

          <article className="prose prose-invert prose-lg max-w-none font-body text-warm-white/70 mb-16">
            <p>
              In today's fast-paced world, traditional grooming has become a lost art. However, at JB Barbershop, we are keeping the classic barbering traditions alive. If you are looking to treat yourself to the ultimate luxury grooming experience, our <strong>hot towel shave in Lethbridge</strong> is exactly what you need. It's not just about removing hair; it's a therapeutic ritual that leaves you feeling rejuvenated and impeccably clean.
            </p>
            <h2>The Hot Towel Shave Ritual</h2>
            <p>
              The experience begins the moment you lean back in our vintage barber chairs. We start by applying a pre-shave oil to protect your skin and soften the beard. Next comes the signature hot towel—steamed to the perfect temperature. This crucial step opens your pores, relaxes your facial muscles, and further softens the hair cuticles, ensuring the razor glides effortlessly.
            </p>
            <p>
              We then whip up a rich, warm lather of premium shaving cream and apply it with a classic badger hair brush, gently exfoliating the skin in the process. With a remarkably sharp straight razor, our expert barbers carefully shave with the grain of the hair, providing an incredibly close cut without the irritation of multi-blade cartridge razors.
            </p>
            <h2>Why Choose a Straight Razor Shave?</h2>
            <p>
              Shaving at home often leads to razor burn, ingrown hairs, and a shave that just isn't quite close enough. A professional straight razor shave eliminates these issues. Because the hot towels and oils prep the skin so effectively, the single blade of the straight razor cuts the hair cleanly at the surface. 
            </p>
            <p>
              After the shave, we apply a soothing cold towel to close the pores, followed by a premium aftershave balm to hydrate and protect your freshly shaved skin. You will walk out of our shop with the smoothest face you've had in years.
            </p>
            <h2>Book Your Relaxation Session</h2>
            <p>
              Whether it's for your wedding day, a special event, or just a well-deserved treat for yourself, a hot towel shave in Lethbridge is a must-try experience. Relax, unwind, and let our master barbers take care of you. Book your appointment at JB Barbershop today.
            </p>
          </article>

          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl mb-16 text-center">
            <h3 className="text-2xl font-accent text-gold uppercase mb-4">Treat Yourself</h3>
            <p className="text-warm-white/60 mb-6 max-w-lg mx-auto">
              Experience the ultimate relaxation with our traditional hot towel shave. Book your session today.
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
