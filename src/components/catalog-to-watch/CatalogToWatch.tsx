import React, { ReactElement, useState, useEffect } from 'react';

import { library } from '../../services/library';
import { Catalog } from '../catalog/Catalog';
import { RemoveFromWatchList } from './RemoveFromWatchList';
import { useSessionUser } from '../../hooks/session-user';
import { Movie } from '../../services/library/movies';
import { User } from '../../services/auth';
import { MarkAsWatched } from './MarkAsWatched';
import { Rater } from '../rater/Rater';

import './CatalogToWatch.scss';

export const CatalogToWatch = (): ReactElement => {
  const user: User = useSessionUser();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [raterVisible, setRaterVisible] = useState(false);

  const removeMovie = (movieId: string): void => {
    library.personal
      .removeMovieFromWatchList(user.id, movieId)
      .then(() => {
        setMovies((movies: Movie[]) => {
          return movies.filter((movie: Movie) => movie.id !== movieId);
        });
      })
      .catch(console.warn);
  };

  const showRater = (movieId: string): void => {
    setRaterVisible(true);
  };

  const setRating = (rating: number): void => {
    setRaterVisible(false);
    console.log('Rating set to ', rating);
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
      <Rater visible={raterVisible} onRated={setRating} />
    </div>
  );
};
