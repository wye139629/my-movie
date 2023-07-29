"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import MovieThumbnail from "./MovieThumbnail";
import { Movie, useUserMoiveListStore } from "@/stores/movies";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { id, backDropPath, posterPath } = movie;
  const addToMovieList = useUserMoiveListStore((state) => state.addToList);
  const removeFromList = useUserMoiveListStore((state) => state.removeFromList);

  const isAddToList = Boolean(
    useUserMoiveListStore((state) =>
      state.movies.find((movie) => movie.id === id),
    ),
  );

  function toggle() {
    if (isAddToList) {
      removeFromList(movie.id);
    } else {
      addToMovieList(movie);
    }
  }

  return (
    <div className="group relative">
      <Link href={`/movie/${id}`}>
        <MovieThumbnail backgroundPath={backDropPath || posterPath} />
      </Link>
      <span
        className={`${
          !isAddToList && "lg:hidden"
        } group-hover:block rounded-full bg-black text-black border-white border w-fit hover:bg-mv-blue-500 absolute bottom-1 right-1 cursor-pointer ${
          isAddToList && "bg-mv-blue-500"
        }`}
        onClick={toggle}
      >
        <PlusIcon className="text-white w-6 h-6 md:w-8 md:h-8 " />
      </span>
    </div>
  );
}
