import { getAdminReviews } from "@/app/actions/reviews";
import ReviewsClient from "./ReviewsClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews | JB Barbershop Admin",
};

export default async function ReviewsAdminPage() {
  const reviews = await getAdminReviews();

  return <ReviewsClient initialData={reviews} />;
}
