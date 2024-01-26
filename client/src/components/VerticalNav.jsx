import logo from '/logo-mark-white.png';

const VerticalNav = () => {
  return (
    <>
      <div className="navbar fixed bg-g-blue top-0 left-0 z-50 w-32 h-full flex flex-col justify-between">
        <div className="flex relative">
          <div className="w-12 content-center justify-center top-[-15px] mx-2">
            <img src={logo} alt="galvanize logo" className="object-fit" />
          </div>
        </div>
        <div className="text-white text-2xl font-bold text-wrap text-center">
          Vertical Nav
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mb-4 mr-4 relative"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
              <span className="g-orange text-lg absolute top-10">
                Instructor
              </span>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerticalNav;
