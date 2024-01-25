import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NavBar from './components/NavBar';
import InstructorLanding from './pages/InstructorLanding';
import HeroLanding from './pages/HeroLanding';
import TestingSuite from './pages/TestingSuite';
import StudentLanding from './pages/StudentLanding';

export default function App() {
  const [navHide, setnavHide] = useState(false);
  const [navTitle, setnavTitle] = useState('');
  const [role, setRole] = useState(null);
  const [newUser, setnewUser] = useState(true);

  return (
    <>
      <BrowserRouter>
        {navHide ? '' : <NavBar navTitle={navTitle} />}

        <div id="body-ctn">
          <Routes>
            <Route
              path="/hero"
              element={
                <HeroLanding
                  HeroLanding
                  setnavHide={setnavHide}
                  setnewUser={setnewUser}
                />
              }
            />
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="/login" LoginPage element={<LoginPage />} />
            <Route path="/register" RegisterPage element={<RegisterPage />} />
            <Route path="user"></Route>
            <Route
              path="/instructor"
              InstructorLanding
              element={<InstructorLanding setnavTitle={setnavTitle} />}
            />
            <Route
              path="/student"
              StudentLanding
              element={<StudentLanding setnavTitle={setnavTitle} />}
            />
            <Route
              path="/suite"
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
