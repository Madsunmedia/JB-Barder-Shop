"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Team", href: "#team" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out px-6 md:px-12 ${
          isScrolled ? "py-3 glass" : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 group">
            <span className="text-3xl font-accent text-gold tracking-tighter">JB</span>
            <span className="text-xl font-heading text-warm-white group-hover:text-gold transition-colors duration-300">
              Barbershop
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-body text-warm-white/70 hover:text-gold uppercase tracking-widest transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+14039297321"
              className="flex items-center gap-2 text-warm-white/80 hover:text-gold transition-colors"
            >
              <Phone size={16} className="text-gold" />
              <span className="text-sm font-mono">+1 403 929 7321</span>
            </a>
            <Link
              href="https://jbbarbershopdsoo.setmore.com/book"
              target="_blank"
              className="px-6 py-2 bg-gold text-black font-accent text-lg rounded-full shadow-[0_0_15px_rgba(201,168,76,0.4)] hover:shadow-[0_0_25px_rgba(201,168,76,0.6)] hover:scale-105 transition-all duration-300"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-warm-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={32} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-black-primary flex flex-col items-center justify-center gap-8 p-12"
          >
            <button
              className="absolute top-8 right-8 text-warm-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={40} />
            </button>

            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-accent text-gold uppercase"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              href="https://jbbarbershopdsoo.setmore.com/book"
              target="_blank"
              className="mt-8 px-10 py-4 bg-gold text-black font-accent text-2xl rounded-full"
            >
              BOOK NOW
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
