import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import axios from 'axios';
import { UserContextProvider } from '../context/UserContext';

// pages
import Login from './pages/Login';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InstructorLanding from './pages/lobby/InstructorLanding';
import TestingSuite from './pages/TestingSuite';
import StudentLanding from './pages/lobby/StudentLanding';
import SuiteLayout from './layouts/SuiteLayout';
import WelcomeMessage from './components/WelcomeMessage';
import NotFound from './pages/NotFound';

// layouts
import Layout from './pages/Layout';
import RootLayout from './layouts/RootLayout';
import AccountLayout from './layouts/AccountLayout';
import LobbyLayout from './layouts/LobbyLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AccountLayout />}>
        <Route index element={<WelcomeMessage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/lobby" element={<LobbyLayout />}>
        <Route path="student" element={<StudentLanding />} />
        <Route path="instructor" element={<InstructorLanding />} />
      </Route>

      <Route path="/suite" element={<SuiteLayout />}>
        <Route index element={<TestingSuite />} />
      </Route>
    </>,
  ),
);

axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;

export default function App() {
  const [navHide, setnavHide] = useState(false);
  const [navTitle, setnavTitle] = useState('');
  const [role, setRole] = useState(null);
  const [newUser, setnewUser] = useState(true);

  return (
    // <UserContextProvider>
    <RouterProvider router={router} />
    // </UserContextProvider>
  );
}
