import React, { ReactElement, useState, useEffect } from 'react';
import { MdPlaylistAddCheck, MdPlaylistAdd } from 'react-icons/md';

import { library } from './../../services/library';
import { Movie } from '../../services/omdb';
import { User } from '../../services/auth';
import { useSessionUser } from '../hooks/session-user';
import { Spinner } from '../spinner/Spinner';

interface Props {
  movie: Movie;
}

export const ToggleInWatchList = ({ movie }: Props): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [inList, setInList] = useState<boolean>(false);
  const user: User = useSessionUser();

  useEffect(() => {
    const checkIfMovieInWatchList = (): void => {
      setLoading(true);
      library
        .isMovieInWatchList(user.id, movie.imdbID)
        .then((inList: boolean) => {
          setInList(inList);
          setLoading(false);
        })
        .catch(console.warn);
    };

    checkIfMovieInWatchList();
  }, [movie.imdbID, user.id]);

  const toggleInList = () => {
    setLoading(true);
    library
      .toggleMovieInWatchList(user.id, movie.imdbID, inList)
      .then(() => {
        setInList((inList: boolean) => !inList);
        setLoading(false);
      })
      .catch(console.warn);
  };

  return (
    <button className="watch-list-action" onClick={toggleInList} disabled={loading || inList}>
      {loading ? (
        <Spinner />
      ) : (
        <>{inList ? <MdPlaylistAddCheck title="Already in lists" /> : <MdPlaylistAdd />}</>
      )}
    </button>
  );
};
