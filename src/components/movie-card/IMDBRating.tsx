import React from 'react';

import { Movie } from '../../services/library/movies';

interface Props {
  movie: Movie;
}

export const IMDBRating = ({ movie }: Props) => {
  return (
    <span className="imdb-rating">
      <a href={`https://www.imdb.com/title/${movie.id}`} target="_blank" rel="noopener noreferrer">
        <img src="/assets/icons/icon-imdb.png" alt="IMDB" />
      </a>
      <span>{movie.imdb?.rating}</span>
    </span>
  );
};
