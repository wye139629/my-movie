import { StarIcon } from "@heroicons/react/24/solid";
import { type Review } from "./MovieReviews";
import { useState } from "react";

export function ReviewCard({ review }: { review: Review }) {
  const [isExpand, setIsExpand] = useState(false);
  const yellowStars = review.rating ? Math.floor(review.rating / 2) : 0;
  const grayStars = 5 - yellowStars;

  return (
    <div className="border-mv-black border rounded-lg  p-4 mb-4 bg-mv-black/50 shadow shadow-gray-500">
      <div className="flex items-center mb-2 space-x-4">
        <div className="space-y-1 font-medium">
          <p>{review.author}</p>
        </div>
      </div>
      <div className="flex items-center mb-1">
        {review.rating ? (
          <>
            {new Array(yellowStars).fill("").map((_, idx) => (
              <StarIcon key={idx} className="w-4 h-4 text-yellow-300 mr-1" />
            ))}
            {new Array(grayStars).fill("").map((_, idx) => (
              <StarIcon key={idx} className="w-4 h-4 text-gray-300 mr-1" />
            ))}
          </>
        ) : null}
      </div>
      <p
        className={`mb-2 text-gray-300 line-clamp-4 ${isExpand && "line-clamp-none"
          }`}
      >
        {review.content}
      </p>
      <span
        className={`block mb-5 text-sm font-medium text-mv-blue-light cursor-pointer `}
        onClick={() => {
          setIsExpand(!isExpand);
        }}
      >
        {isExpand ? "Hide" : "Read more"}
      </span>
    </div>
  );
}
