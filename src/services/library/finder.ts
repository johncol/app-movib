import { SearchResult } from './search';
import { OMDB } from '../omdb/api';
import { SearchResponse, RESULTS_PER_PAGE } from '../omdb/search';
import { mapper } from './mapper';
import { MovieResponse } from '../omdb/movies';
import { Movie, MovieSummary } from './movies';
import { NA } from '../omdb/response';

const search = async (query: string, page: number = 1): Promise<SearchResult> => {
  const response: SearchResponse = await OMDB.search(query, page);
  const total: number = Number.parseInt(response.totalResults, 10);
  const movies: MovieSummary[] = response.Search.map(mapper.toMovieSummary).filter(
    ({ poster }) => !!poster && poster !== NA
  );
  return {
    movies,
    total,
    pages: Math.ceil(total / RESULTS_PER_PAGE),
    currentPage: page,
  };
};

const get = async (id: string): Promise<Movie> => {
  const movieResponse: MovieResponse = await OMDB.movie(id);
  return mapper.toMovie(movieResponse);
};

export const finder = {
  search,
  get,
};
