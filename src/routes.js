import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login/';
import Signup from './pages/Signup';
import ContactsPage from './pages/ContactsPage';
import Dashboard from "./pages/Dashboard/";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/contacts" component={ContactsPage} />
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
