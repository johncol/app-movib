import React, { ReactElement } from 'react';

import { Movie } from '../../services/library/movies';
import { MovieCard } from '../movie-card/MovieCard';
import { EmptyCatalog } from '../empty-catalog/EmptyCatalog';

import './Catalog.scss';

interface Props {
  movies: Movie[];
}

export const Catalog = ({ movies }: Props): ReactElement => {
  if (movies.length === 0) {
    return <EmptyCatalog />;
  }

  return (
    <div className="catalog">
      {movies.map((movie: Movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
};
