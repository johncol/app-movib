import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Login } from './login/Login';
import { Logout } from './logout/Logout';
import { Dashboard } from './dashboard/Dashboard';
import { Path } from '../constants/paths';
import { SessionContext, SessionContextDefault } from '../context/session';
import { Logged } from './login/Logged';
import { HugeMessage } from './huge-message/HugeMessage';

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
      <Route path={Path.LOGGED} component={Logged} />
      <Route path={Path.LOGIN} component={Login} />
      <Route path={Path.LOGOUT} component={Logout} />
      <Route path={Path.DASHBOARD} component={Dashboard} />
      <Route path="*" component={() => <HugeMessage threeWordsMessage="Page not found" />} />
    </Switch>
  );
};
