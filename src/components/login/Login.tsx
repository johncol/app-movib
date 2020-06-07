import React, { FormEvent, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { User, session } from '../../services/session';
import { Path } from '../../constants/paths';
import { Logo } from '../logo/Logo';
import './Login.scss';

export const Login = () => {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('john.19col@gmail.com');
  const [password, setPassword] = useState('123456');
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (user) {
    return <Redirect to={Path.DASHBOARD} />;
  }

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    session.login(email, password).then(setUser, console.log);
  };

  return (
    <div className="login">
      <Logo />
      <Form className="login-form" onSubmit={login} autoComplete="off">
        <Card>
          <Card.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            {formSubmitted && <Alert variant="warning">Wrong credentials</Alert>}

            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={!formIsValid(email, password)}
              block
            >
              Login
            </Button>
          </Card.Body>
        </Card>
      </Form>
    </div>
  );
};

const formIsValid = (email: string, password: string): boolean => {
  return email.length > 5 && password.length > 5;
};
