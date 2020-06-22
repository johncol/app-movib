import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { Session, SessionContext } from '../context/session';

import { Movies } from '../services/omdb';

interface PropsWithMovies {
  movies: Movies;
}

export const fedWithMovies = <P extends PropsWithMovies>(
  WrappedComponent: React.ComponentType<P>,
  fetchMovies: (userId: number) => Promise<Movies>
) => {
  return (props: P): ReactElement => {
    const session: Session = useContext(SessionContext);
    const [movies, setMovies] = useState<Movies>([]);

    useEffect(() => {
      if (session && session.user && movies.length === 0) {
        fetchMovies(session.user.id).then(setMovies);
      }
    }, [session, movies]);

    return <WrappedComponent {...props} movies={movies} />;
  };
};
