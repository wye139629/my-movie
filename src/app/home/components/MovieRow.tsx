"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";

type MovieRowProps = {
  category: string;
  children: Array<React.ReactElement>;
};

export default function MovieRow({ category, children }: MovieRowProps) {
  const ulRef = useRef<HTMLUListElement>(null);

  function goNext() {
    if (!ulRef.current) {
      return;
    }

    const { scrollLeft, clientWidth } = ulRef.current;
    const scrollTo = scrollLeft + clientWidth;

    ulRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  }

  function goPrevious() {
    if (!ulRef.current) {
      return;
    }

    const { scrollLeft, clientWidth } = ulRef.current;
    const scrollTo = scrollLeft - clientWidth;

    ulRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  }

  return (
    <section className="text-white pl-10 mb-6">
      <h2>{category}</h2>
      <div className="relative">
        <button
          className="group p-2 absolute top-0 bottom-0 left-0 my-auto opacity-60 hover:bg-gray-800/40 z-10"
          onClick={goPrevious}
        >
          <ChevronLeftIcon className="hidden w-8 h-8 group-hover:block" />
        </button>

        <ul
          ref={ulRef}
          className="flex overflow-x-scroll items-center py-4 space-x-2 pr-10 disable-scrollbar"
        >
          {children}
        </ul>
        <button
          className="group p-2 absolute top-0 bottom-0 right-0 my-auto hover:bg-gray-800/40 z-10"
          onClick={goNext}
        >
          <ChevronRightIcon className="hidden w-8 h-8 group-hover:block" />
        </button>
      </div>
    </section>
  );
}
