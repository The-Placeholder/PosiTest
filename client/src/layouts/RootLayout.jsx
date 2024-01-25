import { Outlet, ScrollRestoration } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function RootLayout() {
  return (
    <div id="rootlayout">
      <ScrollRestoration />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
