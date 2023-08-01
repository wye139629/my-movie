import MovieRow from "./components/MovieRow";
import { endpoints, request } from "@/lib/api";
import Banner from "./components/Banner";
import MovieCard from "./components/MovieCard";
import { RawMovie } from "@/lib/api/types";

async function getMoviesByCategory(url: string) {
  try {
    const data: {
      total_pages: number;
      total_results: number;
      page: number;
      results: Array<RawMovie>;
      dates?: {
        maximum: string;
        minimum: string;
      };
    } = await request.get(url, {
      params: { page: 1 },
    });

    const movies = data.results;

    return movies.map((movie) => ({
      id: String(movie.id),
      title: movie.title,
      overview: movie.overview,
      backDropPath: movie.backdrop_path,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      popularity: movie.popularity,
    }));
  } catch (error) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
}

export default async function Home() {
  const nowPlayingPromise = getMoviesByCategory(
    endpoints.MOVIE.BY_CATEGORY("now_playing"),
  );
  const popularPromise = getMoviesByCategory(
    endpoints.MOVIE.BY_CATEGORY("popular"),
  );
  const topRatedPromise = getMoviesByCategory(
    endpoints.MOVIE.BY_CATEGORY("top_rated"),
  );
  const upcomingPromise = getMoviesByCategory(
    endpoints.MOVIE.BY_CATEGORY("upcoming"),
  );

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
        <MovieRow category="Now Playing">
          {nowPlayingMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </MovieRow>

        <MovieRow category="Upcoming">
          {upcomingMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </MovieRow>

        <MovieRow category="Top Rated">
          {topRatedMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </MovieRow>

        <MovieRow category="Popular">
          {popularMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </MovieRow>
      </div>
    </main>
  );
}
