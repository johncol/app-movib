import { OMDB, Movies } from './omdb';
import { JsonServer, UserMovies, UserMovie } from './json-server';

type Catalog = 'toWatch' | 'watched';

const movies = async (user: number, catalog: Catalog): Promise<Movies> => {
  const userMovies: UserMovies = await JsonServer.fetchUserMovies(user);
  const movies = (userMovies[catalog] as UserMovie[]).map((movie: UserMovie) => {
    return OMDB.movie(movie.id);
  });

  return Promise.all(movies);
};

const moviesToWatch = (user: number): Promise<Movies> => {
  return movies(user, 'toWatch');
};

const moviesWatched = async (user: number): Promise<Movies> => {
  return movies(user, 'watched');
};

const addMovieToWatchList = async (user: number, movieId: string): Promise<any> => {
  const userMovies: UserMovies = await JsonServer.fetchUserMovies(user);
  const toWatch: UserMovie[] = userMovies.toWatch || [];
  userMovies.toWatch = [...toWatch, { id: movieId }];

  return JsonServer.updateUserMovies(userMovies);
};

const removeMovieFromWatchList = async (user: number, movieId: string): Promise<any> => {
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

  const toggleMovie = inList ? library.removeMovieFromWatchList : library.addMovieToWatchList;
  return toggleMovie(user, movieId);
};

export const library = {
  moviesToWatch,
  moviesWatched,
  addMovieToWatchList,
  removeMovieFromWatchList,
  isMovieInWatchList,
  isMovieInLists,
  toggleMovieInWatchList,
};
