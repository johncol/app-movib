import React from 'react';

import { Movie } from '../../services/library/movies';
import { IMDBRating } from './IMDBRating';
import { Actors } from './Actors';
import { useIntersect } from '../../hooks/use-intersect';
import { urls } from '../../services/urls';

import './MovieCard.scss';

const VIEW_THRESHOLD: number = 0.75;

interface Props {
  movie: Movie;
}

export const MovieCard = ({ movie }: Props) => {
  const [card, entry] = useIntersect({
    threshold: VIEW_THRESHOLD,
  });

  if (entry.intersectionRatio > VIEW_THRESHOLD) {
    urls.setMovieIdInUrl(movie);
  }

  return (
    <section className="movie-card" ref={card}>
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
