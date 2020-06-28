import React, { ReactElement, useState, useEffect } from 'react';

import { library } from './../../services/library';
import { Movie } from '../../services/library/movies';
import { User } from '../../services/auth';
import { useSessionUser } from '../../hooks/session-user';

interface Props {
  movie: Movie;
}

export const AddMovieToWatchList = ({ movie }: Props): ReactElement | null => {
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

  if (inList) {
    return (
      <button disabled={true} className="bordered-cta">
        In list
      </button>
    );
  }

  return (
    <button onClick={toggleInList} disabled={loading} className="bordered-cta">
      Add to list
    </button>
  );
};
