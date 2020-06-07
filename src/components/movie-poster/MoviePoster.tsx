import React from 'react';
import { Movie } from '../../services/omdb';

import './MoviePoster.scss';

interface Props {
  movie: Movie;
}

interface Actor {
  name: string;
  link: string;
}

export const MoviePoster = ({ movie }: Props) => {
  return (
    <section className="movie-poster">
      <header>
        <Poster movie={movie} />
      </header>
      <main>
        <section>
          <h2 className="title">{movie.Title}</h2>
          <p className="additionalInfo">
            {movie.Year} - {movie.Genre} - {movie.Awards}
          </p>
        </section>
        <section className="plot">
          <h3>Summary</h3>
          <p>{movie.Plot}</p>
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
  return <img src={movie.Poster} alt={`${movie.Title} poster`} className="poster" />;
};

const Actors = ({ movie }: Props) => {
  const actors: Actor[] = movie.Actors.split(',')
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
      <a
        href={`https://www.imdb.com/title/${movie.imdbID}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/assets/icons/icon-imdb.png" alt="IMDB" />
      </a>
      <span>{movie.imdbRating}</span>
    </span>
  );
};
