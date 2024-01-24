const RegisterPage = () => {
  return (
    <>
      <div className="ctn fixed top-0 left-0 w-full h-full g-bg-gray z-20">
        <div
          id="contents-ctn"
          className="ctn mt-36 w-[80%] flex flex-col mx-auto rounded-2xl"
        >
          <div
            id="registration-title"
            className="flex flex-col items-center py-10"
          >
            <h1 className="text-2xl text-black">Registration Information</h1>
          </div>
          <div id="registration-inputs" className="flex flex-col items-center ">
            <div className="flex gap-1">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-40 max-w-xs mb-2 bg-g-greyblue"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-40 max-w-xs mb-2 bg-g-greyblue"
              />
            </div>
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
            <button className="btn btn-primary opacity-75">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
