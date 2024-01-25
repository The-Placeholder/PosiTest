import { Outlet, ScrollRestoration } from 'react-router-dom';
import VerticalNav from '../components/VerticalNav';

export default function SuiteLayout() {
  return (
    <div id="suitelayout">
      <ScrollRestoration />
      <VerticalNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
