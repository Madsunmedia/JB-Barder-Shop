import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Men's Haircuts in Lethbridge | JB Barbershop",
  description: "Looking for top-tier men's haircuts in Lethbridge? Our expert barbers deliver classic cuts, modern styles, and precision grooming. Book your appointment today.",
};

export default function MensHaircutsPage() {
  const faqs = [
    { q: "How much is a men's haircut?", a: "Our standard men's haircut starts at $35. Prices may vary slightly depending on the exact style and additions like a beard trim." },
    { q: "How long does a haircut take?", a: "A standard men's haircut typically takes about 30 to 45 minutes, ensuring we have enough time to perfect every detail." },
    { q: "Do you wash hair before cutting?", a: "Yes, we offer hair washing services to ensure your hair is clean and manageable before we start the cut." }
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
              Best Men&apos;s Haircuts in <span className="text-gold">Lethbridge</span>
            </h1>
            <Image
              src="/mens-haircut-lethbridge.jpg"
              alt="Professional men's haircut at a barbershop in Lethbridge"
              width={800}
              height={500}
              className="w-full h-[400px] object-cover rounded-3xl mb-10 border border-white/5"
            />
          </div>

          <article className="prose prose-invert prose-lg max-w-none font-body text-warm-white/70 mb-16">
            <p>
              When it comes to finding the perfect <strong>men's haircuts in Lethbridge</strong>, quality and precision matter. Your hair is an extension of your personal brand, and a great haircut can elevate your confidence and style. At JB Barbershop, we take grooming seriously. We combine traditional barbering techniques with modern trends to deliver cuts that not only look fantastic when you leave the chair but also grow out perfectly until your next visit.
            </p>
            <h2>Expert Barbers Tailoring to Your Style</h2>
            <p>
              Every head of hair is different, and every man has his own unique style preferences. Our team of highly skilled barbers in Lethbridge takes the time to consult with you before the clippers even turn on. Whether you're looking for a classic gentleman's side part, a modern textured crop, a slick pompadour, or just a simple buzz cut, we have the expertise to execute it flawlessly.
            </p>
            <p>
              We consider factors such as your face shape, hair density, growth patterns, and lifestyle. A haircut shouldn't require an hour of styling every morning unless you want it to. We aim to provide men's haircuts in Lethbridge that are tailored to be both stylish and manageable.
            </p>
            <h2>The JB Barbershop Experience</h2>
            <p>
              Getting a haircut shouldn't feel like a chore; it should be an experience. From the moment you walk into our Lethbridge barbershop, you'll be greeted with a welcoming atmosphere. We pride ourselves on creating a space where men can relax, enjoy good conversation, and receive top-tier grooming services.
            </p>
            <p>
              We use only the highest quality tools and grooming products, ensuring that your hair and scalp are treated with care. After your cut, our barbers will style your hair using premium products and show you exactly how to achieve the same look at home. We also offer expert advice on hair care and product selection tailored to your specific hair type.
            </p>
            <h2>Book Your Men's Haircut in Lethbridge Today</h2>
            <p>
              Don't settle for a mediocre haircut. Experience the difference that passion, skill, and attention to detail make. If you're searching for the finest men's haircuts in Lethbridge, look no further than JB Barbershop. Our schedule fills up quickly, so we highly recommend booking in advance.
            </p>
          </article>

          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl mb-16 text-center">
            <h3 className="text-2xl font-accent text-gold uppercase mb-4">Ready for an Upgrade?</h3>
            <p className="text-warm-white/60 mb-6 max-w-lg mx-auto">
              Secure your spot with one of our master barbers today. Experience the best men's grooming in Lethbridge.
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
