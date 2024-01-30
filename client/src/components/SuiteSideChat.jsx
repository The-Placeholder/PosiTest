import Messenger from './Messenger';

const SuiteSideChat = () => {
  return (
    <div className="drawer drawer-end z-50">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side overflow-hidden ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 bg-base-200 text-base-content mt-24 max-h-[850px] h-full pb-48 overflow-y-scroll">
          <Messenger isglobal={false} />
        </ul>
      </div>
    </div>
  );
};

export default SuiteSideChat;
