import { OMDB } from './../omdb/api';
import { JsonServer, UserMovies, UserMovie, WatchedMovie } from './../json-server';
import { Catalog } from './catalogs';
import { mapper } from './mapper';
import { Movie } from './movies';

const movies = async (user: number, catalog: Catalog): Promise<Movie[]> => {
  const userMovies: UserMovies = await JsonServer.fetchUserMovies(user);
  const movies = (userMovies[catalog] as UserMovie[]).map((movie: UserMovie) => {
    return OMDB.movie(movie.id).then(mapper.toMovie);
  });

  return Promise.all(movies);
};

const moviesToWatch = (user: number): Promise<Movie[]> => {
  return movies(user, 'toWatch');
};

const moviesWatched = async (user: number): Promise<Movie[]> => {
  return movies(user, 'watched');
};

const addMovieToWatchList = async (user: number, movieId: string): Promise<UserMovies> => {
  const userMovies: UserMovies = await JsonServer.fetchUserMovies(user);
  const toWatch: UserMovie[] = userMovies.toWatch || [];
  userMovies.toWatch = [...toWatch, { id: movieId }];

  return JsonServer.updateUserMovies(userMovies);
};

const removeMovieFromWatchList = async (user: number, movieId: string): Promise<UserMovies> => {
  const userMovies: UserMovies = await JsonServer.fetchUserMovies(user);
  const toWatch: UserMovie[] = userMovies.toWatch || [];
  userMovies.toWatch = toWatch.filter(({ id }) => id !== movieId);

  return JsonServer.updateUserMovies(userMovies);
};

const isMovieInWatchList = async (user: number, movieId: string): Promise<boolean> => {
  const userMovies: UserMovies = await JsonServer.fetchUserMovies(user);
  return userMovies.toWatch.map(({ id }) => id).includes(movieId);
};

const isMovieInLists = async (user: number, movieId: string): Promise<boolean> => {
  const userMovies: UserMovies = await JsonServer.fetchUserMovies(user);
  return [
    ...userMovies.toWatch.map(({ id }) => id),
    ...userMovies.watched.map(({ id }) => id),
  ].includes(movieId);
};

const toggleMovieInWatchList = async (
  user: number,
  movieId: string,
  inList?: boolean
): Promise<UserMovies> => {
  if (inList === undefined) {
    inList = await isMovieInWatchList(user, movieId);
  }

  const toggleMovie = inList ? personal.removeMovieFromWatchList : personal.addMovieToWatchList;
  return toggleMovie(user, movieId);
};

const fromWatchListToWatched = async (
  user: number,
  movieId: string,
  score: number
): Promise<UserMovies> => {
  const userMovies: UserMovies = await JsonServer.fetchUserMovies(user);
  const { toWatch, watched } = userMovies;

  const movie: UserMovie | undefined = toWatch.find(({ id }) => id === movieId);
  if (movie === undefined) {
    throw new Error(`Movie ${movieId} not found in watch list`);
  }
  toWatch.splice(toWatch.indexOf(movie), 1);

  watched.push({
    id: movie.id,
    score,
  });

  return JsonServer.updateUserMovies(userMovies);
};

export const personal = {
  moviesToWatch,
  moviesWatched,
  addMovieToWatchList,
  removeMovieFromWatchList,
  isMovieInWatchList,
  isMovieInLists,
  toggleMovieInWatchList,
  fromWatchListToWatched,
};
