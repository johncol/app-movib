import React from 'react';

import { Movie } from '../../services/library/movies';

interface Props {
  movie: Movie;
}

export const WatchTrailer = ({ movie }: Props) => {
  return (
    <a
      className="watch-trailer bordered-cta"
      href={`https://www.youtube.com/results?search_query=${movie.title}+Trailer`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Trailer
    </a>
  );
};
