import axios from "axios";
import envConfig from "@/config";
import {
  RawMovieDetail,
  RawMovie,
  RawMovieCredits,
  RawMovieVideos,
  RawMovieReviews,
} from "./types";

const request = axios.create({
  baseURL: envConfig.apiEndpoint,
  headers: {
    Authorization: `Bearer ${envConfig.apiToken}`,
  },
});

request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.isAxiosError) {
      const message = err.response?.data?.message;
      const _err = message ? new Error(message) : err;
      _err.response = err.response;

      return Promise.reject(_err);
    }
    return Promise.reject(err);
  },
);

export const getNowPlayingMovies = async (
  page: number = 1,
): Promise<{
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
  page: number;
  results: Array<RawMovie>;
}> => {
  return request.get(`/movie/now_playing?page=${page}`);
};

export const getPopularMovies = async (
  page: number = 1,
): Promise<{
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<RawMovie>;
}> => {
  return request.get(`/movie/popular?page=${page}`);
};

export const getTopRatedMoives = async (
  page: number = 1,
): Promise<{
  page: number;
  total_pages: number;
  total_results: number;
  results: Array<RawMovie>;
}> => {
  return request.get(`/movie/top_rated?page=${page}`);
};

export const getUpcomingMovies = async (
  page: number = 1,
): Promise<{
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
  page: number;
  results: Array<RawMovie>;
}> => {
  return request.get(`/movie/upcoming?page=${page}`);
};

export const getMovie = async (id: string): Promise<RawMovieDetail> => {
  return request.get(`/movie/${id}`);
};

export const getMovieCredits = async (id: string): Promise<RawMovieCredits> => {
  return request.get(`/movie/${id}/credits`);
};

export const getMovieVideos = async (id: string): Promise<RawMovieVideos> => {
  return request.get(`/movie/${id}/videos`);
};

export const getMovieReviews = async (id: string): Promise<RawMovieReviews> => {
  return request.get(`/movie/${id}/reviews`);
};
