import { Movie } from './library/movies';
import { Path } from '../constants/paths';

const setMovieIdInUrl = (movie: Movie): void => {
  const { href: url } = window.location;

  let newPath: string;
  if (url.includes(Path.LIST_TO_WATCH)) {
    newPath = Path.ITEM_TO_WATCH(movie.id);
  } else if (url.includes(Path.LIST_WATCHED)) {
    newPath = Path.ITEM_WATCHED(movie.id);
  } else {
    throw new Error('Unexpected path to be in: ' + url);
  }

  window.history.pushState(`Movie ${movie.id}`, document.title, newPath);
};

const getMovieIdFromUrl = (): string => {
  const [movieId] = window.location.pathname.split('/').reverse();
  if (!movieId.startsWith('tt')) {
    throw new Error('No movie ID found at the end of the current path');
  }
  return movieId;
};

export const urls = {
  setMovieIdInUrl,
  getMovieIdFromUrl,
};
