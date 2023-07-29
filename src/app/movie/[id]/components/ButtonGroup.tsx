"use client";

import { Movie, useUserMoiveListStore } from "@/stores/movies";
import { PlusIcon } from "@heroicons/react/24/solid";

export function ButtonGruop({ movie }: { movie: Movie }) {
  const addToMovieList = useUserMoiveListStore((state) => state.addToList);
  const removeFromList = useUserMoiveListStore((state) => state.removeFromList);
  const isAddToList = Boolean(
    useUserMoiveListStore((state) =>
      state.movies.find(({ id }) => id === movie.id),
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
    <span
      className={`block rounded-full bg-black text-black border-white border w-fit cursor-pointer hover:bg-mv-blue-500 ${
        isAddToList && "bg-mv-blue-500"
      }`}
      onClick={toggle}
    >
      <PlusIcon className="text-white w-10 h-10" />
    </span>
  );
}
