"use server";

import { BookingStatus } from "@prisma/client";
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
    
    // Set to start and end of the requested day (local or UTC depending on how you store it)
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    const whereClause: any = {
      dateSelected: {
        gte: startOfDay,
        lte: endOfDay,
      },
      // Exclude cancelled and rejected bookings from blocking availability
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

    // Filter out standard hours that are already booked
    const availableSlots = STANDARD_HOURS.filter((time) => !bookedTimes.has(time));

    return { success: true, availableSlots };
  } catch (error) {
    console.error("Failed to fetch availability:", error);
    return { success: false, error: "Failed to fetch availability" };
  }
}
