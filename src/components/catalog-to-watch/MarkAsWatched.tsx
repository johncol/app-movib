import React, { ReactElement } from 'react';

import { urls } from '../../services/urls';

interface Props {
  onClick: (movieId: string) => void;
}

export const MarkAsWatched = ({ onClick }: Props): ReactElement => {
  const markAsWatched = (): void => {
    const movieId: string = urls.getMovieIdFromUrl();
    onClick(movieId);
  };

  return (
    <button className="bordered-cta" onClick={markAsWatched}>
      Mark as Watched
    </button>
  );
};
