"use server";

import { prisma } from "@/lib/prisma";

// This is a basic availability fetcher. It assumes standard operating hours.
// In a full implementation, you would cross-reference this with a Barber's schedule or Settings block.
const STANDARD_HOURS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30"
];

export async function fetchAvailability(dateStr: string, barberSelected?: string) {
  try {
    const targetDate = new Date(dateStr);
    
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const dayOfWeek = targetDate.getDay();

    // 1. Fetch Availability Blocks
    const blocks = await prisma.availabilityBlock.findMany();

    // 2. Check for Full Day closures
    const isFullDayClosed = blocks.some(b => {
      if (b.type === "FULL_DAY" && b.startDate) {
        return b.startDate.toISOString().split("T")[0] === dateStr;
      }
      if (b.type === "DATE_RANGE" && b.startDate && b.endDate) {
        const start = new Date(b.startDate); start.setHours(0,0,0,0);
        const end = new Date(b.endDate); end.setHours(23,59,59,999);
        return targetDate >= start && targetDate <= end;
      }
      if (b.type === "RECURRING" && b.dayOfWeek === dayOfWeek && !b.startTime && !b.endTime) {
        return true;
      }
      return false;
    });

    if (isFullDayClosed) {
      return { success: true, availableSlots: [] };
    }

    // 3. Find existing bookings
    const whereClause: any = {
      dateSelected: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: {
        notIn: ["CANCELLED", "REJECTED"],
      },
    };

    if (barberSelected) {
      whereClause.barberSelected = barberSelected;
    }

    const existingBookings = await prisma.booking.findMany({
      where: whereClause,
      select: {
        timeSelected: true,
      },
    });

    const bookedTimes = new Set(existingBookings.map((b) => b.timeSelected));

    // 4. Find partial blocks
    const partialBlocks = blocks.filter(b => {
      if (b.type === "PARTIAL" && b.startDate && b.startTime && b.endTime) {
         return b.startDate.toISOString().split("T")[0] === dateStr;
      }
      if (b.type === "RECURRING" && b.dayOfWeek === dayOfWeek && b.startTime && b.endTime) {
         return true;
      }
      return false;
    });

    const isSlotBlockedByPartial = (slotTime: string) => {
       return partialBlocks.some(b => {
          return slotTime >= b.startTime! && slotTime < b.endTime!;
       });
    };

    // Filter out standard hours
    const availableSlots = STANDARD_HOURS.filter((time) => {
      if (bookedTimes.has(time)) return false;
      if (isSlotBlockedByPartial(time)) return false;
      
      // If today, filter past times
      const now = new Date();
      const edmontonDateStr = new Intl.DateTimeFormat('en-CA', { 
        timeZone: 'America/Edmonton', 
        year: 'numeric', month: '2-digit', day: '2-digit' 
      }).format(now); // e.g. "2026-05-03"
      
      const edmontonTimeStr = new Intl.DateTimeFormat('en-CA', { 
        timeZone: 'America/Edmonton', 
        hour: '2-digit', minute: '2-digit', hour12: false 
      }).format(now); // e.g. "13:08"

      if (dateStr === edmontonDateStr) {
        if (time <= edmontonTimeStr) return false;
      }

      return true;
    });

    return { success: true, availableSlots };
  } catch (error) {
    console.error("Failed to fetch availability:", error);
    return { success: false, error: "Failed to fetch availability" };
  }
}
