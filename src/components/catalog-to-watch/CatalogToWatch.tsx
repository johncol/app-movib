import React, { ReactElement, useState } from 'react';

import { library } from '../../services/library';
import { MdRemoveCircleOutline } from 'react-icons/md';

import { fedWithMovies } from '../../hoc/fedWithMovies';
import { Catalog } from '../catalog/Catalog';
import { ButtonIcon } from '../button-icon/ButtonIcon';
import { useSessionUser } from '../../hooks/session-user';
import { User } from '../../services/auth';
import { Spinner } from '../spinner/Spinner';

import './CatalogToWatch.scss';

export const CatalogToWatch = () => {
  return (
    <div className="catalog-to-watch">
      <RemoveFromWatchList />
      <CatalogToWatchComponent />;
    </div>
  );
};

const CatalogToWatchComponent = fedWithMovies(Catalog, library.personal.moviesToWatch);

const RemoveFromWatchList = (): ReactElement => {
  const user: User = useSessionUser();
  const [loading, setLoading] = useState(false);

  const remove = () => {
    setLoading(true);
    library.personal
      .removeMovieFromWatchList(user.id, 'XXX')
      .then(() => {
        setLoading(false);
      })
      .catch(console.warn);
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
