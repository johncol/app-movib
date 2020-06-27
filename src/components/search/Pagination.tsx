import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';

import { SearchResult } from '../../services/library/search';

import './Pagination.scss';

interface Props {
  when: boolean;
  result: SearchResult;
  onNext: () => void;
  onPrevious: () => void;
}

export const Pagination = ({ when, result, onNext, onPrevious }: Props): ReactElement | null => {
  if (!when) {
    return null;
  }

  const firstPage: boolean = result.currentPage === 1;
  const lastPage: boolean = result.currentPage === result.pages;

  return (
    <div className="search-pagination">
      <Button variant="primary" onClick={onPrevious} disabled={firstPage}>
        Previous
      </Button>
      <Button variant="primary" onClick={onNext} disabled={lastPage}>
        Next
      </Button>
    </div>
  );
};
