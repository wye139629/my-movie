import MovieRow from "./components/MovieRow";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMoives,
  getUpcomingMovies,
} from "@/lib/api";
import Banner from "./components/Banner";
import MovieCard from "./components/MovieCard";

async function getMoviesByCategory(fetcher: typeof getPopularMovies) {
  try {
    const data = await fetcher();
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
