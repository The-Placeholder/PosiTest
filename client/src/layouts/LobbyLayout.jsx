import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';

export default function LobbyLayout() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate('');
  useEffect(() => {
    if (userData[2].role === 'student') {
      console.log('student');
      navigate('/lobby/student');
    } else {
      console.log('instructor');
      navigate('/lobby/instructor');
    }
  }, []);

  if (!userData) {
    return <div>Loading Userdata</div>;
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
