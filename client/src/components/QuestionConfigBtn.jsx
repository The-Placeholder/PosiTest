const QuestionConfigBtn = () => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar mb-4 mr-4 relative"
      >
        <div className="w-10 rounded-full">
          Question Config
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
          <a className="justify-between">Question Id: 1</a>
        </li>

        <li>
          <a className="justify-between">Question Id: 2</a>
        </li>
        <li>
          <a className="justify-between">Question Id: 3</a>
        </li>
        <li>
          <a className="justify-between">Question Id: 4</a>
        </li>
      </ul>
    </div>
  );
};
export default QuestionConfigBtn;
