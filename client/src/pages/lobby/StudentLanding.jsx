import { useContext, useRef } from 'react';
import { UserContext } from '../../../context/UserContext';
import { QuestionContext } from '../../../context/QuestionContext';
import Messenger from '../../components/Messenger';
import { AiFillCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentLanding = () => {
  const { questionData } = useContext(QuestionContext);
  const { userData, setChannel } = useContext(UserContext);
  const roomRef = useRef(null);

  const imgoingtoroom = () => {
    setChannel(`${roomRef.current.value}`);
    console.log('roomid is', roomRef.current.value);
    toast.success('joined room successfully');
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
        className="shadow-xl flex flex-row flex-wrap justify-evenly m-5 p-5 pb-32 h-screen rounded-2xl max-h-[900px]"
      >
        <div
          id="lobby-ctn"
          className="w-7/12 flex flex-wrap h-full mt-10 p-10 pb-32 text-center overflow-auto no-scrollbar"
        >
          <div id="title-ctn" className=" mx-auto flex flex-col gap-5">
            <h1 className="w-full text-5xl font-bold text-center text-black self-center">
              Assessment Suite Instructions:
            </h1>
            <h2 className="w-full text-2xl text-center self-center">
              Coding Test: {questionData.title}
            </h2>
          </div>

          <ul className="text-left mx-auto content-center ">
            {instructions.map((instruction, index) => (
              <li
                key={`step${index}`}
                className="mb-1 flex items-center gap-x-3 p-2 "
              >
                <span className="g-orange">
                  <AiFillCaretRight />
                </span>
                {instruction}
              </li>
            ))}
          </ul>
          <div className="flex flex-row justify-center w-full gap-8">
            <div
              id="roomSelection"
              className="flex flex-row w-5/12 content-center gap-8"
            >
              <label
                htmlFor="room"
                className="w-6/12 mt-1 text-md font-semibold lg:text-3xl text-nowrap "
              >
                Room Id{' '}
              </label>
              <select
                className="select select-bordered w-full max-w-xs bg-g-greyblue text-md font-semibold lg:text-3xl"
                ref={roomRef}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <Link to="/suite">
              <button
                id="enterinput"
                className="btn btn-primary flex content-center mx-auto  opacity-75 w-4/12 p-5 px-16 text-3xl text-white "
                onClick={() => imgoingtoroom()}
              >
                Enter
              </button>
            </Link>
            <div></div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        {/* End of lobby-ctn */}
        <div id="chatroom-ctn" className="ctn w-4/12 h-5/6 min-h-0 mt-20">
          <Messenger isglobal={true} suite={false} />
        </div>
      </div>
      {/* End of content-ctn */}
    </>
  );
};

export default StudentLanding;
