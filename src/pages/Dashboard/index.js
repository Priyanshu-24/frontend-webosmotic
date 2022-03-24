import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Dashboard({ history }) {
  const [events, setEvents] = useState([]);
  const user = localStorage.getItem('user');


  const myContactsHandler = async () => {
    try {
      const response = await api.get('/user/contacts', {
        headers: { user: user },
      });

      console.log(response);

      setEvents(response.data.events);
    } catch (error) {
      history.push('/login');
    }
  };

  
  useEffect(() => {
    myContactsHandler();
  }, []);

  const create = () => {
    history.push('/contacts');
  };

  return (
    <>
      <button onClick={create}>Create Contact</button>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event._id}>
            <strong>{event.name}</strong>
            <div>Email : {event.email}</div>
            <div>Phone no : {event.phone}</div>
          </li>
        ))}
      </ul>
    </>
  );
}
