import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <>
      {/* <div className="ctn fixed top-0 left-0 w-full h-full bg-g-gray z-20"> */}
      <div
        id="contents-ctn"
        className=" w-[80%] flex flex-col mx-auto rounded-2xl gap-12 shadow-2xl"
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
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs mb-2 bg-g-greyblue"
          />
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs mb-2 bg-g-greyblue"
          />
          <input
            type="text"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs mb-2 bg-g-greyblue"
          />
        </div>
        <div
          id="login-btns"
          className="flex align-middle justify-center m-5 pb-3"
        >
          <Link to="/login">
            <button className="btn btn-primary opacity-75 w-28 h-14 text-lg text-white">
              Submit
            </button>
          </Link>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default RegisterPage;
