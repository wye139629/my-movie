import axios from "axios";
import envConfig from "@/config";
import { MovieCategory, MovieDetailType } from "./types";

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

const endpoints = {
  MOVIE: {
    BY_ID: (id: string) => `/movie/${id}`,
    BY_CATEGORY: (category: MovieCategory) => `/movie/${category}`,
    DETAIL: (id: string, type: MovieDetailType) => `/movie/${id}/${type}`,
  },
  DISCOVER: "/discover/movie",
  SEARCH: "/search/movie",
};

export { endpoints, request };
