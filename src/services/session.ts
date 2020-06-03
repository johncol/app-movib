export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

const login = async (email: string, password: string): Promise<User> => {
  const response = await fetch(`http://localhost:4000/users?email=${email}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const users: User[] = await response.json();
  if (users.length === 0) {
    throw new Error('Failed login');
  }

  const [user] = users;
  if (user.password !== password) {
    throw new Error('Failed login');
  }

  delete user.password;
  return user;
};

export const session = {
  login,
};
