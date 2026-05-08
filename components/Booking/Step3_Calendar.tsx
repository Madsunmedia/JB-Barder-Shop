"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { fetchAvailability } from "@/app/actions/availability";

const BUSINESS_HOURS = {
  weekdays: { start: 9, end: 20 },
  sunday: { start: 9, end: 19 }
};

export default function Step3_Calendar({ data, onSelect, onNext, onBack }: any) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(data.date);
  const [selectedTime, setSelectedTime] = useState<string | null>(data.time);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      const barberId = data.barber?.id;
      setSlotsError(null);
      fetchAvailability(dateStr, barberId).then(res => {
        if (res.success && res.availableSlots) {
          setAvailableSlots(res.availableSlots);
        } else {
          setAvailableSlots([]);
          setSlotsError("Could not load available slots. Please try a different date or call us to book.");
          console.error("Availability error:", res.error);
        }
      });
    }
  }, [selectedDate, data.barber]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const timeSlots = [];
  if (selectedDate) {
    const isSunday = selectedDate.getDay() === 0;
    const hours = isSunday ? BUSINESS_HOURS.sunday : BUSINESS_HOURS.weekdays;
    for (let h = hours.start; h < hours.end; h++) {
      timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
      timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
    }
  }

  const handleDateClick = (day: number) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(d);
    setSelectedTime(null);
    onSelect(d, null);
  };

  const handleTimeClick = (time: string) => {
    setSelectedTime(time);
    onSelect(selectedDate, time);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-accent text-gold uppercase tracking-widest">Schedule</h2>
        <p className="text-warm-white/60">Find a time that works for your sharp new look.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Calendar Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-accent text-warm-white uppercase">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-2">
              <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="p-2 glass rounded-lg hover:text-gold transition-colors"><ChevronLeft size={20}/></button>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="p-2 glass rounded-lg hover:text-gold transition-colors"><ChevronRight size={20}/></button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-accent text-gold/40 uppercase tracking-widest mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {blanks.map(i => <div key={`b-${i}`} />)}
            {days.map(d => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              const isPast = date < new Date(new Date().setHours(0,0,0,0));

              return (
                <button
                  key={d}
                  disabled={isPast}
                  onClick={() => handleDateClick(d)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-all relative ${
                    isSelected ? "bg-gold text-black font-bold shadow-[0_0_15px_rgba(201,168,76,0.5)]" : 
                    isToday ? "border border-gold text-gold" : 
                    isPast ? "opacity-10 cursor-not-allowed" : "glass hover:border-gold/50"
                  }`}
                >
                  {d}
                  {!isPast && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-green-500/50" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Grid */}
        <div className="space-y-6 min-h-[280px] md:h-[400px] flex flex-col">
          <h3 className="text-xl font-accent text-warm-white uppercase flex items-center gap-2">
            <Clock size={20} className="text-gold" />
            Available Slots
          </h3>
          
          {!selectedDate ? (
            <div className="flex-1 flex items-center justify-center glass rounded-3xl border-dashed border-gold/20">
               <p className="text-gold/30 font-accent uppercase tracking-widest">Select a date first</p>
            </div>
          ) : slotsError ? (
            <div className="flex-1 flex items-center justify-center glass rounded-3xl border-dashed border-red-500/20 p-6 text-center">
              <p className="text-red-400/70 text-sm font-body">{slotsError}</p>
            </div>
          ) : (
            <div className="flex-1 grid grid-cols-2 gap-3 overflow-y-auto pr-2 custom-scrollbar">
              {timeSlots.map(time => {
                const isBooked = !availableSlots.includes(time);
                const isSelected = selectedTime === time;

                return (
                  <button
                    key={time}
                    disabled={isBooked}
                    onClick={() => handleTimeClick(time)}
                    className={`py-4 rounded-xl text-sm font-mono transition-all ${
                      isSelected ? "bg-gold text-black font-bold" :
                      isBooked ? "opacity-10 cursor-not-allowed line-through" : "glass hover:border-gold/50"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <button onClick={onBack} className="px-8 py-4 border border-white/10 text-warm-white/50 font-accent uppercase rounded-full hover:text-gold transition-all">
          Back
        </button>
        <button
          disabled={!selectedTime}
          onClick={onNext}
          className="px-12 py-4 bg-gold text-black font-accent text-xl rounded-full uppercase shadow-lg disabled:opacity-30 hover:scale-105 transition-transform"
        >
          Next: Your Details
        </button>
      </div>
    </div>
  );
}
