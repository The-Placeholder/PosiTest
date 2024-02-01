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
        <ul className="menu p-4 w-3/12 bg-base-200 opacity-90 text-base-content mt-24 max-h-[850px] h-full overflow-y-scroll">
          <Messenger isglobal={false} suite={true} />
        </ul>
      </div>
    </div>
  );
};

export default SuiteSideChat;
