import React from 'react';
import { Movie } from '../../services/library/movies';

import './MovieCard.scss';

interface Props {
  movie: Movie;
}

interface Actor {
  name: string;
  link: string;
}

export const MovieCard = ({ movie }: Props) => {
  return (
    <section className="movie-card">
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

const Actors = ({ movie }: Props) => {
  const actors: Actor[] = movie.actors
    .split(',')
    .map((actor: string) => actor.trim())
    .map((actor: string) => ({
      name: actor,
      link: `https://www.imdb.com/find?q=${actor}`,
    }));

  return (
    <p>
      {actors.map((actor: Actor) => (
        <React.Fragment key={actor.name}>
          <a href={actor.link} target="_blank" rel="noopener noreferrer">
            {actor.name}
          </a>
          ,&nbsp;
        </React.Fragment>
      ))}
    </p>
  );
};

const IMDBRating = ({ movie }: Props) => {
  return (
    <span className="imdb-rating">
      <a href={`https://www.imdb.com/title/${movie.id}`} target="_blank" rel="noopener noreferrer">
        <img src="/assets/icons/icon-imdb.png" alt="IMDB" />
      </a>
      <span>{movie.imdb?.rating}</span>
    </span>
  );
};
