import { QuestionContext } from '../../context/QuestionContext';
import { useContext, useEffect } from 'react';
import { GrTest } from 'react-icons/gr';
import { toast } from 'react-hot-toast';

const QuestionConfigBtn = () => {
  const { questionData, setquestionId } = useContext(QuestionContext);
  useEffect(() => {
    console.log('Updated questionData:', questionData);
  }, [questionData]);

  const changeQuestionHandler = (id) => {
    setquestionId(id);
    toast.success(`question successfully changed to QID: ${id}`);
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar mb-4 mr-4 relative"
      >
        <div className="w-10 h-10 rounded-full flex content-center bg-stone-500/50">
          <GrTest className="text-xl mx-auto my-2 g-orange hover:text-white" />
          {/* <img alt="user profile picture" src={userData.profile_pic || nopic} /> */}
        </div>
        <span className="role-title g-orange text-md absolute top-12 text-xs first-letter:capitalize">
          {/* {userData?.role} */}
        </span>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a
            onClick={() => {
              changeQuestionHandler(1);
            }}
            className="justify-between"
          >
            Two Sum
          </a>
        </li>

        <li>
          <a
            onClick={() => {
              changeQuestionHandler(2);
            }}
            className="justify-between"
          >
            Remove Element
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              changeQuestionHandler(3);
            }}
            className="justify-between"
          >
            Print Even Numbers
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              changeQuestionHandler(4);
            }}
            className="justify-between"
          >
            Count Elemtns
          </a>
        </li>
      </ul>
    </div>
  );
};
export default QuestionConfigBtn;
