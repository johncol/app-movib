import React, { ReactElement, useState } from 'react';

import { SearchForm } from './SearchForm';
import { OMDB, Movie } from '../../services/omdb';
import { ResultCard } from '../result-card/ResultCard';

import './Search.scss';

export const Search = (): ReactElement => {
  const [result, setResult] = useState<Movie | null>();

  const findMovie = (query: string): void => {
    OMDB.find(query).then(setResult).catch(console.warn);
  };

  const clearSearch = (): void => {
    setResult(null);
  };

  return (
    <div className="search">
      {!result && <SearchForm onSubmit={findMovie} />}
      <ResultCard when={!!result} movie={result as Movie} onGoBack={clearSearch} />
    </div>
  );
};
