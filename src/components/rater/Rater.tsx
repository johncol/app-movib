import React, { ReactElement, useState } from 'react';
import ReactRater from 'react-rater';
import 'react-rater/lib/react-rater.css';

import './Rater.scss';

interface Props {
  visible?: boolean;
  onRated: (rating: number) => void;
}

export const Rater = ({ visible = true, onRated }: Props): ReactElement => {
  const [rating, setRating] = useState(0);
  const rated: boolean = rating !== 0;

  const rate = ({ rating }: React.SyntheticEvent & { rating: number }) => {
    setRating(rating);
  };

  return (
    <div className={`rater ${visible ? 'visible' : ''}`}>
      <ReactRater total={10} rating={rating} onRate={rate}></ReactRater>
      <button className="bordered-cta" onClick={() => onRated(rating)} disabled={!rated}>
        Confirm
      </button>
    </div>
  );
};
