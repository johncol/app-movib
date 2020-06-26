import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { SearchResult } from '../../services/library/search';
import { MovieSummary } from '../../services/library/movies';
import { Path } from '../../constants/paths';

interface Props {
  when: boolean;
  result: SearchResult;
}

export const SearchResultsList = ({ when, result }: Props): ReactElement | null => {
  if (!when) {
    return null;
  }

  return (
    <div className="search-results-list">
      <ul>
        {result.movies.map((movie: MovieSummary) => (
          <li key={movie.id}>
            <Link to={Path.SEARCH_RESULT(movie.id)}>{movie.title}</Link>
            <br />
            {movie.year} - {movie.type} -{' '}
            <a href={movie.poster} target="_blank" rel="noopener noreferrer">
              poster
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
