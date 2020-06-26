import { OMDBResponse } from './response';

export const RESULTS_PER_PAGE: number = 10;

export interface SearchResponse extends OMDBResponse {
  Search: SearchItem[];
  totalResults: string;
}

export interface SearchItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
