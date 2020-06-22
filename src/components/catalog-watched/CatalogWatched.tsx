import React, { ReactElement, useEffect, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Session, SessionContext } from '../../context/session';
import { Path } from '../../constants/paths';
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

  // if (movies.length === 0) {
  //   return <Redirect to={Path.FEATURES} />;
  // }

  return <Catalog movies={movies} />;
};
