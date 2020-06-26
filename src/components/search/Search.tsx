import React, { ReactElement, useState } from 'react';

import { SearchForm } from './SearchForm';
import { OMDB } from '../../services/omdb/api';
import { SearchResponse } from '../../services/omdb/search';

import './Search.scss';

export const Search = (): ReactElement => {
  const [response, setResponse] = useState<SearchResponse>();

  const findMovie = (query: string): void => {
    OMDB.search(query).then(setResponse).catch(console.warn);
  };

  return (
    <div className="search">
      <SearchForm onSubmit={findMovie} />
      {response && <>{response.totalResults} were found</>}
    </div>
  );
};
