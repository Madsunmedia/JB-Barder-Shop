"use client";

import { useState, useEffect } from "react";
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
  Bell,
  ClipboardList,
  Clock
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarItems = [
  { name: "Dashboard",    href: "/admin",              icon: LayoutDashboard },
  { name: "Bookings",     href: "/admin/bookings",     icon: ClipboardList   },
  { name: "Availability", href: "/admin/availability", icon: Clock           },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar        },
  { name: "Services",     href: "/admin/services",     icon: Scissors        },
  { name: "Gallery",      href: "/admin/gallery",      icon: ImageIcon       },
  { name: "Reviews",      href: "/admin/reviews",      icon: MessageSquare   },
  { name: "Team",         href: "/admin/team",         icon: Users           },
  { name: "Settings",     href: "/admin/settings",     icon: Settings        },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Desktop: sidebar collapsed/expanded. Mobile: sidebar hidden/shown as overlay
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  if (pathname === "/admin/login") return <>{children}</>;

  const currentPage = sidebarItems.find(i => i.href === pathname)?.name ?? "Dashboard";

  /* ── Shared sidebar content (used in both overlay and desktop) ── */
  function SidebarContent({ collapsed }: { collapsed: boolean }) {
    return (
      <div className="flex flex-col h-full">
        {/* Logo + Toggle */}
        <div className="p-5 flex items-center justify-between border-b border-white/5 flex-shrink-0">
          {!collapsed && (
            <Link href="/admin" className="flex items-baseline gap-1 group" onClick={() => setIsMobileOpen(false)}>
              <span className="text-2xl font-accent text-gold tracking-tighter">JB</span>
              <span className="text-sm font-heading text-warm-white">Admin</span>
            </Link>
          )}
          {/* Desktop collapse toggle — hidden on mobile (mobile has X in overlay header) */}
          <button
            onClick={() => setIsDesktopCollapsed(!collapsed)}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg text-gold hover:text-white hover:bg-white/5 transition-colors ml-auto"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <Menu size={20} /> : <X size={18} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                title={collapsed ? item.name : undefined}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group min-h-[48px] ${
                  isActive
                    ? "bg-gold text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                    : "text-warm-white/50 hover:bg-white/5 hover:text-gold active:bg-white/10"
                }`}
              >
                <item.icon
                  size={20}
                  className={`flex-shrink-0 ${isActive ? "" : "group-hover:scale-110 transition-transform"}`}
                />
                {!collapsed && (
                  <span className="font-accent text-sm uppercase tracking-widest truncate">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5 flex-shrink-0">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-3 py-3 min-h-[48px] text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all group"
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!collapsed && (
              <span className="font-accent text-sm uppercase tracking-widest">Logout</span>
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-warm-white font-body flex overflow-x-hidden">

      {/* ── Mobile overlay backdrop ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Drawer ── */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-[70] w-[min(80vw,280px)] bg-[#0d0d0d] border-r border-white/5 transform transition-transform duration-300 md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {/* Mobile header row (has close button) */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <Link href="/admin" className="flex items-baseline gap-1" onClick={() => setIsMobileOpen(false)}>
            <span className="text-2xl font-accent text-gold tracking-tighter">JB</span>
            <span className="text-sm font-heading text-warm-white">Admin</span>
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-warm-white/60 hover:text-gold hover:bg-white/5 transition-colors"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Reuse sidebar nav + logout (never collapsed on mobile) */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all min-h-[52px] ${
                  isActive
                    ? "bg-gold text-black shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                    : "text-warm-white/50 hover:bg-white/5 hover:text-gold active:bg-white/10"
                }`}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span className="font-accent text-sm uppercase tracking-widest">{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-3 pb-6 border-t border-white/5 pt-3">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-3 py-3 min-h-[48px] text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
          >
            <LogOut size={20} className="flex-shrink-0" />
            <span className="font-accent text-sm uppercase tracking-widest">Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Desktop Sidebar ── */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 bottom-0 z-50 ${
          isDesktopCollapsed ? "w-[72px]" : "w-64"
        } transition-all duration-300 bg-black/40 backdrop-blur-xl border-r border-white/5`}
      >
        <SidebarContent collapsed={isDesktopCollapsed} />
      </aside>

      {/* ── Main Content Area ── */}
      <main
        className={`flex-1 min-w-0 transition-all duration-300 ${
          isDesktopCollapsed ? "md:ml-[72px]" : "md:ml-64"
        }`}
      >
        {/* ── Top Bar ── */}
        <header className="h-16 md:h-20 bg-black/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          {/* Left: hamburger (mobile) + page title */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 text-gold hover:border-gold/40 transition-colors flex-shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <h2 className="text-base md:text-lg font-accent text-gold uppercase tracking-widest truncate">
                {currentPage}
              </h2>
              <p className="hidden sm:block text-[10px] font-mono text-warm-white/20 uppercase">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>

          {/* Right: bell + admin badge */}
          <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
            <button className="relative text-warm-white/40 hover:text-gold transition-colors p-2" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-gold text-black text-[7px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 border-l border-white/10">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-accent text-warm-white uppercase">Admin</p>
                <p className="text-[10px] font-mono text-warm-white/20 uppercase">Master Access</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-accent text-sm flex-shrink-0">
                A
              </div>
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <div className="p-4 md:p-8 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
