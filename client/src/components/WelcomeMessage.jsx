import { AiFillCaretRight } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import axios from 'axios';
const WelcomeMessage = () => {
  const { userData, setuserId } = useContext(UserContext);

  const navigate = useNavigate();
  const newUserHandler = async () => {
    try {
      const authResponse = await axios.get('/auth');
      if (authResponse.status === 200) {
        console.log('cheese');
        const userId = authResponse.data.id;
        setuserId(userId);
        navigate('/lobby');
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error('Error checking authentication:', err);
      navigate('/login');
    }
  };

  // if user auth valid useNavigate to lobby

  return (
    <>
      <div className="w-full">
        <h1 className="text-5xl font-bold">
          Welcome to the
          <span className="g-blue"> Testing Suite</span>
        </h1>
      </div>
      <div className="w-full text-lg">
        <ul className="text-2xl w-full ml-4 mb-5">
          <li className="mb-3 flex items-center gap-x-3 p-2">
            <span className="g-orange">
              <AiFillCaretRight />
            </span>
            You will complete your assessment with an OLU instructor via live
            coding exercise here!
          </li>
          <li className="mb-3 flex items-center gap-x-3 p-2">
            <span className="g-orange">
              <AiFillCaretRight />
            </span>
            Please use the credentials provided by your OLU Enrollment Manager
            to begin.
          </li>
          <li className="mb-3 flex items-center gap-x-3 p-2">
            <span className="g-orange">
              <AiFillCaretRight />
            </span>
            If you have any issues, please reach out to Mr. David Garcia for
            help.
          </li>
        </ul>
      </div>
      <button
        onClick={newUserHandler}
        className="btn btn-primary text-white w-48 h-20 text-center right-0 text-2xl rounded-xl"
      >
        Get Started
      </button>
    </>
  );
};

export default WelcomeMessage;
