import Link from "next/link";
import Image from "next/image";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import config from "@/config";

type BannerProps = {
  id: string;
  title: string;
  overview: string;
  backgroundPath: string;
};

export default function Banner({
  id,
  title,
  overview,
  backgroundPath,
}: BannerProps) {
  return (
    <section className="text-white flex flex-col space-y-2 px-10 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[92vh] w-full">
        <Image
          src={`${config.imageEndpoint}/original${backgroundPath}`}
          fill
          objectFit="cover"
          alt="banner-img"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl">{title}</h1>

      <p className="max-w-xs text-xs text-shadow-md text-gray-100 md:max-w-lg md:text-lg lg:max-w-2xl">
        {overview}
      </p>

      <div className="flex space-x-3">
        <Link
          href={`/movie/${id}`}
          className="flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-[gray]/70"
        >
          <span>More Info</span>
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </Link>
      </div>
    </section>
  );
}
