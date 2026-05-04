import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional Beard Trims in Lethbridge | JB Barbershop",
  description: "Keep your facial hair pristine with our expert beard trims in Lethbridge. We offer shaping, line-ups, and hot towel treatments for the ultimate grooming experience.",
};

export default function BeardTrimPage() {
  const faqs = [
    { q: "What is included in a beard trim?", a: "Our beard trim includes length reduction, bulk removal, precise shaping to suit your face, sharp line-ups on the cheeks and neck, and conditioning with premium beard oils." },
    { q: "Should I wash my beard before coming in?", a: "Yes, arriving with a clean, dry beard helps the barber assess its natural shape and growth patterns better." },
    { q: "Do you use a straight razor for the line-up?", a: "Absolutely. We finish our premium beard trims with a hot lather and a straight razor line-up for the sharpest possible edges." }
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
              Professional Beard Trims in <span className="text-gold">Lethbridge</span>
            </h1>
            <Image
              src="/beard-trim-lethbridge.jpg"
              alt="Professional beard trim and grooming at JB Barbershop in Lethbridge"
              width={800}
              height={500}
              className="w-full h-[400px] object-cover rounded-3xl mb-10 border border-white/5"
            />
          </div>

          <article className="prose prose-invert prose-lg max-w-none font-body text-warm-white/70 mb-16">
            <p>
              Growing a great beard requires patience, but maintaining it requires skill. If your facial hair is starting to look unkempt or you're losing the definition around your jawline, it's time for a professional <strong>beard trim in Lethbridge</strong> at JB Barbershop. We believe a well-groomed beard is the ultimate statement of masculinity and style, and we are dedicated to helping you achieve your best look.
            </p>
            <h2>Sculpting and Shaping to Perfection</h2>
            <p>
              A great beard trim is more than just running clippers over your face. It's about sculpting the hair to complement your unique facial structure. Our experienced Lethbridge barbers know how to taper the sides to slim the face, leave fullness at the chin to elongate the jawline, and create sharp, distinct lines that frame your features perfectly.
            </p>
            <p>
              Whether you're rocking a short corporate scruff, a sharp goatee, or a full lumberjack beard, we tailor our approach to your specific goals. We expertly remove bulk where necessary, tame flyaways, and ensure complete symmetry.
            </p>
            <h2>The Premium Grooming Experience</h2>
            <p>
              When you book a beard trim with us, you're getting a comprehensive grooming treatment. We don't just cut hair; we care for it. We utilize high-quality beard balms, oils, and conditioners to soften the coarse facial hair and hydrate the skin underneath, preventing the dreaded "beard itch" and dandruff.
            </p>
            <p>
              To finish the service, we provide a crisp, clean line-up on the cheeks and neck. For the ultimate luxury, upgrade to include a hot towel and straight razor finish, leaving your edges incredibly sharp and your skin feeling refreshed.
            </p>
            <h2>Lethbridge's Beard Experts</h2>
            <p>
              Don't trust your hard-grown beard to just anyone. Our team has the expertise and the passion to make your facial hair look its absolute best. Book your professional beard trim in Lethbridge today at JB Barbershop and elevate your grooming routine to the next level.
            </p>
          </article>

          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl mb-16 text-center">
            <h3 className="text-2xl font-accent text-gold uppercase mb-4">Tame the Mane</h3>
            <p className="text-warm-white/60 mb-6 max-w-lg mx-auto">
              Ready to sculpt your beard into a masterpiece? Book your professional beard trim today.
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
