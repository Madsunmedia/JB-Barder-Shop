"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Image as ImageIcon, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Services", href: "/admin/services", icon: Scissors },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { name: "Team", href: "/admin/team", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#050505] text-warm-white font-body flex">
      
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col fixed h-full z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <Link href="/admin" className="flex items-baseline gap-1 group">
              <span className="text-2xl font-accent text-gold tracking-tighter">JB</span>
              <span className="text-sm font-heading text-warm-white">Admin</span>
            </Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gold hover:text-white transition-colors">
            {isSidebarOpen ? <X size={20} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex-1 mt-10 px-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all group ${
                  isActive 
                    ? "bg-gold text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]" 
                    : "text-warm-white/40 hover:bg-white/5 hover:text-gold"
                }`}
              >
                <item.icon size={20} className={isActive ? "" : "group-hover:scale-110 transition-transform"} />
                {isSidebarOpen && <span className="font-accent text-sm uppercase tracking-widest">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-4 p-4 text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all group"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-accent text-sm uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Bar */}
        <header className="h-20 bg-black/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-40">
           <div>
              <h2 className="text-lg font-accent text-gold uppercase tracking-widest">
                {sidebarItems.find(i => i.href === pathname)?.name || "Dashboard"}
              </h2>
              <p className="text-[10px] font-mono text-warm-white/20 uppercase">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
           </div>
           <div className="flex items-center gap-6">
              <button className="relative text-warm-white/40 hover:text-gold transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold text-black text-[8px] font-bold rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                 <div className="text-right">
                    <p className="text-xs font-accent text-warm-white uppercase">Admin</p>
                    <p className="text-[10px] font-mono text-warm-white/20 uppercase">Master Access</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-accent">A</div>
              </div>
           </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
