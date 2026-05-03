"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import {
  Check, X, Clock, Pencil, NotebookPen, CheckCircle2,
  Ban, ChevronDown, ChevronUp, Phone, MessageCircle
} from "lucide-react";
import {
  updateBookingStatusAndNote,
  modifyBookingTime,
  storeAdminNote,
} from "@/app/actions/booking";
import MessagingModal from "./MessagingModal";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-gold/10 text-gold border-gold/20",
  ACCEPTED: "bg-green-500/10 text-green-400 border-green-500/20",
  REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  RESCHEDULE_REQUESTED: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  CANCELLED: "bg-white/5 text-warm-white/30 border-white/10",
  COMPLETED: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function BookingCard({ booking: initialBooking }: { booking: any }) {
  const [booking, setBooking] = useState(initialBooking);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [newDate, setNewDate] = useState(format(new Date(booking.dateSelected), "yyyy-MM-dd"));
  const [newTime, setNewTime] = useState(booking.timeSelected);
  const [noteText, setNoteText] = useState(booking.adminNotes || "");
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: string) => {
    startTransition(async () => {
      const res = await updateBookingStatusAndNote(booking.id, status as any);
      if (res.success) setBooking({ ...booking, status });
    });
  };

  const handleSaveTime = () => {
    startTransition(async () => {
      const res = await modifyBookingTime(booking.id, newDate, newTime);
      if (res.success) {
        setBooking({ ...booking, dateSelected: new Date(newDate), timeSelected: newTime });
        setEditingTime(false);
      }
    });
  };

  const handleSaveNote = () => {
    startTransition(async () => {
      const res = await storeAdminNote(booking.id, noteText);
      if (res.success) {
        setBooking({ ...booking, adminNotes: noteText });
        setEditingNotes(false);
      }
    });
  };

  const dateLabel = format(new Date(booking.dateSelected), "MMM d, yyyy");

  return (
    <>
      <div
        className={`glass rounded-2xl border transition-all duration-300 ${
          isPending ? "opacity-60" : "opacity-100"
        } ${isExpanded ? "border-gold/20" : "border-white/5 hover:border-white/10"}`}
      >
        {/* Main Row */}
        <div
          className="flex items-center gap-4 p-5 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Status indicator */}
          <div className={`w-2 h-2 rounded-full shrink-0 ${STATUS_COLORS[booking.status]?.split(" ")[1]?.replace("text-", "bg-") || "bg-gold"}`} />

          {/* Customer Info */}
          <div className="flex-1 min-w-0">
            <p className="font-accent text-warm-white uppercase tracking-wide text-sm truncate">
              {booking.fullName}
            </p>
            <a
              href={`tel:${booking.phoneNumber}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-mono text-gold hover:underline"
            >
              {booking.phoneNumber}
            </a>
          </div>

          {/* Service */}
          <div className="hidden sm:block flex-1 min-w-0">
            <p className="text-xs text-warm-white/70 truncate">{booking.serviceSelected}</p>
            {booking.barberSelected && (
              <p className="text-[10px] text-warm-white/30 font-mono">Barber: {booking.barberSelected}</p>
            )}
          </div>

          {/* Date / Time */}
          <div className="hidden md:block text-right shrink-0">
            <p className="text-xs font-mono text-warm-white/70">{dateLabel}</p>
            <p className="text-xs font-mono text-gold">{booking.timeSelected}</p>
          </div>

          {/* Source */}
          <div className="hidden lg:block shrink-0">
            <span className="text-[10px] font-mono text-warm-white/20 uppercase px-2 py-1 bg-white/5 rounded-lg">
              {booking.source || "web"}
            </span>
          </div>

          {/* Status Badge */}
          <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-accent uppercase tracking-widest border ${STATUS_COLORS[booking.status] || STATUS_COLORS.PENDING}`}>
            {booking.status.replace("_", " ")}
          </span>

          <ChevronDown
            size={16}
            className={`shrink-0 text-warm-white/30 transition-transform ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-white/5 p-5 space-y-5">
            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {booking.status === "PENDING" && (
                <>
                  <ActionBtn
                    icon={<Check size={14} />}
                    label="Accept"
                    color="text-green-400 border-green-500/30 hover:bg-green-500/10"
                    onClick={() => handleStatusChange("ACCEPTED")}
                  />
                  <ActionBtn
                    icon={<X size={14} />}
                    label="Reject"
                    color="text-red-400 border-red-500/30 hover:bg-red-500/10"
                    onClick={() => handleStatusChange("REJECTED")}
                  />
                </>
              )}
              {(booking.status === "PENDING" || booking.status === "ACCEPTED") && (
                <ActionBtn
                  icon={<Clock size={14} />}
                  label="Request Reschedule"
                  color="text-orange-400 border-orange-500/30 hover:bg-orange-500/10"
                  onClick={() => { handleStatusChange("RESCHEDULE_REQUESTED"); setShowMessaging(true); }}
                />
              )}
              {booking.status === "ACCEPTED" && (
                <ActionBtn
                  icon={<CheckCircle2 size={14} />}
                  label="Mark Completed"
                  color="text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
                  onClick={() => handleStatusChange("COMPLETED")}
                />
              )}
              {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
                <ActionBtn
                  icon={<Ban size={14} />}
                  label="Cancel"
                  color="text-warm-white/40 border-white/10 hover:bg-white/5"
                  onClick={() => handleStatusChange("CANCELLED")}
                />
              )}
              <ActionBtn
                icon={<Pencil size={14} />}
                label="Modify Time"
                color="text-warm-white/60 border-white/10 hover:bg-white/5"
                onClick={() => setEditingTime(!editingTime)}
              />
              <ActionBtn
                icon={<NotebookPen size={14} />}
                label="Notes"
                color="text-warm-white/60 border-white/10 hover:bg-white/5"
                onClick={() => setEditingNotes(!editingNotes)}
              />
              <ActionBtn
                icon={<MessageCircle size={14} />}
                label="Send Message"
                color="text-gold border-gold/30 hover:bg-gold/10"
                onClick={() => setShowMessaging(true)}
              />
              <a href={`tel:${booking.phoneNumber}`}>
                <ActionBtn
                  icon={<Phone size={14} />}
                  label="Call"
                  color="text-warm-white/60 border-white/10 hover:bg-white/5"
                  onClick={() => {}}
                />
              </a>
            </div>

            {/* Modify Time Panel */}
            {editingTime && (
              <div className="bg-black/30 rounded-xl p-4 space-y-3 border border-white/5">
                <p className="text-xs font-accent text-warm-white/40 uppercase tracking-widest">Modify Appointment Time</p>
                <div className="flex gap-3 flex-wrap">
                  <input
                    type="date"
                    value={newDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-warm-white [color-scheme:dark] outline-none focus:border-gold"
                  />
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-warm-white [color-scheme:dark] outline-none focus:border-gold"
                  />
                  <button
                    onClick={handleSaveTime}
                    disabled={isPending}
                    className="px-4 py-2 bg-gold text-black font-accent text-xs uppercase rounded-lg hover:scale-105 transition-transform"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTime(false)}
                    className="px-4 py-2 border border-white/10 text-warm-white/40 font-accent text-xs uppercase rounded-lg hover:text-warm-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Admin Notes Panel */}
            {editingNotes && (
              <div className="bg-black/30 rounded-xl p-4 space-y-3 border border-white/5">
                <p className="text-xs font-accent text-warm-white/40 uppercase tracking-widest">Admin Notes</p>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add internal notes about this booking..."
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-warm-white outline-none focus:border-gold resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveNote}
                    disabled={isPending}
                    className="px-4 py-2 bg-gold text-black font-accent text-xs uppercase rounded-lg hover:scale-105 transition-transform"
                  >
                    Save Note
                  </button>
                  <button
                    onClick={() => setEditingNotes(false)}
                    className="px-4 py-2 border border-white/10 text-warm-white/40 font-accent text-xs uppercase rounded-lg hover:text-warm-white transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <Detail label="Customer Notes" value={booking.customerNotes || "—"} />
              <Detail label="Admin Notes" value={booking.adminNotes || "—"} highlight />
              <Detail label="Source" value={booking.source || "web"} />
              <Detail
                label="Created"
                value={format(new Date(booking.createdAt), "MMM d, h:mm a")}
              />
            </div>

            {/* Message History */}
            {booking.messages && booking.messages.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-accent text-warm-white/40 uppercase tracking-widest">Message History</p>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {booking.messages.map((msg: any) => (
                    <div
                      key={msg.id}
                      className={`text-xs rounded-lg p-3 ${
                        msg.sender === "SYSTEM"
                          ? "bg-white/[0.02] text-warm-white/30 italic"
                          : msg.sender === "ADMIN"
                          ? "bg-gold/5 border border-gold/10 text-warm-white/70"
                          : "bg-blue-500/5 border border-blue-500/10 text-warm-white/70"
                      }`}
                    >
                      <span className="font-mono text-[9px] uppercase text-warm-white/20 mr-2">
                        [{msg.sender}]
                      </span>
                      {msg.content}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Messaging Modal */}
      {showMessaging && (
        <MessagingModal booking={booking} onClose={() => setShowMessaging(false)} />
      )}
    </>
  );
}

function ActionBtn({ icon, label, color, onClick }: {
  icon: React.ReactNode;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-accent uppercase tracking-wide transition-all ${color}`}
    >
      {icon}
      {label}
    </button>
  );
}

function Detail({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-black/20 rounded-lg p-3">
      <p className="text-[10px] font-mono text-warm-white/20 uppercase mb-1">{label}</p>
      <p className={`text-xs font-body leading-snug ${highlight ? "text-gold" : "text-warm-white/60"}`}>
        {value}
      </p>
    </div>
  );
}
