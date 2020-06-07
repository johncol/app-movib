import { cache } from './cache';

interface MovieResponse {
  Response: string;
  Error?: string;
}

export interface Movie extends MovieResponse {
  Title: string;
  Year: string;
  Runtime: string;
  Released: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  totalSeasons: string;
}

export type Movies = Movie[];

const key: string = 'afe28da9';
const host: string = `http://www.omdbapi.com/?apikey=${key}`;

const movie = async (imdbId: string): Promise<Movie> => {
  const movieInCache: Movie | null = cache.get(imdbId);
  if (movieInCache) {
    return movieInCache;
  }

  const response = await fetch(`${host}&i=${imdbId}`);
  const movieResponse: MovieResponse = await response.json();
  console.debug(`Movie ${imdbId}:`, movieResponse);

  if (movieResponse.Response !== 'True') {
    console.warn(movieResponse.Error);
    throw new Error(`Movie ${imdbId} not found`);
  }

  const movie: Movie = movieResponse as Movie;
  cache.save(movie);

  return movie;
};

export const omdb = {
  movie,
};
