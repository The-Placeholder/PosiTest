import { useContext } from 'react';
import { QuestionContext } from '../../context/QuestionContext';
import { NavLink } from 'react-router-dom';

const CodeSubmitPage = () => {
  // const { questionData } = useContext(QuestionContext);
  // add some sort of GPT context here or an axios get for user's code input?
  // console.log(questionData.title, questionData.instructions);

  return (
    <div
      id="contents-ctn"
      className="shadow-xl flex flex-row flex-wrap m-5 p-5 pb-32 h-screen rounded-2xl max-h-[900px] content-center justify-center gap-10 text-black"
    >
      <h1 className="text-5xl w-full flex justify-center">
        Congrats! Your code was successfully submitted
      </h1>
      <div className="w-full flex justify-center text-2xl">
        Your instructor will grade your test soon....?
      </div>
      <div className="w-full flex justify-center text-2xl">
        Feel free to chat in the lobby in the mean time
      </div>
      <NavLink
        to="/lobby"
        className="text-3xl btn btn-primary text-white p-10 flex content-center"
      >
        Return to Lobby
      </NavLink>

      <a
        href="https://youtu.be/O3Z_JyfeFYs"
        target="_blank"
        rel="noopener noreferrer" // Adding rel attribute for security best practices
        className="text-3xl btn btn-primary text-white p-10 flex content-center"
      >
        Instructor Support
      </a>
    </div>
  );
};
export default CodeSubmitPage;
