"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BarberCard from "./BarberCard";

const INITIAL_TEAM = [
  {
    name: "Jeet",
    title: "Senior Barber & Fade Specialist",
    bio: "Jeet's attention to detail is unmatched. Known for flawless skin fades and clean lines, he's been praised as one of Lethbridge's finest.",
    image: "https://images.unsplash.com/photo-1621605815841-aa33c5cc70a9?q=80&w=2070&auto=format&fit=crop",
    specialties: ["Skin Fades", "Beard Sculpting", "Facials"],
    quote: "Skin fades like you've never seen before."
  }
];

export default function TeamSection() {
  const [team, setTeam] = useState(INITIAL_TEAM);

  useEffect(() => {
    // Fetch dynamic team later
    // fetch("/api/barbers").then(res => res.json()).then(data => if(data.length) setTeam(data));
  }, []);

  return (
    <section id="team" className="relative py-40 bg-black-primary overflow-hidden">
      {/* Moving Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#C9A84C_1px,transparent_1px),linear-gradient(to_bottom,#C9A84C_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="space-y-6 max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-gold font-accent text-xl tracking-[0.3em] uppercase"
            >
              The Masters
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-accent text-gold uppercase leading-none"
            >
              Meet The <br /> Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-warm-white/60 font-body leading-relaxed"
            >
              Our skilled barbers bring years of expertise and passion to every cut. 
              Each visit is personalized — because your style is unique.
            </motion.p>
          </div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {team.map((barber) => (
            <motion.div
              key={barber.name}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <BarberCard barber={barber} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
