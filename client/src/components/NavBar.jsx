import logo from '/galvanize-logo-orange.png';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import NavChatBtn from './NavChatBtn';
import NavBackBtn from './NavBackBtn';

const NavBar = () => {
  const location = useLocation();
  const { userData, setuserData, setuserId } = useContext(UserContext);
  const navigate = useNavigate();

  console.log('navbar', userData);

  if (!userData) {
    return <div>Loading user data</div>;
  }

  const showChat =
    location.pathname === '/suite' //&& userData?.role === 'instructor';

  const showBackBtn = location.pathname === '/suite';

  const logOut = () => {
    setuserData(null);
    setuserId(null);
    toast.success('Logout success');
    navigate('/login');
  };

  return (
    <>
      <div className="navbar bg-g-blue top-0 z-50 h-24 px-5 flex flex-row justify-between">
        <div className="flex relative">
          <NavLink
            path="/lobby"
            className="w-44 content-center justify-center absolute top-[-15px] mx-2"
          >
            <img src={logo} alt="galvanize logo" className="object-fit" />
          </NavLink>
        </div>
        <div className="text-white text-4xl font-bold">
          Lobby - {userData?.role}
        </div>

        <div className="no-flex">
          <div id="right-nav" className="flex flex-nowrap flex-row gap-8">
            {showBackBtn ? <NavBackBtn /> : ''}
            {showChat ? <NavChatBtn /> : ''}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mb-4 mr-4 relative"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={userData.profile_pic}
                  />
                </div>
                <span className="role-title g-orange text-md absolute top-12 text-xs">
                  {userData?.role}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {/* <li>
                <a className="justify-between">Profile</a>
              </li> */}

                <li>
                  <a
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* end dropdown */}
        </div>
      </div>
    </>
  );
};

export default NavBar;
