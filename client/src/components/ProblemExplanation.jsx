import { QuestionContext } from '../../context/QuestionContext';
import { useContext } from 'react';
import Timer from './Timer';

const ProblemExplanation = ({ executeCode, code }) => {
  const { questionData } = useContext(QuestionContext);

  return (
    <div className="flex flex-row flex-wrap content-start w-full h-full p-8 gap-5 bg-slate-700 overflow-x-auto relative ">
      <div id="test-info" className="max-h-12 gap-5 flex flex-row w-full">
        <div
          id="timer-ctn"
          className="w-6/12 m-auto p-3 bg-g-orange opacity-40 text-white rounded-md"
        >
          <Timer />
        </div>
        <div
          id="input-ctn"
          className="flex flex-row mr-8 my-auto gap-2 w-5/12 max-h-12"
        >
          <button className="g-btn btn btn-primary p-3 bg-g-orange text-white rounded-lg font-medium">
            Submit
          </button>
          <button
            onClick={() => {
              executeCode(code);
            }}
            className="g-btn btn btn-primary p-3 bg-green-500/50 text-white rounded-lg"
          >
            Run Code
          </button>
        </div>
      </div>

      <h1 className="text-4xl text-white">
        <span className="g-orange font-bold">
          {`Question: `} {questionData.title}
        </span>
        <span id="q-id" className="ml-5 text-lg my-auto text-gray-500">
          {`(QID: ${questionData.id})`}
        </span>
      </h1>
      <div className="w-full flex flex-row content-center text-2xl gap-5">
        <div id="badge-ctn" className="">
          <div className="rounded-xl text-gray-300 bg-green-800/70 p-2 px-4 text-sm">
            {questionData.difficulty}
          </div>
        </div>
      </div>

      <div id="q-instructions" className="text-2xl">
        {questionData.instructions}
      </div>

      {questionData.hints.items.map((hint, index) => (
        <div
          id={`hint${index + 1}`}
          key={`hint${index + 1}`}
          className="w-full"
        >
          <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Hint {index + 1}:
            </div>
            <div className="collapse-content">
              {hint}
              <div>hello</div>
            </div>
          </div>
        </div>
      ))}

      {/* <div id="answer" className="w-full">
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">See Answer</div>
          <div className="collapse-content">{questionData.the_answer}</div>
        </div>
      </div> */}
    </div>
  );
};

export default ProblemExplanation;
