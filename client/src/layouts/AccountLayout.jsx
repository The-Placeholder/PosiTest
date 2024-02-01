import { Outlet, ScrollRestoration } from 'react-router-dom';
import HeroLeft from '../components/HeroLeft';

export default function AccountLayout() {
  return (
    <div id="rootlayout">
      <ScrollRestoration />
      <main>
        <div
          id="hero"
          className="fixed top-0 left-0 w-full h-full min-h-screen overflow-auto"
        >
          <div className="z-10 flex flex-row w-full h-full">
            <HeroLeft />
            <div
              id="hero-right"
              className="ctn w-7/12 h-full bg-white text-black flex flex-row flex-wrap gap-10 content-center p-10 pt-56 lg:p-32 overflow-auto"
            >
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
