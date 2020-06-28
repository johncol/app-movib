import React from 'react';

import { Movie } from '../../services/library/movies';
import { IMDBRating } from './IMDBRating';
import { Actors } from './Actors';

import './MovieCard.scss';

interface Props {
  movie: Movie;
  className?: string;
}

export const MovieCard = ({ movie, className = '' }: Props) => {
  return (
    <section className={`movie-card ${className}`}>
      <header>
        <Poster movie={movie} />
      </header>
      <main>
        <section>
          <h2 className="title">{movie.title}</h2>
          <p className="additionalInfo">
            {movie.year} - {movie.genre} - {movie.awards}
          </p>
        </section>
        <section className="plot">
          <h3>Summary</h3>
          <p>{movie.plot}</p>
        </section>
        <section className="actors">
          <Actors movie={movie} />
        </section>
      </main>
      <footer>
        <IMDBRating movie={movie} />
      </footer>
    </section>
  );
};

const Poster = ({ movie }: Props) => {
  return <img src={movie.poster} alt={`${movie.title} poster`} className="poster" />;
};
