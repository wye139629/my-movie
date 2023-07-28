"use client";

import { PaginationList } from "@/components/share";
import { ReviewCard } from "./ReviewCard";
import { type Review } from "./MovieReviews";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  return (
    <PaginationList
      data={reviews}
      pageSize={5}
      total={reviews.length}
      renderItem={(item) => {
        return <ReviewCard review={item} />;
      }}
    />
  );
}
