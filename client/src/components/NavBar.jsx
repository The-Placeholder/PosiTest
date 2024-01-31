import logo from '/galvanize-logo-orange.png';
import nopic from '/noprofilepic.png';
import { toast } from 'react-hot-toast';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import NavChatBtn from './NavChatBtn';
import NavBackBtn from './NavBackBtn';
import QuestionConfigBtn from './QuestionConfigBtn';
import EditProfileModal from './EditProfileModal';

const NavBar = () => {
  const location = useLocation();
  const { userData, setuserData, setuserId } = useContext(UserContext);
  const navigate = useNavigate();

  console.log('navbar', userData);

  if (!userData) {
    return <div>Loading user data</div>;
  }

  const showChat = location.pathname === '/suite'; //&& userData?.role === 'instructor';
  const showBackBtn = location.pathname === '/suite';
  const showQuestionConfig = location.pathname === '/lobby/instructor';

  const logOut = async () => {
    // const response = await axios.get('/logout');
    // console.log(response.data);
    document.cookie =
      'jwtToken=; Path=/api; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';

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
            to="/"
            className="w-44 content-center justify-center absolute top-[-15px] mx-2"
          >
            <img src={logo} alt="galvanize logo" className="object-fit" />
          </NavLink>
        </div>
        <div className="text-white text-4xl font-bold flex flex-row flex-nowrap gap-2">
          <div>Lobby - </div>
          <span className="first-letter:capitalize">{userData?.role}</span>
        </div>

        <div className="no-flex">
          <div id="right-nav" className="flex flex-nowrap flex-row gap-5">
            {showBackBtn ? <NavBackBtn /> : ''}
            {showChat ? <NavChatBtn /> : ''}
            {showQuestionConfig ? <QuestionConfigBtn /> : ''}

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mb-4 mr-4 relative"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user profile picture"
                    src={userData.profile_pic || nopic}
                  />
                </div>
                <span className="role-title g-orange text-md absolute top-12 text-xs first-letter:capitalize">
                  {userData?.username}
                </span>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a
                    className=""
                    onClick={() =>
                      document.getElementById('profileModal').showModal()
                    }
                  >
                    Update Profile Pic
                  </a>
                </li>

                <li className="z-20">
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
      <EditProfileModal />
    </>
  );
};

export default NavBar;
