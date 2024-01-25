import longlogo from '/galvanize-logo-orange.png';
import { AiFillCaretRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const HeroLanding = ({ setnavHide, setnewUser }) => {
  // setnavHide(true);
  const navigate = useNavigate();
  const newUserHandler = () => {
    setnewUser(false);
    navigate('/LoginPage');
  };

  return (
    <>
      <div
        id="hero"
        className="fixed overflow-hidden top-0 left-0 w-full h-full min-h-screen"
      >
        <div className="z-10 flex flex-row w-full h-full">
          <div className="ctn w-5/12 h-full bg-g-blue flex flex-col flex-wrap text-white content-evenly justify-center gap-8 p-20 text-center">
            <div className="mb-16">
              <img src={longlogo} alt="galvanize logo" className="w-[100%]" />
            </div>
            <h1 className="text-4xl font-bold">
              OUR GRADS
              <span className="text-orange-500"> CHANGE THE WORLD</span>
            </h1>
            <h2 className="text-2xl opacity">
              Transformational Software Engineering Bootcamps
            </h2>
          </div>
          {/* end left*/}
          <div className="ctn w-7/12 h-full bg-white text-black flex flex-row flex-wrap p-32 pt-56 gap-16 content-center">
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
                  You will complete your assessment with an OLU instructor via
                  live coding exercise here!
                </li>
                <li className="mb-3 flex items-center gap-x-3 p-2">
                  <span className="g-orange">
                    <AiFillCaretRight />
                  </span>
                  Please use the credentials provided by your OLU Enrollment
                  Manager to begin.
                </li>
                <li className="mb-3 flex items-center gap-x-3 p-2">
                  <span className="g-orange">
                    <AiFillCaretRight />
                  </span>
                  If you have any issues, please reach out to Mr. David Garcia
                  for help.
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary text-white w-48 h-20 text-center right-0 text-2xl rounded-xl"
              onClick={(e) => newUserHandler(e, false)}
            >
              Get Started
            </button>
          </div>
          {/* end right*/}
        </div>
      </div>
    </>
  );
};

export default HeroLanding;
