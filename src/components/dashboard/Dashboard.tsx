import React, { useContext, useState, useEffect, ReactElement } from 'react';
import { Session, SessionContext } from '../../context/session';
import { Redirect } from 'react-router-dom';

import { Path } from '../../constants/paths';
import { library } from '../../services/library';
import { Movies } from '../../services/omdb';
import { Catalog } from '../catalog/Catalog';
import { Menu } from '../menu/Menu';

export const Dashboard = (): ReactElement => {
  const session: Session = useContext(SessionContext);
  const [movies, setMovies] = useState<Movies>([]);

  useEffect(() => {
    if (session && session.user && movies.length === 0) {
      library.movies(session.user.id).then(setMovies);
    }
  }, [session, movies]);

  if (!session.user) {
    return <Redirect to={Path.LOGIN} />;
  }

  if (movies.length === 0) {
    return <p>No Movies</p>;
  }

  return (
    <div className="dashboard">
      <Menu />
      <Catalog movies={movies} />
    </div>
  );
};
