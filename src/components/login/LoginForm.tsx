import React, { ReactElement, FormEvent, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { Spinner } from '../spinner/Spinner';
import { auth, User } from '../../services/auth';
import { Session, SessionContext } from '../../context/session';

interface Props {
  onLogged: () => void;
}

export const LoginForm = ({ onLogged }: Props): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('john.19col@gmail.com');
  const [password, setPassword] = useState('123456');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const session: Session = useContext(SessionContext);

  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setFormSubmitted(true);
    setLoading(true);
    auth.login(email, password).then(
      (user: User) => {
        session.save(user);
        setLoading(false);
        onLogged();
      },
      (error: Error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };

  return (
    <Form className="login-form" onSubmit={submit} autoComplete="off">
      <Card>
        <Card.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={loading}
            />
          </Form.Group>

          {!loading && formSubmitted && <Alert variant="warning">Wrong credentials</Alert>}

          <Spinner when={loading} />

          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={!formIsValid(email, password) || loading}
            block
          >
            Login
          </Button>
        </Card.Body>
      </Card>
    </Form>
  );
};

const formIsValid = (email: string, password: string): boolean => {
  return email.length > 5 && password.length > 5;
};
