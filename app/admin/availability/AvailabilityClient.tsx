"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { Plus, X, Calendar, Clock, RotateCcw, AlertCircle, Loader2 } from "lucide-react";
import { createAvailabilityBlock, deleteAvailabilityBlock } from "@/app/actions/availability-admin";

const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AvailabilityClient({ initialBlocks }: { initialBlocks: any[] }) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState("FULL_DAY");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("0");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await createAvailabilityBlock({
        name,
        type,
        startDate: startDate || null,
        endDate: endDate || null,
        startTime: startTime || null,
        endTime: endTime || null,
        dayOfWeek: type === "RECURRING" ? parseInt(dayOfWeek) : null,
      });

      if (res.success && res.block) {
        setBlocks([res.block, ...blocks]);
        setIsAdding(false);
        // Reset form
        setName("");
        setType("FULL_DAY");
        setStartDate("");
        setEndDate("");
        setStartTime("");
        setEndTime("");
        setDayOfWeek("0");
      } else {
        alert("Failed to save rule.");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this block?")) return;
    startTransition(async () => {
      const res = await deleteAvailabilityBlock(id);
      if (res.success) {
        setBlocks(blocks.filter((b) => b.id !== id));
      } else {
        alert("Failed to delete rule.");
      }
    });
  };

  const fullDayBlocks = blocks.filter((b) => b.type === "FULL_DAY" || b.type === "DATE_RANGE");
  const partialBlocks = blocks.filter((b) => b.type === "PARTIAL");
  const recurringBlocks = blocks.filter((b) => b.type === "RECURRING");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-accent text-gold uppercase tracking-widest">Availability Rules</h2>
          <p className="text-warm-white/60 text-sm">Manage open and closed times for the public booking form.</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-accent text-sm uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all"
        >
          {isAdding ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Rule</>}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="glass p-6 rounded-2xl border border-gold/30 space-y-5 animate-in fade-in slide-in-from-top-4">
          <h3 className="font-accent text-warm-white uppercase tracking-widest border-b border-white/5 pb-3">New Availability Block</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Rule Name / Reason</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Christmas Closure" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-warm-white outline-none focus:border-gold" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Rule Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-warm-white outline-none focus:border-gold">
                <option value="FULL_DAY">Full Day Closure (Specific Date)</option>
                <option value="DATE_RANGE">Date Range (Multiple Days)</option>
                <option value="PARTIAL">Partial Block (Specific Hours)</option>
                <option value="RECURRING">Weekly Recurring Rule</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
            {/* Conditional Inputs based on Type */}
            {(type === "FULL_DAY" || type === "DATE_RANGE" || type === "PARTIAL") && (
              <div className="space-y-2">
                <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Select Date</label>
                <input required type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-warm-white [color-scheme:dark] outline-none focus:border-gold" />
              </div>
            )}

            {type === "DATE_RANGE" && (
              <div className="space-y-2">
                <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">End Date (Inclusive)</label>
                <input required type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-warm-white [color-scheme:dark] outline-none focus:border-gold" />
              </div>
            )}

            {type === "RECURRING" && (
              <div className="space-y-2">
                <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Day of Week</label>
                <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-warm-white outline-none focus:border-gold">
                  {DAYS_OF_WEEK.map((day, idx) => (
                    <option key={day} value={idx}>{day}</option>
                  ))}
                </select>
              </div>
            )}

            {(type === "PARTIAL" || type === "RECURRING") && (
              <>
                <div className="space-y-2">
                  <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">Start Time (Optional for Recurring)</label>
                  <input type="time" required={type === "PARTIAL"} value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-warm-white [color-scheme:dark] outline-none focus:border-gold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-accent text-warm-white/40 uppercase tracking-widest">End Time</label>
                  <input type="time" required={type === "PARTIAL"} value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl py-2 px-4 text-warm-white [color-scheme:dark] outline-none focus:border-gold" />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-8 py-3 bg-gold text-black font-accent text-sm uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isPending ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
              Save Rule
            </button>
          </div>
        </form>
      )}

      {blocks.length === 0 && !isAdding && (
        <div className="flex flex-col items-center justify-center py-20 glass rounded-3xl border border-white/5">
          <Calendar size={48} className="text-warm-white/10 mb-4" />
          <p className="font-accent text-warm-white/20 uppercase tracking-widest text-lg">No Rules Set</p>
          <p className="text-xs text-warm-white/20">All standard hours are currently open.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Full Days & Ranges */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-accent text-warm-white uppercase tracking-widest text-sm mb-4">
            <Calendar size={16} className="text-gold" /> Holidays & Closures
          </h3>
          {fullDayBlocks.length === 0 ? <EmptyState /> : fullDayBlocks.map((b) => (
            <BlockCard key={b.id} block={b} onDelete={() => handleDelete(b.id)} isPending={isPending} />
          ))}
        </div>

        {/* Partial Blocks */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-accent text-warm-white uppercase tracking-widest text-sm mb-4">
            <Clock size={16} className="text-gold" /> Partial Blocks
          </h3>
          {partialBlocks.length === 0 ? <EmptyState /> : partialBlocks.map((b) => (
            <BlockCard key={b.id} block={b} onDelete={() => handleDelete(b.id)} isPending={isPending} />
          ))}
        </div>

        {/* Recurring */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-accent text-warm-white uppercase tracking-widest text-sm mb-4">
            <RotateCcw size={16} className="text-gold" /> Weekly Rules
          </h3>
          {recurringBlocks.length === 0 ? <EmptyState /> : recurringBlocks.map((b) => (
            <BlockCard key={b.id} block={b} onDelete={() => handleDelete(b.id)} isPending={isPending} />
          ))}
        </div>

      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-6 glass rounded-2xl border border-white/5 border-dashed flex flex-col items-center text-center">
      <p className="text-xs font-mono text-warm-white/20">None</p>
    </div>
  );
}

function BlockCard({ block, onDelete, isPending }: any) {
  return (
    <div className="p-4 glass rounded-2xl border border-white/5 relative group hover:border-gold/20 transition-all">
      <button 
        onClick={onDelete}
        disabled={isPending}
        className="absolute top-4 right-4 text-warm-white/20 hover:text-red-500 transition-colors disabled:opacity-50"
      >
        <X size={14} />
      </button>
      
      <p className="font-accent text-warm-white uppercase tracking-widest text-sm pr-6">{block.name}</p>
      
      <div className="mt-2 space-y-1">
        {block.type === "FULL_DAY" && block.startDate && (
          <p className="text-xs font-mono text-warm-white/60">
            {format(new Date(block.startDate), "MMM d, yyyy")} (All Day)
          </p>
        )}
        
        {block.type === "DATE_RANGE" && block.startDate && block.endDate && (
          <p className="text-xs font-mono text-warm-white/60">
            {format(new Date(block.startDate), "MMM d, yyyy")} <br/> 
            <span className="text-warm-white/30 text-[10px]">until</span> <br/>
            {format(new Date(block.endDate), "MMM d, yyyy")}
          </p>
        )}
        
        {block.type === "PARTIAL" && block.startDate && (
          <>
            <p className="text-xs font-mono text-warm-white/60">{format(new Date(block.startDate), "MMM d, yyyy")}</p>
            <p className="text-xs font-mono text-gold">{block.startTime} — {block.endTime}</p>
          </>
        )}
        
        {block.type === "RECURRING" && block.dayOfWeek !== null && (
          <>
            <p className="text-xs font-mono text-warm-white/60">Every {DAYS_OF_WEEK[block.dayOfWeek]}</p>
            <p className="text-xs font-mono text-gold">
              {block.startTime && block.endTime ? `${block.startTime} — ${block.endTime}` : "Closed All Day"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
