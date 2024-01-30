import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
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
        toast.success(`Login Success: Welcome ${userData.username}`);
      } else if (userData.role === 'instructor') {
        navigate('/lobby/instructor');
        toast.success(`Login Success: Welcome ${userData.username}`);
      } else {
        navigate('/lobby/NotFound');
        toast.error('no role found');
      }
    };

    if (userData) {
      loadRolePage();
    }
  }, [userData]);

  if (!userData) {
    return (
      <div>
        Loading Userdata
        <span className="loading loading-spinner text-primary"></span>
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
