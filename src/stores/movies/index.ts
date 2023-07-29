import { create } from "zustand";

export type Movie = {
  id: string;
  title: string;
  overview: string;
  backDropPath: string;
  posterPath: string;
  releaseDate: string;
  popularity: number;
  runtime?: number;
  genres?: Array<{ id: number; name: string }>;
};

type SortMovieOption = {
  type: "release_date" | "popularity";
  order: "desc" | "asc";
};

type UserMovieListState = {
  movies: Array<Movie>;
  sortOption: SortMovieOption;
  addToList: (movie: Movie) => void;
  removeFromList: (id: string) => void;
  changeSortOption: (option: SortMovieOption) => void;
};

export const useUserMoiveListStore = create<UserMovieListState>()((set) => ({
  movies: [],
  sortOption: { type: "release_date", order: "desc" },
  addToList: (movie) => set((state) => ({ movies: [...state.movies, movie] })),
  removeFromList: (id) =>
    set((state) => ({
      movies: state.movies.filter((movie) => movie.id !== id),
    })),
  changeSortOption: (option) => set(() => ({ sortOption: option })),
}));
