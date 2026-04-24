"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px]" />
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-12">
           <div className="inline-block p-4 rounded-3xl bg-gold/10 border border-gold/20 mb-6 group hover:scale-110 transition-transform duration-500">
              <Lock size={40} className="text-gold" />
           </div>
           <h1 className="text-4xl font-accent text-gold uppercase tracking-tighter mb-2">Admin Portal</h1>
           <p className="text-warm-white/40 text-[10px] font-mono uppercase tracking-[0.3em]">JB Barbershop Official Access</p>
        </div>

        <form onSubmit={handleSubmit} className="glass p-10 rounded-[40px] border border-white/5 space-y-6">
           {error && (
             <motion.div 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-[10px] font-accent uppercase tracking-widest text-center"
             >
               {error}
             </motion.div>
           )}

           <div className="space-y-4">
              <div className="relative group">
                 <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-white/20 group-hover:text-gold transition-colors" />
                 <input 
                   required
                   type="email" 
                   placeholder="ADMIN EMAIL"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-warm-white text-[10px] font-accent uppercase tracking-widest outline-none focus:border-gold transition-all"
                 />
              </div>

              <div className="relative group">
                 <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-white/20 group-hover:text-gold transition-colors" />
                 <input 
                   required
                   type="password" 
                   placeholder="PASSWORD"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-12 pr-6 text-warm-white text-[10px] font-accent uppercase tracking-widest outline-none focus:border-gold transition-all"
                 />
              </div>
           </div>

           <button 
             disabled={loading}
             className="w-full py-5 bg-gold text-black font-accent text-xl uppercase tracking-widest rounded-2xl shadow-[0_20px_50px_rgba(201,168,76,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
           >
             {loading ? <Loader2 className="animate-spin" /> : <><ArrowRight size={20} /> Secure Login</>}
           </button>

           <div className="pt-6 text-center border-t border-white/5">
              <button 
                type="button"
                onClick={() => router.push("/")}
                className="text-[10px] font-accent text-warm-white/20 hover:text-gold uppercase tracking-widest transition-colors"
              >
                Back to Public Site
              </button>
           </div>
        </form>

        <p className="mt-12 text-center text-[10px] font-mono text-warm-white/10 uppercase tracking-[0.5em]">
           Protected by NextAuth.js & OpenSSL 3.0
        </p>
      </motion.div>
    </div>
  );
}
