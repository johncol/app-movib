export interface UserMovie {
  id: string;
}

export interface UserWatchedMovie extends UserMovie {
  score: number;
}

export interface UserMovies {
  userId: number;
  toWatch: UserMovie[];
  watched: UserWatchedMovie[];
}

const fetchUserMovies = async (user: number): Promise<UserMovies> => {
  const response = await fetch(`http://localhost:4000/users/${user}/movies`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const matchingUsersMovies: UserMovies[] = await response.json();
  console.log(`User ${user} movies response:`, matchingUsersMovies);

  if (matchingUsersMovies.length !== 1) {
    throw new Error(`Users movies length expected to be 1 but was ${matchingUsersMovies.length}`);
  }

  return matchingUsersMovies[0];
};

const updateUserMovies = async (userMovies: UserMovies): Promise<UserMovies> => {
  const response = await fetch(`http://localhost:4000/movies/${userMovies.userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userMovies),
  });
  console.log(`Update user ${userMovies.userId} movies response:`, response);

  const payload: UserMovies = await response.json();
  console.log(`Update user ${userMovies.userId} movies payload:`, payload);

  return payload;
};

export const JsonServer = {
  fetchUserMovies,
  updateUserMovies,
};
