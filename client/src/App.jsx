import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import ExaminerLanding from './pages/ExaminerLanding';

export default function App() {
  return (
    <>
      <NavBar />
      <div id="body-ctn">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Login />} />
            </Route>
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
