import React, { ReactElement } from 'react';

import { SearchForm } from './SearchForm';
import './Search.scss';

export const Search = (): ReactElement => {
  return (
    <div className="search">
      <SearchForm onSubmit={console.log} />
    </div>
  );
};
