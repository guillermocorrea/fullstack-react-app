import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Dashboard from './Dashboard';
import { Router, Route } from 'react-router-dom';
import { history } from '../store/history';
import Nav from './Nav';
import TaskDetail from './TaskDetail';

export default function Main() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Nav />
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/task/:id" component={TaskDetail} />
      </Provider>
    </Router>
  );
}
