import React, { useContext } from 'react';
import { Session, SessionContext } from '../../context/session';
import { Redirect } from 'react-router-dom';

import { Path } from '../../constants/paths';

export const Dashboard = () => {
  const session: Session = useContext(SessionContext);
  if (!session.user) {
    return <Redirect to={Path.LOGIN} />;
  }

  return (
    <div className="dashboard">
      <h1>Hello {session.user.name}</h1>
    </div>
  );
};
