import React, { ReactElement } from 'react';

import { Movie } from '../../services/library/movies';
import { EmptyCatalog } from '../empty-catalog/EmptyCatalog';
import { MovieToReactElement } from './../../types/MovieToReactElement';
import { SyncedWithUrlCard } from './SyncedWithUrlCard';

import './Catalog.scss';

interface Props {
  movies: Movie[];
  footerIcons?: ReactElement | MovieToReactElement;
}

export const Catalog = ({ movies, footerIcons }: Props): ReactElement => {
  if (movies.length === 0) {
    return <EmptyCatalog />;
  }

  return (
    <div className="catalog">
      {movies.map((movie: Movie) => (
        <SyncedWithUrlCard key={movie.id} movie={movie} footerIcons={footerIcons} />
      ))}
    </div>
  );
};
