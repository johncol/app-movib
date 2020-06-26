import { MovieResponse } from '../omdb/movies';
import { Movie } from './movies';

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

export const mapper = {
  toMovie,
};
