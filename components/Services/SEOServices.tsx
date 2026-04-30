"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const seoServices = [
  {
    title: "Men's Haircuts",
    href: "/mens-haircuts-lethbridge",
    description: "Looking for the best men's haircuts in Lethbridge? Our expert barbers are highly trained in all styles, from classic gentleman's cuts to modern textured crops. We take the time to understand your hair type and face shape, ensuring you leave our Lethbridge barbershop looking your absolute best. Whether you need a quick clean-up for the office or a complete transformation, we deliver precision and style in every single cut. Experience top-tier grooming and step out with confidence.",
  },
  {
    title: "Skin Fades",
    href: "/skin-fade-lethbridge",
    description: "Achieve the sharpest look with a flawless skin fade in Lethbridge. Our barbers specialize in seamless blending, transitioning perfectly from skin to your desired length on top. A great skin fade requires a steady hand, meticulous attention to detail, and top-of-the-line clippers, all of which you will find at JB Barbershop. Whether it's a high, mid, low, or drop fade, we are Lethbridge's premier destination for crisp, clean fades that turn heads and keep you looking fresh.",
  },
  {
    title: "Beard Trims",
    href: "/beard-trim-lethbridge",
    description: "Keep your facial hair looking pristine with our professional beard trims in Lethbridge. From full lumberjack beards to sharp corporate scruff, we expertly sculpt, line up, and shape your beard to compliment your features. We use premium oils and hot towels to soften the hair, ensuring a clean and comfortable trim. Don't let an unruly beard hide your jawline. Visit our Lethbridge shop and let us transform your beard into a masterpiece of modern grooming.",
  },
  {
    title: "Hot Towel Shaves",
    href: "/hot-towel-shave-lethbridge",
    description: "Treat yourself to the ultimate relaxation with a traditional hot towel shave in Lethbridge. Experience the lost art of the straight razor shave, complete with steamy hot towels, rich lather, and a precision shave that leaves your skin incredibly smooth. It's more than just a shave; it's a therapeutic grooming ritual right here in Lethbridge. Step back in time and enjoy this luxurious service that will leave you feeling rejuvenated, sharp, and impeccably clean.",
  },
  {
    title: "Kids Haircuts",
    href: "/kids-haircuts-lethbridge",
    description: "Finding a patient and skilled barber for children can be tough, but our kids haircuts in Lethbridge make the process a breeze. We provide a welcoming, fun environment to keep your little ones comfortable while delivering a sharp, stylish cut. From classic boys' styles to trendy fades, we handle it all with care and expertise. Make haircut day something your kids actually look forward to by visiting the most family-friendly barbershop in Lethbridge.",
  }
];

export default function SEOServices() {
  return (
    <section className="relative py-20 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-accent text-warm-white uppercase">
            Premium Grooming <span className="text-gold">Services</span>
          </h2>
          <p className="mt-4 text-warm-white/60 font-body max-w-2xl mx-auto">
            Discover why we are Lethbridge&apos;s top choice for men&apos;s grooming.
          </p>
        </div>

        <div className="space-y-12">
          {seoServices.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-accent text-gold uppercase tracking-wider">
                  {service.title}
                </h3>
                <p className="text-warm-white/70 font-body leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-accent text-sm uppercase tracking-wider rounded-full hover:scale-105 transition-transform"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold font-accent text-sm uppercase tracking-wider rounded-full hover:bg-gold/10 transition-colors"
                  >
                    Book Now <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
