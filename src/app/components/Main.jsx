import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import Dashboard from './Dashboard';

export default function Main() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
