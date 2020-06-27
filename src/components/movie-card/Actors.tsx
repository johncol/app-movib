import React from 'react';
import { Movie } from '../../services/library/movies';

interface Props {
  movie: Movie;
}

interface Actor {
  name: string;
  link: string;
}

export const Actors = ({ movie }: Props) => {
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
