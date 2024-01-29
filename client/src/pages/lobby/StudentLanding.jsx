import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import Messenger from '../../components/Messenger';

const StudentLanding = () => {
  const { userData } = useContext(UserContext);

  console.log('inside student', userData);

  return (
    <>
      <div
        id="contents-ctn"
        className="shadow-xl flex flex-row flex-wrap justify-evenly gap-15 m-5 p-5 h-full rounded-2xl "
      >
        <div
          id="lobby-ctn"
          className="w-7/12 text-center flex flex-wrap max-h-[1080px] overflow-y-auto"
        >
          <h1 className="w-full text-5xl font-bold text-black self-center">
            Live Coding Assesment Suite Instructions:
          </h1>
          <ul className="text-left ml-32 mb-52">
            <li>Read the problem statement on the left side of the screen.</li>
            <li>
              Observe the timer on the left side of the screen. You have 1 hour
              to solve the coding problem.
            </li>
            <li>Use the code editor on the right to write your solution.</li>
            <li>Execute your code by clicking on the "Run" button.</li>
            <li>
              Check the console on the right for any output, errors, or test
              results.
            </li>
            <li>
              If needed, make adjustments to your code and rerun it to see the
              updated results.
            </li>
            <li>
              Your instructor is available in the test suite utilize the chatbox
              to ask any questions.
            </li>
            <li>
              Once you are satisfied with your solution, submit your code using
              the "Submit" button.
            </li>
          </ul>
          <div className="absolute bottom-5 left-1/4 transform -translate-x-1/2">
            <button className="btn btn-primary opacity-75">
              Room Dropdown Selection
            </button>
            <button className="btn ml-60 btn-primary opacity-75">Enter</button>
          </div>
        </div>
        {/* End of lobby-ctn */}
        <div id="chatroom-ctn" className="ctn w-4/12 h-screen">
          <Messenger isglobal={true}/>
        </div>
      </div>
      {/* End of content-ctn */}
    </>
  );
};

export default StudentLanding;
