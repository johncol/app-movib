import React, { ReactElement } from 'react';

import { useIntersect } from '../../hooks/use-intersect';
import { urls } from '../../services/urls';
import { CATALOG_CARD_VIEW_THRESHOLD } from '../../constants/catalog';
import { Movie } from '../../services/library/movies';
import { MovieCard } from '../movie-card/MovieCard';
import { MovieToReactElement } from './../../types/MovieToReactElement';

interface Props {
  movie: Movie;
  footerIcons?: ReactElement | MovieToReactElement;
}

export const SyncedWithUrlCard = ({ movie, footerIcons }: Props): ReactElement => {
  const [card, entry] = useIntersect({
    threshold: CATALOG_CARD_VIEW_THRESHOLD,
  });

  const visible: boolean = entry.intersectionRatio > CATALOG_CARD_VIEW_THRESHOLD;
  if (visible) {
    urls.setMovieIdInUrl(movie);
  }

  return (
    <div className={`card-wrapper ${visible ? 'visible' : ''}`} ref={card}>
      <MovieCard key={movie.id} movie={movie} footerIcons={footerIcons} />
    </div>
  );
};
