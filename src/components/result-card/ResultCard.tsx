import React, { ReactElement, useState, useEffect } from 'react';

import { library } from '../../services/library';
import { Movie } from '../../services/library/movies';
import { MovieCard } from '../movie-card/MovieCard';
import { AddMovieToWatchList } from './AddMovieToWatchList';
import { Spinner } from '../spinner/Spinner';

import './ResultCard.scss';

export const ResultCard = ({ match, history }: any): ReactElement => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<Movie>(null as any);
  const { id } = match.params;

  useEffect(() => {
    const loadMovie = (): void => {
      setLoading(true);
      library.finder
        .get(id)
        .then((movie: Movie) => {
          setMovie(movie);
          setLoading(false);
        })
        .catch(console.warn);
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return <Spinner className="result-card-spinner" />;
  }

  return (
    <div className="result-card">
      <MovieCard
        movie={movie}
        footerIcons={<ResultActions movie={movie} onGoBack={history.goBack} />}
      />
    </div>
  );
};

interface Props {
  onGoBack: () => void;
  movie: Movie;
}

const ResultActions = ({ onGoBack, movie }: Props): ReactElement => {
  return (
    <div className="result-actions">
      <AddMovieToWatchList movie={movie} />
      <button onClick={onGoBack} className="bordered-cta">
        back
      </button>
    </div>
  );
};
