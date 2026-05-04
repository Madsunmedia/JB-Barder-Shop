"use server";

import { BookingStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createBooking(data: {
  fullName: string;
  phoneNumber: string;
  serviceSelected: string;
  barberSelected?: string;
  dateSelected: Date | string;
  timeSelected: string;
  customerNotes?: string;
  source?: string;
}) {
  try {
    const booking = await prisma.booking.create({
      data: {
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        serviceSelected: data.serviceSelected,
        barberSelected: data.barberSelected,
        dateSelected: new Date(data.dateSelected),
        timeSelected: data.timeSelected,
        customerNotes: data.customerNotes,
        source: data.source,
      },
    });
    
    // Optional: Revalidate paths if you have public or admin booking views
    revalidatePath("/admin/bookings");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function listBookings(filters?: {
  status?: BookingStatus;
  dateFrom?: Date;
  dateTo?: Date;
}) {
  try {
    const whereClause: any = {};
    if (filters?.status) whereClause.status = filters.status;
    if (filters?.dateFrom || filters?.dateTo) {
      whereClause.dateSelected = {};
      if (filters.dateFrom) whereClause.dateSelected.gte = filters.dateFrom;
      if (filters.dateTo) whereClause.dateSelected.lte = filters.dateTo;
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      orderBy: [
        { dateSelected: "asc" },
        { timeSelected: "asc" },
      ],
      include: {
        messages: true,
      },
    });

    return { success: true, bookings };
  } catch (error) {
    console.error("Failed to list bookings:", error);
    return { success: false, error: "Failed to fetch bookings" };
  }
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/bookings");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function modifyBookingTime(id: string, dateSelected: Date | string, timeSelected: string) {
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: {
        dateSelected: new Date(dateSelected),
        timeSelected,
      },
    });
    revalidatePath("/admin/bookings");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to modify booking time:", error);
    return { success: false, error: "Failed to modify time" };
  }
}

export async function storeAdminNote(id: string, adminNotes: string) {
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: { adminNotes },
    });
    revalidatePath("/admin/bookings");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to store admin notes:", error);
    return { success: false, error: "Failed to update admin notes" };
  }
}

export async function addBookingMessage(data: {
  bookingId: string;
  sender: "ADMIN" | "CUSTOMER" | "SYSTEM";
  content: string;
}) {
  try {
    const message = await prisma.bookingMessage.create({
      data: {
        bookingId: data.bookingId,
        sender: data.sender,
        content: data.content,
      },
    });
    revalidatePath(`/admin/bookings/${data.bookingId}`);
    return { success: true, message };
  } catch (error) {
    console.error("Failed to add booking message:", error);
    return { success: false, error: "Failed to add message" };
  }
}

export async function getBookingById(id: string) {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { messages: { orderBy: { createdAt: "asc" } } },
    });
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to get booking:", error);
    return { success: false, error: "Failed to fetch booking" };
  }
}

export async function updateBookingStatusAndNote(
  id: string,
  status: BookingStatus,
  adminNote?: string
) {
  try {
    const booking = await prisma.booking.update({
      where: { id },
      data: {
        status,
        ...(adminNote ? { adminNotes: adminNote } : {}),
      },
    });
    // Log a system message for audit trail
    await prisma.bookingMessage.create({
      data: {
        bookingId: id,
        sender: "SYSTEM",
        content: `Status changed to ${status}${adminNote ? ` — Note: ${adminNote}` : ""}`,
      },
    });
    revalidatePath("/admin/bookings");
    return { success: true, booking };
  } catch (error) {
    console.error("Failed to update booking status:", error);
    return { success: false, error: "Failed to update" };
  }
}
