import { MovieSummary } from './movies';

export interface SearchResult {
  movies: MovieSummary[];
  total: number;
  pages: number;
  currentPage: number;
}
