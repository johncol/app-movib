import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { SessionContext, Session } from '../../context/session';
import { Path } from '../../constants/paths';

export const Logout = () => {
  const session: Session = useContext(SessionContext);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    session.clear();
    setLoggedOut(true);
  }, [session]);

  if (loggedOut) {
    return <Redirect to={Path.ROOT} />;
  }

  return <>Logging out..</>;
};
