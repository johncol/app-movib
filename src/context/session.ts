import * as React from 'react';
import { User } from '../services/auth';

export interface Session {
  user: User | null;
  save(user: User): void;
  clear(): void;
}

export const SessionContextDefault: Session = {
  user: null,
  save(user: User): void {
    this.user = user;
  },
  clear(): void {
    this.user = null;
  },
};

export const SessionContext = React.createContext<Session>(SessionContextDefault);
