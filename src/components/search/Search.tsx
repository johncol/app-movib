import React, { ReactElement, useState } from 'react';

import { SearchForm } from './SearchForm';

import { SearchResult } from '../../services/library/search';
import { SearchResultsList } from './SearchResultsList';
import { Pagination } from './Pagination';
import { library } from '../../services/library';

import './Search.scss';

export const Search = (): ReactElement => {
  const [query, setQuery] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult>(null as any);

  const findMovie = (query: string, page: number = 1): void => {
    library.finder.search(query, page).then(setSearchResult).catch(console.warn);
  };

  const loadNextPage = (): void => findMovie(query, searchResult.currentPage + 1);
  const loadPreviousPage = (): void => findMovie(query, searchResult.currentPage - 1);

  const saveAndSearch = (query: string): void => {
    setQuery(query);
    findMovie(query);
  };

  return (
    <div className="search">
      <SearchForm onSubmit={saveAndSearch} />
      <SearchResultsList when={!!searchResult} result={searchResult} />
      <Pagination
        when={!!searchResult}
        result={searchResult}
        onNext={loadNextPage}
        onPrevious={loadPreviousPage}
      />
    </div>
  );
};
