import './App.css'
import ReservationPage from './pages/ReservationPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import AdminLoginPage from "./pages/AdminLoginPage";

function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Routes>
    </BrowserRouter>
    ;
  </>
}

export default App;