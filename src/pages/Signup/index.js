import React, { useState, useContext } from 'react';
import { Button, Form, FormGroup, Input, Container, Alert } from 'reactstrap';
import api from '../../services/api';
import { UserContext } from '../../user-context';

export default function Signup({ history }) {
  const { setIsloggedIn } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (email !== '' && password !== '') {
      const response = await api.post('/user/register', { email, password });

      const user = response.data.user || false;
      const user_id = response.data.user_id || false;

      console.log(user, user_id)

      if (user && user_id) {
        localStorage.setItem('user', user);
        localStorage.setItem('user_id', user_id);
        setIsloggedIn(true);

        history.push('/');
      } else {
        const { message } = response.data;

        setError(true);
        setErrorMessage(message);
        setTimeout(() => {
          setError(false);
          setErrorMessage('');
        }, 2000);
      }
    } else {
      setError(true);
      setErrorMessage('You need to fill all the Inputs!');
      setTimeout(() => {
        setError(false);
        setErrorMessage('');
      }, 2000);
    }
  };

  return (
    <Container>
      <h2>SignUp</h2>
      <p>
        Please <strong>Register</strong> for a new account
      </p>
      <Form onSubmit={handleSubmit}>
        <div className="input-group">
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Button className="submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
          <Button
            className="secondary-btn"
            onClick={() => history.push('/login')}
          >
            Login Instead?
          </Button>
        </FormGroup>
      </Form>
      {error ? (
        <Alert color="danger" className="event-validation">
          {errorMessage}
        </Alert>
      ) : (
        ''
      )}
    </Container>
  );
}
