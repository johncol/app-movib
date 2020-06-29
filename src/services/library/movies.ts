export interface MovieSummary {
  id: string;
  title: string;
  year: string;
  type: string;
  poster: string;
}

export interface Movie extends MovieSummary {
  id: string;
  title: string;
  year: string;
  runtime: string;
  released: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
  awards: string;
  poster: string;
  metascore: string;
  type: string;
  imdb: {
    id: string;
    rating: string;
    votes: string;
  };
}

export interface WatchedMovie extends Movie {
  user: {
    id: number;
    rating: number;
  };
}
