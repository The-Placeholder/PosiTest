import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const LoginPage = () => {
  const [userCreds, setuserCreds] = useState({
    username: null,
    password: null,
  });

  const { setuserId } = useContext(UserContext);
  const navigate = useNavigate();

  const loginUser = () => {
    console.log(Number(userCreds.username));
    setuserId(Number(userCreds.username));
    navigate('/lobby');
  };

  return (
    <>
      <div
        id="contents-ctn"
        className=" w-[80%] flex flex-col mx-auto rounded-2xl gap-12 shadow-2xl"
      >
        <div id="login-title" className="flex flex-col items-center py-10">
          <h1 className="text-5xl text-black font-bold">Login Info</h1>
        </div>
        <div id="login-inputs" className="flex flex-col items-center ">
          <input
            type="text"
            onChange={(e) => {
              setuserCreds({ ...userCreds, username: e.target.value });
            }}
            placeholder="Username"
            className="input input-bordered w-full max-w-xs mb-2 bg-g-greyblue"
          />
          <input
            type="text"
            onChange={(e) => {
              setuserCreds({ ...userCreds, password: e.target.value });
            }}
            placeholder="Password"
            className="input input-bordered w-full max-w-xs mb-2 bg-g-greyblue"
          />
          <div className="flex my-2 ml-48">
            <label htmlFor="rememberMe" className="mr-2">
              Remember me
            </label>
            <input type="checkbox" id="rememberMe" className="mr-2" />
          </div>
        </div>
        <div id="login-btns" className="flex justify-between m-5 pb-3 ">
          <Link to="/register">
            <button className="btn btn-primary opacity-75 w-28 h-14 text-lg text-white">
              Register
            </button>
          </Link>

          <button
            className="btn btn-primary opacity-75 w-28 h-14 text-lg text-white"
            onClick={() => {
              loginUser();
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
