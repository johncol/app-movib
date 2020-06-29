import React, { useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { Path } from '../../constants/paths';
import { Logo } from '../logo/Logo';
import { SessionContext, Session } from '../../context/session';
import { LoginForm } from './LoginForm';
import { IdentityProvidersLogin } from './IdentityProvidersLogin';

import './Login.scss';

export const Login = () => {
  const history = useHistory();

  const session: Session = useContext(SessionContext);
  if (session.user) {
    return <Redirect to={Path.DASHBOARD} />;
  }

  const redirectToDashboard = (): void => {
    history.push(Path.DASHBOARD);
  };

  return (
    <div className="login">
      <Logo />
      <LoginForm onLogged={redirectToDashboard} />
      <IdentityProvidersLogin />
    </div>
  );
};
