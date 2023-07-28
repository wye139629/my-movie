export type RawMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type RawMovieDetail = RawMovie & {
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  imdb_id: string;
  belongs_to_collection: {
    id: number;
    name: string;
    backdrop_path: string;
    poster_path: string;
  };
  production_companies: Array<{
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
};

export type RawMovieVideos = {
  id: number;
  results: Array<{
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: "Clip";
    official: boolean;
    published_at: Date;
    id: string;
  }>;
};

export type RawMovieCredits = {
  id: number;
  cast: Array<{
    adult: boolean;
    gender: 1 | 2;
    id: number;
    known_for_department: "Acting" | "Directing" | "Crew" | "Production";
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }>;
  crew: Array<{
    adult: false;
    gender: 1 | 2;
    id: number;
    known_for_department: "Sound" | "Productionh" | "Art" | "Writing";
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: "Sound" | "Production" | "Directing" | "Writing";
    job:
      | "Producer"
      | "Characters"
      | "Original Music Composer"
      | "Editor"
      | "Casting"
      | "Director"
      | "Writer";
  }>;
};

export type RawMovieReviews = {
  id: number;
  page: number;
  results: Array<{
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path: string;
      rating: number;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  }>;
};
