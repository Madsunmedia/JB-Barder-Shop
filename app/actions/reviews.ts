"use server";

import { prisma } from "@/lib/prisma";
import { ReviewStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

/**
 * Fetches all reviews grouped by status for the admin panel.
 */
export async function getAdminReviews() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      pending: reviews.filter((r) => r.status === "PENDING"),
      approved: reviews.filter((r) => r.status === "APPROVED"),
      rejected: reviews.filter((r) => r.status === "REJECTED"),
    };
  } catch (error) {
    console.error("Failed to fetch admin reviews:", error);
    return { pending: [], approved: [], rejected: [] };
  }
}

/**
 * Fetches only APPROVED reviews for the public homepage.
 */
export async function getPublicReviews() {
  try {
    return await prisma.review.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch public reviews:", error);
    return [];
  }
}

/**
 * Updates the status of a review (Approve/Reject).
 */
export async function updateReviewStatus(id: string, status: ReviewStatus) {
  try {
    await prisma.review.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/reviews");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(`Failed to update review ${id} to ${status}:`, error);
    return { success: false, error: "Database error" };
  }
}

/**
 * Deletes a review permanently.
 */
export async function deleteReview(id: string) {
  try {
    await prisma.review.delete({
      where: { id },
    });
    revalidatePath("/admin/reviews");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete review ${id}:`, error);
    return { success: false, error: "Database error" };
  }
}

/**
 * Submits a new review (starts as PENDING).
 */
export async function submitReview(data: { name: string; rating: number; comment: string }) {
  try {
    await prisma.review.create({
      data: {
        name: data.name || "Guest",
        rating: data.rating,
        comment: data.comment,
        status: "PENDING",
      },
    });
    revalidatePath("/admin/reviews");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit review:", error);
    return { success: false, error: "Database error" };
  }
}
