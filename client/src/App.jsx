import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { useRoutes } from '@/routes';
import { useAuth } from '@/hooks/auth.hook';
import { AuthContext } from '@/context/AuthContext';
import { Loader, Navbar } from '@/components';

import 'materialize-css';

const App = () => {
  const { token, login, logout, ready, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        token,
        userId,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}

        <div className='container'>{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
