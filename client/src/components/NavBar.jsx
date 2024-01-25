import logo from '/galvanize-logo-orange.png';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const NavBar = () => {
  const { userData } = useContext(UserContext);

  console.log('navbar', userData);

  if (!userData) {
    return <div>Loading user data</div>;
  }

  return (
    <>
      <div className="navbar bg-g-blue top-0 z-50 h-24 flex flex-row justify-between">
        <div className="flex relative">
          <NavLink
            path="/"
            className="w-44 content-center justify-center absolute top-[-15px] mx-2"
          >
            <img src={logo} alt="galvanize logo" className="object-fit" />
          </NavLink>
        </div>
        <div className="text-white text-4xl font-bold">
          Lobby - {userData?.role}
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
                {userData?.role}
              </span>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>

              <li>
                <NavLink to="/login">
                  <a>Logout</a>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
