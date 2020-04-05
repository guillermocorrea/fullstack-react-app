import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

const Login = ({ authenticateUser, authenticated }) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={authenticateUser}>
        <div>
          <input type="text" placeholder="username" name="username" />
        </div>
        <div>
          <input type="password" placeholder="password" name="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {authenticated === mutations.NOT_AUTHENTICATED ? <p>Login incorrect</p> : null}
      </form>
    </div>
  );
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
});
const mapDispatchToProps = (dispatch) => ({
  authenticateUser(e) {
    e.preventDefault();
    const username = e.target['username'].value;
    const password = e.target['password'].value;
    dispatch(mutations.requestAuthenticateUser(username, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
