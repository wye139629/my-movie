import Image from "next/image";
import config from "@/config";

export default function MovieThumbnail({
  backgroundPath,
}: {
  backgroundPath: string;
}) {
  return (
    <div className="relative h-32 min-w-[260px] cursor-pointer">
      <Image
        className="rounded-sm md:rounded object-cover"
        src={`${config.imageEndpoint}/w500${backgroundPath}`}
        alt="movie-img"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
