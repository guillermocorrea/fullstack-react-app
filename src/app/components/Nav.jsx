import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to="/dashboard">
        <h1>My Application</h1>
      </Link>
    </nav>
  );
};

export default connect((state) => state)(Nav);
