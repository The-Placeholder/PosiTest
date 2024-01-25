import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouteProvider,
  RouterProvider,
} from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import { useState } from 'react';

// pages
import Login from './pages/Login';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import ExaminerLanding from './pages/ExaminerLanding';
import HeroLanding from './pages/HeroLanding';
import TestingSuite from './pages/TestingSuite';

// layouts
import Layout from './pages/Layout';
import RootLayout from './layouts/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}></Route>,
    // <Route path='/lobby' element={}>

    // </Route>
    // <Route path='/suite' element={}>

    // </Route>
  ),
);

export default function App() {
  const [navHide, setnavHide] = useState(false);
  const [navTitle, setnavTitle] = useState('');
  const [role, setRole] = useState(null);
  const [newUser, setnewUser] = useState(true);

  return <RouterProvider router={router} />;

  return (
    <>
      {navHide ? '' : <NavBar navTitle={navTitle} />}
      <BrowserRouter>
        <div id="body-ctn">
          <Routes>
            <Route
              path="/hero"
              element={
                <HeroLanding setnavHide={setnavHide} setnewUser={setnewUser} />
              }
            />
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
            </Route>
            <Route
              path="/LoginPage"
              LoginPage
              element={<LoginPage setnavTitle={setnavTitle} />}
            />
            <Route
              path="/RegisterPage"
              RegisterPage
              element={<RegisterPage />}
            />
            <Route
              path="/ExaminerLanding"
              ExaminerLanding
              element={<ExaminerLanding setnavTitle={setnavTitle} />}
            />
            <Route
              path="/TestingSuite"
              TestingSuite
              element={<TestingSuite setnavTitle={setnavTitle} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
