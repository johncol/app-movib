import React, { ReactElement, useState, useEffect } from 'react';
import { MdPlaylistAddCheck, MdPlaylistAdd } from 'react-icons/md';

import { library } from './../../services/library';
import { Movie } from '../../services/library/movies';
import { User } from '../../services/auth';
import { useSessionUser } from '../../hooks/session-user';
import { Spinner } from '../spinner/Spinner';
import { ButtonIcon } from '../button-icon/ButtonIcon';

interface Props {
  movie: Movie;
}

export const AddMovieToWatchList = ({ movie }: Props): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);
  const [inList, setInList] = useState<boolean>(false);
  const user: User = useSessionUser();

  useEffect(() => {
    const checkIfMovieInLists = (): void => {
      setLoading(true);
      library.personal
        .isMovieInLists(user.id, movie.id)
        .then((inList: boolean) => {
          setInList(inList);
          setLoading(false);
        })
        .catch(console.warn);
    };

    checkIfMovieInLists();
  }, [movie.id, user.id]);

  const toggleInList = () => {
    setLoading(true);
    library.personal
      .toggleMovieInWatchList(user.id, movie.id, inList)
      .then(() => {
        setInList((inList: boolean) => !inList);
        setLoading(false);
      })
      .catch(console.warn);
  };

  return (
    <ButtonIcon onClick={toggleInList} disabled={loading || inList}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {inList ? (
            <MdPlaylistAddCheck title="Already in lists" />
          ) : (
            <MdPlaylistAdd title="Add to watch list" />
          )}
        </>
      )}
    </ButtonIcon>
  );
};
