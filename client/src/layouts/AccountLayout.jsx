import { Outlet, ScrollRestoration } from 'react-router-dom';
import HeroLeft from '../components/HeroLeft';

export default function AccountLayout() {
  return (
    <div id="rootlayout">
      <ScrollRestoration />
      <main>
        <div
          id="hero"
          className="fixed overflow-hidden top-0 left-0 w-full h-full min-h-screen"
        >
          <div className="z-10 flex flex-row w-full h-full">
            <HeroLeft />
            <div
              id="hero-right"
              className="ctn w-7/12 h-full bg-white text-black flex flex-row flex-wrap p-32 pt-56 gap-16 content-center"
            >
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
