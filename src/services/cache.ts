import { Movie } from './omdb';

const save = (movie: Movie): void => {
  localStorage.setItem(movie.imdbID, JSON.stringify(movie));
};

const get = (imdbId: string): Movie | null => {
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
