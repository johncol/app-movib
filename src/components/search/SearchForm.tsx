import React, {
  ReactElement,
  useState,
  ChangeEvent,
  KeyboardEvent,
  FormEvent,
  useEffect,
} from 'react';
import Form from 'react-bootstrap/Form';
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai';

import './SearchForm.scss';

interface Props {
  onSubmit: (query: string) => void;
  query: string;
}

export const SearchForm = ({ onSubmit: submit, query: currentQuery }: Props): ReactElement => {
  const [query, setQuery] = useState('');
  const isEmpty = query.trim().length === 0;

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const updateQuery = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
  };

  const clearQuery = (): void => setQuery('');

  const clearOnEsc = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Escape') {
      clearQuery();
    }
  };

  const findMovie = (event: FormEvent): void => {
    event.preventDefault();
    if (!isEmpty) {
      submit(query.trim());
    }
  };

  return (
    <Form autoComplete="off" onSubmit={findMovie} className="search-form">
      <Form.Group controlId="search">
        <Form.Label>
          {isEmpty ? (
            <AiOutlineSearch />
          ) : (
            <AiOutlineCloseCircle onClick={clearQuery} className="clear-query-icon" />
          )}
        </Form.Label>
        <Form.Control value={query} onChange={updateQuery} onKeyDown={clearOnEsc} />
      </Form.Group>
    </Form>
  );
};
