import { Outlet, ScrollRestoration } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function LobbyLayout() {
  return (
    <div id="lobbylayout">
      <ScrollRestoration />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
