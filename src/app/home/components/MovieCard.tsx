"use client";

import { MouseEvent } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import MovieThumbnail from "./MovieThumbnail";
import { Movie, useUserMoiveListStore } from "@/stores/movies";

type MovieCardProps = {
  movie: Movie;
  width?: string;
  height?: string;
};

function getReleaseYear(releaseDate: string) {
  return releaseDate.split("-")[0];
}

export default function MovieCard({ movie, width, height }: MovieCardProps) {
  const { id, backDropPath, posterPath } = movie;
  const size = {
    width: width ? width : "w-[260px]",
    height: height ? height : "h-[180px]",
  };
  const addToMovieList = useUserMoiveListStore((state) => state.addToList);
  const removeFromList = useUserMoiveListStore((state) => state.removeFromList);

  const isAddToList = Boolean(
    useUserMoiveListStore((state) =>
      state.movies.find((movie) => movie.id === id),
    ),
  );

  function toggle(e: MouseEvent<HTMLSpanElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (isAddToList) {
      removeFromList(movie.id);
    } else {
      addToMovieList(movie);
    }
  }

  return (
    <li className={`${size.width} ${size.height}`}>
      <Link
        href={`/movie/${id}`}
        className="block h-full bg-mv-blue-900 shadow-lg shadow-black/80 rounded overflow-hidden"
      >
        <div className="group relative">
          <MovieThumbnail backgroundPath={backDropPath || posterPath} />
          <span
            className={`${
              !isAddToList && "lg:hidden"
            } group-hover:block rounded-full bg-black text-black border-white border w-fit hover:bg-mv-blue-500 absolute bottom-1 right-1 cursor-pointer ${
              isAddToList && "bg-mv-blue-500"
            }`}
            onClick={toggle}
          >
            <PlusIcon className="text-white w-6 h-6 md:w-8 md:h-8" />
          </span>
        </div>
        <div className="p-1">
          <div className="flex justify-between">
            <h4 className="pr-2 truncate">{movie.title}</h4>
            <span>{getReleaseYear(movie.releaseDate)}</span>
          </div>
        </div>
      </Link>
    </li>
  );
}
