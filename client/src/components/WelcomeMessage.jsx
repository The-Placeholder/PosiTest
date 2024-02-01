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

  const instructions = [
    `You will complete your assessment with an OLU instructor via live
    coding exercise here!`,
    `Please use the credentials provided by your OLU Enrollment Manager
    to begin.`,
    `If you have any issues, please reach out to Mr. David Garcia for
    help.`,
  ];

  // if user auth valid useNavigate to lobby

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl font-bold lg:text-5xl">
          Welcome to the
          <span className="g-blue"> Testing Suite</span>
        </h1>
      </div>
      <div className="w-full text-lg">
        <ul className="text-2xl w-full ml-4">
          {instructions.map((instruction, index) => (
            <li
              key={`step${index}`}
              className="mb-3 flex items-center gap-x-3 p-1"
            >
              <span className="g-orange">
                <AiFillCaretRight />
              </span>
              {instruction}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={newUserHandler}
        className="btn btn-primary text-white w-32 h-10 text-center text-md rounded-xl lg:text-2xl lg:w-48 lg:h-20"
      >
        Get Started
      </button>
    </>
  );
};

export default WelcomeMessage;
