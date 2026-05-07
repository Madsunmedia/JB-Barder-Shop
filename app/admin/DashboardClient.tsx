"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  MessageSquare,
  Scissors,
  Clock,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDistanceToNow } from "date-fns";
import type { DashboardStats } from "@/app/actions/dashboard";

const statusColors: Record<string, string> = {
  PENDING: "bg-gold/10 text-gold",
  CONFIRMED: "bg-green-500/10 text-green-500",
  COMPLETED: "bg-blue-500/10 text-blue-400",
  CANCELLED: "bg-red-500/10 text-red-400",
  ACCEPTED: "bg-green-500/10 text-green-500",
  REJECTED: "bg-red-500/10 text-red-400",
  RESCHEDULE_REQUESTED: "bg-orange-500/10 text-orange-400",
};

export default function DashboardClient({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-6 md:space-y-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <StatsCard
          icon={<Calendar size={20} />}
          title="Today's Bookings"
          value={String(stats.todayBookings)}
          sub="Live from database"
          color="gold"
        />
        <StatsCard
          icon={<AlertCircle size={20} />}
          title="Pending Bookings"
          value={String(stats.pendingBookings)}
          sub={stats.pendingBookings > 0 ? "Needs attention" : "All clear"}
          color={stats.pendingBookings > 0 ? "amber" : "green"}
        />
        <StatsCard
          icon={<MessageSquare size={20} />}
          title="Pending Reviews"
          value={String(stats.pendingReviews)}
          sub={stats.pendingReviews > 0 ? "Awaiting moderation" : "All reviewed"}
          color={stats.pendingReviews > 0 ? "amber" : "green"}
        />
        <StatsCard
          icon={<Scissors size={20} />}
          title="Total Services"
          value={String(stats.totalServices)}
          sub="In menu"
          color="gold"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Booking Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6 md:mb-8 flex-shrink-0">
            <div>
              <h3 className="text-lg md:text-xl font-accent text-gold uppercase tracking-widest leading-tight">Booking Trends</h3>
              <p className="text-[9px] md:text-[10px] font-mono text-warm-white/30 uppercase tracking-wider mt-1">Last 7 days — live data</p>
            </div>
            <TrendingUp size={20} className="text-gold/40 flex-shrink-0 ml-2" />
          </div>
          <div className="h-[220px] md:h-[280px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.bookingsByDay} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} allowDecimals={false} tickMargin={8} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "12px", fontSize: "12px" }}
                  itemStyle={{ color: "#C9A84C" }}
                />
                <Area type="monotone" dataKey="bookings" stroke="#C9A84C" fillOpacity={1} fill="url(#colorGold)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick stats sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/5 space-y-5 md:space-y-6"
        >
          <h3 className="text-lg md:text-xl font-accent text-gold uppercase tracking-widest">At a Glance</h3>
          <div className="space-y-3 md:space-y-4">
            <GlanceRow icon={<CheckCircle2 size={16} className="text-green-400" />} label="Confirmed Today" value={String(stats.todayBookings)} />
            <GlanceRow icon={<AlertCircle size={16} className="text-amber-400" />} label="Pending Action" value={String(stats.pendingBookings)} />
            <GlanceRow icon={<MessageSquare size={16} className="text-blue-400" />} label="Reviews Queue" value={String(stats.pendingReviews)} />
            <GlanceRow icon={<Scissors size={16} className="text-gold" />} label="Live Services" value={String(stats.totalServices)} />
          </div>
        </motion.div>
      </div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-[1.5rem] md:rounded-[2rem] border border-white/5 overflow-hidden flex flex-col"
      >
        <div className="p-5 md:p-8 border-b border-white/5 flex justify-between items-center flex-shrink-0 gap-4">
          <div className="min-w-0">
            <h3 className="text-lg md:text-xl font-accent text-gold uppercase tracking-widest truncate">Recent Bookings</h3>
            <p className="text-[9px] md:text-[10px] font-mono text-warm-white/30 uppercase tracking-wider mt-1 truncate">Latest {stats.recentBookings.length} entries</p>
          </div>
          <a href="/admin/bookings" className="flex-shrink-0 text-[10px] font-accent text-warm-white/40 hover:text-gold uppercase tracking-widest transition-colors whitespace-nowrap p-2 -mr-2">
            View All →
          </a>
        </div>
        <div className="w-full">
          {stats.recentBookings.length === 0 ? (
            <div className="py-12 md:py-20 text-center text-warm-white/20 font-accent uppercase tracking-widest text-xs px-4">
              No bookings yet
            </div>
          ) : (
            <>
              {/* Mobile Card Layout */}
              <div className="md:hidden divide-y divide-white/5">
                {stats.recentBookings.map((b) => (
                  <div key={b.id} className="p-5 flex flex-col gap-4 hover:bg-white/[0.01] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-accent text-sm flex-shrink-0">
                          {b.fullName.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-accent text-warm-white uppercase tracking-wider">{b.fullName}</span>
                      </div>
                      <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[8px] font-accent uppercase tracking-widest ${statusColors[b.status] ?? "bg-white/5 text-white/40"}`}>
                        {b.status.toLowerCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pl-11">
                      <div>
                        <p className="text-[9px] font-accent text-warm-white/40 uppercase tracking-widest mb-0.5">Service</p>
                        <p className="text-xs text-warm-white/70">{b.serviceSelected}</p>
                      </div>
                      <div>
                        <p className="text-[9px] font-accent text-warm-white/40 uppercase tracking-widest mb-0.5">Barber</p>
                        <p className="text-xs text-warm-white/70">{b.barberSelected ?? "Any"}</p>
                      </div>
                      <div className="col-span-2 pt-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-warm-white/40">
                          <Clock size={12} className="flex-shrink-0 text-gold/50" />
                          {formatDistanceToNow(new Date(b.createdAt), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden md:block w-full">
                <table className="w-full text-left">
                  <thead className="bg-white/[0.02] text-[10px] font-accent uppercase text-warm-white/40 tracking-[0.2em]">
                    <tr>
                      <th className="px-6 py-4 whitespace-nowrap">Client</th>
                      <th className="px-6 py-4 whitespace-nowrap">Service</th>
                      <th className="px-6 py-4 whitespace-nowrap">Barber</th>
                      <th className="px-6 py-4 whitespace-nowrap">Date</th>
                      <th className="px-6 py-4 whitespace-nowrap text-right pr-8">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {stats.recentBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-white/[0.01] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-accent text-sm flex-shrink-0">
                              {b.fullName.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-accent text-warm-white uppercase tracking-wider whitespace-nowrap">{b.fullName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-warm-white/50 whitespace-nowrap">{b.serviceSelected}</td>
                        <td className="px-6 py-4 text-xs text-warm-white/50 whitespace-nowrap">{b.barberSelected ?? "Any"}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-warm-white/40">
                            <Clock size={12} className="flex-shrink-0" />
                            {formatDistanceToNow(new Date(b.createdAt), { addSuffix: true })}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right pr-8 whitespace-nowrap">
                          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[8px] font-accent uppercase tracking-widest ${statusColors[b.status] ?? "bg-white/5 text-white/40"}`}>
                            {b.status.toLowerCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function StatsCard({ icon, title, value, sub, color }: { icon: React.ReactNode; title: string; value: string; sub: string; color: string }) {
  const colorMap: Record<string, string> = {
    gold: "text-gold bg-gold/10 border-gold/20",
    amber: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    green: "text-green-400 bg-green-400/10 border-green-400/20",
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-4 md:p-6 rounded-2xl md:rounded-[1.5rem] border border-white/5 hover:border-gold/20 transition-all flex items-center md:flex-col md:items-start h-full gap-4 md:gap-0"
    >
      <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center md:mb-4 flex-shrink-0 border ${colorMap[color] ?? colorMap.gold}`}>
        {icon}
      </div>
      <div className="md:mt-auto flex-1 min-w-0">
        <p className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest mb-0.5 md:mb-1 truncate">{title}</p>
        <div className="text-2xl md:text-3xl font-accent text-warm-white mb-0.5 md:mb-1 leading-none">{value}</div>
        <p className="text-[9px] md:text-[10px] font-mono text-warm-white/20 uppercase tracking-wider truncate">{sub}</p>
      </div>
    </motion.div>
  );
}

function GlanceRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 md:py-2.5 border-b border-white/5 last:border-0 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex-shrink-0">{icon}</div>
        <span className="text-[11px] md:text-xs font-accent text-warm-white/60 uppercase tracking-wider truncate">{label}</span>
      </div>
      <span className="text-xs md:text-sm font-accent text-warm-white flex-shrink-0">{value}</span>
    </div>
  );
}
