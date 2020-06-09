import React, { ReactElement } from 'react';

import { Movies, Movie } from '../../services/omdb';
import { MoviePoster } from '../movie-poster/MoviePoster';

import './Catalog.scss';

interface Props {
  movies: Movies;
}

export const Catalog = ({ movies }: Props): ReactElement => {
  return (
    <div className="catalog">
      {movies.map((movie: Movie) => {
        return <MoviePoster key={movie.imdbID} movie={movie} />;
      })}
    </div>
  );
};
