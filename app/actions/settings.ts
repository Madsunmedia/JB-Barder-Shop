"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: "global" },
    });
    return settings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

export async function saveSettings(data: {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  minAdvanceHours: number;
  hours: Record<string, { open: string; close: string; closed: boolean }>;
  blockedDates: string[];
}) {
  try {
    const settings = await prisma.settings.upsert({
      where: { id: "global" },
      update: {
        businessName: data.businessName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        minAdvanceHours: data.minAdvanceHours,
        hours: data.hours as any,
        blockedDates: data.blockedDates as any,
      },
      create: {
        id: "global",
        businessName: data.businessName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        minAdvanceHours: data.minAdvanceHours,
        hours: data.hours as any,
        blockedDates: data.blockedDates as any,
      },
    });
    revalidatePath("/admin/settings");
    revalidatePath("/");
    return { success: true, data: settings };
  } catch (error) {
    console.error("Failed to save settings:", error);
    return { success: false, error: "Database error" };
  }
}
