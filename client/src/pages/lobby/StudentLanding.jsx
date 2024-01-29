import { useContext, useRef } from 'react';
import { UserContext } from '../../../context/UserContext';
import Messenger from '../../components/Messenger';
import { AiFillCaretRight } from 'react-icons/ai';

const StudentLanding = () => {
  const { userData } = useContext(UserContext);
  const roomRef = useRef(null);

  const enterHandler = () => {
    console.log('roomid is', roomRef.current.value);
  };

  const instructions = [
    `Read the problem statement on the left side of the screen.`,
    `Observe the timer on the left side of the screen. You have 1 hour
    to solve the coding problem.`,
    `Use the code editor on the right to write your solution.`,
    `Execute your code by clicking on the "Run" button.`,
    `If needed, make adjustments to your code and rerun it to see the
    updated results.`,
    `Your instructor is available in the test suite utilize the chatbox
    to ask any questions.`,
    `Once you are satisfied with your solution, submit your code using
    the "Submit" button.`,
  ];

  console.log('inside student', userData);

  return (
    <>
      <div
        id="contents-ctn"
        className="shadow-xl flex flex-row flex-wrap justify-evenly gap-15 m-5 p-5 h-full rounded-2xl overflow-auto"
      >
        <div
          id="lobby-ctn"
          className="w-7/12 h-[90%] p-2 text-center flex flex-col mt-10 gap-20"
        >
          <h1 className="w-full text-5xl font-bold text-black self-center">
            Live Coding Assesment Suite Instructions:
          </h1>
          <ul className="text-left ml-32">
            {instructions.map((instruction, index) => (
              <li
                key={`step${index}`}
                className="mb-3 flex items-center gap-x-3 p-2"
              >
                <span className="g-orange">
                  <AiFillCaretRight />
                </span>
                {instruction}
              </li>
            ))}
          </ul>
          <div className="flex flex-row justify-center">
            <div id="roomSelection" className="flex flex-row w-5/12">
              <label htmlFor="room" className="w-6/12">
                Room Id{' '}
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                ref={roomRef}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <button
              id="enterinput"
              className="btn ml-60 btn-primary opacity-75 w-3/12"
              onClick={() => enterHandler()}
            >
              Enter
            </button>
            <div></div>
          </div>
        </div>
        {/* End of lobby-ctn */}
        <div
          id="chatroom-ctn"
          className="ctn w-4/12 max-h-1080px h-screen overflow-auto"
        >
          <Messenger isglobal={true} />
        </div>
      </div>
      {/* End of content-ctn */}
    </>
  );
};

export default StudentLanding;
