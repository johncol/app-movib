import React, { ReactElement, useState, useEffect } from 'react';

import { library } from '../../services/library';
import { Catalog } from '../catalog/Catalog';
import { RemoveFromWatchList } from './RemoveFromWatchList';
import { useSessionUser } from '../../hooks/session-user';
import { Movie } from '../../services/library/movies';
import { User } from '../../services/auth';

import './CatalogToWatch.scss';

export const CatalogToWatch = (): ReactElement => {
  const user: User = useSessionUser();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const removeMovie = (movieId: string): void => {
    setLoading(true);
    library.personal
      .removeMovieFromWatchList(user.id, movieId)
      .then(() => {
        setLoading(false);
        setMovies((movies: Movie[]) => {
          return movies.filter((movie: Movie) => movie.id !== movieId);
        });
      })
      .catch(console.warn);
  };

  useEffect(() => {
    const loadMovies = (): void => {
      library.personal.moviesToWatch(user.id).then(setMovies).catch(console.warn);
    };

    loadMovies();
  }, [user.id]);

  return (
    <div className="catalog-to-watch">
      <RemoveFromWatchList loading={loading} onRemove={removeMovie} />
      <Catalog movies={movies} />
    </div>
  );
};
