import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <h1 className='text-green-500'>Login</h1>
      <p>username<input type="text" /></p>
      <p>password<input type="text" /></p>
      {/* Use the Link component to create a link to the "testerPage" route */}
      <Link to="/testerPage">
        <button id="loggingIn">Login</button>
      </Link>


      <div>
        <br/>
        <p>if you can see the daisyui component below then daisyui+tailwind is properly installed</p>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    </>
  );
};

export default Login;
