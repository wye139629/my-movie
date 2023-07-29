"use client";

import { discoverMovies, searchMovies } from "@/lib/api";
import { ChangeEvent, useState, useMemo } from "react";
import useSWR from "swr";
import { debounce } from "@/utils/debounce";
import { PaginationList } from "@/components/share";
import MovieCard from "../home/components/MovieCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState<"release_date" | "popularity">(
    "release_date",
  );

  const { data: discoverMoviesData, isLoading: isDiscoverMovieDataLoading } =
    useSWR({ url: "/dicover/movies", page }, ({ page }) =>
      discoverMovies(page),
    );

  const { data, isLoading } = useSWR(
    query ? { query, page } : null,
    ({ query, page }) => searchMovies({ query, page }),
  );

  const displayData = query ? data : discoverMoviesData;

  // const sortedDisplayMovies = useMemo(() => {
  //   if (!displayData) {
  //     return [];
  //   }
  //
  //   if (sortOption === "release_date") {
  //     return displayData.results.sort((a, b) => {
  //       const aDate = new Date(a.release_date).getTime();
  //       const bDate = new Date(b.release_date).getTime();
  //
  //       return bDate - aDate;
  //     });
  //   } else if (sortOption === "popularity") {
  //     return displayData.results.sort((a, b) => {
  //       return b.popularity - a.popularity;
  //     });
  //   }
  // }, [displayData, sortOption]);

  const debounceSetQuery = useMemo(() => {
    return debounce((value) => setQuery(value), 800);
  }, []);

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    debounceSetQuery(e.target.value);
    setPage(1);
  }

  return (
    <main className="pb-20">
      <section>
        <form>
          <input
            className="block p-6 bg-gray-700/80 text-gray-100 w-full focus:outline-none text-2xl"
            onChange={handleOnChange}
            placeholder="Search the movie you like"
          />
        </form>
      </section>

      <section className="text-white px-12 min-h-[80vh] md:px-24">
        <div className="space-y-4 pt-4 pb-2 px-2">
          {!query && (
            <h2 className="text-xl text-center md:text-2xl md:text-left">
              Discover your movie
            </h2>
          )}
          <div className="flex space-x-2">
            <button
              className={`border py-2 text-center rounded-full w-36 hover:bg-mv-blue-500 ${
                sortOption === "release_date" && "bg-mv-blue-500"
              }`}
              onClick={() => {
                setSortOption("release_date");
              }}
            >
              Release Date
            </button>
            <button
              className={`border py-2 text-center rounded-full w-36 hover:bg-mv-blue-500 ${
                sortOption === "popularity" && "bg-mv-blue-500"
              }`}
              onClick={() => {
                setSortOption("popularity");
              }}
            >
              Popularity
            </button>
          </div>
        </div>

        {query && displayData && displayData?.results.length === 0 ? (
          <div className="text-white text-center text-xl break-words py-52 md:text-2xl md:py-80">
            The movie {query} your are looking for is not exist!
          </div>
        ) : (
          <div key={`${query}-${sortOption}`}>
            <PaginationList
              isLoading={isDiscoverMovieDataLoading || isLoading}
              direction="horizontal"
              data={displayData?.results}
              pageSize={20}
              total={displayData?.total_results || 0}
              rowKey="id"
              onPageChange={(page) => {
                setPage(page);
              }}
              renderItem={({
                id: movieId,
                title,
                overview,
                popularity,
                backdrop_path: backDropPath,
                poster_path: posterPath,
                release_date: releaseDate,
              }) => {
                return (
                  <div className="p-2">
                    <MovieCard
                      movie={{
                        id: String(movieId),
                        title,
                        overview,
                        popularity,
                        backDropPath,
                        posterPath,
                        releaseDate,
                      }}
                    />
                  </div>
                );
              }}
            />
          </div>
        )}
      </section>
    </main>
  );
}
