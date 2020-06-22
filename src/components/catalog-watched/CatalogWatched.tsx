import React, { ReactElement, useEffect, useContext, useState } from 'react';

import { Session, SessionContext } from '../../context/session';
import { library } from '../../services/library';
import { Movies } from '../../services/omdb';
import { Catalog } from '../catalog/Catalog';

export const CatalogWatched = (): ReactElement => {
  const session: Session = useContext(SessionContext);
  const [movies, setMovies] = useState<Movies>([]);

  useEffect(() => {
    if (session && session.user && movies.length === 0) {
      library.moviesWatched(session.user.id).then(setMovies);
    }
  }, [session, movies]);

  return <Catalog movies={movies} />;
};
