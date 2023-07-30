"use client";

import config from "@/config";
import { useUserMoiveListStore } from "@/stores/movies";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function getRandomIdx(itemLength: number) {
  return Math.floor(Math.random() * itemLength);
}

export function MovieLotteryModal() {
  const movies = useUserMoiveListStore((state) => state.movies);
  const [isOpen, setIsOpen] = useState(false);
  const [summonStatus, setSummonStatus] = useState<
    "pending" | "start" | "finish"
  >("pending");
  const [randomIdx, setRandomIdx] = useState(0);
  const [count, setCount] = useState(3000);

  useEffect(() => {
    if (summonStatus === "finish" || summonStatus === "pending") {
      return;
    }

    let id = setInterval(() => {
      const nextCount = count - 200;

      if (nextCount <= 0) {
        setCount(3000);
        setSummonStatus("finish");
      } else {
        setCount(nextCount);
        setRandomIdx(getRandomIdx(movies.length));
      }
    }, 200);

    return () => {
      clearInterval(id);
    };
  }, [summonStatus, count, movies.length]);

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button
        className="block ml-auto border py-2 text-center rounded-full w-36"
        onClick={toggleOpen}
      >
        Random
      </button>
      <div
        className={`${
          !isOpen && "hidden"
        } fixed left-0 top-0 m-auto bg-mv-blue-900/40 w-full h-full z-20`}
      >
        <div className="relative w-full h-full max-w-2xl max-h-full ml-auto">
          <div className="flex flex-col relative h-full shadow bg-mv-blue-900">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold">Get Random Movie</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleOpen}
              >
                <XMarkIcon />
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-6 space-y-6 flex-grow">
              <div className="flex justify-center items-center w-full h-full">
                {movies.length !== 0 && summonStatus === "pending" && (
                  <QuestionMarkCircleIcon className="w-100 y-100 md:w-200 md:y-200" />
                )}

                {movies.length === 0 ? (
                  <p className="w-full text-center">
                    Please add some movies to the watching list first!
                  </p>
                ) : (
                  movies.map((movie, idx) => {
                    return summonStatus !== "pending" && idx === randomIdx ? (
                      <Link
                        href={`/movie/${movie.id}`}
                        key={movie.id}
                        className={`w-full h-[50%] cursor-pointer transition-transform`}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={`${config.imageEndpoint}/original${
                              movie.backDropPath || movie.posterPath
                            }`}
                            alt="movie-img"
                            fill
                            sizes="(min-width: 180px) 260px, (max-width: 268px) 50vw, 33vw"
                            className={`rounded-sm md:rounded object-cover`}
                          />
                        </div>
                        <h3 className="text-center text-lg py-4">
                          {movie.title}
                        </h3>
                      </Link>
                    ) : null;
                  })
                )}
              </div>
            </div>

            <div className="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                  summonStatus === "start"
                    ? "text-black bg-gray-200 pointer-events-none "
                    : "bg-mv-blue-500 "
                }`}
                onClick={() => {
                  if (movies.length === 0) {
                    return;
                  }
                  setSummonStatus("start");
                }}
              >
                Summon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
