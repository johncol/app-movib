import { omdb, Movies } from './omdb';

interface UserMovie {
  userId: number;
  movies: string[];
}

const movies = async (user: number): Promise<Movies> => {
  const response = await fetch(`http://localhost:4000/users/${user}/movies`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const matchingUsersMovies: UserMovie[] = await response.json();
  console.log(`User ${user} movies response:`, matchingUsersMovies);

  if (matchingUsersMovies.length !== 1) {
    throw new Error(`Users movies length expected to be 1 but was ${matchingUsersMovies.length}`);
  }

  const [userMovies] = matchingUsersMovies;
  const movies = userMovies.movies.map((movieId: string) => {
    return omdb.movie(movieId);
  });

  return Promise.all(movies);
};

export const library = {
  movies,
};
