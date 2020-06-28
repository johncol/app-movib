import React, { ReactElement } from 'react';

import { Movie } from '../../services/library/movies';
import { MovieCard } from '../movie-card/MovieCard';
import { EmptyCatalog } from '../empty-catalog/EmptyCatalog';
import { useIntersect } from '../../hooks/use-intersect';
import { urls } from '../../services/urls';

import './Catalog.scss';

interface Props {
  movies: Movie[];
  footerIcons?: ReactElement;
}

export const Catalog = ({ movies, footerIcons }: Props): ReactElement => {
  if (movies.length === 0) {
    return <EmptyCatalog />;
  }

  return (
    <div className="catalog">
      {movies.map((movie: Movie) => (
        <SyncedWithUrl key={movie.id} movie={movie} footerIcons={footerIcons} />
      ))}
    </div>
  );
};

const VIEW_THRESHOLD: number = 0.5;

const SyncedWithUrl = ({
  movie,
  footerIcons,
}: {
  movie: Movie;
  footerIcons?: ReactElement;
}): ReactElement => {
  const [card, entry] = useIntersect({
    threshold: VIEW_THRESHOLD,
  });

  const visible: boolean = entry.intersectionRatio > VIEW_THRESHOLD;
  if (visible) {
    urls.setMovieIdInUrl(movie);
  }

  return (
    <div className={`card-wrapper ${visible ? 'visible' : ''}`} ref={card}>
      <MovieCard key={movie.id} movie={movie} footerIcons={footerIcons} />
    </div>
  );
};
