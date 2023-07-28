import { getMovieReviews } from "@/lib/api";
import ReviewList from "./ReviewList";

export type Review = {
  author: string;
  avatar: string;
  rating: number;
  createdAt: string;
  content: string;
};

const getReviews = async (movieId: string): Promise<Review[]> => {
  try {
    const { results } = await getMovieReviews(movieId);

    return results.map(({ author, author_details, content, created_at }) => ({
      author: author || author_details?.name || author_details?.username,
      avatar: author_details?.avatar_path,
      rating: author_details?.rating,
      createdAt: created_at,
      content,
    }));
  } catch (err) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
};

export default async function MovieReviews({ id }: { id: string }) {
  const reviews = await getReviews(id);

  return (
    <div>
      <ReviewList reviews={reviews} />
    </div>
  );
}
