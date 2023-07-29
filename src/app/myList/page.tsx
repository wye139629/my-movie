"use client";

import { MovieLotteryModal, PaginationList } from "@/components/share";
import { useUserMoiveListStore } from "@/stores/movies";
import MovieThumbnail from "../home/components/MovieThumbnail";
import Link from "next/link";
import { InboxIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Page() {
  const removeFromList = useUserMoiveListStore((state) => state.removeFromList);
  const { type: sortType, order } = useUserMoiveListStore(
    (state) => state.sortOption,
  );
  const sortedMovies = useUserMoiveListStore((state) => {
    const { type } = state.sortOption;

    return state.movies.sort((a, b) => {
      if (type === "release_date") {
        const aTime = new Date(a.releaseDate).getTime();
        const bTime = new Date(b.releaseDate).getTime();

        return bTime - aTime;
      } else {
        return (b.popularity = a.popularity);
      }
    });
  });
  const changeSortOption = useUserMoiveListStore(
    (state) => state.changeSortOption,
  );

  return (
    <main className="text-white pb-20">
      <section className="space-y-4 pt-4 pb-2 px-4 md:px-24">
        <MovieLotteryModal />
        <h2 className="text-xl text-center md:text-2xl md:text-left p-2">
          My Movie List
        </h2>

        <div className="flex justify-center md:block space-x-2">
          <button
            className={`border py-2 text-center rounded-full w-36 hover:bg-mv-blue-500 ${
              sortType === "release_date" && "bg-mv-blue-500"
            }`}
            onClick={() => {
              changeSortOption({ type: "release_date", order: "desc" });
            }}
          >
            Release Date
          </button>
          <button
            className={`border py-2 text-center rounded-full w-36 hover:bg-mv-blue-500 ${
              sortType === "popularity" && "bg-mv-blue-500"
            }`}
            onClick={() => {
              changeSortOption({ type: "popularity", order: "desc" });
            }}
          >
            Popularity
          </button>
        </div>
      </section>
      <section className="min-h-[43vh] px-12 md:px-24">
        {sortedMovies.length === 0 ? (
          <div className="min-h-[43vh] flex justify-center items-center">
            <InboxIcon className="w-20 h-20" />
          </div>
        ) : (
          <div key={`${sortType}-${order}`}>
            <PaginationList
              direction="horizontal"
              data={sortedMovies}
              pageSize={12}
              total={sortedMovies.length}
              rowKey="id"
              renderItem={({ id, backDropPath, posterPath }) => {
                return (
                  <div className="relative p-2">
                    <Link href={`/movie/${id}`} className="relative w-[260px]">
                      <MovieThumbnail
                        backgroundPath={backDropPath || posterPath}
                      />
                    </Link>
                    <span
                      className={`group-hover:block rounded-full bg-black text-black border-white border w-fit absolute top-4 right-4 cursor-pointer`}
                      onClick={() => removeFromList(id)}
                    >
                      <XMarkIcon className="text-white w-5 h-5" />
                    </span>
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
