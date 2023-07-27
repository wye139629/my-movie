import { Suspense } from "react";
import Link from "next/link";
import MovieRow from "./components/MovieRow";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMoives,
  getUpcomingMovies,
} from "@/lib/api";
import MovieThumbnail from "./components/MovieThumbnail";

async function getMoviesByCategory(fetcher: typeof getPopularMovies) {
  try {
    const data = await fetcher();
    const movies = data.results;

    return movies.map((movie) => ({
      id: movie.id,
      backgroudPath: movie.backdrop_path || movie.poster_path,
    }));
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const nowPlayingPromise = getMoviesByCategory(getNowPlayingMovies);
  const popularPromise = getMoviesByCategory(getPopularMovies);
  const topRatedPromise = getMoviesByCategory(getTopRatedMoives);
  const upcomingPromise = getMoviesByCategory(getUpcomingMovies);

  const [nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies] =
    await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

  return (
    <main className="min-h-screen justify-between">
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <MovieRow category="Now Playing">
            {nowPlayingMovies.map(({ id, backgroudPath }, index) => (
              <li key={index}>
                <Link href={`/movie/${id}`}>
                  <MovieThumbnail backgroudPath={backgroudPath} />
                </Link>
              </li>
            ))}
          </MovieRow>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <MovieRow category="Popular">
            {popularMovies.map(({ id, backgroudPath }, index) => (
              <li key={index}>
                <Link href={`/movie/${id}`}>
                  <MovieThumbnail backgroudPath={backgroudPath} />
                </Link>
              </li>
            ))}
          </MovieRow>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <MovieRow category="Upcoming">
            {upcomingMovies.map(({ id, backgroudPath }, index) => (
              <li key={index}>
                <Link href={`/movie/${id}`}>
                  <MovieThumbnail backgroudPath={backgroudPath} />
                </Link>
              </li>
            ))}
          </MovieRow>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <MovieRow category="Top Rated">
            {topRatedMovies.map(({ id, backgroudPath }, index) => (
              <li key={index}>
                <Link href={`/movie/${id}`}>
                  <MovieThumbnail backgroudPath={backgroudPath} />
                </Link>
              </li>
            ))}
          </MovieRow>
        </Suspense>
      </div>
    </main>
  );
}
