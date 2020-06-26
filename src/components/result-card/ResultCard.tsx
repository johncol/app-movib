import React, { ReactElement, useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

import { library } from '../../services/library';
import { Movie } from '../../services/library/movies';
import { MovieCard } from '../movie-card/MovieCard';
import { AddMovieToWatchList } from './AddMovieToWatchList';
import { ButtonIcon } from '../button-icon/ButtonIcon';
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
      <ResultActions movie={movie} onGoBack={history.goBack} />
      <MovieCard movie={movie} />
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
      <ButtonIcon onClick={onGoBack}>
        <MdClose />
      </ButtonIcon>
    </div>
  );
};
