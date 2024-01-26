import { Outlet, ScrollRestoration } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div id="rootlayout">
      <ScrollRestoration />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
