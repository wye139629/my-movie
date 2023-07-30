"use client";

import Image from "next/image";
import config from "@/config";
import { useState } from "react";
import { getBase64DataUrl } from "@/utils/image";

export default function MovieThumbnail({
  backgroundPath,
}: {
  backgroundPath: string;
}) {
  const [isError, setIsError] = useState(false);
  return (
    <div className="relative h-32 min-w-[260px] cursor-pointer">
      <Image
        className="object-cover object-top"
        src={
          !isError
            ? `${config.imageEndpoint}/w500${backgroundPath}`
            : "/assets/image-error.jpeg"
        }
        alt="movie-img"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL={getBase64DataUrl(260, 180)}
        onError={() => setIsError(true)}
      />
    </div>
  );
}
