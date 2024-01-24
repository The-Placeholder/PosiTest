import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import ExaminerLanding from './pages/ExaminerLanding';
import HeroLanding from './pages/HeroLanding';

/* TODO 
  - check if new user, new user show hero?
*/
export default function App() {
  const [navHide, setnavHide] = useState(false);
  const [newUser, setnewUser] = useState(true);
  const newUserHandler = () => {
    setnewUser(false);
  };

  return (
    <>
      {navHide ? '' : <NavBar />}
      <div id="body-ctn">
        <BrowserRouter>
          <Routes>
            <Route
              path="/hero"
              element={
                <HeroLanding
                  setnavHide={setnavHide}
                  newUserHandler={newUserHandler}
                />
              }
            />
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
            </Route>
            <Route path="/LoginPage" LoginPage element={<LoginPage />} />
            <Route
              path="/ExaminerLanding"
              ExaminerLanding
              element={<ExaminerLanding />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
