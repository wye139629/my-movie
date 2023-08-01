import Image from "next/image";
import { endpoints, request } from "@/lib/api";
import config from "@/config";
import MovieDetails from "./components/MovieDetails";
import MovieIntro from "./components/MovieIntro";
import MovieVideoList from "./components/MovieVideoList";
import MovieReviews from "./components/MovieReviews";
import { ButtonGruop } from "./components/ButtonGroup";
import { RawMovieDetail } from "@/lib/api/types";

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
      popularity,
    }: RawMovieDetail = await request.get(endpoints.MOVIE.BY_ID(movieId));

    return {
      id: String(id),
      title,
      overview,
      runtime,
      genres,
      popularity,
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
          priority
          className="object-cover"
          src={`${config.imageEndpoint}/original${movie.backdropPath}`}
          fill
          alt={`${movie.title}-banner"`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
          <ButtonGruop
            movie={{
              id: movie.id,
              title: movie.title,
              overview: movie.overview,
              backDropPath: movie.backdropPath,
              posterPath: movie.posterPath,
              releaseDate: movie.releaseDate,
              popularity: movie.popularity,
            }}
          />
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
