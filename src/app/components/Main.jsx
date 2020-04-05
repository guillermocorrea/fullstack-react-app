import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Dashboard from './Dashboard';
import { Router, Route, Redirect } from 'react-router-dom';
import { history } from '../store/history';
import Nav from './Nav';
import TaskDetail from './TaskDetail';
import Login from './Login';

const RouteGuard = (Component) => ({ match }) => {
  if (!store.getState().session.authenticated) {
    return <Redirect to="/login" />;
  }
  return <Component match={match} />;
};

export default function Main() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Nav />
        <Route exact path="/dashboard" render={RouteGuard(Dashboard)} />
        <Route exact path="/task/:id" render={RouteGuard(TaskDetail)} />
        <Route exact path="/login" component={Login} />
      </Provider>
    </Router>
  );
}
