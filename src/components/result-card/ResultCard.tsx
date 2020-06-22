import React, { ReactElement, useState } from 'react';
import { MdPlaylistAdd, MdPlaylistAddCheck, MdClose } from 'react-icons/md';

import { Movie } from '../../services/omdb';
import { MovieCard } from '../movie-card/MovieCard';

import './ResultCard.scss';

interface Props {
  when?: boolean;
  movie: Movie;
  onGoBack: () => void;
}

export const ResultCard = (props: Props): ReactElement | null => {
  const { when: visible } = props;
  if (!visible) {
    return null;
  }

  return (
    <div className="result-card">
      <ResultActions onGoBack={props.onGoBack} />
      <MovieCard movie={props.movie} />
    </div>
  );
};

const ResultActions = ({ onGoBack }: Partial<Props>): ReactElement => {
  return (
    <div className="result-actions">
      <WatchListAction />
      <button onClick={onGoBack}>
        <MdClose />
      </button>
    </div>
  );
};

const WatchListAction = (): ReactElement => {
  const [inList, setInList] = useState(false);
  const toggleInList = () => {
    setInList((inList: boolean) => !inList);
  };

  return (
    <button className="watch-list-action" onClick={toggleInList}>
      {inList ? <MdPlaylistAddCheck /> : <MdPlaylistAdd />}
    </button>
  );
};
