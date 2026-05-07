"use client";

import { useState, useEffect } from "react";
import { X, MessageSquare, Clock, Send } from "lucide-react";
import { fetchAvailability } from "@/app/actions/availability";
import { addBookingMessage } from "@/app/actions/booking";
import { format } from "date-fns";

interface MessagingModalProps {
  booking: {
    id: string;
    fullName: string;
    phoneNumber: string;
    serviceSelected: string;
    dateSelected: Date | string;
    timeSelected: string;
  };
  onClose: () => void;
}

const TEMPLATES = [
  {
    id: "accepted",
    label: "✅ Booking Accepted",
    color: "text-green-400 border-green-500/30 bg-green-500/5",
    text: (b: MessagingModalProps["booking"]) =>
      `Hi ${b.fullName}! Your ${b.serviceSelected} appointment on ${format(new Date(b.dateSelected), "EEEE, MMM d")} at ${b.timeSelected} is CONFIRMED ✅. See you soon at JB Barbershop! 💈`,
  },
  {
    id: "rejected",
    label: "❌ Booking Rejected",
    color: "text-red-400 border-red-500/30 bg-red-500/5",
    text: (b: MessagingModalProps["booking"]) =>
      `Hi ${b.fullName}, unfortunately we're unable to accommodate your ${b.serviceSelected} booking on ${format(new Date(b.dateSelected), "MMM d")} at ${b.timeSelected}. Please visit jb-barder-shop.vercel.app/book to select a new time. Sorry for the inconvenience! 💈`,
  },
  {
    id: "reschedule_request",
    label: "🕐 Time Change Request",
    color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/5",
    text: (b: MessagingModalProps["booking"], slot?: string) =>
      `Hi ${b.fullName}, we'd like to adjust your ${b.serviceSelected} booking. Could you come in at ${slot || "[SELECT A TIME BELOW]"} instead? Please confirm and we'll get you all set! 💈 JB Barbershop`,
  },
  {
    id: "time_modified",
    label: "✏️ Time Modified",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/5",
    text: (b: MessagingModalProps["booking"], slot?: string) =>
      `Hi ${b.fullName}, your appointment has been updated to ${slot || "[SELECT A TIME BELOW]"} for ${b.serviceSelected}. See you then! 💈 JB Barbershop`,
  },
  {
    id: "reminder",
    label: "🔔 Booking Reminder",
    color: "text-gold border-gold/30 bg-gold/5",
    text: (b: MessagingModalProps["booking"]) =>
      `Hi ${b.fullName}! Just a reminder about your ${b.serviceSelected} appointment tomorrow at ${b.timeSelected} at JB Barbershop 💈. We're looking forward to seeing you! – (403) 942-5332`,
  },
];

export default function MessagingModal({ booking, onClose }: MessagingModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // Fetch available slots for tomorrow as suggested alternatives
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    fetchAvailability(tomorrow.toISOString().split("T")[0]).then((res) => {
      if (res.success && res.availableSlots) {
        setAvailableSlots(res.availableSlots.slice(0, 8));
      }
    });
  }, []);

  useEffect(() => {
    setMessageText(selectedTemplate.text(booking, selectedSlot || undefined));
  }, [selectedTemplate, selectedSlot, booking]);

  const handleSend = async () => {
    setIsSending(true);
    // Log the message
    await addBookingMessage({
      bookingId: booking.id,
      sender: "ADMIN",
      content: messageText,
    });
    setSent(true);
    setIsSending(false);

    // Open native SMS after short delay
    setTimeout(() => {
      const smsLink = `sms:${booking.phoneNumber}?body=${encodeURIComponent(messageText)}`;
      window.open(smsLink, "_blank");
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-charcoal border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <MessageSquare size={18} className="text-gold" />
            </div>
            <div>
              <h3 className="font-accent text-gold uppercase tracking-widest text-lg">
                Send Message
              </h3>
              <p className="text-xs text-warm-white/40 font-mono">
                To: {booking.fullName} — {booking.phoneNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-warm-white/40 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 md:p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar-mobile">
          {/* Template Selector */}
          <div>
            <p className="text-xs font-accent text-warm-white/40 uppercase tracking-widest mb-3">
              Choose Template
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t)}
                  className={`text-left text-xs font-accent uppercase tracking-wide px-4 py-3 rounded-xl border transition-all ${t.color} ${
                    selectedTemplate.id === t.id
                      ? "ring-1 ring-white/20 scale-[1.02]"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Time Slots (for reschedule templates) */}
          {(selectedTemplate.id === "reschedule_request" ||
            selectedTemplate.id === "time_modified") && (
            <div>
              <p className="text-xs font-accent text-warm-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Clock size={12} />
                Suggested Available Slots (Tomorrow)
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {availableSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 rounded-lg text-xs font-mono transition-all ${
                      selectedSlot === slot
                        ? "bg-gold text-black font-bold"
                        : "bg-white/5 text-warm-white/60 hover:bg-white/10"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
                {availableSlots.length === 0 && (
                  <p className="col-span-4 text-xs text-warm-white/30 font-mono">
                    No slots available for tomorrow
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Message Preview / Editor */}
          <div>
            <p className="text-xs font-accent text-warm-white/40 uppercase tracking-widest mb-3">
              Message Text
            </p>
            <textarea
              rows={5}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-warm-white/80 font-body leading-relaxed focus:border-gold outline-none resize-none transition-colors"
            />
            <p className="text-[10px] text-warm-white/20 font-mono mt-1">
              {messageText.length} characters · You can edit the message above before sending
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-5 md:p-6 border-t border-white/5 gap-4">
          <a
            href={`tel:${booking.phoneNumber}`}
            className="w-full sm:w-auto text-center text-xs font-accent text-warm-white/40 hover:text-gold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors py-2"
          >
            📞 Call Instead
          </a>
          <button
            onClick={handleSend}
            disabled={isSending || !messageText.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gold text-black font-accent text-sm uppercase tracking-widest rounded-xl md:rounded-full hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 min-h-[56px]"
          >
            {sent ? (
              "✅ Logged!"
            ) : isSending ? (
              "Sending..."
            ) : (
              <>
                <Send size={16} />
                Send SMS
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
