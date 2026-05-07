"use server";

import { prisma } from "@/lib/prisma";

export interface DashboardStats {
  todayBookings: number;
  pendingBookings: number;
  pendingReviews: number;
  totalServices: number;
  recentBookings: {
    id: string;
    fullName: string;
    serviceSelected: string;
    barberSelected: string | null;
    dateSelected: Date;
    timeSelected: string;
    status: string;
    createdAt: Date;
  }[];
  bookingsByDay: { name: string; bookings: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Run all queries in parallel
    const [todayBookings, pendingBookings, pendingReviews, totalServices, recentBookings] =
      await Promise.all([
        prisma.booking.count({
          where: { dateSelected: { gte: today, lt: tomorrow } },
        }),
        prisma.booking.count({ where: { status: "PENDING" } }),
        prisma.review.count({ where: { status: "PENDING" } }),
        prisma.service.count(),
        prisma.booking.findMany({
          orderBy: { createdAt: "desc" },
          take: 8,
          select: {
            id: true,
            fullName: true,
            serviceSelected: true,
            barberSelected: true,
            dateSelected: true,
            timeSelected: true,
            status: true,
            createdAt: true,
          },
        }),
      ]);

    // Build booking trend for last 7 days
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const bookingsByDay = [];
    for (let i = 6; i >= 0; i--) {
      const day = new Date();
      day.setDate(day.getDate() - i);
      day.setHours(0, 0, 0, 0);
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);
      const count = await prisma.booking.count({
        where: { createdAt: { gte: day, lt: nextDay } },
      });
      bookingsByDay.push({ name: days[day.getDay()], bookings: count });
    }

    return {
      todayBookings,
      pendingBookings,
      pendingReviews,
      totalServices,
      recentBookings,
      bookingsByDay,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      todayBookings: 0,
      pendingBookings: 0,
      pendingReviews: 0,
      totalServices: 0,
      recentBookings: [],
      bookingsByDay: [],
    };
  }
}
