import React, { ReactElement, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { SearchForm } from './SearchForm';
import { SearchResult } from '../../services/library/search';
import { SearchResultsList } from './SearchResultsList';
import { Pagination } from './Pagination';
import { Spinner } from '../spinner/Spinner';
import { library } from '../../services/library';
import { Path } from '../../constants/paths';

import './Search.scss';

export const Search = (): ReactElement => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult>(null as any);

  const { location, ...history } = useHistory();
  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get('query') || '');
    if (query.trim().length > 0) {
      search(query);
    }
  }, [location.search, query]);

  const search = (query: string, page: number = 1): void => {
    setLoading(true);
    library.finder
      .search(query, page)
      .then((searchResult: SearchResult) => {
        setSearchResult(searchResult);
        setLoading(false);
      })
      .catch(console.warn);
  };
  const loadNextPage = (): void => search(query, searchResult.currentPage + 1);
  const loadPreviousPage = (): void => search(query, searchResult.currentPage - 1);

  const triggerSearch = (query: string): void => {
    history.push(Path.SEARCH_PARAM(query));
  };

  return (
    <div className="search">
      <SearchForm onSubmit={triggerSearch} query={query} />
      <Spinner when={loading} />
      <SearchResultsList when={searchResult && !loading} result={searchResult} />
      <Pagination
        when={searchResult && !loading}
        result={searchResult}
        onNext={loadNextPage}
        onPrevious={loadPreviousPage}
      />
    </div>
  );
};
