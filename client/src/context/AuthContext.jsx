import { createContext } from 'react';

const fn = () => {};

export const AuthContext = createContext({
  isAuthenticated: null,
  login: fn,
  logout: fn,
  token: null,
  userId: null,
});
