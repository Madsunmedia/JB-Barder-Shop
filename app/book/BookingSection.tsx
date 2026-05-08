"use client";

import dynamic from "next/dynamic";

const BookingWizard = dynamic(
  () => import("@/components/Booking/BookingWizard"),
  { ssr: false }
);

export default function BookingSection() {
  return <BookingWizard />;
}
