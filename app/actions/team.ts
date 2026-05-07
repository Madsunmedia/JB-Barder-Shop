"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTeam() {
  try {
    return await prisma.barber.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to fetch team:", error);
    return [];
  }
}

export async function addBarber(data: {
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties: string[];
}) {
  try {
    const barber = await prisma.barber.create({
      data,
    });
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true, data: barber };
  } catch (error) {
    console.error("Failed to add barber:", error);
    return { success: false, error: "Database error" };
  }
}

export async function updateBarber(
  id: string,
  data: {
    name: string;
    title: string;
    bio: string;
    image: string;
    specialties: string[];
  }
) {
  try {
    const barber = await prisma.barber.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true, data: barber };
  } catch (error) {
    console.error(`Failed to update barber ${id}:`, error);
    return { success: false, error: "Database error" };
  }
}

export async function deleteBarber(id: string) {
  try {
    await prisma.barber.delete({
      where: { id },
    });
    revalidatePath("/admin/team");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete barber ${id}:`, error);
    return { success: false, error: "Database error" };
  }
}
