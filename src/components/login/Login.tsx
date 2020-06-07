import React, { FormEvent, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { User, auth } from '../../services/auth';
import { Path } from '../../constants/paths';
import { Logo } from '../logo/Logo';
import { SessionContext, Session } from '../../context/session';
import './Login.scss';

export const Login = () => {
  const [email, setEmail] = useState('john.19col@gmail.com');
  const [password, setPassword] = useState('123456');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const session: Session = useContext(SessionContext);

  if (session.user) {
    return <Redirect to={Path.DASHBOARD} />;
  }

  const login = (event: FormEvent<HTMLFormElement>) => {
    setFormSubmitted(false);
    event.preventDefault();
    auth.login(email, password).then(
      (user: User) => {
        session.save(user);
        setFormSubmitted(true);
      },
      (error: Error) => {
        console.log(error);
        setFormSubmitted(true);
      }
    );
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
