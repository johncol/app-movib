import { useContext } from 'react';

import { Session, SessionContext } from '../../context/session';
import { User } from '../../services/auth';

export const useSessionUser = (): User => {
  const session: Session = useContext(SessionContext);
  return session.user as User;
};
