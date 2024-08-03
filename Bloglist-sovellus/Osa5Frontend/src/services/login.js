import users from './users';

const login = async (credentials) => {
  const user = users.find(
    (u) =>
      u.username === credentials.username && u.password === credentials.password
  );

  if (user) {
    return {
      username: user.username,
      name: user.name,
      token: 'fake-token-for-testing',
    };
  } else {
    throw new Error('Invalid username or password');
  }
};

export default { login };
