import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { useState } from 'react';
import axios from 'axios';
import { UserContextProvider } from '../context/UserContext';
import { QuestionContextProvider } from '../context/QuestionContext';
import { Toaster } from 'react-hot-toast';

// pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InstructorLanding from './pages/lobby/InstructorLanding';
import TestingSuite from './pages/TestingSuite';
import StudentLanding from './pages/lobby/StudentLanding';
import SuiteLayout from './layouts/SuiteLayout';
import WelcomeMessage from './components/WelcomeMessage';
import NotFound from './pages/NotFound';

// layouts
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
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/suite" element={<SuiteLayout />}>
        <Route index element={<TestingSuite />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </>,
  ),
);

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : '/api';
axios.defaults.withCredentials = true;

export default function App() {
  // const [newUser, setnewUser] = useState(true);

  return (
    <UserContextProvider>
      <QuestionContextProvider>
        <Toaster position="bottom-right" toastOptions={{ duration: 8000 }} />
        <RouterProvider router={router} />
      </QuestionContextProvider>
    </UserContextProvider>
  );
}
