import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from 'reactstrap';

export default function ContactsPage({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!user) history.push('/login');
  }, []);

  const submitHandler = async (evt) => {
    evt.preventDefault();

    const eventData = new FormData();

    eventData.append('name', name);
    eventData.append('phone', phone);
    eventData.append('email', email);

    try {
      if (name !== '' && phone !== '' && email !== '') {
        await api.post('/contact',{name, phone, email} , { headers: { user } });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push('/');
        }, 2000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } catch (error) {
      Promise.reject(error);
      console.log(error);
    }
  };

  return (
    <Container>
      <h2>Create your Contact</h2>
      <Form onSubmit={submitHandler}>
        <div className="input-group">
          <FormGroup>
            <Label>Name : </Label>
            <Input
              id="name"
              type="text"
              value={name}
              placeholder={'Contact Name'}
              onChange={(evt) => setName(evt.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email : </Label>
            <Input
              id="email"
              type="text"
              value={email}
              placeholder={'Email'}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Phone number: </Label>
            <Input
              id="phone"
              type="number"
              value={phone}
              placeholder={'Phone number'}
              onChange={(evt) => setPhone(evt.target.value)}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <Button className="submit-btn">Submit</Button>
        </FormGroup>
        <FormGroup>
          <Button className="secondary-btn" onClick={() => history.push('/')}>
            Dashboard
          </Button>
        </FormGroup>
      </Form>
      {error ? (
        <Alert className="event-validation" color="danger">
          {' '}
          Missing required Information
        </Alert>
      ) : (
        ''
      )}
      {success ? (
        <Alert className="event-validation" color="success">
          The event was created successfully!
        </Alert>
      ) : (
        ''
      )}
    </Container>
  );
}
