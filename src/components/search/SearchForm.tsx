import React, { ReactElement, useState, ChangeEvent, KeyboardEvent, FormEvent } from 'react';
import Form from 'react-bootstrap/Form';
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai';

interface Props {
  onSubmit: (query: string) => void;
}

export const SearchForm = ({ onSubmit: submit }: Props): ReactElement => {
  const [query, setQuery] = useState('');

  const isEmpty = query.trim().length === 0;

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
    <Form autoComplete="off" onSubmit={findMovie}>
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
