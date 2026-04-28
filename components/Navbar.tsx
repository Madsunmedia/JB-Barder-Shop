"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, Scissors } from "lucide-react";
import { track } from "@vercel/analytics";

const NAV_LINKS = [
  { name: "Services", href: "/#services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Team", href: "/#team" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/gallery") return pathname === "/gallery";
    if (href === "/book") return pathname === "/book";
    return false;
  };

  return (
    <>
      {/* ─── Desktop & Mobile Bar ─── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
          isScrolled
            ? "py-3 bg-black/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20"
            : "py-5 md:py-7 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group flex-shrink-0"
            aria-label="JB Barbershop — Home"
          >
            <Scissors
              size={20}
              className="text-gold rotate-45 group-hover:rotate-[135deg] transition-transform duration-500"
              aria-hidden="true"
            />
            <div className="flex items-baseline gap-[3px]">
              <span className="text-2xl md:text-3xl font-accent text-gold tracking-tighter leading-none">
                JB
              </span>
              <span className="text-base md:text-lg font-heading text-warm-white group-hover:text-gold transition-colors duration-300 leading-none">
                Barbershop
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-body uppercase tracking-[0.15em] transition-colors duration-300 relative group ${
                  isActiveLink(link.href)
                    ? "text-gold"
                    : "text-warm-white/60 hover:text-gold"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                    isActiveLink(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop Right: Phone + CTA */}
          <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
            <a
              href="tel:+14039297321"
              className="flex items-center gap-2 text-warm-white/70 hover:text-gold transition-colors duration-300 min-h-[44px]"
              aria-label="Call JB Barbershop"
            >
              <Phone size={14} className="text-gold flex-shrink-0" aria-hidden="true" />
              <span className="text-xs font-mono tracking-wider whitespace-nowrap">+1 403 929 7321</span>
            </a>
            <Link
              href="/book"
              onClick={() => track("book_now_click", { location: "navbar_desktop" })}
              className="min-h-[44px] px-5 py-2 bg-gold text-black font-accent text-base rounded-full shadow-[0_0_14px_rgba(201,168,76,0.35)] hover:shadow-[0_0_24px_rgba(201,168,76,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile right: Phone icon + Hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:+14039297321"
              aria-label="Call us"
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-gold hover:border-gold/40 transition-colors"
            >
              <Phone size={16} aria-hidden="true" />
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-warm-white hover:border-gold/40 hover:text-gold transition-colors"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Full-Screen Menu ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[108] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 z-[110] w-[min(85vw,340px)] bg-[#0d0d0d] border-l border-white/5 flex flex-col overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-baseline gap-1"
                >
                  <span className="text-2xl font-accent text-gold tracking-tighter">JB</span>
                  <span className="text-base font-heading text-warm-white">Barbershop</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-warm-white hover:border-gold/40 hover:text-gold transition-colors"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 py-4 text-2xl font-accent uppercase tracking-wider border-b border-white/5 transition-colors duration-200 ${
                        isActiveLink(link.href) ? "text-gold" : "text-warm-white/80 hover:text-gold"
                      }`}
                    >
                      <span className="text-gold/30 text-xs font-mono">0{i + 1}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Footer: Contact + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="px-6 pb-10 pt-4 space-y-4 border-t border-white/5"
              >
                <Link
                  href="/book"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    track("book_now_click", { location: "navbar_mobile" });
                  }}
                  className="w-full flex items-center justify-center min-h-[52px] bg-gold text-black font-accent text-xl rounded-2xl shadow-[0_0_20px_rgba(201,168,76,0.3)] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] active:scale-95 transition-all"
                >
                  BOOK APPOINTMENT
                </Link>
                <a
                  href="tel:+14039297321"
                  className="w-full flex items-center justify-center gap-2 min-h-[44px] border border-white/10 rounded-2xl text-warm-white/70 hover:text-gold hover:border-gold/30 transition-colors text-sm font-mono"
                >
                  <Phone size={14} aria-hidden="true" />
                  +1 403 929 7321
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
