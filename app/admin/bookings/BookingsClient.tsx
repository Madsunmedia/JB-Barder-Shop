"use client";

import { useState, useMemo } from "react";
import { format, isToday, parseISO } from "date-fns";
import { Search, Filter, ClipboardList, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import BookingCard from "./BookingCard";

const ALL_STATUSES = ["ALL", "PENDING", "ACCEPTED", "REJECTED", "RESCHEDULE_REQUESTED", "CANCELLED", "COMPLETED"];

const STATUS_LABEL: Record<string, string> = {
  ALL: "All",
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  RESCHEDULE_REQUESTED: "Reschedule",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

export default function BookingsClient({ initialBookings }: { initialBookings: any[] }) {
  const [bookings] = useState(initialBookings);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      const matchStatus = statusFilter === "ALL" || b.status === statusFilter;
      const matchDate = !dateFilter || format(new Date(b.dateSelected), "yyyy-MM-dd") === dateFilter;
      const matchService =
        !serviceFilter ||
        b.serviceSelected.toLowerCase().includes(serviceFilter.toLowerCase()) ||
        b.fullName.toLowerCase().includes(serviceFilter.toLowerCase());
      return matchStatus && matchDate && matchService;
    });
  }, [bookings, statusFilter, dateFilter, serviceFilter]);

  // Stats
  const total = bookings.length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const todayCount = bookings.filter((b) => isToday(new Date(b.dateSelected))).length;
  const needsAction = bookings.filter((b) =>
    ["PENDING", "RESCHEDULE_REQUESTED"].includes(b.status)
  ).length;

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<ClipboardList size={18} />} label="Total Bookings" value={total} color="text-warm-white" />
        <StatCard icon={<Clock size={18} />} label="Pending" value={pending} color="text-gold" />
        <StatCard icon={<CheckCircle2 size={18} />} label="Today" value={todayCount} color="text-green-400" />
        <StatCard icon={<AlertCircle size={18} />} label="Needs Action" value={needsAction} color="text-orange-400" />
      </div>

      {/* Filter Bar */}
      <div className="glass rounded-2xl border border-white/5 p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-white/30" />
          <input
            type="text"
            placeholder="Search by name or service..."
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-warm-white placeholder:text-white/20 focus:border-gold outline-none transition-colors"
          />
        </div>

        {/* Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-warm-white [color-scheme:dark] outline-none focus:border-gold transition-colors"
        />

        {/* Clear */}
        {(dateFilter || serviceFilter) && (
          <button
            onClick={() => { setDateFilter(""); setServiceFilter(""); }}
            className="text-xs font-accent text-warm-white/30 hover:text-gold uppercase tracking-widest transition-colors whitespace-nowrap"
          >
            Clear
          </button>
        )}
      </div>

      {/* Status Tabs */}
      <div className="flex gap-2 flex-wrap">
        {ALL_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-4 py-2 rounded-full text-xs font-accent uppercase tracking-widest border transition-all ${
              statusFilter === s
                ? "bg-gold text-black border-gold"
                : "border-white/10 text-warm-white/40 hover:border-white/20 hover:text-warm-white/70"
            }`}
          >
            {STATUS_LABEL[s]}
            {s !== "ALL" && (
              <span className="ml-1.5 opacity-60">
                ({bookings.filter((b) => b.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 glass rounded-3xl border border-white/5">
          <ClipboardList size={48} className="text-warm-white/10 mb-4" />
          <p className="font-accent text-warm-white/20 uppercase tracking-widest text-lg">
            No bookings found
          </p>
          <p className="text-xs text-warm-white/10 font-mono mt-2">
            {bookings.length === 0 ? "No bookings have been made yet." : "Try adjusting your filters."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-mono text-warm-white/20 uppercase pl-1">
            Showing {filtered.length} of {total} bookings
          </p>
          {filtered.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon, label, value, color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="glass rounded-2xl border border-white/5 p-5 flex items-center gap-4">
      <div className={`${color}`}>{icon}</div>
      <div>
        <p className="text-2xl font-accent text-warm-white">{value}</p>
        <p className="text-[10px] font-mono text-warm-white/30 uppercase tracking-widest">{label}</p>
      </div>
    </div>
  );
}
