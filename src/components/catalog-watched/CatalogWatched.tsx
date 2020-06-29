import React, { ReactElement, useContext, useState, useEffect } from 'react';

import { library } from '../../services/library';
import { Catalog } from '../catalog/Catalog';
import { Session, SessionContext } from '../../context/session';
import { Movie, WatchedMovie } from '../../services/library/movies';

import './CatalogWatched.scss';

export const CatalogWatched = (): ReactElement => {
  const session: Session = useContext(SessionContext);
  const [movies, setMovies] = useState<WatchedMovie[]>([]);

  useEffect(() => {
    if (session && session.user && movies.length === 0) {
      library.personal.moviesWatched(session.user.id).then(setMovies);
    }
  }, [session, movies]);

  return <Catalog movies={movies} footerIcons={(movie: Movie) => <Score movie={movie} />} />;
};

const Score = ({ movie }: { movie: Movie }): ReactElement => {
  return (
    <span className="catalog-movie-score bordered-cta bordered-cta--no-activatable">
      User Score {(movie as WatchedMovie).user.rating}
    </span>
  );
};
