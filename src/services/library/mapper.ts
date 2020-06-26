import { MovieResponse } from '../omdb/movies';
import { Movie, MovieSummary } from './movies';
import { SearchItem } from '../omdb/search';

const toMovie = (response: MovieResponse): Movie => {
  return {
    id: response.imdbID,
    title: response.Title,
    year: response.Year,
    runtime: response.Runtime,
    released: response.Released,
    genre: response.Genre,
    director: response.Director,
    writer: response.Writer,
    actors: response.Actors,
    plot: response.Plot,
    language: response.Language,
    country: response.Country,
    awards: response.Awards,
    poster: response.Poster,
    metascore: response.Metascore,
    type: response.Type,
    imdb: {
      id: response.imdbID,
      rating: response.imdbRating,
      votes: response.imdbVotes,
    },
  };
};

const toMovieSummary = (response: SearchItem): MovieSummary => {
  return {
    id: response.imdbID,
    title: response.Title,
    year: response.Year,
    poster: response.Poster,
    type: response.Type,
  };
};

export const mapper = {
  toMovie,
  toMovieSummary,
};
