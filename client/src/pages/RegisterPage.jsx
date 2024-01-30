import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [userCreds, setUserCreds] = useState({
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserCreds({ ...userCreds, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    try {
      const response = await axios.post('/register', userCreds);

      if (response.status === 201) {
        // 201 means "Created"
        toast.success('Successfully Registered');
        navigate('/login');
      } else {
        toast.error('Registration Failed');
        console.error('Registration failed:', response.data.error);
      }
    } catch (error) {
      console.error(
        'An error occurred during registration:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <>
      <div
        id="contents-ctn"
        className="w-[80%] flex flex-col mx-auto rounded-2xl gap-12 shadow-2xl"
      >
        <div
          id="registration-title"
          className="flex flex-col items-center py-10"
        >
          <h1 className="text-5xl text-black font-bold">
            New User Registration
          </h1>
        </div>
        <div id="registration-inputs" className="flex flex-col items-center ">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs mb-2 bg-g-greyblue"
            value={userCreds.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs mb-2 bg-g-greyblue"
            value={userCreds.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs mb-2 bg-g-greyblue"
            value={userCreds.password}
            onChange={handleInputChange}
          />
        </div>
        <div
          id="login-btns"
          className="flex align-middle justify-center m-5 pb-3"
        >
          <button
            className="btn btn-primary opacity-75 w-28 h-14 text-lg text-white"
            onClick={registerUser}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
