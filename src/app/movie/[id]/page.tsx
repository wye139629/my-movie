import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/solid";
import { getMovie } from "@/lib/api";
import config from "@/config";
import MovieDetails from "./components/MovieDetails";
import MovieIntro from "./components/MovieIntro";
import MovieVideoList from "./components/MovieVideoList";
import MovieReviews from "./components/MovieReviews";

export type Movie = {
  id: string;
  title: string;
  overview: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  backdropPath: string;
  posterPath: string;
  releaseDate: string;
};

const getMovieDetail = async (movieId: string) => {
  try {
    const {
      id,
      title,
      overview,
      genres,
      runtime,
      release_date,
      backdrop_path,
      poster_path,
    } = await getMovie(movieId);

    return {
      id: String(id),
      title,
      overview,
      runtime,
      genres,
      backdropPath: backdrop_path,
      posterPath: poster_path,
      releaseDate: release_date,
    };
  } catch (err) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
};

export default async function Layout({ params }: { params: { id: string } }) {
  const movie = await getMovieDetail(params.id);

  return (
    <main>
      <div className="absolute top-0 left-0 -z-10 h-[100vh] w-full">
        <Image
          src={`${config.imageEndpoint}/original${movie.backdropPath}`}
          fill
          objectFit="cover"
          alt="movie-banner"
        />
      </div>
      <div className="flex flex-col space-y-2 bg-mv-black/50 text-white py-20 md:py-32 px-10 min-h-[80vh]">
        <section className="space-y-4">
          <h1 className="text-2xl md:text-5xl">{movie.title}</h1>
          <div>
            <p className="md:text-xl">
              <span className="flex space-x-2 md:space-x-4">
                <span>{movie.releaseDate}</span>
                <span>{movie.runtime} mins</span>
              </span>
              <span>
                {movie.genres
                  .map((genre) => {
                    return genre.name;
                  })
                  .join("、")}
              </span>
            </p>
          </div>
          <span className="block rounded-full bg-black text-black border-white border-2 w-fit">
            <PlusIcon className="text-white w-10 h-10" />
          </span>
        </section>
        <MovieDetails
          introContent={
            <MovieIntro
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              runtime={movie.runtime}
              releaseDate={movie.releaseDate}
              genres={movie.genres}
            />
          }
          reviewsContent={<MovieReviews id={movie.id} />}
          videosContent={<MovieVideoList />}
        />
      </div>
    </main>
  );
}
