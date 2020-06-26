import { cache } from './../cache';
import { MovieResponse } from './movies';
import { OMDBResponse } from './response';
import { SearchResponse } from './search';

const key: string = 'afe28da9';
const host: string = `http://www.omdbapi.com/?apikey=${key}`;

const movie = async (imdbId: string): Promise<MovieResponse> => {
  const movieInCache: MovieResponse | null = cache.get(imdbId);
  if (movieInCache) {
    return movieInCache;
  }

  const response: Response = await fetch(`${host}&i=${imdbId}`);
  const omdbResponse: OMDBResponse = await response.json();
  console.debug(`Movie ${imdbId}:`, omdbResponse);

  if (omdbResponse.Response !== 'True') {
    console.warn(omdbResponse.Error);
    throw new Error(`Movie ${imdbId} not found`);
  }

  const movie: MovieResponse = omdbResponse as MovieResponse;
  cache.save(movie);

  return movie;
};

const search = async (query: string, page: number = 1): Promise<SearchResponse> => {
  const response: Response = await fetch(`${host}&s=${query}&page=${page}`);
  const omdbResponse: OMDBResponse = await response.json();
  console.debug(`Movies (page ${page}) by query "${query}":`, omdbResponse);

  if (omdbResponse.Response !== 'True') {
    console.warn(omdbResponse.Error);
    throw new Error(omdbResponse.Error);
  }

  return omdbResponse as SearchResponse;
};

export const OMDB = {
  movie,
  search,
};
