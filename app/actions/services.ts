"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface ServiceData {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export async function getServices() {
  try {
    return await prisma.service.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function addService(data: ServiceData) {
  try {
    const service = await prisma.service.create({ data });
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true, data: service };
  } catch (error) {
    console.error("Failed to add service:", error);
    return { success: false, error: "Database error" };
  }
}

export async function updateService(id: string, data: ServiceData) {
  try {
    const service = await prisma.service.update({ where: { id }, data });
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true, data: service };
  } catch (error) {
    console.error(`Failed to update service ${id}:`, error);
    return { success: false, error: "Database error" };
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({ where: { id } });
    revalidatePath("/admin/services");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete service ${id}:`, error);
    return { success: false, error: "Database error" };
  }
}
