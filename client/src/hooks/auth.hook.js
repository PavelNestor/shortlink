import { useCallback, useState, useEffect } from 'react';

const STORAGE_USER_DATA = 'short_link_user_data';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      STORAGE_USER_DATA,
      JSON.stringify({
        userId: id,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem(STORAGE_USER_DATA);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_USER_DATA));

    if (data && data.token && data.userId) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
