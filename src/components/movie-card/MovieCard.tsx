import React, { ReactElement } from 'react';

import { Movie } from '../../services/library/movies';
import { IMDBRating } from './IMDBRating';
import { Actors } from './Actors';

import './MovieCard.scss';
import { WatchTrailer } from './WatchTrailer';

interface Props {
  movie: Movie;
  className?: string;
  footerIcons?: ReactElement;
}

export const MovieCard = ({ movie, className = '', footerIcons }: Props): ReactElement => {
  return (
    <section className={`movie-card ${className}`}>
      <header>
        <Poster movie={movie} />
      </header>
      <main>
        <section>
          <h2 className="title">{movie.title}</h2>
          <p className="additionalInfo">
            {movie.year} - {movie.genre}
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
        <WatchTrailer movie={movie} />
        {footerIcons}
      </footer>
    </section>
  );
};

const Poster = ({ movie }: Props): ReactElement => {
  return <img src={movie.poster} alt={`${movie.title} poster`} className="poster" />;
};
