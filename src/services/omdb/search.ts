import { OMDBResponse } from './response';

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
