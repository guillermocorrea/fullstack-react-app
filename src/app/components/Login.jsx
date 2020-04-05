import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

const Login = ({ authenticateUser, authenticated }) => {
  return (
    <div className="card p-3 col-6">
      <h2>Login</h2>
      <form onSubmit={authenticateUser}>
        <div>
          <input type="text" placeholder="username" name="username" className="form-control" />
        </div>
        <div>
          <input type="password" placeholder="password" name="password" className="form-control mt-2" />
        </div>
        <div>
          <button type="submit" className="form-control mt-2 btn btn-primary">
            Login
          </button>
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
