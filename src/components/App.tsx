import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Login } from './login/Login';
import { Dashboard } from './dashboard/Dashboard';
import { Path } from '../constants/paths';
import { SessionContext, SessionContextDefault } from '../context/session';

export const App = () => {
  return (
    <div className="app">
      <SessionContext.Provider value={SessionContextDefault}>
        <BrowserRouter>
          <Switch>
            <Redirect exact path={Path.ROOT} to={Path.LOGIN} />
            <Route exact path={Path.LOGIN} component={Login} />
            <Route exact path={Path.DASHBOARD} component={Dashboard} />
            <Redirect path="*" to={Path.ROOT} />
          </Switch>
        </BrowserRouter>
      </SessionContext.Provider>
    </div>
  );
};
