import { getMovieCredits } from "@/lib/api";

type MovieIntroProps = {
  id: string;
  title: string;
  overview: string;
  runtime: number;
  releaseDate: string;
  genres: Array<{ id: number; name: string }>;
};

type MovieStaffs = {
  directors: Array<{ name: string }>;
  actors: Array<{ name: string }>;
};

const getMovieStaffs = async (movieId: string): Promise<MovieStaffs> => {
  try {
    const { cast, crew } = await getMovieCredits(movieId);

    return {
      directors: crew
        .filter(({ job }) => job === "Director")
        .map(({ name }) => ({ name })),
      actors: cast
        .filter(({ known_for_department }) => known_for_department === "Acting")
        .slice(0, 6)
        .map(({ name }) => ({ name })),
    };
  } catch (err) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
};

export default async function MovieIntro({
  id,
  title,
  overview,
  runtime,
  releaseDate,
  genres,
}: MovieIntroProps) {
  const { directors, actors } = await getMovieStaffs(id);

  return (
    <div>
      <h2 className="mb-6">{title}</h2>
      <div className="md:grid md:grid-cols-2 md:gap-10">
        <p className="mb-6 md:mb-0">{overview}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span>Runtime :</span>
            <br />
            <span>{runtime} mins</span>
          </div>
          <div>
            <span>Release Date :</span>
            <br />
            <span>{releaseDate}</span>
          </div>
          <div>
            <span>Genres :</span>
            <br />
            <span>{genres.map(({ name }) => name).join("、")}</span>
          </div>
          <div>
            <span>Director :</span>
            <br />
            <span>{directors.map(({ name }) => name).join("、")}</span>
          </div>
          <div>
            <span>Cast :</span>
            <br />
            <span>{actors.map(({ name }) => name).join("、")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
