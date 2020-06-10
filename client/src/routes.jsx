import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AuthPage, CreatePage, DetailPage, LinksPage } from './pages';

export const useRoutes = (isAuthenticated) => {
  return isAuthenticated ? (
    <Switch>
      <Route path='/links' exact>
        <LinksPage />
      </Route>

      <Route path='/create' exact>
        <CreatePage />
      </Route>

      <Route path='/detail/:id' exact>
        <DetailPage />
      </Route>

      <Redirect to='/create' />
    </Switch>
  ) : (
    <Switch>
      <Route path='/' exact>
        <AuthPage />
      </Route>

      <Redirect to='/' />
    </Switch>
  );
};
