import React, { ReactElement, useState } from 'react';
import ReactRater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import { ButtonIcon } from '../button-icon/ButtonIcon';
import { MdClose } from 'react-icons/md';
import { urls } from '../../services/urls';

import './Rater.scss';

interface Props {
  visible?: boolean;
  onConfirm: (movieId: string, rating: number) => void;
  onCancel: () => void;
}

export const Rater = ({ visible = true, onConfirm, onCancel }: Props): ReactElement => {
  const [rating, setRating] = useState(0);
  const rated: boolean = rating !== 0;

  const updateRating = ({ rating }: React.SyntheticEvent & { rating: number }) => {
    setRating(rating);
  };

  const saveRating = (): void => {
    const id: string = urls.getMovieIdFromUrl();
    onConfirm(id, rating);
  };

  return (
    <div className={`rater ${visible ? 'visible' : ''}`}>
      <ButtonIcon className="close-button" onClick={onCancel}>
        <MdClose />
      </ButtonIcon>
      <ReactRater total={10} rating={rating} onRate={updateRating}></ReactRater>
      <button className="bordered-cta confirm-button" onClick={saveRating} disabled={!rated}>
        Confirm
      </button>
    </div>
  );
};
