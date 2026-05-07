import { getAdminReviews } from "@/app/actions/reviews";
import ReviewsClient from "./ReviewsClient";

export const dynamic = "force-dynamic";

export default async function ReviewsAdminPage() {
  const reviews = await getAdminReviews();

  return <ReviewsClient initialData={reviews} />;
}
