import {
  Outlet,
  ScrollRestoration,
  useNavigate,
  NavLink,
} from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import toast from 'react-hot-toast';

export default function LobbyLayout() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate('');

  useEffect(() => {
    const loadRolePage = () => {
      if (userData.role === 'student') {
        navigate('/lobby/student');
        // toast.success(`Login Success: Welcome ${userData.username}`);
      } else if (userData.role === 'instructor') {
        navigate('/lobby/instructor');
        // toast.success(`Login Success: Welcome ${userData.username}`);
      } else {
        navigate('/lobby/notfound');
        toast.error('No role found');
      }
    };

    if (userData) {
      loadRolePage();
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="flex flex-col content-center justify-center flex-wrap gap-32 pt-16">
        <div className="text-5xl">Loading Userdata ...</div>
        <span className="loading loading-spinner text-primary w-32 mx-auto"></span>
        <NavLink
          to="/"
          className="text-2xl btn btn-primary p-10 w-52 content-center mx-auto"
        >
          Return to Homepage
        </NavLink>
      </div>
    );
  }

  return (
    <div id="lobbylayout">
      <ScrollRestoration />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
