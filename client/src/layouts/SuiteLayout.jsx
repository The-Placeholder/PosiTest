import { Outlet, ScrollRestoration } from 'react-router-dom';
import NavBar from '../components/NavBar';
// import VerticalNav from '../components/VerticalNav';

export default function SuiteLayout() {
  return (
    <div id="suitelayout">
      <ScrollRestoration />
      {/* <VerticalNav /> */}
      <NavBar />
      <main>
        <div className="h-full w-screen pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
