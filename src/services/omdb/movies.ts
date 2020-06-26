import { OMDBResponse } from './response';

export interface MovieResponse extends OMDBResponse {
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
