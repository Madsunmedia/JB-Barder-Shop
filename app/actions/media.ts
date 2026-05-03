"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// SECTIONS is in lib/media-sections.ts (cannot be exported from a "use server" file)
export { SECTIONS } from "@/lib/media-sections";

export async function getMediaBySection(section: string) {
  try {
    const items = await prisma.mediaItem.findMany({
      where: { section },
      orderBy: { order: "asc" },
    });
    return { success: true, items };
  } catch (error) {
    console.error("Failed to fetch media:", error);
    return { success: false, error: "Failed to fetch media", items: [] };
  }
}

export async function getAllMedia() {
  try {
    const items = await prisma.mediaItem.findMany({
      orderBy: [{ section: "asc" }, { order: "asc" }],
    });
    return { success: true, items };
  } catch (error) {
    console.error("Failed to fetch all media:", error);
    return { success: false, error: "Failed to fetch media", items: [] };
  }
}

export async function createMediaItem(data: {
  url: string;
  publicId?: string;
  title?: string;
  altText?: string;
  section: string;
}) {
  try {
    // Get current max order in section
    const maxOrder = await prisma.mediaItem.count({ where: { section: data.section } });
    const item = await prisma.mediaItem.create({
      data: {
        url: data.url,
        publicId: data.publicId || null,
        title: data.title || null,
        altText: data.altText || null,
        section: data.section,
        order: maxOrder,
      },
    });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true, item };
  } catch (error) {
    console.error("Failed to create media item:", error);
    return { success: false, error: "Failed to create media item" };
  }
}

export async function updateMediaItem(
  id: string,
  data: { title?: string; altText?: string; section?: string; order?: number }
) {
  try {
    const item = await prisma.mediaItem.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true, item };
  } catch (error) {
    console.error("Failed to update media item:", error);
    return { success: false, error: "Failed to update" };
  }
}

export async function deleteMediaItem(id: string) {
  try {
    await prisma.mediaItem.delete({ where: { id } });
    revalidatePath("/admin/gallery");
    revalidatePath("/gallery");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete media item:", error);
    return { success: false, error: "Failed to delete" };
  }
}
