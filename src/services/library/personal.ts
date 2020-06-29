import { OMDB } from './../omdb/api';
import { JsonServer, UserMovies, UserMovie, UserWatchedMovie } from './../json-server';
import { Catalog } from './catalogs';
import { mapper } from './mapper';
import { Movie, WatchedMovie } from './movies';
import { MovieResponse } from '../omdb/movies';

const movies = async (user: number, catalog: Catalog): Promise<Movie[]> => {
  const userMovies: UserMovies = await JsonServer.fetchUserMovies(user);
  const catalogMovies: UserMovie[] = (userMovies[catalog] as UserMovie[]) || [];
  const movies = catalogMovies.map((movie: UserMovie) => {
    return OMDB.movie(movie.id).then(mapper.toMovie);
  });

  return Promise.all(movies);
};

const moviesToWatch = (user: number): Promise<Movie[]> => {
  return movies(user, 'toWatch');
};

const moviesWatched = async (user: number): Promise<WatchedMovie[]> => {
  const { watched = [] }: UserMovies = await JsonServer.fetchUserMovies(user);

  const movies = watched.map(async (userWatchedMovie: UserWatchedMovie) => {
    const response: MovieResponse = await OMDB.movie(userWatchedMovie.id);
    return {
      ...mapper.toMovie(response),
      user: {
        id: user,
        rating: userWatchedMovie.score,
      },
    };
  });

  return Promise.all(movies);
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
