import React, { FormEvent, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { User, session } from '../../services/session';
import './Login.scss';

export const Login = () => {
  const [email, setEmail] = useState('john.19col@gmail.com');
  const [password, setPassword] = useState('123456');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    session.login(email, password).then(
      (user: User) => {
        console.log('login successful, user:', user);
      },
      (error: Error) => {
        console.log('error', error.message);
      }
    );
  };

  return (
    <div className="login">
      <Form className="login-form" onSubmit={login}>
        <Card>
          <Card.Body>
            <h2>Login</h2>

            {formSubmitted && <Alert variant="warning">Wrong credentials</Alert>}

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
            <Button variant="primary" type="submit" disabled={!formIsValid(email, password)}>
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
