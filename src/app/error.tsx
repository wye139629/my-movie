"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex items-center min-h-[66vh]">
      <section className="text-white p-12 md:p-24">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl md:text-4xl">Sorry! Something went wrong!</h2>
          <p className="text-xl md:text-2xl">
            Please press the button below and retry to get back to home page.
          </p>
          <button
            className="border p-4 rounded-xl w-fit"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
