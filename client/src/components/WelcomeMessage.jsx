import { AiFillCaretRight } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';

const WelcomeMessage = () => {
  // const navigate = useNavigate();
  // const newUserHandler = () => {
  //   setnewUser(false);
  //   navigate('/LoginPage');
  // };

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
      <Link to="login">
        <button className="btn btn-primary text-white w-48 h-20 text-center right-0 text-2xl rounded-xl">
          Get Started
        </button>
      </Link>
    </>
  );
};

export default WelcomeMessage;
