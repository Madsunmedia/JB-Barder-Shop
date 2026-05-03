"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAvailabilityBlocks() {
  try {
    const blocks = await prisma.availabilityBlock.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, blocks };
  } catch (error) {
    console.error("Failed to fetch availability blocks:", error);
    return { success: false, error: "Failed to fetch blocks" };
  }
}

export async function createAvailabilityBlock(data: any) {
  try {
    const block = await prisma.availabilityBlock.create({
      data: {
        name: data.name,
        type: data.type,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        dayOfWeek: data.dayOfWeek !== undefined ? parseInt(data.dayOfWeek) : null,
      },
    });
    revalidatePath("/admin/availability");
    return { success: true, block };
  } catch (error) {
    console.error("Failed to create availability block:", error);
    return { success: false, error: "Failed to create block" };
  }
}

export async function deleteAvailabilityBlock(id: string) {
  try {
    await prisma.availabilityBlock.delete({
      where: { id },
    });
    revalidatePath("/admin/availability");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete availability block:", error);
    return { success: false, error: "Failed to delete block" };
  }
}
