import React, { ReactElement, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Path } from '../../constants/paths';
import { Logo } from '../logo/Logo';
import { Spinner } from '../spinner/Spinner';
import { Session, SessionContext } from '../../context/session';

import './Logged.scss';

export const Logged = (): ReactElement => {
  const session: Session = useContext(SessionContext);
  const history = useHistory();
  const { search, hash } = history.location;

  if (search) {
    console.log('CODE', new URLSearchParams(search).get('code'));
  }

  if (hash) {
    const token: string[] = hash.substring(1).split('&');
    console.log('TOKEN:', token);
  }

  useEffect(() => {
    setTimeout(() => {
      session.save({
        id: 2,
        name: 'Social',
        email: 'some@mail.com',
        password: '',
      });
      history.push(Path.DASHBOARD);
    }, 3000);
  }, [history, session]);

  return (
    <div className="logged">
      <Logo />
      <Spinner />
    </div>
  );
};
