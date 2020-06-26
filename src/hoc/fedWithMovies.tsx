import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { Session, SessionContext } from '../context/session';

import { Movie } from '../services/library/movies';

interface PropsWithMovies {
  movies: Movie[];
}

export const fedWithMovies = <P extends PropsWithMovies>(
  WrappedComponent: React.ComponentType<P>,
  fetchMovies: (userId: number) => Promise<Movie[]>
) => {
  return (props: any): ReactElement => {
    const session: Session = useContext(SessionContext);
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
      if (session && session.user && movies.length === 0) {
        fetchMovies(session.user.id).then(setMovies);
      }
    }, [session, movies]);

    return <WrappedComponent {...props} movies={movies} />;
  };
};
