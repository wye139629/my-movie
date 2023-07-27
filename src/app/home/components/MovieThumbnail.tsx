import Image from "next/image";
import config from "@/config";

export default function MovieThumbnail({
  backgroudPath,
}: {
  backgroudPath: string;
}) {
  return (
    <div className="relative h-32 min-w-[260px] cursor-pointer">
      <Image
        src={`${config.imageEndpoint}/w500${backgroudPath}`}
        alt="movie-img"
        fill
        sizes="(min-width: 180px) 260px, (max-width: 268px) 50vw, 33vw"
        className="rounded-sm md:rounded object-cover"
      />
    </div>
  );
}
