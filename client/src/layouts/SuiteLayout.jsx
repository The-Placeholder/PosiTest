import { Outlet, ScrollRestoration } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SuiteSideChat from '../components/SuiteSideChat';
// import VerticalNav from '../components/VerticalNav';

export default function SuiteLayout() {
  return (
    <div id="suitelayout">
      <ScrollRestoration />
      {/* <VerticalNav /> */}
      <NavBar />

      <main>
        <div className="h-full w-screen pb-12 fixed overflow-hidden">
          <SuiteSideChat />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
