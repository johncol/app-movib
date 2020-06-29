import React, { ReactElement } from 'react';

import { MovieToReactElement } from '../../types/MovieToReactElement';
import { Movie } from '../../services/library/movies';
import { IMDBRating } from './IMDBRating';
import { Actors } from './Actors';
import { WatchTrailer } from './WatchTrailer';

import './MovieCard.scss';

interface Props {
  movie: Movie;
  className?: string;
  footerIcons?: ReactElement | MovieToReactElement;
}

export const MovieCard = (props: Props): ReactElement => {
  const { movie, className = '' } = props;
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
        <AdditionalIcons {...props} />
      </footer>
    </section>
  );
};

const Poster = ({ movie }: Props): ReactElement => {
  return <img src={movie.poster} alt={`${movie.title} poster`} className="poster" />;
};

const AdditionalIcons = ({ footerIcons, movie }: Props): ReactElement | null => {
  if (typeof footerIcons === 'function') {
    return footerIcons(movie);
  }

  if (!footerIcons) {
    return null;
  }

  return footerIcons;
};
