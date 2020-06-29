import React, { ReactElement, useState, useEffect } from 'react';

import { library } from '../../services/library';
import { useSessionUser } from '../../hooks/session-user';
import { Catalog } from '../catalog/Catalog';
import { RemoveFromWatchList } from './RemoveFromWatchList';
import { Movie } from '../../services/library/movies';
import { User } from '../../services/auth';
import { MarkAsWatched } from './MarkAsWatched';
import { Rater } from '../rater/Rater';

import './CatalogToWatch.scss';

export const CatalogToWatch = (): ReactElement => {
  const user: User = useSessionUser();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [raterVisible, setRaterVisible] = useState(false);

  const showRater = (): void => setRaterVisible(true);
  const hideRater = (): void => setRaterVisible(false);

  const filterOutMovie = (movieId: string): void => {
    setMovies((movies: Movie[]) => {
      return movies.filter((movie: Movie) => movie.id !== movieId);
    });
  };

  const removeMovie = (movieId: string): void => {
    library.personal
      .removeMovieFromWatchList(user.id, movieId)
      .then(() => filterOutMovie(movieId))
      .catch(console.warn);
  };

  const setRating = (movieId: string, rating: number): void => {
    library.personal
      .fromWatchListToWatched(user.id, movieId, rating)
      .then(() => {
        hideRater();
        filterOutMovie(movieId);
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
      <Catalog
        movies={movies}
        footerIcons={
          <div className="actions">
            <MarkAsWatched onClick={showRater} />
            <RemoveFromWatchList onClick={removeMovie} />
          </div>
        }
      />
      <Rater visible={raterVisible} onConfirm={setRating} onCancel={hideRater} />
    </div>
  );
};
