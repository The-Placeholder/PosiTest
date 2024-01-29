import Messenger from './Messenger';
import { useState } from 'react';

const SuiteSideChat = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="drawer drawer-end z-50">
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side overflow-hidden ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-24">
          <Messenger isglobal={false} />
        </ul>
      </div>
    </div>
  );
};

export default SuiteSideChat;
