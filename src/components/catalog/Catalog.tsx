import React, { ReactElement } from 'react';

import { Movies, Movie } from '../../services/omdb';
import { MovieCard } from '../movie-card/MovieCard';

import './Catalog.scss';

interface Props {
  movies: Movies;
}

export const Catalog = ({ movies }: Props): ReactElement => {
  return (
    <div className="catalog">
      {movies.map((movie: Movie) => {
        return <MovieCard key={movie.imdbID} movie={movie} />;
      })}
    </div>
  );
};
