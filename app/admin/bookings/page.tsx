import { listBookings } from "@/app/actions/booking";
import BookingsClient from "./BookingsClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bookings | JB Barbershop Admin",
};

export default async function BookingsPage() {
  const result = await listBookings();
  const bookings = result.success ? result.bookings ?? [] : [];

  return <BookingsClient initialBookings={bookings} />;
}
