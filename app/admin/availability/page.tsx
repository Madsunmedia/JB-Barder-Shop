import { getAvailabilityBlocks } from "@/app/actions/availability-admin";
import AvailabilityClient from "./AvailabilityClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Availability Management | JB Barbershop",
};

export default async function AvailabilityPage() {
  const result = await getAvailabilityBlocks();
  const blocks = result.success ? result.blocks ?? [] : [];

  return <AvailabilityClient initialBlocks={blocks} />;
}
