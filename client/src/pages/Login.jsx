import React from 'react';
import { Link } from 'react-router-dom';
import Daisytest from '../components/daisytest';

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <p>username<input type="text" /></p>
      <p>password<input type="text" /></p>
      {/* Use the Link component to create a link to the "testerPage" route */}
      <Link to="/testerPage">
        <button id="loggingIn">Login</button>
      </Link>

      <Daisytest/>
    </>
  );
};

export default Login;
