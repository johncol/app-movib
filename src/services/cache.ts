import { MovieResponse } from './omdb/movies';

const save = (movie: MovieResponse): void => {
  localStorage.setItem(movie.imdbID, JSON.stringify(movie));
};

const get = (imdbId: string): MovieResponse | null => {
  const inCache = localStorage.getItem(imdbId);
  if (!inCache) {
    return null;
  }

  return JSON.parse(inCache);
};

export const cache = {
  save,
  get,
};
