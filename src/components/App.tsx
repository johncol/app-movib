import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Login } from './login/Login';
import { Logout } from './logout/Logout';
import { Dashboard } from './dashboard/Dashboard';
import { Path } from '../constants/paths';
import { SessionContext, SessionContextDefault } from '../context/session';

export const App = (): ReactElement => {
  return (
    <div className="app">
      <SessionContext.Provider value={SessionContextDefault}>
        <BrowserRouter>
          <RootRouting />
        </BrowserRouter>
      </SessionContext.Provider>
    </div>
  );
};

const RootRouting = (): ReactElement => {
  return (
    <Switch>
      <Redirect exact path={Path.ROOT} to={Path.LOGIN} />
      <Route exact path={Path.LOGIN} component={Login} />
      <Route exact path={Path.LOGOUT} component={Logout} />
      <Route path={Path.DASHBOARD} component={Dashboard} />
      <Redirect path="*" to={Path.ROOT} />
    </Switch>
  );
};
