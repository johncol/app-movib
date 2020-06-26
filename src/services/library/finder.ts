import { SearchResult } from './search';
import { OMDB } from '../omdb/api';
import { SearchResponse, RESULTS_PER_PAGE } from '../omdb/search';
import { mapper } from './mapper';
import { MovieResponse } from '../omdb/movies';
import { Movie } from './movies';

const search = async (query: string, page: number = 1): Promise<SearchResult> => {
  const response: SearchResponse = await OMDB.search(query, page);
  const total: number = Number.parseInt(response.totalResults, 10);
  return {
    movies: response.Search.map(mapper.toMovieSummary),
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
