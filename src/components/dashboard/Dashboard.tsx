import React, { useContext, ReactElement } from 'react';
import { Session, SessionContext } from '../../context/session';
import { Redirect, Switch, Route } from 'react-router-dom';

import { Path } from '../../constants/paths';
import { Menu } from '../menu/Menu';
import { Features } from '../features/Features';
import { CatalogToWatch } from '../catalog-to-watch/CatalogToWatch';
import { CatalogWatched } from '../catalog-watched/CatalogWatched';
import { Search } from '../search/Search';
import { ResultCard } from '../result-card/ResultCard';

import './Dashboard.scss';

export const Dashboard = (): ReactElement => {
  const session: Session = useContext(SessionContext);
  if (!session.user) {
    return <Redirect to={Path.LOGIN} />;
  }

  return (
    <div className="dashboard">
      <Menu />
      <DashboardRouting />
    </div>
  );
};

const DashboardRouting = (): ReactElement => {
  return (
    <div className="content-container">
      <Switch>
        <Redirect exact path={Path.DASHBOARD} to={Path.LIST_TO_WATCH} />
        <Route path={Path.LIST_TO_WATCH} component={CatalogToWatch} />
        <Route path={Path.LIST_WATCHED} component={CatalogWatched} />
        <Route exact path={Path.SEARCH} component={Search} />
        <Route exact path={Path.SEARCH_RESULT()} component={ResultCard} />
        <Route path={Path.FEATURES} component={Features} />
        <Redirect path="*" to={Path.DASHBOARD} />
      </Switch>
    </div>
  );
};
