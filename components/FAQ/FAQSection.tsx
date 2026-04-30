"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How much is a men’s haircut in Lethbridge?",
    answer: "Our standard men's haircut starts at $35. We also offer premium services like skin fades and beard trims at competitive prices."
  },
  {
    question: "Do you offer skin fades?",
    answer: "Yes, our barbers specialize in seamless, precision skin fades. It's one of our most popular services in Lethbridge."
  },
  {
    question: "Do I need an appointment?",
    answer: "While we do accept walk-ins when available, we highly recommend booking an appointment online to secure your preferred time and barber."
  },
  {
    question: "Do you do beard trims?",
    answer: "Absolutely. We offer professional beard trims, sculpting, and hot towel shaves to keep your facial hair looking pristine."
  },
  {
    question: "What are your hours?",
    answer: "We are open Monday through Saturday from 9:00 AM to 8:00 PM, and Sunday from 9:00 AM to 7:00 PM."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="relative py-20 bg-black border-t border-white/5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-5 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-accent text-warm-white uppercase">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus:bg-white/[0.04] transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-accent text-warm-white text-lg tracking-wide">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-gold transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-warm-white/60 font-body text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
