import React, { ReactElement } from 'react';
import { MdRemoveCircleOutline } from 'react-icons/md';

import { urls } from '../../services/urls';
import { ButtonIcon } from '../button-icon/ButtonIcon';
import { Spinner } from '../spinner/Spinner';

interface Props {
  loading: boolean;
  onRemove: (movieId: string) => void;
}

export const RemoveFromWatchList = ({ loading, onRemove }: Props): ReactElement => {
  const remove = (): void => {
    const movieId: string = urls.getMovieIdFromUrl();
    onRemove(movieId);
  };

  return (
    <ButtonIcon
      className="remove-from-list-btn"
      title="Remove from watch list"
      onClick={remove}
      disabled={loading}
    >
      {loading ? <Spinner /> : <MdRemoveCircleOutline />}
    </ButtonIcon>
  );
};
