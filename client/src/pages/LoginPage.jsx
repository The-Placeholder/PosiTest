const LoginPage = () => {
  return (
    <>
      <div className="ctn fixed top-0 left-0 w-full h-full g-bg-gray z-20">
        <div
          id="contents-ctn"
          className="ctn mt-36 w-[80%] flex flex-col mx-auto rounded-2xl"
        >
          <div id="login-title" className="flex flex-col items-center py-10">
            <h1 className="text-2xl text-black">Galvanize Test Suite</h1>
          </div>
          <div id="login-inputs" className="flex flex-col items-center ">
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
            <div className="flex my-2 ml-48">
              <label htmlFor="rememberMe" className="mr-2">
                Remember me
              </label>
              <input type="checkbox" id="rememberMe" className="mr-2" />
            </div>
          </div>
          <div id="login-btns" className="flex justify-between m-5 pb-3">
            <button className="btn btn-primary opacity-75">Register</button>
            <button className="btn btn-primary opacity-75">Login</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;