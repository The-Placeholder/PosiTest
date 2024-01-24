import longlogo from '/galvanize-logo-orange.png';
import { AiFillCaretRight } from 'react-icons/ai';

const HeroLanding = ({ setnavHide, newUserHandler }) => {
  // setnavHide(true);

  return (
    <>
      <div
        id="hero"
        className="fixed overflow-hidden top-0 left-0 w-full h-full"
      >
        <div className="z-10 flex flex-row w-full h-full">
          <div className="ctn w-5/12 h-full bg-blue-800 flex flex-col flex-wrap text-white content-evenly justify-center gap-8 p-20 text-center">
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
          <div className="ctn w-7/12 h-full bg-gray-300 text-black flex flex-row flex-wrap p-32 gap-16 content-center">
            <div className="w-full">
              <h1 className="text-5xl font-bold">
                Welcome to the
                <span className="text-blue-500"> Testing Suite</span>
              </h1>
            </div>
            <div className="w-full text-lg">
              <ul className="text-2xl w-full ml-4 mb-5">
                <li className="mb-3 flex items-center gap-x-3 p-2">
                  <span>
                    <AiFillCaretRight />
                  </span>
                  Feature One: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor
                </li>
                <li className="mb-3 flex items-center gap-x-3 p-2">
                  <span>
                    <AiFillCaretRight />
                  </span>
                  Feature One: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor
                </li>
                <li className="mb-3 flex items-center gap-x-3 p-2">
                  <span>
                    <AiFillCaretRight />
                  </span>
                  Feature One: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor
                </li>
              </ul>
            </div>
            <button
              className="btn btn-primary"
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
