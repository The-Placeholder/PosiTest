import { BsWechat } from 'react-icons/bs';

const NavChatBtn = () => {
  return (
    <div>
      <div id="chatBtn">
        <label
          htmlFor="my-drawer"
          className="drawer-button btn btn-primary my-auto text-lg p-3"
        >
          <BsWechat />
        </label>
      </div>
    </div>
  );
};
export default NavChatBtn;
