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
import Banner from "./components/Banner";

async function getMoviesByCategory(fetcher: typeof getPopularMovies) {
  try {
    const data = await fetcher();
    const movies = data.results;

    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      backDropPath: movie.backdrop_path,
      posterPath: movie.poster_path,
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
  const bannerMovie =
    nowPlayingMovies[Math.floor(Math.random() * nowPlayingMovies.length)];

  return (
    <main className="min-h-screen justify-between">
      <Banner
        id={bannerMovie.id}
        title={bannerMovie.title}
        overview={bannerMovie.overview}
        backgroundPath={bannerMovie.backDropPath}
      />
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <MovieRow category="Now Playing">
            {nowPlayingMovies.map(({ id, backDropPath, posterPath }, index) => (
              <li key={index}>
                <Link href={`/movie/${id}`}>
                  <MovieThumbnail backgroudPath={backDropPath || posterPath} />
                </Link>
              </li>
            ))}
          </MovieRow>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <MovieRow category="Upcoming">
            {upcomingMovies.map(({ id, backDropPath, posterPath }, index) => (
              <li key={index}>
                <Link href={`/movie/${id}`}>
                  <MovieThumbnail backgroudPath={backDropPath || posterPath} />
                </Link>
              </li>
            ))}
          </MovieRow>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <MovieRow category="Top Rated">
            {topRatedMovies.map(({ id, backDropPath, posterPath }, index) => (
              <li key={index}>
                <Link href={`/movie/${id}`}>
                  <MovieThumbnail backgroudPath={backDropPath || posterPath} />
                </Link>
              </li>
            ))}
          </MovieRow>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <MovieRow category="Popular">
            {popularMovies.map(({ id, backDropPath, posterPath }, index) => (
              <li key={index}>
                <Link href={`/movie/${id}`}>
                  <MovieThumbnail backgroudPath={backDropPath || posterPath} />
                </Link>
              </li>
            ))}
          </MovieRow>
        </Suspense>
      </div>
    </main>
  );
}
